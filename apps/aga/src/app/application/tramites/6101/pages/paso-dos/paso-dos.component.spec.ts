import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService } from '@libs/shared/data-access-user/src';
import { CATALOGOS_ID } from '@libs/shared/data-access-user/src';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let mockCatalogosService: jest.Mocked<CatalogosService>;

  beforeEach(async () => {
    mockCatalogosService = {
      getCatalogo: jest.fn(),
    } as unknown as jest.Mocked<CatalogosService>;

    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      providers: [
        { provide: CatalogosService, useValue: mockCatalogosService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize TEXTOS with the imported TEXTOS constant', () => {
    expect(component.TEXTOS).toBeDefined();
  });

  it('should call getTiposDocumentos on ngOnInit', () => {
    const spy = jest.spyOn(component, 'getTiposDocumentos');
  
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should populate catalogoDocumentos when getTiposDocumentos is called and service returns data', () => {
    const mockCatalogo: Catalogo[] = [{ id: 1, descripcion: 'Documento 1' }];
    mockCatalogosService.getCatalogo.mockReturnValue(of(mockCatalogo));

    component.getTiposDocumentos();

    expect(mockCatalogosService.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_TIPO_DOCUMENTO);
    expect(component.catalogoDocumentos).toEqual(mockCatalogo);
  });

  it('should not populate catalogoDocumentos when getTiposDocumentos is called and service returns an empty array', () => {
    mockCatalogosService.getCatalogo.mockReturnValue(of([]));

    component.getTiposDocumentos();

    expect(mockCatalogosService.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_TIPO_DOCUMENTO);
    expect(component.catalogoDocumentos).toEqual([]);
  });
});