import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriterioDeDictamenComponent } from './criterio-de-dictamen.component';
import { of } from 'rxjs';
import { ImportacionDefinitivaService } from '@libs/shared/data-access-user/src/core/services/130103/importacion-definitiva.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

describe('CriterioDeDictamenComponent', () => {
  let component: CriterioDeDictamenComponent;
  let fixture: ComponentFixture<CriterioDeDictamenComponent>;
  let mockService: jest.Mocked<ImportacionDefinitivaService>;
  const storeMock = {
    setDynamicFieldValue: jest.fn()
  };
  beforeEach(async () => {
    
    mockService = {
      getSolicitudMercancia: jest.fn(),
    } as unknown as jest.Mocked<ImportacionDefinitivaService>;
    mockService.getSolicitudMercancia.mockReturnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [CriterioDeDictamenComponent],
      providers: [{ provide: ImportacionDefinitivaService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CriterioDeDictamenComponent);
    component = fixture.componentInstance;
    component.criterioDeDictamenFormData = [];
    const mockFormGroup = new FormGroup({
      criterio_de_dictamen: new FormControl('')
    });
  
    jest.spyOn(component as any, 'ninoFormGroup', 'get').mockReturnValue(mockFormGroup);
    component.consultaState = {
      readonly: false,
    } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate opciones if campo exists and opciones is undefined', () => {
    const mockResponse = [
      { id: 1, descripcion: 'Item 1' },
      { id: 2, descripcion: 'Item 2' },
    ];
    const mockField = {
      id: '1',
      labelNombre: 'Label 1',
      campo: 'solicitud_mercancia',
      clase: 'clase-1',
      tipoInput: 'text',
      desactivado: false,
      soloLectura: false,
      validadores: [{ tipo: 'required' }],
      marcadorDePosicion: 'Placeholder',
      marginTop: 10,
      opciones: undefined,
    };
    component.criterioDeDictamenFormData = [mockField];
    mockService.getSolicitudMercancia.mockReturnValue(of(mockResponse));
    component.obtenerSolictudMercancia();
    expect(mockService.getSolicitudMercancia).toHaveBeenCalled();
    expect(mockField.opciones).toEqual([
      { id: 1, descripcion: 'Item 1' },
      { id: 2, descripcion: 'Item 2' },
    ]);
  });

  it('should do nothing if campo does not exist', () => {
    const nonMatchingField = {
      id: '2',
      labelNombre: 'Label 2',
      campo: 'otro_campo',
      clase: 'clase-2',
      tipoInput: 'text',
      desactivado: false,
      soloLectura: false,
      validadores: [{ tipo: 'required' }],
      marcadorDePosicion: 'Placeholder 2',
      marginTop: 5,
      opciones: undefined,
    };
    component.criterioDeDictamenFormData = [nonMatchingField];
    mockService.getSolicitudMercancia.mockReturnValue(of([]));
    component.obtenerSolictudMercancia();
    expect(mockService.getSolicitudMercancia).toHaveBeenCalled();
  });

  it('should not overwrite opciones if already defined', () => {
    const existingOptions = [{ id: 999, descripcion: 'Existente' }];
    const mockField = {
      id: '1',
      labelNombre: 'Label 1',
      campo: 'solicitud_mercancia',
      clase: 'clase-1',
      tipoInput: 'text',
      desactivado: false,
      soloLectura: false,
      validadores: [{ tipo: 'required' }],
      marcadorDePosicion: 'Placeholder',
      marginTop: 10,
      opciones: existingOptions,
    };
    component.criterioDeDictamenFormData = [mockField];
    mockService.getSolicitudMercancia.mockReturnValue(
      of([{ id: 1, descripcion: 'Nuevo' }])
    );
    component.obtenerSolictudMercancia();
    expect(mockField.opciones).toBe(existingOptions);
  });

  it('should not throw if solicitud_mercancia field is missing', () => {
    component.criterioDeDictamenFormData = [];
    expect(() => component.obtenerSolictudMercancia()).not.toThrow();
  });

  it('should call next and complete on destroyNotifier$', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });  
  
});