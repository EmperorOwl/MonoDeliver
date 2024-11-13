import { Component, Input } from '@angular/core';

import { TitlePipe } from '../../pipes/title.pipe';
import { BoolPipe } from '../../pipes/bool.pipe';
import { DatePipe } from '../../pipes/date.pipe';

@Component({
  selector: 'app-assigned-driver',
  standalone: true,
  imports: [TitlePipe, BoolPipe, DatePipe],
  templateUrl: './assigned-driver.component.html',
  styleUrl: './assigned-driver.component.css',
})
export class AssignedDriverComponent {
  @Input() _id: string = '';
  @Input() driver: any = {};
}
