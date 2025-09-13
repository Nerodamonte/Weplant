package com.Weplant.services;

import com.Weplant.configurations.SupabaseConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.UUID;

@Service
public class SupabaseService {
    private final SupabaseConfig props;
    private final HttpClient http;

    public SupabaseService(SupabaseConfig props) {
        this.props = props;
        // Tự tạo HttpClient
        this.http = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_2)
                .build();
    }

    public String uploadToPath(MultipartFile file, String path) throws IOException, InterruptedException {
        String endpoint = baseUrl() + "/storage/v1/object/" +
                encodeSeg(props.getBucket()) + "/" + encodePath(path);

        HttpRequest request = HttpRequest.newBuilder(URI.create(endpoint))
                .header("Authorization", "Bearer " + props.getServiceRoleKey())
                .header("Content-Type", file.getContentType() != null ? file.getContentType() : "application/octet-stream")
                .header("x-upsert", "false")
                .header("Cache-Control", "3600")
                .POST(HttpRequest.BodyPublishers.ofByteArray(file.getBytes()))
                .build();

        HttpResponse<String> res = http.send(request, HttpResponse.BodyHandlers.ofString());
        if (res.statusCode() >= 200 && res.statusCode() < 300) {
            return path;
        }
        throw new IOException("Supabase upload failed. Status " + res.statusCode() + ": " + res.body());
    }

    // Tạo tên file an toàn
    public String makeSafeFilename(String originalName) {
        String ext = null;
        if (originalName != null) {
            int dot = originalName.lastIndexOf('.');
            if (dot >= 0) ext = originalName.substring(dot + 1);
        }
        String safeExt = (ext == null || ext.isBlank()) ? "bin" : ext.toLowerCase();
        return Instant.now().toEpochMilli() + "-" + UUID.randomUUID() + "." + safeExt;
    }

    public String publicUrl(String path) {
        return baseUrl() + "/storage/v1/object/public/" +
                encodeSeg(props.getBucket()) + "/" + encodePath(path);
    }

    public String createSignedUrl(String path, int expiresInSeconds) throws IOException, InterruptedException {
        String endpoint = baseUrl() + "/storage/v1/object/sign/" +
                encodeSeg(props.getBucket()) + "/" + encodePath(path);

        String bodyJson = "{\"expiresIn\":" + Math.max(expiresInSeconds, 60) + "}";
        HttpRequest req = HttpRequest.newBuilder(URI.create(endpoint))
                .header("Authorization", "Bearer " + props.getServiceRoleKey())
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(bodyJson))
                .build();

        HttpResponse<String> res = http.send(req, HttpResponse.BodyHandlers.ofString());
        if (res.statusCode() >= 200 && res.statusCode() < 300) {
            String signedUrl = extractJsonField(res.body(), "signedUrl");
            if (signedUrl == null || signedUrl.isBlank()) {
                throw new IOException("Cannot parse signedUrl: " + res.body());
            }
            if (signedUrl.startsWith("http")) return signedUrl;
            return baseUrl() + "/storage/v1" + signedUrl;
        }
        throw new IOException("Create signed URL failed. Status " + res.statusCode() + ": " + res.body());
    }

    private String baseUrl() {
        return props.getUrl().replaceAll("/+$", "");
    }

    private static String encodePath(String path) {
        String[] parts = path.split("/");
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < parts.length; i++) {
            if (i > 0) sb.append('/');
            sb.append(encodeSeg(parts[i]));
        }
        return sb.toString();
    }

    private static String encodeSeg(String seg) {
        return URLEncoder.encode(seg, StandardCharsets.UTF_8).replace("+", "%20");
    }

    // Parse JSON rất đơn giản; dùng Jackson nếu muốn chắc chắn hơn.
    private static String extractJsonField(String json, String key) {
        String lookFor = "\"" + key + "\"";
        int k = json.indexOf(lookFor);
        if (k < 0) return null;
        int colon = json.indexOf(':', k);
        if (colon < 0) return null;
        int q1 = json.indexOf('"', colon + 1);
        if (q1 < 0) return null;
        int q2 = json.indexOf('"', q1 + 1);
        if (q2 < 0) return null;
        return json.substring(q1 + 1, q2);
    }

}
