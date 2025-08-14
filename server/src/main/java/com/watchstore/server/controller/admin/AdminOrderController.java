package com.watchstore.server.controller.admin;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.watchstore.server.dto.order.AdminOrderResponseDTO;
import com.watchstore.server.service.OrderService;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {
  private final OrderService orderService;

  public AdminOrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public List<AdminOrderResponseDTO> getAllOrders() {
    return orderService.getAllOrders();
  }
}
