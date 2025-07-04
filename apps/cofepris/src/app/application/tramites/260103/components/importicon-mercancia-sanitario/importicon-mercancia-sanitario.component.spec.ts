// @ts-nocheck
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ImporticonMercanciaSanitarioComponent } from './importicon-mercancia-sanitario.component';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Tramite260103Query } from '../../estados/tramite260103Query.query';
import { Tramite260103Store } from '../../estados/tramite260103Store.store';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('ImporticonMercanciaSanitarioComponent', () => {
  let component: ImporticonMercanciaSanitarioComponent;

  const mockQuery = {
    selectTramiteState$: of({ mercanciaForm: {} }),
  };

  const mockStore = {
    update: jest.fn(),
  };

  const mockDatosSolicitudService = {
    obtenerRespuestaPorUrl: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ImporticonMercanciaSanitarioComponent, HttpClientModule],
      providers: [
        { provide: DatosSolicitudService, useValue: mockDatosSolicitudService },
        { provide: Tramite260103Query, useValue: mockQuery },
        { provide: Tramite260103Store, useValue: mockStore },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(ImporticonMercanciaSanitarioComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should run ngOnInit()', () => {
    component.ngOnInit();
    expect(mockQuery.selectTramiteState$).toBeTruthy();
  });

  it('should call mercanciaSeleccionado() and update tramite state', () => {
    component.tramiteState = {
      tablaMercanciasConfigDatos: [
        { clasificacionProducto: 'old' },
        { clasificacionProducto: 'match' },
      ],
    };

    const mercanciaMock = {
      clasificacionProducto: 'match',
      especificarClasificacionProducto: 'value',
      denominacionEspecificaProducto: 'value',
      denominacionCumonInternacional: 'value',
      marcaComercialDenominacion: 'value',
      cantidadDeLotes: 'value',
      numeroDePiezasAFabricar: 'value',
      descripcionNumeroDePiezas: 'value',
      formaFarmaceutica: 'value',
      estadoFisico: 'value',
      fraccionArancelaria: 'value',
      descripcionFraccion: 'value',
      cantidadUmcValor: 'value',
      cantidadUMC: 'value',
      cantidadUmtValor: 'value',
      cantidadUMT: 'value',
      presentacion: 'value',
      numeroRegistroSanitario: 'value',
      paisOrigen: 'value',
      paisProcedencia: 'value',
      tipoProducto: 'value',
      usoEspecifico: 'value',
      numeroCAS: 'value',
      paisDeDestino: 'value',
      marca: 'value',
    };

    component.tramite260103Store = mockStore;
    component.mercanciaSeleccionado(mercanciaMock);
    expect(mockStore.update).toHaveBeenCalled();
  });

  it('should clean up on ngOnDestroy()', () => {
    component.destroyNotifier$ = {
      next: jest.fn(),
      complete: jest.fn(),
    };
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });
});
