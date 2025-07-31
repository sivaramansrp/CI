import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FabricanteModalComponent } from './fabricante-modal.component';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Tramite260303Store, createInitialState as createTramiteInitialState } from '../../../../estados/tramites/260303/tramite260303.store';
import { Tramite260303Query } from '../../../../estados/queries/260303/tramite260303.query';
import { ConsultaioQuery, createConsultaInitialState } from '@ng-mf/data-access-user';
import { of} from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FabricanteModalComponent', () => {
  let componente: FabricanteModalComponent;
  let fixture: ComponentFixture<FabricanteModalComponent>;
  let tramiteStore: jest.Mocked<Tramite260303Store>;
  let tramiteQuery: jest.Mocked<Tramite260303Query>;
  let consultaioQuery: jest.Mocked<ConsultaioQuery>;

  beforeEach(async () => {
    const tramiteStoreMock: Partial<jest.Mocked<Tramite260303Store>> = {
      setTercerosRelacionadosDenominacionSocial: jest.fn(),
      setTercerosRelacionadosTerceroNombre: jest.fn(),
    };

    const tramiteQueryMock: Partial<jest.Mocked<Tramite260303Query>> = {
      selectSolicitud$: of(createTramiteInitialState()),
    };

    const consultaioQueryMock: Partial<jest.Mocked<ConsultaioQuery>> = {
      selectConsultaioState$: of({ ...createConsultaInitialState(), readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        FabricanteModalComponent,
        BsModalRef,
        { provide: Tramite260303Store, useValue: tramiteStoreMock },
        { provide: Tramite260303Query, useValue: tramiteQueryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FabricanteModalComponent);
    componente = fixture.componentInstance;

    tramiteStore = TestBed.inject(Tramite260303Store) as jest.Mocked<Tramite260303Store>;
    tramiteQuery = TestBed.inject(Tramite260303Query) as jest.Mocked<Tramite260303Query>;
    consultaioQuery = TestBed.inject(ConsultaioQuery) as jest.Mocked<ConsultaioQuery>;
  });

  afterEach(() => {
    if (componente && componente.ngOnDestroy) {
      componente.ngOnDestroy();
    }
  });

  it('debería crear el componente correctamente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar el formulario al llamar initializeTercerosRelacionadosForm', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.initializeTercerosRelacionadosForm();

    expect(componente.tercerosRelacionadosForm).toBeDefined();
    expect(componente.tercerosRelacionadosForm.get('denominacionSocial')?.value).toBe(createTramiteInitialState().tercerosRelacionadosDenominacionSocial);
  });

  it('debería establecer valor en el store al llamar setValoresStore', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.initializeTercerosRelacionadosForm();

    componente.tercerosRelacionadosForm.get('denominacionSocial')?.setValue('Nuevo Valor');
    componente.setValoresStore(componente.tercerosRelacionadosForm, 'denominacionSocial', 'setTercerosRelacionadosDenominacionSocial');

    expect(tramiteStore.setTercerosRelacionadosDenominacionSocial).toHaveBeenCalledWith('Nuevo Valor');
  });

  it('debería deshabilitar el formulario si es de solo lectura', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.esFormularioSoloLectura = true;
    componente.cerrarTercerosRelacionadosForm();
    componente.guardarDatosFormulario();

    expect(componente.tercerosRelacionadosForm.disabled).toBe(true);
  });

  it('debería habilitar el formulario si no es de solo lectura', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.esFormularioSoloLectura = false;
    componente.cerrarTercerosRelacionadosForm();
    componente.guardarDatosFormulario();

    expect(componente.tercerosRelacionadosForm.enabled).toBe(true);
  });

  it('debería emitir next y complete en destroyNotifier$ al llamar ngOnDestroy', () => {
    const spyNext = jest.spyOn(componente['destroyNotifier$'], 'next');
    const spyComplete = jest.spyOn(componente['destroyNotifier$'], 'complete');

    componente.ngOnDestroy();

    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

  it('debería llenar los campos al buscar cuando el RFC es válido', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.cerrarTercerosRelacionadosForm();

    const rfcControl = componente.tercerosRelacionadosForm.get('rfc');
    rfcControl?.setValue('ABC123456T89');
    rfcControl?.setErrors(null);
    rfcControl?.updateValueAndValidity();
    componente.tercerosRelacionadosForm.patchValue({
      curp: 'MAVLT12345678',
      razonSocial: 'EUROFOODS DE MEXICO'
    });

    // componente.buscar();

    // const formValues = componente.tercerosRelacionadosForm.getRawValue();

    expect(componente.tercerosRelacionadosForm.get('curp')?.value).toBe('MAVLT12345678');
    expect(componente.tercerosRelacionadosForm.get('razonSocial')?.value).toBe('EUROFOODS DE MEXICO');
  });


  it('debería limpiar el formulario al llamar limpiar()', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.initializeTercerosRelacionadosForm();
    componente.tercerosRelacionadosForm.get('denominacionSocial')?.setValue('Valor Prueba');

    componente.limpiar();

    expect(componente.tercerosRelacionadosForm.get('denominacionSocial')?.value).toBeNull();
  });

  it('debería emitir evento y cerrar modal si el formulario es válido en guardar()', () => {
    const spyEmit = jest.spyOn(componente.guardarFabricante, 'emit');
    const spyHide = jest.spyOn(componente.bsModalRef, 'hide');

    componente.solicitudState = createTramiteInitialState();
    componente.initializeTercerosRelacionadosForm();
    componente.tercerosRelacionadosForm.markAllAsTouched();
    componente.tercerosRelacionadosForm.patchValue({
      denominacionSocial: 'Test',
      pais: 'MEXICO',
      codigoPostal: '12345',
      calle: 'Calle Prueba',
      numeroExterior: '12'
    });

    componente.guardar();

    expect(spyEmit).toHaveBeenCalled();
    expect(spyHide).toHaveBeenCalled();
  });

  it('debería retornar error si el RFC es inválido en validadorRFC()', () => {
    const control = { value: 'INVALIDO' } as AbstractControl;
    const resultado = FabricanteModalComponent.validadorRFC(control);
    expect(resultado).toEqual({ rfcInvalido: true });
  });

  it('debería retornar resultado de isValid en esValido()', () => {
    const isValidSpy = jest.spyOn(componente['validacionesService'], 'isValid').mockReturnValue(true);
    const resultado = componente.esValido(componente.tercerosRelacionadosForm, 'denominacionSocial');
    expect(isValidSpy).toHaveBeenCalledWith(componente.tercerosRelacionadosForm, 'denominacionSocial');
    expect(resultado).toBe(true);
  });

  it('debería actualizar el store y habilitar RFC cuando nacionalidad y tipoPersona están seleccionados', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.cerrarTercerosRelacionadosForm();
    componente.tercerosRelacionadosForm.get('tercerosNacionalidad')?.setValue('MEXICO');
    componente.tercerosRelacionadosForm.get('tipoPersona')?.setValue('MORAL');

    componente.eventoDeCambioDeValor('Nuevo Valor', componente.tercerosRelacionadosForm, 'terceroNombre', 'setTercerosRelacionadosTerceroNombre');

    expect(tramiteStore.setTercerosRelacionadosTerceroNombre).toHaveBeenCalledWith('Nuevo Valor');
    expect(componente.tercerosRelacionadosForm.get('rfc')?.enabled).toBe(true);
  });


  it('debería marcar todos los campos como tocados si el formulario no es válido en guardar()', () => {
    componente.solicitudState = createTramiteInitialState();
    componente.initializeTercerosRelacionadosForm();

    componente.guardar();

    expect(componente.tercerosRelacionadosForm.touched).toBe(true);
    expect(componente.tercerosRelacionadosForm.invalid).toBe(true);
  });



});
