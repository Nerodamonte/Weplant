package com.Weplant.dtos.responses;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ApiResponse<T> {
    @Builder.Default
    int code = 200;
    @Builder.Default
    String message = "OK";
    T data;
}
