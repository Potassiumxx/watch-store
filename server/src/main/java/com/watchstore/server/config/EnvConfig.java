package com.watchstore.server.config;

import io.github.cdimascio.dotenv.Dotenv;

public class EnvConfig {
  public static void loadEnv() {
    Dotenv dotenv = Dotenv.load();
    System.setProperty("spring.datasource.url", dotenv.get("DB_URL"));
    System.setProperty("spring.datasource.username", dotenv.get("DB_USERNAME"));
    System.setProperty("spring.datasource.password", dotenv.get("DB_PASSWORD"));
    System.setProperty("app.admin.email", dotenv.get("ADMIN_EMAIL"));
    System.setProperty("JWT_SECRET_KEY", dotenv.get("JWT_SECRET_KEY"));
  }
}
