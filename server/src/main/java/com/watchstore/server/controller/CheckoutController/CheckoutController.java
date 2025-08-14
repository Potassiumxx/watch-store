package com.watchstore.server.controller.CheckoutController;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
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
  @ResponseStatus(HttpStatus.CREATED)
  public String placeOrder(@RequestBody OrderRequestDTO orderRequest) {
    orderService.placeOrder(orderRequest);
    return "Order created";
  }
}
