import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DriverService } from '../driver.service';
import { AddDriverComponent } from '../add-driver/add-driver.component';
import { UpdateDriverComponent } from '../update-driver/update-driver.component';
import { DeleteDriverComponent } from '../delete-driver/delete-driver.component';
import { AssignedPackagesComponent } from '../assigned-packages/assigned-packages.component';
import { ConvertLicenceComponent } from '../convert-licence/convert-licence.component';
import { UpperPipe } from '../../pipes/upper.pipe';
import { TitlePipe } from '../../pipes/title.pipe';
import { DatePipe } from '../../pipes/date.pipe';
import { BoolPipe } from '../../pipes/bool.pipe';

@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [
    FormsModule,
    AddDriverComponent,
    UpdateDriverComponent,
    DeleteDriverComponent,
    AssignedPackagesComponent,
    ConvertLicenceComponent,
    UpperPipe,
    TitlePipe,
    DatePipe,
    BoolPipe,
  ],
  templateUrl: './list-drivers.component.html',
  styleUrl: './list-drivers.component.css',
})
export class ListDriversComponent implements OnInit {
  drivers: any = [];
  filter: string = 'all';

  constructor(private service: DriverService) {}

  choices() {
    return ['all', ...this.service.validDepartments];
  }

  loadDrivers() {
    this.service.retrieve(this.filter).subscribe((res) => (this.drivers = res));
  }

  ngOnInit() {
    this.loadDrivers();
  }
}
