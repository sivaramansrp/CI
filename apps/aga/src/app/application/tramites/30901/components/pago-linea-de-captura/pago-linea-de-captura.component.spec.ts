import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ImportanteCatalogoSeleccion } from '../../models/registro-muestras-mercancias.model';
import { PagoLineaDeCapturaComponent } from './pago-linea-de-captura.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RenovacionesMuestrasMercanciasService } from '../../services/renovaciones-muestras-mercancias/renovaciones-muestras-mercancias.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { throwError } from 'rxjs';

describe('PagoLineaDeCapturaComponent', () => {
  let component: PagoLineaDeCapturaComponent;
  let fixture: ComponentFixture<PagoLineaDeCapturaComponent>;
  let renovacionesService: jest.Mocked<RenovacionesMuestrasMercanciasService>;

  beforeEach(async () => {
    const RENOVACIONESSERVICEMOCK = {
      obtenerOpcionesDesplegables: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [PagoLineaDeCapturaComponent],
      providers: [
        FormBuilder,
        {
          provide: RenovacionesMuestrasMercanciasService,
          useValue: RENOVACIONESSERVICEMOCK,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoLineaDeCapturaComponent);
    component = fixture.componentInstance;
    renovacionesService = TestBed.inject(
      RenovacionesMuestrasMercanciasService
    ) as jest.Mocked<RenovacionesMuestrasMercanciasService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    component.ngOnInit();
    expect(component.formPagoLC.get('lineaCaptura')?.value).toBe('');
    expect(component.formPagoLC.get('valorPago')?.value).toBe('4845');
    expect(component.formPagoLC.get('valorPago')?.disabled).toBe(true);
  });

  it('should call obtenerDatosIniciales on init', () => {
    jest.spyOn(component, 'obtenerDatosIniciales');
    component.ngOnInit();
    expect(component.obtenerDatosIniciales).toHaveBeenCalled();
  });

  it('should set tableData on obtenerDatosIniciales', () => {
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
    renovacionesService.obtenerOpcionesDesplegables.mockReturnValue(of(MOCKRESPONSE));

    component.obtenerDatosIniciales();
    fixture.detectChanges();
    expect(component.tableData).toEqual(MOCKRESPONSE.tablaDeTarifasDePago);
  });

  it('should validate and format lineaCaptura', () => {
    component.ngOnInit();
    component.formPagoLC.get('lineaCaptura')?.setValue('abc123!@#');
    component.validarLineaCaptura();
    expect(component.formPagoLC.get('lineaCaptura')?.value).toBe('ABC123');
  });

  it('should reset lineaCaptura field on limpiarCampos', () => {
    component.ngOnInit();
    component.formPagoLC.get('lineaCaptura')?.setValue('test');
    component.limpiarCampos();
    expect(component.formPagoLC.get('lineaCaptura')?.value).toBeNull();
  });

  it('should call validarLineaCaptura on form submit', () => {
    jest.spyOn(component, 'validarLineaCaptura');
    component.ngOnInit();
    component.formPagoLC.get('lineaCaptura')?.setValue('abc123!@#');
    component.validarLineaCaptura();
    expect(component.validarLineaCaptura).toHaveBeenCalled();
    expect(component.formPagoLC.get('lineaCaptura')?.value).toBe('ABC123');
  });

  it('should handle obtenerOpcionesDesplegables error', () => {
    const CONSOLESPY = jest.spyOn(console, 'error').mockImplementation();
    const TOASTERSPY = jest.spyOn(TestBed.inject(ToastrService), 'error');
  
    renovacionesService.obtenerOpcionesDesplegables.mockReturnValue(
      throwError(() => new Error('Error'))
    );
  
    component.obtenerDatosIniciales();
    fixture.detectChanges();
  
    expect(CONSOLESPY).toHaveBeenCalledWith('Error');
    expect(TOASTERSPY).toHaveBeenCalledWith('Error al obtener datos iniciales', 'Error');
  });
});