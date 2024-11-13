import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertLicenceComponent } from './convert-licence.component';

describe('ConvertLicenceComponent', () => {
  let component: ConvertLicenceComponent;
  let fixture: ComponentFixture<ConvertLicenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertLicenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertLicenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
