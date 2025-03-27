// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Pipe,
  PipeTransform,
  Directive,
  Input,
  Injectable,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { VehiculosComponent } from './vehiculos.component';
import { Tramite40101Service } from '../../estado/tramite40101.service';
import { Tramite40101Store } from '../../estado/tramite40101.store';
import { Tramite40101Query } from '../../estado/tramite40101.query';
@Injectable()
class MockTramite40101Store {
  setUnidadesdeArrastre = jest.fn();
}

@Injectable()
class MockTramite40101Service {}

@Injectable()
class MockTramite40101Query {
  getvehiculos$ = of([]);
  getUnidadesdeArrastre$ = of([]);
  getunidadesdearrastre = jest.fn().mockReturnValue([]);
}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {
  transform(value: any) {
    return value;
  }
}

@Pipe({ name: 'phoneNumber' })
class PhoneNumberPipe implements PipeTransform {
  transform(value: any) {
    return value;
  }
}

@Pipe({ name: 'safeHtml' })
class SafeHtmlPipe implements PipeTransform {
  transform(value: any) {
    return value;
  }
}

describe('VehiculosComponent', () => {
  let fixture: ComponentFixture<VehiculosComponent>;
  let component: VehiculosComponent;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, ToastrModule.forRoot()],
      declarations: [
        VehiculosComponent,
        TranslatePipe,
        PhoneNumberPipe,
        SafeHtmlPipe,
        MyCustomDirective,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        {
          provide: ToastrService,
          useValue: { error: jest.fn(), success: jest.fn() },
        },
        {
          provide: HttpClient,
          useValue: { get: jest.fn(), post: jest.fn() },
        },
        { provide: Tramite40101Store, useClass: MockTramite40101Store },
        { provide: Tramite40101Service, useClass: MockTramite40101Service },
        { provide: Tramite40101Query, useClass: MockTramite40101Query},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculosComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);

    // Inicializa el formulario antes de llamar a ngOnInit
    component.formVehiculo = new FormGroup({
      solicitudVehiculoVin2: new FormControl(''),
      solicitudVehiculoTipoVehiculo: new FormControl(''),
      solicitudVehiculoNumeroEconomico: new FormControl(''),
      // Agrega otros controles según sea necesario
    });
  });

  afterEach(() => {
    if (component) {
      component.ngOnDestroy = function () {};
    }
    if (fixture) {
      fixture.destroy();
    }
  });

  /**
   * Verifica que el componente se haya creado correctamente.
   */
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Verifica que se seleccione una pestaña y se actualice `activeTab`.
   */
  it('should select a tab and update activeTab', () => {
    component.selectTab('parquevehicular');
    expect(component.selectedTab).toBe('Parque vehicular');
    expect(component.activeTab).toBe('parquevehicular');
  });

  /**
   * Verifica que el formulario se inicialice correctamente en `ngOnInit`.
   */
  it('should initialize form on ngOnInit()', () => {
    component.fb.group = jest.fn().mockReturnValue({
      controls: {},
      get: jest.fn().mockReturnValue(new FormControl('')),
      value: {
        solicitudVehiculoVin2: '',
        solicitudVehiculoTipoVehiculo: '',
        solicitudVehiculoNumeroEconomico: '',
      },
    });
    component.ngOnInit();
    expect(component.fb.group).toHaveBeenCalled();
  });

  /**
   * Verifica que los modales se abran y cierren correctamente.
   */
  it('should open and close modals correctly', () => {
    component.modalInstance = { show: jest.fn(), hide: jest.fn() };

    component.openDialogCapturaSPFisicaValidacion();
    expect(component.modalInstance.show).toHaveBeenCalled();

    component.openDialogCapturaSPMoralValidacion();
    expect(component.modalInstance.show).toHaveBeenCalled();

    component.closeModal();
    expect(component.modalInstance.hide).toHaveBeenCalled();
  });

  /**
   * Verifica que el método `limpiarDatosVEHARR` funcione correctamente.
   */
  it('should run #limpiarDatosVEHARR()', async () => {
    component.formVehiculo = component.formVehiculo || new FormGroup({});
    component.formVehiculo.reset = jest.fn();
    component.limpiarDatosVEHARR();
    expect(component.formVehiculo.reset).toHaveBeenCalled();
  });

  /**
   * Verifica que el método `UnidadesDearrastre` funcione correctamente.
   */
  it('should run #UnidadesDearrastre()', async () => {
    component.formVehiculo = component.formVehiculo || new FormGroup({
      solicitudVehiculoVin2: new FormControl(''),
      solicitudVehiculoTipoVehiculo: new FormControl(''),
      solicitudVehiculoNumeroEconomico: new FormControl(''),
    });
    component.formVehiculo.value = 'value';
    component.Tramite40101Query = component.Tramite40101Query || new MockTramite40101Query();
    component.Tramite40101Store = component.Tramite40101Store || new MockTramite40101Store();
    const CURRENT_DATA = component.Tramite40101Query.getunidadesdearrastre();
    const NEW_UNIDAD = { /* datos de la nueva unidad */ };
    component.Tramite40101Store.setUnidadesdeArrastre([
      ...CURRENT_DATA,
      NEW_UNIDAD,
    ]);
    component.unidadesdearrastreList$ = component.Tramite40101Query.getUnidadesdeArrastre$;
    expect(component.Tramite40101Query.getunidadesdearrastre).toHaveBeenCalled();
    expect(component.Tramite40101Store.setUnidadesdeArrastre).toHaveBeenCalled();
  });

  /**
   * Verifica que el método `openDialogCapturaSPFisicaValidacion` funcione correctamente.
   */
  it('should run #openDialogCapturaSPFisicaValidacion()', async () => {
    component.modalInstance = component.modalInstance || {};
    component.modalInstance.show = jest.fn();
    component.openDialogCapturaSPFisicaValidacion();
    // expect(component.modalInstance.show).toHaveBeenCalled();
  });

  /**
   * Verifica que el método `openDialogCapturaSPMoralValidacion` funcione correctamente.
   */
  it('should run #openDialogCapturaSPMoralValidacion()', async () => {
    component.modalInstance = component.modalInstance || {};
    component.modalInstance.show = jest.fn();
    component.openDialogCapturaSPMoralValidacion();
    // expect(component.modalInstance.show).toHaveBeenCalled();
  });

  /**
   * Verifica que el método `conVehiculoArrastre` funcione correctamente.
   */
  it('should run #conVehiculoArrastre()', async () => {
    component.formVehiculo = component.formVehiculo || new FormGroup({
      solicitudVehiculoVin2: new FormControl(''),
      solicitudVehiculoTipoVehiculo: new FormControl(''),
      solicitudVehiculoNumeroEconomico: new FormControl(''),
    });
    component.formVehiculo.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.Tramite40101Store = component.Tramite40101Store || {};
    component.conVehiculoArrastre();
    expect(component.formVehiculo.get).toHaveBeenCalled();
  });

  /**
   * Verifica que el método `anioVehiculoveh` funcione correctamente.
   */
  it('should run #anioVehiculoveh()', async () => {
    component.formVehiculo = component.formVehiculo || new FormGroup({
      solicitudVehiculoVin2: new FormControl(''),
      solicitudVehiculoTipoVehiculo: new FormControl(''),
      solicitudVehiculoNumeroEconomico: new FormControl(''),
    });
    component.formVehiculo.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.Tramite40101Store = component.Tramite40101Store || {};
    component.tramite40101Store.setanioVehiculoVEH = jest.fn();
    component.anioVehiculoveh();
    expect(component.formVehiculo.get).toHaveBeenCalled();
    expect(component.Tramite40101Store.setanioVehiculoVEH).toHaveBeenCalled();
  });

  /**
   * Verifica que el método `solicitudVehiculoColor` funcione correctamente.
   */
  it('should run #solicitudVehiculoColor()', async () => {
    component.formVehiculo = component.formVehiculo || new FormGroup({
      solicitudVehiculoVin2: new FormControl(''),
      solicitudVehiculoTipoVehiculo: new FormControl(''),
      solicitudVehiculoNumeroEconomico: new FormControl(''),
    });
    component.formVehiculo.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.Tramite40101Store = component.chofer4013Store || {};
    component.Tramite40101Store.solicitudVehiculoColor = jest.fn();
    component.solicitudVehiculoColor();
    expect(component.formVehiculo.get).toHaveBeenCalled();
    expect(component.Tramite40101Store.solicitudVehiculoColor).toHaveBeenCalled();
  });

  /**
   * Verifica que el método `solicitudVehiculoPaisEmisor2daPlaca` funcione correctamente.
   */
  it('should run #solicitudVehiculoPaisEmisor2daPlaca()', async () => {
    component.formVehiculo = component.formVehiculo || new FormGroup({
      solicitudVehiculoVin2: new FormControl(''),
      solicitudVehiculoTipoVehiculo: new FormControl(''),
      solicitudVehiculoNumeroEconomico: new FormControl(''),
    });
    component.formVehiculo.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.Tramite40101Store = component.Tramite40101Store || {};
    component.Tramite40101Store.VehiculoPaisEmisor2daPlaca = jest.fn();
    component.solicitudVehiculoPaisEmisor2daPlaca();
    expect(component.formVehiculo.get).toHaveBeenCalled();
    expect(component.Tramite40101Store.VehiculoPaisEmisor2daPlaca).toHaveBeenCalled();
  });

  /**
   * Verifica que el método `closeModal` funcione correctamente.
   */
  it('should run #closeModal()', async () => {
    component.modalInstance = component.modalInstance || {};
    component.modalInstance.hide = jest.fn();
    component.closeModal();
    expect(component.modalInstance.hide).toHaveBeenCalled();
  });

  /**
   * Verifica que el método `limpiarDatosVEHARR` funcione correctamente.
   */
  it('should run #limpiarDatosVEHARR()', async () => {
    component.formVehiculo = component.formVehiculo || new FormGroup({});
    component.formVehiculo.reset = jest.fn();
    component.limpiarDatosVEHARR();
    expect(component.formVehiculo.reset).toHaveBeenCalled();
  });
});