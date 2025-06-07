package in.group6.CafeShopManagementSystem.service;


import com.razorpay.RazorpayException;
import in.group6.CafeShopManagementSystem.io.RazorpayOrderResponse;

public interface RazorpayService {

    RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;


}
