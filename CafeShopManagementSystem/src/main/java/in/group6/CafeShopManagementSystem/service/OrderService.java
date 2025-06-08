package in.group6.CafeShopManagementSystem.service;

import in.group6.CafeShopManagementSystem.io.OrderRequest;
import in.group6.CafeShopManagementSystem.io.OrderResponse;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {

    OrderResponse createOrder(OrderRequest request);

    void deleteOrder(String orderId);

    List<OrderResponse> getLatestOrders();

    Double sumSalesByDate(LocalDate date);

    Long countByOrderDate(LocalDate date);

    List<OrderResponse> findRecentOrders();

}
