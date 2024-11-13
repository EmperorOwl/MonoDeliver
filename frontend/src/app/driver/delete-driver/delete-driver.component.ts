import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DriverService } from '../driver.service';

@Component({
  selector: 'app-delete-driver',
  standalone: true,
  imports: [],
  templateUrl: './delete-driver.component.html',
  styleUrl: './delete-driver.component.css',
})
export class DeleteDriverComponent {
  @Input() _id: string = '';
  @Output() success = new EventEmitter();

  constructor(private service: DriverService) {}

  delete() {
    this.service.delete(this._id).subscribe((res) => this.success.emit());
  }
}
