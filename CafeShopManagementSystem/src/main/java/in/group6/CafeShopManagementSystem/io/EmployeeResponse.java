package in.group6.CafeShopManagementSystem.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmployeeResponse {

    private String employeeId;
    private String firstName;
    private String lastName;
    private String email;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String role;


}
