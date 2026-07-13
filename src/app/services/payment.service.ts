import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Make sure this path matches where your environment file is located

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private url = 'https://test-api.kashier.io/v3/payment/sessions';

  constructor(private http: HttpClient) {}

  createSession(plan: any , merchantId: string) {

    const body = {
  expireAt: new Date(Date.now() + 30 * 60000).toISOString(),
  maxFailureAttempts: 3,
  paymentType: "credit",
  amount: plan.price.toString(),
  currency: "EGP",
  order: "ORDER_" + Date.now(),

  merchantRedirect:
`https://subscription-engine-demo.vercel.app/success?plan=${encodeURIComponent(plan.name)}&price=${plan.price}&merchantId=${merchantId}`,

  display: "en",
  type: "one-time",

  merchantId: environment.kashierMerchantId,

  description: `${plan.name} Subscription`,

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
          Authorization: environment.kashierAuthToken,
          'api-key': environment.kashierApiKey,
          'Content-Type': 'application/json'
        }
      }
    );
  }
}