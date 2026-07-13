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

  toastMessage = '';

  toastType: 'success' | 'error' = 'success';
  toastIcon = '✓';

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
    if (
      !this.merchant.businessName.trim() ||
      !this.merchant.description.trim() 
    ) {
      this.showToast('Please fill in branding fields.', 'error');
      return;
    }

    this.merchantService.saveMerchant(this.merchant);

    this.showToast('Branding saved successfully!');
  }

  savePlan() {
    if (
      !this.plan.name.trim() ||
      this.plan.price <= 0 
    ) {
      this.showToast('Please complete plan details.', 'error');
      return;
    }

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

    this.showToast('Plan created successfully!');
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
    if (
      !this.merchant.businessName.trim() 
    ) {
      this.showToast('Please save your business branding first.', 'error');
      return;
    }

    if (this.plans.length === 0) {
      this.showToast('Please create at least one subscription plan.', 'error');
      return;
    }

    try {
      const merchantId = await this.firebaseService.publishMerchant(
        this.merchant,
        this.plans,
      );

      this.publicLink = `${window.location.origin}/plans/${merchantId}`;

      this.showToast('Website published successfully!');
    } catch (error) {
      this.showToast('Failed to publish website.', 'error');
    }
  }

  copyLink() {
    navigator.clipboard.writeText(this.publicLink);

    this.showToast('Link copied successfully!');
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {

  this.toastMessage = message;
  this.toastType = type;

  this.toastIcon = type === 'success' ? '✓' : '✕';

  setTimeout(() => {
    this.toastMessage = '';
  }, 3000);

}
}
