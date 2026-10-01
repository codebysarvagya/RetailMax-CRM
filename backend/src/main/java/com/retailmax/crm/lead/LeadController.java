package com.retailmax.crm.lead;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/leads")
public class LeadController {

    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    @GetMapping
    public List<Lead> findAll() {
        return leadService.getAllLeads();
    }

    @GetMapping("/{id}")
    public Lead findById(@PathVariable Long id) {
        return leadService.getLeadById(id);
    }

    @PostMapping
    public ResponseEntity<Lead> create(@Valid @RequestBody LeadRequest request) {
        Lead created = leadService.createLead(request);
        return ResponseEntity
                .created(URI.create("/api/leads/" + created.getId()))
                .body(created);
    }

    @PutMapping("/{id}")
    public Lead update(@PathVariable Long id, @Valid @RequestBody LeadRequest request) {
        return leadService.updateLead(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        leadService.deleteLead(id);
        return ResponseEntity.noContent().build();
    }
}
