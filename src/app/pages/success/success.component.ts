import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.plan = params['plan'];
      this.price = params['price'];
    });

  }

}