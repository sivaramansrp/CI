import { PasoDosComponent } from './PasoDos.component';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogosService, TituloComponent, TramiteFolioService } from '@ng-mf/data-access-user';
import { of, throwError, Subject } from 'rxjs';
import rawDocumentList from '@libs/shared/theme/assets/json/32301/document-list.json';

const documentList = {
  documentosSeleccionados: rawDocumentList?.documentosSeleccionados ?? []
};
import { CATALOGOS_ID, TEXTOS } from '@ng-mf/data-access-user';
import { TestBed } from '@angular/core/testing';
import { PasoTresComponent } from '../paso-tres/PasoTres.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TramiteAgaceStore } from '../../../../estados/tramite.store';
import { Router } from '@angular/router';

jest.mock('@ng-mf/data-access-user', () => ({
  ...jest.requireActual('@ng-mf/data-access-user'),
  CatalogosService: jest.fn().mockImplementation(() => ({
    getCatalogo: jest.fn(),
  })),
}));

const mockTramiteStore = {
  // Add any mocked methods or properties as needed for your tests
};

const mockTramiteFolioService = {
  // Add any mocked methods or properties as needed for your tests
};

const mockRouter = {
  navigate: jest.fn(),
  navigateByUrl: jest.fn(),
  // Add other Router methods as needed for your tests
};

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let catalogosServiceMock: jest.Mocked<CatalogosService>;

  beforeEach(async () => {
    catalogosServiceMock = new (CatalogosService as any)() as jest.Mocked<CatalogosService>;
    component = new PasoDosComponent(catalogosServiceMock);

    await TestBed.configureTestingModule({
      imports: [PasoDosComponent, CommonModule, ReactiveFormsModule, AnexarDocumentosComponent, TituloComponent, AlertComponent, HttpClientTestingModule, ToastrModule.forRoot()],
        providers: [
              ToastrService,
              { provide: Router, useValue: mockRouter },
              { provide: TramiteAgaceStore, useValue: mockTramiteStore },
              { provide: TramiteFolioService, useValue: mockTramiteFolioService }
            ]
    }).compileComponents();
  });
  

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize catalogoDocumentos as an empty array', () => {
    expect(component.catalogoDocumentos).toEqual([]);
  });


  it('should initialize TEXTOS', () => {
    expect(component.TEXTOS).toBe(TEXTOS);
  });

  it('should initialize infoAlert with "alert-info"', () => {
    expect(component.infoAlert).toBe('alert-info');
  });

  it('should initialize documentosSeleccionados from documentList', () => {
    const expected = documentList.documentosSeleccionados ?? [];
    expect(component.documentosSeleccionados).toEqual(expected);
  });

 
  it('should call getTiposDocumentos on ngOnInit', () => {
    const spy = jest.spyOn(component, 'getTiposDocumentos');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should set catalogoDocumentos when getTiposDocumentos returns data', () => {
    const mockCatalogo = [{ id: 1, descripcion: 'Doc1' }];
    catalogosServiceMock.getCatalogo.mockReturnValue(of(mockCatalogo));
    component.getTiposDocumentos();
    expect(component.catalogoDocumentos).toEqual(mockCatalogo);
  });

  it('should not set catalogoDocumentos when getTiposDocumentos returns empty array', () => {
    catalogosServiceMock.getCatalogo.mockReturnValue(of([]));
    component.catalogoDocumentos = [{ id: 1, descripcion: 'Doc1' }];
    component.getTiposDocumentos();
    expect(component.catalogoDocumentos).toEqual([{ id: 1, descripcion: 'Doc1' }]);
  });

  it('should handle error in getTiposDocumentos', () => {
    const error = new Error('Test error');
    catalogosServiceMock.getCatalogo.mockReturnValue(throwError(() => error));
    jest.spyOn(console, 'error').mockImplementation(() => {});
    component.getTiposDocumentos();
    expect(console.error).toHaveBeenCalledWith('Error al obtener los tipos de documentos', error);
    (console.error as jest.Mock).mockRestore();
  });

it('should call catalogosServices.getCatalogo with correct CATALOGOS_ID in getTiposDocumentos', () => {
  catalogosServiceMock.getCatalogo.mockReturnValue(of([]));
  component.getTiposDocumentos();
  expect(catalogosServiceMock.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_TIPO_DOCUMENTO);
});



it('should not set catalogoDocumentos if response is undefined', () => {
  catalogosServiceMock.getCatalogo.mockReturnValue(of(undefined as any));
  component.catalogoDocumentos = [{ id: 1, descripcion: 'Doc1' }];
  component.getTiposDocumentos();
  expect(component.catalogoDocumentos).toEqual([{ id: 1, descripcion: 'Doc1' }]);
});

it('should not set catalogoDocumentos if response is null', () => {
  catalogosServiceMock.getCatalogo.mockReturnValue(of(null as any));
  component.catalogoDocumentos = [{ id: 1, descripcion: 'Doc1' }];
  component.getTiposDocumentos();
  expect(component.catalogoDocumentos).toEqual([{ id: 1, descripcion: 'Doc1' }]);
});

it('should not throw if destroy$ is called multiple times', () => {
  expect(() => {
    component.ngOnDestroy();
    component.ngOnDestroy();
  }).not.toThrow();
});
});