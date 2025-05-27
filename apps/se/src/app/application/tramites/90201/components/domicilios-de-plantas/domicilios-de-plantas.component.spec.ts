import { DomiciliosDePlantasComponent } from './domicilios-de-plantas.component';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('DomiciliosDePlantasComponent', () => {
  let component: DomiciliosDePlantasComponent;
  let fb: FormBuilder;
  let consultaioQueryMock: any;
  let tramite90201StoreMock: any;
  let tramite90201QueryMock: any;

  beforeEach(() => {
    fb = new FormBuilder();
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false })
    };
    tramite90201StoreMock = {
      setRepresentacionFederal: jest.fn(),
      setActividadProductiva: jest.fn()
    };
    tramite90201QueryMock = {
      selectSolicitud$: of({
        representacionFederal: 'FEDERAL',
        actividadProductiva: 'PRODUCTIVA'
      })
    };
    component = new DomiciliosDePlantasComponent(
      fb,
      consultaioQueryMock,
      tramite90201StoreMock,
      tramite90201QueryMock
    );
    component.solicitudState = {
      representacionFederal: 'FEDERAL',
      actividadProductiva: 'PRODUCTIVA'
    } as any;
  });

  it('should initialize form with correct values on establecerFormDomiciliosDePlantas', () => {
    component.establecerFormDomiciliosDePlantas();
    expect(component.formDomiciliosDePlantas).toBeDefined();
    expect(component.formDomiciliosDePlantas.get('representacionFederal')?.value).toBe('FEDERAL');
    expect(component.formDomiciliosDePlantas.get('actividadProductiva')?.value).toBe('PRODUCTIVA');
  });

  it('should disable form when esFormularioSoloLectura is true in guardarDatosFormulario', () => {
    component.establecerFormDomiciliosDePlantas();
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.formDomiciliosDePlantas.disabled).toBe(true);
  });

  it('should enable form when esFormularioSoloLectura is false in guardarDatosFormulario', () => {
    component.establecerFormDomiciliosDePlantas();
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.formDomiciliosDePlantas.enabled).toBe(true);
  });

  it('should call store method in setValoresStore', () => {
    component.establecerFormDomiciliosDePlantas();
    component.formDomiciliosDePlantas.get('representacionFederal')?.setValue('NEWVAL');
    component.setValoresStore('representacionFederal', 'setRepresentacionFederal');
    expect(tramite90201StoreMock.setRepresentacionFederal).toHaveBeenCalledWith('NEWVAL');
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should call inicializarEstadoFormulario on ngOnInit', () => {
    const spy = jest.spyOn(component, 'inicializarEstadoFormulario');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call guardarDatosFormulario if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should call inicializarFormulario if esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;
    const spy = jest.spyOn(component, 'inicializarFormulario');
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });
});
