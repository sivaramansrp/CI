jest.mock('@libs/shared/theme/assets/json/250101/banco.json', () => ({
  __esModule: true,
  default: {
    banco: [
      { id: 1, descripcion: 'Banco 1' },
      { id: 2, descripcion: 'Banco 2' }
    ],
  }
}), { virtual: true });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PagoDeDerechos250101Component } from './pago-de-derechos250101.component';
import { Tramite250101Store } from '../../estados/tramite250101.store';
import { Tramite250101Query } from '../../estados/tramite250101.query';
import { CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite250101State } from '../../estados/tramite250101.store';

jest.mock('@libs/shared/theme/assets/json/250101/pago-formdatos.json', () => ({
  formData: {
    clave: 'mockClave',
    dependencia: 'mockDependencia',
    importe: '1234',
  },
}));

// ✅ Mock data for solicitud state
const mockSolicitudState: Tramite250101State = {
  clave: 'mockClave',
  dependencia: 'mockDependencia',
  banco: 'MockBank1',
  llave: '9876',
  fecha: '2025-04-10',
  importe: '1234',
  revisados: "yes",
  tipoAduana: null,
  tipoInspectoria: null,
  tipoMunicipio: null,
  destinatarioDenominacion: '',
  destinatarioPais: null,
  destinatarioEstado: null,
  destinatarioCodigoPostal: '',
  destinatarioDomicilio: '',
  agenteAduanalNombre: '',
  agenteAduanalPrimerApellido: '',
  agenteAduanalSegundoApellido: '',
  agenteAduanalPatente: '',
  destinatarioRowData: [],
  agenteAduanalRowData: [],
  medio: '',
  identificacion: '',
  economico: '',
  placa: '',
  numero: '',
  fechas: '',
  requisito: '',
  descripcion: '',
  fraccion: '',
  arancelaria: '',
  cantidad: '',
  medida: '',
  genero: '',
  especie: '',
  comun: '',
  origen: '',
  procedencia: ''
};

describe('PagoDeDerechos250101Component', () => {
  let component: PagoDeDerechos250101Component;
  let fixture: ComponentFixture<PagoDeDerechos250101Component>;
  let tramite250101Store: Tramite250101Store;

  const tramite250101StoreMock = {
    setClave: jest.fn(),
    setDependencia: jest.fn(),
    setBanco: jest.fn(),
    setLlave: jest.fn(),
    setFecha: jest.fn(),
    setImporte: jest.fn(),
    setRevisados: jest.fn(),
  };

  const tramite250101QueryMock = {
    selectSolicitud$: of(mockSolicitudState),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        PagoDeDerechos250101Component,
        TituloComponent,
        CatalogoSelectComponent,
      ],
      providers: [
        FormBuilder,
        { provide: Tramite250101Store, useValue: tramite250101StoreMock },
        { provide: Tramite250101Query, useValue: tramite250101QueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoDeDerechos250101Component);
    component = fixture.componentInstance;
    tramite250101Store = TestBed.inject(Tramite250101Store);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with values from store and set fixed values from JSON', () => {
    expect(component.pagoDerechosForm.controls['clave'].value).toBe('mockClave');
    expect(component.pagoDerechosForm.controls['dependencia'].value).toBe('mockDependencia');
    expect(component.pagoDerechosForm.controls['banco'].value).toBe('MockBank1');
    expect(component.pagoDerechosForm.controls['llave'].value).toBe('9876');
    expect(component.pagoDerechosForm.controls['fecha'].value).toBe('2025-04-10');
    expect(component.pagoDerechosForm.controls['importe'].value).toBe('1234');
    expect(component.pagoDerechosForm.controls['revisados'].value).toBe('yes');
  });

  it('should disable clave, dependencia and importe fields', () => {
    expect(component.pagoDerechosForm.controls['clave'].disabled).toBe(true);
    expect(component.pagoDerechosForm.controls['dependencia'].disabled).toBe(true);
    expect(component.pagoDerechosForm.controls['importe'].disabled).toBe(true);
  });

  it('should call setClave store method when updating clave', () => {
    component.pagoDerechosForm.controls['clave'].setValue('newClave');
    component.setValoresStore(component.pagoDerechosForm, 'clave', 'setClave');
    expect(tramite250101Store.setClave).toHaveBeenCalledWith('newClave');
  });

  it('should call setDependencia store method when updating dependencia', () => {
    component.pagoDerechosForm.controls['dependencia'].setValue('newDep');
    component.setValoresStore(component.pagoDerechosForm, 'dependencia', 'setDependencia');
    expect(tramite250101Store.setDependencia).toHaveBeenCalledWith('newDep');
  });

  it('should call setBanco store method when updating banco', () => {
    component.pagoDerechosForm.controls['banco'].setValue('OtherBank');
    component.setValoresStore(component.pagoDerechosForm, 'banco', 'setBanco');
    expect(tramite250101Store.setBanco).toHaveBeenCalledWith('OtherBank');
  });

  it('should call setLlave store method when updating llave', () => {
    component.pagoDerechosForm.controls['llave'].setValue('1111');
    component.setValoresStore(component.pagoDerechosForm, 'llave', 'setLlave');
    expect(tramite250101Store.setLlave).toHaveBeenCalledWith('1111');
  });

  it('should call setFecha store method when updating fecha', () => {
    component.pagoDerechosForm.controls['fecha'].setValue('2025-05-01');
    component.setValoresStore(component.pagoDerechosForm, 'fecha', 'setFecha');
    expect(tramite250101Store.setFecha).toHaveBeenCalledWith('2025-05-01');
  });

  it('should call setImporte store method when updating importe', () => {
    component.pagoDerechosForm.controls['importe'].setValue('5678');
    component.setValoresStore(component.pagoDerechosForm, 'importe', 'setImporte');
    expect(tramite250101Store.setImporte).toHaveBeenCalledWith('5678');
  });

  it('should call setRevisados store method when updating revisados', () => {
    component.pagoDerechosForm.controls['revisados'].setValue(false);
    component.setValoresStore(component.pagoDerechosForm, 'revisados', 'setRevisados');
    expect(tramite250101Store.setRevisados).toHaveBeenCalledWith(false);
  });

  it('should clean up subscriptions on destroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  
  it('should return early if pagoDerechosForm is undefined', () => {
    component.pagoDerechosForm = undefined as any;
    expect(() => component.inicializarEstadoFormulario()).not.toThrow();
  });

  it('should call guardarDatosFormulario if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should enable the form and disable specific controls if esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;
    component.pagoDerechosForm.disable();
    component.inicializarEstadoFormulario();
    expect(component.pagoDerechosForm.enabled).toBe(true);
    expect(component.pagoDerechosForm.get('clave')?.disabled).toBe(true);
    expect(component.pagoDerechosForm.get('dependencia')?.disabled).toBe(true);
    expect(component.pagoDerechosForm.get('importe')?.disabled).toBe(true);
  });
});
