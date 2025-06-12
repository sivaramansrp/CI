import { AvisoAgenteComponent } from './aviso-agente.component';
import { FormBuilder } from '@angular/forms';

describe('AvisoAgenteComponent', () => {
  let component: AvisoAgenteComponent;
  let routerMock: any;
  let storeMock: any;
  let serviceMock: any;
  let queryMock: any;

  beforeEach(() => {
    routerMock = { navigate: jest.fn() };
    queryMock = {
      selectSolicitud$: jest.fn().mockReturnValue({
        folioPrograma: '12345',
        idProgramaSeleccionado: '67890',
        modalidad: 'Presencial',
        representacionFederal: 'Federal',
        tipoPrograma: 'Educativo',
        estatus: 'Activo',
      }),
    };
    storeMock = {
      setDatosData: jest.fn(),
      setAvisoAgenteDatos: jest.fn(),
      setModal: jest.fn(),
      setRadioSelection: jest.fn(),
      setConfirmar: jest.fn(),
      setDatos: jest.fn(),
      setFolioAcuse: jest.fn(),
      setTipoFigura: jest.fn(),
      setNumPatenteModal: jest.fn(),
    
      setObligFisc: jest.fn(),
      setAutPantente: jest.fn(),
      setPatente2: jest.fn(),
    };
    serviceMock = {
      obtenerDatos: jest.fn().mockReturnValue({
        folioPrograma: '12345',
        idProgramaSeleccionado: '67890',
        modalidad: 'Presencial',
        representacionFederal: 'Federal',
        tipoPrograma: 'Educativo',
        estatus: 'Activo',
      }),
    };
      component = new AvisoAgenteComponent(
        routerMock,
        serviceMock,
        storeMock,
        queryMock
      );
  });

  it('should call router.navigate on AgregarTransportias', () => {
    component.AgregarTransportias();
    expect(routerMock.navigate).toHaveBeenCalledWith(['../agregar-agente'], { relativeTo: routerMock });
  });

  it('should set modal property to default value', () => {
    expect(component.modal).toBe('modal');
  });

  it('should initialize avisoAgenteDatos as empty array', () => {
    expect(Array.isArray(component.avisoAgenteDatos)).toBe(true);
    expect(component.avisoAgenteDatos.length).toBe(0);
  });
});
