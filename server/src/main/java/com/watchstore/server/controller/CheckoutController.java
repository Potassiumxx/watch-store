package com.watchstore.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.watchstore.server.dto.order.OrderRequestDTO;
import com.watchstore.server.service.OrderService;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

  private final OrderService orderService;

  public CheckoutController(OrderService orderService) {
    this.orderService = orderService;
  }

  @PostMapping
  public ResponseEntity<Object> placeOrder(@RequestBody OrderRequestDTO orderRequest) {
    orderService.placeOrder(orderRequest);
    return new ResponseEntity<>("Order created", HttpStatus.CREATED);
  }
}
