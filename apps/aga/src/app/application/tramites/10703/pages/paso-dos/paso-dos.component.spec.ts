import { TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { of } from 'rxjs';
import { DOCUMENTOS_SELECCIONADOS } from '../../enums/exencionDeImpuestos.enum';
import { CommonModule } from '@angular/common';
import {
  AlertComponent,
  AnexarDocumentosComponent,
  CATALOGOS_ID,
  Catalogo,
  CatalogosService,
  TEXTOS,
  TituloComponent,
} from '@ng-mf/data-access-user';
describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let catalogosServiceMock: jest.Mocked<CatalogosService>;

  beforeEach(() => {
    catalogosServiceMock = {
      getCatalogo: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      declarations: [],
      imports: [PasoDosComponent,CommonModule, TituloComponent,
          AlertComponent,
          AnexarDocumentosComponent],
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

  it('should initialize TEXTOS and infoAlert properties', () => {
    expect(component.TEXTOS).toBeDefined();
    expect(component.infoAlert).toBe('alert-info');
  });

  it('should call getTiposDocumentos on ngOnInit', () => {
    const spy = jest.spyOn(component, 'getTiposDocumentos');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should set documentosSeleccionados on ngOnInit', () => {
    component.ngOnInit();
    expect(component.documentosSeleccionados).toEqual(DOCUMENTOS_SELECCIONADOS);
  });

  it('should not populate catalogoDocumentos if response is empty', () => {
    catalogosServiceMock.getCatalogo.mockReturnValue(of([]));

    component.getTiposDocumentos();

    expect(component.catalogoDocumentos).toEqual([]);
  });
});