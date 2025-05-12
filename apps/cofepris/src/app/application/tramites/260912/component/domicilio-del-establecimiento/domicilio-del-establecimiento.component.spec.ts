import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomicilioDelEstablecimientoComponent } from './domicilio-del-establecimiento.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Tramite260912Query } from '../../estados/tramite-260912.query';
import { Tramite260912Store } from '../../estados/tramite-260912.store';
import { of } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('DomicilioDelEstablecimientoComponent', () => {
  let component: DomicilioDelEstablecimientoComponent;
  let fixture: ComponentFixture<DomicilioDelEstablecimientoComponent>;
  let tramite260912Query: jest.Mocked<Partial<Tramite260912Query>>;
  let tramite260912Store: jest.Mocked<Partial<Tramite260912Store>>;

  beforeEach(async () => {
    const queryMock: Partial<Tramite260912Query> = {
      codigoPostal$: of('12345'),
      estado$: of({ id: 1, nombre: 'Estado', descripcion: 'Descripcion' } as Catalogo),
      municipioOAlcaldia$: of('Municipio'),
      localidad$: of('Localidad'),
      colonias$: of('Colonia'),
      calle$: of('Calle'),
      lada$: of('123'),
      telefono$: of('1234567890'),
      avisoCheckbox$: of('true'),
      regimen$: of({ id: 1, nombre: 'Regimen', descripcion: 'Descripcion' } as Catalogo),
      aduanasEntradas$: of({ id: 1, nombre: 'Aduana', descripcion: 'Descripcion' } as Catalogo),
      aifaCheckbox$: of('true'),
      manifests$: of('true'),
      acuerdoPublico$: of('Acuerdo'),
      rfc$: of('RFC123'),
      selectTramite260912$: of({
        codigoPostal: '12345',
        estado: { id: 1, nombre: 'Estado', descripcion: 'Descripcion' },
        municipioOAlcaldia: 'Municipio',
        localidad: 'Localidad',
        colonias: 'Colonia',
        calle: 'Calle',
        lada: '123',
        telefono: '1234567890',
        avisoCheckbox: 'true',
        regimen: { id: 1, nombre: 'Regimen', descripcion: 'Descripcion' },
        aduanasEntradas: { id: 1, nombre: 'Aduana', descripcion: 'Descripcion' },
        aifaCheckbox: 'true',
        manifests: 'true',
        acuerdoPublico: 'Acuerdo',
        rfc: 'RFC123',
        claveDeReferencia: 'ClaveReferencia',
        cadenaPagoDependencia: 'CadenaPago',
        clave: 'Clave',
        llaveDePago: 'LlavePago',
        dependencia: 'Dependencia',
        tramite: 'Tramite',
        fecha: '2023-01-01',
        hora: '12:00',
        folio: 'Folio123',
        estatus: 'Estatus',
        fecPago: '',
        impPago: '',
        btonDeRadio: '',
        justificacion: '',
        rfcDel: '',
        denominacion: '',
        correo: '',
      }), // Mocking selectTramite260912$
    } 

    const storeMock: Partial<Tramite260912Store> = {
      setCodigoPostal: jest.fn(),
      setEstado: jest.fn(),
      setMunicipioOAlcaldia: jest.fn(),
      setLocalidad: jest.fn(),
      setColonias: jest.fn(),
      setCalle: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setAvisoCheckbox: jest.fn(),
      setRegimen: jest.fn(),
      setAduanasEntradas: jest.fn(),
      setAifaCheckbox: jest.fn(),
      setManifests: jest.fn(),
      setAcuerdoPublico: jest.fn(),
      setRFC: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, DomicilioDelEstablecimientoComponent],
      providers: [
        FormBuilder,
        { provide: Tramite260912Query, useValue: queryMock },
        { provide: Tramite260912Store, useValue: storeMock },
      ],
    }).compileComponents();

    tramite260912Query = TestBed.inject(
      Tramite260912Query
    ) as jest.Mocked<Partial<Tramite260912Query>>;
    tramite260912Store = TestBed.inject(
      Tramite260912Store
    ) as jest.Mocked<Partial<Tramite260912Store>>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomicilioDelEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.domicilio).toBeDefined();
    expect(component.representanteLegal).toBeDefined();
  });

  it('should set form values from observables', () => {
    component.ngOnInit();
    expect(component.form.get('codigoPostal')?.value).toBe('12345');
    expect(component.form.get('estado')?.value).toEqual({ id: 1, nombre: 'Estado', descripcion: 'Descripcion' });
    expect(component.form.get('municipioOAlcaldia')?.value).toBe('Municipio');
    expect(component.form.get('localidad')?.value).toBe('Localidad');
    expect(component.form.get('colonias')?.value).toBe('Colonia');
    expect(component.form.get('calle')?.value).toBe('Calle');
    expect(component.form.get('lada')?.value).toBe('123');
    expect(component.form.get('telefono')?.value).toBe('1234567890');
    expect(component.domicilio.get('avisoCheckbox')?.value).toBe('true');
    expect(component.domicilio.get('regimen')?.value).toEqual({ id: 1, nombre: 'Regimen', descripcion: 'Descripcion' });
    expect(component.domicilio.get('aduanasEntradas')?.value).toEqual({ id: 1, nombre: 'Aduana', descripcion: 'Descripcion' });
    expect(component.domicilio.get('aifaCheckbox')?.value).toBe('true');
    expect(component.domicilio.get('manifests')?.value).toBe('true');
    expect(component.representanteLegal.get('acuerdoPublico')?.value).toBe('Acuerdo');
    expect(component.representanteLegal.get('rfc')?.value).toBe('RFC123');
  });

  it('should call store methods on get methods', () => {
    component.getCodigoPostal();
    expect(tramite260912Store.setCodigoPostal).toHaveBeenCalledWith('12345');

    component.getEstado();
    expect(tramite260912Store.setEstado).toHaveBeenCalledWith({ id: 1, nombre: 'Estado', descripcion: 'Descripcion' });

    component.getMunicipioOAlcaldia();
    expect(tramite260912Store.setMunicipioOAlcaldia).toHaveBeenCalledWith('Municipio');

    component.getLocalidad();
    expect(tramite260912Store.setLocalidad).toHaveBeenCalledWith('Localidad');

    component.getColonias();
    expect(tramite260912Store.setColonias).toHaveBeenCalledWith('Colonia');

    component.getCalle();
    expect(tramite260912Store.setCalle).toHaveBeenCalledWith('Calle');

    component.getLada();
    expect(tramite260912Store.setLada).toHaveBeenCalledWith('123');

    component.getTelefono();
    expect(tramite260912Store.setTelefono).toHaveBeenCalledWith('1234567890');

    component.getAvisoCheckbox();
    expect(tramite260912Store.setAvisoCheckbox).toHaveBeenCalledWith('true');

    component.getRegimen();
    expect(tramite260912Store.setRegimen).toHaveBeenCalledWith({ id: 1, nombre: 'Regimen', descripcion: 'Descripcion' });

    component.getAduanasEntradas();
    expect(tramite260912Store.setAduanasEntradas).toHaveBeenCalledWith({ id: 1, nombre: 'Aduana', descripcion: 'Descripcion' });

    component.getAifaCheckbox();
    expect(tramite260912Store.setAifaCheckbox).toHaveBeenCalledWith('true');

    component.getManifests();
    expect(tramite260912Store.setManifests).toHaveBeenCalledWith('true');

    component.getAcuerdoPublico();
    expect(tramite260912Store.setAcuerdoPublico).toHaveBeenCalledWith('Acuerdo');

    component.getRfc();
    expect(tramite260912Store.setRFC).toHaveBeenCalledWith('RFC123');
  });
});