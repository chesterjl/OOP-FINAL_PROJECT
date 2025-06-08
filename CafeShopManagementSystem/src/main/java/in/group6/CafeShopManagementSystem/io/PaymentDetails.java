package in.group6.CafeShopManagementSystem.io;


import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDetails {

    private PaymentStatus status;
    public enum PaymentStatus {
        COMPLETED
    }
}
