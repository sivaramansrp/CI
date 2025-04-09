import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarMercanciasComponent } from './mercancias-datos.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260910Store } from '../../estados/tramites260910.store';
import { Solicitud260910Query } from '../../estados/tramites260910.query';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('ModificarMercanciasComponent', () => {
  let component: ModificarMercanciasComponent;
  let fixture: ComponentFixture<ModificarMercanciasComponent>;
  let solicitudDatosService: jest.Mocked<SolicitudDatosService>;
  let solicitud260910Store: jest.Mocked<Solicitud260910Store>;
  let solicitud260910Query: jest.Mocked<Solicitud260910Query>;

  beforeEach(async () => {
    const solicitudDatosServiceMock = {
      obtenerClavesDeLotesListo: jest.fn(),
      obtenerMercanciaListo: jest.fn(),
      obtenerCrosslisto: jest.fn(),
      obtenerMercanciaCatalogos: jest.fn(),
    };

    const solicitud260910StoreMock = {
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

    const solicitud260910QueryMock = {
      seleccionarSolicitud$: jest.fn().mockReturnValue(of({})),
    };

    await TestBed.configureTestingModule({
      declarations: [ModificarMercanciasComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder, SolicitudDatosService, Solicitud260910Store, Solicitud260910Query, provideHttpClient()
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarMercanciasComponent);
    component = fixture.componentInstance;

    solicitudDatosService = TestBed.inject(
      SolicitudDatosService
    ) as jest.Mocked<SolicitudDatosService>;
    solicitud260910Store = TestBed.inject(
      Solicitud260910Store
    ) as jest.Mocked<Solicitud260910Store>;
    solicitud260910Query = TestBed.inject(
      Solicitud260910Query
    ) as jest.Mocked<Solicitud260910Query>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.datosMercanciaForm).toBeDefined();
  });

  it('should toggle paisProcedencisColapsable', () => {
    component.paisProcedencis_colapsable();
    expect(component.paisProcedencisColapsable).toBe(true);
    component.paisProcedencis_colapsable();
    expect(component.paisProcedencisColapsable).toBe(false);
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
