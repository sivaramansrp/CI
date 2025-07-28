import { PasoUnoComponent } from './paso-uno.component';
import { of } from 'rxjs';


describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let solicitud10301ServiceMock: any;
  let consultaQueryMock: any;

  beforeEach(() => {
    solicitud10301ServiceMock = {
      getDatosDeTrtamitelDoc: jest.fn().mockReturnValue(of({ tipoMercancia: 'test' })),
      actualizarEstadoFormulario: jest.fn()
    };
    consultaQueryMock = {
      selectConsultaioState$: of({ update: true })
    };

    component = new PasoUnoComponent(solicitud10301ServiceMock, consultaQueryMock);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call guardarDatosFormulario if consultaState.update is true', () => {
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.consultaState = {
      procedureId: '',
      parameter: '',
      department: '',
      folioTramite: '',
      update: true,
      tipoDeTramite: '',
      estadoDeTramite: '',
      readonly: false,
      create: false,
      consultaioSolicitante: {
        folioDelTramite: '',
        fechaDeInicio: '',
        estadoDelTramite: ''
      },
    };
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should set esDatosRespuesta to true if consultaState.update is false', () => {
    consultaQueryMock.selectConsultaioState$ = of({ update: false });
    component = new PasoUnoComponent(solicitud10301ServiceMock, consultaQueryMock);
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should call actualizarEstadoFormulario when guardarDatosFormulario is called and response exists', () => {
    component.guardarDatosFormulario();
    expect(solicitud10301ServiceMock.actualizarEstadoFormulario).toHaveBeenCalled();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should change indice when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});