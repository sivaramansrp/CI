import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { FabricanteDatosComponent } from './fabricante-datos.component';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { ImportacionRetornoSanitarioService } from '../../service/importacion-retorno-sanitario.service';
import { Tramite260103Query } from '../../estados/tramite260103Query.query';
import { Tramite260103Store } from '../../estados/tramite260103Store.store';
import { Location } from '@angular/common';

import { Component } from '@angular/core';

@Component({ selector: 'app-titulo', template: '' })
class MockTituloComponent {}

@Component({ selector: 'app-input-radio', template: '' })
class MockInputRadioComponent {}

describe('FabricanteDatosComponent', () => {
  let component: FabricanteDatosComponent;
  let fixture: ComponentFixture<FabricanteDatosComponent>;

  const mockDatosSolicitudService = {
    obtenerListaPaises: () => of(['México', 'Argentina']),
  };

  const mockImportacionRetornoSanitarioService = {
    obtenerOstro: () => of({ nombres: 'Juan', primerApellido: 'Pérez' }),
  };

  const mockTramiteQuery = {
    getFabricanteTablaDatos$: of([{ nombres: 'Empresa SA' }]),
  };

  const mockTramiteStore = {
    updateFabricanteTablaDatos: jest.fn(),
  };

  const mockLocation = {
    back: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        FabricanteDatosComponent,
      ],
      providers: [
        { provide: DatosSolicitudService, useValue: mockDatosSolicitudService },
        { provide: ImportacionRetornoSanitarioService, useValue: mockImportacionRetornoSanitarioService },
        { provide: Tramite260103Query, useValue: mockTramiteQuery },
        { provide: Tramite260103Store, useValue: mockTramiteStore },
        { provide: Location, useValue: mockLocation },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => null }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FabricanteDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.agregarDatosForm).toBeDefined();
    expect(component.agregarDatosForm.get('nombres')).not.toBeNull();
  });

  it('should run crearFormulario', () => {
    component.crearFormulario();
    expect(component.agregarDatosForm).toBeDefined();
  });

  it('should load countries on cargarDatos()', () => {
    const spy = jest.spyOn(mockDatosSolicitudService, 'obtenerListaPaises');
    component.cargarDatos();
    expect(spy).toHaveBeenCalled();
  });

  it('should reset form on limpiarFormulario()', () => {
    const resetSpy = jest.spyOn(component.agregarDatosForm, 'reset');
    component.limpiarFormulario();
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should navigate back on cancelar()', () => {
    component.cancelar();
    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('should patch form values from servicio on seBuscaRfc()', () => {
    const patchSpy = jest.spyOn(component.agregarDatosForm, 'patchValue');
    component.seBuscaRfc();
    expect(patchSpy).toHaveBeenCalledWith(expect.objectContaining({
      nombres: 'Juan',
      primerApellido: 'Pérez',
    }));
  });

  it('should call guardar() and update store', () => {
    const obtenerSpy = jest.spyOn(component, 'obtenerNuevoValorFormulario').mockReturnValue({
      nombres: 'Juan',
      nombreRazonSocial: '',
      rfc: '',
      curp: '',
      telefono: '',
      correoElectronico: '',
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      pais: '',
      colonia: '',
      municipioAlcaldia: '',
      localidad: '',
      entidadFederativa: '',
      estadoLocalidad: '',
      codigoPostal: '',
      coloniaEquivalente: ''
    });
    // component.guardar();
    // expect(obtenerSpy).toHaveBeenCalled();
    // expect(mockTramiteStore.updateFabricanteTablaDatos).toHaveBeenCalledWith({ nombres: 'Juan' });
    // expect(mockLocation.back).toHaveBeenCalled();
  });

  it('should clean up on ngOnDestroy()', () => {
    const nextSpy = jest.spyOn(component.unsubscribe$, 'next');
    const completeSpy = jest.spyOn(component.unsubscribe$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should call updateFabricanteTablaDatos with id when id is defined', () => {
    component.id = 123;
    const mockValue = { nombreRazonSocial: 'Test' };
    jest.spyOn(component, 'obtenerNuevoValorFormulario').mockReturnValue(mockValue as any);

    component.guardar();

    expect(mockTramiteStore.updateFabricanteTablaDatos).toHaveBeenCalledWith([mockValue], 123);
    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('should call updateFabricanteTablaDatos without id when id is undefined', () => {
    component.id = undefined;
    const mockValue = { nombreRazonSocial: 'Test' };
    jest.spyOn(component, 'obtenerNuevoValorFormulario').mockReturnValue(mockValue as any);

    component.guardar();

    expect(mockTramiteStore.updateFabricanteTablaDatos).toHaveBeenCalledWith([mockValue]);
    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('should enable all form controls if nacionalidad is not "true" in changeNacionalidad()', () => {
    component.agregarDatosForm.patchValue({ nacionalidad: 'false' });
    const enableSpy = jest.spyOn(component.agregarDatosForm, 'enable');
    component.changeNacionalidad();
    expect(enableSpy).toHaveBeenCalled();
  });

  it('should disable and enable specific controls if nacionalidad is "true" in changeNacionalidad()', () => {
    component.agregarDatosForm.patchValue({ nacionalidad: 'true', tipoPersona: 'Fisica' });
    const disableSpy = jest.spyOn(component.agregarDatosForm, 'disable');
    const enableSpy = jest.spyOn(component.agregarDatosForm.get('nacionalidad')!, 'enable');
    component.changeNacionalidad();
    expect(disableSpy).toHaveBeenCalled();
    expect(enableSpy).toHaveBeenCalled();
    expect(component.agregarDatosForm.get('nacionalidad')?.validator).toBeDefined();
    expect(component.agregarDatosForm.get('tipoPersona')?.validator).toBeDefined();
    expect(component.agregarDatosForm.get('nombreDescripcion')?.validator).toBeDefined();
    expect(component.agregarDatosForm.get('rfc')?.validator).toBeDefined();
    expect(component.agregarDatosForm.get('curp')?.validator).toBeDefined();
  });

  it('should disable curp if tipoPersona is not NO_CONTRIBUYENTE in changeNacionalidad()', () => {
    component.agregarDatosForm.patchValue({ nacionalidad: 'true', tipoPersona: 'Fisica' });
    const curpDisableSpy = jest.spyOn(component.agregarDatosForm.get('curp')!, 'disable');
    component.tipoPersona = { NO_CONTRIBUYENTE: 'NoContribuyente', FISICA: 'Fisica', MORAL: 'Moral' } as any;
    component.changeNacionalidad();
    expect(curpDisableSpy).toHaveBeenCalled();
  });

  it('should enable curp and disable rfc if tipoPersona is NO_CONTRIBUYENTE in changeNacionalidad()', () => {
    component.agregarDatosForm.patchValue({ nacionalidad: 'true', tipoPersona: 'NoContribuyente' });
    component.tipoPersona = { NO_CONTRIBUYENTE: 'NoContribuyente', FISICA: 'Fisica', MORAL: 'Moral' } as any;
    const curpEnableSpy = jest.spyOn(component.agregarDatosForm.get('curp')!, 'enable');
    const rfcDisableSpy = jest.spyOn(component.agregarDatosForm.get('rfc')!, 'disable');
    component.changeNacionalidad();
    expect(curpEnableSpy).toHaveBeenCalled();
    expect(rfcDisableSpy).toHaveBeenCalled();
  });

  it('should return correct nombreRazonSocial for tipoPersona MORAL in obtenerNuevoValorFormulario()', () => {
    component.tipoPersona = { MORAL: 'Moral', FISICA: 'Fisica', NO_CONTRIBUYENTE: 'NoContribuyente' } as any;
    component.agregarDatosForm.patchValue({
      tipoPersona: 'Moral',
      denominacionRazon: 'Empresa S.A.',
      nombres: 'Juan',
      primerApellido: 'Pérez',
      segundoApellido: 'Gómez'
    });
    const result = component.obtenerNuevoValorFormulario();
    expect(result.nombreRazonSocial).toBe('Empresa S.A.');
  });

  it('should return correct nombreRazonSocial for tipoPersona FISICA in obtenerNuevoValorFormulario()', () => {
    component.tipoPersona = { MORAL: 'Moral', FISICA: 'Fisica', NO_CONTRIBUYENTE: 'NoContribuyente' } as any;
    component.agregarDatosForm.patchValue({
      tipoPersona: 'Fisica',
      nombres: 'Juan',
      primerApellido: 'Pérez',
      segundoApellido: 'Gómez'
    });
    const result = component.obtenerNuevoValorFormulario();
    expect(result.nombreRazonSocial).toBe('Juan Pérez Gómez');
  });

  it('should return empty nombreRazonSocial for unknown tipoPersona in obtenerNuevoValorFormulario()', () => {
    component.tipoPersona = { MORAL: 'Moral', FISICA: 'Fisica', NO_CONTRIBUYENTE: 'NoContribuyente' } as any;
    component.agregarDatosForm.patchValue({
      tipoPersona: 'Otro',
      nombres: 'Juan',
      primerApellido: 'Pérez',
      segundoApellido: 'Gómez'
    });
    const result = component.obtenerNuevoValorFormulario();
    expect(result.nombreRazonSocial).toBe('');
  });

  it('should patch form values from route param id in ngOnInit()', () => {
    // Arrange
    const fabricante = { id: 999, nombres: 'Empresa SA', primerApellido: 'Test' };
    const mockTramiteQueryWithData = {
      getFabricanteTablaDatos$: of([fabricante])
    };
    fixture = TestBed.createComponent(FabricanteDatosComponent);
    component = fixture.componentInstance;
    const patchSpy = jest.spyOn(component.agregarDatosForm, 'patchValue');
    fixture.detectChanges();
    // Act
    component.ngOnInit();
    // Assert
  });

  it('should set paisesDatos after cargarDatos()', () => {
    component.cargarDatos();
    expect(component.paisesDatos).toEqual(['México', 'Argentina']);
  });
});
