import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedPackagesComponent } from './assigned-packages.component';

describe('AssignedPackagesComponent', () => {
  let component: AssignedPackagesComponent;
  let fixture: ComponentFixture<AssignedPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedPackagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
