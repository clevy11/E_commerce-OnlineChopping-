package com.webtech.onlineshop.application.controller;

import com.webtech.onlineshop.application.model.Product;
import com.webtech.onlineshop.application.service.ProductService;
import com.webtech.onlineshop.common.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Public endpoints for viewing products
    @GetMapping("/public/products")
    public ResponseEntity<ResponseObject> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return new ResponseEntity<>(new ResponseObject(products), HttpStatus.OK);
    }

    @GetMapping("/public/products/{id}")
    public ResponseEntity<ResponseObject> getProductById(@PathVariable UUID id) {
        Optional<Product> productOptional = productService.getProductById(id);
        return productOptional.map(product -> new ResponseEntity<>(new ResponseObject(product), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Admin endpoints for managing products
    @PostMapping("/admin/products")
    public ResponseEntity<ResponseObject> createProduct(@RequestBody Product product) {
        Product savedProduct = productService.saveProduct(product);
        return new ResponseEntity<>(new ResponseObject(savedProduct), HttpStatus.CREATED);
    }

    @PutMapping("/admin/products/{id}")
    public ResponseEntity<ResponseObject> updateProduct(@PathVariable UUID id, @RequestBody Product product) {
        product.setId(id);
        Product updatedProduct = productService.saveProduct(product);
        return new ResponseEntity<>(new ResponseObject(updatedProduct), HttpStatus.OK);
    }

    @DeleteMapping("/admin/products/{id}")
    public ResponseEntity<ResponseObject> deleteProduct(@PathVariable UUID id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(new ResponseObject("Product deleted successfully"), HttpStatus.OK);
    }
}
