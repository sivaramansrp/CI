import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { of, Subject } from 'rxjs';
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261101.query'
import { DatosProcedureStore } from '../../../../estados/tramites/tramites261101.store';
import { DatosSolicitudService } from '../../../261101/services/dato-solicitude.service';
import { TramiteAsociadosComponent } from '../../../../shared/components/tramite-asociados/tramite-asociados.component';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos-new/pago-de-derechos.component';
import { DatosSolicitudComponent } from '../../components/DatosSolicitud.component';
import { TercerosRelacionadosFabricanteComponent } from '../../components/Terceros-relacionados-fabricante/terceros-relacionados-fabricante.component';

/**
 * Mock component for 'solicitante' to avoid dependency errors
 */
@Component({
  selector: 'solicitante',
  template: '<div></div>',
})
class MockSolicitanteComponent {}

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let DatosSolicitudServiceMock: any;
  let DatosProcedureStoreMock: any;
  let DatosProcedureQueryMock: any;

  beforeEach(async () => {
    // Mock services
    DatosSolicitudServiceMock = {
      obtenerTramitesAsociados: jest.fn().mockReturnValue(of([])),
      inicializaPagoDeDerechosDatosCatalogos: jest.fn(),
      banco: [{ id: 1, descripcion: 'Banco 1' }],
    };

    DatosProcedureStoreMock = {
      setClaveDeReferencia: jest.fn(),
      setCadenaPagoDependencia: jest.fn(),
      setBancoseleccionado: jest.fn(),
      setLlaveDePago: jest.fn(),
      setFecPago: jest.fn(),
      setImpPago: jest.fn(),
    };

    DatosProcedureQueryMock = {
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
      declarations: [PasoUnoComponent,, DatosSolicitudComponent, TercerosRelacionadosFabricanteComponent],
      imports: [ReactiveFormsModule,  TramiteAsociadosComponent, PagoDeDerechosComponent],
      providers: [
        FormBuilder,
        { provide: DatosSolicitudService, useValue: DatosSolicitudServiceMock },
        { provide: DatosProcedureStore, useValue: DatosProcedureStoreMock },
        { provide: DatosProcedureQuery, useValue: DatosProcedureQueryMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tramiteAsociados on ngOnInit', () => {
    const tramiteAsociadosMock = [
      { id: 1, folioTramite: '12345', tipoTramite: 'Tipo A', estatus: 'Activo', fetchaAltaDeRegistro: '2025-04-10' },
    ];
    DatosSolicitudServiceMock.obtenerTramitesAsociados.mockReturnValue(of(tramiteAsociadosMock));

    component.ngOnInit();
    expect(component.tramiteAsociados).toEqual(tramiteAsociadosMock);
  });

  it('should initialize form on crearformularioPagoDerechos', () => {
    component.crearformularioPagoDerechos();
    expect(component.formularioPagoDerechos).toBeDefined();
    expect(component.formularioPagoDerechos.get('claveDeReferencia')?.value).toBe('12345');
    expect(component.formularioPagoDerechos.get('cadenaPagoDependencia')?.value).toBe('DEPENDENCIA');
    expect(component.formularioPagoDerechos.get('banco')?.value).toBe(1);
    expect(component.formularioPagoDerechos.get('llaveDePago')?.value).toBe('LLAVE123');
    expect(component.formularioPagoDerechos.get('fecPago')?.value).toBe('2025-04-10');
    expect(component.formularioPagoDerechos.get('impPago')?.value).toBe(1000);
  });

  it('should select a tab and initialize banco on seleccionaTab', () => {
    component.seleccionaTab(4);
    expect(component.indice).toBe(4);
    expect(component.banco).toEqual([{ id: 1, descripcion: 'Banco 1' }]);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['notificadorDestruccion$'], 'next');
    const completeSpy = jest.spyOn(component['notificadorDestruccion$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

});