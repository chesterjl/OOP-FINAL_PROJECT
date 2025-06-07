package in.group6.CafeShopManagementSystem.service;

import in.group6.CafeShopManagementSystem.io.EmployeeRequest;
import in.group6.CafeShopManagementSystem.io.EmployeeResponse;

import java.util.List;

public interface EmployeeService {

    EmployeeResponse createEmployee(EmployeeRequest request);

    String getEmployeeRole(String email);

    List<EmployeeResponse> readEmployees();

    void deleteEmployee(String id);

}
