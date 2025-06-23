jest.mock('@libs/shared/theme/assets/json/221601/zoosanitario.json', () => ({
  __esModule: true,
  default: {
    regimen: [
      { id: 1, descripcion: 'Temporal' },
      { id: 2, descripcion: 'Definitivo' }
    ],
    veterinario: [
      { id: 1, descripcion: 'Vet A' },
      { id: 2, descripcion: 'Vet B' }
    ],
    establecimiento: [
      { id: 1, descripcion: 'Est A' },
      { id: 2, descripcion: 'Est B' }
    ],
    mercancias: [
      { nombre: 'Producto A', cantidad: 10 },
      { nombre: 'Producto B', cantidad: 5 }
    ],
    formData: {
      aduana: 'QUERETARO, QRO.',
      oficina: 'Querétaro',
      punto: 'Querétaro Oficina de Inspección',
      capturaMercancia: 'Sí'
    }
  }
}), { virtual: true });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { Tramite221601Store } from '../../../../estados/tramites/tramite221601.store';
import { Tramite221601Query } from '../../../../estados/queries/tramite221601.query';
import { createInitialState, Solicitud221601State } from '../../../../estados/tramites/tramite221601.store';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let tramite221601Store: Tramite221601Store;
  let tramite221601Query: Tramite221601Query;

  const mockSolicitudState: Solicitud221601State = {
    ...createInitialState(),
    justificacion: '',
    aduana: 'QUERETARO, QRO.',
    oficina: 'Querétaro',
    punto: 'Querétaro Oficina de Inspección',
    guia: '',
    regimen: 'fff',
    carro: '',
    veterinario: 'fff',
    establecimiento: ''
  };

  const tramite221601StoreMock = {
    setJustificacion: jest.fn(),
    setAduana: jest.fn(),
    setOficina: jest.fn(),
    setPunto: jest.fn(),
    setGuia: jest.fn(),
    setRegimen: jest.fn(),
    setCarro: jest.fn(),
    setVeterinario: jest.fn(),
    setEstablecimiento: jest.fn()
  };

  const tramite221601QueryMock = {
    selectSolicitud$: of(mockSolicitudState),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, FormsModule, DatosDeLaSolicitudComponent],
      providers: [
        FormBuilder,
        { provide: Tramite221601Store, useValue: tramite221601StoreMock },
        { provide: Tramite221601Query, useValue: tramite221601QueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    tramite221601Store = TestBed.inject(Tramite221601Store);
    tramite221601Query = TestBed.inject(Tramite221601Query);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
it('should initialize the form with values from the store and JSON', () => {
  const form = component.datosSolicitudForm;

  expect(form.get('justificacion')?.value).toBe('');
  expect(form.get('aduana')?.value).toBe('QUERETARO, QRO.');
  expect(form.get('oficina')?.value).toBe('Querétaro');
  expect(form.get('punto')?.value).toBe('Querétaro Oficina de Inspección');
  expect(form.get('guia')?.value).toBe('');
  expect(form.get('regimen')?.value).toBe('fff');
  expect(form.get('veterinario')?.value).toBe('fff');
  expect(form.get('establecimiento')?.value).toBe('');
  expect(form.get('capturaMercancia')?.value).toBe('Productos y Subproductos');
})

  it('should call the store method setJustificacion when updating the form', () => {
    component.datosSolicitudForm.controls['justificacion'].setValue('Updated Justification');
    component.setValoresStore(component.datosSolicitudForm, 'justificacion', 'setJustificacion');
    expect(tramite221601Store.setJustificacion).toHaveBeenCalledWith('Updated Justification');
  });

  it('should call the store method setAduana when updating the form', () => {
    component.datosSolicitudForm.controls['aduana'].setValue('Updated Aduana');
    component.setValoresStore(component.datosSolicitudForm, 'aduana', 'setAduana');
    expect(tramite221601Store.setAduana).toHaveBeenCalledWith('Updated Aduana');
  });

  it('should initialize the store state correctly on ngOnInit', () => {
    component.ngOnInit();
    expect(component.datosSolicitudForm.controls['justificacion'].value).toBe('');
    expect(component.datosSolicitudForm.controls['aduana'].value).toBe('QUERETARO, QRO.');
  });

  it('should call ngOnDestroy and cleanup resources correctly', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
  });
});
