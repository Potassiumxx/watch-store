package com.watchstore.server.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.watchstore.server.controller.UserOrderResponseDTO;
import com.watchstore.server.dto.order.OrderItemDTO;
import com.watchstore.server.dto.order.OrderRequestDTO;
import com.watchstore.server.dto.order.OrderResponseDTO;
import com.watchstore.server.exceptions.BadRequestException;
import com.watchstore.server.exceptions.ResourceNotFoundException;
import com.watchstore.server.model.Inventory;
import com.watchstore.server.model.Order;
import com.watchstore.server.model.OrderItem;
import com.watchstore.server.model.Product;
import com.watchstore.server.model.User;
import com.watchstore.server.repository.InventoryRepository;
import com.watchstore.server.repository.OrderItemRepository;
import com.watchstore.server.repository.OrderRepository;
import com.watchstore.server.repository.ProductRepository;
import com.watchstore.server.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
  private final OrderRepository orderRepository;
  private final OrderItemRepository orderItemRepository;
  private final UserRepository userRepository;
  private final ProductRepository productRepository;
  private final InventoryRepository inventoryRepository;

  public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository,
      UserRepository userRepository, ProductRepository productRepository, InventoryRepository inventoryRepository) {
    this.orderRepository = orderRepository;
    this.orderItemRepository = orderItemRepository;
    this.userRepository = userRepository;
    this.productRepository = productRepository;
    this.inventoryRepository = inventoryRepository;
  }

  public List<OrderResponseDTO> getAllOrders() {
    List<Order> orders = orderRepository.findAll();
    return orders.stream().map(OrderResponseDTO::new).collect(Collectors.toList());
  }

  public List<UserOrderResponseDTO> getOrderByUserId(Long userID) {
    return orderRepository.findByUserId(userID).stream().map(UserOrderResponseDTO::new).collect(Collectors.toList());
  }

  @Transactional
  public void placeOrder(OrderRequestDTO dto) {
    User user = null;
    if (dto.getUserId() != null) {
      user = userRepository.findById(dto.getUserId())
          .orElseThrow(() -> new BadRequestException("Invalid user ID"));
    }

    Order order = new Order(user, dto.getDropLocation(), dto.getPhoneNumber());

    for (OrderItemDTO itemDTO : dto.getItems()) {
      Product product = productRepository.findById(itemDTO.getProductId())
          .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + itemDTO.getProductId()));

      Inventory inventory = inventoryRepository.findByProduct(product).orElseThrow(
          () -> new ResourceNotFoundException("Inventory not found for the product " + product.getName()));

      if (inventory.getQuantity() == 0) {
        throw new BadRequestException("Out of stock for product " + product.getName());
      }

      if (inventory.getQuantity() < itemDTO.getQuantity()) {
        throw new BadRequestException("Insufficient stock for product " + product.getName());
      }

      inventory.setQuantity(inventory.getQuantity() - itemDTO.getQuantity());
      inventoryRepository.save(inventory);

      OrderItem item = new OrderItem(order, product, itemDTO.getQuantity(), itemDTO.getUnitPrice());
      order.addItem(item);
    }

    orderRepository.save(order);
  }

  public void deleteOrder(Long id) {
    orderRepository.deleteById(id);
  }

  public List<OrderItem> getItemsByOrderId(Long orderId) {
    return orderItemRepository.findByOrderId(orderId);
  }

  @Transactional
  public Order saveOrderWithItems(Order order, List<OrderItem> items) {
    for (OrderItem item : items) {
      order.addItem(item); // sets bidirectional relationship
    }
    return orderRepository.save(order);
  }
}
