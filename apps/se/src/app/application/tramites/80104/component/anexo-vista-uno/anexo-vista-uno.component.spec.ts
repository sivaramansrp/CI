import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnexoVistaUnoComponent } from './anexo-vista-uno.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { ANEXO_I_SERVICIO, ANEXO_IMPORTACION_SERVICIO } from '../../../../shared/constantes/anexo-dos-y-tres.enum';
import { AnexoDosEncabezado, AnexoUnoEncabezado } from '../../../../shared/models/nuevo-programa-industrial.model';
import {  NO_ERRORS_SCHEMA } from '@angular/core';
import { AnexoUnoComponent } from '../../../../shared/components/anexo-uno/anexo-uno.component';

describe('AnexoVistaUnoComponent', () => {
  let component: AnexoVistaUnoComponent;
  let fixture: ComponentFixture<AnexoVistaUnoComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnexoVistaUnoComponent, AnexoUnoComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AnexoVistaUnoComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('debería crear', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar anexoUnoConfig correctamente', () => {
    expect(component.anexoUnoConfig.anexoUnoTablaSeleccionRadio).toBe(TablaSeleccion.RADIO);
    expect(component.anexoUnoConfig.anexoUnoEncabezadoDeTabla).toBe(ANEXO_I_SERVICIO);
  });

  it('debería inicializar anexoImportacionConfig correctamente', () => {
    expect(component.anexoImportacionConfig.anexoDosTablaSeleccionRadio).toBe(TablaSeleccion.RADIO);
    expect(component.anexoImportacionConfig.anexoDosEncabezadoDeTabla).toBe(ANEXO_IMPORTACION_SERVICIO);
  });

  it('debería actualizar anexoUnoTablaLista en obtenerAnexoUnoDevolverLaLlamada', () => {
    const MOCK_EVENT: AnexoUnoEncabezado[] = [{
      encabezadoFraccion: 'sample',
      encabezadoFraccionArancelaria: 'sample',
      encabezadoDescripcionComercial: 'sample',
      encabezadoAnexoII: 'sample',
      encabezadoTipo: '',
      encabezadoUmt: '',
      encabezadoCategoria: '',
      encabezadoValorEnMercado: '',
      estatus: false
    }];
    component.obtenerAnexoUnoDevolverLaLlamada(MOCK_EVENT);
    expect(component.anexoUnoTablaLista).toEqual(MOCK_EVENT);
  });

  it('debe actualizar anexoDosTablaLista en obtenerAnexoDosDevolverLaLlamada', () => {
    const mockEvent: AnexoDosEncabezado[] = [{
      encabezadoFraccion: '',
      encabezadoFraccionExportacion: '',
      encabezadoDescripcionComercial: '',
      encabezadoFraccionImportacion: '',
      estatus: false
    }];
    component.obtenerAnexoDosDevolverLaLlamada(mockEvent);
    expect(component.anexoDosTablaLista).toEqual(mockEvent);
  });

});