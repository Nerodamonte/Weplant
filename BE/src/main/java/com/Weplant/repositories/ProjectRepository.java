package com.Weplant.repositories;

import com.Weplant.dtos.responses.Dashboard.MonthlyProjectResponse;
import com.Weplant.dtos.responses.Dashboard.ServiceUsageResponse;
import com.Weplant.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project,Long> {
    List<Project> findProjectByUser_UserId(Long userId);
    @Query("SELECT new com.Weplant.dtos.responses.Dashboard.ServiceUsageResponse(p.packageEntity.packageName, COUNT(p)) " +
            "FROM Project p " +
            "WHERE p.packageEntity IS NOT NULL " +
            "GROUP BY p.packageEntity.packageName " +
            "ORDER BY COUNT(p) DESC")
    List<ServiceUsageResponse> countServiceUsage();

    @Query("SELECT new com.Weplant.dtos.responses.Dashboard.MonthlyProjectResponse(" +
            "YEAR(p.createAt), MONTH(p.createAt), " +
            "CONCAT('Tháng ', MONTH(p.createAt)), COUNT(p)) " +
            "FROM Project p " +
            "WHERE p.createAt IS NOT NULL " +
            "GROUP BY YEAR(p.createAt), MONTH(p.createAt) " +
            "ORDER BY YEAR(p.createAt) DESC, MONTH(p.createAt) DESC")
    List<MonthlyProjectResponse> countProjectsByMonth();

    // Lấy thống kê project theo tháng trong năm hiện tại
    @Query("SELECT new com.Weplant.dtos.responses.Dashboard.MonthlyProjectResponse(" +
            "YEAR(p.createAt), MONTH(p.createAt), " +
            "CONCAT('Tháng ', MONTH(p.createAt)), COUNT(p)) " +
            "FROM Project p " +
            "WHERE YEAR(p.createAt) = YEAR(CURRENT_DATE) " +
            "GROUP BY YEAR(p.createAt), MONTH(p.createAt) " +
            "ORDER BY MONTH(p.createAt)")
    List<MonthlyProjectResponse> countProjectsByCurrentYear();
}
