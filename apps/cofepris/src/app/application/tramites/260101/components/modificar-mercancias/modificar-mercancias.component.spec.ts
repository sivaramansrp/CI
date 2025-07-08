import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ModificarMercanciasComponent } from './modificar-mercancias.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { InputFechaComponent } from '@libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { ConsultaioQuery, CrosslistComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { Solicitud260101Store } from '../../estados/tramites260101.store';

// Mocks
const mockSolicitudDatosService = {
  obtenerClavesDeLotesListo: jest.fn(() => of([{ lotes: 'L1', fabricacion: '2023-01-01', caducidad: '2024-01-01' }])),
  obtenerMercanciaListo: jest.fn(() => of([{ descripcionFraccionArancelaria: 'desc', umt: 'UMT1' }])),
  obtenerCrosslisto: jest.fn(() => of({
    paisOrigenCrossList: { items: [] },
    paisProcedencisCrossList: { items: [] },
    usoEspecificoCrossList: { items: [] }
  })),
  obtenerMercanciaCatalogos: jest.fn(() => of({
    productosCatalogo: {},
    especificarCatalogo: {},
    tipoProductoCatalogo: {},
    umcCatalogo: {}
  }))
};

const mockSolicitud260101Store = {
  setClavesDeLotes: jest.fn(),
  setDescripcionFraccionArancelaria: jest.fn(),
  setUmt: jest.fn(),
  setCadenaDeDependencia: jest.fn(),
  setEspecificarProducto: jest.fn(),
  setTipoProducto: jest.fn(),
  setFechaFabricacion: jest.fn(),
  setFechaCaducidad: jest.fn(),
  setNombreProductoEspecifico: jest.fn(),
  setMarca: jest.fn(),
  setFraccionArancelaria: jest.fn(),
  setCantidadUMT: jest.fn(),
  setCantidadUMC: jest.fn(),
  setUmc: jest.fn(),
  setClaveDeLosLotes: jest.fn(),
  addMercanciasDatos: jest.fn(),
  addClaveDeLote: jest.fn(),
  removeClaveDeLote: jest.fn()
};

const mockSolicitud260101Query = {
  seleccionarSolicitud$: of({
    clasificaionProductos: 'A',
    especificarProducto: 'B',
    nombreProductoEspecifico: 'C',
    marca: 'D',
    tipoProducto: 'E',
    fraccionArancelaria: 'F',
    descripcionFraccionArancelaria: 'G',
    cantidadUMT: 1,
    umt: 'UMT',
    cantidadUMC: 2,
    umc: 'UMC',
    claveDeLosLotes: 'L1',
    fechaFabricacion: '2023-01-01',
    fechaCaducidad: '2024-01-01',
    clavesDeLotes: [{ lotes: 'L1', fabricacion: '2023-01-01', caducidad: '2024-01-01' }]
  })
};

const mockConsultaioQuery = {
  selectConsultaioState$: of({ readonly: false })
};

describe('ModificarMercanciasComponent', () => {
  let component: ModificarMercanciasComponent;
  let fixture: ComponentFixture<ModificarMercanciasComponent>;

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule,
        ModificarMercanciasComponent,
              CommonModule,
              ReactiveFormsModule,
              FormsModule,
              CrosslistComponent,
              TablaDinamicaComponent,
              InputFechaComponent,
              CatalogoSelectComponent,
              TituloComponent,
              HttpClientTestingModule
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: SolicitudDatosService, useValue: mockSolicitudDatosService },
        { provide: Solicitud260101Store, useValue: mockSolicitud260101Store },
        { provide: Solicitud260101Query, useValue: mockSolicitud260101Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ]
    })
      .overrideComponent(ModificarMercanciasComponent, {
        set: {
          providers: [
            { provide: FormBuilder, useValue: new FormBuilder() },
            { provide: 'SolicitudDatosService', useValue: mockSolicitudDatosService },
            { provide: 'Solicitud260101Store', useValue: mockSolicitud260101Store },
            { provide: 'Solicitud260101Query', useValue: mockSolicitud260101Query },
            { provide: 'ConsultaioQuery', useValue: mockConsultaioQuery }
          ]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(ModificarMercanciasComponent);
    component = fixture.componentInstance;
    // Patch DI tokens
    (component as any).solicitudDatosService = mockSolicitudDatosService;
    (component as any).solicitud260101Store = mockSolicitud260101Store;
    (component as any).solicitud260101Query = mockSolicitud260101Query;
    (component as any).consultaioQuery = mockConsultaioQuery;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle paisOrigen', () => {
    expect(component.paisOrigen).toBe(false);
    component.paisOrigenColapsable();
    expect(component.paisOrigen).toBe(true);
  });

  it('should toggle paisProcedencisColapsable', () => {
    expect(component.paisProcedencisColapsable).toBe(false);
    component.paisProcedencis_colapsable();
    expect(component.paisProcedencisColapsable).toBe(true);
  });

  it('should toggle usoEspecifico', () => {
    expect(component.usoEspecifico).toBe(false);
    component.usoEspecificoColapsable();
    expect(component.usoEspecifico).toBe(true);
  });

  it('should call setCadenaDeDependencia on seleccionaProductos', () => {
    const catalogo = { descripcion: 'desc' } as any;
    component.seleccionaProductos(catalogo);
    expect(mockSolicitud260101Store.setCadenaDeDependencia).toHaveBeenCalledWith('desc');
  });

  it('should call setEspecificarProducto on seleccionaEspecificar', () => {
    const catalogo = { id: 1 } as any;
    component.seleccionaEspecificar(catalogo);
    expect(mockSolicitud260101Store.setEspecificarProducto).toHaveBeenCalledWith(1);
  });

  it('should call setTipoProducto on seleccionaTipoProducto', () => {
    const catalogo = { id: 2 } as any;
    component.seleccionaTipoProducto(catalogo);
    expect(mockSolicitud260101Store.setTipoProducto).toHaveBeenCalledWith(2);
  });

  it('should call setFechaFabricacion on seleccionarFechaFabricacion', () => {
    component.seleccionarFechaFabricacion('2023-01-01');
    expect(mockSolicitud260101Store.setFechaFabricacion).toHaveBeenCalledWith('2023-01-01');
  });

  it('should call setFechaCaducidad on seleccionarFechaCaducidad', () => {
    component.seleccionarFechaCaducidad('2024-01-01');
    expect(mockSolicitud260101Store.setFechaCaducidad).toHaveBeenCalledWith('2024-01-01');
  });

  it('should call setNombreProductoEspecifico on setNombreProductoEspecifico', () => {
    const event = { target: { value: 'nombre' } } as any;
    component.setNombreProductoEspecifico(event);
    expect(mockSolicitud260101Store.setNombreProductoEspecifico).toHaveBeenCalledWith('nombre');
  });

  it('should call setMarca on setMarca', () => {
    const event = { target: { value: 'marca' } } as any;
    component.setMarca(event);
    expect(mockSolicitud260101Store.setMarca).toHaveBeenCalledWith('marca');
  });

  it('should call setFraccionArancelaria on setFraccionArancelaria', () => {
    const event = { target: { value: 'fraccion' } } as any;
    component.setFraccionArancelaria(event);
    expect(mockSolicitud260101Store.setFraccionArancelaria).toHaveBeenCalledWith('fraccion');
  });

  it('should call setCantidadUMT on setCantidadUMT', () => {
    const event = { target: { value: '10' } } as any;
    component.setCantidadUMT(event);
    expect(mockSolicitud260101Store.setCantidadUMT).toHaveBeenCalledWith('10');
  });

  it('should call setCantidadUMC on setCantidadUMC', () => {
    const event = { target: { value: '20' } } as any;
    component.setCantidadUMC(event);
    expect(mockSolicitud260101Store.setCantidadUMC).toHaveBeenCalledWith('20');
  });

  it('should call setUmc on setUMC', () => {
    const catalogo = { id: 3 } as any;
    component.setUMC(catalogo);
    expect(mockSolicitud260101Store.setUmc).toHaveBeenCalledWith(3);
  });

  it('should call setClaveDeLosLotes on setClaveDeDeLosLotes', () => {
    const event = { target: { value: 'clave' } } as any;
    component.setClaveDeDeLosLotes(event);
    expect(mockSolicitud260101Store.setClaveDeLosLotes).toHaveBeenCalledWith('clave');
  });

  it('should add mercancias on agregarMercanias', () => {
    component.datosMercanciaForm = new FormBuilder().group({
      clasificaionProductos: ['A'],
      especificarProducto: ['B'],
      nombreProductoEspecifico: ['C'],
      marca: ['D'],
      tipoProducto: ['E'],
      fraccionArancelaria: ['F'],
      descripcionFraccionArancelaria: ['G'],
      cantidadUMT: [1],
      umt: ['UMT'],
      cantidadUMC: [2],
      umc: ['UMC'],
      claveDeLosLotes: ['L1'],
      fechaFabricacion: ['2023-01-01'],
      fechaCaducidad: ['2024-01-01']
    });
    component.agregarMercanias();
    expect(mockSolicitud260101Store.addMercanciasDatos).toHaveBeenCalled();
  });

  it('should add clave de lote on agregarClavesDeLotes if not empty', () => {
    component.datosMercanciaForm = new FormBuilder().group({
      claveDeLosLotes: ['L1'],
      fechaFabricacion: ['2023-01-01'],
      fechaCaducidad: ['2024-01-01']
    });
    component.agregarClavesDeLotes();
    expect(mockSolicitud260101Store.addClaveDeLote).toHaveBeenCalled();
  });

  it('should not add clave de lote on agregarClavesDeLotes if empty', () => {
    component.datosMercanciaForm = new FormBuilder().group({
      claveDeLosLotes: [''],
      fechaFabricacion: [''],
      fechaCaducidad: ['']
    });
    component.agregarClavesDeLotes();
    expect(mockSolicitud260101Store.addClaveDeLote).not.toHaveBeenCalled();
  });

  it('should update selectedClavesDeLotes on getListaClavesDeLotes', () => {
    const lotes = [{ lotes: 'L1', fabricacion: '2023-01-01', caducidad: '2024-01-01' }];
    component.getListaClavesDeLotes(lotes);
    expect(component.selectedClavesDeLotes).toEqual(lotes);
  });

  it('should patch form on modificarClavesDeLotes if selected', () => {
    component.datosMercanciaForm = new FormBuilder().group({
      claveDeLosLotes: [''],
      fechaFabricacion: [''],
      fechaCaducidad: ['']
    });
    component.selectedClavesDeLotes = [{ lotes: 'L2', fabricacion: '2022-01-01', caducidad: '2023-01-01' }];
    component.modificarClavesDeLotes();
    expect(component.datosMercanciaForm.value.claveDeLosLotes).toBe('L2');
    expect(component.datosMercanciaForm.value.fechaFabricacion).toBe('2022-01-01');
    expect(component.datosMercanciaForm.value.fechaCaducidad).toBe('2023-01-01');
  });

  it('should call removeClaveDeLote on eliminarClavesDeLotes if selected', () => {
    component.selectedClavesDeLotes = [{ lotes: 'L1', fabricacion: '2023-01-01', caducidad: '2024-01-01' }];
    component.eliminarClavesDeLotes();
    expect(mockSolicitud260101Store.removeClaveDeLote).toHaveBeenCalledWith(component.selectedClavesDeLotes[0]);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const spy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const spy2 = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});