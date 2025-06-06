import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { of, Subject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;
  let mockSolicitudService: any;
  let mockConsultaQuery: any;

  beforeEach(async () => {
    mockSolicitudService = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({ some: 'data' })),
      actualizarEstadoFormulario: jest.fn(),
    };

    mockConsultaQuery = {
      selectConsultaioState$: of({ update: false }),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [DatosComponent],
      providers: [
        { provide: 'SolicitudService', useValue: mockSolicitudService },
        { provide: 'ConsultaioQuery', useValue: mockConsultaQuery },
      ],
      schemas: [NO_ERRORS_SCHEMA], 
    })
      .overrideComponent(DatosComponent, {
        set: {
          providers: [
            { provide: 'SolicitudService', useValue: mockSolicitudService },
            { provide: 'ConsultaioQuery', useValue: mockConsultaQuery },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;

    (component as any).solicitudService = mockSolicitudService;
    (component as any).consultaQuery = mockConsultaQuery;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set esDatosRespuesta to true if consultaState.update is false on ngOnInit', () => {
    component.consultaState = { update: false } as any;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should call guardarDatosFormulario if consultaState.update is true on ngOnInit', () => {
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
    component.consultaState = { update: true } as any;
    component.ngOnInit();
    expect(guardarSpy).toHaveBeenCalled();
  });

  it('should set esDatosRespuesta and call actualizarEstadoFormulario in guardarDatosFormulario', () => {
    component.esDatosRespuesta = false;
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(true);
    expect(mockSolicitudService.actualizarEstadoFormulario).toHaveBeenCalledWith({ some: 'data' });
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(5);
    expect(component.indice).toBe(5);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
