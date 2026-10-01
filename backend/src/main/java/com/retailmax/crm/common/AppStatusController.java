package com.retailmax.crm.common;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Health check endpoint for verifying API status and connectivity.
 */
@RestController
@RequestMapping("/api")
public class AppStatusController {

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "UP", "application", "RetailMax CRM API");
    }
}
