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
import { of, Subject, throwError } from 'rxjs';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let importacionDeAcuiculturaServices: ImportacionDeAcuiculturaService;
  let consultaQuery: ConsultaioQuery;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        DatosDeLaSolicitudComponent, // ✅ standalone component
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
                    numeroGuia: '12345'
                  },
                  mercanciaGroup: {},
                  detalles: {}
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
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create datosMercanciaFormGroup on ngOnInit', () => {
    component.ngOnInit();
    expect(component.datosMercanciaFormGroup).toBeDefined();
    expect(component.datosMercanciaFormGroup.contains('realizarGroup')).toBeTruthy();
    expect(component.datosMercanciaFormGroup.contains('mercanciaGroup')).toBeTruthy();
    expect(component.datosMercanciaFormGroup.contains('detalles')).toBeTruthy();
  });
});
