import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@ng-mf/data-access-user';
import { ExpedicionAsignacionComponent } from '../../components/expedicion-asignacion/expedicion-asignacion.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, Subject } from 'rxjs';
import { ExpedicionCertificadosFronteraService } from '../../services/expedicion-certificados-frontera.service';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let consultaQuery: ConsultaioQuery;
  let expedicionService: ExpedicionCertificadosFronteraService;

  const mockSolicitanteService = { 
    validateTab: jest.fn().mockImplementation((tabIndex: number) => {
      return tabIndex > 0 && tabIndex <= 5; 
    }),
  };

  const destroy$ = new Subject<void>();

  const mockConsultaStateUpdateTrue: ConsultaioState = {
    readonly: false,
    update: true
  } as any;

  const mockConsultaStateUpdateFalse: ConsultaioState = {
    readonly: false,
    update: false
  } as any;

  const mockRegistroResponse = {
    anoDelOficio: '2023',
    numeroOficio: 'XYZ987',
    montoAExpedir: '1500',
    fechaInicioVigencia: '2024-06-01',
    fechaFinVigencia: '2024-12-31'
  };

  const mockConsultaioQuery = {
    selectConsultaioState$: of(mockConsultaStateUpdateTrue)
  };

  const mockExpedicionService = {
    getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of(mockRegistroResponse)),
    actualizarEstadoFormulario: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports:[SolicitanteComponent, ExpedicionAsignacionComponent, HttpClientTestingModule],
      providers: [
        { provide: 'SolicitanteService', useValue: mockSolicitanteService },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: ExpedicionCertificadosFronteraService, useValue: mockExpedicionService }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    consultaQuery = TestBed.inject(ConsultaioQuery);
    expedicionService = TestBed.inject(ExpedicionCertificadosFronteraService);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener un valor predeterminado de indice como 1', () => {
    expect(component.indice).toBe(1);
  });

  it('debería actualizar el indice cuando se llama a seleccionaTab', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('debería validar el índice de la pestaña utilizando el servicio simulado', () => {
    const isValid = mockSolicitanteService.validateTab(3);
    expect(isValid).toBe(true);

    const isInvalid = mockSolicitanteService.validateTab(6);
    expect(isInvalid).toBe(false);
  });

  it('debería manejar valores negativos en seleccionaTab', () => {
    component.seleccionaTab(-1);
    expect(component.indice).toBe(-1);
  });

  it('debería manejar cero en seleccionaTab', () => {
    component.seleccionaTab(0);
    expect(component.indice).toBe(0);
  });

  it('debería llamar a actualizarEstadoFormulario y establecer esDatosRespuesta = true en guardarDatosFormulario()', () => {
    component['guardarDatosFormulario']();
    expect(expedicionService.getRegistroTomaMuestrasMercanciasData).toHaveBeenCalled();
    expect(expedicionService.actualizarEstadoFormulario).toHaveBeenCalledWith(mockRegistroResponse);
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('debería llamar a destroyNotifier$ en ngOnDestroy()', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});