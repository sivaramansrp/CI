import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosEmpresaComponent } from './datos-empresa.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite260912Query } from '../../estados/tramite-260912.query';
import { Tramite260912Store } from '../../estados/tramite-260912.store';
import { of } from 'rxjs';

describe('DatosEmpresaComponent', () => {
  let component: DatosEmpresaComponent;
  let tramite260912QueryMock: any;
  let tramite260912StoreMock: any;

  beforeEach(() => {
    tramite260912QueryMock = {
      selectTramite260912$: of({
        btonDeRadio: 'option1',
        justificacion: 'test justification',
        rfcDel: 'RFC123',
        denominacion: 'Test Denomination',
        correo: 'test@example.com',
      }),
    };

    tramite260912StoreMock = {
      setTramite260912State: jest.fn(() => {}),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosEmpresaComponent],
      declarations: [],
      providers: [
        { provide: Tramite260912Query, useValue: tramite260912QueryMock },
        { provide: Tramite260912Store, useValue: tramite260912StoreMock },
      ],
    });

    const fb = TestBed.inject(FormBuilder);
    component = TestBed.createComponent(DatosEmpresaComponent).componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component and call crearFormulario and getValorStore', () => {
    const crearFormularioSpy = jest.spyOn(component, 'crearFormulario');
    const getValorStoreSpy = jest.spyOn(component, 'getValorStore');

    component.ngOnInit();

    expect(crearFormularioSpy).toHaveBeenCalled();
    expect(getValorStoreSpy).toHaveBeenCalled();
  });

  it('should create the form with correct controls and validators', () => {
    component.crearFormulario();

    expect(component.form.contains('btonDeRadio')).toBe(true);
    expect(component.form.contains('justificacion')).toBe(true);
    expect(component.datosDelEstablecimiento.contains('rfcDel')).toBe(true);
    expect(component.datosDelEstablecimiento.contains('denominacion')).toBe(true);
    expect(component.datosDelEstablecimiento.contains('correo')).toBe(true);
  });

  it('should toggle form controls', () => {
    component.crearFormulario();
    component.datosDelEstablecimiento.get('rfcDel')?.disable();

    component.toggleFormControls();

    expect(component.datosDelEstablecimiento.get('rfcDel')?.enabled).toBe(true);
  });

  it('should toggle the collapsible property', () => {
    expect(component.colapsable).toBe(true);

    component.mostrar_colapsable();

    expect(component.colapsable).toBe(false);
  });

  it('should update the store with setValorStore', () => {
    component.crearFormulario();
    component.form.get('btonDeRadio')?.setValue('option1');

    component.setValorStore(component.form, 'btonDeRadio');

    expect(tramite260912StoreMock.setTramite260912State).toHaveBeenCalledWith({
      btonDeRadio: 'option1',
    });
  });

  it('should subscribe to the store and update estadoSeleccionado', () => {
    component.getValorStore();

    expect(component.estadoSeleccionado).toEqual({
      btonDeRadio: 'option1',
      justificacion: 'test justification',
      rfcDel: 'RFC123',
      denominacion: 'Test Denomination',
      correo: 'test@example.com',
    });
  });

  it('should clean up subscriptions on destroy', () => {
    const destroySpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});