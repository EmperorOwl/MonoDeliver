import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeightPipe } from '../../pipes/weight.pipe';
import { BoolPipe } from '../../pipes/bool.pipe';
import { DatePipe } from '../../pipes/date.pipe';

@Component({
  selector: 'app-assigned-packages',
  standalone: true,
  imports: [CommonModule, WeightPipe, BoolPipe, DatePipe],
  templateUrl: './assigned-packages.component.html',
  styleUrl: './assigned-packages.component.css',
})
export class AssignedPackagesComponent {
  @Input() _id: string = '';
  @Input() packages: any = [];
}
