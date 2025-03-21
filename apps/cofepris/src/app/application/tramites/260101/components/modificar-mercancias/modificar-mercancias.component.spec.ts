import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarMercanciasComponent } from './modificar-mercancias.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260101Store } from '../../estados/tramites260101.store';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ModificarMercanciasComponent', () => {
  let component: ModificarMercanciasComponent;
  let fixture: ComponentFixture<ModificarMercanciasComponent>;
  let solicitudDatosService: jest.Mocked<SolicitudDatosService>;
  let solicitud260101Store: jest.Mocked<Solicitud260101Store>;
  let solicitud260101Query: jest.Mocked<Solicitud260101Query>;

  beforeEach(async () => {
    const solicitudDatosServiceMock = {
      obtenerClavesDeLotesListo: jest.fn(),
      obtenerMercanciaListo: jest.fn(),
      obtenerCrosslisto: jest.fn(),
      obtenerMercanciaCatalogos: jest.fn(),
    };

    const solicitud260101StoreMock = {
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
      removeClaveDeLote: jest.fn(),
    };

    const solicitud260101QueryMock = {
      seleccionarSolicitud$: jest.fn().mockReturnValue(of({})),
    };

    await TestBed.configureTestingModule({
      declarations: [ModificarMercanciasComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: SolicitudDatosService, useValue: solicitudDatosServiceMock },
        { provide: Solicitud260101Store, useValue: solicitud260101StoreMock },
        { provide: Solicitud260101Query, useValue: solicitud260101QueryMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarMercanciasComponent);
    component = fixture.componentInstance;

    solicitudDatosService = TestBed.inject(
      SolicitudDatosService
    ) as jest.Mocked<SolicitudDatosService>;
    solicitud260101Store = TestBed.inject(
      Solicitud260101Store
    ) as jest.Mocked<Solicitud260101Store>;
    solicitud260101Query = TestBed.inject(
      Solicitud260101Query
    ) as jest.Mocked<Solicitud260101Query>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.datosMercanciaForm).toBeDefined();
  });

  it('should toggle paisOrigenColapsable', () => {
    component.usoEspecificoColapsable();
    expect(component.paisOrigenColapsable).toBe(true);
    component.usoEspecificoColapsable();
    expect(component.paisOrigenColapsable).toBe(false);
  });

  it('should toggle paisProcedencisColapsable', () => {
    component.paisProcedencis_colapsable();
    expect(component.paisProcedencisColapsable).toBe(true);
    component.paisProcedencis_colapsable();
    expect(component.paisProcedencisColapsable).toBe(false);
  });

  it('should toggle usoEspecificoColapsable', () => {
    component.usoEspecificoColapsable();
    expect(component.usoEspecificoColapsable).toBe(true);
    component.usoEspecificoColapsable();
    expect(component.usoEspecificoColapsable).toBe(false);
  });

  it('should call setCadenaDeDependencia on seleccionaProductos', () => {
    const catalogo = { descripcion: 'test', id: 1 };
    component.seleccionaProductos(catalogo);
    expect(solicitud260101Store.setCadenaDeDependencia).toHaveBeenCalledWith(
      'test'
    );
  });

  it('should call setFechaFabricacion on seleccionarFechaFabricacion', () => {
    component.seleccionarFechaFabricacion('2023-01-01');
    expect(solicitud260101Store.setFechaFabricacion).toHaveBeenCalledWith(
      '2023-01-01'
    );
  });

  it('should call setFechaCaducidad on seleccionarFechaCaducidad', () => {
    component.seleccionarFechaCaducidad('2023-01-01');
    expect(solicitud260101Store.setFechaCaducidad).toHaveBeenCalledWith(
      '2023-01-01'
    );
  });

  it('should call addMercanciasDatos on agregarMercanias', () => {
    component.datosMercanciaForm = component.fb.group({
      clasificaionProductos: ['test'],
      especificarProducto: ['test'],
      nombreProductoEspecifico: ['test'],
      marca: ['test'],
      tipoProducto: ['test'],
      fraccionArancelaria: ['test'],
      descripcionFraccionArancelaria: ['test'],
      cantidadUMT: ['test'],
      umt: ['test'],
      cantidadUMC: ['test'],
      umc: ['test'],
      claveDeLosLotes: ['test'],
      fechaFabricacion: ['test'],
      fechaCaducidad: ['test'],
    });
    component.agregarMercanias();
    expect(solicitud260101Store.addMercanciasDatos).toHaveBeenCalled();
  });

  it('should call addClaveDeLote on agregarClavesDeLotes', () => {
    component.datosMercanciaForm = component.fb.group({
      claveDeLosLotes: ['test'],
      fechaFabricacion: ['test'],
      fechaCaducidad: ['test'],
    });
    component.agregarClavesDeLotes();
    expect(solicitud260101Store.addClaveDeLote).toHaveBeenCalled();
  });

  it('should not call addClaveDeLote on agregarClavesDeLotes if form is invalid', () => {
    component.datosMercanciaForm = component.fb.group({
      claveDeLosLotes: [''],
      fechaFabricacion: [''],
      fechaCaducidad: [''],
    });
    component.agregarClavesDeLotes();
    expect(solicitud260101Store.addClaveDeLote).not.toHaveBeenCalled();
  });

  it('should call removeClaveDeLote on eliminarClavesDeLotes', () => {
    const clavesDeLotes = [
      {
        lotes: 'test',
        fabricacion: 'test',
        caducidad: 'test',
      },
    ];
    component.selectedClavesDeLotes = clavesDeLotes;
    component.eliminarClavesDeLotes();
    expect(solicitud260101Store.removeClaveDeLote).toHaveBeenCalledWith(
      clavesDeLotes[0]
    );
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(
      component['destroyNotifier$'],
      'next'
    );
    const destroyNotifierCompleteSpy = jest.spyOn(
      component['destroyNotifier$'],
      'complete'
    );
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});
