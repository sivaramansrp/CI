import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosCertificadoComponent } from './datos_certificado.component';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { Tramite110207Store } from '../../state/Tramite110207.store';
import { Tramite110207Query } from '../../state/Tramite110207.query';
import { ConsultaioQuery, SeccionLibQuery, SeccionLibStore } from '@libs/shared/data-access-user/src';

class Tramite110207StoreMock {
  setFormDatosCertificado = jest.fn();
  setIdiomaSeleccion = jest.fn();
  setRepresentacionFederalDatosSeleccion = jest.fn();
  setFormValida = jest.fn();
}
class Tramite110207QueryMock {
  formDatosCertificado$ = of({});
  selectIdioma$ = of([]);
  selectEntidadFederativa$ = of([]);
  selectrepresentacionFederal$ = of([]);
}
class SeccionLibQueryMock {
  selectSeccionState$ = of({} as any);
}
class SeccionLibStoreMock {}
class ConsultaioQueryMock {
  selectConsultaioState$ = of({ readonly: true });
}
class DatosCertificadoDeComponentMock {
  formDatosCertificado = new FormGroup({ test: new FormControl('') });
  validarFormularios = jest.fn().mockReturnValue(true);
}

describe('DatosCertificadoComponent', () => {
  let component: DatosCertificadoComponent;
  let fixture: ComponentFixture<DatosCertificadoComponent>;
  let store: Tramite110207StoreMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosCertificadoComponent],
      providers: [
        FormBuilder,
        { provide: Tramite110207Store, useClass: Tramite110207StoreMock },
        { provide: Tramite110207Query, useClass: Tramite110207QueryMock },
        { provide: SeccionLibQuery, useClass: SeccionLibQueryMock },
        { provide: SeccionLibStore, useClass: SeccionLibStoreMock },
        { provide: ConsultaioQuery, useClass: ConsultaioQueryMock },
      ]
    })
    .overrideComponent(DatosCertificadoComponent, {
      set: {
        providers: [],
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosCertificadoComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Tramite110207Store) as any;
    // Mock child component
    component.datosCertificadoDeRef = new DatosCertificadoDeComponentMock() as any;
    // Setup formDatosCertificado for getter tests
    component.formDatosCertificado = new FormGroup({ test: new FormControl('value') });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize observables and subscribe in constructor', () => {
    expect(component.idiomaDatos$).toBeDefined();
    expect(component.entidadFederativas$).toBeDefined();
    expect(component.representacionFederal$).toBeDefined();
  });

  it('should set esFormularioSoloLectura on ngOnInit', () => {
    component.esFormularioSoloLectura = false;
    component.ngOnInit();
    expect(component.esFormularioSoloLectura).toBe(true);
  });

  it('should call setFormDatosCertificado in setValoresStore', () => {
    component.setValoresStore({ formGroupName: '', campo: 'campo', valor: undefined, storeStateName: '' });
    expect(store.setFormDatosCertificado).toHaveBeenCalledWith({ campo: 'valor' });
  });

  it('should call setIdiomaSeleccion in idiomaSeleccion', () => {
    const catalogo = { id: 1, nombre: 'Español' } as any;
    component.idiomaSeleccion(catalogo);
    expect(store.setIdiomaSeleccion).toHaveBeenCalledWith(catalogo);
  });

  it('should call setFormDatosCertificado in obtenerDatosFormulario', () => {
    const data = { test: 'value' };
    component.obtenerDatosFormulario(data);
    expect(store.setFormDatosCertificado).toHaveBeenCalledWith(data);
  });

  it('should call setRepresentacionFederalDatosSeleccion in representacionFederalSeleccion', () => {
    const catalogo = { id: 2, nombre: 'Federal' } as any;
    component.representacionFederalSeleccion(catalogo);
    expect(store.setRepresentacionFederalDatosSeleccion).toHaveBeenCalledWith(catalogo);
  });

  it('should call setFormValida in setFormValida', () => {
    component.setFormValida(true);
    expect(store.setFormValida).toHaveBeenCalledWith({ datos: true });
  });

  it('childForm getter should return child form', () => {
    expect(component.childForm).toBe(component.datosCertificadoDeRef.formDatosCertificado);
  });

  it('isChildFormValid should call validarFormularios on child', () => {
    expect(component.isChildFormValid()).toBe(true);
    expect(component.datosCertificadoDeRef.validarFormularios).toHaveBeenCalled();
  });

  it('getChildFormControl should return control from child form', () => {
    const control = component.getChildFormControl('test');
    expect(control).toBeInstanceOf(FormControl);
    expect(control?.value).toBe('');
  });

  it('setChildFormValues should patch values to child form', () => {
    const spy = jest.spyOn(component.childForm!, 'patchValue');
    component.setChildFormValues({ test: 'patched' });
    expect(spy).toHaveBeenCalledWith({ test: 'patched' });
  });

  it('validateAll should validate child form and update store', () => {
    (component.datosCertificadoDeRef.validarFormularios as jest.Mock).mockReturnValue(false);
    const result = component.validateAll();
    expect(result).toBe(false);
    expect(store.setFormValida).toHaveBeenCalledWith(false);

    (component.datosCertificadoDeRef.validarFormularios as jest.Mock).mockReturnValue(true);
    const result2 = component.validateAll();
    expect(result2).toBe(true);
    expect(store.setFormValida).toHaveBeenCalledWith(true);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const spy = jest.spyOn(component.destroyNotifier$, 'next');
    const spyComplete = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

  it('formularioControl getter should return FormControl', () => {
    expect(component.formularioControl).toBeInstanceOf(FormControl);
    expect(component.formularioControl.value).toBe('value');
  });
});