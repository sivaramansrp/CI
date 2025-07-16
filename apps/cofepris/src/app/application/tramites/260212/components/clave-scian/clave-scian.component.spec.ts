import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClaveScianComponent } from './clave-scian.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { SolicitudService } from '../../services/solicitud.service';
import { Tramite260212Store } from '../../estados/tramite260212.store';
import { Tramite260212Query } from '../../estados/tramite260212.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

class SolicitudServiceMock {
  getClave = jest.fn().mockReturnValue(of([{ id: 1, nombre: 'clave1' }]));
}
class Tramite260212StoreMock {
  setClave = jest.fn();
}
class Tramite260212QueryMock {
  selectedClave$ = of('clave1');
  selectedDescripcion$ = of('desc1');
}
class ConsultaioQueryMock {
  selectConsultaioState$ = of({ readonly: false });
}

describe('ClaveScianComponent', () => {
  let component: ClaveScianComponent;
  let fixture: ComponentFixture<ClaveScianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ClaveScianComponent 
      ],
      providers: [
        FormBuilder,
        { provide: SolicitudService, useClass: SolicitudServiceMock },
        { provide: Tramite260212Store, useClass: Tramite260212StoreMock },
        { provide: Tramite260212Query, useClass: Tramite260212QueryMock },
        { provide: ConsultaioQuery, useClass: ConsultaioQueryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClaveScianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario', () => {
    expect(component.claveForm).toBeDefined();
    expect(component.claveForm.get('clave')).toBeDefined();
    expect(component.claveForm.get('descripcion')).toBeDefined();
  });

  it('debería llamar a getClave y establecer el arreglo clave en actualizarEstado', () => {
    component.actualizarEstado();
    expect(component.clave.length).toBeGreaterThan(0);
  });

  it('debería establecer los valores del formulario desde selectedClave$ y selectedDescripcion$', () => {
    component.actualizarEstado();
    expect(component.claveForm.get('clave')?.value).toBe('clave1');
    expect(component.claveForm.get('descripcion')?.value).toBe('desc1');
  });

  it('debería emitir el evento cancel cuando se llama cancelar', () => {
    const spy = jest.spyOn(component.cancel, 'emit');
    component.cancelar();
    expect(spy).toHaveBeenCalled();
  });

  it('debería llamar a setClave en el store cuando se llama getMunicipios', () => {
    component.claveForm.get('clave')?.setValue('claveX');
    const store = (component as any).tramite260212Store as Tramite260212StoreMock;
    component.getMunicipios();
    expect(store.setClave).toHaveBeenCalledWith('claveX');
  });

  it('debería limpiar destroy$ en ngOnDestroy', () => {
    const completeSpy = jest.spyOn((component as any).destroy$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should disable the form when esFormularioSoloLectura is true', () => {
  component.esFormularioSoloLectura = true;
  component.guardarDatosFormulario();
  expect(component.claveForm.disabled).toBe(true);
});

it('should enable the form when esFormularioSoloLectura is false', () => {
  component.esFormularioSoloLectura = false;
  component.guardarDatosFormulario();
  expect(component.claveForm.enabled).toBe(true);
});

it('should reset form when limpiar is called', () => {
  const resetSpy = jest.spyOn(component.claveForm, 'reset');
  component.limpiar();
  expect(resetSpy).toHaveBeenCalled();
});

it('should emit agregarDatos and call cancelar if form is valid', () => {
  const spyAgregar = jest.spyOn(component.agregarDatos, 'emit');
  const spyCancelar = jest.spyOn(component, 'cancelar');

  component.clave = [
    { id: 1, descripcion: 'clave1' },
    { id: 2, descripcion: 'desc1' }
  ];

  component.claveForm.setValue({ clave: '1', descripcion: '2' });

  component.agregar();

  expect(spyAgregar).toHaveBeenCalledWith({
    clave: 'clave1',
    descripcion: 'desc1'
  });
  expect(spyCancelar).toHaveBeenCalled();
});

it('should not emit agregarDatos if form is invalid', () => {
  const spyAgregar = jest.spyOn(component.agregarDatos, 'emit');

  component.claveForm.reset(); // Invalidate the form
  component.agregar();

  expect(spyAgregar).not.toHaveBeenCalled();
});

it('obtenerDescripcion should return matching descripcion', () => {
  const array = [{ id: 1, descripcion: 'desc uno' }];
  const result = ClaveScianComponent.obtenerDescripcion(array, '1');
  expect(result).toBe('desc uno');
});

it('obtenerDescripcion should return empty string if id not found', () => {
  const array = [{ id: 1, descripcion: 'desc uno' }];
  const result = ClaveScianComponent.obtenerDescripcion(array, '99');
  expect(result).toBe('');
});

});

