import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AddDriverComponent } from '../../driver/add-driver/add-driver.component';
import { AddPackageComponent } from '../../package/add-package/add-package.component';
import { DriverService } from '../../driver/driver.service';
import { PackageService } from '../../package/package.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink, AddDriverComponent, AddPackageComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent implements OnInit {
  driverCount: number = 0;
  packageCount: number = 0;

  constructor(
    private driverService: DriverService,
    private packageService: PackageService,
    private router: Router
  ) {}

  redirectToListDrivers() {
    this.router.navigate(['/drivers']);
  }

  redirectToListPackages() {
    this.router.navigate(['/packages']);
  }

  countDrivers() {
    this.driverService
      .retrieve()
      .subscribe((res: any) => (this.driverCount = res.length));
  }

  countPackages() {
    this.packageService
      .retrieve()
      .subscribe((res: any) => (this.packageCount = res.length));
  }

  ngOnInit() {
    this.countDrivers();
    this.countPackages();
  }
}
