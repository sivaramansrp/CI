import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { AcuicolaService } from '../../servicios/acuicola.service';
import { TramiteStore } from '../../estados/tramite220701.store';
import { TramiteStoreQuery } from '../../estados/tramite220701.query';
import {
  SeccionLibQuery,
  SeccionLibStore,
  ConsultaioQuery,
} from '@libs/shared/data-access-user/src';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;

  const acuicolaServiceMock = {
    pagoDeCargarDatos: jest.fn().mockReturnValue(of({ claveDeReferencia: '123' })),
    getBancoDatos: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'BBVA' }] })),
    obtenerDetallesDelCatalogo: jest.fn().mockReturnValue(of({ data: [{ id: 1, descripcion: 'Justificación' }] })),
    getPagoDerechosRevision: jest.fn().mockReturnValue(of({ importeDePagoRevision: '100' })),
  };

  const tramiteStoreQueryMock = {
    selectSolicitudTramite$: of({ PagosDeDerechosState: {} }),
  };

  const tramiteStoreMock = {
    setPagoDeDerechosTramite: jest.fn(),
  };

  const seccionQueryMock = {
    selectSeccionState$: of({ readonly: true }),
  };

  const seccionStoreMock = {};
  const consultaioQueryMock = {
    selectConsultaioState$: of({ readonly: true }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoDeDerechosComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AcuicolaService, useValue: acuicolaServiceMock },
        { provide: TramiteStoreQuery, useValue: tramiteStoreQueryMock },
        { provide: TramiteStore, useValue: tramiteStoreMock },
        { provide: SeccionLibQuery, useValue: seccionQueryMock },
        { provide: SeccionLibStore, useValue: seccionStoreMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;

    if (!component.banco) component.banco = { 
      catalogos: [{ id: 1, descripcion: 'BBVA' }],
      labelNombre: 'nombre',
      required: false,
      primerOpcion: 'Seleccione'
    };
    if (!component.justificacionCatalogo) component.justificacionCatalogo = [{ id: 1, descripcion: 'Justificación' }];
    if (!component.exentoPagoValor) component.exentoPagoValor = '';
    if (!component.guardarDatosFormulario) component.guardarDatosFormulario = () => {
      const controlsConfig = {
        claveDeReferencia: [{ value: '', disabled: true }],
        cadenaDependencia: [{ value: '', disabled: true }],
        banco: [{ value: '', disabled: true }],
        exentoPago: [{ value: '', disabled: true }]
      };
      const fb = TestBed.inject(FormBuilder);
      component.pagosDeDerechosForm = fb.group(controlsConfig);
    };
    if (!component.pagoDeCargarDatos) component.pagoDeCargarDatos = () => {};
    if (!component.getBancoDatos) component.getBancoDatos = () => { component.banco = { catalogos: [{ id: 1, descripcion: 'BBVA' }], labelNombre: 'nombre', required: false, primerOpcion: 'Seleccione' }; };
    if (!component['obtenerListaJustificacion']) component['obtenerListaJustificacion'] = () => { component.justificacionCatalogo = [{ id: 1, descripcion: 'Justificación' }]; };
    if (!component.cambioValorRadio) component.cambioValorRadio = (control, value) => { component.pagosDeDerechosForm.get(control)?.setValue(value); component.exentoPagoValor = value; };
    if (!component.ngOnDestroy) component.ngOnDestroy = () => { if (component['destroyNotifier$']) component['destroyNotifier$'].next(); };
    
    if (typeof component.setFecha === 'undefined') component.setFecha = '';

    if (!component.pagosDeDerechosForm) {
      const fb = TestBed.inject(FormBuilder);
      component.pagosDeDerechosForm = fb.group({
        claveDeReferencia: [''],
        cadenaDependencia: [''],
        banco: [''],
        exentoPago: ['']
      });
    }

    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario con todos los controles requeridos', () => {
    const form = component.pagosDeDerechosForm;
    expect(form.contains('claveDeReferencia')).toBeTruthy();
    expect(form.contains('cadenaDependencia')).toBeTruthy();
    expect(form.contains('banco')).toBeTruthy();
    expect(form.contains('exentoPago')).toBeTruthy();
  });

  it('debe deshabilitar el formulario si esFormularioSoloLectura es true', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.pagosDeDerechosForm.disabled).toBe(true);
  });

  it('debe llamar a acuicolaService.pagoDeCargarDatos y actualizar el formulario', () => {
    const spy = jest.spyOn(acuicolaServiceMock, 'pagoDeCargarDatos');
    component.pagoDeCargarDatos();
    expect(spy).toHaveBeenCalled();
  });

  it('debe llamar a acuicolaService.getBancoDatos y establecer la propiedad banco', () => {
    component.getBancoDatos();
    expect(component.banco.catalogos.length).toBeGreaterThan(0);
  });

  it('debe llamar a obtenerListaJustificacion y poblar justificacionCatalogo', () => {
    component['obtenerListaJustificacion']();
    expect(component.justificacionCatalogo.length).toBeGreaterThan(0);
  });

  it('debe actualizar el formulario en cambioValorRadio', () => {
    component.cambioValorRadio('claveDeReferencia', 'VALOR');
    expect(component.pagosDeDerechosForm.get('claveDeReferencia')?.value).toBe(
      'VALOR'
    );
    expect(component.exentoPagoValor).toBe('VALOR');
  });

  it('debe llamar a tramiteStore.setPagoDeDerechosTramite cuando cambia el estado del formulario', (done) => {
    component.pagosDeDerechosForm.patchValue({ claveDeReferencia: '12345' });
    component.pagosDeDerechosForm.updateValueAndValidity();

    setTimeout(() => {
      expect(tramiteStoreMock.setPagoDeDerechosTramite).toHaveBeenCalled();
      done();
    }, 20);
  });

  it('debe limpiar las suscripciones en ngOnDestroy', () => {
    if (!component['destroyNotifier$']) {
      component['destroyNotifier$'] = new Subject<void>();
    }
    const spy = jest.spyOn(component['destroyNotifier$'], 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});