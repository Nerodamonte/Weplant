package com.Weplant.repositories;

import com.Weplant.dtos.responses.Dashboard.TemplatePurchaseResponse;
import com.Weplant.entities.TemplateOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TemplateOwnerRepository extends JpaRepository<TemplateOwner, Long> {
    @Query("SELECT new com.Weplant.dtos.responses.Dashboard.TemplatePurchaseResponse(to.template.templateName, COUNT(to)) " +
            "FROM TemplateOwner to " +
            "GROUP BY to.template.templateName " +
            "ORDER BY COUNT(to) DESC")
    List<TemplatePurchaseResponse> countTemplatePurchases();
}
