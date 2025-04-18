import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { Tramite300105Store } from '../../estados/tramite300105.store';
import { Tramite300105Query } from '../../estados/tramite300105.query';
import { AutorizacionDeRayosXService } from '../../services/autorizacion-de-rayos-x.service';
import { ConfiguracionItem, SerieConfiguracionItem } from '../../enum/mercancia-tabla.enum';

describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let fixture: ComponentFixture<DatosSolicitudComponent>;
  let tramite300105StoreMock: jest.Mocked<Tramite300105Store>;
  let tramite300105QueryMock: jest.Mocked<Tramite300105Query>;
  let autorizacionDeRayosXServiceMock: jest.Mocked<AutorizacionDeRayosXService>;

  beforeEach(async () => {
    tramite300105StoreMock = {
        setMercanciaTablaDatos: jest.fn(),
    } as unknown as jest.Mocked<Tramite300105Store>;

    tramite300105QueryMock = {
        selectTramite300105$: of({
            mercanciaTablaDatos: [],
        }),
    } as unknown as jest.Mocked<Tramite300105Query>;

    autorizacionDeRayosXServiceMock = {
        fraccionArancelariaDescripcion: [{ id: '1', descripcion: 'Fracción 1' }],
        unidadMedidaVoltaje: [{ id: '1', descripcion: 'Voltaje 1' }],
        unidadMedidaCorriente: [{ id: '1', descripcion: 'Corriente 1' }],
        fraccionArancelaria: [{ id: '1', descripcion: 'Fracción 1' }],
        inicializaMercanciaDatosCatalogos: jest.fn(),
    } as unknown as jest.Mocked<AutorizacionDeRayosXService>;

    await TestBed.configureTestingModule({
      declarations: [DatosSolicitudComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite300105Store, useValue: tramite300105StoreMock },
        { provide: Tramite300105Query, useValue: tramite300105QueryMock },
        { provide: AutorizacionDeRayosXService, useValue: autorizacionDeRayosXServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
    component.ngOnDestroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and fetch data on ngOnInit', () => {
    expect(component.datosTablaMercancia).toEqual([]);
    expect(component.botonesMovimientos).toBeDefined();
  });

  it('should create a new formularioMercancia with default values', () => {
    component.crearNuevoFormularioMercancia();
    expect(component.formularioMercancia).toBeDefined();
    expect(component.formularioMercancia.get('marca')?.value).toBe('');
  });

  it('should handle fracción arancelaria change', () => {
    const event = { id: 1, descripcion: '1' };
    component.crearNuevoFormularioMercancia();
    component.manejarCambioFraccionArancelaria(event);
    expect(component.formularioMercancia.get('fraccionDescripcion')?.value).toBe('Fracción 1');
  });

  it('should handle row selection in the table', () => {
    const fila: ConfiguracionItem[] = [{ id: 1, marca: 'Marca 1' } as ConfiguracionItem];
    component.manejarFilaSeleccionada(fila);
    expect(component.listaFilaSeleccionadaMercancia).toEqual(fila);
    expect(component.enableModficarBoton).toBe(true);
    expect(component.enableEliminarBoton).toBe(true);
  });

  it('should update the selected row', () => {
    component.datosTablaMercancia = [{ id: 1, marca: 'Marca 1' } as ConfiguracionItem];
    component.filaSeleccionadaMercancia = { id: 1 } as ConfiguracionItem;
    component.actualizarFilaSeleccionada();
    expect(component.filaSeleccionadaMercancia.marca).toBe('Marca 1');
  });

  it('should modify an item in the table', () => {
    component.listaFilaSeleccionadaMercancia = [{ id: 1, marca: 'Marca 1' } as ConfiguracionItem];
    component.datosTablaMercancia = [{ id: 1, marca: 'Marca 1' } as ConfiguracionItem];
    component.modificarItemMercancia();
    expect(component.esOperacionDeActualizacion).toBe(true);
    expect(component.mostrarModalDatosMercancia).toBe(true);
  });

  it('should confirm deletion of selected items', () => {
    component.listaFilaSeleccionadaMercancia = [{ id: 1 } as ConfiguracionItem];
    component.confirmEliminarMercanciaItem();
    expect(component.confirmEliminarPopupAbierto).toBe(true);
  });

  it('should delete selected items from the table', () => {
    component.listaFilaSeleccionadaMercancia = [{ id: 1 } as ConfiguracionItem];
    component.datosTablaMercancia = [{ id: 1 }, { id: 2 }] as ConfiguracionItem[];
    component.eliminarMercanciaItem();
    expect(component.datosTablaMercancia).toEqual([{ id: 2 }]);
    expect(tramite300105StoreMock.setMercanciaTablaDatos).toHaveBeenCalledWith([{ id: 2 }]);
  });

  it('should open and close the modal for mercancía', () => {
    component.alternarModalMercancia();
    expect(component.mostrarModalDatosMercancia).toBe(true);
    component.alternarModalMercancia();
    expect(component.mostrarModalDatosMercancia).toBe(false);
  });

  it('should validate if a control is invalid', () => {
    component.crearNuevoFormularioMercancia();
    const controlName = 'marca';
    component.formularioMercancia.get(controlName)?.markAsTouched();
    expect(component.esControlInvalido(controlName)).toBe(true);
  });

  it('should submit the mercancía form and add a new row', () => {
    component.crearNuevoFormularioMercancia();
    component.formularioMercancia.patchValue({
      marca: 'Marca 1',
      modelo: 'Modelo 1',
      serie: 'Serie 1',
      voltaje: 'Voltaje 1',
      unidadMedidaVoltaje: '1',
      corriente: 'Corriente 1',
      unidadMedidaCorriente: '1',
      numEquipos: '10',
      fraccionArancelaria: '1',
      fraccionDescripcion: 'Fracción 1',
    });
    component.enviarFormularioMercancia();
    expect(component.datosTablaMercancia.length).toBe(1);
    expect(tramite300105StoreMock.setMercanciaTablaDatos).toHaveBeenCalled();
  });

  it('should clean up on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['notificadorDestruccion$'], 'next');
    const completeSpy = jest.spyOn(component['notificadorDestruccion$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});