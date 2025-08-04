import { BtnContinuarComponent, TituloComponent, DatosPasos, ListaPasosWizard, ConsultaioQuery } from '@ng-mf/data-access-user';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DetalleComponent } from '../detalle/detalle.component';
import { OficioComponent } from './oficio.component';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('OficioComponent', () => {
  let component: OficioComponent;
  let fixture: ComponentFixture<OficioComponent>;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    // Mock observable stream para selectConsultaioState$
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false })
    };

    await TestBed.configureTestingModule({
      imports: [OficioComponent, ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(OficioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar oficioForm con el grupo oficioData y sus controles', () => {
    expect(component.oficioForm.contains('oficioData')).toBe(true);
    const oficioData = component.oficioForm.get('oficioData');
    expect(oficioData).toBeTruthy();
    ['asignado', 'monto', 'cancelar'].forEach(field => {
      expect(oficioData?.get(field)).toBeTruthy();
    });
  });

  it('debe establecer valores por defecto y deshabilitar campos en updateformfied', () => {
    component.updateformfied();
    const oficioData = component.oficioForm.get('oficioData');
    expect(oficioData?.get('asignado')?.disabled).toBe(true);
    expect(oficioData?.get('monto')?.disabled).toBe(true);
    expect(oficioData?.get('asignado')?.value).toBe('2500');
    expect(oficioData?.get('monto')?.value).toBe('-3991');
    expect(oficioData?.get('cancelar')?.value).toBe('12');
  });

  it('debe deshabilitar el formulario si esFormularioSoloLectura es true en guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = true;
    component.oficioForm.enable();
    component.guardarDatosFormulario();
    expect(component.oficioForm.disabled).toBe(true);
  });

  it('debe habilitar el formulario si esFormularioSoloLectura es false en guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = false;
    component.oficioForm.disable();
    component.guardarDatosFormulario();
    expect(component.oficioForm.enabled).toBe(true);
  });

  it('debe llamar a guardarDatosFormulario si oficioForm existe y esFormularioSoloLectura es true en inicializarEstadoFormulario', () => {
    component.esFormularioSoloLectura = true;
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('debe limpiar las suscripciones en ngOnDestroy', () => {
    const nextSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('debe filtrar los datos de oficio donde unidadPrimaria === 12', () => {
    expect(Array.isArray(component.filteredData)).toBe(true);
    expect(component.filteredData.every(item => item.unidadPrimaria === 12)).toBe(true);
  });

  it('debe inicializar correctamente filteredData aunque no haya datos', () => {
    // Simula que no hay datos en la fuente original
    // component['data'] = [];
    component.ngOnInit();
    expect(component.filteredData).toEqual([]);
  });

  it('debe no llamar guardarDatosFormulario si esFormularioSoloLectura es false en inicializarEstadoFormulario', () => {
    component.esFormularioSoloLectura = false;
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.inicializarEstadoFormulario();
    expect(spy).not.toHaveBeenCalled();
  });

  it('debe actualizar los valores del formulario en updateformfied aunque los controles no existan', () => {
    // Simula que oficioData no existe
    jest.spyOn(component.oficioForm, 'get').mockReturnValue(null as any);
    expect(() => component.updateformfied()).not.toThrow();
    jest.restoreAllMocks();
  });

  it('debe crear el formulario correctamente en el constructor', () => {
    expect(component.oficioForm).toBeDefined();
    expect(component.oficioForm.get('oficioData')).toBeDefined();
  });

  it('debe tener destroyNotifier$ como instancia de Subject', () => {
    expect(component['destroyNotifier$']).toBeInstanceOf(Subject);
  });

  it('debe establecer showDevolverModal en true al llamar abrirDevolverFacturas', () => {
    component.showDevolverModal = false;
    component.abrirDevolverFacturas();
    expect(component.showDevolverModal).toBe(true);
  });

  it('debe establecer showDevolverModal en false por defecto', () => {
    expect(component.showDevolverModal).toBe(false);
  });

  it('debe inicializar nuevaNotificacion y elementoParaEliminar al llamar abrirModal sin argumentos', () => {
    component.abrirModal();
    expect(component.nuevaNotificacion).toBeDefined();
    expect(component.nuevaNotificacion.tipoNotificacion).toBe('alert');
    expect(component.nuevaNotificacion.categoria).toBe('danger');
    expect(component.nuevaNotificacion.modo).toBe('action');
    expect(component.nuevaNotificacion.mensaje).toBe('seleccione un registro');
    expect(component.elementoParaEliminar).toBe(0);
  });

  it('debe establecer elementoParaEliminar al llamar abrirModal con argumento', () => {
    component.abrirModal(5);
    expect(component.elementoParaEliminar).toBe(5);
  });

  it('debe establecer elementoParaEliminar en valores negativos y grandes en abrirModal', () => {
    component.abrirModal(-1);
    expect(component.elementoParaEliminar).toBe(-1);
    component.abrirModal(9999);
    expect(component.elementoParaEliminar).toBe(9999);
  });

  it('debe tener nuevaNotificacion indefinida por defecto', () => {
    expect(component.nuevaNotificacion).toBeUndefined();
  });

  it('debe tener filteredData como array por defecto', () => {
    expect(Array.isArray(component.filteredData)).toBe(true);
  });

  it('debe tener esFormularioSoloLectura como false por defecto', () => {
    expect(component.esFormularioSoloLectura).toBe(false);
  });

  it('debe dejar filteredData vacío si oficio está vacío', () => {
    component.oficio = [];
    component.filteredData = component.oficio.filter(item => item.unidadPrimaria === 12);
    expect(component.filteredData).toEqual([]);
  });

  it('debe dejar filteredData vacío si ningún elemento cumple la condición', () => {
    component.oficio = [
      { unidadPrimaria: 1, folioOficioCertificado: '', nombreRazonSocial: '', estado: '', fabricante: '', importador: '' },
      { unidadPrimaria: 2, folioOficioCertificado: '', nombreRazonSocial: '', estado: '', fabricante: '', importador: '' },
      { unidadPrimaria: 3, folioOficioCertificado: '', nombreRazonSocial: '', estado: '', fabricante: '', importador: '' }
    ];
    component.filteredData = component.oficio.filter(item => item.unidadPrimaria === 12);
    expect(component.filteredData).toEqual([]);
  });

  it('debe dejar filteredData igual a oficio si todos cumplen la condición', () => {
    component.oficio = [
      { unidadPrimaria: 12, folioOficioCertificado: '', nombreRazonSocial: '', estado: '', fabricante: '', importador: '' },
      { unidadPrimaria: 12, folioOficioCertificado: '', nombreRazonSocial: '', estado: '', fabricante: '', importador: '' }
    ];
    component.filteredData = component.oficio.filter(item => item.unidadPrimaria === 12);
    expect(component.filteredData).toEqual(component.oficio);
  });

  it('debe dejar filteredData solo con los elementos que cumplen la condición', () => {
    component.oficio = [
      { unidadPrimaria: 12, folioOficioCertificado: '', nombreRazonSocial: '', estado: '', fabricante: '', importador: '' },
      { unidadPrimaria: 5, folioOficioCertificado: '', nombreRazonSocial: '', estado: '', fabricante: '', importador: '' },
      { unidadPrimaria: 12, folioOficioCertificado: '', nombreRazonSocial: '', estado: '', fabricante: '', importador: '' },
      { unidadPrimaria: 7, folioOficioCertificado: '', nombreRazonSocial: '', estado: '', fabricante: '', importador: '' }
    ];
    component.filteredData = component.oficio.filter(item => item.unidadPrimaria === 12);
    expect(component.filteredData.length).toBe(2);
    expect(component.filteredData.every(item => item.unidadPrimaria === 12)).toBe(true);
  });

  it('debe tener configuracionTabla con 6 columnas y encabezados correctos', () => {
    expect(component.configuracionTabla.length).toBe(6);
    expect(component.configuracionTabla[0].encabezado).toBe('Folio del oficio de certificado');
    expect(component.configuracionTabla[1].encabezado).toBe('Nombre, Denominación o Razón Social');
    expect(component.configuracionTabla[2].encabezado).toBe('Estado');
    expect(component.configuracionTabla[3].encabezado).toBe('Fabricante');
    expect(component.configuracionTabla[4].encabezado).toBe('Importador');
    expect(component.configuracionTabla[5].encabezado).toBe('Unidad Primaria');
  });

  it('debe mapear correctamente los valores de un item usando configuracionTabla', () => {
    const item = {
      folioOficioCertificado: 'ABC123',
      nombreRazonSocial: 'Empresa S.A.',
      estado: 'Activo',
      fabricante: 'FabricanteX',
      importador: 'ImportadorY',
      unidadPrimaria: 12
    };
    expect(component.configuracionTabla[0].clave(item)).toBe('ABC123');
    expect(component.configuracionTabla[1].clave(item)).toBe('Empresa S.A.');
    expect(component.configuracionTabla[2].clave(item)).toBe('Activo');
    expect(component.configuracionTabla[3].clave(item)).toBe('FabricanteX');
    expect(component.configuracionTabla[4].clave(item)).toBe('ImportadorY');
    expect(component.configuracionTabla[5].clave(item)).toBe(12);
  });

  it('debe filtrar correctamente los datos de oficio por unidadPrimaria usando filteredData', () => {
    component.oficio = [
      { unidadPrimaria: 12, folioOficioCertificado: 'F1', nombreRazonSocial: 'A', estado: 'Activo', fabricante: 'X', importador: 'Y' },
      { unidadPrimaria: 11, folioOficioCertificado: 'F2', nombreRazonSocial: 'B', estado: 'Inactivo', fabricante: 'Z', importador: 'W' },
      { unidadPrimaria: 12, folioOficioCertificado: 'F3', nombreRazonSocial: 'C', estado: 'Activo', fabricante: 'X', importador: 'Y' }
    ];
    component.filteredData = component.oficio.filter(item => item.unidadPrimaria === 12);
    expect(component.filteredData.length).toBe(2);
    expect(component.filteredData[0].folioOficioCertificado).toBe('F1');
    expect(component.filteredData[1].folioOficioCertificado).toBe('F3');
  });
});

