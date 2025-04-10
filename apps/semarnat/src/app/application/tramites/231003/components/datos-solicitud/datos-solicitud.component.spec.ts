import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormularioReciclajeStore } from '../../estados/tramites/dato-solicitud.store';
import { FormularioReciclajeQuery } from '../../estados/queries/dato-solicitud.query';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const VALORES_FORMULARIO = {
  numeroRegistroAmbiental: 'ABC123',
  descripcionGenerica1: 'Descripción genérica',
  numeroProgramaImmex: 'IMMEX-456'
};

const ESTADO_MOCK = {
  solicitudForm: VALORES_FORMULARIO,
  empresaReciclaje: {
    requiereEmpresa: 'Si',
    nombreEmpresa: 'Empresa A',
    representanteLegal: 'Juan Pérez',
    telefono: '1234567890',
    correoElectronico: 'correo@ejemplo.com'
  },
  lugarReciclaje: {
    reciclajeInstalaciones: 'Si',
    lugarReciclaje: 'Planta A',
    numeroAutorizacionEmpresaReciclaje: 'AUT-123'
  },
  empresaTransportista: {
    nombreEmpresaTransportistaResiduos: 'Transportes XYZ',
    numeroAutorizacionSemarnat: 'SEM-456'
  },
  precaucionesManejo: {
    precaucionesManejo: 'Precaución con químicos'
  }
};

describe('DatosSolicitudComponent', () => {
  let componente: DatosSolicitudComponent;
  let fixture: ComponentFixture<DatosSolicitudComponent>;
  let formularioStore: FormularioReciclajeStore;
  let formularioQuery: FormularioReciclajeQuery;

  const routerMock = {
    navigate: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosSolicitudComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: FormularioReciclajeStore,
          useValue: {
            actualizarSolicitudForm: jest.fn(),
            actualizarEmpresaReciclaje: jest.fn(),
            actualizarLugarReciclaje: jest.fn(),
            actualizarEmpresaTransportista: jest.fn(),
            actualizarPrecaucionesManejo: jest.fn()
          }
        },
        {
          provide: FormularioReciclajeQuery,
          useValue: {
            getValue: jest.fn(() => ESTADO_MOCK)
          }
        },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosSolicitudComponent);
    componente = fixture.componentInstance;
    formularioStore = TestBed.inject(FormularioReciclajeStore);
    formularioQuery = TestBed.inject(FormularioReciclajeQuery);

    fixture.detectChanges();
  });

  it('debería crear el componente correctamente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar los formularios con los valores del store', () => {
    expect(componente.solicitudForm.value).toEqual(ESTADO_MOCK.solicitudForm);
    expect(componente.formularioEmpresaReciclaje.value).toEqual(ESTADO_MOCK.empresaReciclaje);
    expect(componente.formularioLugarReciclaje.value).toEqual(ESTADO_MOCK.lugarReciclaje);
    expect(componente.formularioEmpresaTransportista.value).toEqual(ESTADO_MOCK.empresaTransportista);
    expect(componente.formularioPrecaucionesManejo.value).toEqual(ESTADO_MOCK.precaucionesManejo);
  });

  it('debería navegar a datos-residuos al llamar navigateToPath', () => {
    componente.navigateToPath();
    expect(routerMock.navigate).toHaveBeenCalledWith(['pago/aviso-de-reciclaje/datos-residuos']);
  });

  it('debería actualizar el store al cambiar los valores del formulario', () => {
    componente.solicitudForm.patchValue({ numeroRegistroAmbiental: 'NEW-VAL' });
    componente.formularioEmpresaReciclaje.patchValue({ nombreEmpresa: 'Nueva Empresa' });
    componente.formularioLugarReciclaje.patchValue({ lugarReciclaje: 'Nuevo Lugar' });
    componente.formularioEmpresaTransportista.patchValue({ nombreEmpresaTransportistaResiduos: 'Nuevo Transportista' });
    componente.formularioPrecaucionesManejo.patchValue({ precaucionesManejo: 'Precaución actualizada' });

    expect(formularioStore.actualizarSolicitudForm).toHaveBeenCalled();
    expect(formularioStore.actualizarEmpresaReciclaje).toHaveBeenCalled();
    expect(formularioStore.actualizarLugarReciclaje).toHaveBeenCalled();
    expect(formularioStore.actualizarEmpresaTransportista).toHaveBeenCalled();
    expect(formularioStore.actualizarPrecaucionesManejo).toHaveBeenCalled();
  });

  it('debería limpiar recursos al destruir el componente', () => {
    const destruirSpy = jest.spyOn(componente['destruir$'], 'next');
    const completarSpy = jest.spyOn(componente['destruir$'], 'complete');

    componente.ngOnDestroy();

    expect(destruirSpy).toHaveBeenCalled();
    expect(completarSpy).toHaveBeenCalled();
  });
});
