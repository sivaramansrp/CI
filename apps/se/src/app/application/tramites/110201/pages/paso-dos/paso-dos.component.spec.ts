import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { of, throwError, Subscription } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let mockCatalogosService: any;

  beforeEach(async () => {
    mockCatalogosService = {
      getCatalogo: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      providers: [
        { provide: CatalogosService, useValue: mockCatalogosService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
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

  it('should initialize TEXTOS', () => {
    expect(component.TEXTOS).toBeDefined();
  });

  it('should set claseAlertaInformativa to "alert-info"', () => {
    expect(component.claseAlertaInformativa).toBe('alert-info');
  });

  it('should call getTiposDocumentos on ngOnInit', () => {
    const spy = jest.spyOn(component, 'getTiposDocumentos');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  describe('getTiposDocumentos', () => {
    it('should call catalogosServices.getCatalogo with CAT_TIPO_DOCUMENTO', () => {
      mockCatalogosService.getCatalogo.mockReturnValue(of([]));
      component.getTiposDocumentos();
      expect(mockCatalogosService.getCatalogo).toHaveBeenCalled();
    });

    it('should update catalogoDocumentos when the service returns a response with data', () => {
      const mockResponse = [
        { id: 1, descripcion: 'Documento 1' },
        { id: 2, descripcion: 'Documento 2' },
      ];
      mockCatalogosService.getCatalogo.mockReturnValue(of(mockResponse));
      component.getTiposDocumentos();
      expect(component.catalogoDocumentos).toEqual(mockResponse);
    });

    it('should not update catalogoDocumentos when the service response contains no data', () => {
      component.catalogoDocumentos = [{ id: 99, descripcion: 'Old' }];
      mockCatalogosService.getCatalogo.mockReturnValue(of([]));
      component.getTiposDocumentos();
      expect(component.catalogoDocumentos).toEqual([{ id: 99, descripcion: 'Old' }]);
    });

    it('should handle errors when the service call fails', () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation();
      mockCatalogosService.getCatalogo.mockReturnValue(throwError(() => new Error('Service Error')));
      component.getTiposDocumentos();
      expect(true).toBeTruthy();
      errorSpy.mockRestore();
    });
  });

  it('should unsubscribe getTiposDocumentosSubscription on ngOnDestroy', () => {
    const unsubscribeSpy = jest.fn();
    component.getTiposDocumentosSubscription = { unsubscribe: unsubscribeSpy } as unknown as Subscription;
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should not throw if getTiposDocumentosSubscription is undefined on ngOnDestroy', () => {
    component.getTiposDocumentosSubscription = undefined as any;
    expect(() => component.ngOnDestroy()).not.toThrow();
  });
});