package com.Weplant.services;

import com.Weplant.entities.Project;
import com.Weplant.entities.User;
import com.Weplant.enums.EmailType;
import com.Weplant.repositories.ProjectRepository;
import com.Weplant.repositories.UserRepository;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.rmi.server.LogStream.log;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    private String resetPasswordBaseUrl = "https://weplant-lac.vercel.app/reset-password?token=";
    private String activateAccountBaseUrl = "https://weplant-lac.vercel.app/activate-account?email=";
    private String frontendBaseUrl = "https://weplant-lac.vercel.app";

    public void sendEmailFigmaAndCoding(Long projectId, EmailType type) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy project " + projectId));

        User user = userRepository.findById(project.getUser().getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user cho projectId=" + projectId));

        String subject;
        String content;

        switch (type) {
            case FIGMA_DONE -> {
                subject = "Figma task completed";
                content = "Dự án [" + project.getProjectName() + "] đã hoàn thành design."
                        + "<br><a href=\"" + frontendBaseUrl + "\">Vô trang web ngay</a>";
            }
            case CODE_DONE -> {
                subject = "Code task completed";
                content = "Dự án [" + project.getProjectName() + "] đã hoàn thành coding."
                        + "<br><a href=\"" + frontendBaseUrl + "\">Đến trang web ngay!!!</a>";;
            }
            default -> {
                throw new RuntimeException("Loại email không hợp lệ");
            }
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");
            helper.setTo(user.getEmail());
            helper.setSubject(subject);
            helper.setText(content, false);
            helper.setFrom(fromEmail); // phải trùng với tài khoản Gmail gửi

            mailSender.send(message);
            System.out.println("✅ Email sent to " + user.getEmail());
        } catch (Exception e) {
            System.err.println("❌ Gửi mail thất bại: " + e.getMessage());
            throw new RuntimeException("Gửi mail thất bại", e);
        }
    }

    public void sendResetPasswordMail(String toEmail, String token) {
        String subject = "Weplant - Password Reset Request";
        String resetLink = resetPasswordBaseUrl + token;
        String content = "<p>Weplant nhận được yêu cầu đặt lại mật khẩu của bạn.</p>"
                + "<p>Vui lòng nhấp vào liên kết bên dưới để đặt lại mật khẩu:</p>"
                + "<a href=\"" + resetLink + "\">Đặt lại mật khẩu</a>"
                + "<br><br>"
                + "<p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>";

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(content, true); // true để gửi nội dung HTML
            helper.setFrom(fromEmail); // phải trùng với tài khoản Gmail gửi

            mailSender.send(message);
            System.out.println("✅ Password reset email sent to " + toEmail);
        } catch (Exception e) {
            System.err.println("❌ Gửi mail thất bại: " + e.getMessage());
            throw new RuntimeException("Gửi mail thất bại", e);
        }
    }

    public void sendActivateAccountMail(String toEmail) {
        String subject = "Weplant - Activate Your Account";
        String activateLink = activateAccountBaseUrl + toEmail ;
        String content = "<p>Welcome to Weplant!</p>"
                + "<p>Please click the link below to activate your account:</p>"
                + "<a href=\"" + activateLink + "\">Activate Account</a>"
                + "<br><br>"
                + "<p>If you did not sign up for this account, please ignore this email.</p>";

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(content, true); // true để gửi nội dung HTML
            helper.setFrom(fromEmail); // phải trùng với tài khoản Gmail gửi

            mailSender.send(message);
            System.out.println("✅ Activation email sent to " + toEmail);
        } catch (Exception e) {
            System.err.println("❌ Gửi mail thất bại: " + e.getMessage());
            throw new RuntimeException("Gửi mail thất bại", e);
        }
    }

    public void sendProjectCreatedMail(){
        String subject = "Weplant - New Project Created";
        String content = "<p>A new project named has been created.</p>"
                + "<p>Please log in to your account to view the project details.</p>";

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(fromEmail);
            helper.setSubject(subject);
            helper.setText(content, true);
            helper.setFrom(fromEmail);
            mailSender.send(message);
            System.out.println("✅ New project creation email sent to " + fromEmail);
        } catch (Exception e) {
            System.err.println("❌ Gửi mail thất bại: " + e.getMessage());
            throw new RuntimeException("Gửi mail thất bại", e);
        }
    }



}
