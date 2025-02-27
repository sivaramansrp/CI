import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PagoLCComponent } from './pago-lc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ImportanteCatalogoSeleccion, RenovacionesMuestrasMercanciasService, TableComponent, TituloComponent } from '@ng-mf/data-access-user';

fdescribe('PagoLCComponent', () => {
  let component: PagoLCComponent;
  let fixture: ComponentFixture<PagoLCComponent>;
  let renovacionesService: jasmine.SpyObj<RenovacionesMuestrasMercanciasService>;

  beforeEach(async () => {
    const renovacionesServiceSpy = jasmine.createSpyObj(
      'RenovacionesMuestrasMercanciasService',
      ['obtenerOpcionesDesplegables']
    );

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        PagoLCComponent,
        TituloComponent,
        CommonModule,
        FormsModule,
        TableComponent,
        HttpClientTestingModule
      ],
      declarations: [],
      providers: [
        FormBuilder,
        {
          provide: RenovacionesMuestrasMercanciasService,
          useValue: renovacionesServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoLCComponent);
    component = fixture.componentInstance;
    renovacionesService = TestBed.inject(
      RenovacionesMuestrasMercanciasService
    ) as jasmine.SpyObj<RenovacionesMuestrasMercanciasService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    component.ngOnInit();
    expect(component.formPagoLC.get('lineaCaptura')!.value).toBe('');
    expect(component.formPagoLC.get('valorPago')!.value).toBe('4845');
    expect(component.formPagoLC.get('valorPago')!.disabled).toBe(true);
  });

  it('should call obtenerDatosIniciales on init', () => {
    spyOn(component, 'obtenerDatosIniciales');
    component.ngOnInit();
    expect(component.obtenerDatosIniciales).toHaveBeenCalled();
  });

  it('should set tableData on obtenerDatosIniciales', () => {
    const mockResponse: ImportanteCatalogoSeleccion = {
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
    renovacionesService.obtenerOpcionesDesplegables.and.returnValue(
      of(mockResponse)
    );

    component.obtenerDatosIniciales();
    fixture.detectChanges();
    expect(component.tableData).toEqual(mockResponse.tablaDeTarifasDePago);
  });

  it('should validate and format lineaCaptura', () => {
    component.ngOnInit();
    component.formPagoLC.get('lineaCaptura')!.setValue('abc123!@#');
    component.validarLineaCaptura();
    expect(component.formPagoLC.get('lineaCaptura')!.value).toBe('ABC123');
  });

  it('should reset lineaCaptura field on limpiarCampos', () => {
    component.ngOnInit();
    component.formPagoLC.get('lineaCaptura')!.setValue('test');
    component.limpiarCampos();
    expect(component.formPagoLC.get('lineaCaptura')!.value).toBeNull();
  });
});
