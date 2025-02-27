import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontoFactorComponent } from './monto-factor.component';

describe('MontoFactorComponent', () => {
  let component: MontoFactorComponent;
  let fixture: ComponentFixture<MontoFactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MontoFactorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MontoFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
