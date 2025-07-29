import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { PasoDosComponent } from './PasoDos.component';
import { CatalogosService, CATALOGOS_ID, Catalogo, TEXTOS } from '@ng-mf/data-access-user';
import { INFO_ALERT } from '../../enums/texto-enum';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AnexarDocumentosComponent, TituloComponent, AlertComponent } from '@ng-mf/data-access-user';
import documentList from '@libs/shared/theme/assets/json/220503/document-list.json';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let catalogosServiceMock: jest.Mocked<CatalogosService>;

  beforeEach(async () => {
    catalogosServiceMock = {
      getCatalogo: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [
        PasoDosComponent,
        CommonModule,
        ReactiveFormsModule,
        AnexarDocumentosComponent,
        TituloComponent,
        AlertComponent
      ],
      providers: [
        { provide: CatalogosService, useValue: catalogosServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties correctly', () => {
    expect(component.TEXTOS).toBe(TEXTOS);
    expect(component.tiposDocumentos).toEqual([]);
    expect(component.infoAlert).toBe(INFO_ALERT);
    expect(component.catalogoDocumentos).toEqual([]);
    expect(component.documentosSeleccionados).toBe(documentList.documentosSeleccionados);
    expect(component['destroy$']).toBeDefined();
  });

  it('should call getTiposDocumentos on ngOnInit', () => {
    const spy = jest.spyOn(component, 'getTiposDocumentos');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should get tipos documentos successfully', () => {
    const mockResponse: Catalogo[] = [
      { id: 1, descripcion: 'Documento 1' },
      { id: 2, descripcion: 'Documento 2' }
    ];

    catalogosServiceMock.getCatalogo.mockReturnValue(of(mockResponse));

    component.getTiposDocumentos();

    expect(catalogosServiceMock.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_TIPO_DOCUMENTO);
    expect(component.catalogoDocumentos).toEqual(mockResponse);
  });

  it('should not update catalogoDocumentos when response is empty', () => {
    const mockResponse: Catalogo[] = [];

    catalogosServiceMock.getCatalogo.mockReturnValue(of(mockResponse));

    component.getTiposDocumentos();

    expect(catalogosServiceMock.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_TIPO_DOCUMENTO);
    expect(component.catalogoDocumentos).toEqual([]);
  });

  it('should handle error when getting tipos documentos', () => {
    const mockError = new Error('Test error');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    catalogosServiceMock.getCatalogo.mockReturnValue(throwError(() => mockError));

    component.getTiposDocumentos();

    expect(catalogosServiceMock.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_TIPO_DOCUMENTO);
    expect(consoleSpy).toHaveBeenCalledWith('Error al obtener los tipos de documentos', mockError);
    
    consoleSpy.mockRestore();
  });

  it('should cleanup on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should initialize component and call ngOnInit', () => {
    const spy = jest.spyOn(component, 'getTiposDocumentos');
    
    fixture.detectChanges(); // This triggers ngOnInit
    
    expect(spy).toHaveBeenCalled();
  });
});