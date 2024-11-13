import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { APP_NAME } from '../../config';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  appName = APP_NAME;
}
