import { TestBed } from '@angular/core/testing';
import { ModificarMercanciasComponent } from './modificar-mercancias.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { Solicitud260101Store } from '../../estados/tramites260101.store';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { CatalogoSelectComponent, ConsultaioQuery, CrosslistComponent, InputFechaComponent, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';
import { ClavesDeLotes } from '../../models/claves-de-lotes.model';
import {
  MercanciaCatalogos,
  MercanciaCrossList,
  Mercancia,
} from '../../models/mercancia.model';
import { CommonModule } from '@angular/common';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ModificarMercanciasComponent', () => {
  let component: ModificarMercanciasComponent;
  let fixture: any;

  let mockStore: jest.Mocked<Solicitud260101Store>;
  let mockQuery: jest.Mocked<Solicitud260101Query>;
  let mockDatosService: jest.Mocked<SolicitudDatosService>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;

  beforeEach(async () => {
    mockStore = {
      setClavesDeLotes: jest.fn(() => of()),
      setDescripcionFraccionArancelaria: jest.fn(() => of()),
      setUmt: jest.fn(() => of()),
      setCadenaDeDependencia: jest.fn(() => of()),
      setEspecificarProducto: jest.fn(() => of()),
      setTipoProducto: jest.fn(() => of()),
      setFechaFabricacion: jest.fn(() => of()),
      setFechaCaducidad: jest.fn(() => of()),
      setNombreProductoEspecifico: jest.fn(() => of()),
      setMarca: jest.fn(() => of()),
      setFraccionArancelaria: jest.fn(() => of()),
      setCantidadUMT: jest.fn(() => of()),
      setCantidadUMC: jest.fn(() => of()),
      setUmc: jest.fn(() => of()),
      setClaveDeLosLotes: jest.fn(() => of()),
      addMercanciasDatos: jest.fn(() => of()),
      addClaveDeLote: jest.fn(() => of()),
      removeClaveDeLote: jest.fn(() => of()),
    } as any;

    mockQuery = {
      seleccionarSolicitud$: of({ clavesDeLotes: [] }),
    } as any;

    mockDatosService = {
      obtenerClavesDeLotesListo: jest.fn().mockReturnValue(of([])),
      obtenerMercanciaListo: jest
        .fn()
        .mockReturnValue(
          of([
            { descripcionFraccionArancelaria: 'desc', umt: 'umt' } as Mercancia,
          ])
        ),
      obtenerCrosslisto: jest.fn().mockReturnValue(
        of({
          paisOrigenCrossList: {},
          paisProcedencisCrossList: {},
          usoEspecificoCrossList: {},
        } as MercanciaCrossList)
      ),
      obtenerMercanciaCatalogos: jest.fn().mockReturnValue(
        of({
          productosCatalogo: {},
          especificarCatalogo: {},
          tipoProductoCatalogo: {},
          umcCatalogo: {},
        } as MercanciaCatalogos)
      ),
    } as any;

    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false }),
    } as any;

    await TestBed.configureTestingModule({
      imports: [
        ModificarMercanciasComponent,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        CrosslistComponent,
        TablaDinamicaComponent,
        InputFechaComponent,
        CatalogoSelectComponent,
        TituloComponent,
      ],
      providers: [
        provideHttpClientTesting(),
        FormBuilder,
        { provide: Solicitud260101Store, useValue: mockStore },
        { provide: Solicitud260101Query, useValue: mockQuery },
        { provide: SolicitudDatosService, useValue: mockDatosService },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarMercanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
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
    expect(mockStore.setCadenaDeDependencia).toHaveBeenCalledWith('desc');
  });

  it('should call setEspecificarProducto on seleccionaEspecificar', () => {
    const catalogo = { id: 1 } as any;
    component.seleccionaEspecificar(catalogo);
    expect(mockStore.setEspecificarProducto).toHaveBeenCalledWith(1);
  });

  it('should call setTipoProducto on seleccionaTipoProducto', () => {
    const catalogo = { id: 2 } as any;
    component.seleccionaTipoProducto(catalogo);
    expect(mockStore.setTipoProducto).toHaveBeenCalledWith(2);
  });

  it('should call setFechaFabricacion on seleccionarFechaFabricacion', () => {
    component.seleccionarFechaFabricacion('2024-01-01');
    expect(mockStore.setFechaFabricacion).toHaveBeenCalledWith('2024-01-01');
  });

  it('should call setFechaCaducidad on seleccionarFechaCaducidad', () => {
    component.seleccionarFechaCaducidad('2024-12-31');
    expect(mockStore.setFechaCaducidad).toHaveBeenCalledWith('2024-12-31');
  });

  it('should call setNombreProductoEspecifico on setNombreProductoEspecifico', () => {
    const event = { target: { value: 'nombre' } } as any;
    component.setNombreProductoEspecifico(event);
    expect(mockStore.setNombreProductoEspecifico).toHaveBeenCalledWith(
      'nombre'
    );
  });

  it('should call setMarca on setMarca', () => {
    const event = { target: { value: 'marca' } } as any;
    component.setMarca(event);
    expect(mockStore.setMarca).toHaveBeenCalledWith('marca');
  });

  it('should call setFraccionArancelaria on setFraccionArancelaria', () => {
    const event = { target: { value: 'fraccion' } } as any;
    component.setFraccionArancelaria(event);
    expect(mockStore.setFraccionArancelaria).toHaveBeenCalledWith('fraccion');
  });

  it('should call setCantidadUMT on setCantidadUMT', () => {
    const event = { target: { value: '10' } } as any;
    component.setCantidadUMT(event);
    expect(mockStore.setCantidadUMT).toHaveBeenCalledWith('10');
  });

  it('should call setCantidadUMC on setCantidadUMC', () => {
    const event = { target: { value: '20' } } as any;
    component.setCantidadUMC(event);
    expect(mockStore.setCantidadUMC).toHaveBeenCalledWith('20');
  });

  it('should call setUmc on setUMC', () => {
    const catalogo = { id: 3 } as any;
    component.setUMC(catalogo);
    expect(mockStore.setUmc).toHaveBeenCalledWith(3);
  });

  it('should call setClaveDeLosLotes on setClaveDeDeLosLotes', () => {
    const event = { target: { value: 'clave' } } as any;
    component.setClaveDeDeLosLotes(event);
    expect(mockStore.setClaveDeLosLotes).toHaveBeenCalledWith('clave');
  });

  it('should add mercancias on agregarMercanias', () => {
    component.datosMercanciaForm.patchValue({
      clasificaionProductos: 'c1',
      especificarProducto: 'e1',
      nombreProductoEspecifico: 'n1',
      marca: 'm1',
      tipoProducto: 't1',
      fraccionArancelaria: 'f1',
      descripcionFraccionArancelaria: 'desc',
      cantidadUMT: '10',
      umt: 'umt',
      cantidadUMC: '20',
      umc: 'umc',
    });
    component.agregarMercanias();
    expect(mockStore.addMercanciasDatos).toHaveBeenCalled();
  });

  it('should add claves de lotes on agregarClavesDeLotes if not empty', () => {
    component.datosMercanciaForm.patchValue({
      claveDeLosLotes: 'lote1',
      fechaFabricacion: '2024-01-01',
      fechaCaducidad: '2024-12-31',
    });
    component.agregarClavesDeLotes();
    expect(mockStore.addClaveDeLote).toHaveBeenCalledWith({
      lotes: 'lote1',
      fabricacion: '2024-01-01',
      caducidad: '2024-12-31',
    });
  });

  it('should not add claves de lotes if empty', () => {
    component.datosMercanciaForm.patchValue({
      claveDeLosLotes: '',
      fechaFabricacion: '',
      fechaCaducidad: '',
    });
    component.agregarClavesDeLotes();
    expect(mockStore.addClaveDeLote).not.toHaveBeenCalled();
  });

  it('should update selectedClavesDeLotes on getListaClavesDeLotes', () => {
    const lotes: ClavesDeLotes[] = [
      { lotes: 'l1', fabricacion: '', caducidad: '' },
    ];
    component.getListaClavesDeLotes(lotes);
    expect(component.selectedClavesDeLotes).toEqual(lotes);
  });

  it('should patch form values on modificarClavesDeLotes', () => {
    const lotes: ClavesDeLotes[] = [
      { lotes: 'l1', fabricacion: 'f1', caducidad: 'c1' },
    ];
    component.selectedClavesDeLotes = lotes;
    component.modificarClavesDeLotes();
    expect(component.datosMercanciaForm.get('claveDeLosLotes')?.value).toBe(
      'l1'
    );
    expect(component.datosMercanciaForm.get('fechaFabricacion')?.value).toBe(
      'f1'
    );
    expect(component.datosMercanciaForm.get('fechaCaducidad')?.value).toBe(
      'c1'
    );
  });

  it('should call removeClaveDeLote on eliminarClavesDeLotes', () => {
    const lotes: ClavesDeLotes[] = [
      { lotes: 'l1', fabricacion: 'f1', caducidad: 'c1' },
    ];
    component.selectedClavesDeLotes = lotes;
    component.eliminarClavesDeLotes();
    expect(mockStore.removeClaveDeLote).toHaveBeenCalledWith(lotes[0]);
  });

  it('should call guardarDatosFormulario if esFormularioSoloLectura is true in inicializarEstadoFormulario', () => {
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    expect(guardarSpy).toHaveBeenCalled();
  });

  it('should call inicializarFormulario if esFormularioSoloLectura is false in inicializarEstadoFormulario', () => {
    const initSpy = jest.spyOn(component, 'inicializarFormulario');
    component.esFormularioSoloLectura = false;
    component.inicializarEstadoFormulario();
    expect(initSpy).toHaveBeenCalled();
  });

  it('should disable form if esFormularioSoloLectura is true in guardarDatosFormulario', () => {
    component.inicializarFormulario = jest.fn(() => {
      component.datosMercanciaForm = new FormBuilder().group({
        test: ['']
      });
    }) as any;
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.datosMercanciaForm.disabled).toBe(true);
  });

  it('should enable form if esFormularioSoloLectura is false in guardarDatosFormulario', () => {
    component.inicializarFormulario = jest.fn(() => {
      component.datosMercanciaForm = new FormBuilder().group({
        test: ['']
      });
    }) as any;
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.datosMercanciaForm.enabled).toBe(true);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(
      (component as any).destroyNotifier$,
      'complete'
    );
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
