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

  it('should call setValoresStore when tipoBusqueda changes', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.ngOnInit();
    component.solicitudForm.get('tipoBusqueda')?.setValue('Contenedor');
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.solicitudForm, 'tipoBusqueda', 'setTipoBusqueda');
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

  it('should call datosTramiteService.getDatosTableData on loadDatosTablaData', () => {
    const getDatosTableDataSpy = jest.spyOn(datosTramiteServiceMock, 'getDatosTableData');
    component.loadDatosTablaData();
    expect(getDatosTableDataSpy).toHaveBeenCalled();
  });

  it('should call datosTramiteService.getContenedores on cargarCatalogos', () => {
    const getContenedoresSpy = jest.spyOn(datosTramiteServiceMock, 'getContenedores');
    component.cargarCatalogos();
    expect(getContenedoresSpy).toHaveBeenCalled();
  });

  it('should call datosTramiteService.getAduanaLista on fetchgetaduanaLista', () => {
    const getAduanaListaSpy = jest.spyOn(datosTramiteServiceMock, 'getAduanaLista');
    component.fetchgetaduanaLista();
    expect(getAduanaListaSpy).toHaveBeenCalled();
  });

  it('should call continuarEvento.emit on continuar', () => {
    const continuarEventoSpy = jest.spyOn(component.continuarEvento, 'emit');
    component.continuar();
    expect(continuarEventoSpy).toHaveBeenCalledWith('');
  });

  it('should call setValoresStore when inicialesContenedor changes', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.ngOnInit();
    component.solicitudForm.get('inicialesContenedor')?.setValue('BBZM');
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.solicitudForm, 'inicialesContenedor', 'setInicialesContenedor');
  });

  it('should call setValoresStore when numeroContenedor changes', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.ngOnInit();
    component.solicitudForm.get('numeroContenedor')?.setValue('1098765');
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.solicitudForm, 'numeroContenedor', 'setNumeroContenedor');
  });

  it('should call setValoresStore when digitoDeControl changes', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.ngOnInit();
    component.solicitudForm.get('digitoDeControl')?.setValue('1');
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
    expect(component.showSeccionArchivoCsv).toBeFalsy();
    expect(component.showSeccionAduanaaFecha).toBeFalsy();
    expect(component.showSeccionContenedor).toBeFalsy();
    expect(component.showSeccionExcel).toBeFalsy();
    expect(component.mostrarAgregarTipoContenedor).toBeFalsy();
  });

  it('should set mostrarAgregarTipoContenedor to true on mostrarTipoContenedor', () => {
    component.mostrarTipoContenedor();
    expect(component.mostrarAgregarTipoContenedor).toBeTruthy();
  });

  it('should show modal and set showButtons to false on datosCapturaModal', () => {
    component.modalElement = { nativeElement: document.createElement('div') } as ElementRef;
    component.datosCapturaModal();
    expect(component.showButtons).toBeFalsy();
  });

});
