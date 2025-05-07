import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { DatosSolicitudComponent } from './datos-solicitud.component';

import { PermisoCitesService } from '../../services/permiso-cites.service';
import { Tramite230902Store } from '../../estados/tramite230902.store';
import { Tramite230902Query } from '../../estados/tramite230902.query';
import { CatalogoSelectComponent, CrosslistComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';

describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let fixture: ComponentFixture<DatosSolicitudComponent>;
  let permisoCitesServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;

  beforeEach(async () => {
    permisoCitesServiceMock = {
      inicializaDatosSolicitudDatosCatalogos: jest.fn(),
      inicializaMercanciaDatosCatalogos: jest.fn(),
      loadTablaDatos: jest.fn().mockReturnValue(of([])),
      fraccionArancelaria: [{ id: '1', descripcion: '0101.21.01' }],
      fraccionArancelariaDescripcion: [{ id: '0101.21.01', descripcion: 'Caballos pura sangre' }],
      clasificacionTaxonomica: [{ descripcion: 'Mamífero' }],
      nombreCientifico: [{ descripcion: 'Equus ferus caballus' }],
      nombreComun: [{ descripcion: 'Caballo' }],
      unidadMedida: [{ descripcion: 'Cabeza' }],
      paisOrigen: [{ descripcion: 'México' }],
      paisProcedencia: [{ descripcion: 'México' }],
    };

    tramiteStoreMock = {
      establecerDatos: jest.fn(),
      setMercanciaTablaDatos: jest.fn(),
    };

    tramiteQueryMock = {
      selectSolicitud$: of({
        tipodeMovimiento: '1',
        tipoRegimen: 'A',
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [DatosSolicitudComponent],
       imports: [ReactiveFormsModule, CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent, CrosslistComponent],
      providers: [
        FormBuilder,
        { provide: PermisoCitesService, useValue: permisoCitesServiceMock },
        { provide: Tramite230902Store, useValue: tramiteStoreMock },
        { provide: Tramite230902Query, useValue: tramiteQueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formSolicitud with values from state', () => {
    expect(component.formSolicitud.get('tipodeMovimiento')?.value).toBe('1');
    expect(component.formSolicitud.get('tipoRegimen')?.value).toBe('A');
  });

  it('should toggle modal visibility', () => {
    component.showDatosMercanciaModal = false;
    component.alternarVisibilidadModalMercancia();
    expect(component.showDatosMercanciaModal).toBe(true);
  });

  it('should create a new empty mercancia form', () => {
    component.crearNuevoFormularioMercancia();
    expect(component.formMercancia).toBeDefined();
    expect(component.formMercancia.valid).toBe(false);
  });

  it('should not submit if mercancia form is invalid', () => {
    component.crearNuevoFormularioMercancia();
    component.enviarFormularioMercancia();
    expect(component.tablaDatos.length).toBe(0);
  });

  it('should add a new mercancia item if form is valid', () => {
    component.crearNuevoFormularioMercancia();
    component.formMercancia.patchValue({
      fraccionArancelaria: '1',
      descripcion: 'Caballo reproductor',
      clasificacionTaxonomica: '1',
      nombreCientifico: '1',
      nombreComun: '1',
      marca: 'No aplica',
      cantidad: '2',
      unidadMedida: '1',
      paisOrigen: '1',
      paisProcedencia: '1',
    });

    component.enviarFormularioMercancia();
    expect(component.tablaDatos.length).toBe(1);
  });

  it('should handle selection and enable modification', () => {
    const row = {
      id: 1,
      fraccionArancelaria: '0101.21.01',
      fraccionDescripcion: '',
      otraFraccion: false,
      descripcion: 'Animal',
      rendimientoProducto: '',
      clasificacionTaxonomica: 'Mamífero',
      nombreCientifico: 'Equus ferus caballus',
      nombreComun: 'Caballo',
      marca: 'MarcaX',
      cantidad: '1',
      unidadMedida: 'Cabeza',
      paisOrigen: 'México',
      paisProcedencia: 'México',
    };
    component.tablaDatos = [row];
    component.hadleFilaSeleccionada([row]);
    expect(component.enableModficarBoton).toBe(true);
  });

  it('should modify a selected mercancia item', () => {
    const row = {
      id: 1,
      fraccionArancelaria: '0101.21.01',
      fraccionDescripcion: '',
      otraFraccion: false,
      descripcion: 'Animal',
      rendimientoProducto: '',
      clasificacionTaxonomica: 'Mamífero',
      nombreCientifico: 'Equus ferus caballus',
      nombreComun: 'Caballo',
      marca: 'MarcaX',
      cantidad: '1',
      unidadMedida: 'Cabeza',
      paisOrigen: 'México',
      paisProcedencia: 'México',
    };
    component.tablaDatos = [row];
    component.listaFilaSeleccionadaMercancia = [row];
    component.filaSeleccionada = row;
    component.modficarMercanciaItem();
    expect(component.formMercancia).toBeDefined();
    expect(component.esOperacionDeActualizacion).toBe(true);
  });

  it('should delete selected mercancia items', () => {
    const row = {
      id: 1,
      fraccionArancelaria: '0101.21.01',
      fraccionDescripcion: '',
      otraFraccion: false,
      descripcion: '',
      rendimientoProducto: '',
      clasificacionTaxonomica: '',
      nombreCientifico: '',
      nombreComun: '',
      marca: '',
      cantidad: '',
      unidadMedida: '',
      paisOrigen: '',
      paisProcedencia: '',
    };
    component.tablaDatos = [row];
    component.listaFilaSeleccionadaMercancia = [row];
    component.eliminarMercanciaItem();
    expect(component.tablaDatos.length).toBe(0);
  });

  it('should set value in store from form', () => {
    component.formSolicitud.get('tipoRegimen')?.setValue('B');
    component.setValoresStore(component.formSolicitud, 'tipoRegimen');
    expect(tramiteStoreMock.establecerDatos).toHaveBeenCalledWith({ tipoRegimen: 'B' });
  });
});