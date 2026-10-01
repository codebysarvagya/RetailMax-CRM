package com.retailmax.crm.lead;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
public class LeadService {

    private final LeadRepository leadRepository;

    public LeadService(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    @Transactional(readOnly = true)
    public List<Lead> getAllLeads() {
        return leadRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Lead getLeadById(Long id) {
        return leadRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Lead not found with id: " + id));
    }

    public Lead createLead(LeadRequest request) {
        if (leadRepository.existsByEmail(request.email())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Lead already exists with email: " + request.email());
        }

        Lead lead = new Lead(
                request.name(),
                request.email(),
                request.phone(),
                request.source(),
                request.status()
        );
        return leadRepository.save(lead);
    }

    public Lead updateLead(Long id, LeadRequest request) {
        Lead existing = getLeadById(id);

        if (!existing.getEmail().equalsIgnoreCase(request.email())
                && leadRepository.existsByEmail(request.email())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Lead already exists with email: " + request.email());
        }

        existing.setName(request.name());
        existing.setEmail(request.email());
        existing.setPhone(request.phone());
        existing.setSource(request.source());
        existing.setStatus(request.status());

        return leadRepository.save(existing);
    }

    public void deleteLead(Long id) {
        Lead existing = getLeadById(id);
        leadRepository.delete(existing);
    }
}
