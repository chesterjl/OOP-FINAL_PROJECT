package in.group6.CafeShopManagementSystem.io;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmployeeRequest {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role;
}
