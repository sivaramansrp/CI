import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AnexarDocumentosComponent } from "./anexar-documentos.component";
import { ToastrService } from "ngx-toastr";
import { InicioSesionService } from "../../../core/services/shared/inicio-sesion/inicio-sesion.service";
import { SubirDocumentoService } from "../../../core/services/shared/subir-documento/subir-documento.service";
import { DocumentosQuery } from "../../../core/queries/documentos.query";
import { DocumentosStore } from "../../../core/estados/documentos.store";
import { BsModalService } from "ngx-bootstrap/modal";
import { of } from "rxjs";
import { Catalogo } from "../../../core/models/shared/catalogos.model";

describe('AnexarDocumentosComponent', () => {
  let component: AnexarDocumentosComponent;
  let fixture: ComponentFixture<AnexarDocumentosComponent>;
  let mockToastrService: ToastrService;
  let mockInicioSesionService: InicioSesionService;
  let mockSubirDocumentoService: SubirDocumentoService;
  let mockDocumentosQuery: DocumentosQuery;
  let mockDocumentosStore: DocumentosStore;
  let mockModalService: BsModalService;

  beforeEach(async () => {
    mockToastrService = {
      error: jest.fn(),
    } as unknown as ToastrService;

    mockInicioSesionService = {
      obtenerToken: jest.fn().mockReturnValue(of({ jwt: 'mockToken' })),
    } as unknown as InicioSesionService;

    mockSubirDocumentoService = {
      subirDocumento: jest.fn().mockReturnValue(of({})),
    } as unknown as SubirDocumentoService;

    mockDocumentosQuery = {
      selectDocumentoState$: of({ catalogoDocumentos: [] }),
    } as unknown as DocumentosQuery;

    mockDocumentosStore = {
      establecerCatalogoDocumentos: jest.fn(),
    } as unknown as DocumentosStore;

    mockModalService = {
      show: jest.fn(),
    } as unknown as BsModalService;

    await TestBed.configureTestingModule({
      imports: [AnexarDocumentosComponent],
      providers: [
        { provide: ToastrService, useValue: mockToastrService },
        { provide: InicioSesionService, useValue: mockInicioSesionService },
        { provide: SubirDocumentoService, useValue: mockSubirDocumentoService },
        { provide: DocumentosQuery, useValue: mockDocumentosQuery },
        { provide: DocumentosStore, useValue: mockDocumentosStore },
        { provide: BsModalService, useValue: mockModalService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnexarDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.documentoForma).toBeDefined();
  });

  it('should call obtenerToken and set token', () => {
    component.obtenerToken({ user: 'test', password: 'test' });
    expect(mockInicioSesionService.obtenerToken).toHaveBeenCalled();
    expect(component.token).toBe('mockToken');
  });

  it('should select a document and set tamMaximo', () => {
    component.catalogoDocumentos = [{ id: 1, tam: '1024' } as Catalogo];
    component.documentoForma.setValue({ documento: 1 });
    component.seleccionarDocumento();
    expect(component.documentoSeleccionado).toEqual({ id: 1, tam: '1024' });
    expect(component.tamMaximo).toBe(1);
  });

  it('should show error if document is not found', () => {
    component.catalogoDocumentos = [];
    component.documentoForma.setValue({ documento: 1 });
    component.seleccionarDocumento();
    expect(mockToastrService.error).toHaveBeenCalledWith('Documento no encontrado');
  });

  it('should validate and add a file to listadoArchivos', () => {
    const mockFile = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    const mockEvent = { target: { files: [mockFile] } } as unknown as Event;
    component.cargarDoc(mockEvent, {} as HTMLInputElement, 1, 'obligatorio');
    expect(component.listadoArchivos.length).toBe(1);
    expect(component.listadoArchivos[0].name).toBe('test.pdf');
  });

  it('should show error if file is not a PDF', () => {
    const mockFile = new File(['content'], 'test.txt', { type: 'text/plain' });
    const mockEvent = { target: { files: [mockFile] } } as unknown as Event;
    component.cargarDoc(mockEvent, {} as HTMLInputElement, 1, 'obligatorio');
    expect(mockToastrService.error).toHaveBeenCalledWith('Solo se permiten archivos PDF.');
  });

  it('should open a modal for PDF preview', () => {
    component.listadoArchivos = [{
      id: 1, ruta: 'mockRuta',
      name: "",
      cargado: false,
      tipo: "",
      mensaje: "",
      estatus: ""
    }];
    component.verPdf(1);
    expect(mockModalService.show).toHaveBeenCalled();
  });

  it('should confirm upload and emit cargaRealizada', () => {
    jest.spyOn(component.cargaRealizada, 'emit');
    component.listadoArchivos = [{
      id: 1, tipo: 'obligatorio',
      name: "",
      ruta: "",
      cargado: false,
      mensaje: "",
      estatus: ""
    }];
    component.confirmUpload();
    expect(component.cargaRealizada.emit).toHaveBeenCalledWith(true);
  });

  it('should clean file input and remove file from listadoArchivos', () => {
    component.listadoArchivos = [{
      id: 1,
      name: "",
      ruta: "",
      cargado: false,
      tipo: "",
      mensaje: "",
      estatus: ""
    }];
    component.limpiarFile({ id: 1 } as Catalogo, 'obligatorios');
    expect(component.listadoArchivos.length).toBe(0);
  });

  it('should add optional documents to listDocOpcionales', () => {
    component.archivosOpcionales = [{ id: 1 } as Catalogo];
    component.listDocOpcionalesAgregar = [1];
    component.agregarOpcionales();
    expect(component.listDocOpcionales.length).toBe(1);
  });

  it('should remove optional document from listDocOpcionales', () => {
    component.listDocOpcionales = [{ id: 1 } as Catalogo];
    component.eliminarOpcional({ id: 1 } as Catalogo);
    expect(component.listDocOpcionales.length).toBe(0);
  });
});