import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedDriverComponent } from './assigned-driver.component';

describe('AssignedDriverComponent', () => {
  let component: AssignedDriverComponent;
  let fixture: ComponentFixture<AssignedDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedDriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
