import { Component, OnInit } from '@angular/core';

import { PackageService } from '../package.service';
import { AddPackageComponent } from '../add-package/add-package.component';
import { UpdatePackageComponent } from '../update-package/update-package.component';
import { DeletePackageComponent } from '../delete-package/delete-package.component';
import { AssignedDriverComponent } from '../assigned-driver/assigned-driver.component';
import { TranslateDescriptionComponent } from '../translate-description/translate-description.component';
import { CalculateDistanceComponent } from '../calculate-distance/calculate-distance.component';
import { WeightPipe } from '../../pipes/weight.pipe';
import { BoolPipe } from '../../pipes/bool.pipe';
import { DatePipe } from '../../pipes/date.pipe';

@Component({
  selector: 'app-list-packages',
  standalone: true,
  imports: [
    AddPackageComponent,
    UpdatePackageComponent,
    DeletePackageComponent,
    AssignedDriverComponent,
    TranslateDescriptionComponent,
    CalculateDistanceComponent,
    WeightPipe,
    BoolPipe,
    DatePipe,
  ],
  templateUrl: './list-packages.component.html',
  styleUrl: './list-packages.component.css',
})
export class ListPackagesComponent implements OnInit {
  packages: any = [];

  constructor(private service: PackageService) {}

  loadPackages() {
    this.service.retrieve().subscribe((res) => (this.packages = res));
  }

  ngOnInit() {
    this.loadPackages();
  }
}
