package in.group6.CafeShopManagementSystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class CafeShopManagementSystemApplication {

	public static void main(String[] args) {

		SpringApplication.run(CafeShopManagementSystemApplication.class, args

		);
	}

}
