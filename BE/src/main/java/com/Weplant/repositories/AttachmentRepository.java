package com.Weplant.repositories;

import com.Weplant.entities.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttachmentRepository extends JpaRepository<Attachment,Long> {
    List<Attachment> findByProject_ProjectId(Long projectId);
}
