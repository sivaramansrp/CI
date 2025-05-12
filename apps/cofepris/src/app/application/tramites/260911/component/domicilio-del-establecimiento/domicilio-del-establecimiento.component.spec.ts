import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomicilioDelEstablecimientoComponent } from './domicilio-del-establecimiento.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Tramite260911Query } from '../../estados/queries/tramite260911.query';
import { Tramite260911Store } from '../../estados/store/tramite260911.store';
import { of } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('DomicilioDelEstablecimiento260904Component', () => {
  let component: DomicilioDelEstablecimientoComponent;
  let fixture: ComponentFixture<DomicilioDelEstablecimientoComponent>;
  let tramite260911Query: jest.Mocked<Partial<Tramite260911Query>>;
  let tramite260911Store: jest.Mocked<Partial<Tramite260911Store>>;

  beforeEach(async () => {
    const queryMock: Partial<Tramite260911Query> = {
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

    const storeMock: Partial<Tramite260911Store> = {
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
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [DomicilioDelEstablecimientoComponent],
      providers: [
        FormBuilder,
        { provide: Tramite260911Query, useValue: queryMock },
        { provide: Tramite260911Store, useValue: storeMock },
      ],
    }).compileComponents();

    tramite260911Query = TestBed.inject(
      Tramite260911Query
    ) as jest.Mocked<Partial<Tramite260911Query>>;
    tramite260911Store = TestBed.inject(
      Tramite260911Store
    ) as jest.Mocked<Partial<Tramite260911Store>>;
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
    expect(component.form.get('municipioOAlcaldía')?.value).toBe('Municipio');
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
    expect(tramite260911Store.setCodigoPostal).toHaveBeenCalledWith('12345');

    component.getEstado();
    expect(tramite260911Store.setEstado).toHaveBeenCalledWith({ id: 1, nombre: 'Estado', descripcion: 'Descripcion' });

    component.getMunicipioOAlcaldia();
    expect(tramite260911Store.setMunicipioOAlcaldia).toHaveBeenCalledWith('Municipio');

    component.getLocalidad();
    expect(tramite260911Store.setLocalidad).toHaveBeenCalledWith('Localidad');

    component.getColonias();
    expect(tramite260911Store.setColonias).toHaveBeenCalledWith('Colonia');

    component.getCalle();
    expect(tramite260911Store.setCalle).toHaveBeenCalledWith('Calle');

    component.getLada();
    expect(tramite260911Store.setLada).toHaveBeenCalledWith('123');

    component.getTelefono();
    expect(tramite260911Store.setTelefono).toHaveBeenCalledWith('1234567890');

    component.getAvisoCheckbox();
    expect(tramite260911Store.setAvisoCheckbox).toHaveBeenCalledWith('true');

    component.getRegimen();
    expect(tramite260911Store.setRegimen).toHaveBeenCalledWith({ id: 1, nombre: 'Regimen', descripcion: 'Descripcion' });

    component.getAduanasEntradas();
    expect(tramite260911Store.setAduanasEntradas).toHaveBeenCalledWith({ id: 1, nombre: 'Aduana', descripcion: 'Descripcion' });

    component.getAifaCheckbox();
    expect(tramite260911Store.setAifaCheckbox).toHaveBeenCalledWith('true');

    component.getManifests();
    expect(tramite260911Store.setManifests).toHaveBeenCalledWith('true');

    component.getAcuerdoPublico();
    expect(tramite260911Store.setAcuerdoPublico).toHaveBeenCalledWith('Acuerdo');

    component.getRfc();
    expect(tramite260911Store.setRFC).toHaveBeenCalledWith('RFC123');
  });
});