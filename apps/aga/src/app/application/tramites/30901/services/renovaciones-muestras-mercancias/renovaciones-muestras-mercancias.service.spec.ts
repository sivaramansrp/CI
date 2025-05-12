import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { RenovacionesMuestrasMercanciasService } from './renovaciones-muestras-mercancias.service';
import { TestBed } from '@angular/core/testing';
import { ImportanteCatalogoSeleccion } from '../../models/registro-muestras-mercancias.model';

fdescribe('RenovacionesMuestrasMercanciasService', () => {
  let service: RenovacionesMuestrasMercanciasService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RenovacionesMuestrasMercanciasService],
    });
    service = TestBed.inject(RenovacionesMuestrasMercanciasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch dropdown options', () => {
    const dummyOptions: ImportanteCatalogoSeleccion = {
      importadorExportadorPrevio: {
        labelNombre:
          '¿Se han realizado previamente importaciones o exportaciones del product a registrar?',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            descripcion: 'Sí',
            id: 1,
          },
          {
            descripcion: 'No',
            id: 0,
          },
        ],
      },
      fraccionArancelariaAga: {
        labelNombre: 'fracción arancelaria',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            descripcion: '01022901',
            id: 1,
          },
          {
            descripcion: '01022902',
            id: 2,
          },
        ],
      },
      nico: {
        labelNombre: 'Nico',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            descripcion: '01',
            id: 1,
          },
          {
            descripcion: '02',
            id: 2,
          },
        ],
      },
      ideGenerica: {
        labelNombre: 'Estado físico',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            descripcion: 'Gaseoso',
            id: 1,
          },
        ],
      },
      tomaMuestraDespacho: {
        labelNombre:
          '¿El producto al que hace referencia a esta solicitud ha sido previamente inscrito en el registro para la toma de muestras?',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            descripcion: 'Sí',
            id: 1,
          },
          {
            descripcion: 'No',
            id: 0,
          },
        ],
      },
      requisitosObligatoriosTabla: {
        tableHeader: [],
        tableBody: [
          {
            tbodyData: ['Hoja de Seguridad'],
          },
          {
            tbodyData: [
              'Opinión positiva sobre el cumplimiento de las obligaciones tributarias.',
            ],
          },
          {
            tbodyData: ['Pago de Derechos'],
          },
        ],
      },
      tablaDeTarifasDePago: {
        tableHeader: ['Linea de captura', 'Monto'],
        tableBody: [
          {
            tbodyData: ['032000Q0GHM1284', '50000'],
          },
        ],
      },
    };

    service.obtenerOpcionesDesplegables().subscribe((options) => {
      expect(options).toEqual(dummyOptions);
    });

    const req = httpMock.expectOne(
      '../../../../../assets/json/30901/registro-muestras-mercancias.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyOptions);
  });
});
