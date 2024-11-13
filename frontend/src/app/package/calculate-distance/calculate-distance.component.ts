import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { io } from 'socket.io-client';

import { BACKEND_URL } from '../../../config';

@Component({
  selector: 'app-calculate-distance',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calculate-distance.component.html',
  styleUrl: './calculate-distance.component.css',
})
export class CalculateDistanceComponent {
  @Input() _id: string = '';
  @Input() destination: string = '';
  source: string = 'Melbourne';
  distance: string = '';
  socket: any;

  constructor() {
    this.socket = io(BACKEND_URL);
  }

  ngOnInit() {
    this.calculate();
    this.socket.on('calculation', (data: string) => {
      this.distance = data;
    });
  }

  ngOnChanges() {
    this.calculate();
  }

  calculate() {
    const req = {
      source: this.source,
      destination: this.destination,
    };
    this.socket.emit('newCalculation', req);
  }
}
