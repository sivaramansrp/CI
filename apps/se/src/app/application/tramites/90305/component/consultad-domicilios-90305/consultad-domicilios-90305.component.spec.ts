import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultadDomicilios90305Component } from './consultad-domicilios-90305.component';

describe('ConsultadDomicilios90305Component', () => {
  let component: ConsultadDomicilios90305Component;
  let fixture: ComponentFixture<ConsultadDomicilios90305Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultadDomicilios90305Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultadDomicilios90305Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
