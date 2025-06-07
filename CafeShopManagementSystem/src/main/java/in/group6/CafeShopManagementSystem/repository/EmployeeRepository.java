package in.group6.CafeShopManagementSystem.repository;

import in.group6.CafeShopManagementSystem.entity.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Long> {

    Optional<EmployeeEntity> findByEmail(String email);

    Optional<EmployeeEntity> findByEmployeeId(String employeeId);

}
