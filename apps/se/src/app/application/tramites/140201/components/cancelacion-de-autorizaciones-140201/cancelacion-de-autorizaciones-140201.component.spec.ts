import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelacionDeAutorizaciones140201Component } from './cancelacion-de-autorizaciones-140201.component';

describe('CancelacionDeAutorizaciones140201Component', () => {
  let component: CancelacionDeAutorizaciones140201Component;
  let fixture: ComponentFixture<CancelacionDeAutorizaciones140201Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelacionDeAutorizaciones140201Component],
    }).compileComponents();

    fixture = TestBed.createComponent(
      CancelacionDeAutorizaciones140201Component
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
