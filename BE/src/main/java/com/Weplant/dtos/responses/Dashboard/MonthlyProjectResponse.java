package com.Weplant.dtos.responses.Dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class MonthlyProjectResponse {
    Integer year;
    Integer month;
    String monthName;
    Long projectCount;
}