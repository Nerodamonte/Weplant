package com.Weplant.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class PackageDetailResponse {
    Long packageId;
    String packageName;
    String packageDescription;
    Long packagePrice;
}
