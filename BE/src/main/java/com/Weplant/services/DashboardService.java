package com.Weplant.services;

import com.Weplant.dtos.responses.Dashboard.DashboardResponse;
import com.Weplant.dtos.responses.Dashboard.MonthlyProjectResponse;
import com.Weplant.dtos.responses.Dashboard.MonthlyRevenueResponse;
import com.Weplant.dtos.responses.Dashboard.ServiceUsageResponse;
import com.Weplant.dtos.responses.Dashboard.TemplatePurchaseResponse;
import com.Weplant.enums.PaymentStatus;
import com.Weplant.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DashboardService {
    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    PaymentRepository paymentRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    TemplateOwnerRepository templateOwnerRepository;
    @Autowired
    TemplateRepository templateRepository;
    @Autowired
    FeedbackRepository feedbackRepository;

    public DashboardResponse getDashboardStats() {
        // Lấy các thống kê cơ bản
        Long totalUsers = userRepository.count();
        Long totalProjects = projectRepository.count();
        Long totalRevenue = paymentRepository.sumTotalRevenueByStatus(PaymentStatus.COMPLETED);
        Long totalTemplates = templateRepository.count();
        Long totalFeedbacks = feedbackRepository.count();

        // Lấy dữ liệu cho biểu đồ
        List<ServiceUsageResponse> serviceUsage = projectRepository.countServiceUsage();
        List<TemplatePurchaseResponse> templatePurchases = templateOwnerRepository.countTemplatePurchases();

        // Lấy dữ liệu thống kê theo tháng
        List<MonthlyProjectResponse> monthlyProjects = projectRepository.countProjectsByCurrentYear();
        List<MonthlyRevenueResponse> monthlyRevenue = paymentRepository.sumRevenueByCurrentYear(PaymentStatus.COMPLETED);

        // Xây dựng và trả về DTO tổng hợp
        return DashboardResponse.builder()
                .totalUsers(totalUsers)
                .totalProjects(totalProjects)
                .totalFeedbacks(totalFeedbacks)
                .totalRevenue(totalRevenue != null ? totalRevenue : 0L)
                .totalTemplates(totalTemplates)
                .serviceUsage(serviceUsage)
                .templatePurchases(templatePurchases)
                .monthlyProjects(monthlyProjects)
                .monthlyRevenue(monthlyRevenue)
                .build();
    }

    // Phương thức lấy thống kê theo tháng cho tất cả các năm
    public DashboardResponse getDashboardStatsAllTime() {
        // Lấy các thống kê cơ bản
        Long totalUsers = userRepository.count();
        Long totalProjects = projectRepository.count();
        Long totalRevenue = paymentRepository.sumTotalRevenueByStatus(PaymentStatus.COMPLETED);
        Long totalTemplates = templateRepository.count();
        Long totalFeedbacks = feedbackRepository.count();

        // Lấy dữ liệu cho biểu đồ
        List<ServiceUsageResponse> serviceUsage = projectRepository.countServiceUsage();
        List<TemplatePurchaseResponse> templatePurchases = templateOwnerRepository.countTemplatePurchases();

        // Lấy dữ liệu thống kê theo tháng cho tất cả các năm
        List<MonthlyProjectResponse> monthlyProjects = projectRepository.countProjectsByMonth();
        List<MonthlyRevenueResponse> monthlyRevenue = paymentRepository.sumRevenueByMonth(PaymentStatus.COMPLETED);

        // Xây dựng và trả về DTO tổng hợp
        return DashboardResponse.builder()
                .totalUsers(totalUsers)
                .totalProjects(totalProjects)
                .totalFeedbacks(totalFeedbacks)
                .totalRevenue(totalRevenue != null ? totalRevenue : 0L)
                .totalTemplates(totalTemplates)
                .serviceUsage(serviceUsage)
                .templatePurchases(templatePurchases)
                .monthlyProjects(monthlyProjects)
                .monthlyRevenue(monthlyRevenue)
                .build();
    }
}