package com.watchstore.server.controller.OrderController;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.watchstore.server.service.OrderService;
import com.watchstore.server.dto.order.UserOrderResponseDTO;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
  private final OrderService orderService;

  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @GetMapping("/user/{id}")
  @ResponseStatus(HttpStatus.OK)
  public List<UserOrderResponseDTO> getOrderByUserId(@PathVariable("id") Long userID) {
    return orderService.getOrderByUserId(userID);
  }
}
