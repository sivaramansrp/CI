import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';
import { FormularioReciclajeStore } from '../../estados/tramites/dato-solicitud.store';
import { FormularioReciclajeQuery } from '../../estados/queries/dato-solicitud.query';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';

jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
  })),
}));

describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let fixture: ComponentFixture<DatosSolicitudComponent>;
  let mockStore: jest.Mocked<FormularioReciclajeStore>;
  let mockQuery: jest.Mocked<FormularioReciclajeQuery>;

  const initialState = {
    solicitudForm: {
      numeroRegistroAmbiental: '123',
      descripcionGenerica1: 'desc',
      numeroProgramaImmex: 'immex',
    },
    empresaReciclaje: {
      requiereEmpresa: 'Si',
      nombreEmpresa: 'empresa',
      representanteLegal: 'legal',
      telefono: '999',
      correoElectronico: 'correo@ejemplo.com',
    },
    lugarReciclaje: {
      reciclajeInstalaciones: 'No',
      lugarReciclaje: 'ubicación',
      numeroAutorizacionEmpresaReciclaje: 'aut123',
    },
    empresaTransportista: {
      nombreEmpresaTransportistaResiduos: 'trans',
      numeroAutorizacionSemarnat: 'sem123',
    },
    precaucionesManejo: {
      precaucionesManejo: 'manejo',
    }
  };

  beforeEach(async () => {
    mockQuery = {
      getValue: jest.fn().mockReturnValue(initialState)
    } as unknown as jest.Mocked<FormularioReciclajeQuery>;

    mockStore = {
      actualizarSolicitudForm: jest.fn(),
      actualizarEmpresaReciclaje: jest.fn(),
      actualizarLugarReciclaje: jest.fn(),
      actualizarEmpresaTransportista: jest.fn(),
      actualizarPrecaucionesManejo: jest.fn()
    } as unknown as jest.Mocked<FormularioReciclajeStore>;

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, DatosSolicitudComponent],
      providers: [
        FormBuilder,
        { provide: FormularioReciclajeStore, useValue: mockStore },
        { provide: FormularioReciclajeQuery, useValue: mockQuery },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosSolicitudComponent);
    component = fixture.componentInstance;

    component.modalElement = {
      nativeElement: document.createElement('div')
    } as ElementRef;

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar los formularios con los valores del store', () => {
    expect(component.solicitudForm.value).toEqual(initialState.solicitudForm);
    expect(component.formularioEmpresaReciclaje.value).toEqual(initialState.empresaReciclaje);
    expect(component.formularioLugarReciclaje.value).toEqual(initialState.lugarReciclaje);
    expect(component.formularioEmpresaTransportista.value).toEqual(initialState.empresaTransportista);
    expect(component.formularioPrecaucionesManejo.value).toEqual(initialState.precaucionesManejo);
  });

  it('debería actualizar el store cuando cambian los valores del formulario', () => {
    component.solicitudForm.patchValue({ numeroRegistroAmbiental: 'nuevo' });
    component.formularioEmpresaReciclaje.patchValue({ nombreEmpresa: 'nueva' });
    component.formularioLugarReciclaje.patchValue({ lugarReciclaje: 'nuevo lugar' });
    component.formularioEmpresaTransportista.patchValue({ nombreEmpresaTransportistaResiduos: 'transporte' });
    component.formularioPrecaucionesManejo.patchValue({ precaucionesManejo: 'nueva precaución' });

    fixture.detectChanges();

    expect(mockStore.actualizarSolicitudForm).toHaveBeenCalled();
    expect(mockStore.actualizarEmpresaReciclaje).toHaveBeenCalled();
    expect(mockStore.actualizarLugarReciclaje).toHaveBeenCalled();
    expect(mockStore.actualizarEmpresaTransportista).toHaveBeenCalled();
    expect(mockStore.actualizarPrecaucionesManejo).toHaveBeenCalled();
  });

  it('debería deshabilitar campos si se selecciona "No" en requiereEmpresa', () => {
    component.formularioEmpresaReciclaje.get('requiereEmpresa')?.setValue('No');

    expect(component.formularioEmpresaReciclaje.get('nombreEmpresa')?.disabled).toBe(true);
    expect(component.formularioEmpresaReciclaje.get('telefono')?.disabled).toBe(true);
  });

  it('debería deshabilitar campos si se selecciona "No" en reciclajeInstalaciones', () => {
    component.formularioLugarReciclaje.get('reciclajeInstalaciones')?.setValue('No');

    expect(component.formularioLugarReciclaje.get('lugarReciclaje')?.disabled).toBe(true);
    expect(component.formularioLugarReciclaje.get('numeroAutorizacionEmpresaReciclaje')?.disabled).toBe(true);
  });

  it('debería abrir el modal correctamente al llamar agregarOperacionImp', () => {
    const { Modal } = jest.requireMock('bootstrap');
    const mockShow = jest.fn();

    (Modal as jest.Mock).mockImplementation(() => ({ show: mockShow }));

    component.modalElement = {
      nativeElement: document.createElement('div')
    } as ElementRef;

    component.agregarOperacionImp();

    expect(Modal).toHaveBeenCalledWith(component.modalElement.nativeElement);
    expect(mockShow).toHaveBeenCalled();
  });

  it('debería completar el subject en ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destruir$'], 'next');
    const completeSpy = jest.spyOn(component['destruir$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
