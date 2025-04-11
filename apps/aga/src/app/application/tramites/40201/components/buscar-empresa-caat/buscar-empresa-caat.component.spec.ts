import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { BuscarEmpresaCaatComponent } from './buscar-empresa-caat.component';
import { Tramite40201Store } from '../../../../core/estados/tramites/tramite40201.store';
import { Tramite40201Query } from '../../../../core/queries/tramite40201.query';
import { TransportacionMaritimaService } from '../../services/transportacion-maritima/transportacion-maritima.service';

describe('BuscarEmpresaCaatComponent', () => {
  let component: BuscarEmpresaCaatComponent;
  let tramite40201StoreMock: jest.Mocked<Tramite40201Store>;
  let tramite40201QueryMock: jest.Mocked<Tramite40201Query>;
  let transportacionMaritimaServiceMock: jest.Mocked<TransportacionMaritimaService>;

  beforeEach(() => {
    tramite40201StoreMock = {
      setCaatRegistradoEmpresaTabla: jest.fn(),
      setBuscarPorDenominacionEx: jest.fn(),
      setFolioCaatBusquedaEx: jest.fn(),
      setBuscarPorRFCNa: jest.fn(),
      setBuscarPorDenominacionNa: jest.fn(),
      setFolioCaatBusquedaNa: jest.fn(),
    } as unknown as jest.Mocked<Tramite40201Store>;

    tramite40201QueryMock = {
      selectSeccionState$: of({
        caatRegistradoEmpresaTabla: [],
        tipoDeEmpresaOpcion: 'nacional',
        buscarPorRFCNa: '',
        buscarPorDenominacionNa: '',
        folioCaatBusquedaNa: '',
        buscarPorDenominacionEx: '',
        folioCaatBusquedaEx: '',
      }),
    } as unknown as jest.Mocked<Tramite40201Query>;

    transportacionMaritimaServiceMock = {
      obtenerBuscarEmpresaCaat: jest.fn().mockReturnValue(of({ data: [] })),
    } as unknown as jest.Mocked<TransportacionMaritimaService>;

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BuscarEmpresaCaatComponent],
      providers: [
        FormBuilder,
        { provide: Tramite40201Store, useValue: tramite40201StoreMock },
        { provide: Tramite40201Query, useValue: tramite40201QueryMock },
        { provide: TransportacionMaritimaService, useValue: transportacionMaritimaServiceMock },
      ],
    });

    const fixture = TestBed.createComponent(BuscarEmpresaCaatComponent);
    component = fixture.componentInstance;

    const fb = TestBed.inject(FormBuilder);
    component.buscarEmpresaForm = fb.group({
      tipoDeEmpresaNacional: fb.group({
        buscarPorRFCNa: [''],
        buscarPorDenominacionNa: [''],
        folioCaatBusquedaNa: [''],
      }),
      tipoDeEmpresaExtranjera: fb.group({
        buscarPorDenominacionEx: [''],
        folioCaatBusquedaEx: [''],
      }),
    });

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.buscarEmpresaForm).toBeDefined();
    expect(component.tipoDeEmpresaNacional).toBeDefined();
    expect(component.tipoDeEmpresaExtranjera).toBeDefined();
  });

  it('should reset form fields and store values on limpiarCampos', () => {
    component.limpiarCampos();
    expect(tramite40201StoreMock.setCaatRegistradoEmpresaTabla).toHaveBeenCalledWith([]);
    expect(tramite40201StoreMock.setBuscarPorDenominacionEx).toHaveBeenCalledWith(null);
    expect(tramite40201StoreMock.setFolioCaatBusquedaEx).toHaveBeenCalledWith(null);
    expect(tramite40201StoreMock.setBuscarPorRFCNa).toHaveBeenCalledWith(null);
    expect(tramite40201StoreMock.setBuscarPorDenominacionNa).toHaveBeenCalledWith(null);
    expect(tramite40201StoreMock.setFolioCaatBusquedaNa).toHaveBeenCalledWith(null);
  });

  it('should call limpiarCampos and obtenerBuscarEmpresaCaat on buscarEmpresa', () => {
    jest.spyOn(component, 'limpiarCampos');
    jest.spyOn(component, 'obtenerBuscarEmpresaCaat');
    component.buscarEmpresa();
    expect(component.limpiarCampos).toHaveBeenCalled();
    expect(component.obtenerBuscarEmpresaCaat).toHaveBeenCalled();
  });

  it('should set vista and call limpiarCampos on enCambioDeValor', () => {
    jest.spyOn(component, 'limpiarCampos');
    component.enCambioDeValor('extranjera');
    expect(component.vista).toBe('extranjera');
    expect(component.limpiarCampos).toHaveBeenCalled();
  });

  it('should fetch CAAT data and update the table on obtenerBuscarEmpresaCaat', () => {
    const mockData = [
      {
        rfc: 'RFC123',
        nombreDenominacionRazonSocial: 'Empresa 1',
        caat: 'CAAT123',
        perfilCaat: 'Perfil 1',
        inicioVigencia: '2025-01-01',
        finVigencia: '2025-12-31',
        pais: 'México',
      },
    ];
    transportacionMaritimaServiceMock.obtenerBuscarEmpresaCaat.mockReturnValue(of({ code: 200, data: mockData, message: 'Success' }));

    component.obtenerBuscarEmpresaCaat();

    expect(component.caatRegistradoEmpresaTabla).toEqual([
      {
        rfc: 'RFC123',
        nombreDenominacionRazonSocial: 'Empresa 1',
        caat: 'CAAT123',
        perfilCaat: 'Perfil 1',
        inicioVigencia: '2025-01-01',
        finVigencia: '2025-12-31',
        pais: 'México',
      },
    ]);
    expect(tramite40201StoreMock.setCaatRegistradoEmpresaTabla).toHaveBeenCalledWith([
      {
        rfc: 'RFC123',
        nombreDenominacionRazonSocial: 'Empresa 1',
        caat: 'CAAT123',
        perfilCaat: 'Perfil 1',
        inicioVigencia: '2025-01-01',
        finVigencia: '2025-12-31',
        pais: 'México',
      },
    ]);
  });

  it('should set values in the store using setValoresStore', () => {
    const mockForm = component.tipoDeEmpresaNacional;
    mockForm.get('buscarPorRFCNa')?.setValue('RFC123');
    component.setValoresStore(mockForm, 'buscarPorRFCNa', 'setBuscarPorRFCNa');
    expect(tramite40201StoreMock.setBuscarPorRFCNa).toHaveBeenCalledWith('RFC123');
  });

  it('should complete destruirNotificador$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destruirNotificador$'], 'next');
    const completeSpy = jest.spyOn(component['destruirNotificador$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});