import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of, Subject } from 'rxjs';
import { AvisoTrasladoService } from '../../services/aviso-traslado.service';
import { Tramite32503Query } from '../../../../estados/queries/tramite32503.query';
import { Tramite32503Store } from '../../../../estados/tramites/tramite32503.store';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let avisoTrasladoServiceMock: any;
  let tramiteQueryMock: any;
  let tramiteStoreMock: any;

  beforeEach(async () => {
    avisoTrasladoServiceMock = {
      obtenerTipoDocumentoSeleccionado: jest.fn().mockReturnValue(of({ datos: [{ descripcion: 'Documento 1', archivoDisponible: [] }] })),
      obtenerAnexos: jest.fn().mockReturnValue(of({ datos: [] })),
    };

    tramiteQueryMock = {
      selectSolicitud$: of({
        valorSeleccionado: [],
        documentosDesplegable: [],
      }),
    };

    tramiteStoreMock = {
      setValorSeleccionado: jest.fn(),
      setDocumentosDesplegable: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,PasoTresComponent],
      declarations: [],
      providers: [
        { provide: AvisoTrasladoService, useValue: avisoTrasladoServiceMock },
        { provide: Tramite32503Query, useValue: tramiteQueryMock },
        { provide: Tramite32503Store, useValue: tramiteStoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.tipoDocumentoFormulario).toBeDefined();
    expect(component.tipoDocumentoFormulario.get('documentos')).toBeInstanceOf(FormArray);
  });

  it('should call cargarTipoDocumentoSeleccionado on ngOnInit', () => {
    const cargarTipoDocumentoSeleccionadoSpy = jest.spyOn(component, 'cargarTipoDocumentoSeleccionado');
    component.ngOnInit();
    expect(cargarTipoDocumentoSeleccionadoSpy).toHaveBeenCalled();
  });

  it('should call cargarAnexos on ngOnInit', () => {
    const cargarAnexosSpy = jest.spyOn(component, 'cargarAnexos');
    component.ngOnInit();
    expect(cargarAnexosSpy).toHaveBeenCalled();
  });

  it('should call avisoTrasladoService.obtenerTipoDocumentoSeleccionado when cargarTipoDocumentoSeleccionado is called', () => {
    component.cargarTipoDocumentoSeleccionado();
    expect(avisoTrasladoServiceMock.obtenerTipoDocumentoSeleccionado).toHaveBeenCalled();
    expect(component.tiposDeDocumentos).toEqual([{ descripcion: 'Documento 1', archivoDisponible: [] }]);
  });

  it('should call avisoTrasladoService.obtenerAnexos when cargarAnexos is called', () => {
    component.cargarAnexos();
    expect(avisoTrasladoServiceMock.obtenerAnexos).toHaveBeenCalled();
    expect(component.tablaDeDatos.datos).toEqual([]);
  });

  it('should call setValorSeleccionado when valorSeleccion is called', () => {
    component.tipoDocumentoFormulario = new FormGroup({
      documentos: new FormArray([]),
    });
    component.valorSeleccion();
    expect(tramiteStoreMock.setValorSeleccionado).toHaveBeenCalledWith([]);
  });

  it('should not update tamanosDeArchivos when cambioArchivo is called with an invalid file size', () => {
    const mockEvent = {
      target: {
        files: [{ name: 'large-file.pdf', size: 1024 * 1024 * 5 }],
      },
    } as unknown as Event;

    component.tamanosDeArchivos = [{ nombreDelArchivo: '', tamano: 0, resolucion: '' }];
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    component.cambioArchivo(mockEvent, 0);
    expect(component.tamanosDeArchivos[0].nombreDelArchivo).toBe('');
    expect(component.tamanosDeArchivos[0].tamano).toBe(3);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});