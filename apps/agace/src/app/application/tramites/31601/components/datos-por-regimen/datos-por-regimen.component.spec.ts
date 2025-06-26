import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosPorRegimenComponent } from './datos-por-regimen.component';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { TableComponent } from '@libs/shared/data-access-user/src';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { Tramite31601Store } from '../../../../estados/tramites/tramite31601.store';
import { Tramite31601Query } from '../../../../estados/queries/tramite31601.query';
import { TramiteAgaceStore } from '../../../../estados/tramites/tramitesagace.store';
import { of, Subject } from 'rxjs';

jest.mock('@libs/shared/theme/assets/json/31601/datos-por-regimen.json', () => ({
  __esModule: true,
  default: {
    tableHeader: [
      "Denominacion Social",
      "RFC",
      "Número de empleados",
      "1er Bimestre",
      "Número de empleados",
      "2do Bimestre",
      "Número de empleados",
      "3er Bimestre"
    ],
    tableBody: []
  }
}), { virtual: true });

describe('DatosPorRegimenComponent', () => {
  let component: DatosPorRegimenComponent;
  let fixture: ComponentFixture<DatosPorRegimenComponent>;
  let validacionesService: any;
  let pantallaSvc: any;
  let tramite31601Store: any;
  let tramite31601QueryMock: any;
  let tramiteAgaceStoreMock: any;

  beforeEach(async () => {
    validacionesService = {
      isValid: jest.fn()
    };
    pantallaSvc = {
      getBimestreUnoCatalogo: jest.fn(),
      getBimestreDosCatalogo: jest.fn(),
      getBimestreTresCatalogo: jest.fn()
    };
    tramite31601Store = {
      setComboBimestresOne: jest.fn(),
      setComboBimestresTwo: jest.fn(),
      setComboBimestresThree: jest.fn()
    };
    tramite31601QueryMock = {
      selectSolicitud$: of({
        importaciones: '',
        infraestructuraIndique: '',
        ultimosMeses: '',
        operacionesmeses: '',
        valor: '',
        transferencias: 0,
        transferenciasVir: 0,
        retornos: 0,
        retornosSe: 0,
        constancias: 0,
        constanciasDe: 0,
        total: '',
        totals: '',
        empleadosPropiosRegimen: '',
        numeroEmpleadosUno: 1,
        numeroEmpleadosDos: 1,
        numeroEmpleadosTres: 1,
        comboBimestresUno: '',
        comboBimestresDos: '',
        comboBimestresTres: '',
        proveedorCumplimiento: '',
        declaracionISR: '',
        cancelacion: '',
        cumplimientoReglas: '',
        recintoFiscalizado: '',
        recintoEstrategico: '',
        cumplimientoLineamientos: '',
        nombreCompleto: '',
        tipoDePersonaMiembro: '',
        nombreMiembro: '',
        apellidoPaternoMiembro: '',
        apellidoMaternoMiembro: '',
        nombreDeLaEmpresaMiembro: '',
        miembrosSeleccionados: [],
        autorizacionIVAIEPS: '',
        regimen_0: false,
        regimen_1: false,
        regimen_2: false,
        regimen_3: false,
        sectorProductivo: '',
        servicio: '',
        preOperativo: false,
        indiqueSi: false,
        senale: false,
        empPropios: '',
        bimestre: '',
        senaleSi: false,
        seMomento: false,
        cumplir: false,
        indique: false,
        encuentra: false,
        delMismo: false,
        senaleMomento: false,
        enCaso: false,
        comboBimestresIDCSeleccione: '',
        ingresar: false,
        encuentraSus: false,
        registrosQue: '',
        registrosQue2: '',
        momentoIngresar: false,
        indiqueCuenta: false,
        nombreDel: '',
        lugarDeRadicacion: '',
        contabilidad: false,
        rmfRadio: false,
        vinculacionRegistroCancelado: false,
        proveedoresListadoSAT: false,
        indiqueCheck: false,
        resigtro: '',
        telefono: '',
        correo: '',
        manifieste: '',
        indiqueIva: '',
        empleados: false,
        infraestructura: false,
        monto: false,
        antiguedad: false,
        tipoDe: '',
        valorPesos: '',
        descripcion: '',
        haContado: '',
        enCasoIva: '',
        numeroOperacion: '',
        banco: '',
        llavePago: '',
        squemaIntegral: '',
        sidoModificadas: '',
        ensucaracterde: '',
        rfc: '',
        obligadoaTributarenMexico: '',
        nacionalidad: '',
        registroFederaldeContribuyentes: '',
        resigtroReprestantante: '',
        rfcReprestantante: '',
        nombreReprestante: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        cuidad: '',
        cargo: '',
        telefonoReprestantante: '',
        correoReprestantante: '',
        suplente: '',
        tipoDocumento: ''
      })
    };
    tramiteAgaceStoreMock = {
      establecerComboBimestresUno: jest.fn(),
      establecerComboBimestresDos: jest.fn(),
      establecerComboBimestresTres: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ReactiveFormsModule,
        DatosPorRegimenComponent,
        TituloComponent,
        CatalogoSelectComponent,
        TableComponent,
      ],
      providers: [
        { provide: ValidacionesFormularioService, useValue: validacionesService },
        { provide: ServiciosPantallaService, useValue: pantallaSvc },
        { provide: Tramite31601Store, useValue: tramite31601Store },
        { provide: Tramite31601Query, useValue: tramite31601QueryMock },
        { provide: TramiteAgaceStore, useValue: tramiteAgaceStoreMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosPorRegimenComponent);
    component = fixture.componentInstance;

    pantallaSvc.getBimestreUnoCatalogo.mockReturnValue(
      of({ code: 200, message: 'Success', data: [] })
    );
    pantallaSvc.getBimestreDosCatalogo.mockReturnValue(
      of({ code: 200, message: 'Success', data: [] })
    );
    pantallaSvc.getBimestreTresCatalogo.mockReturnValue(
      of({ code: 200, message: 'Success', data: [] })
    );

    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el catálogo uno al iniciar', () => {
    expect(pantallaSvc.getBimestreUnoCatalogo).toHaveBeenCalledTimes(1);
  });

  it('debe inicializar el formulario al crear', () => {
    expect(component.regimenForm).toBeDefined();
  });

  it('debe crear el formulario al inicializar', () => {
    component.crearRegimenForm();
    expect(component.regimenForm).toBeDefined();
  });

  it('debe validar los campos del formulario', () => {
    validacionesService.isValid.mockReturnValue(true);
    expect(component.isValid('importaciones')).toBe(true);
    expect(validacionesService.isValid).toHaveBeenCalledWith(
      component.regimenForm,
      'importaciones'
    );
  });

  it('debe manejar las selecciones de bimestres', () => {
    component.regimenForm.get('comboBimestresUno')?.setValue('Bimestre 1');
    component.bimestreUnoSeleccion();
    expect(tramiteAgaceStoreMock.establecerComboBimestresUno).toHaveBeenCalledWith(
      'Bimestre 1'
    );

    component.regimenForm.get('comboBimestresDos')?.setValue('Bimestre 2');
    component.bimestreDosSeleccion();
    expect(tramiteAgaceStoreMock.establecerComboBimestresDos).toHaveBeenCalledWith(
      'Bimestre 2'
    );

    component.regimenForm.get('comboBimestresTres')?.setValue('Bimestre 3');
    component.bimestreTresSeleccion();
    expect(tramiteAgaceStoreMock.establecerComboBimestresTres).toHaveBeenCalledWith(
      'Bimestre 3'
    );
  });

  it('debe abrir el modal e inicializar el formulario', () => {
    component.abrirModal();
    expect(component.modal).toBe('show');
    expect(component.agregarForm).toBeDefined();
      });
});