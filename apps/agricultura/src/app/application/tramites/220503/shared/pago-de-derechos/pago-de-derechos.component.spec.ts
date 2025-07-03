import { TestBed } from '@angular/core/testing';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { RevisionService } from '../../services/revision.service';
import { Solicitud220503Store } from '../../estados/tramites220503.store';
import { Solicitud220503Query } from '../../estados/tramites220503.query';
import { CatalogoSelectComponent, ConsultaioQuery, InputRadioComponent, TituloComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: any;
  let revisionServiceMock: any;
  let solicitudStoreMock: any;
  let solicitudQueryMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    revisionServiceMock = {
      getPagoDeDerechos: jest.fn().mockReturnValue(of({
        justificacion: 'justificacion',
        claveReferencia: 'claveReferencia',
        cadenaDependencia: 'cadenaDependencia',
        banco: 'banco',
        llavePago: 'llavePago',
        importePago: 'importePago',
        fetchapago: 'fetchapago'
      })),
      getJustificacion: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'Justificación 1' }] })),
      getBanco: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'Banco 1' }] }))
    };

    solicitudStoreMock = {
      setJustificacion: jest.fn(),
      setClaveReferencia: jest.fn(),
      setCadenaDependencia: jest.fn(),
      setBanco: jest.fn(),
      setIlavePago: jest.fn(),
      setImportePago: jest.fn(),
      setFetchaPago: jest.fn(),
      setExentoPagoNo: jest.fn()
    };

    solicitudQueryMock = {
      selectSolicitud$: of({
        exentoPagoNo: 'no',
        justificacion: 'justificacion',
        claveReferencia: 'claveReferencia',
        cadenaDependencia: 'cadenaDependencia',
        banco: 'banco',
        llavePago: 'llavePago',
        importePago: 'importePago',
        fetchapago: 'fetchapago'
      })
    };

    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false })
    };

    await TestBed.configureTestingModule({
      imports: [PagoDeDerechosComponent, CommonModule, CatalogoSelectComponent, ReactiveFormsModule, InputRadioComponent,TituloComponent, HttpClientModule],
      providers: [
        FormBuilder,
        { provide: RevisionService, useValue: revisionServiceMock },
        { provide: Solicitud220503Store, useValue: solicitudStoreMock },
        { provide: Solicitud220503Query, useValue: solicitudQueryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with store values', () => {
    expect(component.pagoForm.value.exentoPagoNo).toBe('no');
    expect(component.pagoForm.value.justificacion).toBe('justificacion');
    expect(component.pagoForm.value.claveReferencia).toBe('claveReferencia');
    expect(component.pagoForm.value.cadenaDependencia).toBe('cadenaDependencia');
    expect(component.pagoForm.value.banco).toBe('banco');
    expect(component.pagoForm.value.llavePago).toBe('llavePago');
    expect(component.pagoForm.value.importePago).toBe('importePago');
    expect(component.pagoForm.value.fetchapago).toBe('fetchapago');
  });

  it('should call setJustificacion on selectJustificacionCatalogo', () => {
    component.selectJustificacionCatalogo({ id: 5, nombre: 'Test' } as any);
    expect(solicitudStoreMock.setJustificacion).toHaveBeenCalledWith(5);
  });

  it('should call setClaveReferencia on setClaveReferencia', () => {
    const event = { target: { value: 'clave123' } } as any;
    component.setClaveReferencia(event);
    expect(solicitudStoreMock.setClaveReferencia).toHaveBeenCalledWith('clave123');
  });

  it('should call setCadenaDependencia on setCadenaDependencia', () => {
    const event = { target: { value: 'cadena123' } } as any;
    component.setCadenaDependencia(event);
    expect(solicitudStoreMock.setCadenaDependencia).toHaveBeenCalledWith('cadena123');
  });

  it('should call setExentoPagoNo on setExentoPagoNo', () => {
    component.setExentoPagoNo('yes');
    expect(solicitudStoreMock.setExentoPagoNo).toHaveBeenCalledWith('yes');
  });

  it('should call setBanco on selectBancoCatalogo', () => {
    component.selectBancoCatalogo({ id: 7, nombre: 'Banco Test' } as any);
    expect(solicitudStoreMock.setBanco).toHaveBeenCalledWith(7);
  });

  it('should call setIlavePago on setIlavePago', () => {
    const event = { target: { value: 'llave123' } } as any;
    component.setIlavePago(event);
    expect(solicitudStoreMock.setIlavePago).toHaveBeenCalledWith('llave123');
  });

  it('should call setFetchaPago on setFetchaPago', () => {
    const event = { target: { value: '2024-01-01' } } as any;
    component.setFetchaPago(event);
    expect(solicitudStoreMock.setFetchaPago).toHaveBeenCalledWith('2024-01-01');
  });

  it('should call setImportePago on setImportePago', () => {
    const event = { target: { value: '1000' } } as any;
    component.setImportePago(event);
    expect(solicitudStoreMock.setImportePago).toHaveBeenCalledWith('1000');
  });

  it('should set justificacion catalogos after getJustificacion', () => {
    component.getJustificacion();
    expect(component.justificacion.catalogos.length).toBeGreaterThan(0);
    expect(component.justificacion.labelNombre).toBe('Justificación');
  });

  it('should set banco catalogos after getBanco', () => {
    component.getBanco();
    expect(component.banco.catalogos.length).toBeGreaterThan(0);
    expect(component.banco.labelNombre).toBe('Banco');
  });

  it('should update store with getPagoDeDerechos', () => {
    component.getPagoDeDerechos();
    expect(solicitudStoreMock.setJustificacion).toHaveBeenCalledWith('justificacion');
    expect(solicitudStoreMock.setClaveReferencia).toHaveBeenCalledWith('claveReferencia');
    expect(solicitudStoreMock.setCadenaDependencia).toHaveBeenCalledWith('cadenaDependencia');
    expect(solicitudStoreMock.setBanco).toHaveBeenCalledWith('banco');
    expect(solicitudStoreMock.setIlavePago).toHaveBeenCalledWith('llavePago');
    expect(solicitudStoreMock.setImportePago).toHaveBeenCalledWith('importePago');
    expect(solicitudStoreMock.setFetchaPago).toHaveBeenCalledWith('fetchapago');
  });

  it('should disable the form if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.pagoForm.disabled).toBe(true);
  });

  it('should enable the form if esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.pagoForm.enabled).toBe(true);
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const destroyed$ = (component as any).destroyed$ as Subject<void>;
    jest.spyOn(destroyed$, 'next');
    jest.spyOn(destroyed$, 'complete');
    component.ngOnDestroy();
    expect(destroyed$.next).toHaveBeenCalled();
    expect(destroyed$.complete).toHaveBeenCalled();
  });
});