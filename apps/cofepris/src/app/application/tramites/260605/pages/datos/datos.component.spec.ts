import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { ModificatNoticeService } from '../../services/modificat-notice.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { TIPO_PERSONA } from '@libs/shared/data-access-user/src/tramites/constantes/constantes';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;
  let modificatNoticeServiceMock: any;
  let consultaQueryMock: any;

  beforeEach(async () => {
    modificatNoticeServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn(),
      actualizarEstadoFormulario: jest.fn(),
    };

    consultaQueryMock = {
      selectConsultaioState$: of({ update: true }),
    };

    await TestBed.configureTestingModule({
      declarations: [DatosComponent],
      providers: [
        { provide: ModificatNoticeService, useValue: modificatNoticeServiceMock },
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit debe llamar guardarDatosFormulario si update es true', () => {
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.consultaState = { update: true } as any;
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('ngOnInit debe establecer esDatosRespuesta en true si update es false', () => {
    component.consultaState = { update: false } as any;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('guardarDatosFormulario debe actualizar el estado y llamar actualizarEstadoFormulario', () => {
    const mockResp = { nombre: 'Prueba' };
    modificatNoticeServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(mockResp));
    component.guardarDatosFormulario();
    expect(modificatNoticeServiceMock.getRegistroTomaMuestrasMercanciasData).toHaveBeenCalled();
    expect(component.esDatosRespuesta).toBe(true);
    expect(modificatNoticeServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith(mockResp);
  });

  it('guardarDatosFormulario no debe llamar actualizarEstadoFormulario si resp es falsy', () => {
    modificatNoticeServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(null));
    component.guardarDatosFormulario();
    expect(modificatNoticeServiceMock.actualizarEstadoFormulario).not.toHaveBeenCalled();
  });

  it('ngAfterViewInit debe llamar obtenerTipoPersona en el componente SolicitanteComponent', () => {
    component.solicitante = { obtenerTipoPersona: jest.fn() } as any;
    component.ngAfterViewInit();
    expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });

  it('seleccionaTab debe cambiar el índice', () => {
    component.indice = 1;
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('ngOnDestroy debe limpiar el subject destroyNotifier$', () => {
    const spyNext = jest.spyOn((component as any).destroyNotifier$, 'next');
    const spyComplete = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});