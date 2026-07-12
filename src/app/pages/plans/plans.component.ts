import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentService } from '../../services/payment.service';
import { PlanService } from '../../services/plan.service';
import { MerchantService } from '../../services/merchant.service';

import { Plan } from '../../models/plan.model';
import { Merchant } from '../../models/merchant.model';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export class PlansComponent implements OnInit {

  plans: Plan[] = [];

  merchant: Merchant = {
    businessName: '',
    description: '',
    logo: '',
    brandColor: '#635BFF',
    website: ''
  };

  constructor(
    private paymentService: PaymentService,
    private planService: PlanService,
    private merchantService: MerchantService
  ) {}

  ngOnInit(): void {

    this.plans = this.planService.getPlans();

    this.merchant = this.merchantService.getMerchant();

  }

  subscribe(plan: Plan) {

  console.log("Selected plan:", plan);

  this.paymentService.createSession(plan).subscribe({
    next: (res) => {

      console.log("Payment response:", res);

      if (res.sessionUrl) {
        window.location.href = res.sessionUrl;
      }

    },
    error: (err) => {
      console.error("Payment error:", err);
    }
  });

}

}