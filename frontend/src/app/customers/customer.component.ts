import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from './customer.service';
import { Customer, CustomerRequest } from './customer.model';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  form: CustomerRequest = this.emptyForm();
  searchTerm = '';

  loading = false;
  saving = false;
  deleting = false;

  editingId: number | null = null;
  customerToDelete: Customer | null = null;

  errorMessage = '';
  successMessage = '';

  readonly phonePattern = '^[+0-9\\s\\-()]{7,20}$';

  constructor(private readonly customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  get filteredCustomers(): Customer[] {
    if (!this.searchTerm.trim()) {
      return this.customers;
    }
    const term = this.searchTerm.toLowerCase().trim();
    return this.customers.filter((c) =>
      c.name.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term) ||
      (c.phone && c.phone.toLowerCase().includes(term))
    );
  }

  loadCustomers(): void {
    this.loading = true;
    this.errorMessage = '';
    this.customerService.getAll().subscribe({
      next: (data) => {
        this.customers = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load customers. Please ensure the backend server is running on port 8080.';
        this.loading = false;
      }
    });
  }

  saveCustomer(): void {
    this.saving = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.editingId === null) {
      // POST Create
      this.customerService.create(this.form).subscribe({
        next: (created) => {
          this.customers = [...this.customers, created];
          this.successMessage = `Customer '${created.name}' was created successfully.`;
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
      this.customerService.update(this.editingId, this.form).subscribe({
        next: (updated) => {
          this.customers = this.customers.map((c) => (c.id === updated.id ? updated : c));
          this.successMessage = `Customer '${updated.name}' was updated successfully.`;
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

  editCustomer(customer: Customer): void {
    this.editingId = customer.id;
    this.form = {
      name: customer.name,
      email: customer.email,
      phone: customer.phone ?? ''
    };
    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelEdit(): void {
    this.resetForm();
  }

  promptDelete(customer: Customer): void {
    this.customerToDelete = customer;
  }

  cancelDelete(): void {
    this.customerToDelete = null;
  }

  executeDelete(): void {
    if (!this.customerToDelete) return;

    const customer = this.customerToDelete;
    this.deleting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.customerService.delete(customer.id).subscribe({
      next: () => {
        this.customers = this.customers.filter((c) => c.id !== customer.id);
        this.successMessage = `Customer '${customer.name}' was deleted successfully.`;
        if (this.editingId === customer.id) {
          this.resetForm();
        }
        this.customerToDelete = null;
        this.deleting = false;
      },
      error: () => {
        this.errorMessage = 'Failed to delete customer. Please try again.';
        this.deleting = false;
      }
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
  }

  private handleSaveError(err: any): void {
    if (err?.status === 409) {
      this.errorMessage = 'A customer with this email already exists.';
    } else if (err?.status === 400) {
      this.errorMessage = 'Please check the form fields and correct any validation errors.';
    } else {
      this.errorMessage = 'Failed to save customer. Please check your connection and try again.';
    }
  }

  private resetForm(): void {
    this.editingId = null;
    this.form = this.emptyForm();
  }

  private emptyForm(): CustomerRequest {
    return { name: '', email: '', phone: '' };
  }
}
