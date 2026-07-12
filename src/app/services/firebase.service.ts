import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc
} from '@angular/fire/firestore';

import { Merchant } from '../models/merchant.model';
import { Plan } from '../models/plan.model';
import { doc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private firestore = inject(Firestore);

  async publishMerchant(merchant: Merchant, plans: Plan[]) {

    const merchantsRef = collection(this.firestore, 'merchants');

    const docRef = await addDoc(merchantsRef, {
      ...merchant,
      plans
    });

    return docRef.id;
  }

  async getMerchant(id: string) {

  const merchantRef = doc(this.firestore, 'merchants', id);

  const snapshot = await getDoc(merchantRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();

}

}