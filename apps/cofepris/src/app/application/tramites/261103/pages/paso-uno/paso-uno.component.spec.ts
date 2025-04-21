import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { of, Observable } from 'rxjs';
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261103.query'
import { DatosProcedureStore } from '../../../../estados/tramites/tramites261103.store';
import { TramiteAsociadosComponent } from '../../../../shared/components/tramite-asociados/tramite-asociados.component';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos-new/pago-de-derechos.component';
import { ModificacionPermisoImportacionMedicamentosComponent } from '../../components/modificacion-permiso-importacion-medicamentos/modificacion-permiso-importacion-medicamentos';
import { TercerosRelacionadosFabricanteComponent } from '../../components/terceros-relacionados-fabricante/terceros-relacionados-fabricante.component';
import { ModificacionPermisoImportacionMedicamentosService } from '../../services/modificacion-permiso-importacion-medicamentos.service';

@Component({
  selector: 'solicitante',
  template: '<div></div>',
})
class MockSolicitanteComponent {}
interface ModificacionPermisoImportacionMedicamentosServiceMockType {
  obtenerTramitesAsociados: jest.Mock<Observable<any>>;
  inicializaPagoDeDerechosDatosCatalogos: jest.Mock<void>;
  banco: { id: number; descripcion: string }[];
}

interface DatosProcedureStoreMockType {
  setClaveDeReferencia: jest.Mock<void>;
  setCadenaPagoDependencia: jest.Mock<void>;
  setBancoseleccionado: jest.Mock<void>;
  setLlaveDePago: jest.Mock<void>;
  setFecPago: jest.Mock<void>;
  setImpPago: jest.Mock<void>;
}

interface DatosProcedureQueryMockType {
  selectSolicitudPermiso$: Observable<{
    claveDeReferencia: string;
    cadenaPagoDependencia: string;
    bancoseleccionado: number;
    llaveDePago: string;
    fecPago: string;
    impPago: number;
  }>;
}

describe('PasoUnoComponent', () => {
  let componente: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let ModificacionPermisoImportacionMedicamentosServiceMock: ModificacionPermisoImportacionMedicamentosServiceMockType;
  let datosProcedureStoreMock: DatosProcedureStoreMockType;
  let datosProcedureQueryMock: DatosProcedureQueryMockType;

  beforeEach(async () => {
    ModificacionPermisoImportacionMedicamentosServiceMock = {
      obtenerTramitesAsociados: jest.fn().mockReturnValue(of([])),
      inicializaPagoDeDerechosDatosCatalogos: jest.fn(),
      banco: [{ id: 1, descripcion: 'Banco 1' }],
    };

    datosProcedureStoreMock = {
      setClaveDeReferencia: jest.fn(),
      setCadenaPagoDependencia: jest.fn(),
      setBancoseleccionado: jest.fn(),
      setLlaveDePago: jest.fn(),
      setFecPago: jest.fn(),
      setImpPago: jest.fn(),
    };

    datosProcedureQueryMock = {
      selectSolicitudPermiso$: of({
        claveDeReferencia: '12345',
        cadenaPagoDependencia: 'DEPENDENCIA',
        bancoseleccionado: 1,
        llaveDePago: 'LLAVE123',
        fecPago: '2025-04-10',
        impPago: 1000,
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent, ModificacionPermisoImportacionMedicamentosComponent, TercerosRelacionadosFabricanteComponent],
      imports: [ReactiveFormsModule, TramiteAsociadosComponent, PagoDeDerechosComponent],
      providers: [
        FormBuilder,
        { provide: ModificacionPermisoImportacionMedicamentosService, useValue: ModificacionPermisoImportacionMedicamentosServiceMock },
        { provide: DatosProcedureStore, useValue: datosProcedureStoreMock },
        { provide: DatosProcedureQuery, useValue: datosProcedureQueryMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar tramiteAsociados en ngOnInit', () => {
    const TRAMITE_ASOCIADOS_MOCK = [
        { id: 1, folioTramite: '12345', tipoTramite: 'Tipo A', estatus: 'Activo', fetchaAltaDeRegistro: '2025-04-10' },
    ];
    ModificacionPermisoImportacionMedicamentosServiceMock.obtenerTramitesAsociados.mockReturnValue(of(TRAMITE_ASOCIADOS_MOCK));

    componente.ngOnInit();
    expect(componente.tramiteAsociados).toEqual(TRAMITE_ASOCIADOS_MOCK);
  });

  it('debería inicializar el formulario en crearformularioPagoDerechos', () => {
    componente.crearformularioPagoDerechos();
    expect(componente.formularioPagoDerechos).toBeDefined();
    expect(componente.formularioPagoDerechos.get('claveDeReferencia')?.value).toBe('12345');
    expect(componente.formularioPagoDerechos.get('cadenaPagoDependencia')?.value).toBe('DEPENDENCIA');
    expect(componente.formularioPagoDerechos.get('banco')?.value).toBe(1);
    expect(componente.formularioPagoDerechos.get('llaveDePago')?.value).toBe('LLAVE123');
    expect(componente.formularioPagoDerechos.get('fecPago')?.value).toBe('2025-04-10');
    expect(componente.formularioPagoDerechos.get('impPago')?.value).toBe(1000);
  });

  it('debería seleccionar una pestaña e inicializar banco en seleccionaTab', () => {
    componente.seleccionaTab(4);
    expect(componente.indice).toBe(4);
    expect(componente.banco).toEqual([{ id: 1, descripcion: 'Banco 1' }]);
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const DESTROY_SPY = jest.spyOn(componente['notificadorDestruccion$'], 'next');
    const COMPLETE_SPY = jest.spyOn(componente['notificadorDestruccion$'], 'complete');

    componente.ngOnDestroy();

    expect(DESTROY_SPY).toHaveBeenCalled();
    expect(COMPLETE_SPY).toHaveBeenCalled();
  });

});