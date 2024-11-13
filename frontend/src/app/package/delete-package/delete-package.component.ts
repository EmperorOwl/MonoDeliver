import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PackageService } from '../package.service';

@Component({
  selector: 'app-delete-package',
  standalone: true,
  imports: [],
  templateUrl: './delete-package.component.html',
  styleUrl: './delete-package.component.css',
})
export class DeletePackageComponent {
  @Input() _id: string = '';
  @Output() success = new EventEmitter();

  constructor(private service: PackageService) {}

  delete() {
    this.service.delete(this._id).subscribe((res) => this.success.emit());
  }
}
