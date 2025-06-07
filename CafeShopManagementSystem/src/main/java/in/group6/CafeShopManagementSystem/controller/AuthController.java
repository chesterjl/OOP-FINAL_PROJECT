package in.group6.CafeShopManagementSystem.controller;

import in.group6.CafeShopManagementSystem.io.AuthRequest;
import in.group6.CafeShopManagementSystem.io.AuthResponse;
import in.group6.CafeShopManagementSystem.service.EmployeeService;
import in.group6.CafeShopManagementSystem.service.impl.AppEmployeeDetailsService;
import in.group6.CafeShopManagementSystem.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final AppEmployeeDetailsService appEmployeeDetailsService;
    private final EmployeeService employeeService;

    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) throws Exception {
        authenticate(request.getEmail(), request.getPassword());
        final UserDetails userDetails = appEmployeeDetailsService.loadUserByUsername(request.getEmail());
        final String jwtToken = jwtUtil.generateToken(userDetails);
        String role = employeeService.getEmployeeRole(request.getEmail());
        return new AuthResponse(request.getEmail(), jwtToken, role);
    }

    private void authenticate(String email, String password) throws Exception{
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (DisabledException e) {
            throw new  Exception("Employee disabled");
        } catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email or password is incorrect");
        } 
    }

    @PostMapping("/encode")
    public String encodePassword(@RequestBody Map<String, String> request ) {
        return passwordEncoder.encode(request.get("password"));

    }
}
