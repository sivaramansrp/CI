import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { Tramite260911Query } from '../../estados/tramite260911.query';
import { Tramite260911Store } from '../../estados/tramite260911.store';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let tramite260911QueryMock: any;
  let tramite260911StoreMock: any;

  beforeEach(() => {
    tramite260911QueryMock = {
      selectTramite260911$: of({
        btonDeRadio: 'option1',
        justificacion: 'test justification',
        rfcDel: 'RFC123',
        denominacion: 'Test Denomination',
        correo: 'test@example.com',
      }),
    };

    tramite260911StoreMock = {
      setTramite260911State: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite260911Query, useValue: tramite260911QueryMock },
        { provide: Tramite260911Store, useValue: tramite260911StoreMock },
      ],
    });

    const fb = TestBed.inject(FormBuilder);
    component = new DatosDeLaSolicitudComponent(
      fb,
      tramite260911QueryMock,
      tramite260911StoreMock
    );
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

    expect(tramite260911StoreMock.setTramite260911State).toHaveBeenCalledWith({
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
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});