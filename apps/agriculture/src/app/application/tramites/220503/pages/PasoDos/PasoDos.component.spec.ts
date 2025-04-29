import { TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './PasoDos.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { of, throwError } from 'rxjs';
import {
  CATALOGOS_ID,
  AnexarDocumentosComponent,
  TituloComponent,
  AlertComponent,
} from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let catalogosServiceMock: jest.Mocked<CatalogosService>;

  beforeEach(async () => {
    catalogosServiceMock = {
      getCatalogo: jest.fn(),
    } as unknown as jest.Mocked<CatalogosService>;

    await TestBed.configureTestingModule({
      imports: [
        PasoDosComponent,
        ReactiveFormsModule,
        AnexarDocumentosComponent,
        TituloComponent,
        AlertComponent,
      ],
      providers: [
        { provide: CatalogosService, useValue: catalogosServiceMock },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tiposDocumentos as an empty array', () => {
    expect(component.tiposDocumentos).toEqual([]);
  });

  it('should call getTiposDocumentos on ngOnInit', () => {
    const getTiposDocumentosSpy = jest.spyOn(component, 'getTiposDocumentos');
    component.ngOnInit();
    expect(getTiposDocumentosSpy).toHaveBeenCalled();
  });

  it('should populate catalogoDocumentos on successful getCatalogo call', () => {
    const mockResponse = [{ id: 1, nombre: 'Documento 1' }];
    catalogosServiceMock.getCatalogo = jest
      .fn()
      .mockReturnValue(of(mockResponse));

    component.getTiposDocumentos();

    expect(catalogosServiceMock.getCatalogo).toHaveBeenCalledWith(
      CATALOGOS_ID.CAT_TIPO_DOCUMENTO
    );
    expect(component.catalogoDocumentos).toEqual(mockResponse);
  });

  it('should handle error when getCatalogo fails', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    catalogosServiceMock.getCatalogo.mockReturnValue(
      throwError(() => new Error('Error'))
    );

    component.getTiposDocumentos();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error al obtener los tipos de documentos',
      expect.any(Error)
    );
    expect(component.catalogoDocumentos).toEqual([]);
    consoleSpy.mockRestore();
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
