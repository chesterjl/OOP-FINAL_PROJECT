package in.group6.CafeShopManagementSystem.service.impl;

import in.group6.CafeShopManagementSystem.entity.EmployeeEntity;
import in.group6.CafeShopManagementSystem.io.EmployeeRequest;
import in.group6.CafeShopManagementSystem.io.EmployeeResponse;
import in.group6.CafeShopManagementSystem.repository.EmployeeRepository;
import in.group6.CafeShopManagementSystem.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public EmployeeResponse createEmployee(EmployeeRequest request) {
        EmployeeEntity newEmployee =  convertToEntity(request);
        newEmployee = employeeRepository.save(newEmployee);
        return convertToResponse(newEmployee);
    }

    private EmployeeResponse convertToResponse(EmployeeEntity newEmployee) {
        return EmployeeResponse.builder()
                .firstName(newEmployee.getFirstName())
                .lastName(newEmployee.getLastName())
                .email(newEmployee.getEmail())
                .employeeId(newEmployee.getEmployeeId())
                .createdAt(newEmployee.getCreatedAt())
                .updatedAt(newEmployee.getUpdatedAt())
                .role(newEmployee.getRole())
                .build();
    }

    private EmployeeEntity convertToEntity(EmployeeRequest request) {
        return EmployeeEntity.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .employeeId(UUID.randomUUID().toString())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole().toUpperCase())
                .build();
    }

    @Override
    public String getEmployeeRole(String email) {
        EmployeeEntity existingEmployee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Employee not found for the email: " + email));
        return existingEmployee.getRole();
    }

    @Override
    public List<EmployeeResponse> readEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(employee -> convertToResponse(employee))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteEmployee(String id) {
        EmployeeEntity existingEmployee =  employeeRepository.findByEmployeeId(id)
                .orElseThrow(() -> new UsernameNotFoundException("Employee not found"));
        employeeRepository.delete(existingEmployee);
    }
}
