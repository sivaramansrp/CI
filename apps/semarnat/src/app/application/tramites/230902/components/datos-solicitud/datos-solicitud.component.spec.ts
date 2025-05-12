import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { PermisoCitesService } from '../../services/permiso-cites.service';
import { Tramite230902Store } from '../../estados/tramite230902.store';
import { Tramite230902Query } from '../../estados/tramite230902.query';
import { of } from 'rxjs';
import { ConfiguracionItem } from '../../enum/mercancia.enum';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let fixture: ComponentFixture<DatosSolicitudComponent>;
  let permisoCitesServiceMock: any;
  let tramite230902StoreMock: any;
  let tramite230902QueryMock: any;

  beforeEach(async () => {
    permisoCitesServiceMock = {
      inicializaDatosSolicitudDatosCatalogos: jest.fn(),
      loadTablaDatos: jest.fn().mockReturnValue(of([])),
      fraccionArancelariaDescripcion: [],
    };

    tramite230902StoreMock = {
      setTipoDeMovimiento: jest.fn(),
      setMercanciaTablaDatos: jest.fn(),
    };

    tramite230902QueryMock = {
      selectSolicitud$: of({
        tipodeMovimiento: '1',
        tipoRegimen: 'Importación',
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [DatosSolicitudComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: PermisoCitesService, useValue: permisoCitesServiceMock },
        { provide: Tramite230902Store, useValue: tramite230902StoreMock },
        { provide: Tramite230902Query, useValue: tramite230902QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component and load data catalogs', () => {
    component.ngOnInit();
    expect(permisoCitesServiceMock.inicializaDatosSolicitudDatosCatalogos).toHaveBeenCalled();
    expect(component.solicitud230902State).toEqual({ tipodeMovimiento: '1', tipoRegimen: 'Importación' });
  });

  it('should create the solicitud form with default values', () => {
    component.crearFormularioSolicitud();
    expect(component.formSolicitud).toBeDefined();
    expect(component.formSolicitud.get('tipodeMovimiento')?.value).toEqual('1');
    expect(component.formSolicitud.get('tipoRegimen')?.value).toEqual('Importación');
  });

  it('should handle tipoMovimiento change and update aduanasBotons', () => {
    component.crearFormularioSolicitud();
    component.formSolicitud.get('tipodeMovimiento')?.setValue('2');
    component.cambiarTipoDeMovimiento();
    expect(tramite230902StoreMock.setTipoDeMovimiento).toHaveBeenCalledWith('2');
    expect(component.tipoMovimientoSeleccionada).toEqual(2);
    expect(component.aduanasBotons).toEqual(component.crossListBotons);
  });

  it('should handle tipoRegimen change and update store', () => {
    component.crearFormularioSolicitud();
    component.formSolicitud.get('tipoRegimen')?.setValue('Exportación');
    component.onTipoRegimenChange();
    expect(tramite230902StoreMock.setTipoDeRegimen).toHaveBeenCalledWith('Exportación');
  });

  it('should handle row selection and enable buttons', () => {
    const row: ConfiguracionItem = {
      id: 1,
      fraccionArancelaria: '',
      otraFraccion: false,
      descripcion: '',
      clasificacionTaxonomica: '',
      rendimientoProducto: '',
      nombreCientifico: '',
      nombreComun: '',
      unidadMedida: '',
      paisOrigen: '',
      paisProcedencia: '',
      marca: '',
      cantidad: '0',
      fraccionDescripcion: ''
    };
    component.hadleFilaSeleccionada([row]);
    expect(component.filaSeleccionada).toEqual(row);
    expect(component.enableModficarBoton).toBeTruthy();
    expect(component.enableEliminarBoton).toBeTruthy();
  });

  it('should disable buttons when no row is selected', () => {
    component.hadleFilaSeleccionada([]);
    expect(component.enableModficarBoton).toBeFalsy();
    expect(component.enableEliminarBoton).toBeFalsy();
  });

  it('should open modal for modifying a single row', () => {
    const row: ConfiguracionItem = {
      id: 1,
      fraccionArancelaria: 'Test',
      otraFraccion: false,
      descripcion: 'Description',
      clasificacionTaxonomica: 'Taxonomy',
      rendimientoProducto: '',
      nombreCientifico: 'Scientific Name',
      nombreComun: 'Common Name',
      unidadMedida: 'Unit',
      paisOrigen: 'Origin',
      paisProcedencia: 'Procedence',
      marca: 'Brand',
      cantidad: '10',
      fraccionDescripcion: 'Test Description'
    };
    component.listaFilaSeleccionadaMercancia = [row];
    component.modficarMercanciaItem();
    expect(component.esOperacionDeActualizacion).toBeTruthy();
    expect(component.showDatosMercanciaModal).toBeTruthy();
  });

  it('should close multiple selection popup', () => {
    component.multipleSeleccionPopupAbierto = true;
    component.cerrarMultipleSeleccionPopup();
    expect(component.multipleSeleccionPopupAbierto).toBeFalsy();
  });

it('should close confirmation popup for deleting rows', () => {
    component.confirmEliminarPopupAbierto = true;
    component.cerrarEliminarConfirmationPopup();
    expect(component.confirmEliminarPopupAbierto).toBeFalsy();
  });

 it('should handle fraccionArancelaria change and update description', () => {
    const catalogo: Catalogo = { id: 1, descripcion: 'Test Description' };
    permisoCitesServiceMock.fraccionArancelariaDescripcion = [catalogo];
    component.manejarCambioFraccionArancelaria(catalogo);
    expect(component.formMercancia.get('fraccionDescripcion')?.value).toEqual('Test Description');
  });

  it('should validate form control as invalid', () => {
    component.crearNuevoFormularioMercancia();
    component.formMercancia.get('descripcion')?.setValue('');
    component.formMercancia.get('descripcion')?.markAsTouched();
    expect(component.esInvalido('descripcion')).toBeTruthy();
  });

  it('should validate form control as valid', () => {
    component.crearNuevoFormularioMercancia();
    component.formMercancia.get('descripcion')?.setValue('Valid Description');
    expect(component.esInvalido('descripcion')).toBeFalsy();
  });

  it('should submit mercancia form and add new row to table', () => {
    component.crearNuevoFormularioMercancia();
    component.formMercancia.get('descripcion')?.setValue('New Description');
    component.formMercancia.get('cantidad')?.setValue('5');
    component.formMercancia.get('unidadMedida')?.setValue('1');
    component.formMercancia.get('paisOrigen')?.setValue('1');
    component.formMercancia.get('paisProcedencia')?.setValue('1');
    component.enviarFormularioMercancia();
    expect(component.tablaDatos.length).toEqual(1);
    expect(component.tablaDatos[0].descripcion).toEqual('New Description');
  });

  it('should update existing row in table on mercancia form submission', () => {
    const row: ConfiguracionItem = {
      id: 1,
      fraccionArancelaria: 'Test',
      otraFraccion: false,
      descripcion: 'Old Description',
      clasificacionTaxonomica: '',
      rendimientoProducto: '',
      nombreCientifico: '',
      nombreComun: '',
      unidadMedida: '',
      paisOrigen: '',
      paisProcedencia: '',
      marca: '',
      cantidad: '10',
      fraccionDescripcion: ''
    };
    component.tablaDatos = [row];
    component.crearNuevoFormularioMercancia(row);
    component.formMercancia.get('descripcion')?.setValue('Updated Description');
    component.enviarFormularioMercancia();
    expect(component.tablaDatos.length).toEqual(1);
    expect(component.tablaDatos[0].descripcion).toEqual('Updated Description');
  });

  it('should clean up subscriptions on destroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});