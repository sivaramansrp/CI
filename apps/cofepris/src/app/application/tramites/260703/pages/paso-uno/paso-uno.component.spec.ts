import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { SolicitudPermisoService } from '../../services/solicitud-permiso.service';
import { of, Subject } from 'rxjs';
import { Tramite260703Store } from '../../estados/store/tramite260703.store';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';
import { DatosSolitudeComponent } from '../../components/datos-solicitud/datos-solicitude.component';
import { TramiteAsociadosComponent } from '../../../../shared/components/tramite-asociados/tramite-asociados.component';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos-new/pago-de-derechos.component';
import { TercerosRelacionadosComponent } from '../../components/terceros-relacionados/terceros-relacionados.component';

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
  let solicitudPermisoServiceMock: any;
  let tramite260703StoreMock: any;
  let tramite260703QueryMock: any;

  beforeEach(async () => {
    // Mock services
    solicitudPermisoServiceMock = {
      obtenerTramitesAsociados: jest.fn().mockReturnValue(of([])),
      inicializaPagoDeDerechosDatosCatalogos: jest.fn(),
      banco: [{ id: 1, descripcion: 'Banco 1' }],
    };

    tramite260703StoreMock = {
      setClaveDeReferencia: jest.fn(),
      setCadenaPagoDependencia: jest.fn(),
      setBancoseleccionado: jest.fn(),
      setLlaveDePago: jest.fn(),
      setFecPago: jest.fn(),
      setImpPago: jest.fn(),
    };

    tramite260703QueryMock = {
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
      declarations: [PasoUnoComponent, MockSolicitanteComponent, DatosSolitudeComponent, TercerosRelacionadosComponent],
      imports: [ReactiveFormsModule,  TramiteAsociadosComponent, PagoDeDerechosComponent],
      providers: [
        FormBuilder,
        { provide: SolicitudPermisoService, useValue: solicitudPermisoServiceMock },
        { provide: Tramite260703Store, useValue: tramite260703StoreMock },
        { provide: Tramite260703Query, useValue: tramite260703QueryMock },
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
    solicitudPermisoServiceMock.obtenerTramitesAsociados.mockReturnValue(of(tramiteAsociadosMock));

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