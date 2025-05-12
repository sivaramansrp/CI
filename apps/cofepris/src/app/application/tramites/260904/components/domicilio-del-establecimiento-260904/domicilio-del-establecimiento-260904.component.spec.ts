import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomicilioDelEstablecimiento260904Component } from './domicilio-del-establecimiento-260904.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Tramite260904Query } from '../../estados/queries/tramite260904.query';
import { Tramite260904Store } from '../../estados/tramites/tramite260904.store';
import { of } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('DomicilioDelEstablecimiento260904Component', () => {
  let component: DomicilioDelEstablecimiento260904Component;
  let fixture: ComponentFixture<DomicilioDelEstablecimiento260904Component>;
  let tramite260904Query: jest.Mocked<Partial<Tramite260904Query>>;
  let tramite260904Store: jest.Mocked<Partial<Tramite260904Store>>;

  beforeEach(async () => {
    const queryMock: Partial<Tramite260904Query> = {
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
    };

    const storeMock: Partial<Tramite260904Store> = {
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
      imports: [ReactiveFormsModule, HttpClientTestingModule, DomicilioDelEstablecimiento260904Component],
      providers: [
        FormBuilder,
        { provide: Tramite260904Query, useValue: queryMock },
        { provide: Tramite260904Store, useValue: storeMock },
      ],
    }).compileComponents();

    tramite260904Query = TestBed.inject(
      Tramite260904Query
    ) as jest.Mocked<Partial<Tramite260904Query>>;
    tramite260904Store = TestBed.inject(
      Tramite260904Store
    ) as jest.Mocked<Partial<Tramite260904Store>>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomicilioDelEstablecimiento260904Component);
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
    expect(component.form.get('códigoPostal')?.value).toBe('12345');
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
    expect(tramite260904Store.setCodigoPostal).toHaveBeenCalledWith('12345');

    component.getEstado();
    expect(tramite260904Store.setEstado).toHaveBeenCalledWith({ id: 1, nombre: 'Estado', descripcion: 'Descripcion' });

    component.getMunicipioOAlcaldia();
    expect(tramite260904Store.setMunicipioOAlcaldia).toHaveBeenCalledWith('Municipio');

    component.getLocalidad();
    expect(tramite260904Store.setLocalidad).toHaveBeenCalledWith('Localidad');

    component.getColonias();
    expect(tramite260904Store.setColonias).toHaveBeenCalledWith('Colonia');

    component.getCalle();
    expect(tramite260904Store.setCalle).toHaveBeenCalledWith('Calle');

    component.getLada();
    expect(tramite260904Store.setLada).toHaveBeenCalledWith('123');

    component.getTelefono();
    expect(tramite260904Store.setTelefono).toHaveBeenCalledWith('1234567890');

    component.getAvisoCheckbox();
    expect(tramite260904Store.setAvisoCheckbox).toHaveBeenCalledWith('true');

    component.getRegimen();
    expect(tramite260904Store.setRegimen).toHaveBeenCalledWith({ id: 1, nombre: 'Regimen', descripcion: 'Descripcion' });

    component.getAduanasEntradas();
    expect(tramite260904Store.setAduanasEntradas).toHaveBeenCalledWith({ id: 1, nombre: 'Aduana', descripcion: 'Descripcion' });

    component.getAifaCheckbox();
    expect(tramite260904Store.setAifaCheckbox).toHaveBeenCalledWith('true');

    component.getManifests();
    expect(tramite260904Store.setManifests).toHaveBeenCalledWith('true');

    component.getAcuerdoPublico();
    expect(tramite260904Store.setAcuerdoPublico).toHaveBeenCalledWith('Acuerdo');

    component.getRfc();
    expect(tramite260904Store.setRFC).toHaveBeenCalledWith('RFC123');
  });
});