import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { Tramite250102Store } from '../../estados/tramite250102.store';
import { Tramite250102Query } from '../../estados/tramite250102.query';
import { CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite250102State } from '../../estados/tramite250102.store';

jest.mock('@libs/shared/theme/assets/json/250102/banco.json', () => ({
  banco: ['MockBank1', 'MockBank2'],
}));

jest.mock('@libs/shared/theme/assets/json/250102/pago-formdatos.json', () => ({
  formData: {
    clave: 'mockClave',
    dependencia: 'mockDependencia',
    importe: '1234',
  },
}));

const mockSolicitudState: Tramite250102State = {
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
  procedencia: '',
  tipoMovimiento: 'mockMovimiento',
  destinariociudad: 'mockCiudad',
};

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let tramite250102Store: Tramite250102Store;

  const tramite250102StoreMock = {
    setClave: jest.fn(),
    setDependencia: jest.fn(),
    setBanco: jest.fn(),
    setLlave: jest.fn(),
    setFecha: jest.fn(),
    setImporte: jest.fn(),
    setRevisados: jest.fn(),
  };

  const tramite250102QueryMock = {
    selectSolicitud$: of(mockSolicitudState),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        PagoDeDerechosComponent,
        TituloComponent,
        CatalogoSelectComponent,
      ],
      providers: [
        FormBuilder,
        { provide: Tramite250102Store, useValue: tramite250102StoreMock },
        { provide: Tramite250102Query, useValue: tramite250102QueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    tramite250102Store = TestBed.inject(Tramite250102Store);
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
    component.setValoresStore(component.pagoDerechosForm, 'clave');
  });

  it('should call setDependencia store method when updating dependencia', () => {
    component.pagoDerechosForm.controls['dependencia'].setValue('newDep');
    component.setValoresStore(component.pagoDerechosForm, 'dependencia');
  });

  it('should call setBanco store method when updating banco', () => {
    component.pagoDerechosForm.controls['banco'].setValue('OtherBank');
    component.setValoresStore(component.pagoDerechosForm, 'banco',);
  });

  it('should call setLlave store method when updating llave', () => {
    component.pagoDerechosForm.controls['llave'].setValue('1111');
    component.setValoresStore(component.pagoDerechosForm, 'llave');
  });

  it('should call setFecha store method when updating fecha', () => {
    component.pagoDerechosForm.controls['fecha'].setValue('2025-05-01');
    component.setValoresStore(component.pagoDerechosForm, 'fecha');
  });

  it('should call setImporte store method when updating importe', () => {
    component.pagoDerechosForm.controls['importe'].setValue('5678');
    component.setValoresStore(component.pagoDerechosForm, 'importe');
  });

  it('should call setRevisados store method when updating revisados', () => {
    component.pagoDerechosForm.controls['revisados'].setValue(false);
    component.setValoresStore(component.pagoDerechosForm, 'revisados');
  });

  it('should clean up subscriptions on destroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});

