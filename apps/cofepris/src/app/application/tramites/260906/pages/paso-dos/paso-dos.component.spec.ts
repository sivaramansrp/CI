import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoduosComponent } from './paso-dos.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('PasoduosComponent', () => {
  let component: PasoduosComponent;
  let fixture: ComponentFixture<PasoduosComponent>;
  let mockCatalogosService: jest.Mocked<CatalogosService>;

  beforeEach(async () => {
    mockCatalogosService = {
      getCatalogo: jest.fn(),
    } as unknown as jest.Mocked<CatalogosService>;

    await TestBed.configureTestingModule({
      declarations: [PasoduosComponent],
      providers: [{ provide: CatalogosService, useValue: mockCatalogosService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoduosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize TEXTOS with predefined values', () => {
    expect(component.TEXTOS).toBeDefined();
  });

  it('should initialize documentosSeleccionados with default values on ngOnInit', () => {
    const expectedDocuments = [
      { id: 1, descripcion: 'Documentos que amparen el valor de la mercancía' },
      { id: 2, descripcion: 'Documentos del medio de transporte (Guías, BL o carta porte según corresponda)' },
    ];
    expect(component.documentosSeleccionados).toEqual(expectedDocuments);
  });

  it('should call getCatalogo on getTiposDocumentos and populate catalogoDocumentos', () => {
    const mockResponse = [
      { id: 3, descripcion: 'Documento de prueba 1' },
      { id: 4, descripcion: 'Documento de prueba 2' },
    ];
    mockCatalogosService.getCatalogo.mockReturnValue(of(mockResponse));

    component.getTiposDocumentos();

    expect(mockCatalogosService.getCatalogo).toHaveBeenCalledWith('CAT_TIPO_DOCUMENTO');
    expect(component.catalogoDocumentos).toEqual(mockResponse);
  });

  it('should handle empty response from getCatalogo', () => {
    mockCatalogosService.getCatalogo.mockReturnValue(of([]));

    component.getTiposDocumentos();

    expect(component.catalogoDocumentos).toEqual([]);
  });

  it('should handle error in getCatalogo gracefully', () => {
    mockCatalogosService.getCatalogo.mockReturnValue(throwError(() => new Error('Error fetching catalog')));

    expect(() => component.getTiposDocumentos()).not.toThrow();
    expect(component.catalogoDocumentos).toEqual([]);
  });

  it('should not modify catalogoDocumentos if getCatalogo returns undefined', () => {
    mockCatalogosService.getCatalogo.mockReturnValue(of(undefined as unknown as any[]));

    component.getTiposDocumentos();

    expect(component.catalogoDocumentos).toEqual([]);
  });

  it('should call getTiposDocumentos on ngOnInit', () => {
    jest.spyOn(component, 'getTiposDocumentos');
    component.ngOnInit();
    expect(component.getTiposDocumentos).toHaveBeenCalled();
  });

  it('should render the correct number of selected documents', () => {
    const documentElements = fixture.debugElement.queryAll(By.css('.document-class')); // Replace with actual class
    expect(documentElements.length).toBe(component.documentosSeleccionados.length);
  });
});
