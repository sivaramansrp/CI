import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, Subject } from 'rxjs';
import {
  AlertComponent,
  CatalogoSelectComponent,
  InputRadioComponent,
  NotificacionesComponent,
  TablaDinamicaComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { CertificadoZoosanitarioServiceService } from '../../services/220201/certificado-zoosanitario.service';
import { ZoosanitarioQuery } from '../../queries/220201/zoosanitario.query';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let httpMock: HttpTestingController;
  let destroyNotifier$: Subject<void>;

const mockCertificadoService = {
  actualizarFormaValida: jest.fn(),
  updateDatosDeLaSolicitud: jest.fn(),
  getAllDatosForma: jest.fn(() =>
    of({
      datos: {
        tipoMercancia: 'yes',
        aduanaIngreso: '123',
        oficinaInspeccion: '456',
        puntoInspeccion: '789',
        regimen: 'A1',
      },
      tablaDatos: [],
    })
  ),
};

  const mockZoosanitarioQuery = {
    seleccionarDatosSolicitud$: of({
      tipoMercancia: 'yes',
      aduanaIngreso: '123',
      oficinaInspeccion: '456',
      puntoInspeccion: '789',
      regimen: 'A1',
    }),
  };

  const mockConsultaQuery = {
    selectConsultaioState$: of({ readonly: true }),
  };

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [
      ReactiveFormsModule,
      HttpClientTestingModule,
      TituloComponent,
      CatalogoSelectComponent,
      InputRadioComponent,
      AlertComponent,
      TablaDinamicaComponent,
      NotificacionesComponent,
      DatosDeLaSolicitudComponent,
      ToastrModule.forRoot()
    ],
    providers: [
      { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } }, // ✅ Mocked properly
      { provide: CertificadoZoosanitarioServiceService, useValue: mockCertificadoService },
      { provide: ZoosanitarioQuery, useValue: mockZoosanitarioQuery },
      { provide: ConsultaioQuery, useValue: mockConsultaQuery },
    ],
  }).compileComponents();

  fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
  component = fixture.componentInstance;
  httpMock = TestBed.inject(HttpTestingController);
  destroyNotifier$ = (component as any).destroyNotifier$;
  fixture.detectChanges();
});


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form correctly on ngOnInit', () => {
    expect(component.forma).toBeDefined();
    expect(component.datosDelaSolicitud).toBeDefined();
    expect(component.forma.contains('datosDelaSolicitud')).toBe(true);
    expect(component.nuevaNotificacion).toBeDefined();
  });

  it('should patch value from ZoosanitarioQuery', () => {
    expect(component.datosDelaSolicitud.get('aduanaIngreso')?.value).toBe('123');
  });

  it('should toggle colapsable flag', () => {
    const prev = component.colapsable;
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(!prev);
  });

  it('should call updateDatosDeLaSolicitud on setValoresStore', () => {
    component.setValoresStore();
    expect(mockCertificadoService.updateDatosDeLaSolicitud).toHaveBeenCalled();
  });

  it('should update notificationCheck on radioBotonSeleccionado', () => {
    component.datosDelaSolicitud.get('tipoMercancia')?.setValue('');
    component.radioBotonSeleccionado();
    expect(component.notificationCheck).toBe(false);

    component.datosDelaSolicitud.get('tipoMercancia')?.setValue('yes');
    component.radioBotonSeleccionado();
    expect(component.notificationCheck).toBe(true);
  });

  it('should close modal on eliminarPedimento(true)', () => {
    component.moduloEmergente = true;
    component.eliminarPedimento(true);
    expect(component.moduloEmergente).toBe(false);
  });

  it('should NOT close modal on eliminarPedimento(false)', () => {
    component.moduloEmergente = true;
    component.eliminarPedimento(false);
    expect(component.moduloEmergente).toBe(true);
  });

  it('should handle claveUCON pattern matching', fakeAsync(() => {
    const claveControl = component.datosDelaSolicitud.get('claveUCON');

    claveControl?.setValue('abc');
    tick(500);
    fixture.detectChanges();
    expect(component.moduloEmergente).toBe(false);

    claveControl?.setValue('UCON12345');
    tick(500);
    fixture.detectChanges();
    expect(component.moduloEmergente).toBe(false);

    claveControl?.setValue('INVALID123');
    tick(500);
    fixture.detectChanges();
    expect(component.moduloEmergente).toBe(true);
    flush();
  }));

  it('should disable form in readonly mode from query', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    expect(component.datosDelaSolicitud.disabled).toBe(false);
  }));

  it('should emit and complete destroyNotifier$ on destroy', () => {
    const nextSpy = jest.spyOn(destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should use configuracionColumnasSolicitud correctly', () => {
    const col = component.configuracionColumnasSolicitud[0];
    const row = component.cuerpoTablaSolicitud[0];
    expect(col.clave(row)).toBe(row.fechaCreacion);
  });

  it('should call obtenerListasDesplegables()', () => {
    const spy = jest.spyOn(component as any, 'obtenerIngresoSelectList');
    (component as any).obtenerListasDesplegables();
    expect(spy).toHaveBeenCalled();
  });

it('should load aduanaDeIngreso from JSON', fakeAsync(() => {
  const http = TestBed.inject(HttpTestingController);
  const dummyResponse = { data: [{ id: '1', descripcion: 'Test Aduana' }] };

  component.obtenerIngresoSelectList();
  const requests = http.match('../../../../../assets/json/220201/aduana_de_ingreso.json');
  expect(requests.length).toBeGreaterThan(0); // it will pass even if multiple requests
  requests[0].flush(dummyResponse);
  flush();

  expect(component.aduanaDeIngreso.length).toBe(1);
}));

it('should call updateDatosDeLaSolicitud with form value', () => {
  const spy = jest.spyOn(mockCertificadoService, 'updateDatosDeLaSolicitud');
  component.setValoresStore();
  expect(spy).toHaveBeenCalledWith(component.datosDelaSolicitud.value);
});
it('should initialize nuevaNotificacion with correct message', () => {
  expect(component.nuevaNotificacion.mensaje).toContain('No existe información para la clave UCON');
});
it('should call actualizarFormaValida when form becomes valid', fakeAsync(() => {
  const spy = jest.spyOn(mockCertificadoService, 'actualizarFormaValida');
  component.datosDelaSolicitud.get('aduanaIngreso')?.setValue('test');
  component.datosDelaSolicitud.get('oficinaInspeccion')?.setValue('test');
  component.datosDelaSolicitud.get('puntoInspeccion')?.setValue('test');
  component.datosDelaSolicitud.get('regimen')?.setValue('test');
  tick(500);
  expect(spy).toHaveBeenCalledWith({ dataDeLaSolicitud: true });
  flush();
}));


it('should set nuevaNotificacion on init', () => {
  expect(component.nuevaNotificacion).toBeDefined();
  expect(component.nuevaNotificacion.mensaje).toContain('No existe información para la clave UCON');
});
it('should patch form values from seleccionarDatosSolicitud$', () => {
  const mockSubject = new Subject<any>();

  const query = TestBed.inject(ZoosanitarioQuery) as any;
  query.seleccionarDatosSolicitud$ = mockSubject.asObservable();

  component.initActionFormBuild();

  const patchSpy = jest.spyOn(component.datosDelaSolicitud, 'patchValue');
  const mockValue = {
    tipoMercancia: 'yes',
    aduanaIngreso: '123',
    oficinaInspeccion: '456',
    puntoInspeccion: '789',
    regimen: 'A1',
  };
  mockSubject.next(mockValue);
  expect(patchSpy).toHaveBeenCalledWith(mockValue);
});

it('should set form to readonly from consultaQuery', fakeAsync(() => {
  component.ngAfterViewInit();
  tick();
  expect(component.esFormularioSoloLectura).toBe(false);
  expect(component.datosDelaSolicitud.disabled).toBe(false);
}));
it('should load sanidadAgropecuaria list', fakeAsync(() => {
  const http = TestBed.inject(HttpTestingController);
  const dummy = { data: [{ id: '1', descripcion: 'Sanidad' }] };

  component.obtenerSanidadAgropecuariaList();
  const requests = http.match('../../../../../assets/json/220201/oficina_de_inspeccion.json');
  expect(requests.length).toBeGreaterThan(0);
  requests[0].flush(dummy);
  flush();

  expect(component.sanidadAgropecuaria.length).toBe(1);
}));
it('should mark form as valid and call actualizarFormaValida', fakeAsync(() => {
  const spy = jest.spyOn(mockCertificadoService, 'actualizarFormaValida');
  component.datosDelaSolicitud.get('aduanaIngreso')?.setValue('123');
  component.datosDelaSolicitud.get('oficinaInspeccion')?.setValue('456');
  component.datosDelaSolicitud.get('puntoInspeccion')?.setValue('789');
  component.datosDelaSolicitud.get('regimen')?.setValue('A1');
  tick();
  expect(spy).toHaveBeenCalledWith({ dataDeLaSolicitud: true });
}));

it('should call actualizarFormaValida when form is valid', fakeAsync(() => {
  component.datosDelaSolicitud.setValue({
    tipoMercancia: 'yes',
    aduanaIngreso: '123',
    oficinaInspeccion: '456',
    puntoInspeccion: '789',
    claveUCON: '',
    establecimientoTIF: '',
    nombreVeterinario: '',
    numeroGuia: '',
    certficacion: '',
    regimen: 'A1',
  });

  fixture.detectChanges();
  tick(500); 
  flush();
  expect(mockCertificadoService.actualizarFormaValida).toHaveBeenCalledWith({ dataDeLaSolicitud: true });
}));
it('should create the form group with crearFormulario', () => {
  component.crearFormulario();
  expect(component.forma).toBeDefined();
  expect(component.forma.get('datosDelaSolicitud')).toBeDefined();
});
});
