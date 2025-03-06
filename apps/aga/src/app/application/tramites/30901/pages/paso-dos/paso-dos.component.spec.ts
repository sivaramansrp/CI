import { CommonModule } from '@angular/common';
import { ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ImportanteCatalogoSeleccion } from '../../models/registro-muestras-mercancias.model';
import { PasoDosComponent } from './paso-dos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RenovacionesMuestrasMercanciasService } from '../../services/renovaciones-muestras-mercancias/renovaciones-muestras-mercancias.service';
import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { throwError } from 'rxjs';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let renovacionesService: jest.Mocked<RenovacionesMuestrasMercanciasService>;
  let toastrService: jest.Mocked<ToastrService>;

  beforeEach(async () => {
    renovacionesService = {
      obtenerOpcionesDesplegables: jest.fn(),
    } as unknown as jest.Mocked<RenovacionesMuestrasMercanciasService>;

    toastrService = {
      error: jest.fn(),
      success: jest.fn(),
    } as unknown as jest.Mocked<ToastrService>;

    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: RenovacionesMuestrasMercanciasService,
          useValue: renovacionesService,
        },
        { provide: ToastrService, useValue: toastrService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerDatosIniciales on ngOnInit', () => {
    jest.spyOn(component, 'obtenerDatosIniciales');
    component.ngOnInit();
    expect(component.obtenerDatosIniciales).toHaveBeenCalled();
  });

  it('should set tableData correctly when obtenerDatosIniciales succeeds', () => {
    const MOCKRESPONSE = {
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

    renovacionesService.obtenerOpcionesDesplegables.mockReturnValue(
      of(MOCKRESPONSE)
    );

    component.obtenerDatosIniciales();
    fixture.detectChanges();

    expect(component.tableData.tableHeader).toEqual(['Header 1']);
    expect(component.tableData.tableBody).toEqual([
      { tbodyData: ['Hoja de Seguridad'] },
      {
        tbodyData: [
          'Opinión positiva sobre el cumplimiento de las obligaciones tributarias.',
        ],
      },
    ]);
  });

  it('should show an error message when obtenerDatosIniciales fails', () => {
    renovacionesService.obtenerOpcionesDesplegables.mockReturnValue(
      throwError(() => new Error('Error fetching data'))
    );

    component.obtenerDatosIniciales();

    expect(toastrService.error).toHaveBeenCalledWith(
      'Error al obtener datos iniciales',
      'Error'
    );
  });

  it('should correctly handle empty response from obtenerOpcionesDesplegables', () => {
    renovacionesService.obtenerOpcionesDesplegables.mockReturnValue(
      of({
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
      })
    );

    component.obtenerDatosIniciales();

    expect(component.tableData.tableHeader).toEqual([]);
    expect(component.tableData.tableBody).toEqual([]);
  });

  it('should correctly handle undefined response from obtenerOpcionesDesplegables', () => {
    renovacionesService.obtenerOpcionesDesplegables.mockReturnValue(
      of(undefined as unknown as ImportanteCatalogoSeleccion)
    );
    component.obtenerDatosIniciales();

    expect(component.tableData.tableHeader).toEqual([]);
    expect(component.tableData.tableBody).toEqual([]);
  });

  it('should handle an error with an invalid response format', () => {
    renovacionesService.obtenerOpcionesDesplegables.mockReturnValue(
      of({
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
      } as ImportanteCatalogoSeleccion)
    );

    component.obtenerDatosIniciales();

    expect(toastrService.error).toHaveBeenCalledWith(
      'Error al obtener datos iniciales',
      'Error'
    );
  });

  it('should correctly handle a service returning an empty tableBody array', () => {
    const MOCKRESPONSE: ImportanteCatalogoSeleccion = {
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

    renovacionesService.obtenerOpcionesDesplegables.mockReturnValue(
      of(MOCKRESPONSE)
    );

    component.obtenerDatosIniciales();

    expect(component.tableData.tableHeader).toEqual(['Header 1']);
    expect(component.tableData.tableBody).toEqual([]);
  });
});
