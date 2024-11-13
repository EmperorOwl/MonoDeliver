import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PackageService } from '../package.service';
import { DriverService } from '../../driver/driver.service';

class Package {
  title: string = 'Test';
  weight: number = 1;
  destination: string = 'Clayton';
  description: string = '';
  isAllocated: boolean = true;
  driverId: string = '';
}

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.css',
})
export class AddPackageComponent {
  drivers: any = [];
  package = new Package();
  @Output() success = new EventEmitter();

  constructor(
    private packageService: PackageService,
    private driverService: DriverService
  ) {}

  ngOnInit() {
    this.driverService.retrieve().subscribe((res) => {
      this.drivers = res;
      // Set the first driver as the default driver.
      if (this.drivers.length > 0) {
        this.package.driverId = this.drivers[0]._id;
      }
    });
  }

  add() {
    this.packageService
      .create(this.package)
      .subscribe((res) => this.success.emit());
  }
}
