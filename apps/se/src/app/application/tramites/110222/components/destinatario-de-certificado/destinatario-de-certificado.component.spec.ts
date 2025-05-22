import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinatarioDeCertificadoComponent } from './destinatario-de-certificado.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('DestinatarioDeCertificadoComponent', () => {
  let component: DestinatarioDeCertificadoComponent;
  let fixture: ComponentFixture<DestinatarioDeCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DestinatarioDeCertificadoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinatarioDeCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call store.setFormDatosDelDestinatario with correct value in datosDelDestinatarioFunc', () => {
    const mockData = { key: 'value' };
    jest.spyOn(component['store'], 'setFormDatosDelDestinatario');

    component.datosDelDestinatarioFunc(mockData);

    expect(component['store'].setFormDatosDelDestinatario).toHaveBeenCalledWith(mockData);
  });

  it('should call store.setFormValida with correct value in setFormValida', () => {
    jest.spyOn(component['store'], 'setFormValida');

    component.setFormValida(true);

    expect(component['store'].setFormValida).toHaveBeenCalledWith({ destinatrio: true });
  });

  it('should call store.setFormValida with correct value in setFormValidaDestinatario', () => {
    jest.spyOn(component['store'], 'setFormValida');

    component.setFormValidaDestinatario(false);

    expect(component['store'].setFormValida).toHaveBeenCalledWith({ datosDestinatario: false });
  });

  it('should call store method with correct value in setValoresStore', () => {
    const mockForm = new FormGroup({
      testField: new FormBuilder().control('testValue'),
    });
    jest.spyOn(component['store'], 'setFormValida');

    component.setValoresStore(mockForm, 'testField', 'setFormValida');

    expect(component['store'].setFormValida).toHaveBeenCalledWith('testValue');
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    jest.spyOn(component['destroyNotifier$'], 'next');
    jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroyNotifier$'].next).toHaveBeenCalled();
    expect(component['destroyNotifier$'].complete).toHaveBeenCalled();
  });
});