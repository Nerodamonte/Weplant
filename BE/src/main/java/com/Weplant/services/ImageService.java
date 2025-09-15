package com.Weplant.services;

import com.Weplant.configurations.SupabaseConfig;
import com.Weplant.entities.Attachment;
import com.Weplant.entities.Image;
import com.Weplant.entities.Project;
import com.Weplant.entities.Template;
import com.Weplant.repositories.AttachmentRepository;

import com.Weplant.repositories.ImageRepository;
import com.Weplant.repositories.TemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;
    private final TemplateRepository templateRepository;
    private final SupabaseService storage;
    private final SupabaseConfig props;

    public void uploadMultipleForProject(Long templateId, List<MultipartFile> files) throws Exception {
        Template templateRef = templateRepository.getReferenceById(templateId);
        for (MultipartFile file : files) {
            String filename = storage.makeSafeFilename(file.getOriginalFilename());
            String path = "images/" + templateId + "/" + filename;
            String storedPath = storage.uploadToPath(file, path);
            String toStore = props.isBucketPublic() ? storage.publicUrl(storedPath) : storedPath;
            Image img = Image.builder()
                    .template(templateRef)
                    .imageUrl(toStore)
                    .build();
            imageRepository.save(img);
        }
    }

    public void deleteImage(Long imageId) throws Exception {
        Image img = imageRepository.findById(imageId)
                .orElseThrow(() -> new IllegalArgumentException("Template not found: " + imageId));
        String filePath = img.getImageUrl();
        if (props.isBucketPublic() && filePath.startsWith("http")) {
            int idx = filePath.indexOf(props.getBucket()) + props.getBucket().length() + 1;
            filePath = filePath.substring(idx);
        }
        storage.deleteFile(filePath);
        imageRepository.delete(img);
    }

    public void deleteImageByTemplate(Long templateId) throws Exception {
        List<Image> imgs = imageRepository.findByTemplate_TemplateId(templateId);
        for(Image img : imgs) {
            String filePath = img.getImageUrl();
            if (props.isBucketPublic() && filePath.startsWith("http")) {
                int idx = filePath.indexOf(props.getBucket()) + props.getBucket().length() + 1;
                filePath = filePath.substring(idx);
            }
            storage.deleteFile(filePath);
            imageRepository.delete(img);
        }
        }

}
