package com.watchstore.server.startup;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.watchstore.server.repository.UserRepository;

@Component
public class StartupService {
  private final UserRepository userRepository;

  private final String adminEmail;

  public StartupService(UserRepository userRepository, @Value("${app.admin.email:}") String adminEmail) {
    this.userRepository = userRepository;
    this.adminEmail = adminEmail;
  }

  @EventListener(ApplicationReadyEvent.class)
  public void promoteAdminUser() {
    if (adminEmail == null || adminEmail.isBlank()) {
      System.out.println("No admin email configured.");
      return;
    }

    userRepository.findByEmail(adminEmail).ifPresentOrElse(user -> {
      if (!user.getRole().equals("ADMIN")) {
        user.setRole("ADMIN");
        ;
        userRepository.save(user);
        System.out.println("Promoted user " + adminEmail + " to admin.");
      } else {
        System.out.println("User " + adminEmail + " is already an admin.");
      }
    }, () -> {
      System.out.println("Admin email " + adminEmail + " not found in database.");
    });
  }
}
