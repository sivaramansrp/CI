

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { createInitialState, Solicitud221603State, Tramite221603Store } from '../../estados/tramite221603.store';
import { Tramite221603Query } from '../../estados/tramite221603.query';


describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let tramite221603Store: Tramite221603Store;
  let tramite221603Query: Tramite221603Query;

  const mockSolicitudState: Solicitud221603State = createInitialState();

  const tramite221603StoreMock = {
    setJustificacion: jest.fn(),
    setAduana: jest.fn(),
    setOficina: jest.fn(),
    setPunto: jest.fn(),
    setGuia: jest.fn(),
    setRegimen: jest.fn(),
    setCarro: jest.fn(),
  };

  const tramite221603QueryMock = {
    selectSolicitud$: of(mockSolicitudState),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, FormsModule,DatosDeLaSolicitudComponent],
      providers: [
        FormBuilder,
        { provide: Tramite221603Store, useValue: tramite221603StoreMock },
        { provide: Tramite221603Query, useValue: tramite221603QueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    tramite221603Store = TestBed.inject(Tramite221603Store);
    tramite221603Query = TestBed.inject(Tramite221603Query);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with values from the store', () => {
    // Test initial form state based on the store
    expect(component.TramitesForm.controls['justificacion'].value).toBe('');
    expect(component.TramitesForm.controls['aduana'].value).toBe('QUERETARO, QRO.');
    expect(component.TramitesForm.controls['oficina'].value).toBe('Querétaro');
    expect(component.TramitesForm.controls['punto'].value).toBe('Querétaro Oficina de Inspección');
    expect(component.TramitesForm.controls['guia'].value).toBe('');
    expect(component.TramitesForm.controls['regimen'].value).toBe('');
    expect(component.TramitesForm.controls['carro'].value).toBe('');
  });

  it('should call the store method setJustificacion when updating the form', () => {
    // Update form and check if store method is called
    component.TramitesForm.controls['justificacion'].setValue('Updated Justification');
    component.setValoresStore(component.TramitesForm, 'justificacion', 'setJustificacion');
    expect(tramite221603Store.setJustificacion).toHaveBeenCalledWith('Updated Justification');
  });

  it('should call the store method setAduana when updating the form', () => {
    component.TramitesForm.controls['aduana'].setValue('Updated Aduana');
    component.setValoresStore(component.TramitesForm, 'aduana', 'setAduana');
    expect(tramite221603Store.setAduana).toHaveBeenCalledWith('Updated Aduana');
  });

  it('should initialize the store state correctly on ngOnInit', () => {
    component.ngOnInit();
    // Check if the store state is passed correctly to the form
    expect(component.TramitesForm.controls['justificacion'].value).toBe(mockSolicitudState.justificacion);
    expect(component.TramitesForm.controls['aduana'].value).toBe("QUERETARO, QRO.");
  });

  it('should call ngOnDestroy and cleanup resources correctly', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
  });
});
