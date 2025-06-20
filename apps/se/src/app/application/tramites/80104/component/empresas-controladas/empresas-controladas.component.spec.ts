import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EmpresasControladasComponent } from './empresas-controladas.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NuevoProgramaIndustrialService } from '../../services/modalidad-albergue.service';

describe('EmpresasControladasComponent', () => {
  let component: EmpresasControladasComponent;
  let fixture: ComponentFixture<EmpresasControladasComponent>;
  let mockService: jest.Mocked<NuevoProgramaIndustrialService>;

  beforeEach(async () => {
    mockService = {
      obtenerListaEstado: jest.fn().mockReturnValue(
        of({
          code: 200,
          message: 'Success',
          data: [
            { id: 1, descripcion: 'Estado 1' },
            { id: 2, descripcion: 'Estado 2' },
          ],
        })
      ),
    } as any;

    await TestBed.configureTestingModule({
      imports: [EmpresasControladasComponent, HttpClientTestingModule],
      providers: [
        { provide: NuevoProgramaIndustrialService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresasControladasComponent);
    component = fixture.componentInstance;
    component.estadosCatalogo = [{ id: 1, descripcion: 'Inicial' }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize parentTablaConfig with correct headers', () => {
    expect(component.parentTablaConfig.length).toBeGreaterThan(0);
    expect(component.parentTablaConfig[0].encabezado).toBe('Calle');
  });

  it('should initialize estadosCatalogo from controladas.json', () => {
    expect(component.estadosCatalogo.length).toBeGreaterThan(0);
    expect(component.estadosCatalogo[0]).toHaveProperty('id');
    expect(component.estadosCatalogo[0]).toHaveProperty('descripcion');
  });

  it('should not update estadosCatalogo if response is falsy', () => {
    component.estadosCatalogo = [{ id: 1, descripcion: 'Inicial' }];
    mockService.obtenerListaEstado.mockReturnValue(
      of({ code: 204, message: 'No Content', data: [] })
    );
    component.obtenerListaEstado();
    expect(component.estadosCatalogo).toEqual([]);
  });

  it('should update estadosCatalogo from obtenerListaEstado()', () => {
    const mockResponse = {
      code: 200,
      message: 'Success',
      data: [
        { id: 1, descripcion: 'Estado 1' },
        { id: 2, descripcion: 'Estado 2' },
      ],
    };
    mockService.obtenerListaEstado.mockReturnValue(of(mockResponse));
    component.obtenerListaEstado();
    expect(mockService.obtenerListaEstado).toHaveBeenCalled();
    expect(component.estadosCatalogo).toEqual(mockResponse.data);
  });

  it('should clean up destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
