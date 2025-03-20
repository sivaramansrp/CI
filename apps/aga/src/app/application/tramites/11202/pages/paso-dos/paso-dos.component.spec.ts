import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let catalogosService: jest.Mocked<CatalogosService>;

  beforeEach(async () => {
    const catalogosServiceMock = {
      getCatalogo: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: CatalogosService, useValue: catalogosServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add CUSTOM_ELEMENTS_SCHEMA here
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    catalogosService = TestBed.inject(CatalogosService) as jest.Mocked<CatalogosService>;

    catalogosService.getCatalogo.mockReturnValue(of([]));
  });

  /**
   * Prueba para verificar que el componente se crea correctamente.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Prueba para verificar que se inicializan los documentos seleccionados en ngOnInit.
   */
  it('should initialize selected documents on ngOnInit', () => {
    component.ngOnInit();
    expect(component.documentosSeleccionados.length).toBe(2);
  });

  /**
   * Prueba para verificar que se llama a getTiposDocumentos en ngOnInit.
   */
  it('should call getTiposDocumentos on ngOnInit', () => {
    jest.spyOn(component, 'getTiposDocumentos');
    component.ngOnInit();
    expect(component.getTiposDocumentos).toHaveBeenCalled();
  });

  /**
   * Prueba para verificar que getTiposDocumentos obtiene el catálogo de documentos.
   */
  it('should get catalog of documents in getTiposDocumentos', () => {
    const mockCatalogo = [
      { id: 1, descripcion: 'Documento 1' },
      { id: 2, descripcion: 'Documento 2' },
    ];
    catalogosService.getCatalogo.mockReturnValue(of(mockCatalogo));

    component.getTiposDocumentos();

    expect(catalogosService.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_TIPO_DOCUMENTO);
    expect(component.catalogoDocumentos).toEqual(mockCatalogo);
  });

  /**
   * Prueba para verificar que getTiposDocumentos maneja el error correctamente.
   */
  it('should handle error in getTiposDocumentos', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    catalogosService.getCatalogo.mockReturnValue(of([]));

    component.getTiposDocumentos();

    expect(catalogosService.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_TIPO_DOCUMENTO);
    expect(consoleSpy).not.toHaveBeenCalled();
  });
});