import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitud260904Component } from './datos-de-la-solicitud-260904.component';

describe('DatosDeLaSolicitud260904Component', () => {
  let component: DatosDeLaSolicitud260904Component;
  let fixture: ComponentFixture<DatosDeLaSolicitud260904Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDeLaSolicitud260904Component],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitud260904Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
