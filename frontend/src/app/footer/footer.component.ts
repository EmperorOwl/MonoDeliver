import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  ADDRESS,
  APP_NAME,
  PHONE,
  STUD_EMAIL,
  STUD_ID,
  STUD_NAME,
} from '../../config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  APP_NAME = APP_NAME;
  STUD_NAME = STUD_NAME;
  STUD_ID = STUD_ID;
  STUD_EMAIL = STUD_EMAIL;
  PHONE = PHONE;
  ADDRESS = ADDRESS;
}
