import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PackageService } from '../package.service';

@Component({
  selector: 'app-update-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-package.component.html',
  styleUrl: './update-package.component.css',
})
export class UpdatePackageComponent {
  @Input() _id: string = '';
  destination: String = 'Sydney';
  @Output() success = new EventEmitter();

  constructor(private service: PackageService) {}

  update() {
    const data = {
      _id: this._id,
      destination: this.destination,
    };
    this.service.update(data).subscribe((res) => this.success.emit());
  }
}
