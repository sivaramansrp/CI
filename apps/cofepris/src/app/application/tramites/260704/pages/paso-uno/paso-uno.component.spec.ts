import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { CommonModule } from '@angular/common';
import { of, ReplaySubject } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ConsultaService } from '../../service/consulta.service';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { DatosDeLaSolicitudComponent } from '../../components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { PagoDeDerechosComponent } from '../../components/pago-de-derechos/pago-de-derechos.component';
import { TercerosRelacinadosComponent } from '../../components/terceros-relacinados/terceros-relacinados.component';
import { TramitesAsociadosComponent } from '../../components/tramites-asociados/tramites-asociados.component';
import { PERSONA_MORAL_NACIONAL, DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, TIPO_PERSONA } from '@ng-mf/data-access-user';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let consultaQueryMock: any;
  let consultaServiceMock: any;
  let destroyed$: ReplaySubject<boolean>;

  beforeEach(async () => {
    destroyed$ = new ReplaySubject(1);
    consultaQueryMock = {
      selectConsultaioState$: of({ update: false })
    };
    consultaServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({})),
      actualizarEstadoFormulario: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SolicitanteComponent,
        DatosDeLaSolicitudComponent,
        PagoDeDerechosComponent,
        TercerosRelacinadosComponent,
        TramitesAsociadosComponent,
        PasoUnoComponent
      ],
      providers: [
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
        { provide: ConsultaService, useValue: consultaServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default indice value as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);

    component.seleccionaTab(5);
    expect(component.indice).toBe(5);
  });

  it('should set esDatosRespuesta to true if consultaState.update is false in ngOnInit', () => {
    component.consultaState = { update: false } as any;
    component.esDatosRespuesta = false;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should call guardarDatosFormularios if consultaState.update is true in ngOnInit', () => {
    component.consultaState = { update: true } as any;
    jest.spyOn(component, 'guardarDatosFormularios');
    component.ngOnInit();
    expect(component.guardarDatosFormularios).toHaveBeenCalled();
  });

  it('should call consultaService and set esDatosRespuesta in guardarDatosFormularios', () => {
    consultaServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of({ test: 'value' }));
    component.esDatosRespuesta = false;
    component.guardarDatosFormularios();
    expect(component.esDatosRespuesta).toBe(true);
    expect(consultaServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith({ test: 'value' });
  });

  it('should assign persona, domicilioFiscal and call obtenerTipoPersona in ngAfterViewInit', () => {
    component.solicitante = { obtenerTipoPersona: jest.fn() } as any;
    component.ngAfterViewInit();
    expect(component.persona).toBe(PERSONA_MORAL_NACIONAL);
    expect(component.domicilioFiscal).toBe(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
    expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});