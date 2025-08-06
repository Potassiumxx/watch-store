package com.watchstore.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.watchstore.server.dto.order.OrderRequestDTO;
import com.watchstore.server.model.Order;
import com.watchstore.server.repository.ProductRepository;
import com.watchstore.server.repository.UserRepository;
import com.watchstore.server.service.OrderService;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

  private final OrderService orderService;

  public CheckoutController(OrderService orderService, ProductRepository productRepository,
      UserRepository userRepository) {
    this.orderService = orderService;
  }

  @PostMapping
  public ResponseEntity<Order> placeOrder(@RequestBody OrderRequestDTO orderRequest) {
    Order placedOrder = orderService.placeOrder(orderRequest);
    return ResponseEntity.status(HttpStatus.CREATED).body(placedOrder);
  }
}
