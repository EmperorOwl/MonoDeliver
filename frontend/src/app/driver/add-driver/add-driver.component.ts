import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DriverService } from '../driver.service';
import { TitlePipe } from "../../pipes/title.pipe";

class Driver {
  name: String = 'Tester';
  department: String = 'food';
  licence: String = 'XXXXX';
  isActive: Boolean = true;
}

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [FormsModule, TitlePipe],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css',
})
export class AddDriverComponent {
  driver: Driver = new Driver();
  @Output() success = new EventEmitter();

  constructor(private service: DriverService) {}

  validDepartments() {
    return this.service.validDepartments;
  }

  add() {
    this.service.create(this.driver).subscribe((res) => this.success.emit());
  }
}
