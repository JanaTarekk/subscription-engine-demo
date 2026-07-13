import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {

  plan = '';
  price = '';
  merchantId = '';

  constructor(private route: ActivatedRoute ,
  private router: Router) {

    this.route.queryParams.subscribe(params => {
      this.plan = params['plan'];
      this.price = params['price'];
      this.merchantId = params['merchantId'];
    });

  }

  cancelSubscription() {
  this.router.navigate(['/plans', this.merchantId]);
}

}