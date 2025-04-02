import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CamDestinatarioComponent } from './cam-destinatario.component';
import { CamState } from '../../estados/cam-certificado.store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('CamDestinatarioComponent', () => {
  let component: CamDestinatarioComponent;
  let fixture: ComponentFixture<CamDestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CamDestinatarioComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CamDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize exportadorForm with correct values on initActionFormBuild', () => {
    component['exportadoState'] = {
      lugar: 'Test Lugar',
      exportador: 'Test Exportador',
      empresa: 'Test Empresa',
      cargo: 'Test Cargo',
      lada: '123',
      telfono: '4567890',
      fax: '987654',
      correo: 'test@example.com',
    } as CamState;

    component.initActionFormBuild();

    expect(component.exportadorForm.value).toEqual({
      lugar: 'Test Lugar',
      exportador: 'Test Exportador',
      empresa: 'Test Empresa',
      cargo: 'Test Cargo',
      lada: '123',
      telfono: '4567890',
      fax: '987654',
      correo: 'test@example.com',
    });
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