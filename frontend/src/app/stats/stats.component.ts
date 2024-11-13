import { Component } from '@angular/core';

import { StatsService } from './stats.service';
import { DriverService } from '../driver/driver.service';
import { PackageService } from '../package/package.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent {
  stats: any = {};
  driverCount: number = 0;
  packageCount: number = 0;

  constructor(
    private service: StatsService,
    private driverService: DriverService,
    private packageService: PackageService
  ) {}

  ngOnInit() {
    this.getStats();
    this.countDrivers();
    this.countPackages();
  }

  getStats() {
    this.service.get().subscribe((res) => (this.stats = res));
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
}
