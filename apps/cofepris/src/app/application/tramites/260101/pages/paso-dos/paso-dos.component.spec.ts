import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService, CATALOGOS_ID, TEXTOS, Catalogo, AlertComponent, AnexarDocumentosComponent, TituloComponent } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let catalogosServiceMock: jest.Mocked<CatalogosService>;

  beforeEach(() => {
    catalogosServiceMock = {
      getCatalogo: jest.fn().mockReturnValue(of([])),
    } as any;
    component = new PasoDosComponent(catalogosServiceMock);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize TEXTOS property', () => {
    expect(component.TEXTOS).toBe(TEXTOS);
  });

  it('should have infoAlert as "alert-info"', () => {
    expect(component.infoAlert).toBe('alert-info');
  });

  it('should call getTiposDocumentos in constructor', () => {
    expect(catalogosServiceMock.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_TIPO_DOCUMENTO);
  });

  it('should set documentosSeleccionados on ngOnInit', () => {
    component.documentosSeleccionados = [];
    component.ngOnInit();
    expect(component.documentosSeleccionados.length).toBe(2);
    expect(component.documentosSeleccionados[0].id).toBe(1);
    expect(component.documentosSeleccionados[1].id).toBe(2);
  });

  it('should update catalogoDocumentos when getTiposDocumentos receives data', (done) => {
    const mockDocs: Catalogo[] = [
      { id: 10, descripcion: 'Doc 1' },
      { id: 11, descripcion: 'Doc 2' }
    ];
    catalogosServiceMock.getCatalogo.mockReturnValueOnce(of(mockDocs));
    component.getTiposDocumentos();
    setTimeout(() => {
      expect(component.catalogoDocumentos).toEqual(mockDocs);
      done();
    }, 0);
  });

  it('should not update catalogoDocumentos if respuesta is empty', (done) => {
    catalogosServiceMock.getCatalogo.mockReturnValueOnce(of([]));
    component.catalogoDocumentos = [{ id: 99, descripcion: 'Existing' }];
    component.getTiposDocumentos();
    setTimeout(() => {
      expect(component.catalogoDocumentos).toEqual([{ id: 99, descripcion: 'Existing' }]);
      done();
    }, 0);
  });
});

// Import standalone components for completeness (even if not used directly in tests)
AlertComponent;
AnexarDocumentosComponent;
TituloComponent;