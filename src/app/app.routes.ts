import { Routes } from '@angular/router';

import { PlansComponent } from './pages/plans/plans.component';
import { SuccessComponent } from './pages/success/success.component';
import { FailureComponent } from './pages/failure/failure.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { CreatePlanComponent } from './pages/create-plan/create-plan.component';

export const routes: Routes = [
  { path: '', redirectTo: 'create-plan', pathMatch: 'full' },

  { path: 'create-plan', component: CreatePlanComponent },

  { path: 'plans/:id', component: PlansComponent },

  { path: 'success', component: SuccessComponent },

  { path: 'failure', component: FailureComponent },

  { path: 'subscriptions', component: SubscriptionsComponent }
];