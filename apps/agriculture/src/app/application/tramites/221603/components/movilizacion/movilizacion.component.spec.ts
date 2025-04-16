import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MovilizacionComponent } from './movilizacion.component';

import { Solicitud221603State, Tramite221603Store } from '../../estados/tramite221603.store';
import { Tramite221603Query } from '../../estados/tramite221603.query';
import { CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';


/**
 * Mock data for the solicitud state.
 */
const mockSolicitudState: Solicitud221603State = {
  justificacion: '',
  aduana: '',
  oficina: '',
  punto: '',
  guia: '',
  regimen: '',
  carro: '',
  medio: 'Terrestre',
  transporte: 'Camión',
  verificacion: 'Alta',
  empresa: 'GRUPO OPERADOR MULTIMODAL, SA DE CV',
  clave: '',
  dependencia: '',
  banco: '',
  llave: '',
  fecha: '',
  importe: ''
};

describe('MovilizacionComponent', () => {
  let component: MovilizacionComponent;
  let fixture: ComponentFixture<MovilizacionComponent>;
  let tramite221603Store: Tramite221603Store;
  let tramite221603Query: Tramite221603Query;

  const tramite221603StoreMock = {
    setMedio: jest.fn(),
    setTransporte: jest.fn(),
    setVerificacion: jest.fn(),
    setEmpresa: jest.fn(),
  };

  const tramite221603QueryMock = {
    selectSolicitud$: of(mockSolicitudState),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, FormsModule,MovilizacionComponent, TituloComponent, CatalogoSelectComponent],
      providers: [
        FormBuilder,
        { provide: Tramite221603Store, useValue: tramite221603StoreMock },
        { provide: Tramite221603Query, useValue: tramite221603QueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovilizacionComponent);
    component = fixture.componentInstance;
    tramite221603Store = TestBed.inject(Tramite221603Store);
    tramite221603Query = TestBed.inject(Tramite221603Query);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with values from the store', () => {
    // Test form initialization with values from the store
    expect(component.MedioForm.controls['medio'].value).toBe('Terrestre');
    expect(component.MedioForm.controls['transporte'].value).toBe('Camión');
    expect(component.MedioForm.controls['verificacion'].value).toBe('Alta');
    expect(component.MedioForm.controls['empresa'].value).toBe('GRUPO OPERADOR MULTIMODAL, SA DE CV');
  });

  it('should call the store method setMedio when updating the form', () => {
    // Simulate form value change and ensure the store method is called
    component.MedioForm.controls['medio'].setValue('Marítimo');
    component.setValoresStore(component.MedioForm, 'medio', 'setMedio');
    expect(tramite221603Store.setMedio).toHaveBeenCalledWith('Marítimo');
  });

  it('should call the store method setTransporte when updating the form', () => {
    component.MedioForm.controls['transporte'].setValue('Barco');
    component.setValoresStore(component.MedioForm, 'transporte', 'setTransporte');
    expect(tramite221603Store.setTransporte).toHaveBeenCalledWith('Barco');
  });

  it('should call the store method setVerificacion when updating the form', () => {
    component.MedioForm.controls['verificacion'].setValue('Baja');
    component.setValoresStore(component.MedioForm, 'verificacion', 'setVerificacion');
    expect(tramite221603Store.setVerificacion).toHaveBeenCalledWith('Baja');
  });

  it('should call the store method setEmpresa when updating the form', () => {
    component.MedioForm.controls['empresa'].setValue('NEW COMPANY');
    component.setValoresStore(component.MedioForm, 'empresa', 'setEmpresa');
    expect(tramite221603Store.setEmpresa).toHaveBeenCalledWith('NEW COMPANY');
  });

  it('should initialize the store state correctly on ngOnInit', () => {
    component.ngOnInit();
    // Ensure that the store values are correctly initialized in the form
    expect(component.MedioForm.controls['medio'].value).toBe(mockSolicitudState.medio);
    expect(component.MedioForm.controls['transporte'].value).toBe(mockSolicitudState.transporte);
    expect(component.MedioForm.controls['verificacion'].value).toBe(mockSolicitudState.verificacion);
    expect(component.MedioForm.controls['empresa'].value).toBe(mockSolicitudState.empresa);
  });

  it('should call ngOnDestroy and clean up resources', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
  });
});
