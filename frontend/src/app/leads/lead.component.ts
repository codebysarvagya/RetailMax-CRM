import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeadService } from './lead.service';
import { Lead, LeadRequest, LEAD_SOURCES, LEAD_STATUSES } from './lead.model';

@Component({
  selector: 'app-lead',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lead.component.html',
  styleUrl: './lead.component.css'
})
export class LeadComponent implements OnInit {
  leads: Lead[] = [];
  form: LeadRequest = this.emptyForm();
  searchTerm = '';

  readonly sources = LEAD_SOURCES;
  readonly statuses = LEAD_STATUSES;
  readonly phonePattern = '^[+0-9\\s\\-()]{7,20}$';

  loading = false;
  saving = false;
  deleting = false;

  editingId: number | null = null;
  leadToDelete: Lead | null = null;

  errorMessage = '';
  successMessage = '';

  constructor(private readonly leadService: LeadService) {}

  ngOnInit(): void {
    this.loadLeads();
  }

  get filteredLeads(): Lead[] {
    if (!this.searchTerm.trim()) {
      return this.leads;
    }
    const term = this.searchTerm.toLowerCase().trim();
    return this.leads.filter((l) =>
      l.name.toLowerCase().includes(term) ||
      l.email.toLowerCase().includes(term) ||
      (l.phone && l.phone.toLowerCase().includes(term)) ||
      l.source.toLowerCase().includes(term) ||
      l.status.toLowerCase().includes(term)
    );
  }

  loadLeads(): void {
    this.loading = true;
    this.errorMessage = '';
    this.leadService.getAll().subscribe({
      next: (data) => {
        this.leads = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load leads. Please ensure the backend server is running on port 8080.';
        this.loading = false;
      }
    });
  }

  saveLead(): void {
    this.saving = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.editingId === null) {
      // POST Create
      this.leadService.create(this.form).subscribe({
        next: (created) => {
          this.leads = [...this.leads, created];
          this.successMessage = `Lead '${created.name}' was created successfully.`;
          this.resetForm();
          this.saving = false;
        },
        error: (err) => {
          this.handleSaveError(err);
          this.saving = false;
        }
      });
    } else {
      // PUT Update
      this.leadService.update(this.editingId, this.form).subscribe({
        next: (updated) => {
          this.leads = this.leads.map((l) => (l.id === updated.id ? updated : l));
          this.successMessage = `Lead '${updated.name}' was updated successfully.`;
          this.resetForm();
          this.saving = false;
        },
        error: (err) => {
          this.handleSaveError(err);
          this.saving = false;
        }
      });
    }
  }

  editLead(lead: Lead): void {
    this.editingId = lead.id;
    this.form = {
      name: lead.name,
      email: lead.email,
      phone: lead.phone ?? '',
      source: lead.source,
      status: lead.status
    };
    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelEdit(): void {
    this.resetForm();
  }

  promptDelete(lead: Lead): void {
    this.leadToDelete = lead;
  }

  cancelDelete(): void {
    this.leadToDelete = null;
  }

  executeDelete(): void {
    if (!this.leadToDelete) return;

    const lead = this.leadToDelete;
    this.deleting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.leadService.delete(lead.id).subscribe({
      next: () => {
        this.leads = this.leads.filter((l) => l.id !== lead.id);
        this.successMessage = `Lead '${lead.name}' was deleted successfully.`;
        if (this.editingId === lead.id) {
          this.resetForm();
        }
        this.leadToDelete = null;
        this.deleting = false;
      },
      error: () => {
        this.errorMessage = 'Failed to delete lead. Please try again.';
        this.deleting = false;
      }
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
  }

  private handleSaveError(err: any): void {
    if (err?.status === 409) {
      this.errorMessage = 'This email is already associated with another lead.';
    } else if (err?.status === 400) {
      this.errorMessage = 'Please check the form fields and correct any validation errors.';
    } else {
      this.errorMessage = 'Failed to save lead. Please check your connection and try again.';
    }
  }

  private resetForm(): void {
    this.editingId = null;
    this.form = this.emptyForm();
  }

  private emptyForm(): LeadRequest {
    return {
      name: '',
      email: '',
      phone: '',
      source: 'WEBSITE',
      status: 'NEW'
    };
  }
}
