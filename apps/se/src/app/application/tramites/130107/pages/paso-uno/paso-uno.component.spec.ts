import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { DatosDeLaSolicitudService } from '../../services/datos-de-la-solicitud.service';
import { of, Subject } from 'rxjs';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let datosDeLaSolicitudServiceMock: any;

  beforeEach(async () => {
    datosDeLaSolicitudServiceMock = {
      getImportacionDefinitivaData: jest.fn().mockReturnValue(of({ campo1: 'valor1', campo2: 'valor2' })),
      actualizarEstadoFormulario: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      providers: [
        { provide: DatosDeLaSolicitudService, useValue: datosDeLaSolicitudServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call guardarDatosFormulario if consultaState.update is true', () => {
      component.consultaState = { update: true } as any;
      const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
      component.ngOnInit();
      expect(guardarSpy).toHaveBeenCalled();
    });

    it('should set esDatosRespuesta to true if consultaState.update is false', () => {
      component.consultaState = { update: false } as any;
      component.ngOnInit();
      expect(component.esDatosRespuesta).toBe(true);
    });
  });

  describe('guardarDatosFormulario', () => {
    it('should set esDatosRespuesta to true and update store for each key', () => {
      component.guardarDatosFormulario();
      expect(component.esDatosRespuesta).toBe(true);
      expect(datosDeLaSolicitudServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith('campo1', 'valor1');
      expect(datosDeLaSolicitudServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith('campo2', 'valor2');
    });

    it('should not throw if response is undefined', () => {
      datosDeLaSolicitudServiceMock.getImportacionDefinitivaData.mockReturnValueOnce(of(undefined));
      expect(() => component.guardarDatosFormulario()).not.toThrow();
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
