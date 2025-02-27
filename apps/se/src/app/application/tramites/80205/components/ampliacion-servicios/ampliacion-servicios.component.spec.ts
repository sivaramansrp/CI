import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AmpliacionServiciosComponent } from './ampliacion-servicios.component';
import { AmpliacionServiciosService } from 'libs/shared/data-access-user/src/core/services/80205/ampliacion-servicios.service';
import { of } from 'rxjs';

const mockAmpliacionServiciosService = {
  getDatos: jest.fn(),
  obtenerIngresoSelectList: jest.fn(),
};

describe('AmpliacionServiciosComponent', () => {
  let component: AmpliacionServiciosComponent;
  let fixture: ComponentFixture<AmpliacionServiciosComponent>;
  let ampliacionServiciosService: AmpliacionServiciosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmpliacionServiciosComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [
        FormBuilder,
        { provide: AmpliacionServiciosService, useValue: mockAmpliacionServiciosService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmpliacionServiciosComponent);
    component = fixture.componentInstance;
    ampliacionServiciosService = TestBed.inject(AmpliacionServiciosService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on init', () => {
    jest.spyOn(component, 'obtenerIngresoSelectList');
    jest.spyOn(component, 'inicializarFormularioInfoRegistro');
    jest.spyOn(component, 'getDatos');

    component.ngOnInit();

    expect(component.obtenerIngresoSelectList).toHaveBeenCalled();
    expect(component.inicializarFormularioInfoRegistro).toHaveBeenCalled();
    expect(component.getDatos).toHaveBeenCalled();
  });

  it('should handle data from child', () => {
    const data = { descripcion: 'Test', tipode: 'TestType' };
    component.procesarDatosDelHijo(data);
    expect(component.recibioDatos).toEqual(data);
  });

  it('should get datos', () => {
    const response = {
      code: 200,
      data: {
        infoServicios: {
          seleccionaLaModalidad: 'Modalidad',
          folio: '12345',
          año: '2021'
        }
      }
    };
    jest.spyOn(ampliacionServiciosService, 'getDatos').mockReturnValue(of(response));

    component.getDatos();

    expect(component.infoRegistro).toEqual(response.data.infoServicios);
    expect(component.inicializarFormularioInfoRegistro).toHaveBeenCalled();
  });

  it('should initialize formulario info registro', () => {
    component.infoRegistro = {
      seleccionaLaModalidad: 'Modalidad',
      folio: '12345',
      año: '2021'
    };

    component.inicializarFormularioInfoRegistro();

    expect(component.formularioInfoRegistro.value).toEqual({
      seleccionaLaModalidad: 'Modalidad',
      folio: '12345',
      año: '2021'
    });
  });

  it('should create empty form', () => {
    component.crearFormulario();
    expect(component.forma.contains('datosDelaSolicitud')).toBeTruthy();
  });

  it('should initialize action form build', () => {
    component.initActionFormBuild();
    expect(component.datosDelaSolicitud.contains('aduanaIngreso')).toBeTruthy();
  });

  it('should eliminar servicios grid', () => {
    component.datosImmex = [{ descripiónDelServicio: 'Service1' }, { descripiónDelServicio: 'Service2' }];
    component.domiciliosSeleccionados = [{ descripiónDelServicio: 'Service1' }];
    component.eliminarServiciosGrid();
    expect(component.datosImmex.length).toBe(1);
  });

  it('should agregar servicios ampliacion', () => {
    component.recibioDatos = { descripcion: 'Test', tipode: 'TestType' };
    component.agregarServiciosAmpliacion();
    expect(component.datosImmex.length).toBe(1);
    expect(component.datosImmex[0].descripiónDelServicio).toBe('Test');
  });

  it('should eliminar empresas nacionales', () => {
    component.datos = [{ RegistroContribuyente: 'RFC1' }, { RegistroContribuyente: 'RFC2' }];
    component.empresasSeleccionados = [{ RegistroContribuyente: 'RFC1' }];
    component.eliminarEmpresasNacionales();
    expect(component.datos.length).toBe(1);
  });

  it('should actualizar grid empresas nacionales', () => {
    component.rfcEmpresa = 'RFC123';
    component.numeroPrograma = 'Prog123';
    component.tiempoPrograma = '12 meses';
    component.actualizaGridEmpresasNacionales();
    expect(component.datos.length).toBe(1);
    expect(component.datos[0].RegistroContribuyentes).toBe('RFC123');
  });

  it('should call obtenerIngresoSelectList and update aduanaDeIngreso', () => {
    const mockResponse = { data: [{ id: 1, descripcion: 'Aduana 1' }] };
    jest.spyOn(ampliacionServiciosService, 'obtenerIngresoSelectList').mockReturnValue(of(mockResponse));

    component.obtenerIngresoSelectList();
    fixture.detectChanges();

    expect(component.aduanaDeIngreso.length).toBeGreaterThan(0);
    expect(component.aduanaDeIngreso[0].descripcion).toBe('Aduana 1');
  });

  it('should seleccionar domicilios', () => {
    const mockDomicilios = { calle: 'Test Street', numero: '123' };
    component.seleccionarDomicilios(mockDomicilios);
    expect(component.domiciliosSeleccionados.length).toBe(1);
    expect(component.domiciliosSeleccionados[0].calle).toBe('Test Street');
  });

  it('should seleccionar empresas', () => {
    const mockEmpresas = { nombre: 'Test Company', rfc: 'RFC123' };
    component.seleccionarEmpresas(mockEmpresas);
    expect(component.empresasSeleccionados.length).toBe(1);
    expect(component.empresasSeleccionados[0].nombre).toBe('Test Company');
  });

  it('should unsubscribe from all subscriptions on destroy', () => {
    const subscriptionSpy = jest.spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(subscriptionSpy).toHaveBeenCalled();
  });
});