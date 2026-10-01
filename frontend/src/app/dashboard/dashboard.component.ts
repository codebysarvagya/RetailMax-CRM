import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CustomerService } from '../customers/customer.service';
import { LeadService } from '../leads/lead.service';
import { Customer } from '../customers/customer.model';
import { Lead, LEAD_SOURCES } from '../leads/lead.model';

export interface SourceMetric {
  source: string;
  count: number;
  percentage: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  customers: Customer[] = [];
  leads: Lead[] = [];

  loading = true;
  errorMessage = '';
  lastRefreshed: Date = new Date();

  // Metrics
  totalCustomers = 0;
  totalLeads = 0;

  // Status counts
  newLeads = 0;
  contactedLeads = 0;
  qualifiedLeads = 0;
  convertedLeads = 0;
  lostLeads = 0;

  // Source breakdown
  sourceMetrics: SourceMetric[] = [];

  // Recent leads
  recentLeads: Lead[] = [];

  constructor(
    private readonly customerService: CustomerService,
    private readonly leadService: LeadService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.errorMessage = '';

    forkJoin({
      customers: this.customerService.getAll(),
      leads: this.leadService.getAll()
    }).subscribe({
      next: ({ customers, leads }) => {
        this.customers = customers;
        this.leads = leads;
        this.calculateMetrics();
        this.lastRefreshed = new Date();
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load dashboard metrics. Please ensure the backend is running on port 8080.';
        this.loading = false;
      }
    });
  }

  private calculateMetrics(): void {
    this.totalCustomers = this.customers.length;
    this.totalLeads = this.leads.length;

    // Status calculations
    this.newLeads = this.leads.filter((l) => l.status === 'NEW').length;
    this.contactedLeads = this.leads.filter((l) => l.status === 'CONTACTED').length;
    this.qualifiedLeads = this.leads.filter((l) => l.status === 'QUALIFIED').length;
    this.convertedLeads = this.leads.filter((l) => l.status === 'CONVERTED').length;
    this.lostLeads = this.leads.filter((l) => l.status === 'LOST').length;

    // Source breakdown
    this.sourceMetrics = LEAD_SOURCES.map((source) => {
      const count = this.leads.filter((l) => l.source === source).length;
      const percentage = this.totalLeads > 0 ? Math.round((count / this.totalLeads) * 100) : 0;
      return { source, count, percentage };
    });

    // Recent leads (sorted by ID descending)
    this.recentLeads = [...this.leads]
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);
  }

  get conversionRate(): number {
    if (this.totalLeads === 0) return 0;
    return Math.round((this.convertedLeads / this.totalLeads) * 100);
  }
}
