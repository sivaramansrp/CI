import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleComponent } from './detalle.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

describe('DetalleComponent', () => {
  let component: DetalleComponent;
  let fixture: ComponentFixture<DetalleComponent>;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [DetalleComponent, ReactiveFormsModule, FormsModule],
      providers: [
        FormBuilder,
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe deshabilitar el formulario si esFormularioSoloLectura es true en guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = true;
    component.detalleForm.enable();
    component.guardarDatosFormulario();
    expect(component.detalleForm.disabled).toBe(true);
  });

  it('debe habilitar el formulario si esFormularioSoloLectura es false en guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = false;
    component.detalleForm.disable();
    component.guardarDatosFormulario();
    expect(component.detalleForm.enabled).toBe(true);
  });

  it('debe llamar a guardarDatosFormulario si detalleForm existe y esFormularioSoloLectura es true en inicializarEstadoFormulario', () => {
    component.esFormularioSoloLectura = true;
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('debe limpiar las suscripciones en ngOnDestroy', () => {
    const nextSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
