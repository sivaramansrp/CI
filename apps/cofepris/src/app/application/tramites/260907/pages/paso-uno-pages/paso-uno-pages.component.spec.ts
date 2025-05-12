import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoPagesComponent } from './paso-uno-pages.component';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { DatosDelSolicitudModificacionComponent } from '../../../../shared/components/datos-del-solicitud-modificacion/datos-del-solicitud-modificacion.component';
import { TercerosRelacionadosFabSeccionComponent } from '../../../../shared/components/terceros-relacionados-fab-seccion/terceros-relacionados-fab-seccion.component';
import { PagoDeDerechosEntradaComponent } from '../../../../shared/components/pago-de-derechos-entrada/pago-de-derechos-entrada.component';
import { TramitesAsociadosSeccionComponent } from '../../../../shared/components/tramites-asociados-seccion/tramites-asociados-seccion.component';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('PasoUnoPagesComponent', () => {
  let component: PasoUnoPagesComponent;
  let fixture: ComponentFixture<PasoUnoPagesComponent>;

  // Dummy components for ViewChild/ViewChildren
  @Component({ selector: 'lib-solicitante', template: '' })
  class MockSolicitanteComponent {
    form = new FormGroup({
      nombre: new FormControl('Juan Perez')
    });
  }

  @Component({ selector: 'app-datos-del-solicitud-modificacion', template: '' })
  class MockDatosDelSolicitudModificacionComponent {
    domicilioEstablecimiento = new FormGroup({ calle: new FormControl('Av Reforma') });
    scianForm = new FormGroup({ actividad: new FormControl('Industria') });
    solicitudEstablecimientoForm = new FormGroup({ nombre: new FormControl('Establecimiento X') });
    formMercancias = new FormGroup({ tipo: new FormControl('Medicamento') });
  }

  @Component({ selector: 'app-terceros-relacionados-fab-seccion', template: '' })
  class MockTercerosRelacionadosComponent {
    agregarFacturadorFormGroup = new FormGroup({ nombre: new FormControl('Facturador A') });
    agregarFabricanteFormGroup = new FormGroup({ nombre: new FormControl('Fabricante B') });
    agregarDestinatarioFormGroup = new FormGroup({ nombre: new FormControl('Destinatario C') });
    agregarProveedorFormGroup = new FormGroup({ nombre: new FormControl('Proveedor D') });
  }

  @Component({ selector: 'app-pago-de-derechos-entrada', template: '' })
  class MockPagoDeDerechosComponent {
    pagoDerechos = new FormGroup({ monto: new FormControl(1000) });
  }

  @Component({ selector: 'app-tramites-asociados-seccion', template: '' })
  class MockTramitesAsociadosComponent {
    acuseTablaDatos = [{ tramiteId: 1, nombre: 'Trámite X' }];
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        PasoUnoPagesComponent,
        MockSolicitanteComponent,
        MockDatosDelSolicitudModificacionComponent,
        MockTercerosRelacionadosComponent,
        MockPagoDeDerechosComponent,
        MockTramitesAsociadosComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoPagesComponent);
    component = fixture.componentInstance;

    // Injecting mocked children
    const datosComponent = new MockDatosDelSolicitudModificacionComponent();
    const tercerosComponent = new MockTercerosRelacionadosComponent();
    const pagoComponent = new MockPagoDeDerechosComponent();
    const tramitesComponent = new MockTramitesAsociadosComponent();
    const solicitanteComponent = new MockSolicitanteComponent();

    component.solicitante = solicitanteComponent as any;
    component.datosSolicitudComponents = {
      toArray: () => [datosComponent]
    } as any;
    component.tercerosRelacionadosComponents = {
      toArray: () => [tercerosComponent]
    } as any;
    component.pagoDeDerechosEntradaComponent = {
      toArray: () => [pagoComponent]
    } as any;
    component.tramitesAsociadosSeccionComponent = {
      toArray: () => [tramitesComponent]
    } as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should collect form values correctly', () => {
    const result = component.collectFormValues();

    expect(result.solicitante?.datosGenerales.actEconomica).toEqual('Juan Perez');
    expect(result.datosSolicitud?.length).toBe(1);
    expect(result.datosSolicitud?.[0].formMercancias?.UMC).toBe('Medicamento');
    expect(result.tercerosRelacionados?.[0].facturador?.calle).toBe('Facturador A');
    expect(result.pagoDeDerechos?.[0].banco).toBe(1000);
    expect(result.tramitesAsociados?.[0].estatus).toBe('Trámite X');
  });
});
