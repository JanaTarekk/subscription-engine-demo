import { Routes } from '@angular/router';

import { PlansComponent } from './pages/plans/plans.component';
import { SuccessComponent } from './pages/success/success.component';
import { FailureComponent } from './pages/failure/failure.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';

export const routes: Routes = [
  { path: '', component: PlansComponent },

  { path: 'success', component: SuccessComponent },

  { path: 'failure', component: FailureComponent },

  { path: 'subscriptions', component: SubscriptionsComponent }
];