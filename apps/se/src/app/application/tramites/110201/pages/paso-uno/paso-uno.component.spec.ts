import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { RegistroService } from '../../services/registro.service';
import { ConsultaioQuery, TIPO_PERSONA, FormularioDinamico, ConsultaioState } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let registroServiceMock: any;
  let consultaQueryMock: any;

  
  beforeEach(async () => {
    registroServiceMock = {
      getCatalogoById: jest.fn().mockReturnValue(of({ data: JSON.stringify({ domicilioFiscal: { entidadFederativa: [{ id: 1, nombre: 'Entidad' }] } }) })),
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({ tratado: [], pais: [], fraccionArancelaria: '' })),
      actualizarEstadoFormulario: jest.fn(),
    };

    consultaQueryMock = {
      selectConsultaioState$: of({ update: false } as ConsultaioState),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [SolicitanteComponent,HttpClientModule],
      providers: [
        { provide: RegistroService, useValue: registroServiceMock },
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set entidadFederativa on ngOnInit', () => {
    component.ngOnInit();
    expect(registroServiceMock.getCatalogoById).toHaveBeenCalledWith(21);
    expect(component.entidadFederativa).toEqual([{ id: 1, nombre: 'Entidad' }]);
  });

  it('should set esDatosRespuesta to true if consultaState.update is false', () => {
    component.consultaState = { update: false } as ConsultaioState;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

it('should call guardarDatosFormularios if consultaState.update is true', async () => {
  consultaQueryMock.selectConsultaioState$ = of({ update: true } as ConsultaioState);
  const guardarSpy = jest.spyOn(component, 'guardarDatosFormularios');
  component.ngOnInit();
  await fixture.whenStable();
  fixture.detectChanges();
  expect(guardarSpy).toHaveBeenCalled();
});

  it('guardarDatosFormularios should call actualizarEstadoFormulario and set esDatosRespuesta', () => {
    component.esDatosRespuesta = false;
    component.guardarDatosFormularios();
    fixture.detectChanges();
    expect(registroServiceMock.getRegistroTomaMuestrasMercanciasData).toHaveBeenCalled();
    expect(registroServiceMock.actualizarEstadoFormulario).toHaveBeenCalled();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('ngAfterViewInit should set persona, domicilioFiscal and call obtenerTipoPersona', () => {
    component.solicitante = { obtenerTipoPersona: jest.fn() } as any;
    component.ngAfterViewInit();
    expect(component.persona).toBeDefined();
    expect(component.domicilioFiscal).toBeDefined();
    expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });

  
});