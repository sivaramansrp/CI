import { PasoDosComponent } from './PasoDos.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { of, throwError, Subject } from 'rxjs';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import documentList from '@libs/shared/theme/assets/json/220503/document-list.json';
import { INFO_ALERT } from '../../enums/texto-enum';
import { TEXTOS } from '@ng-mf/data-access-user';

jest.mock('@libs/shared/theme/assets/json/220503/document-list.json', () => ({
  documentosSeleccionados: [{ id: 1, nombre: 'Doc1' }]
}));

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let catalogosServiceMock: jest.Mocked<CatalogosService>;

  beforeEach(() => {
    catalogosServiceMock = {
      getCatalogo: jest.fn()
    } as any;
    component = new PasoDosComponent(catalogosServiceMock);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize TEXTOS and infoAlert', () => {
    expect(component.TEXTOS).toBe(TEXTOS);
    expect(component.infoAlert).toBe(INFO_ALERT);
  });

  it('should initialize documentosSeleccionados from JSON', () => {
    expect(component.documentosSeleccionados).toEqual(documentList.documentosSeleccionados);
  });

  it('should initialize catalogoDocumentos as an empty array', () => {
    expect(component.catalogoDocumentos).toEqual([]);
  });
  it('should call getTiposDocumentos on ngOnInit', () => {
    const spy = jest.spyOn(component, 'getTiposDocumentos');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
  
  it('should call getTiposDocumentos on initialization', () => {
    const spy = jest.spyOn(component, 'getTiposDocumentos');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
  it('should set catalogoDocumentos to an empty array if getTiposDocumentos returns no data', () => {
    catalogosServiceMock.getCatalogo.mockReturnValue(of([]));
    component.getTiposDocumentos();
    expect(component.catalogoDocumentos).toEqual([]);
    expect(catalogosServiceMock.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_TIPO_DOCUMENTO);
  });
  
  it('should set catalogoDocumentos when getTiposDocumentos returns data', () => {
    const mockCatalogo = [{ id: 1, descripcion: 'Tipo1' }];
    catalogosServiceMock.getCatalogo.mockReturnValue(of(mockCatalogo));
    component.getTiposDocumentos();
    expect(component.catalogoDocumentos).toEqual(mockCatalogo);
    expect(catalogosServiceMock.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_TIPO_DOCUMENTO);
  });

  it('should not set catalogoDocumentos when getTiposDocumentos returns empty array', () => {
    catalogosServiceMock.getCatalogo.mockReturnValue(of([]));
    component.catalogoDocumentos = [{ id: 1, descripcion: 'Tipo1' }];
    component.getTiposDocumentos();
    expect(component.catalogoDocumentos).toEqual([{ id: 1, nombre: 'Tipo1' }]);
  });

  it('should handle error in getTiposDocumentos', () => {
    const error = new Error('Test error');
    catalogosServiceMock.getCatalogo.mockReturnValue(throwError(() => error));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    component.getTiposDocumentos();
    expect(consoleSpy).toHaveBeenCalledWith('Error al obtener los tipos de documentos', error);
    consoleSpy.mockRestore();
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroy$, 'next');
    const completeSpy = jest.spyOn((component as any).destroy$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
  it('should initialize destroy$ as a Subject<void>', () => {
    expect((component as any).destroy$).toBeInstanceOf(Subject);
  });


});