import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let catalogosServiceMock: any;

  beforeEach(async () => {
    catalogosServiceMock = {
      getCatalogo: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      providers: [{ provide: CatalogosService, useValue: catalogosServiceMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getTiposDocumentos on initialization', () => {
      jest.spyOn(component, 'getTiposDocumentos');
      component.ngOnInit();
      expect(component.getTiposDocumentos).toHaveBeenCalled();
    });
  });

  describe('getTiposDocumentos', () => {
    it('should fetch catalogoDocumentos successfully', () => {
      const mockResponse = [
        { id: 1, descripcion: 'Documento 1' },
        { id: 2, descripcion: 'Documento 2' },
      ];
      catalogosServiceMock.getCatalogo.mockReturnValue(of(mockResponse));

      component.getTiposDocumentos();

      expect(catalogosServiceMock.getCatalogo).toHaveBeenCalledWith('CAT_TIPO_DOCUMENTO');
      expect(component.catalogoDocumentos).toEqual(mockResponse);
    });

    it('should handle error when fetching catalogoDocumentos', () => {
      catalogosServiceMock.getCatalogo.mockReturnValue(throwError(() => new Error('Error fetching catalog')));

      component.getTiposDocumentos();

      expect(catalogosServiceMock.getCatalogo).toHaveBeenCalledWith('CAT_TIPO_DOCUMENTO');
      expect(component.catalogoDocumentos).toEqual([]);
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete the destroyed$ subject on ngOnDestroy', () => {
      const nextSpy = jest.spyOn(component['destroyed$'], 'next');
      const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalledWith(true);
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});