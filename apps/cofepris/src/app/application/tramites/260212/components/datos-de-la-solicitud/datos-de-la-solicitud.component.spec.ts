import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { SolicitudService } from '../../services/solicitud.service';
import { Tramite260212Store } from '../../estados/tramite260212.store';
import { Tramite260212Query } from '../../estados/tramite260212.query';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let solicitudServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule,DatosDeLaSolicitudComponent],
      declarations: [],
      providers: [
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: Tramite260212Store, useValue: tramiteStoreMock },
        { provide: Tramite260212Query, useValue: tramiteQueryMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.datosEstablecimientoForm).toBeDefined();
    expect(component.datosEstablecimientoForm.controls['denominacionRazonSocial']).toBeDefined();
  });

  it('should call getSolicitudes on init', () => {
    expect(solicitudServiceMock.getSolicitudes).toHaveBeenCalled();
  });

  it('should toggle plegable state', () => {
    expect(component.plegable).toBe(true);
    component.mostrarPlegable();
    expect(component.plegable).toBeFalsy();
  });
});
