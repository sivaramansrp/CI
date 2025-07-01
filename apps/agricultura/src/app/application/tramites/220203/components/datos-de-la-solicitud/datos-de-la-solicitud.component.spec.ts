import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  AlertComponent,
  CatalogoSelectComponent,
  TablaDinamicaComponent,
  TableComponent,
  TituloComponent,
  ConsultaioQuery
} from '@ng-mf/data-access-user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';
import { of } from 'rxjs';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let service: ImportacionDeAcuiculturaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        DatosDeLaSolicitudComponent,
        TituloComponent,
        AlertComponent,
        CatalogoSelectComponent,
        TablaDinamicaComponent,
        TableComponent
      ],
      providers: [
        FormBuilder,
        {
          provide: ImportacionDeAcuiculturaService,
          useValue: {
            obtenerDatos: jest.fn().mockReturnValue(
              of({
                datosMercancia: {
                  realizarGroup: {
                    aduanaIngreso: 'aduana',
                    oficinaInspeccion: 'oficina',
                    puntoInspeccion: 'punto',
                    numeroGuia: '12345',
                    regimen: 'general'
                  },
                  mercanciaGroup: {
                    tipoRequisito: 'tipo',
                    requisito: 'req',
                    numeroCertificadoInternacional: 'cert',
                    numeroOficioCasoEspecial: 'oficio',
                    fraccionArancelaria: 'fracc',
                    descripcionFraccionArancelaria: 'descFracc',
                    nico: 'nico',
                    descripcionNico: 'descNico',
                    descripcion: 'desc',
                    cantidadUMT: '1',
                    umt: 'kg',
                    cantidadUMC: '2',
                    umc: 'box',
                    uso: 'consumo',
                    numeroDeLote: 'lote123',
                    faseDeDesarrollo: 'adulto',
                    especie: 'pez',
                    paisDeOrigen: 'MX',
                    paisDeProcedencia: 'US'
                  },
                  detalles: {
                    nombreCientifico: 'Tilapia nilotica'
                  }
                }
              })
            ),
            obtenerDetallesDelCatalogo: jest.fn().mockReturnValue(of({ data: [] })),
            actualizarFormaValida: jest.fn(),
            actualizarDatosMercancia: jest.fn()
          }
        },
        {
          provide: ConsultaioQuery,
          useValue: {
            selectConsultaioState$: of({ readonly: false })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ImportacionDeAcuiculturaService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form group with controls on ngOnInit', () => {
    component.ngOnInit();
    expect(component.datosMercanciaFormGroup.contains('realizarGroup')).toBe(true);
    expect(component.datosMercanciaFormGroup.contains('mercanciaGroup')).toBe(true);
    expect(component.datosMercanciaFormGroup.contains('detalles')).toBe(true);
  });

  it('should update store when setValoresStore is called', () => {
    const form = component.datosMercanciaFormGroup;
    component.setValoresStore(form, 'fraccionArancelaria');
    expect(form.value.mercanciaGroup.descripcionFraccionArancelaria).toBe('Nuevo valor para descripcion');

    component.setValoresStore(form, 'nico');
    expect(form.value.mercanciaGroup.descripcionNico).toBe('Nuevo valor para descripcionNico');

    component.setValoresStore(form, 'cantidadUMT');
    expect(form.value.mercanciaGroup.umt).toBe('Nuevo valor para cantidadUMT');
  });

  it('should disable form in readonly mode', () => {
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    expect(component.datosMercanciaFormGroup.disabled).toBe(true);
  });

  it('should enable form in editable mode', () => {
    component.esFormularioSoloLectura = false;
    component.inicializarEstadoFormulario();
    expect(component.datosMercanciaFormGroup.enabled).toBe(true);
  });

  it('should toggle colapsable flag', () => {
    const initial = component.colapsable;
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(!initial);
  });

  it('should call actualizarFormaValida when form is valid', () => {
    component.verificarEstadoDelBoton();
    expect(service.actualizarFormaValida).toHaveBeenCalledWith({ dataDeLaSolicitud: true });
  });
});
