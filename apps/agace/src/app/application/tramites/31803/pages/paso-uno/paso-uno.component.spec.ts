import { TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { of, Subject } from 'rxjs';
import {
  ConsultaioQuery,
  ConsultaioState,
  SolicitanteComponent,
} from '@ng-mf/data-access-user';
import {
  RegistroSolicitudService,
  SolicitudDatosResponse,
} from '../../services/registro-solicitud-service.service';
import {
  PERSONA_MORAL_NACIONAL,
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
} from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { CommonModule } from '@angular/common';
import { SolicitudComponent } from '../../components/Solicitud.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: any;
  let consultaQueryMock: jest.Mocked<Partial<ConsultaioQuery>>;
  let solicitud31803ServiceMock: jest.Mocked<Partial<RegistroSolicitudService>>;

  beforeEach(async () => {
    consultaQueryMock = {
      selectConsultaioState$: of({ update: false } as ConsultaioState),
    };
    solicitud31803ServiceMock = {
      getSolicitudDatos: jest.fn(),
      actualizarEstadoFormulario: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [
        PasoUnoComponent,
        CommonModule,
        SolicitanteComponent,
        SolicitudComponent,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
        {
          provide: RegistroSolicitudService,
          useValue: solicitud31803ServiceMock,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set esDatosRespuesta to true if consultaState.update is false', () => {
    consultaQueryMock.selectConsultaioState$ = of({
      update: false,
    } as ConsultaioState);
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBeTruthy();
  });

  it('should set esDatosRespuesta to true and update state when response is received', () => {
    const response: SolicitudDatosResponse = {
      numeroOperacion: '123',
      banco: 'BBVA',
      llave: 'abc',
      manifiesto1: 'm1',
      manifiesto2: 'm2',
      fechaPago: '2024-01-01',
    };
    (solicitud31803ServiceMock.getSolicitudDatos as jest.Mock).mockReturnValue(
      of(response)
    );
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBeTruthy();
    expect(
      solicitud31803ServiceMock.actualizarEstadoFormulario
    ).toHaveBeenCalledWith({
      numeroOperacion: '123',
      banco: 'BBVA',
      llave: 'abc',
      manifiesto1: 'm1',
      manifiesto2: 'm2',
      fechaPago: '2024-01-01',
    });
  });

  it('should set persona and domicilioFiscal arrays', () => {
    component.ngAfterViewInit();
    expect(component.persona).toBe(PERSONA_MORAL_NACIONAL);
    expect(component.domicilioFiscal).toBe(
      DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL
    );
  });

  it('should set indice to the given value', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should complete destroyNotifier$', () => {
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
