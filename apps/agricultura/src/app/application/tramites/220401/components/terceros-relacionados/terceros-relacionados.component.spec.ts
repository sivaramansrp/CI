import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDeDerechoComponent } from './pago-de-derecho.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Agregar220401Store } from '../../../../estados/tramites/agregar220401.store';
import { AgregarQuery } from '../../../../estados/queries/agregar.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

describe('PagoDeDerechoComponent', () => {
  let component: PagoDeDerechoComponent;
  let fixture: ComponentFixture<PagoDeDerechoComponent>;
  let agregar220401StoreMock: any;
  let agregarQueryMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    agregar220401StoreMock = {
      setJustificacion: jest.fn(),
      setBanco: jest.fn(),
      setExentoDePago: jest.fn(),
      setNombreImportExport: jest.fn(),
      setRfcImportExport: jest.fn(),
      setCadenaDependencia: jest.fn(),
      setLlaveDePago: jest.fn(),
      setFechaPago: jest.fn(),
      setImportePago: jest.fn(),
    };

    agregarQueryMock = {
      selectSolicitud$: of({
        exentoDePago: 'No',
        Justificacion: 'Si',
        Banco: 'Si',
        llaveDePago: '123',
        fechaPago: '2024-01-01',
      }),
    };

    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [PagoDeDerechoComponent],
      providers: [
        FormBuilder,
        { provide: Agregar220401Store, useValue: agregar220401StoreMock },
        { provide: AgregarQuery, useValue: agregarQueryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit debe llamar inicializarDerechoFormulario', () => {
    const spy = jest.spyOn(component, 'inicializarDerechoFormulario');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('inicializarDerechoFormulario debe llamar guardarDatosFormulario si es solo lectura', () => {
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.esFormularioSoloLectura = true;
    component.inicializarDerechoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('inicializarDerechoFormulario debe llamar inicializarFormulario si no es solo lectura', () => {
    const spy = jest.spyOn(component, 'inicializarFormulario');
    component.esFormularioSoloLectura = false;
    component.inicializarDerechoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('guardarDatosFormulario debe deshabilitar el formulario si es solo lectura', () => {
    component.esFormularioSoloLectura = true;
    component.inicializarFormulario();
    component.guardarDatosFormulario();
    expect(component.FormSolicitud.disabled).toBe(true);
  });

  it('guardarDatosFormulario debe habilitar el formulario si no es solo lectura', () => {
    component.esFormularioSoloLectura = false;
    component.inicializarFormulario();
    component.guardarDatosFormulario();
    expect(component.FormSolicitud.enabled).toBe(true);
  });

  it('inicializarFormulario debe crear el formulario con los valores del store', () => {
    component.inicializarFormulario();
    expect(component.FormSolicitud).toBeDefined();
    expect(component.FormSolicitud.get('exentoDePago')?.value).toBe('No');
    expect(component.FormSolicitud.get('Justificacion')?.value).toBe('Si');
    expect(component.FormSolicitud.get('Banco')?.value).toBe('Si');
    expect(component.FormSolicitud.get('llaveDePago')?.value).toBe('123');
    expect(component.FormSolicitud.get('fechaPago')?.value).toBe('2024-01-01');
  });

  it('updateFormFieldsBasedOnExentoDePago con valor "No" debe setear y deshabilitar campos', () => {
    component.inicializarFormulario();
    component.updateFormFieldsBasedOnExentoDePago('No');
    expect(component.FormSolicitud.get('rfcImportExport')?.value).toBe('454000554');
    expect(component.FormSolicitud.get('cadenaDependencia')?.value).toBe('0001012A0000EX');
    expect(component.FormSolicitud.get('importePago')?.value).toBe('594.0');
    expect(component.FormSolicitud.get('rfcImportExport')?.disabled).toBe(true);
    expect(component.FormSolicitud.get('cadenaDependencia')?.disabled).toBe(true);
    expect(component.FormSolicitud.get('importePago')?.disabled).toBe(true);
    expect(component.FormSolicitud.get('fechaPago')?.enabled).toBe(true);
    expect(component.FormSolicitud.get('llaveDePago')?.enabled).toBe(true);
  });

  it('updateFormFieldsBasedOnExentoDePago con valor distinto de "No" debe resetear y deshabilitar campos', () => {
    component.inicializarFormulario();
    component.updateFormFieldsBasedOnExentoDePago('Si');
    expect(component.FormSolicitud.get('rfcImportExport')?.value).toBeNull();
    expect(component.FormSolicitud.get('cadenaDependencia')?.value).toBeNull();
    expect(component.FormSolicitud.get('importePago')?.value).toBeNull();
    expect(component.FormSolicitud.get('rfcImportExport')?.disabled).toBe(true);
    expect(component.FormSolicitud.get('cadenaDependencia')?.disabled).toBe(true);
    expect(component.FormSolicitud.get('importePago')?.disabled).toBe(true);
    expect(component.FormSolicitud.get('fechaPago')?.disabled).toBe(true);
    expect(component.FormSolicitud.get('llaveDePago')?.disabled).toBe(true);
  });

  it('setValoresStore debe llamar al método correspondiente del store', () => {
    component.inicializarFormulario();
    component.FormSolicitud.get('Justificacion')?.setValue('Si');
    component.setValoresStore(component.FormSolicitud, 'Justificacion', 'setJustificacion');
    expect(agregar220401StoreMock.setJustificacion).toHaveBeenCalledWith('Si');
  });

  it('getJustificacion debe asignar las opciones correctamente', () => {
    component.getJustificacion();
    expect(component.Justificacion).toEqual([
      { id: 1, descripcion: 'Si' },
      { id: 2, descripcion: 'No' },
    ]);
  });

  it('getBanco debe asignar las opciones correctamente', () => {
    component.getBanco();
    expect(component.Banco).toEqual([
      { id: 1, descripcion: 'Si' },
      { id: 2, descripcion: 'No' },
    ]);
  });

  it('validarFormulario no hace nada si el formulario es válido', () => {
    component.inicializarFormulario();
    component.FormSolicitud.get('Justificacion')?.setValue('Si');
    component.FormSolicitud.get('nombreImportExport')?.setValue('Nombre');
    component.FormSolicitud.get('rfcImportExport')?.setValue('RFC');
    component.FormSolicitud.get('cadenaDependencia')?.setValue('Cadena');
    component.FormSolicitud.get('fechaPago')?.setValue('2024-01-01');
    component.FormSolicitud.get('importePago')?.setValue('100');
    expect(component.FormSolicitud.valid).toBe(true);
    component.validarFormulario();
    // No hay expect porque no hay lógica adicional, solo se cubre la rama
  });

  it('ngOnDestroy debe limpiar el subject destroyNotifier$', () => {
    const spyNext = jest.spyOn((component as any).destroyNotifier$, 'next');
    const spyComplete = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});