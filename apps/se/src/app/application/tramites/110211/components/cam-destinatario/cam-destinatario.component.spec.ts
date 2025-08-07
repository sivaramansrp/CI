import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CamState } from '../../estados/cam-certificado.store';
import { CamDestinatarioComponent } from './cam-destinatario.component';

describe('CamDestinatarioComponent', () => {
  let componente: CamDestinatarioComponent;
  let fixture: ComponentFixture<CamDestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CamDestinatarioComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CamDestinatarioComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debe inicializar exportadorForm con los valores correctos en initActionFormBuild', () => {
    componente['exportadoState'] = {
      lugar: 'Test Lugar',
      exportador: 'Test Exportador',
      empresa: 'Test Empresa',
      cargo: 'Test Cargo',
      lada: '123',
      telfono: '4567890',
      fax: '987654',
      correo: 'test@example.com',
    } as CamState;

    componente.initActionFormBuild();

    expect(componente.exportadorForm.value).toEqual({
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

  it('debe llamar store.setFormDatosDelDestinatario con el valor correcto en datosDelDestinatarioFunc', () => {
    const DATOS_PRUEBA = { clave: 'valor' };
    jest.spyOn(componente['store'], 'setFormDatosDelDestinatario');

    componente.datosDelDestinatarioFunc(DATOS_PRUEBA);

    expect(componente['store'].setFormDatosDelDestinatario).toHaveBeenCalledWith(DATOS_PRUEBA);
  });

  it('debe llamar store.setFormValida con el valor correcto en setFormValida', () => {
    jest.spyOn(componente['store'], 'setFormValida');

    componente.setFormValida(true);

    expect(componente['store'].setFormValida).toHaveBeenCalledWith({ destinatrio: true });
  });

  it('debe llamar store.setFormValida con el valor correcto en setFormValidaDestinatario', () => {
    jest.spyOn(componente['store'], 'setFormValida');

    componente.setFormValidaDestinatario(false);

    expect(componente['store'].setFormValida).toHaveBeenCalledWith({ datosDestinatario: false });
  });

  it('debe llamar método store con el valor correcto en setValoresStore', () => {
    const FORMULARIO_PRUEBA = new FormGroup({
      campoPrueba: new FormBuilder().control('valorPrueba'),
    });
    jest.spyOn(componente['store'], 'setFormValida');

    componente.setValoresStore(FORMULARIO_PRUEBA, 'campoPrueba', 'setFormValida');

    expect(componente['store'].setFormValida).toHaveBeenCalledWith('valorPrueba');
  });

  it('debe completar destroyNotifier$ en ngOnDestroy', () => {
    jest.spyOn(componente['destroyNotifier$'], 'next');
    jest.spyOn(componente['destroyNotifier$'], 'complete');

    componente.ngOnDestroy();

    expect(componente['destroyNotifier$'].next).toHaveBeenCalled();
    expect(componente['destroyNotifier$'].complete).toHaveBeenCalled();
  });
});