import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-bad-request',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './bad-request.component.html',
  styleUrl: './bad-request.component.css',
})
export class BadRequestComponent {
  error: String;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras.state?.['error'];
  }
}
