package com.watchstore.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.watchstore.server.dto.ProductRequest;
import com.watchstore.server.model.Product;
import com.watchstore.server.repository.ProductRepository;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/add-product")
    public ResponseEntity<Object> addProduct(@ModelAttribute ProductRequest productRequest) {
        Product product = new Product();
        product.setName(productRequest.getProductName());
        product.setPrice(productRequest.getProductPrice());
        product.setCategory(productRequest.getProductCategory());
        product.setDescription(productRequest.getProductDescription());
        product.setImage(productRequest.getProductImage());

        // productRepository.save(product);
        System.out.println("Product Name: " + productRequest.getProductName());

        return new ResponseEntity<>("Finished", HttpStatus.CREATED);
    }
}
