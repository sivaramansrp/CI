import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelEstablecimientoRFCComponent } from './datos-del-establecimiento-rfc.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AvisocalidadStore } from '../../estados/stores/aviso-calidad.store';
import { AvisocalidadQuery } from '../../estados/queries/aviso-calidad.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';

describe('DatosDelEstablecimientoRFCComponent', () => {
  let component: DatosDelEstablecimientoRFCComponent;
  let fixture: ComponentFixture<DatosDelEstablecimientoRFCComponent>;
  let avisocalidadStoreMock: any;
  let avisocalidadQueryMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    avisocalidadStoreMock = {
      setRFC: jest.fn(),
      setDenominacionRazonSocial: jest.fn(),
      setCorreoElectronico: jest.fn(),
    };
    avisocalidadQueryMock = {
      selectSolicitud$: of({
        rfcDel: 'RFC123',
        denominacionRazonSocial: 'Empresa SA',
        correoElectronico: 'test@email.com',
      }),
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosDelEstablecimientoRFCComponent],
      providers: [
        FormBuilder,
        { provide: AvisocalidadStore, useValue: avisocalidadStoreMock },
        { provide: AvisocalidadQuery, useValue: avisocalidadQueryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelEstablecimientoRFCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with values from solicitudState', () => {
    expect(component.datosDelForm.value).toEqual({
      rfcDel: 'RFC123',
      denominacionRazonSocial: 'Empresa SA',
      correoElectronico: 'test@email.com',
    });
  });

  it('should disable form if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    component.solicitudState = {
      rfcDel: 'RFC123',
      denominacionRazonSocial: 'Empresa SA',
      correoElectronico: 'test@email.com',
    } as any;
    component.configurarGrupoForm();
    expect(component.datosDelForm.disabled).toBe(true);
  });

  it('should enable form if esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;
    component.solicitudState = {
      rfcDel: 'RFC123',
      denominacionRazonSocial: 'Empresa SA',
      correoElectronico: 'test@email.com',
    } as any;
    component.configurarGrupoForm();
    expect(component.datosDelForm.enabled).toBe(true);
  });

  it('should open modal and set nuevaNotificacion and elementoParaEliminar', () => {
    component.abrirModal(2);
    expect(component.nuevaNotificacion).toBeDefined();
    expect(component.elementoParaEliminar).toBe(2);
  });

  it('should remove pedimento when eliminarPedimento is called with true', () => {
    component.pedimentos = [{}, {}, {}] as any;
    component.elementoParaEliminar = 1;
    component.eliminarPedimento(true);
    expect(component.pedimentos.length).toBe(2);
  });

  it('should not remove pedimento when eliminarPedimento is called with false', () => {
    component.pedimentos = [{}, {}, {}] as any;
    component.elementoParaEliminar = 1;
    component.eliminarPedimento(false);
    expect(component.pedimentos.length).toBe(3);
  });

it('should clean up on ngOnDestroy', () => {
    const spy = jest.spyOn((component as any).destroyNotifier$, 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

 it('should handle closeModal ElementRef if present', () => {
    component.closeModal = { nativeElement: { click: jest.fn() } } as any;
    
    expect(component.closeModal).toBeDefined();
  });
});