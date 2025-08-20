import { TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { ConsultaioQuery, SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitudService } from '../../../services/solicitud.service';
import { Tramite80301Store } from '../../../estados/tramite80301.store';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ComplementariaImmexComponent } from '../../../components/complementaria-immex/complementaria-immex.component';
import { BitacoraComponent } from '../../../components/bitacora/bitacora.component';
import { ModificacionComponent } from '../../../components/modificacion/modificacion.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: any;
  let consultaQueryMock: any;
  let solicitudServiceMock: any;
  let storeMock: any;

  beforeEach(async () => {
    consultaQueryMock = {
      selectConsultaioState$: of({ update: false }),
    };
    solicitudServiceMock = {
      obtenerTramiteDatos: jest
        .fn()
        .mockReturnValue(of({ datosModificacion: { test: 'data' } })),
      actualizarEstadoFormulario: jest.fn(),
    };
    storeMock = {};

    await TestBed.configureTestingModule({
      imports: [
        PasoUnoComponent,
        CommonModule,
        SolicitanteComponent,
        ReactiveFormsModule,
        ComplementariaImmexComponent,
        BitacoraComponent,
        ModificacionComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: Tramite80301Store, useValue: storeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should initialize indice to 1', () => {
    expect(component.indice).toBe(1);
  });

  test('should set esDatosRespuesta to true if consultaState.update is false', () => {
    component.consultaState = { update: false } as any;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  test('should call guardarDatosFormulario if consultaState.update is true', () => {
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.consultaState = { update: true } as any;
    component.ngOnInit();
  });

  test('guardarDatosFormulario should set esDatosRespuesta and call actualizarEstadoFormulario', () => {
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(true);
    expect(
      solicitudServiceMock.actualizarEstadoFormulario
    ).toHaveBeenCalledWith({ test: 'data' });
  });

  test('ngAfterViewInit should set persona and domicilioFiscal', () => {
    component.ngAfterViewInit();
    expect(component.persona).toBeDefined();
    expect(component.domicilioFiscal).toBeDefined();
  });

  test('seleccionaTab should change indice', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  test('ngOnDestroy should complete destroyNotifier$', () => {
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
