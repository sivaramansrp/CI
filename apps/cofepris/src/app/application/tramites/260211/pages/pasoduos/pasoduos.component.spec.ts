import { PasoduosComponent } from './pasoduos.component';
import { CATALOGOS_ID, CatalogosService, TEXTOS } from '@ng-mf/data-access-user';
import { of, throwError, Subject } from 'rxjs';

describe('PasoduosComponent', () => {
  let component: PasoduosComponent;
  let catalogosServiceMock: any;

  beforeEach(() => {
    catalogosServiceMock = {
      getCatalogo: jest.fn()
    };
    component = new PasoduosComponent(catalogosServiceMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have TEXTOS defined', () => {
    expect(component.TEXTOS).toBe(TEXTOS);
  });

  it('should populate catalogoDocumentos when getTiposDocumentos returns data', () => {
    const mockDocs = [{ id: 1, descripcion: 'Doc 1' }];
    catalogosServiceMock.getCatalogo.mockReturnValue(of(mockDocs));
    component.getTiposDocumentos();
    expect(catalogosServiceMock.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_TIPO_DOCUMENTO);
    expect(component.catalogoDocumentos).toEqual(mockDocs);
  });

  it('should not update catalogoDocumentos if response is empty', () => {
    catalogosServiceMock.getCatalogo.mockReturnValue(of([]));
    component.catalogoDocumentos = [{ id: 1, descripcion: 'Doc 1' }];
    component.getTiposDocumentos();
    expect(component.catalogoDocumentos).toEqual([{ id: 1, descripcion: 'Doc 1' }]);
  });

  it('should handle error in getTiposDocumentos gracefully', () => {
    catalogosServiceMock.getCatalogo.mockReturnValue(throwError(() => new Error('error')));
    expect(() => component.getTiposDocumentos()).not.toThrow();
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn<any, any>(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn<any, any>(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});