import { EmpresasTerciarizadaasComponent } from "../../../80103/component/empresas-terciarizadaas/empresas-terciarizadaas.component";


describe('EmpresasTerciarizadaasComponent', () => {
  let component: EmpresasTerciarizadaasComponent;
  let nuevoProgramaIndustrialService: any;

  beforeEach(() => {
    nuevoProgramaIndustrialService = {
      obtenerListaEstado: jest.fn()
    };
    component = new EmpresasTerciarizadaasComponent(nuevoProgramaIndustrialService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct encabezado values for each column', () => {
    const encabezados = [
      'Calle',
      'Número exterior',
      'Número interior',
      'Código postal',
      'Colonia',
      'Municipio o delegación',
      'Entidad federativa',
      'País',
      'Registro federal de contribuyentes',
      'Domicilio fiscal del solicitante',
      'Razón social'
    ];
    component.parentTablaConfig.forEach((col, idx) => {
      expect(col.encabezado).toBe(encabezados[idx]);
    });
  });

  it('should have correct orden values for each column', () => {
    component.parentTablaConfig.forEach((col, idx) => {
      expect(col.orden).toBe(idx + 1);
    });
  });

  it('should have clave functions that return correct property from item', () => {
    const mockItem = {
      calle: 'Calle 1',
      numeroExterior: '123',
      numeroInterior: 'A',
      codigoPostal: '45678',
      colonia: 'Colonia X',
      municipioDelegacion: 'Municipio Y',
      entidadFederativa: 'Entidad Z',
      pais: 'México',
      registroFederalContribuyentes: 'RFC123',
      domicilioFiscalSolicitante: 'Domicilio 456',
      razonSocial: 'Empresa S.A.'
    };
    expect(component.parentTablaConfig[0].clave(mockItem)).toBe('Calle 1');
    expect(component.parentTablaConfig[1].clave(mockItem)).toBe('123');
    expect(component.parentTablaConfig[2].clave(mockItem)).toBe('A');
    expect(component.parentTablaConfig[3].clave(mockItem)).toBe('45678');
    expect(component.parentTablaConfig[4].clave(mockItem)).toBe('Colonia X');
    expect(component.parentTablaConfig[5].clave(mockItem)).toBe('Municipio Y');
    expect(component.parentTablaConfig[6].clave(mockItem)).toBe('Entidad Z');
    expect(component.parentTablaConfig[7].clave(mockItem)).toBe('México');
    expect(component.parentTablaConfig[8].clave(mockItem)).toBe('RFC123');
    expect(component.parentTablaConfig[9].clave(mockItem)).toBe('Domicilio 456');
    expect(component.parentTablaConfig[10].clave(mockItem)).toBe('Empresa S.A.');
  });

  it('should return empty string for numeroInterior if not present', () => {
    const mockItem:any = { numeroInterior: undefined };
    expect(component.parentTablaConfig[2].clave(mockItem)).toBe('');
  });

  it('should initialize estadosCatalogo as empty array', () => {
    expect(component.estadosCatalogo).toEqual([]);
  });

  it('should call obtenerListaEstado and update estadosCatalogo on response', () => {
    const mockResponse = { data: [{ id: 1, nombre: 'Estado1' }] };
    const mockSubscribe = jest.fn((cb) => cb(mockResponse));
    const mockPipe = jest.fn(() => ({ subscribe: mockSubscribe }));
    nuevoProgramaIndustrialService.obtenerListaEstado.mockReturnValue({ pipe: mockPipe });

    component.obtenerListaEstado();

    expect(nuevoProgramaIndustrialService.obtenerListaEstado).toHaveBeenCalled();
    expect(component.estadosCatalogo).toEqual(mockResponse.data);
  });

  it('should not update estadosCatalogo if response is falsy', () => {
    const mockSubscribe = jest.fn((cb) => cb(null));
    const mockPipe = jest.fn(() => ({ subscribe: mockSubscribe }));
    nuevoProgramaIndustrialService.obtenerListaEstado.mockReturnValue({ pipe: mockPipe });

    component.estadosCatalogo = [{ id: 2, descripcion: 'Estado2' }];
    component.obtenerListaEstado();

    expect(component.estadosCatalogo).toEqual([{ id: 2, nombre: 'Estado2' }]);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});