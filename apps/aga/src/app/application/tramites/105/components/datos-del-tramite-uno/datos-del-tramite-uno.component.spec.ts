import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelTramiteUnoComponent } from './datos-del-tramite-uno.component';
import { InvoCarService } from '../../services/invocar.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('DatosDelTramiteUnoComponent', () => {
  let component: DatosDelTramiteUnoComponent;
  let fixture: ComponentFixture<DatosDelTramiteUnoComponent>;
  let mockInvoCarService: any;

  beforeEach(async () => {
    mockInvoCarService = {
      getPais: jest.fn(),
      getEntidadFederativa: jest.fn(),
      getMunicipioDelegacion: jest.fn(),
      getColonia: jest.fn(),
      getAduana: jest.fn(),
      getFraccionArancelariaOptions: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DatosDelTramiteUnoComponent],
      providers: [
        { provide: InvoCarService, useValue: mockInvoCarService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTramiteUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería obtener el catálogo de países y asignarlo', () => {
    const mockResponse = { code: 200, data: [{ id: 1, nombre: 'México' }] };
    mockInvoCarService.getPais.mockReturnValue(of(mockResponse));
    component.getPais();
    expect(mockInvoCarService.getPais).toHaveBeenCalled();
    expect(component.pais).toEqual(mockResponse.data);
  });

  it('debería obtener el catálogo de entidades federativas y asignarlo', () => {
    const mockResponse = { code: 200, data: [{ id: 1, nombre: 'CDMX' }] };
    mockInvoCarService.getEntidadFederativa.mockReturnValue(of(mockResponse));
    component.getEntidadFederativa();
    expect(mockInvoCarService.getEntidadFederativa).toHaveBeenCalled();
    expect(component.entidadFederativa).toEqual(mockResponse.data);
  });

  it('debería obtener el catálogo de municipios o delegaciones y asignarlo', () => {
    const mockResponse = { code: 200, data: [{ id: 1, nombre: 'Benito Juárez' }] };
    mockInvoCarService.getMunicipioDelegacion.mockReturnValue(of(mockResponse));
    component.getMunicipioDelegacion();
    expect(mockInvoCarService.getMunicipioDelegacion).toHaveBeenCalled();
    expect(component.municipioDelegacion).toEqual(mockResponse.data);
  });

  it('debería obtener el catálogo de colonias y asignarlo', () => {
    const mockResponse = { code: 200, data: [{ id: 1, nombre: 'Centro' }] };
    mockInvoCarService.getColonia.mockReturnValue(of(mockResponse));
    component.getColonia();
    expect(mockInvoCarService.getColonia).toHaveBeenCalled();
    expect(component.colonia).toEqual(mockResponse.data);
  });

  it('debería obtener el catálogo de aduanas y asignarlo', () => {
    const mockResponse = { code: 200, data: [{ id: 1, nombre: 'Aduana 1' }] };
    mockInvoCarService.getAduana.mockReturnValue(of(mockResponse));
    component.getAduana();
    expect(mockInvoCarService.getAduana).toHaveBeenCalled();
    expect(component.aduana).toEqual(mockResponse.data);
  });

  it('debería obtener el catálogo de fracciones arancelarias y asignarlo', () => {
    const mockResponse = { code: 200, data: [{ id: 1, nombre: 'Fracción 1' }] };
    mockInvoCarService.getFraccionArancelariaOptions.mockReturnValue(of(mockResponse));
    component.getFraccionArancelariae();
    expect(mockInvoCarService.getFraccionArancelariaOptions).toHaveBeenCalled();
    expect(component.fraccionArancelaria).toEqual(mockResponse.data);
  });
});