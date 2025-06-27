import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { of } from 'rxjs';
import { Solicitud120602Service } from '../../services/solicitud120602/solicitud120602.service';
import { SolicitanteComponent } from '../../component/solicitante/solicitante.component';
import { ConsultaioQuery, ConsultaioState } from '@libs/shared/data-access-user/src';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockSolicitud120602Service {
  getEmpresaSolicitudData = jest.fn(() => of([]));
  actualizarEstadoFormulario = jest.fn();
}

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  let mockSolicitudService: jest.Mocked<Solicitud120602Service>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;

  const consultaStateUpdateTrue: ConsultaioState = {
    update: true,
    procedureId: '',
    parameter: '',
    department: '',
    folioTramite: '',
    tipoDeTramite: '',
    estadoDeTramite: '',
    readonly: false,
    create: false,
    consultaioSolicitante: null
  };

  const consultaStateUpdateFalse: ConsultaioState = {
    update: false,
    procedureId: '',
    parameter: '',
    department: '',
    folioTramite: '',
    tipoDeTramite: '',
    estadoDeTramite: '',
    readonly: false,
    create: true,
    consultaioSolicitante: null
  };

  beforeEach(async () => {
    mockSolicitudService = {
      getEmpresaSolicitudData: jest.fn(),
      actualizarEstadoFormulario: jest.fn()
    } as any;

    mockConsultaioQuery = {
      selectConsultaioState$: of(consultaStateUpdateFalse)
    } as any;

    await TestBed.configureTestingModule({
      declarations: [DatosComponent],
      imports: [HttpClientTestingModule, SolicitanteComponent],
      providers: [
        { provide: Solicitud120602Service, useClass: MockSolicitud120602Service },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar consultaState y establecer esDatosRespuesta en true cuando update es false', () => {
    component.ngOnInit();
    expect(component.consultaState).toEqual(consultaStateUpdateFalse);
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('debe llamar a guardarDatosFormulario cuando update es true', () => {
    mockConsultaioQuery.selectConsultaioState$ = of(consultaStateUpdateTrue);
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
    component.ngOnInit();
    expect(guardarSpy).toHaveBeenCalled();
  });
});
