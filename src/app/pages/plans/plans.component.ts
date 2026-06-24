import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export class PlansComponent {

  constructor(private paymentService: PaymentService) {}

  plans = [
    { id: 1, name: 'Basic', price: 100 },
    { id: 2, name: 'Pro', price: 250 },
    { id: 3, name: 'Premium', price: 500 }
  ];

subscribe(plan: any) {
  console.log('CLICKED', plan);

  this.paymentService.createSession(plan).subscribe({
    next: (res) => {
      console.log('💳 KASHIER RESPONSE:', res);

      const url = res.sessionUrl;

      if (url) {
        window.location.href = url; 
        // OR: window.open(url, '_blank');
      } else {
        console.error('No sessionUrl returned');
      }
    },
    error: (err) => {
      console.error('❌ PAYMENT ERROR:', err);
    }
  });
}
}