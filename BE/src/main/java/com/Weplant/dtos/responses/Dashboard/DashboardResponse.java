package com.Weplant.dtos.responses.Dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class DashboardResponse {
    Long totalUsers;
    Long totalProjects;
    Long totalRevenue;
    Long totalTemplates;
    Long totalFeedbacks;

    List<ServiceUsageResponse> serviceUsage;
    List<TemplatePurchaseResponse> templatePurchases;

    List<MonthlyProjectResponse> monthlyProjects;
    List<MonthlyRevenueResponse> monthlyRevenue;
}
