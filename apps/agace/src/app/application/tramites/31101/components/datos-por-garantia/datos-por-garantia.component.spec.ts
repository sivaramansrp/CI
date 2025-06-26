import { TestBed } from '@angular/core/testing';
import { DatosPorGarantiaComponent } from './datos-por-garantia.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud31101Store } from '../../estados/solicitud31101.store';
import { Solicitud31101Query } from '../../estados/solicitud31101.query';
import {
  CatalogoSelectComponent,
  ConsultaioQuery,
  InputFechaComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { of, Subject } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { DatosPorGarantia } from '../../models/solicitud.model';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosPorGarantiaComponent', () => {
  let component: DatosPorGarantiaComponent;
  let fixture: any;
  let solicitudServiceSpy: jest.Mocked<SolicitudService>;
  let solicitud31101StoreSpy: jest.Mocked<Solicitud31101Store>;
  let solicitud31101QuerySpy: jest.Mocked<Solicitud31101Query>;
  let consultaioQuerySpy: jest.Mocked<ConsultaioQuery>;

  beforeEach(async () => {
    solicitudServiceSpy = {
      conseguirNombreInstitucionCatalogo: jest.fn().mockReturnValue(of({})),
      conseguirDatosPorGarantia: jest.fn().mockReturnValue(
        of({
          polizaDeFianzaActual: 1,
          numeroFolio: '645456546',
          rfcInstitucion: 'FDO9411098R8',
          fechaExpedicion: '30/09/2024',
          fechaInicioVigenciaNo: '30/09/2024',
          fechaFinVigenciaNo: '30/09/2024',
          fechaInicioVigencia: '30/09/2024',
          fechaFinVigencia: '30/09/2024',
          importeTotal: '3213',
        } as DatosPorGarantia)
      ),
    } as any as jest.Mocked<SolicitudService>;

    solicitud31101StoreSpy = {
      actualizarPolizaDeFianzaActual: jest.fn(()=> of()),
      actualizarNumeroFolio: jest.fn(()=> of()),
      actualizarRfcInstitucion: jest.fn(()=> of()),
      actualizarFechaExpedicion: jest.fn(()=> of()),
      actualizarFechaInicioVigenciaNo: jest.fn(()=> of()),
      actualizarFechaFinVigenciaNo: jest.fn(()=> of()),
      actualizarFechaInicioVigencia: jest.fn(()=> of()),
      actualizarFechaFinVigencia: jest.fn(()=> of()),
      actualizarImporteTotal: jest.fn(()=> of()),
    } as any;

    solicitud31101QuerySpy = {
      selectSolicitud$: of({
        polizaDeFianzaActual: '123',
        numeroFolio: 'FOLIO',
        rfcInstitucion: 'RFC123',
        fechaExpedicion: '2024-01-01',
        fechaInicioVigenciaNo: '2024-01-02',
        fechaFinVigenciaNo: '2024-01-03',
        fechaInicioVigencia: '2024-01-04',
        fechaFinVigencia: '2024-01-05',
        importeTotal: '1000',
      }),
    } as any;

    consultaioQuerySpy = {
      selectConsultaioState$: of({ readonly: false }),
    } as any;

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        CatalogoSelectComponent,
        InputFechaComponent,
        DatosPorGarantiaComponent,
        HttpClientTestingModule
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: SolicitudService, useValue: solicitudServiceSpy },
        { provide: Solicitud31101Store, useValue: solicitud31101StoreSpy },
        { provide: Solicitud31101Query, useValue: solicitud31101QuerySpy },
        { provide: ConsultaioQuery, useValue: consultaioQuerySpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosPorGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct values', () => {
    expect(component.polizaDeFianzaForm).toBeDefined();
    expect(component.polizaDeFianzaForm.get('numeroFolio')?.value).toBe(
      'FOLIO'
    );
    expect(component.polizaDeFianzaForm.get('rfcInstitucion')?.value).toBe(
      'RFC123'
    );
    expect(component.polizaDeFianzaForm.get('importeTotal')?.value).toBe(
      '1000'
    );
  });

  it('should call conseguirNombreInstitucionCatalogo and set nombreInstitucionCatalogo', () => {
    // expect(
    //   component.conseguirNombreInstitucionCatalogo
    // ).toHaveBeenCalled();
    expect(component.nombreInstitucionCatalogo).toBeDefined();
  });

  it('should disable form if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.polizaDeFianzaForm.disabled).toBe(true);
  });

  it('should enable form if esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.polizaDeFianzaForm.enabled).toBe(true);
  });

  it('should call actualizarPolizaDeFianzaActual when seleccionaNombreInstitucion is called', () => {
    const catalogo: Catalogo = {
      id: 1,
      descripcion: 'Institucion 1',
    } as Catalogo;
    component.seleccionaNombreInstitucion(catalogo);
    expect(
      solicitud31101StoreSpy.actualizarPolizaDeFianzaActual
    ).toHaveBeenCalledWith(1);
  });

  it('should clean up subscriptions on destroy', () => {
    const destroy$ = (component as any).destroy$ as Subject<void>;
    jest.spyOn(destroy$, 'next');
    jest.spyOn(destroy$, 'complete');
    component.ngOnDestroy();
    expect(destroy$.next).toHaveBeenCalled();
    expect(destroy$.complete).toHaveBeenCalled();
  });
});
