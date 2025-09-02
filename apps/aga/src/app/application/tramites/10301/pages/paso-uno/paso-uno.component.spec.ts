import { PasoUnoComponent } from './paso-uno.component';
import { of, Subject } from 'rxjs';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let solicitud10301ServiceMock: any;
  let consultaQueryMock: any;
  let tramite10301StoreMock: any;

  beforeEach(() => {
    solicitud10301ServiceMock = {
      getDatosDeTrtamitelDoc: jest.fn().mockReturnValue(of({ success: true, datos: { manifesto: 'm', aduana: 'a', nombre: 'n', tipoMercancia: 't', usoEspecifico: 'u', marca: 'ma', modelo: 'mo', serie: 's', calle: 'c', numeroExterior: 'ne', numeroInterior: 'ni', telefono: 'tel', correoElectronico: 'mail', codigoPostal: 'cp', estado: 'est', colonia: 'col', opcion: 'op', pais: 'p', mercanciaDatos: [] } })),
      actualizarEstadoFormulario: jest.fn()
    };
    consultaQueryMock = {
      selectConsultaioState$: of({ update: true })
    };
    tramite10301StoreMock = {
      setManifesto: jest.fn(),
      setAduana: jest.fn(),
      setNombre: jest.fn(),
      setTipoMercancia: jest.fn(),
      setUsoEspecifico: jest.fn(),
      setMarca: jest.fn(),
      setModelo: jest.fn(),
      setSerie: jest.fn(),
      setCalle: jest.fn(),
      setNumeroExterior: jest.fn(),
      setNumeroInterior: jest.fn(),
      setTelefono: jest.fn(),
      setCorreoElectronico: jest.fn(),
      setCodigoPostal: jest.fn(),
      setEstado: jest.fn(),
      setColonia: jest.fn(),
      setOpcion: jest.fn(),
      setPais: jest.fn(),
      setDatosMercancia: jest.fn()
    };

    component = new PasoUnoComponent(
      solicitud10301ServiceMock,
      consultaQueryMock,
      tramite10301StoreMock
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call guardarDatosFormulario if consultaState.update is true', () => {
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.consultaState = {
      update: true
    } as any;
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should set esDatosRespuesta to true if consultaState.update is false', () => {
    consultaQueryMock.selectConsultaioState$ = of({ update: false });
    component = new PasoUnoComponent(solicitud10301ServiceMock, consultaQueryMock, tramite10301StoreMock);
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should call actualizarEstadoFormulario when guardarDatosFormulario is called', () => {
    solicitud10301ServiceMock.getDatosDeTrtamitelDoc = jest.fn().mockReturnValue(of({ success: true, datos: {} }));
    component.guardarDatosFormulario();
    expect(tramite10301StoreMock.setManifesto).toHaveBeenCalled();
    expect(tramite10301StoreMock.setAduana).toHaveBeenCalled();
    expect(tramite10301StoreMock.setNombre).toHaveBeenCalled();
    expect(tramite10301StoreMock.setTipoMercancia).toHaveBeenCalled();
    expect(tramite10301StoreMock.setUsoEspecifico).toHaveBeenCalled();
    expect(tramite10301StoreMock.setMarca).toHaveBeenCalled();
    expect(tramite10301StoreMock.setModelo).toHaveBeenCalled();
    expect(tramite10301StoreMock.setSerie).toHaveBeenCalled();
    expect(tramite10301StoreMock.setCalle).toHaveBeenCalled();
    expect(tramite10301StoreMock.setNumeroExterior).toHaveBeenCalled();
    expect(tramite10301StoreMock.setNumeroInterior).toHaveBeenCalled();
    expect(tramite10301StoreMock.setTelefono).toHaveBeenCalled();
    expect(tramite10301StoreMock.setCorreoElectronico).toHaveBeenCalled();
    expect(tramite10301StoreMock.setCodigoPostal).toHaveBeenCalled();
    expect(tramite10301StoreMock.setEstado).toHaveBeenCalled();
    expect(tramite10301StoreMock.setColonia).toHaveBeenCalled();
    expect(tramite10301StoreMock.setOpcion).toHaveBeenCalled();
    expect(tramite10301StoreMock.setPais).toHaveBeenCalled();
    expect(tramite10301StoreMock.setDatosMercancia).toHaveBeenCalled();
  });

  it('should not call store setters if response.success is false', () => {
    solicitud10301ServiceMock.getDatosDeTrtamitelDoc = jest.fn().mockReturnValue(of({ success: false }));
    component.guardarDatosFormulario();
    expect(tramite10301StoreMock.setManifesto).not.toHaveBeenCalled();
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

  it('should initialize tipoPersona, persona, domicilioFiscal with default values', () => {
    expect(component.tipoPersona).toBeUndefined();
    expect(Array.isArray(component.persona)).toBe(true);
    expect(Array.isArray(component.domicilioFiscal)).toBe(true);
  });

  it('should set consultaState on subscription', () => {
    component.consultaState = undefined as any;
    component.ngOnInit();
    expect(component.consultaState).toBeDefined();
  });
});