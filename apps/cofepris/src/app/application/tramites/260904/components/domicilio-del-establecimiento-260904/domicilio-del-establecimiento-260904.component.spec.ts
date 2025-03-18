import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomicilioDelEstablecimiento260904Component } from './domicilio-del-establecimiento-260904.component';

describe('DomicilioDelEstablecimiento260904Component', () => {
  let component: DomicilioDelEstablecimiento260904Component;
  let fixture: ComponentFixture<DomicilioDelEstablecimiento260904Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomicilioDelEstablecimiento260904Component],
    }).compileComponents();

    fixture = TestBed.createComponent(
      DomicilioDelEstablecimiento260904Component
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
