import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MercanciasDestruidasFormaComponent } from './mercancias-destruidas-forma.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CatalogosService } from '../../servicios/catalogo.service';
import { TramiteStoreQuery } from '../../estados/tramite32516Query.query';
import { TramiteStore } from '../../estados/tramite32516Store.store';
import { SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';

describe('MercanciasDestruidasFormaComponent', () => {
  let component: MercanciasDestruidasFormaComponent;
  let fixture: ComponentFixture<MercanciasDestruidasFormaComponent>;
  let mockCatalogosService: any;
  let mockTramiteStoreQuery: any;
  let mockTramiteStore: any;
  let mockSeccionQuery: any;
  let mockConsultaioQuery: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockCatalogosService = {
      obtenerUnidadDesplegable: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Unidad' }])),
    };
    mockTramiteStoreQuery = {
      selectSolicitudTramite$: of({ MercanciaState: {} }),
    };
    mockTramiteStore = {
      setMercanciaTramite: jest.fn(),
    };
    mockSeccionQuery = {
      selectSeccionState$: of({}),
    };
    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false }),
    };
    mockRouter = {
      url: '/agace/acta-de-hechos',
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [MercanciasDestruidasFormaComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: CatalogosService, useValue: mockCatalogosService },
        { provide: TramiteStoreQuery, useValue: mockTramiteStoreQuery },
        { provide: TramiteStore, useValue: mockTramiteStore },
        { provide: SeccionLibQuery, useValue: mockSeccionQuery },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MercanciasDestruidasFormaComponent);
    component = fixture.componentInstance;
    // Patch destroyNotifier$ for ngOnDestroy
    (component as any).destroyNotifier$ = new Subject<void>();
    fixture.detectChanges();
  });

  afterEach(() => {
    (component as any).destroyNotifier$.complete();
    fixture.destroy();
  });

  describe('#guardarDatosFormulario', () => {
    it('should disable form if esFormularioSoloLectura is true', () => {
      component.mercanciaForm = new FormBuilder().group({
        consecutivo: [''],
        descripcion: [''],
        cantidad: [''],
        unidadMedida: [''],
        peso: [''],
      });
      component.esFormularioSoloLectura = true;
      component.guardarDatosFormulario();
      expect(component.mercanciaForm.disabled).toBe(true);
    });

    it('should enable form if esFormularioSoloLectura is false', () => {
      component.mercanciaForm = new FormBuilder().group({
        consecutivo: [''],
        descripcion: [''],
        cantidad: [''],
        unidadMedida: [''],
        peso: [''],
      });
      component.esFormularioSoloLectura = false;
      component.guardarDatosFormulario();
      expect(component.mercanciaForm.enabled).toBe(true);
    });
  });
});