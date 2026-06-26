import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private url = 'https://test-api.kashier.io/v3/payment/sessions';

  constructor(private http: HttpClient) {}

  createSession(plan: any) {

    const body = {
      expireAt: new Date(Date.now() + 30 * 60000).toISOString(),
      maxFailureAttempts: 3,
      paymentType: "credit",
      amount: plan.price.toString(),
      currency: "EGP",
      order: "ORDER_" + Date.now(),

      merchantRedirect:
`https://subscription-engine-demo.vercel.app/success?plan=${plan.name}&price=${plan.price}`,

      display: "en",
      type: "one-time",

      merchantId: "MID-47274-733",

      description: plan.name,

      allowedMethods: "card,wallet",

      customer: {
        email: "test@gmail.com",
        reference: "USER_" + Date.now()
      }
    };

    return this.http.post<any>(
      this.url,
      body,
      {
        headers: {
          Authorization: '886bc608afcdd7105c4a467512b27b0a$507fb0cc1caad3f3a9eb664a725825614af76fafd9d0f0751f589b6a4c4390c6e715f5b24b8103a9864758ce072cf3ac',
          'api-key': 'caff44ee-20ad-4236-ac43-aa57b56bae0b',
          'Content-Type': 'application/json'
        }
      }
    );
  }
}