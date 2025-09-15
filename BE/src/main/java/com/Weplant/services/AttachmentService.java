package com.Weplant.services;

import com.Weplant.configurations.SupabaseConfig;
import com.Weplant.entities.Attachment;
import com.Weplant.entities.Project;
import com.Weplant.repositories.AttachmentRepository;
import com.Weplant.repositories.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttachmentService {
    private final AttachmentRepository attachmentRepository;
    private final ProjectRepository projectRepository;
    private final SupabaseService storage;
    private final SupabaseConfig props;

    public void uploadMultipleForProject(Long projectId, List<MultipartFile> files) throws Exception {
        Project projectRef = projectRepository.getReferenceById(projectId);
        for (MultipartFile file : files) {
            String filename = storage.makeSafeFilename(file.getOriginalFilename());
            String path = "attachments/" + projectId + "/" + filename;
            String storedPath = storage.uploadToPath(file, path);
            String toStore = props.isBucketPublic() ? storage.publicUrl(storedPath) : storedPath;
            Attachment att = Attachment.builder()
                    .attachmentURL(toStore)
                    .project(projectRef)
                    .build();
            attachmentRepository.save(att);
        }
    }

    public void deleteAttachment(Long attachmentId) throws Exception {
        Attachment att = attachmentRepository.findById(attachmentId)
                .orElseThrow(() -> new IllegalArgumentException("Attachment not found: " + attachmentId));
        String filePath = att.getAttachmentURL();
        if (props.isBucketPublic() && filePath.startsWith("http")) {
            int idx = filePath.indexOf(props.getBucket()) + props.getBucket().length() + 1;
            filePath = filePath.substring(idx);
        }
        storage.deleteFile(filePath);
        attachmentRepository.deleteById(attachmentId);
    }

    public void updateAttachment(Long attachmentId, MultipartFile file) throws Exception {
        Attachment att = attachmentRepository.findById(attachmentId)
                .orElseThrow(() -> new IllegalArgumentException("Attachment not found: " + attachmentId));
        String oldPath = att.getAttachmentURL();
        if (props.isBucketPublic() && oldPath.startsWith("http")) {
            int idx = oldPath.indexOf(props.getBucket()) + props.getBucket().length() + 1;
            oldPath = oldPath.substring(idx);
        }
        storage.deleteFile(oldPath);
        String filename = storage.makeSafeFilename(file.getOriginalFilename());
        String path = "attachments/" + att.getProject().getProjectId() + "/" + filename;
        String storedPath = storage.uploadToPath(file, path);
        String toStore = props.isBucketPublic() ? storage.publicUrl(storedPath) : storedPath;

        att.setAttachmentURL(toStore);
        attachmentRepository.save(att);
    }

    public String resolveViewUrl(Attachment att) throws Exception {
        String val = att.getAttachmentURL();
        if (val == null) return null;
        if (val.startsWith("http")) return val;
        return storage.createSignedUrl(val, 3600);
    }
}
