package in.group6.CafeShopManagementSystem.controller;


import in.group6.CafeShopManagementSystem.io.EmployeeRequest;
import in.group6.CafeShopManagementSystem.io.EmployeeResponse;
import in.group6.CafeShopManagementSystem.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/owner")
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public EmployeeResponse registerEmployee(@RequestBody EmployeeRequest request) {
        try {
            return employeeService.createEmployee(request);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Failed to create employee: " + e.getMessage());
        }
    }

    @GetMapping("/employees")
    public List<EmployeeResponse> readEmployees() {
         return employeeService.readEmployees();
    }

    @DeleteMapping("/employees/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEmployee(@PathVariable String id) {
        try {
            employeeService.deleteEmployee(id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Failed to delete employee");
        }
    }
}
