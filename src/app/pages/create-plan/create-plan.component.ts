import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Plan } from '../../models/plan.model';
import { PlanService } from '../../services/plan.service';

import { Merchant } from '../../models/merchant.model';
import { MerchantService } from '../../services/merchant.service';

import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-create-plan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-plan.component.html',
  styleUrl: './create-plan.component.css',
})
export class CreatePlanComponent implements OnInit {
  plans: Plan[] = [];

  showDeleteModal = false;

  planToDelete: number | null = null;

  publicLink = '';

  merchant: Merchant = {
    businessName: '',
    description: '',
    logo: '',
    brandColor: '#635BFF',
    website: '',
  };

  plan: Plan = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    billingCycle: 'Monthly',
    features: [],
  };

  featuresText = '';

  constructor(
    private planService: PlanService,
    private merchantService: MerchantService,
    private firebaseService: FirebaseService,
  ) {}

  ngOnInit(): void {
    this.loadPlans();

    this.merchant = this.merchantService.getMerchant();
  }

  loadPlans() {
    this.plans = this.planService.getPlans();
  }

  saveBranding() {
    console.log(this.merchant);

    this.merchantService.saveMerchant(this.merchant);

    alert('Branding saved successfully!');
  }

  savePlan() {
    this.plan.id = Date.now();

    this.plan.features = this.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f !== '');

    this.planService.addPlan(this.plan);

    this.plan = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      billingCycle: 'Monthly',
      features: [],
    };

    this.featuresText = '';

    this.loadPlans();

    alert('Plan created successfully!');
  }

  deletePlan(id: number) {
    this.planToDelete = id;

    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.planToDelete !== null) {
      this.planService.deletePlan(this.planToDelete);

      this.loadPlans();
    }

    this.showDeleteModal = false;

    this.planToDelete = null;
  }

  cancelDelete() {
    this.showDeleteModal = false;

    this.planToDelete = null;
  }

  async publishWebsite() {
    try {
      const merchantId = await this.firebaseService.publishMerchant(
        this.merchant,
        this.plans,
      );

      this.publicLink = `${window.location.origin}/plans/${merchantId}`;

      alert('Website published successfully!');
    } catch (error) {
      console.error(error);

      alert('Failed to publish website.');
    }
  }

  copyLink() {
    navigator.clipboard.writeText(this.publicLink);

    alert('Link copied successfully!');
  }
}
