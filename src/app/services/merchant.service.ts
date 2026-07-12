import { Injectable } from '@angular/core';
import { Merchant } from '../models/merchant.model';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  private key = 'merchant';

  getMerchant(): Merchant {

    const data = localStorage.getItem(this.key);

    if (data) {
      return JSON.parse(data);
    }

    return {
      businessName: '',
      description: '',
      logo: '',
      brandColor: '#635BFF',
      website: ''
    };
  }

  saveMerchant(merchant: Merchant) {
    localStorage.setItem(this.key, JSON.stringify(merchant));
  }

}