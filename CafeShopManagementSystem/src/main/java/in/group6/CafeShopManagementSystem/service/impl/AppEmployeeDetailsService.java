package in.group6.CafeShopManagementSystem.service.impl;

import in.group6.CafeShopManagementSystem.entity.EmployeeEntity;
import in.group6.CafeShopManagementSystem.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AppEmployeeDetailsService implements UserDetailsService {

    private final EmployeeRepository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
         EmployeeEntity existingEmployee =  employeeRepository.findByEmail(email)
                 .orElseThrow(() -> new UsernameNotFoundException("Email not found for the email: " + email));
    return new User(existingEmployee.getEmail(), existingEmployee.getPassword(),
            Collections.singleton(new SimpleGrantedAuthority(existingEmployee.getRole())));
    }
}
