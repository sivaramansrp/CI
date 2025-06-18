import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { EstablecimientoService } from '../../../../shared/services/establecimiento.service';
import { Subject,of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;
  let establecimientoServiceMock: any;
  let consultaQueryMock: any;

  beforeEach(async () => {
    establecimientoServiceMock = {
      obtenerSolicitudDatos: jest.fn().mockReturnValue(of({ campo: 'valor' })),
      actualizarEstadoFormulario: jest.fn(),
    };
    consultaQueryMock = {
      selectConsultaioState$: of({ update: false }),
    };

    await TestBed.configureTestingModule({
      declarations: [DatosComponent],
      providers: [
        { provide: EstablecimientoService, useValue: establecimientoServiceMock },
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set esDatosRespuesta to true if consultaState.update is false', () => {
      consultaQueryMock.selectConsultaioState$ = of({ update: false });
      component.ngOnInit();
      expect(component.esDatosRespuesta).toBe(true);
    });

    it('should call guardarDatosFormulario if consultaState.update is true', () => {
      consultaQueryMock.selectConsultaioState$ = of({ update: true });
      const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
      component.ngOnInit();
      expect(guardarSpy).toHaveBeenCalled();
    });
  });

  describe('guardarDatosFormulario', () => {
    it('should set esDatosRespuesta to true and call actualizarEstadoFormulario if resp exists', () => {
      establecimientoServiceMock.obtenerSolicitudDatos.mockReturnValueOnce(of({ campo: 'valor' }));
      component.guardarDatosFormulario();
      expect(component.esDatosRespuesta).toBe(true);
      expect(establecimientoServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith({ campo: 'valor' });
    });

    it('should not call actualizarEstadoFormulario if resp is falsy', () => {
      establecimientoServiceMock.obtenerSolicitudDatos.mockReturnValueOnce(of(undefined));
      component.guardarDatosFormulario();
      expect(establecimientoServiceMock.actualizarEstadoFormulario).not.toHaveBeenCalled();
    });
  });

  describe('seleccionaTab', () => {
    it('should set indice to the provided value', () => {
      component.seleccionaTab(5);
      expect(component.indice).toBe(5);
    });
  });

  describe('ngOnDestroy', () => {
    it('should call next and complete on destroyNotifier$', () => {
      const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
      const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
      component.ngOnDestroy();
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});
