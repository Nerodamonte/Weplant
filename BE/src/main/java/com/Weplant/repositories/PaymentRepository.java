package com.Weplant.repositories;

import com.Weplant.dtos.responses.Dashboard.MonthlyRevenueResponse;
import com.Weplant.entities.Payment;
import com.Weplant.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> getByUserUserId(Long userId);
    @Query("SELECT SUM(p.price) FROM Payment p WHERE p.paymentStatus = :status")
    Long sumTotalRevenueByStatus(PaymentStatus status);

    @Query("SELECT new com.Weplant.dtos.responses.Dashboard.MonthlyRevenueResponse(" +
            "YEAR(p.payDated), MONTH(p.payDated), " +
            "CONCAT('Tháng ', MONTH(p.payDated)), COALESCE(SUM(p.price), 0)) " +
            "FROM Payment p " +
            "WHERE p.paymentStatus = :status AND p.payDated IS NOT NULL " +
            "GROUP BY YEAR(p.payDated), MONTH(p.payDated) " +
            "ORDER BY YEAR(p.payDated) DESC, MONTH(p.payDated) DESC")
    List<MonthlyRevenueResponse> sumRevenueByMonth(@Param("status") PaymentStatus status);


    @Query("SELECT new com.Weplant.dtos.responses.Dashboard.MonthlyRevenueResponse(" +
            "YEAR(p.payDated), MONTH(p.payDated), " +
            "CONCAT('Tháng ', MONTH(p.payDated)), COALESCE(SUM(p.price), 0)) " +
            "FROM Payment p " +
            "WHERE p.paymentStatus = :status AND YEAR(p.payDated) = YEAR(CURRENT_DATE) " +
            "GROUP BY YEAR(p.payDated), MONTH(p.payDated) " +
            "ORDER BY MONTH(p.payDated)")
    List<MonthlyRevenueResponse> sumRevenueByCurrentYear(@Param("status") PaymentStatus status);

    List<Payment> findAllByPaymentStatusOrderByPayDatedDesc(PaymentStatus paymentStatus);
}
