package com.watchstore.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public ResponseEntity<Object> addProduct(@RequestBody ProductRequest productRequest) {
        Product product = new Product();
        product.setName(productRequest.getName());
        product.setPrice(productRequest.getPrice());
        product.setCategory(productRequest.getCategory());
        product.setDescription(productRequest.getDescription());
        product.setImage(productRequest.getImage());

        // productRepository.save(product);
        System.out.println(product);

        return new ResponseEntity<>("Finished", HttpStatus.CREATED);
    }
}
