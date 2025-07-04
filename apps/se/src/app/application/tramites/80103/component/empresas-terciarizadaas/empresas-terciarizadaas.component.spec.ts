import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpresasTerciarizadaasComponent } from './empresas-terciarizadaas.component';
import { NuevoProgramaIndustrialService } from '../../services/modalidad-albergue.service';
import { of, Subject } from 'rxjs';
import { DisponsibleFiscal } from '../../../../shared/models/empresas.model';

describe('EmpresasTerciarizadaasComponent', () => {
  let component: EmpresasTerciarizadaasComponent;
  let fixture: ComponentFixture<EmpresasTerciarizadaasComponent>;
  let mockService: jest.Mocked<NuevoProgramaIndustrialService>;

  const MOCK_ESTADOS = {
    code: 200,
    message: 'OK',
    data: [
      { id: 1, descripcion: 'CDMX' },
      { id: 2, descripcion: 'Jalisco' },
    ]
  };

  beforeEach(async () => {
    mockService = {
      obtenerListaEstado: jest.fn(),
    } as unknown as jest.Mocked<NuevoProgramaIndustrialService>;

    await TestBed.configureTestingModule({
      imports: [EmpresasTerciarizadaasComponent],
      providers: [
        { provide: NuevoProgramaIndustrialService, useValue: mockService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresasTerciarizadaasComponent);
    component = fixture.componentInstance;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe llamar obtenerListaEstado y actualizar estadosCatalogo', () => {
    mockService.obtenerListaEstado.mockReturnValue(of(MOCK_ESTADOS));

    component.obtenerListaEstado();

    expect(mockService.obtenerListaEstado).toHaveBeenCalled();
    expect(component.estadosCatalogo).toEqual(MOCK_ESTADOS.data);
  });

  it('no debe actualizar estadosCatalogo si response es falsy', () => {
    mockService.obtenerListaEstado.mockReturnValue(of(null as any));

    component.obtenerListaEstado();

    expect(mockService.obtenerListaEstado).toHaveBeenCalled();
    expect(component.estadosCatalogo).toEqual([]);
  });

  it('debe completar destroyNotifier$ en ngOnDestroy', () => {
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('debe tener configuración de columnas completa y ordenada', () => {
    expect(component.parentTablaConfig.length).toBeGreaterThan(0);
    expect(component.parentTablaConfig[0].encabezado).toBeDefined();
    expect(typeof component.parentTablaConfig[0].clave).toBe('function');
  });
});
