import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Solocitud130106Service } from '../../service/service130106.service';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;
  let mockSolocitudService: jest.Mocked<Solocitud130106Service>;

  const MOCK_STATE: ConsultaioState = {
    procedureId: '1',
    parameter: 'param',
    department: 'dep',
    folioTramite: 'FT-001',
    tipoDeTramite: 'Tipo A',
    estadoDeTramite: 'Activo',
    readonly: false,
    create: false,
    update: true,
    consultaioSolicitante: null,
  };

  const MOCK_RESPONSE = {
    regimen: 'A',
    clasificacion: 'B',
    solicitudDescripcion: 'desc',
    fraccion: '123',
    cantidad: '10',
    factura: 'fact001',
    umt: 'kg',
    mercanciaCantidad: '20',
    mercanciaFactura: 'fact002',
    descripcion: 'detalle',
    especifico: 'sí',
    justificacion: 'necesario',
    observaciones: 'ninguna',
    entidad: 'CDMX',
    representacion: 'legal',
    bloque: 'B1',
    disponible: 'sí',
    seleccionado: 'sí',
    solicitud: 'sol1',
    producto: 'producto1',
    selectRangoDias: ['2023-01-01', '2023-01-10'],
  };

  beforeEach(async () => {
    mockConsultaioQuery = {
      selectConsultaioState$: of(MOCK_STATE),
    } as unknown as jest.Mocked<ConsultaioQuery>;

    mockSolocitudService = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of(MOCK_RESPONSE)),
      actualizarEstadoFormulario: jest.fn(),
    } as unknown as jest.Mocked<Solocitud130106Service>;

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DatosComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: Solocitud130106Service, useValue: mockSolocitudService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(mockSolocitudService.getRegistroTomaMuestrasMercanciasData).toHaveBeenCalled();
    expect(mockSolocitudService.actualizarEstadoFormulario).toHaveBeenCalledWith(MOCK_RESPONSE);
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should set esDatosRespuesta to true when update is false', async () => {
    const readonlyState: ConsultaioState = { ...MOCK_STATE, update: false };

    const mockConsultaioQueryOverride = {
      selectConsultaioState$: of(readonlyState),
    } as unknown as jest.Mocked<ConsultaioQuery>;

    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DatosComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ConsultaioQuery, useValue: mockConsultaioQueryOverride },
        { provide: Solocitud130106Service, useValue: mockSolocitudService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component.esDatosRespuesta).toBe(true);
    expect(mockSolocitudService.getRegistroTomaMuestrasMercanciasData).not.toHaveBeenCalled();
  });

  it('should change the selected tab index', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

});
