package com.Weplant.dtos.requests;

import com.Weplant.enums.EmailType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailRequest {
    private Long projectId;
    private EmailType type;
}
