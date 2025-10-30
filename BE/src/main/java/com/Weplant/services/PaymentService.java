package com.Weplant.services;

import com.Weplant.dtos.responses.PaymentDetailResponse;
import com.Weplant.dtos.responses.PaymentResponse;
import com.Weplant.entities.*;
import com.Weplant.enums.PaymentStatus;
import com.Weplant.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class PaymentService {
    @Autowired
    PaymentRepository paymentRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PackageRepository packageRepository;
    @Autowired
    TemplateRepository templateRepository;

    private String qrLink="https://qr.sepay.vn/img?acc=0793879855&bank=MB&amount=SO_TIEN&des=NOI_DUNG";

    @Transactional
    public void createPayment(Long userId, Long packageId, String projectName, Long templateId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        PackageEntity packageEntity = packageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found"));

        Long price = packageEntity.getPackagePrice() / 2;
        Long extra = (templateId != null)
                ? templateRepository.findById(templateId).orElseThrow().getPrice()
                : 0L;

        // Payment 1
        Payment payment1 = Payment.builder()
                .user(user)
                .price(price + extra)
                .paymentStatus(PaymentStatus.PENDING)
                .createAt(LocalDateTime.now())
                .build();
        paymentRepository.save(payment1);

        // Payment 2
        Payment payment2 = Payment.builder()
                .user(user)
                .price(price)
                .paymentStatus(PaymentStatus.PENDING)
                .createAt(LocalDateTime.now())
                .build();
        paymentRepository.save(payment2);

        // Cập nhật description
        payment1.setDescription("ID" + payment1.getPaymentId() + " " + projectName + " thanh toán đợt 1");
        payment2.setDescription("ID" + payment2.getPaymentId() + " " + projectName + " thanh toán đợt 2");
        paymentRepository.save(payment1);
        paymentRepository.save(payment2);
    }

    public void completePayment(String content) {
        Long id = extractPaymentId(content);
        Payment payment = paymentRepository.findById(id).orElseThrow();

        payment.setPaymentStatus(PaymentStatus.COMPLETED);
        payment.setPayDated(LocalDateTime.now());
        paymentRepository.save(payment);
    }

    public List<PaymentResponse> getByUserId(Long userId) {
        List<Payment> payments = paymentRepository.getByUserUserId(userId);
        if (payments.isEmpty()) {
            throw new RuntimeException("No payments found for user");
        }
        return payments.stream().map(payment -> PaymentResponse.builder()
                .paymentId(payment.getPaymentId())
                .description(payment.getDescription())
                .price(payment.getPrice())
                .payDated(payment.getPayDated())
                .paymentStatus(payment.getPaymentStatus())
                .build()).toList();
    }

    public String generateQR(Long id) {
        Payment payment = paymentRepository.findById(id).orElseThrow(() -> new RuntimeException("Payment not found"));
        String QRLink = qrLink;
        QRLink = QRLink.replace("SO_TIEN", String.valueOf(payment.getPrice()));
        QRLink = QRLink.replace("NOI_DUNG", payment.getDescription());
        return QRLink;
    }

    private Long extractPaymentId(String content) {
        String[] parts = content.split("\\.", 4);
        if (parts.length < 4) {
            throw new IllegalArgumentException("Không đúng định dạng content SEPAY: " + content);
        }

        String realContent = parts[3].trim();

        Pattern pattern = Pattern.compile("^ID(\\d+)");
        Matcher matcher = pattern.matcher(realContent);
        if (matcher.find()) {
            return Long.parseLong(matcher.group(1));
        } else {
            throw new IllegalArgumentException("Không tìm thấy paymentId trong nội dung: " + realContent);
        }
    }

    public List<PaymentDetailResponse> getAllPayments() {
        List<Payment> payments = paymentRepository
                .findAllByPaymentStatusOrderByPayDatedDesc(PaymentStatus.COMPLETED);
        return payments.stream().map(payment -> PaymentDetailResponse.builder()
                .paymentId(payment.getPaymentId())
                .fullName(payment.getUser().getFullName())
                .description(payment.getDescription())
                .price(payment.getPrice())
                .payDated(payment.getPayDated())
                .paymentStatus(payment.getPaymentStatus())
                .build()).toList();
    }
}
