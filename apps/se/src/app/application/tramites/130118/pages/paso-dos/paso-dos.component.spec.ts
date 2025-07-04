import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let catalogosServiceMock: any;
  let importacionPlafestServiceMock: any;

  beforeEach(async () => {
    catalogosServiceMock = {
      getCatalogo: jest.fn()
    };

    importacionPlafestServiceMock = {
      obtenerDocumentosSeleccionados: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: CatalogosService, useValue: catalogosServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties correctly', () => {
    expect(component.TEXTOS).toBeDefined();
    expect(component.infoAlert).toBe('alert-info');
    expect(component.catalogoDocumentos).toEqual([]);
    expect(component.documentosSeleccionados).toEqual([]);
  });

  describe('ngOnInit', () => {
    it('should call getTiposDocumentos and obtenerDocumentosSeleccionados', () => {
      const mockCatalogoData = [{ id: 1, descripcion: 'Doc 1' }];

    catalogosServiceMock.getCatalogo.mockReturnValue(of(mockCatalogoData));

    component.ngOnInit();

    expect(component.catalogoDocumentos).toEqual(mockCatalogoData);
    expect(catalogosServiceMock.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_TIPO_DOCUMENTO);
    });
  });

  describe('getTiposDocumentos', () => {
    it('should set catalogoDocumentos when service returns data', () => {
      const mockData = [{ id: 1, descripcion: 'Documento 1' }];
      catalogosServiceMock.getCatalogo.mockReturnValue(of(mockData));

      component.getTiposDocumentos();

      expect(catalogosServiceMock.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_TIPO_DOCUMENTO);
      expect(component.catalogoDocumentos).toEqual(mockData);
    });

    it('should not set catalogoDocumentos if response is empty', () => {
      catalogosServiceMock.getCatalogo.mockReturnValue(of([]));
      component.getTiposDocumentos();
      expect(component.catalogoDocumentos).toEqual([]);
    });
  });

 
});