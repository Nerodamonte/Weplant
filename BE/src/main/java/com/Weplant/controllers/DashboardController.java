package com.Weplant.controllers;

import com.Weplant.dtos.responses.ApiResponse;
import com.Weplant.dtos.responses.Dashboard.DashboardResponse;
import com.Weplant.services.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboards")
public class DashboardController {
    @Autowired
    DashboardService dashboardService;

    @GetMapping("/stats")
    public ApiResponse<DashboardResponse> getDashboardStats() {
        DashboardResponse response = dashboardService.getDashboardStats();
        return ApiResponse.<DashboardResponse>builder()
                .data(response)
                .build();
    }
}
