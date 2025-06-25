import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpresasTerciarizadaasComponent } from './empresas-terciarizadaas.component';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EmpresasComponent } from '../../../../shared/components/empresas/empresas.component';
import { NuevoProgramaIndustrialService } from '../../services/modalidad-albergue.service';

describe('EmpresasTerciarizadaasComponent', () => {
  let component: EmpresasTerciarizadaasComponent;
  let fixture: ComponentFixture<EmpresasTerciarizadaasComponent>;
  let mockService: jest.Mocked<NuevoProgramaIndustrialService>;

  const MOCK_CATALOG_RESPONSE = {
    data: [
      { id: 1, descripcion: 'Jalisco' },
      { id: 2, descripcion: 'CDMX' }
    ]
  };

  beforeEach(async () => {
    mockService = {
      obtenerListaEstado: jest.fn().mockReturnValue(of(MOCK_CATALOG_RESPONSE))
    } as any;

    await TestBed.configureTestingModule({
      imports: [CommonModule, EmpresasComponent],
      providers: [
        { provide: NuevoProgramaIndustrialService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresasTerciarizadaasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar la tabla de configuración con los encabezados correctos', () => {
    expect(component.parentTablaConfig.length).toBe(11);
    expect(component.parentTablaConfig[0].encabezado).toBe('Calle');
    expect(component.parentTablaConfig[10].encabezado).toBe('Razón social');
  });

  it('debe cargar el catálogo de estados al llamar obtenerListaEstado', () => {
    component.obtenerListaEstado();
    expect(mockService.obtenerListaEstado).toHaveBeenCalled();
    expect(component.estadosCatalogo).toEqual(MOCK_CATALOG_RESPONSE.data);
  });

  it('debe limpiar correctamente los observables en ngOnDestroy', () => {
    const spyNext = jest.spyOn(component['destroyNotifier$'], 'next');
    const spyComplete = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
