package com.watchstore.server;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.watchstore.server.dto.ProductRequest;
import com.watchstore.server.model.Inventory;
import com.watchstore.server.model.Product;
import com.watchstore.server.repository.InventoryRepository;
import com.watchstore.server.repository.ProductRepository;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private InventoryRepository inventoryRepository;

    private String generateRandomFileName(String originalFileName) {
        int dotIndex = originalFileName.lastIndexOf(".");
        String fileExtension = originalFileName.substring(dotIndex);
        return UUID.randomUUID().toString() + fileExtension;
    }

    @PostMapping("/add-product")
    public ResponseEntity<Object> addProduct(@ModelAttribute ProductRequest productRequest) {
        MultipartFile file = productRequest.getProductImage();
        String fileName = file.getOriginalFilename();
        String uploadDirectory = "/home/asus/Pictures";
        String randomeFileName = generateRandomFileName(fileName);

        File destination = new File(uploadDirectory, randomeFileName);
        
        try {
			file.transferTo(destination);
            System.out.println("Saved file to " + destination.getAbsolutePath());
		} catch (IllegalStateException | IOException e) {
			e.printStackTrace();
            return new ResponseEntity<>("Image upload file", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Product product = new Product();
        product.setName(productRequest.getProductName());
        product.setPrice(productRequest.getProductPrice());
        product.setCategory(productRequest.getProductCategory());
        product.setDescription(productRequest.getProductDescription());
        product.setImage(randomeFileName);
        
        productRepository.save(product);

        Inventory inventory = new Inventory();
        inventory.setQuantity(productRequest.getProductQuantity());
        inventory.setProduct(product);

        inventoryRepository.save(inventory);

        // System.out.println("Product Quantity: " + productRequest.getProductQuantity());

        return new ResponseEntity<>("Finished", HttpStatus.CREATED);
    }
}
