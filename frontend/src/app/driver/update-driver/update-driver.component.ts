import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DriverService } from '../driver.service';
import { TitlePipe } from "../../pipes/title.pipe";

@Component({
  selector: 'app-update-driver',
  standalone: true,
  imports: [FormsModule, TitlePipe],
  templateUrl: './update-driver.component.html',
  styleUrl: './update-driver.component.css',
})
export class UpdateDriverComponent {
  @Input() _id: string = '';
  department: String = 'food';
  licence: String = 'XYZ12';
  @Output() success = new EventEmitter();

  constructor(private service: DriverService) {}

  validDepartments() {
    return this.service.validDepartments;
  }

  update() {
    const data = {
      _id: this._id,
      department: this.department,
      licence: this.licence,
    };
    this.service.update(data).subscribe((res) => this.success.emit());
  }
}
