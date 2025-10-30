package com.Weplant.dtos.responses.Dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ServiceUsageResponse {
    String serviceName;
    Long usageCount;
}
