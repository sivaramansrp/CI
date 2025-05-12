import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { PasoDosComponent } from './paso-dos.component';
import { AlertComponent, AnexarDocumentosComponent, CatalogosService, SharedModule, TituloComponent } from '@ng-mf/data-access-user';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { CATALOGOS_ID, Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';

jest.mock('@ng-mf/data-access-user');
jest.mock('../../services/aviso-sanitario.service');

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let mockCatalogosService: jest.Mocked<CatalogosService>;
  let mockAvisoSanitarioService: jest.Mocked<AvisoSanitarioService>;

  const mockCatalogoDocumentos: Catalogo[] = [
    { id: 1, descripcion: 'Documento 1' },
    { id: 2, descripcion: 'Documento 2' }
  ];

  const mockDocumentosSeleccionados: RespuestaCatalogos = {
    code: 200,
    data: [
      { id: 1, descripcion: 'Documento Seleccionado 1' },
      { id: 2, descripcion: 'Documento Seleccionado 2' }
    ],
    message: 'Success message'
  };

  beforeEach(async () => {
    mockCatalogosService = {
      getCatalogo: jest.fn().mockReturnValue(of(mockCatalogoDocumentos))
    } as any;

    mockAvisoSanitarioService = {
      obtenerDocumentosSeleccionados: jest.fn().mockReturnValue(of(mockDocumentosSeleccionados))
    } as any;

    await TestBed.configureTestingModule({
      declarations: [
        PasoDosComponent,
        TituloComponent,
        AlertComponent,
        AnexarDocumentosComponent,
      ],
      imports: [
        CommonModule,
        SharedModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: CatalogosService, useValue: mockCatalogosService },
        { provide: AvisoSanitarioService, useValue: mockAvisoSanitarioService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
    component.ngOnDestroy();
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });

  test('should call getTiposDocumentos and obtenerDocumentosSeleccionados on ngOnInit', () => {
    const getTiposDocumentosSpy = jest.spyOn(component, 'getTiposDocumentos');
    const obtenerDocumentosSeleccionadosSpy = jest.spyOn(component, 'obtenerDocumentosSeleccionados');

    component.ngOnInit();

    expect(getTiposDocumentosSpy).toHaveBeenCalled();
    expect(obtenerDocumentosSeleccionadosSpy).toHaveBeenCalled();
  });

  test('should initialize and fetch tipos de documentos on ngOnInit', () => {
    component.ngOnInit();
    expect(mockCatalogosService.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_TIPO_DOCUMENTO);
    expect(component.catalogoDocumentos).toEqual(mockCatalogoDocumentos);
  });

  test('should fetch documentos seleccionados on ngOnInit', () => {
    component.ngOnInit();
    expect(mockAvisoSanitarioService.obtenerDocumentosSeleccionados).toHaveBeenCalled();
    expect(component.documentosSeleccionados).toEqual(mockDocumentosSeleccionados.data);
  });

  test('should fetch tipos de documentos in getTiposDocumentos()', () => {
    component.getTiposDocumentos();
    expect(mockCatalogosService.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_TIPO_DOCUMENTO);
    expect(component.catalogoDocumentos).toEqual(mockCatalogoDocumentos);
  });

  test('should fetch tipos de documentos and update catalogoDocumentos', () => {
    const mockResponse = [
      { id: 1, descripcion: 'Documento 1' },
      { id: 2, descripcion: 'Documento 2' },
    ];

    mockCatalogosService.getCatalogo.mockReturnValue(of(mockResponse));

    component.getTiposDocumentos();
    expect(mockCatalogosService.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_TIPO_DOCUMENTO);
    expect(component.catalogoDocumentos).toEqual(mockResponse);
  });

  test('should not update catalogoDocumentos if response is empty', () => {
    const mockResponse: any[] = [];

    mockCatalogosService.getCatalogo.mockReturnValue(of(mockResponse));

    component.getTiposDocumentos();

    expect(component.catalogoDocumentos).toEqual([]);
  });

  test('should fetch documentos seleccionados in obtenerDocumentosSeleccionados()', () => {
    component.obtenerDocumentosSeleccionados();
    expect(mockAvisoSanitarioService.obtenerDocumentosSeleccionados).toHaveBeenCalled();
    expect(component.documentosSeleccionados).toEqual(mockDocumentosSeleccionados.data);
  });

  test('should complete destruirNotificador$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn(component['destruirNotificador$'], 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });

  test('should emit value on destruirNotificador$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destruirNotificador$'], 'next');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith();
  });

  it('should unsubscribe in ngOnDestroy', () => { 
    const spy = jest.spyOn(component['destruirNotificador$'], 'next'); 
    const spyComplete = jest.spyOn(component['destruirNotificador$'], 'complete'); 
    component.ngOnDestroy(); 
    expect(spy).toHaveBeenCalled(); 
    expect(spyComplete).toHaveBeenCalled(); 
  });
});