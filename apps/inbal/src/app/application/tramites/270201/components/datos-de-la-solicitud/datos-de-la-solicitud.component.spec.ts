import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { SolicitudService } from '../../services/solicitud.service';
import { Tramite270201Store } from '../../estados/tramites/tramite270201.store';
import { of } from 'rxjs';

describe('DatosDeLaSolicitudComponent', () => {
  let solicitudServiceMock: any;
  let tramiteStoreMock: any;
  let fixture: any;
  let component: any;

  beforeEach(async () => {
    solicitudServiceMock = {
      getOperacionData: jest.fn().mockReturnValue(of([])),
      getMovimientoData: jest.fn().mockReturnValue(of([])),
      getPaisData: jest.fn().mockReturnValue(of([])),
      getTransporteData: jest.fn().mockReturnValue(of([])),
      getAduanaData: jest.fn().mockReturnValue(of([])),
      getMotivoData: jest.fn().mockReturnValue(of([])),
      getCiudadData: jest.fn().mockReturnValue(of([])),
      getMonedaData: jest.fn().mockReturnValue(of([])),
      getAutorData: jest.fn().mockReturnValue(of([])),
      getTituloData: jest.fn().mockReturnValue(of([])),
      getTecnicaData: jest.fn().mockReturnValue(of([])),
      getAltoData: jest.fn().mockReturnValue(of([])),
      getArancelariaData: jest.fn().mockReturnValue(of([])),
    };

    tramiteStoreMock = {
      setOperacion: jest.fn(),
      setObraDeArte: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [DatosDeLaSolicitudComponent, ReactiveFormsModule],
      providers: [
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: Tramite270201Store, useValue: tramiteStoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;

    component.solicitudFormGroup = {
      get: jest.fn(),
    } as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize solicitudFormGroup', () => {
    fixture.detectChanges();
    expect(component.solicitudFormGroup).toBeTruthy();
  });

  it('should initialize obraDeArteFormgroup', () => {
    fixture.detectChanges();
    expect(component.obraDeArteFormgroup).toBeTruthy();
  });

  it('should validate solicitudFormGroup controls', () => {
    fixture.detectChanges();
    const controls = component.solicitudFormGroup.controls;
    Object.keys(controls).forEach((controlName) => {
      expect(controls[controlName].invalid).toBe(true); 
      controls[controlName].setValue('some value'); 
      expect(controls[controlName].invalid).toBe(false); 
    });
  });

  it('should call setOperacion with the correct value in actualizarOperacion', () => {
    const mockOperacion = 'OperacionMock';
    component.solicitudFormGroup.get = jest.fn().mockReturnValue({ value: mockOperacion });
    component.actualizarOperacion();
    expect(tramiteStoreMock.setOperacion).toHaveBeenCalledWith(mockOperacion);
  });

  it('should not call setOperacion if tipoDeOperacion is null in actualizarOperacion', () => {
    component.solicitudFormGroup.get = jest.fn().mockReturnValue({ value: null });
    component.actualizarOperacion();
    expect(tramiteStoreMock.setOperacion).not.toHaveBeenCalled();
  });

  
  it('should call setOperacion with the correct value in actualizarMovimiento', () => {
    const mockMovimiento = 'MovimientoMock';
    component.solicitudFormGroup.get = jest.fn().mockReturnValue({ value: mockMovimiento });
    component.actualizarMovimiento();
    expect(tramiteStoreMock.setOperacion).toHaveBeenCalledWith(mockMovimiento);
  });

  it('should call setOperacion with the correct value in actualizarMotivo', () => {
    const mockMotivo = 'MotivoMock';
    component.solicitudFormGroup.get = jest.fn().mockReturnValue({ value: mockMotivo });
    component.actualizarMotivo();
    expect(tramiteStoreMock.setOperacion).toHaveBeenCalledWith(mockMotivo);
  });

  it('should call setOperacion with the correct value in actualizarPais', () => {
    const mockPais = 'PaisMock';
    component.solicitudFormGroup.get = jest.fn().mockReturnValue({ value: mockPais });
    component.actualizarPais();
    expect(tramiteStoreMock.setOperacion).toHaveBeenCalledWith(mockPais);
  });

  it('should call setOperacion with the correct value in actualizarMoneda', () => {
    const mockMoneda = 'MonedaMock';
    component.solicitudFormGroup.get = jest.fn().mockReturnValue({ value: mockMoneda });
    component.actualizarMoneda();
    expect(tramiteStoreMock.setOperacion).toHaveBeenCalledWith(mockMoneda);
  });

  it('should not call setOperacion with the correct value in actualizarCiudad', () => {
    const mockCiudad = 'MockCiudad';
    component.solicitudFormGroup.get = jest.fn().mockReturnValue({ value: mockCiudad });
    component.actualizarCiudad();
    expect(tramiteStoreMock.setOperacion).toHaveBeenCalledWith(mockCiudad);
  });

  it('should call setOperacion with the correct value in actualizarTransporte', () => {
    const mockTransporte = 'TransporteMock';
    component.solicitudFormGroup.get = jest.fn().mockReturnValue({ value: mockTransporte });
    component.actualizarTransporte();
    expect(tramiteStoreMock.setOperacion).toHaveBeenCalledWith(mockTransporte);
  });

  it('should call setOperacion with the correct value in actualizarAduana', () => {
    const mockAduana = 'AduanaMock';
    component.solicitudFormGroup.get = jest.fn().mockReturnValue({ value: mockAduana });
    component.actualizarAduana();
    expect(tramiteStoreMock.setOperacion).toHaveBeenCalledWith(mockAduana);
  });

  it('should call setOperacion with the correct value in actualizarPais', () => {
    const mockPais = 'PaisMock';
    component.solicitudFormGroup.get = jest.fn().mockReturnValue({ value: mockPais });
    component.actualizarPais();
    expect(tramiteStoreMock.setOperacion).toHaveBeenCalledWith(mockPais);
  });

  it('should call setOperacion with the correct value in actualizarAutor', () => {
    const mockAutor = 'AutorMock';
    component.solicitudFormGroup.get = jest.fn().mockReturnValue({ value: mockAutor });
    component.actualizarAutor();
    expect(tramiteStoreMock.setOperacion).toHaveBeenCalledWith(mockAutor);
  });

  it('should call setOperacion with the correct value in actualizarTitulo', () => {
    const mockTitulo = 'TituloMock';
    component.solicitudFormGroup.get = jest.fn().mockReturnValue({ value: mockTitulo });
    component.actualizarTitulo();
    expect(tramiteStoreMock.setOperacion).toHaveBeenCalledWith(mockTitulo);
  });

  it('should call setOperacion with the correct value in actualizarTecnica', () => {
    const mockTecnica = 'TecnicaMock';
    component.solicitudFormGroup.get = jest.fn().mockReturnValue({ value: mockTecnica });
    component.actualizarTecnica();
    expect(tramiteStoreMock.setOperacion).toHaveBeenCalledWith(mockTecnica);
  });

  it('should call setOperacion with the correct value in actualizarAlto', () => {
    const mockAlto = 'AltoMock';
    component.solicitudFormGroup.get = jest.fn().mockReturnValue({ value: mockAlto });
    component.actualizarAlto();
    expect(tramiteStoreMock.setOperacion).toHaveBeenCalledWith(mockAlto);
  });

  it('should call setOperacion with the correct value in actualizarFraccionArancelaria', () => {
    const mockFraccionArancelaria = 'FraccionMock';
    component.solicitudFormGroup.get = jest.fn().mockReturnValue({ value: mockFraccionArancelaria });
    component.actualizarFraccionArancelaria();
    expect(tramiteStoreMock.setOperacion).toHaveBeenCalledWith(mockFraccionArancelaria);
  });

  it('should not call setOperacion if fraccionArancelaria is null in actualizarFraccionArancelaria', () => {
    component.solicitudFormGroup.get = jest.fn().mockReturnValue({ value: null });
    component.actualizarFraccionArancelaria();
    expect(tramiteStoreMock.setOperacion).not.toHaveBeenCalled();
  });

  it('should handle undefined fraccionArancelaria gracefully', () => {
    component.solicitudFormGroup.get = jest.fn().mockReturnValue(undefined);
    component.actualizarFraccionArancelaria();
    expect(tramiteStoreMock.setOperacion).not.toHaveBeenCalled();
  });

  it('should validate obraDeArteFormgroup controls', () => {
    fixture.detectChanges();
    const controls = component.obraDeArteFormgroup.controls;

  Object.keys(controls).forEach((controlName) => {
    expect(controls[controlName].invalid).toBe(true); 
  });
  });

  it('should toggle obra de arte modal and table div', () => {
    fixture.detectChanges();
    expect(component.showTableDiv).toBe(true);
    expect(component.showObraDeArteModal).toBe(false);

    component.toggleObraDeArte();
    expect(component.showTableDiv).toBe(false);
    expect(component.showObraDeArteModal).toBe(true);

    component.toggleObraDeArte();
    expect(component.showTableDiv).toBe(true);
    expect(component.showObraDeArteModal).toBe(false);
  });

  it('should submit obra de arte form', () => {
    fixture.detectChanges();

    component.obraDeArteFormgroup.setValue({
      autor: 'Author',
      titulo: 'Title',
      tecnicaDeRealizacion: 'Technique',
      medidas: 'Measure',
      alto: 'Height',
      ancho: 'Width',
      profundidad: 'Depth',
      diametro: 'Diameter',
      variables: 'Variables',
      anoDeCreacion: 'Year',
      avaluo: 'Appraisal',
      moneda: 'Currency',
      propietario: 'Owner',
      fraccionArancelaria: 'Tariff Fraction',
      descripcionArancelaria: 'Tariff Description',
    });

    component.submitDeArteForm();
    expect(component.obraDeArteRowData.length).toBe(1);
  });

  it('should retrieve data from solicitudService', () => {
    solicitudServiceMock.getOperacionData.mockReturnValue(of([{ id: 1, descripcion: 'Operation' }]));
    solicitudServiceMock.getMovimientoData.mockReturnValue(of([{ id: 1, descripcion: 'Movement' }]));
    solicitudServiceMock.getPaisData.mockReturnValue(of([{ id: 1, descripcion: 'Country' }]));
    solicitudServiceMock.getTransporteData.mockReturnValue(of([{ id: 1, descripcion: 'Transport' }]));
    solicitudServiceMock.getAduanaData.mockReturnValue(of([{ id: 1, descripcion: 'Customs' }]));
    solicitudServiceMock.getMotivoData.mockReturnValue(of([{ id: 1, descripcion: 'Reason' }]));
    solicitudServiceMock.getMonedaData.mockReturnValue(of([{ id: 1, descripcion: 'Currency' }]));
    solicitudServiceMock.getArancelariaData.mockReturnValue(of([{ id: 1, descripcion: 'Tariff' }]));

    fixture.detectChanges();

    expect(component.operacionData.length).toBe(1);
    expect(component.movimientoData.length).toBe(1);
    expect(component.paisData.length).toBe(1);
    expect(component.transporteData.length).toBe(1);
    expect(component.aduanaData.length).toBe(1);
    expect(component.motivoData.length).toBe(1);
    expect(component.monedaData.length).toBe(1);
    expect(component.arancelariaData.length).toBe(1);
  });
});
