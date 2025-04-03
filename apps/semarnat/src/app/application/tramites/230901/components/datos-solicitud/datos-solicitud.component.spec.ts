import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { AutorizacionesDeVidaSilvestreService } from '../../services/autorizaciones-de-vida-silvestre.service';
import { Tramite230901Store } from '../../estados/store/tramite230901.store';
import { Tramite230901Query } from '../../estados/query/tramite230901.query';
import { CatalogoSelectComponent, CrosslistComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { MercanciaConfiguracionItem } from '../../enum/mercancia-tabla.enum';

describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let fixture: ComponentFixture<DatosSolicitudComponent>;
  let tramite230901StoreMock: any;
  let tramite230901QueryMock: any;
  let autorizacionesDeVidaSilvestreServiceMock: any;

  beforeEach(async () => {
    tramite230901StoreMock = {
      setTipoDeMovimiento: jest.fn(),
      setTipoDeRegimen: jest.fn(),
      setMercanciaTablaDatos: jest.fn(),
    };

    tramite230901QueryMock = {
      selectSolicitud$: of({
        tipoDeMovimiento: '1',
        tipoDeRegimen: 'A',
        mercanciaTablaDatos: [],
      }),
    };

    autorizacionesDeVidaSilvestreServiceMock = {
      inicializaDatosSolicitudDatosCatalogos: jest.fn(),
      inicializaMercanciaDatosCatalogos: jest.fn(),
      fraccionArancelaria: [{ descripcion: 'Fracción 1' }],
      clasificacionTaxonomica: [{ descripcion: 'Clasificación 1' }],
      nombreCientifico: [{ descripcion: 'Nombre Científico 1' }],
      nombreComun: [{ descripcion: 'Nombre Común 1' }],
      unidadMedida: [{ descripcion: 'Unidad 1' }],
      paisOrigen: [{ descripcion: 'País Origen 1' }],
      paisProcedencia: [{ descripcion: 'País Procedencia 1' }],
    };

    await TestBed.configureTestingModule({
      declarations: [DatosSolicitudComponent],
      imports: [ReactiveFormsModule, CrosslistComponent, TituloComponent, TablaDinamicaComponent, CatalogoSelectComponent],
      providers: [
        { provide: Tramite230901Store, useValue: tramite230901StoreMock },
        { provide: Tramite230901Query, useValue: tramite230901QueryMock },
        { provide: AutorizacionesDeVidaSilvestreService, useValue: autorizacionesDeVidaSilvestreServiceMock },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formSolicitud).toBeDefined();
    expect(component.formSolicitud.get('tipodemovimiento')?.value).toBe('1');
    expect(component.formSolicitud.get('tipoderegimen')?.value).toBe('A');
  });

  it('should call inicializaDatosSolicitudDatosCatalogos on ngOnInit', () => {
    component.ngOnInit();
    expect(autorizacionesDeVidaSilvestreServiceMock.inicializaDatosSolicitudDatosCatalogos).toHaveBeenCalled();
  });

  it('should handle changes in tipoDeMovimiento and update the store', () => {
    component.ngOnInit();
    component.formSolicitud.get('tipodemovimiento')?.setValue('2');
    component.manejarCambioTipoMovimiento();
    expect(tramite230901StoreMock.setTipoDeMovimiento).toHaveBeenCalledWith('2');
    expect(component.tipoMovimientoSeleccionada).toBe(2);
  });

  it('should handle changes in tipoDeRegimen and update the store', () => {
    component.ngOnInit();
    component.formSolicitud.get('tipoderegimen')?.setValue('B');
    component.manejarCambioTipoRegimen();
    expect(tramite230901StoreMock.setTipoDeRegimen).toHaveBeenCalledWith('B');
  });

  it('should create formMercancia with default values', () => {
    component.crearNuevoFormularioMercancia();
    expect(component.formMercancia).toBeDefined();
    expect(component.formMercancia.get('fraccionArancelaria')?.value).toBe('');
    expect(component.formMercancia.get('descripcion')?.value).toBe('');
  });

  it('should toggle showDatosMercanciaModal when alternarModalMercancia is called', () => {
    component.showDatosMercanciaModal = false;
    component.alternarModalMercancia();
    expect(component.showDatosMercanciaModal).toBeTruthy();

    component.alternarModalMercancia();
    expect(component.showDatosMercanciaModal).toBeFalsy();
  });

  it('should call inicializaMercanciaDatosCatalogos and toggle modal on mostrarFormularioMercanciaModal', () => {
    component.mostrarFormularioMercanciaModal();
    expect(autorizacionesDeVidaSilvestreServiceMock.inicializaMercanciaDatosCatalogos).toHaveBeenCalled();
    expect(component.showDatosMercanciaModal).toBeTruthy();
  });

  it('should validate esControlInvalido for invalid form controls', () => {
    component.crearNuevoFormularioMercancia();
    component.formMercancia.get('descripcion')?.markAsTouched();
    expect(component.esControlInvalido('descripcion')).toBeTruthy();
  });

  it('should add a new row to tablaDatos on enviarFormularioMercancia', () => {
    component.crearNuevoFormularioMercancia();
    component.formMercancia.get('fraccionArancelaria')?.setValue(0);
    component.formMercancia.get('descripcion')?.setValue('Descripción');
    component.formMercancia.get('clasificacionTaxonomica')?.setValue(1);
    component.formMercancia.get('nombreCientifico')?.setValue(1);
    component.formMercancia.get('nombreComun')?.setValue(1);
    component.formMercancia.get('unidadMedida')?.setValue(1);
    component.formMercancia.get('paisOrigen')?.setValue(1);
    component.formMercancia.get('paisProcedencia')?.setValue(1);
    component.formMercancia.get('marca')?.setValue('Marca');
    component.formMercancia.get('cantidad')?.setValue(10);

    component.enviarFormularioMercancia();
    expect(component.tablaDatos.length).toBe(1); // New row added
    expect(tramite230901StoreMock.setMercanciaTablaDatos).toHaveBeenCalled();
  });

  it('should handle fila seleccionada', () => {
    const mockRow: MercanciaConfiguracionItem = {
      id: 123,
      fraccionArancelaria: '12345678',
      otraFraccion: false,
      descripcion: 'Descripción de la mercancía',
      rendimientoProducto: 'Rendimiento del producto',
      clasificacionTaxonomica: 'Clasificación taxonómica',
      nombreCientifico: 'Nombre científico',
      nombreComun: 'Nombre común',
      marca: 'Marca de la mercancía',
      cantidad: '10',
      unidadMedida: 'Unidad de medida',
      paisOrigen: 'País de origen',
      paisProcedencia: 'País de procedencia',
    };
    component.manejarFilaSeleccionada([mockRow]);
    expect(component.filaSeleccionada).toEqual(mockRow);
  });

  it('should update filaSeleccionada with the latest data from tablaDatos', () => {
    component.tablaDatos = [
      {
        id: 1, descripcion: 'Item 1',
        fraccionArancelaria: '',
        otraFraccion: false,
        clasificacionTaxonomica: '',
        rendimientoProducto: '',
        nombreCientifico: '',
        nombreComun: '',
        marca: '',
        cantidad: '',
        unidadMedida: '',
        paisOrigen: '',
        paisProcedencia: ''
      },
    ];
    component.filaSeleccionada = { 
      id: 1, 
      descripcion: 'Updated Item',
      fraccionArancelaria: '',
      otraFraccion: false,
      clasificacionTaxonomica: '',
      rendimientoProducto: '',
      nombreCientifico: '',
      nombreComun: '',
      marca: '',
      cantidad: '',
      unidadMedida: '',
      paisOrigen: '',
      paisProcedencia: ''
    };
    component.manejarFilaSeleccionada([component.tablaDatos[0]]);
    component.actualizarFilaSeleccionada();
    expect(component.filaSeleccionada.descripcion).toBe('Item 1');
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});