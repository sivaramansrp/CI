import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { of, throwError } from 'rxjs';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let catalogosService: CatalogosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      providers: [
        {
          provide: CatalogosService,
          useValue: {
            getCatalogo: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    catalogosService = TestBed.inject(CatalogosService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.TEXTOS).toBeDefined();
    expect(component.infoAlert).toBe('alert-info');
    expect(component.catalogoDocumentos).toEqual([]);
    expect(component.documentosSeleccionados).toEqual([]);
  });

  it('should call getTiposDocumentos on ngOnInit', () => {
    const getTiposDocumentosSpy = jest.spyOn(component, 'getTiposDocumentos');
    component.ngOnInit();
    expect(getTiposDocumentosSpy).toHaveBeenCalled();
  });

  it('should populate documentosSeleccionados on ngOnInit', () => {
    component.ngOnInit();
    expect(component.documentosSeleccionados).toEqual([
      {
        id: 1,
        descripcion: 'Documentos que ampare el valor de la mercancía',
      },
      {
        id: 2,
        descripcion:
          'Documentos del medio de transporte (Guías, BL o carta porte según corresponda)',
      },
    ]);
  });

  it('should populate catalogoDocumentos when getTiposDocumentos is successful', () => {
    const mockResponse = [
      { id: 1, descripcion: 'Documento 1' },
      { id: 2, descripcion: 'Documento 2' },
    ];
    jest.spyOn(catalogosService, 'getCatalogo').mockReturnValue(of(mockResponse));

    component.getTiposDocumentos();

    expect(component.catalogoDocumentos).toEqual(mockResponse);
    expect(catalogosService.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_TIPO_DOCUMENTO);
  });

  it('should handle error when getTiposDocumentos fails', () => {
    const mockError = new Error('Error fetching catalog');
    jest.spyOn(catalogosService, 'getCatalogo').mockReturnValue(throwError(() => mockError));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    component.getTiposDocumentos();

    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
  });
});