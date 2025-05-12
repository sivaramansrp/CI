import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ContenedorComponent } from './contenedor.component';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { DatosTramiteService } from '../../services/datos-tramite.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ElementRef } from '@angular/core';

describe('ContenedorComponent', () => {
  let component: ContenedorComponent;
  let fixture: ComponentFixture<ContenedorComponent>;
  let datosTramiteServiceMock: any;

  beforeEach(async () => {
    datosTramiteServiceMock = {
      getContenedores: jest.fn().mockReturnValue(of({ data: [] })),
      getTransporteList: jest.fn(),
      getAduanaLista: jest.fn().mockReturnValue(of({ data: [] })),
      agregarSolicitud: jest.fn().mockReturnValue(of({ success: true, datos: {} })),
      submitSolicitud: jest.fn(),
      getDatosTableData: jest.fn().mockReturnValue(of({ data: [] })) // Add this line
    };
    await TestBed.configureTestingModule({
      imports: [ContenedorComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(),
      { provide: DatosTramiteService, useValue: datosTramiteServiceMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContenedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.solicitudForm).toBeDefined();
  });

  it('should call agregarSolicitud when datosCaptura is called with valid form', () => {
    const agregarSolicitudSpy = jest.spyOn(component, 'agregarSolicitud');
    component.solicitudForm.patchValue({
      aduana: 'aduana',
      fechaIngreso: '2024-03-13',
      vigencia: '2024-03-13',
      inicialesContenedor: 'BBZM',
      numeroContenedor: '1098765',
      contenedores: 'AC'
    });
    component.datosCaptura();
    expect(agregarSolicitudSpy).toHaveBeenCalled();
  });

  it('should call continuarEvento.emit on continuar', () => {
    const continuarEventoSpy = jest.spyOn(component.continuarEvento, 'emit');
    component.continuar();
    expect(continuarEventoSpy).toHaveBeenCalledWith('');
  });

  it('should call setValoresStore when inicialesContenedor changes', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.ngOnInit();
    const event = { target: { value: 'BBZM' } }; // Simulate the change event
    component.onChange('inicialesContenedor', event); // Explicitly call onChange
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.solicitudForm, 'inicialesContenedor', 'setInicialesContenedor');
  });

  it('should call setValoresStore when numeroContenedor changes', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.ngOnInit();
    const event = { target: { value: '234846' } }; // Simulate the change event
    component.onChange('numeroContenedor', event); // Explicitly call onChange
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.solicitudForm, 'numeroContenedor', 'setNumeroContenedor');
  });

  it('should call setValoresStore when digitoDeControl changes', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.ngOnInit();
    const event = { target: { value: '1' } }; // Simulate the change event
    component.onChange('digitoDeControl', event); // Explicitly call onChange
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.solicitudForm, 'digitoDeControl', 'setDigitoDeControl');
  });

  it('should call mostrarCampos when tipoBusqueda changes', () => {
    const mostrarCamposSpy = jest.spyOn(component, 'mostrarCampos');
    component.ngOnInit();
    component.solicitudForm.get('tipoBusqueda')?.setValue('Contenedor');
    expect(mostrarCamposSpy).toHaveBeenCalled();
  });

  it('should reset form and flags on limpiarCampos', () => {
    component.limpiarCampos();
    expect(component.solicitudForm.pristine).toBeTruthy();
    expect(component.mostrarSeccionArchivoCsv).toBeFalsy();
    expect(component.mostrarSeccionAduanaaFecha).toBeFalsy();
    expect(component.mostrarSeccionContenedor).toBeFalsy();
    expect(component.mostrarSeccionExcel).toBeFalsy();
    expect(component.mostrarAgregarTipoContenedor).toBeFalsy();
  });

  it('should set mostrarAgregarTipoContenedor to true on mostrarTipoContenedor', () => {
    component.mostrarTipoContenedor();
    expect(component.mostrarAgregarTipoContenedor).toBeTruthy();
  });

});
