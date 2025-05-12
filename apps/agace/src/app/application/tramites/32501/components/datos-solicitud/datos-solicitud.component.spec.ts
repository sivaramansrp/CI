import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MercDesmSinMonService } from '../../services/merc-desm-sin-mon.service';
import { Solicitud32501Query } from '../../estados/solicitud32501.query';
import { Solicitud32501Store } from '../../estados/solicitud32501.store';
import { of, Subject } from 'rxjs';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { Modal } from 'bootstrap';

describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let fixture: ComponentFixture<DatosSolicitudComponent>;
  let mercDesmSinMonServiceMock: any;
  let solicitud32501QueryMock: any;
  let solicitud32501StoreMock: any;

  beforeEach(async () => {
    mercDesmSinMonServiceMock = {
      obtenerAvisoDelCatalogo: jest.fn().mockReturnValue(of({})),
      obtenerOperacionDeImportacion: jest.fn().mockReturnValue(of([])),
    };

    solicitud32501QueryMock = {
      seleccionarSolicitud$: of({}),
    };

    solicitud32501StoreMock = {
      actualizarCveFraccionArancelaria: jest.fn().mockReturnValue(new Subject()),
      actualizarEntidadFederativa: jest.fn(),
      actualizarDelegacionMunicipio: jest.fn(),
      actualizarColonia: jest.fn(),
      actualizarIdTransaccionVU: jest.fn(),
      actualizarNico: jest.fn(),
      actualizarPeso: jest.fn(),
      actualizarValorUSD: jest.fn(),
      actualizarDescripcionMercancia: jest.fn(),
      actualizarCodigoPostal: jest.fn(),
      actualizarNumeroInterior: jest.fn(),
      actualizarNumeroExterior: jest.fn(),
      actualizarCalle: jest.fn(),
      actualizarNombreComercial: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [DatosSolicitudComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: MercDesmSinMonService, useValue: mercDesmSinMonServiceMock },
        { provide: Solicitud32501Query, useValue: solicitud32501QueryMock },
        { provide: Solicitud32501Store, useValue: solicitud32501StoreMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formAviso).toBeDefined();
    expect(component.formAviso.get('adace')).toBeTruthy();
    expect(component.formAviso.get('fechaIniExposicion')).toBeTruthy();
  });

  it('should call obtenerAvisoDelCatalogo on initialization', () => {
    const spy = jest.spyOn(
      mercDesmSinMonServiceMock,
      'obtenerAvisoDelCatalogo'
    );
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call obtenerOperacionDeImportacion on initialization', () => {
    const spy = jest.spyOn(
      mercDesmSinMonServiceMock,
      'obtenerOperacionDeImportacion'
    );
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should update tipoAviso when setTipoDeAviso is called', () => {
    component.setTipoDeAviso('TAV.IMP');
    expect(component.tipoAviso).toBe('TAV.IMP');
  });

  it('should call actualizarCveFraccionArancelaria on store when triggered', () => {
    const catalogoMock = { id: 1, descripcion: 'Test' };
    component.actualizarCveFraccionArancelaria(catalogoMock);
    expect(
      solicitud32501StoreMock.actualizarCveFraccionArancelaria
    ).toHaveBeenCalledWith(1);
  });

  it('should call actualizarEntidadFederativa on store when triggered', () => {
    const catalogoMock = { id: 1, descripcion: 'Test' };
    component.actualizarEntidadFederativa(catalogoMock);
    expect(
      solicitud32501StoreMock.actualizarEntidadFederativa
    ).toHaveBeenCalledWith(1);
  });

  it('should call actualizarDelegacionMunicipio on store when triggered', () => {
    const catalogoMock = { id: 1, descripcion: 'Test' };
    component.actualizarDelegacionMunicipio(catalogoMock);
    expect(
      solicitud32501StoreMock.actualizarDelegacionMunicipio
    ).toHaveBeenCalledWith(1);
  });

  it('should call actualizarColonia on store when triggered', () => {
    const catalogoMock = { id: 1, descripcion: 'Test' };
    component.actualizarColonia(catalogoMock);
    expect(solicitud32501StoreMock.actualizarColonia).toHaveBeenCalledWith(1);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const spy = jest.spyOn(component['destroyed$'], 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should validate form fields correctly', () => {
    const control = component.formAviso.get('fechaIniExposicion');
    control?.setValue('');
    control?.markAsTouched();
    expect(component.noEsValido('fechaIniExposicion')).toBe(true);
  });

  it('should call actualizarIdTransaccionVU on store when triggered', () => {
    const eventMock = { target: { value: '12345' } } as unknown as Event;
    component.actualizarIdTransaccionVU(eventMock);
    expect(solicitud32501StoreMock.actualizarIdTransaccionVU).toHaveBeenCalledWith('12345');
  });

  it('should call actualizarNico on store when triggered', () => {
    const eventMock = { target: { value: '67890' } } as unknown as Event;
    component.actualizarNico(eventMock);
    expect(solicitud32501StoreMock.actualizarNico).toHaveBeenCalledWith('67890');
  });

  it('should call actualizarPeso on store when triggered', () => {
    const eventMock = { target: { value: '100.50' } } as unknown as Event;
    component.actualizarPeso(eventMock);
    expect(solicitud32501StoreMock.actualizarPeso).toHaveBeenCalledWith('100.50');
  });

  it('should call actualizarValorUSD on store when triggered', () => {
    const eventMock = { target: { value: '200.75' } } as unknown as Event;
    component.actualizarValorUSD(eventMock);
    expect(solicitud32501StoreMock.actualizarValorUSD).toHaveBeenCalledWith('200.75');
  });

  it('should call actualizarDescripcionMercancia on store when triggered', () => {
    const eventMock = { target: { value: 'Test Description' } } as unknown as Event;
    component.actualizarDescripcionMercancia(eventMock);
    expect(solicitud32501StoreMock.actualizarDescripcionMercancia).toHaveBeenCalledWith('Test Description');
  });

  it('should call actualizarCodigoPostal on store when triggered', () => {
    const eventMock = { target: { value: '12345' } } as unknown as Event;
    component.actualizarCodigoPostal(eventMock);
    expect(solicitud32501StoreMock.actualizarCodigoPostal).toHaveBeenCalledWith('12345');
  });

  it('should call actualizarNumeroInterior on store when triggered', () => {
    const eventMock = { target: { value: 'A1' } } as unknown as Event;
    component.actualizarNumeroInterior(eventMock);
    expect(solicitud32501StoreMock.actualizarNumeroInterior).toHaveBeenCalledWith('A1');
  });

  it('should call actualizarNumeroExterior on store when triggered', () => {
    const eventMock = { target: { value: 'B2' } } as unknown as Event;
    component.actualizarNumeroExterior(eventMock);
    expect(solicitud32501StoreMock.actualizarNumeroExterior).toHaveBeenCalledWith('B2');
  });

  it('should call actualizarCalle on store when triggered', () => {
    const eventMock = { target: { value: 'Main Street' } } as unknown as Event;
    component.actualizarCalle(eventMock);
    expect(solicitud32501StoreMock.actualizarCalle).toHaveBeenCalledWith('Main Street');
  });

  it('should call actualizarNombreComercial on store when triggered', () => {
    const eventMock = { target: { value: 'Test Business' } } as unknown as Event;
    component.actualizarNombreComercial(eventMock);
    expect(solicitud32501StoreMock.actualizarNombreComercial).toHaveBeenCalledWith('Test Business');
  });

  it('should show modal when modificarOperacionImp is called', () => {
    const modalMock = { nativeElement: document.createElement('div') };
    component.modalElement = modalMock as ElementRef;
    const modalInstanceSpy = jest.spyOn(Modal.prototype, 'show');
    component.modificarOperacionImp();
    expect(modalInstanceSpy).toHaveBeenCalled();
  });

  it('should show modal when agregarOperacionImp is called', () => {
    const modalMock = { nativeElement: document.createElement('div') };
    component.modalElement = modalMock as ElementRef;
    const modalInstanceSpy = jest.spyOn(Modal.prototype, 'show');
    component.agregarOperacionImp();
    expect(modalInstanceSpy).toHaveBeenCalled();
  });
});
