import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Subject } from 'rxjs';

// Mocks para servicios y dependencias
class MockTramite230902Query {
  selectSolicitud$ = of({ tipodeMovimiento: '1' });
}
class MockPermisoCitesService {
  getRegistroTomaMuestrasMercanciasData = () => of({ data: 'mock' });
  actualizarEstadoFormulario = jasmine.createSpy('actualizarEstadoFormulario');
}
class MockConsultaioQuery {
  selectConsultaioState$ = of({ update: false });
}
@Component({
  selector: 'solicitante',
  template: '<div></div>',
})
class MockSolicitanteComponent {
  obtenerTipoPersona = jasmine.createSpy('obtenerTipoPersona');
}

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent, MockSolicitanteComponent],
      providers: [
        { provide: 'Tramite230902Query', useClass: MockTramite230902Query },
        { provide: 'PermisoCitesService', useClass: MockPermisoCitesService },
        { provide: 'ConsultaioQuery', useClass: MockConsultaioQuery },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(PasoUnoComponent, {
        set: {
          providers: [
            { provide: Tramite230902Query, useClass: MockTramite230902Query },
            { provide: PermisoCitesService, useClass: MockPermisoCitesService },
            { provide: ConsultaioQuery, useClass: MockConsultaioQuery },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el índice en 1', () => {
    expect(component.indice).toBe(1);
  });

  it('debe deshabilitar la tabla si tipodeMovimiento es falso', () => {
    component.isTablDisabled = true;
    fixture.detectChanges();
    expect(component.isTablDisabled).toBeTrue();
  });

  it('debe establecer esDatosRespuesta en true si update es falso', () => {
    expect(component.esDatosRespuesta).toBeTrue();
  });

  it('debe llamar a guardarDatosFormulario si update es true', () => {
    // Forzar update a true y espiar el método
    const spy = spyOn(component, 'guardarDatosFormulario');
    component.consultaState = { update: true } as any;
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('debe cambiar el índice al seleccionar una pestaña', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('debe limpiar las suscripciones al destruir el componente', () => {
    const spy = spyOn(component['destroyNotifier$'], 'next');
    const spy2 = spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('debe llamar a obtenerTipoPersona en ngAfterViewInit', () => {
    component.solicitante = new MockSolicitanteComponent() as any;
    component.ngAfterViewInit();
    expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalled();
  });
});