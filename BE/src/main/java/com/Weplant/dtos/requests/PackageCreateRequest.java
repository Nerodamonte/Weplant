package com.Weplant.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class PackageCreateRequest {
    String packageName;
    String packageDescription;
    Long packagePrice;
}
