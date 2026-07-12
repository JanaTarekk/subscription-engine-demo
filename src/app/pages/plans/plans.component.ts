import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { PaymentService } from '../../services/payment.service';
import { FirebaseService } from '../../services/firebase.service';

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
    private firebaseService: FirebaseService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {

    const merchantId = this.route.snapshot.paramMap.get('id');

    if (!merchantId) {
      return;
    }

    const data: any = await this.firebaseService.getMerchant(merchantId);

    if (data) {

      this.merchant = {
        businessName: data.businessName,
        description: data.description,
        logo: data.logo,
        brandColor: data.brandColor,
        website: data.website
      };

      this.plans = data.plans || [];

    }

  }

  subscribe(plan: Plan) {

    this.paymentService.createSession(plan).subscribe({
      next: (res) => {

        if (res.sessionUrl) {
          window.location.href = res.sessionUrl;
        }

      },
      error: (err) => console.error(err)
    });

  }

}