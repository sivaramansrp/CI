import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import {
  CatalogoSelectComponent,
  InputFechaComponent,
  InputRadioComponent,
  ConsultaioQuery,
  TituloComponent
} from '@ng-mf/data-access-user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';
import { CommonModule } from '@angular/common';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let mockService: any;
  let mockQuery: any;

  const mockCatalogo = [{ id: 1, descripcion: 'Banco1' }];
  const mockFormularioPago = {
    exentoPago: 'Si',
    justificacion: '',
    claveReferencia: '',
    cadenaDependencia: '',
    banco: '',
    llavePago: '',
    fechaPago: '',
    importePago: ''
  };

  beforeEach(async () => {
    mockService = {
      obtenerDatos: jest.fn().mockReturnValue(of({ formularioPago: mockFormularioPago })),
      obtenerDetallesDelCatalogo: jest.fn().mockReturnValue(of({ data: mockCatalogo })),
      actualizarFormaValida: jest.fn(),
      actualizarFormularioPago: jest.fn()
    };

    mockQuery = {
      selectConsultaioState$: of({ readonly: false })
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        PagoDeDerechosComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        CatalogoSelectComponent,
        InputRadioComponent,
        InputFechaComponent,
        TituloComponent,
        CommonModule
      ],
      providers: [
        { provide: ImportacionDeAcuiculturaService, useValue: mockService },
        { provide: ConsultaioQuery, useValue: mockQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
    it('should fetch transport and verification point catalogs', () => {
    const crearFormularioPagoSpy = jest.spyOn(component, 'crearFormularioPago');
    component.crearFormularioPago();
    component.obtenerListaJustificacion();
    component.obtenerListaBanco();
     expect(crearFormularioPagoSpy).toHaveBeenCalled();
    expect(mockService.obtenerDetallesDelCatalogo).toHaveBeenCalledWith('banco.json');
    expect(mockService.obtenerDetallesDelCatalogo).toHaveBeenCalledWith('justificacion.json');
  });

  it('should handle error in obtenerListaBanco', fakeAsync(() => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockService.obtenerDetallesDelCatalogo.mockReturnValueOnce(throwError(() => new Error('Error')));
    component.obtenerListaBanco();
    tick();
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    consoleSpy.mockRestore();
  }));


  it('should handle error in obtenerListaJustificacion', fakeAsync(() => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockService.obtenerDetallesDelCatalogo.mockReturnValueOnce(throwError(() => new Error('Failed')));
    component.obtenerListaJustificacion();
    tick();
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    consoleSpy.mockRestore();
  }));

  it('should format date correctly', () => {
    const formatted = PagoDeDerechosComponent.formatearFecha(new Date('2025-05-01'));
    expect(formatted).toBe('01/05/2025');
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
  it('should patch form values when justificacion is not empty and exentoPago is "Si"', () => {
    const hoy = PagoDeDerechosComponent.formatearFecha(new Date());
    component.formularioPagoStore = { ...mockFormularioPago, exentoPago: 'Si' };
    component.crearFormularioPago();
    component.formularioPago.patchValue({ justificacion: 'algunValor', banco: '' });
    const patchSpy = jest.spyOn(component.formularioPago, 'patchValue');
    component.actualizarValorAleatorio();
    expect(patchSpy).toHaveBeenCalledWith({
      claveReferencia: 'valor',
      cadenaDependencia: 'valor',
      banco: '170',
      fechaPago: hoy,
      importePago: 'valor',
    });
    expect(component.fechaPagoDate).toBe(hoy);
  });

  it('should patch form values when banco is not empty and exentoPago is "No"', () => {
    const hoy = PagoDeDerechosComponent.formatearFecha(new Date());
    component.formularioPagoStore = { ...mockFormularioPago, exentoPago: 'No' };
    component.crearFormularioPago();
    component.formularioPago.patchValue({ justificacion: '', banco: '123' });
    const patchSpy = jest.spyOn(component.formularioPago, 'patchValue');
    component.actualizarValorAleatorio();
    expect(patchSpy).toHaveBeenCalledWith({
      justificacion: '170',
      claveReferencia: 'valor',
      cadenaDependencia: 'valor',
      fechaPago: hoy,
      llavePago: 'valor',
      importePago: 'valor',
    });
    expect(component.fechaPagoDate).toBe(hoy);
  });

  it('should set fechaPagoDate even if no conditions are met', () => {
    const hoy = PagoDeDerechosComponent.formatearFecha(new Date());
    component.formularioPagoStore = { ...mockFormularioPago, exentoPago: 'No' };
    component.crearFormularioPago();
    component.formularioPago.patchValue({ justificacion: '', banco: '' });
    component.actualizarValorAleatorio();
    expect(component.fechaPagoDate).toBe(hoy);
  });
  it('should format single-digit days and months with leading zeros', () => {
    // 5th of April 2024 should be formatted as '05/04/2024'
    const date = new Date(2024, 3, 5); // Months are 0-indexed in JS
    const formatted = PagoDeDerechosComponent.formatearFecha(date);
    expect(formatted).toBe('05/04/2024');
  });

  it('should format double-digit days and months correctly', () => {
    // 15th of November 2023 should be formatted as '15/11/2023'
    const date = new Date(2023, 10, 15); // November is month 10 (0-indexed)
    const formatted = PagoDeDerechosComponent.formatearFecha(date);
    expect(formatted).toBe('15/11/2023');
  });

  it('should call actualizarFormaValida with true when form is valid', () => {
    component.formularioPagoStore = {
      exentoPago: 'Si',
      justificacion: 'some',
      claveReferencia: 'ref',
      cadenaDependencia: 'dep',
      banco: 'bank',
      llavePago: '',
      fechaPago: '01/01/2022',
      importePago: '100'
    };
    component.crearFormularioPago();
    // Patch required fields to make form valid
    component.formularioPago.patchValue({
      exentoPago: 'Si',
      justificacion: 'some',
      claveReferencia: 'ref',
      cadenaDependencia: 'dep',
      banco: 'bank',
      fechaPago: '01/01/2022',
      importePago: '100'
    });
    component.verificarEstadoDelBoton();
    expect(mockService.actualizarFormaValida).toHaveBeenCalledWith({ pagoDeformaValida: true });
  });

  it('should call actualizarFormaValida with false when form is invalid', () => {
    component.formularioPagoStore = {
      exentoPago: '',
      justificacion: '',
      claveReferencia: '',
      cadenaDependencia: '',
      banco: '',
      llavePago: '',
      fechaPago: '',
      importePago: ''
    };
    component.crearFormularioPago();
    // Leave form invalid
    component.verificarEstadoDelBoton();
    expect(mockService.actualizarFormaValida).toHaveBeenCalledWith({ pagoDeformaValida: false });
  });
  it('should update fechaPago and fechaPagoDate when cambioFechaFinal is called', () => {
    component.formularioPagoStore = {
      exentoPago: 'Si',
      justificacion: '',
      claveReferencia: '',
      cadenaDependencia: '',
      banco: '',
      llavePago: '',
      fechaPago: '',
      importePago: ''
    };
    component.crearFormularioPago();
    const patchSpy = jest.spyOn(component.formularioPago, 'patchValue');
    const newDate = '10/04/2024';
    component.cambioFechaFinal(newDate);
    expect(patchSpy).toHaveBeenCalledWith({ fechaPago: newDate });
    expect(component.fechaPagoDate).toBe(newDate);
    expect(component.formularioPago.value.fechaPago).toBe(undefined);
  });
  it('should patch the form, update exentoPagoValor, and recreate the form when cambioValorRadio is called', () => {
    component.formularioPagoStore = { ...mockFormularioPago, exentoPago: 'No' };
    component.crearFormularioPago();
    const patchSpy = jest.spyOn(component.formularioPago, 'patchValue');
    const crearFormularioPagoSpy = jest.spyOn(component, 'crearFormularioPago');
    component.exentoPagoValor = 'Si'; // initial value

    component.cambioValorRadio('exentoPago', 'No');

    expect(patchSpy).toHaveBeenCalledWith({ exentoPago: 'No' });
    expect(component.exentoPagoValor).toBe('No');
    expect(crearFormularioPagoSpy).toHaveBeenCalled();
  });
  it('should disable the form when esFormularioSoloLectura is true', () => {
    component.formularioPagoStore = { ...mockFormularioPago };
    component.crearFormularioPago();
    const disableSpy = jest.spyOn(component.formularioPago, 'disable');
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    expect(disableSpy).toHaveBeenCalled();
  });

  it('should enable the form when esFormularioSoloLectura is false', () => {
    component.formularioPagoStore = { ...mockFormularioPago };
    component.crearFormularioPago();
    const enableSpy = jest.spyOn(component.formularioPago, 'enable');
    component.esFormularioSoloLectura = false;
    component.inicializarEstadoFormulario();
    expect(enableSpy).toHaveBeenCalled();
  });
  it('should set formularioPagoStore from service in constructor', () => {
    const datos = { formularioPago: { exentoPago: 'Si', justificacion: 'test', claveReferencia: '', cadenaDependencia: '', banco: '', llavePago: '', fechaPago: '', importePago: '' } };
    mockService.obtenerDatos.mockReturnValueOnce(of(datos));
    // Re-create component to trigger constructor logic
    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    expect(component.formularioPagoStore).toEqual(datos.formularioPago);
  });
});
