package in.group6.CafeShopManagementSystem.controller;


import com.razorpay.RazorpayException;
import in.group6.CafeShopManagementSystem.io.OrderResponse;
import in.group6.CafeShopManagementSystem.io.PaymentRequest;
import in.group6.CafeShopManagementSystem.io.PaymentVerificationRequest;
import in.group6.CafeShopManagementSystem.io.RazorpayOrderResponse;
import in.group6.CafeShopManagementSystem.service.OrderService;
import in.group6.CafeShopManagementSystem.service.RazorpayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final RazorpayService razorpayService;

    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request) throws RazorpayException {
        return razorpayService.createOrder(request.getAmount(), request.getCurrency());

    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request) {
        return orderService.verifyPayment(request);
    }


}
