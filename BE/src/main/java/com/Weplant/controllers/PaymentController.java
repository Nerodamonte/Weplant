package com.Weplant.controllers;

import com.Weplant.dtos.requests.sepayRequest;
import com.Weplant.dtos.responses.ApiResponse;
import com.Weplant.dtos.responses.PaymentDetailResponse;
import com.Weplant.dtos.responses.PaymentResponse;
import com.Weplant.services.EmailService;
import com.Weplant.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @Autowired
    PaymentService paymentService;
    @Autowired
    EmailService emailService;

    @GetMapping("/getByUser/{id}")
    public ApiResponse<List<PaymentResponse>> getByUser(@PathVariable Long id){
        List<PaymentResponse> response = paymentService.getByUserId(id);
        return ApiResponse.<List<PaymentResponse>>builder()
                .data(response)
                .build();
    }

    @GetMapping("/getQrCode/{id}")
    public ApiResponse<String> getQrCode(@PathVariable Long id){
        String qrCode = paymentService.generateQR(id);
        return ApiResponse.<String>builder()
                .data(qrCode)
                .build();
    }

    @PostMapping("/sepayCallback")
    public ApiResponse<Void> handleCallBack(@RequestBody sepayRequest request) {
        paymentService.completePayment(request.getContent());
        emailService.sendProjectCreatedMail();
        return ApiResponse.<Void>builder()
                .message("Callback handled successfully")
                .build();
    }

    @GetMapping("/getAll")
    public ApiResponse<List<PaymentDetailResponse>> getAll(){
        List<PaymentDetailResponse> response = paymentService.getAllPayments();
        return ApiResponse.<List<PaymentDetailResponse>>builder()
                .data(response)
                .build();
    }
}
