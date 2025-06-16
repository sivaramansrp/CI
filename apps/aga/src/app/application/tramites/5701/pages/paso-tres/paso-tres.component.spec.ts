import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { Router } from '@angular/router';
import {
  TramiteFolioService,
  TramiteFolioStore,
} from '@ng-mf/data-access-user';
import { DocumentosService } from '../../../../core/services/5701/documentos/documentos.service';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;

  // Creamos mocks para cada uno de los servicios obligatorios.
  let routerMock: Partial<Router>;
  let tramiteFolioServiceMock: Partial<TramiteFolioService>;
  let tramiteStoreMock: Partial<TramiteFolioStore>;
  let documentosServiceMock: Partial<DocumentosService>;

  beforeEach(async () => {
    // Configuramos el Router con una URL ficticia.
    routerMock = {
      url: '/base/path/other',
      navigate: jest.fn(),
    };

    // Simulamos el servicio de trámite. En este ejemplo:
    // - obtenerTramite devuelve un objeto con una propiedad data.
    // - generarFolio devuelve un objeto que contiene la propiedad datos.
    tramiteFolioServiceMock = {
      obtenerTramite: jest.fn().mockReturnValue(of({ data: 'tramiteData' })),
      generarFolio: jest.fn().mockReturnValue(of({ datos: 'folioGenerado' })),
    };

    // Simulamos el store para el trámite.
    tramiteStoreMock = {
      establecerTramite: jest.fn(),
    };

    // Simulamos el servicio para la firma.
    documentosServiceMock = {
      enviarFirma: jest.fn().mockReturnValue(of({ datos: 'testFolioFirma' })),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoTresComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: TramiteFolioService, useValue: tramiteFolioServiceMock },
        { provide: TramiteFolioStore, useValue: tramiteStoreMock },
        { provide: DocumentosService, useValue: documentosServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set url in ngOnInit based on router.url', () => {
    // La lógica en ngOnInit:
    //  - Toma router.url ("/base/path/other")
    //  - .split('/') -> ["", "base", "path", "other"]
    //  - slice(0, 3) -> ["", "base", "path"]
    //  - join('/') -> "/base/path"
    expect(component.url).toBe('/base/path');
  });

  it('should process obtieneFirma correctly and navigate to acuse', () => {
    // Configuramos id_solicitud en localStorage
    localStorage.setItem('id_solicitud', '123');

    // Para asegurar un valor predecible en el número aleatorio, forzamos Math.random.
    // Math.random() se utiliza para obtener: floor(value*90)+10.
    // Si forzamos Math.random() a devolver 0.5,
    // => Math.floor(0.5 * 90) = 45; 45 + 10 = 55.
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.5);

    // Llamamos al método con un valor de firma (por ejemplo, "testFirma").
    component.obtieneFirma('testFirma');

    // Verificamos que documentosService.enviarFirma fue llamado
    // con un payload que contenga:
    //  - id_solicitud: 123 (Number) y
    //  - los datos de la firma simulada (almacenados internamente en el componente).
    const expectedPayload = {
      id_solicitud: 123,
      ...component['datosFirmaSimulada'], // Accedemos al private property mediante bracket notation.
    };
    expect(documentosServiceMock.enviarFirma).toHaveBeenCalledWith(
      expectedPayload
    );

    // Luego se actualiza localStorage con el folio obtenido de la respuesta.
    expect(localStorage.getItem('folioFirma')).toBe('testFolioFirma');

    // Se espera que obtenerTramite se invoque con el id 19.
    expect(tramiteFolioServiceMock.obtenerTramite).toHaveBeenCalledWith(19);

    // Se espera que generarFolio se invoque.
    expect(tramiteFolioServiceMock.generarFolio).toHaveBeenCalled();

    // En el primer switchMap, se establece el trámite usando los datos del trámite.
    expect(tramiteStoreMock.establecerTramite).toHaveBeenCalledWith(
      'tramiteData',
      'testFirma'
    );

    // Luego, en el segundo switchMap, se genera el folio completo.
    // Con el mock del random, se espera que "folioGenerado" se concatene con "55".
    expect(tramiteStoreMock.establecerTramite).toHaveBeenCalledWith(
      'folioGenerado55',
      'testFirma'
    );

    // Finalmente, se redirige a la URL de acuse.
    // Dado que component.url se estableció en "/base/path", se espera que navegue a "/base/path/acuse".
    expect(routerMock.navigate).toHaveBeenCalledWith(['/base/path/acuse']);

    randomSpy.mockRestore();
  });

  it('should not call enviarFirma if firma is empty', () => {
    // No se debe proceder si se pasa una firma vacía.
    component.obtieneFirma('');
    expect(documentosServiceMock.enviarFirma).not.toHaveBeenCalled();
  });

  it('should catch and propagate error from enviarFirma', () => {
    // Forzamos que enviarFirma retorne un error.
    documentosServiceMock.enviarFirma = jest
      .fn()
      .mockReturnValue(throwError(() => new Error('Error en firma')));
    // Spy del console.error para verificar que se registre el error.
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    localStorage.setItem('id_solicitud', '123');
    component.obtieneFirma('testFirma');

    // Debido a que se utiliza catchError en el pipe, se espera que se imprima el error.
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error en el proceso de firma:',
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });
});
