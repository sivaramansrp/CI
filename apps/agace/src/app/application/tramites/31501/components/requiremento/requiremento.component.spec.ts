import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementoComponent } from './requiremento.component';

describe('RequirementoComponent', () => {
  let component: RequirementoComponent;
  let fixture: ComponentFixture<RequirementoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequirementoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequirementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
