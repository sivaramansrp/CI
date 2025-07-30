import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FabricanteComponent } from './fabricante.component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260101Store } from '../../estados/tramites260101.store';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import {
  CatalogoSelectComponent,
  ConsultaioQuery,
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';

const mockSolicitudDatosService = {
  obtenerDestinatarioCatalogos: jest.fn().mockReturnValue(
    of({
      paisCatalogo: { catalogos: [{ id: 1, descripcion: 'México' }] },
      estadoCatalogo: { catalogos: [{ id: 2, descripcion: 'CDMX' }] },
      municipioCatalogo: {
        catalogos: [{ id: 3, descripcion: 'Benito Juárez' }],
      },
      localidadCatalogo: { catalogos: [{ id: 4, descripcion: 'Localidad' }] },
      codigoCatalogo: { catalogos: [{ id: 5, descripcion: '03100' }] },
      coloniaCatalogo: { catalogos: [{ id: 6, descripcion: 'Colonia' }] },
    })
  ),
  obtenerTercerosNacionalidadRadioOptions: jest.fn().mockReturnValue(
    of([
      { label: 'Nacional', value: 1 },
      { label: 'Extranjero', value: 2 },
    ])
  ),
  obtenerFabricanteRadio: jest.fn().mockReturnValue(
    of([
      { label: 'Moral', value: 1 },
      { label: 'Física', value: 2 },
    ])
  ),
  obtenerTercerosDestinatarioImitar: jest.fn().mockReturnValue(
    of({
      tercerosPais: 1,
    })
  ),
};

const mockSolicitud260101Store = {
  setTercerosPais: jest.fn(() => of()),
  setTercerosNacionalidad: jest.fn(() => of()),
  setTipoPersona: jest.fn(() => of()),
  setTercerosRFC: jest.fn(() => of()),
  setTercerosCurp: jest.fn(() => of()),
  setTercerosDenominacion: jest.fn(() => of()),
  setTercerosDenominacionNombre: jest.fn(() => of()),
  setTercerosApellidoPaterno: jest.fn(() => of()),
  setTercerosApellidoMaterno: jest.fn(() => of()),
  setTercerosEstado: jest.fn(() => of()),
  setTercerosMunicipio: jest.fn(() => of()),
  setTercerosLocalidad: jest.fn(() => of()),
  setTercerosCodigo: jest.fn(() => of()),
  setTercerosColonia: jest.fn(() => of()),
  setTercerosCalle: jest.fn(() => of()),
  setTercerosNumeroExterior: jest.fn(() => of()),
  setTercerosNumeroInterior: jest.fn(() => of()),
  setTercerosLada: jest.fn(() => of()),
  setTercerosTelefono: jest.fn(() => of()),
  setTercerosCorreoElectronico: jest.fn(() => of()),
};

const mockSolicitud260101Query = {
  seleccionarSolicitud$: of({
    tercerosNacionalidad: 1,
    tercerosTipoPersona: 1,
    tercerosRFC: 'RFC123456789',
    tercerosCurp: 'CURP123456789012',
    tercerosDenominacion: 'Empresa',
    tercerosDenominacionNombre: 'Nombre',
    tercerosApellidoPaterno: 'Paterno',
    tercerosApellidoMaterno: 'Materno',
    tercerosPais: 1,
    tercerosEstado: 2,
    tercerosMunicipio: 3,
    tercerosLocalidad: 4,
    tercerosCodigo: 5,
    tercerosColonia: 6,
    tercerosCalle: 'Calle',
    tercerosNumeroExterior: '10',
    tercerosNumeroInterior: '20',
    tercerosLada: '55',
    tercerosTelefono: '1234567890',
    tercerosCorreoElectronico: 'test@email.com',
    modificarFabricante: false,
  }),
};

const mockConsultaioQuery = {
  selectConsultaioState$: of({ readonly: false }),
};

