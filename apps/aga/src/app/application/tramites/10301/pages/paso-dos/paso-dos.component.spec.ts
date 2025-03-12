import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { PasoDosComponent } from './paso-dos.component';
import { TituloComponent, AlertComponent, CatalogoSelectComponent, CatalogosService } from '@ng-mf/data-access-user';
import { ImportadorExportadorService } from '../../services/importador-exportador.service';
import { Tramite10301Store } from '../../estados/tramite10301.store';
import { Tramite10301Query } from '../../estados/tramite10301.query';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let importadorExportadorService: ImportadorExportadorService;
  let tramiteStore: Tramite10301Store;
  let tramiteQuery: Tramite10301Query;
  let catalogosService: CatalogosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TituloComponent,
        AlertComponent,
        CatalogoSelectComponent,
        PasoDosComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CatalogosService,
        
        {
          provide: ImportadorExportadorService,
          useValue: {
            getDocumentos: jest.fn().mockReturnValue(of({ data: [] })),
            getTipoDocumento: jest.fn().mockReturnValue(of({ data: [] })),
          },
        },
        {
          provide: Tramite10301Store,
          useValue: {
            setAduana: jest.fn(),
            setTipoDocumento: jest.fn(),
            setDocumentos: jest.fn(),
          },
        },
        {
          provide: Tramite10301Query,
          useValue: {
            selectAduana$: of([]),
            selectTipoDocumento$: of([]),
            selectDocumentos$: of([]),
            selectSolicitud$: of([]),
            selectFechasSeleccionadas$: of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    importadorExportadorService = TestBed.inject(ImportadorExportadorService);
    tramiteStore = TestBed.inject(Tramite10301Store);
    tramiteQuery = TestBed.inject(Tramite10301Query);
    catalogosService = TestBed.inject(CatalogosService);
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize form', () => {
  //   component.ngOnInit();
  //   expect(component.tramiteForm).toBeDefined();
  // });

  it('should get documentos', () => {
    const spy = jest.spyOn(importadorExportadorService, 'getDocumentos');
    component.getDocumentos();
    expect(spy).toHaveBeenCalled();
  });

  it('should get tipo documento', () => {
    const spy = jest.spyOn(importadorExportadorService, 'getTipoDocumento');
    component.getTipoDocumento();
    expect(spy).toHaveBeenCalled();
  });

  it('should obtain tipo persona', () => {
    component.cambioArchivo('image',1);
    // expect(component.).toBe(1);
  });

  it('should obtain tipo persona', () => {
    component.adjuntarArchivos();
    
  });

  it('should set valores in store', () => {
    const form = component.tramiteForm;
    form.get('importadorExportador')?.get('aduana')?.setValue('test');
    component.setValoresStore(form, 'aduana', 'setAduana');
    expect(tramiteStore.setAduana).toHaveBeenCalledWith('test');
  });

  it('should validate form field', () => {
    const form = component.tramiteForm;
    form.get('importadorExportador')?.get('aduana')?.setValue('');
    expect(component.isValid(form, 'aduana')).toBe(false);
  });

  it('should close process', () => {
    component.cerrarProceso();
    expect(component.mostrarTabla).toBe(false);
    expect(component.mostrarTablaArchivosSubidos).toBe(false);
    expect(component.procesoCompletado).toBe(true);
  });

  it('should initialize donante y domicilio form', () => {
    component.donanteDomicilio();
    expect(component.tramiteForm).toBeDefined();
  });

  it('should get importadorExportador form group', () => {
    const formGroup = component.importadorExportador;
    expect(formGroup).toBeDefined();
  });

  it('should get tipos de documentos', () => {
    const spy = jest.spyOn(catalogosService, 'getCatalogo').mockReturnValue(of([{ id: 1, descripcion: 'Documento 1' }]));
    component.getTiposDocumentos();
    expect(spy).toHaveBeenCalled();
    expect(component.catalogoDocumentos.length).toBeGreaterThan(0);
  });

  it('should attach files', () => {
    jest.useFakeTimers();
    component.adjuntarArchivos();
    jest.advanceTimersByTime(2000);
    expect(component.progreso).toBe(100);
    expect(component.mostrarTablaArchivosSubidos).toBe(true);
    jest.useRealTimers();
  });

  it('should validate destinatario formulario', () => {
    const form = component.tramiteForm;
    form.get('importadorExportador')?.get('aduana')?.setValue('');
    component.validarDestinatarioFormulario();
    expect(form.get('importadorExportador')?.get('aduana')?.touched).toBe(true);
  });

  it('should initialize component and call necessary methods on ngOnInit', () => {
    const getTiposDocumentosSpy = jest.spyOn(component, 'getTiposDocumentos');
    const getTipoDocumentoSpy = jest.spyOn(component, 'getTipoDocumento');
    const getDocumentosSpy = jest.spyOn(component, 'getDocumentos');
    const donanteDomicilioSpy = jest.spyOn(component, 'donanteDomicilio');
  
    component.ngOnInit();
  
    expect(getTiposDocumentosSpy).toHaveBeenCalled();
    expect(getTipoDocumentoSpy).toHaveBeenCalled();
    expect(getDocumentosSpy).toHaveBeenCalled();
    expect(donanteDomicilioSpy).toHaveBeenCalled();
  });
  
  it('should get tipos de documentos', () => {
    const spy = jest.spyOn(catalogosService, 'getCatalogo').mockReturnValue(of([{ id: 1, descripcion: 'Documento 1' }]));
    component.getTiposDocumentos();
    expect(spy).toHaveBeenCalled();
    expect(component.catalogoDocumentos.length).toBeGreaterThan(0);
  });

  it('should handle no file selected', () => {
    const event = { target: { files: [] } } as unknown as Event;
    component.cambioArchivo(event, 0);
    expect(component.tamanosDeArchivos[0]).toBeUndefined();
  });

  it('should show alert and reset fields for large files', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const largeFile = new File(['x'.repeat(4 * 1024 * 1024)], 'large.jpg');
    const event = { 
      target: { 
        files: [largeFile],
        value: 'dummy'
      } 
    } as unknown as Event;

    component.cambioArchivo(event, 0);

    expect(alertSpy).toHaveBeenCalledWith('File size must be less than 3 MB');
   
    expect(component.tamanosDeArchivos[0]).toBeNull();
    expect(component.resoluciones[0]).toBe('');
    expect(component.nombresArchivosSubidos[0]).toBe('');
  });

  it('should handle valid image file upload', () => {
    // Mock FileReader
    const mockFileReader = {
      readAsDataURL: jest.fn(),
      onload: null,
    };
    jest.spyOn(window, 'FileReader').mockImplementation(() => mockFileReader as any);

    // Mock Image
    const mockImage = {
      onload: null,
      width: 800,
      height: 600,
    };
    jest.spyOn(window, 'Image').mockImplementation(() => mockImage as any);

    const validFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [validFile] } } as unknown as Event;

    component.cambioArchivo(event, 0);

    // Trigger FileReader callback
    // mockFileReader.onload!({ target: { result: 'data:image/jpeg;base64,ABC' } } as any);
    // Trigger Image callback
    // mockImage.onload!({} as Event);

    expect(component.tamanosDeArchivos[0]).toBeCloseTo(validFile.size / (1024 * 1024));
    expect(component.nombresArchivosSubidos[0]).toBe('test.jpg');
    expect(component.resoluciones[0]).toBe('800x600');
  });

  it('should handle invalid image file', () => {
    const mockFileReader = {
      readAsDataURL: jest.fn(),
      onload: null,
    };
    jest.spyOn(window, 'FileReader').mockImplementation(() => mockFileReader as any);

    const mockImage = {
      onerror: null,
    };
    jest.spyOn(window, 'Image').mockImplementation(() => mockImage as any);

    const invalidFile = new File(['content'], 'test.txt', { type: 'text/plain' });
    const event = { target: { files: [invalidFile] } } as unknown as Event;

    component.cambioArchivo(event, 0);

    // Trigger FileReader callback
    // mockFileReader.onload!({ target: { result: 'data:text/plain;base64,ABC' } } as any);
    // Trigger Image error
    // mockImage.onerror!({} as Event);

    expect(component.resoluciones[0]).toBe('N/A');
  });

  it('should unsubscribe on destroy', () => {
    component.getTiposDocumentosSubscription = of().subscribe();
    component.getTipoDocumentoSubscription = of().subscribe();
    const spyUnsubscribeTipos = jest.spyOn(component.getTiposDocumentosSubscription, 'unsubscribe');
    const spyUnsubscribeTipo = jest.spyOn(component.getTipoDocumentoSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(spyUnsubscribeTipos).toHaveBeenCalled();
    expect(spyUnsubscribeTipo).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});