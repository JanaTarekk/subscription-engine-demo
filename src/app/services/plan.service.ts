import { Injectable } from '@angular/core';
import { Plan } from '../models/plan.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private storageKey = 'plans';

  getPlans(): Plan[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  savePlans(plans: Plan[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(plans));
  }

  addPlan(plan: Plan) {
    const plans = this.getPlans();
    plans.push(plan);
    this.savePlans(plans);
  }

  deletePlan(id: number) {
    const plans = this.getPlans().filter(plan => plan.id !== id);
    this.savePlans(plans);
  }

  updatePlan(updatedPlan: Plan) {
    const plans = this.getPlans().map(plan =>
      plan.id === updatedPlan.id ? updatedPlan : plan
    );
    this.savePlans(plans);
  }
}