describe('FabricanteComponent', () => {
  let component: FabricanteComponent;
  let fixture: ComponentFixture<FabricanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FabricanteComponent,
        CommonModule,
        ReactiveFormsModule,
        CatalogoSelectComponent,
        FormsModule,
        InputRadioComponent,
        TituloComponent,
      ],
      declarations: [],
      providers: [
        provideHttpClientTesting(),
        FormBuilder,
        { provide: SolicitudDatosService, useValue: mockSolicitudDatosService },
        { provide: Solicitud260101Store, useValue: mockSolicitud260101Store },
        { provide: Solicitud260101Query, useValue: mockSolicitud260101Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
      ],
    })
      .overrideComponent(FabricanteComponent, {
        set: {
          providers: [
            { provide: FormBuilder, useClass: FormBuilder },
            {
              provide: SolicitudDatosService,
              useValue: mockSolicitudDatosService,
            },
            {
              provide: Solicitud260101Store,
              useValue: mockSolicitud260101Store,
            },
            {
              provide: Solicitud260101Query,
              useValue: mockSolicitud260101Query,
            },
            { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
          ],
        },
      })
      .compileComponents();
    fixture = TestBed.createComponent(FabricanteComponent);
    component = fixture.componentInstance;
    component.inicializarFormulario();
    fixture.detectChanges();
  });

  it('should create the FabricanteComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.fabricanteComponentForm).toBeDefined();
    expect(component.fabricanteComponentForm.get('tercerosRFC')?.value).toBe(
      'RFC123456789'
    );
    expect(
      component.fabricanteComponentForm.get('tercerosDenominacion')?.value
    ).toBe('Empresa');
  });

  it('should call setTercerosNacionalidad and update validators', () => {
    component.actualizarTipoPersonaValidators = jest.fn();
    component.setTercerosNacionalidad(2);
    expect(
      mockSolicitud260101Store.setTercerosNacionalidad
    ).toHaveBeenCalledWith(2);
    expect(component.actualizarTipoPersonaValidators).toHaveBeenCalledWith(2);
  });

  it('should call setTipoPersona and update validators', () => {
    component.actualizarTipoPersonaValidators = jest.fn();
    component.setTipoPersona(1);
    expect(mockSolicitud260101Store.setTipoPersona).toHaveBeenCalledWith(1);
    expect(component.actualizarTipoPersonaValidators).toHaveBeenCalledWith(1);
  });

  it('should call setTercerosRFC', () => {
    const event = { target: { value: 'RFC987654321' } } as any;
    component.setTercerosRFC(event);
    expect(mockSolicitud260101Store.setTercerosRFC).toHaveBeenCalledWith(
      'RFC987654321'
    );
  });

  it('should call setCurp', () => {
    const event = { target: { value: 'CURP987654321098' } } as any;
    component.setCurp(event);
    expect(mockSolicitud260101Store.setTercerosCurp).toHaveBeenCalledWith(
      'CURP987654321098'
    );
  });

  it('should call setTercerosDenominacion', () => {
    const event = { target: { value: 'Nueva Empresa' } } as any;
    component.setTercerosDenominacion(event);
    expect(
      mockSolicitud260101Store.setTercerosDenominacion
    ).toHaveBeenCalledWith('Nueva Empresa');
  });

  it('should call setTercerosDenominacionNombre', () => {
    const event = { target: { value: 'Nuevo Nombre' } } as any;
    component.setTercerosDenominacionNombre(event);
    expect(
      mockSolicitud260101Store.setTercerosDenominacionNombre
    ).toHaveBeenCalledWith('Nuevo Nombre');
  });

  it('should call setTercerosApellidoPaterno', () => {
    const event = { target: { value: 'Nuevo Paterno' } } as any;
    component.setTercerosApellidoPaterno(event);
    expect(
      mockSolicitud260101Store.setTercerosApellidoPaterno
    ).toHaveBeenCalledWith('Nuevo Paterno');
  });

  it('should call setTercerosApellidoMaterno', () => {
    const event = { target: { value: 'Nuevo Materno' } } as any;
    component.setTercerosApellidoMaterno(event);
    expect(
      mockSolicitud260101Store.setTercerosApellidoMaterno
    ).toHaveBeenCalledWith('Nuevo Materno');
  });

  it('should call seleccionaPais', () => {
    component.seleccionaPais({ id: 1, descripcion: 'México' });
    expect(mockSolicitud260101Store.setTercerosPais).toHaveBeenCalledWith(1);
  });

  it('should call seleccionaEstado', () => {
    component.seleccionaEstado({ id: 2, descripcion: 'CDMX' });
    expect(mockSolicitud260101Store.setTercerosEstado).toHaveBeenCalledWith(2);
  });

  it('should call seleccionaMunicipio', () => {
    component.seleccionaMunicipio({ id: 3, descripcion: 'Benito Juárez' });
    expect(mockSolicitud260101Store.setTercerosMunicipio).toHaveBeenCalledWith(
      3
    );
  });

  it('should call seleccionaLocalidad', () => {
    component.seleccionaLocalidad({ id: 4, descripcion: 'Localidad' });
    expect(mockSolicitud260101Store.setTercerosLocalidad).toHaveBeenCalledWith(
      4
    );
  });

  it('should call seleccionaCodigo', () => {
    component.seleccionaCodigo({ id: 5, descripcion: '03100' });
    expect(mockSolicitud260101Store.setTercerosCodigo).toHaveBeenCalledWith(5);
  });

  it('should call seleccionaColonia', () => {
    component.seleccionaColonia({ id: 6, descripcion: 'Colonia' });
    expect(mockSolicitud260101Store.setTercerosColonia).toHaveBeenCalledWith(6);
  });

  it('should call setTercerosCalle', () => {
    const event = { target: { value: 'Nueva Calle' } } as any;
    component.setTercerosCalle(event);
    expect(mockSolicitud260101Store.setTercerosCalle).toHaveBeenCalledWith(
      'Nueva Calle'
    );
  });

  it('should call setTercerosNumeroExterior', () => {
    const event = { target: { value: '123' } } as any;
    component.setTercerosNumeroExterior(event);
    expect(
      mockSolicitud260101Store.setTercerosNumeroExterior
    ).toHaveBeenCalledWith('123');
  });

  it('should call setTercerosNumeroInterior', () => {
    const event = { target: { value: '456' } } as any;
    component.setTercerosNumeroInterior(event);
    expect(
      mockSolicitud260101Store.setTercerosNumeroInterior
    ).toHaveBeenCalledWith('456');
  });

  it('should call setTercerosLada', () => {
    const event = { target: { value: '55' } } as any;
    component.setTercerosLada(event);
    expect(mockSolicitud260101Store.setTercerosLada).toHaveBeenCalledWith('55');
  });

  it('should call setTercerosTelefono', () => {
    const event = { target: { value: '1234567890' } } as any;
    component.setTercerosTelefono(event);
    expect(mockSolicitud260101Store.setTercerosTelefono).toHaveBeenCalledWith(
      '1234567890'
    );
  });

  it('should call settercerosCorreoElectronico', () => {
    const event = { target: { value: 'correo@correo.com' } } as any;
    component.settercerosCorreoElectronico(event);
    expect(
      mockSolicitud260101Store.setTercerosCorreoElectronico
    ).toHaveBeenCalledWith('correo@correo.com');
  });

  it('should reset the form when limpiarDestinatario is called', () => {
    const resetSpy = jest.spyOn(component.fabricanteComponentForm, 'reset');
    component.limpiarDestinatario();
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should emit cerrarModal with correct object when guardarDestinatario is called and form is valid', () => {
    const emitSpy = jest.spyOn(component.cerrarModal, 'emit');
    component.paisCatalogo = {
      catalogos: [{ id: 1, descripcion: 'México' }],
    } as any;
    component.estadoCatalogo = {
      catalogos: [{ id: 2, descripcion: 'CDMX' }],
    } as any;
    component.municipioCatalogo = {
      catalogos: [{ id: 3, descripcion: 'Benito Juárez' }],
    } as any;
    component.localidadCatalogo = {
      catalogos: [{ id: 4, descripcion: 'Localidad' }],
    } as any;
    component.codigoCatalogo = {
      catalogos: [{ id: 5, descripcion: '03100' }],
    } as any;
    component.coloniaCatalogo = {
      catalogos: [{ id: 6, descripcion: 'Colonia' }],
    } as any;
    component.fabricanteComponentForm.patchValue({
      tercerosNacionalidad: 1,
      tercerosTipoPersona: 1,
      tercerosDenominacion: 'Empresa',
      tercerosApellidoPaterno: 'Paterno',
      tercerosApellidoMaterno: 'Materno',
      tercerosDenominacionNombre: 'Nombre',
      tercerosRFC: 'RFC123456789',
      tercerosCurp: 'CURP123456789012',
      tercerosTelefono: '1234567890',
      tercerosCorreoElectronico: 'test@email.com',
      tercerosCalle: 'Calle',
      tercerosNumeroExterior: '10',
      tercerosNumeroInterior: '20',
      tercerosPais: 1,
      tercerosColonia: 6,
      tercerosMunicipio: 3,
      tercerosLocalidad: 4,
      tercerosLada: '55',
      tercerosEstado: 2,
      tercerosCodigo: 5,
    });
    component.guardarDestinatario();
    expect(emitSpy).toHaveBeenCalled();
    const emitted = emitSpy.mock.calls[emitSpy.mock.calls.length - 1][0];
    expect(emitted?.paisNombre).toBe('México');
    expect(emitted?.estadoNombre).toBe('CDMX');
    expect(emitted?.coloniaNombre).toBe('Colonia');
  });

  it('should call guardarDatosFormulario if esFormularioSoloLectura is true in inicializarEstadoFormulario', () => {
    const guardarDatosFormularioSpy = jest.spyOn(
      component,
      'guardarDatosFormulario'
    );
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    expect(guardarDatosFormularioSpy).toHaveBeenCalled();
  });

  it('should call inicializarFormulario if esFormularioSoloLectura is false in inicializarEstadoFormulario', () => {
    const inicializarFormularioSpy = jest.spyOn(
      component,
      'inicializarFormulario'
    );
    component.esFormularioSoloLectura = false;
    component.inicializarEstadoFormulario();
    expect(inicializarFormularioSpy).toHaveBeenCalled();
  });

  it('should not emit cerrarModal if form is invalid', () => {
    const emitSpy = jest.spyOn(component.cerrarModal, 'emit');
    component.fabricanteComponentForm.patchValue({ tercerosRFC: '' });
    component.guardarDestinatario();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should set tercerosDenominacion as required and clear others when valor is 1 (Persona Moral)', () => {
    const denominacionCtrl = component.fabricanteComponentForm.get(
      'tercerosDenominacion'
    );
    const denominacionNombreCtrl = component.fabricanteComponentForm.get(
      'tercerosDenominacionNombre'
    );
    const apellidoPaternoCtrl = component.fabricanteComponentForm.get(
      'tercerosApellidoPaterno'
    );

    denominacionNombreCtrl?.setValidators([Validators.required]);
    apellidoPaternoCtrl?.setValidators([Validators.required]);
    denominacionNombreCtrl?.updateValueAndValidity();
    apellidoPaternoCtrl?.updateValueAndValidity();

    component.actualizarTipoPersonaValidators(1);

    denominacionCtrl?.setValue('');
    denominacionCtrl?.markAsTouched();
    denominacionNombreCtrl?.setValue('');
    apellidoPaternoCtrl?.setValue('');

    expect(denominacionCtrl?.hasError('required')).toBe(true);
    expect(denominacionNombreCtrl?.hasError('required')).toBe(true);
    expect(apellidoPaternoCtrl?.hasError('required')).toBe(false);
  });

  it('should set tercerosDenominacionNombre and tercerosApellidoPaterno as required and clear tercerosDenominacion when valor is 2 (Persona Física)', () => {
    const denominacionCtrl = component.fabricanteComponentForm.get(
      'tercerosDenominacion'
    );
    const denominacionNombreCtrl = component.fabricanteComponentForm.get(
      'tercerosDenominacionNombre'
    );
    const apellidoPaternoCtrl = component.fabricanteComponentForm.get(
      'tercerosApellidoPaterno'
    );

    denominacionCtrl?.setValidators([Validators.required]);
    denominacionCtrl?.updateValueAndValidity();
    component.actualizarTipoPersonaValidators(2);
    denominacionNombreCtrl?.setValue('');
    apellidoPaternoCtrl?.setValue('');
    denominacionCtrl?.setValue('');
    expect(denominacionNombreCtrl?.hasError('required')).toBe(true);
    expect(apellidoPaternoCtrl?.hasError('required')).toBe(true);
    expect(denominacionCtrl?.hasError('required')).toBe(false);
  });

  it('should clear all related validators when valor is neither 1 nor 2', () => {
    const denominacionCtrl = component.fabricanteComponentForm.get(
      'tercerosDenominacion'
    );
    const denominacionNombreCtrl = component.fabricanteComponentForm.get(
      'tercerosDenominacionNombre'
    );
    const apellidoPaternoCtrl = component.fabricanteComponentForm.get(
      'tercerosApellidoPaterno'
    );

    denominacionCtrl?.setValidators([Validators.required]);
    denominacionNombreCtrl?.setValidators([Validators.required]);
    apellidoPaternoCtrl?.setValidators([Validators.required]);
    denominacionCtrl?.updateValueAndValidity();
    denominacionNombreCtrl?.updateValueAndValidity();
    apellidoPaternoCtrl?.updateValueAndValidity();
    component.actualizarTipoPersonaValidators('otro');
    denominacionCtrl?.setValue('');
    denominacionNombreCtrl?.setValue('');
    apellidoPaternoCtrl?.setValue('');
    expect(denominacionCtrl?.hasError('required')).toBe(true);
    expect(denominacionNombreCtrl?.hasError('required')).toBe(false);
    expect(apellidoPaternoCtrl?.hasError('required')).toBe(false);
  });

  it('should call updateValueAndValidity for affected controls', () => {
    const denominacionCtrl = component.fabricanteComponentForm.get(
      'tercerosDenominacion'
    );
    const denominacionNombreCtrl = component.fabricanteComponentForm.get(
      'tercerosDenominacionNombre'
    );
    const apellidoPaternoCtrl = component.fabricanteComponentForm.get(
      'denominacionApellidoPaterno'
    );
    const denominacionUpdateSpy = jest.spyOn(
      denominacionCtrl!,
      'updateValueAndValidity'
    );
    const denominacionNombreUpdateSpy = jest.spyOn(
      denominacionNombreCtrl!,
      'updateValueAndValidity'
    );
    const apellidoPaternoUpdateSpy = apellidoPaternoCtrl
      ? jest.spyOn(apellidoPaternoCtrl, 'updateValueAndValidity')
      : jest.fn(()=> of());

    component.actualizarTipoPersonaValidators(1);

    expect(denominacionUpdateSpy).toHaveBeenCalled();
    expect(denominacionNombreUpdateSpy).toHaveBeenCalled();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyNotifier$ = (component as any).destroyNotifier$;
    const nextSpy = jest.spyOn(destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
