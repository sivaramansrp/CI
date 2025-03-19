import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NotifDomicileComponent } from './notif-domicile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { CancelacionesService } from '../../services/cancelaciones.service';
import { CancelacionesStore } from '../../estados/cancelaciones.store';
import { CancelacionesQuery } from '../../estados/cancelaciones.query';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';

describe('NotifDomicileComponent', () => {
  let component: NotifDomicileComponent;
  let fixture: ComponentFixture<NotifDomicileComponent>;
  let mockService: Partial<CancelacionesService>;
  let mockStore: Partial<CancelacionesStore>;
  let mockQuery: Partial<CancelacionesQuery>;

  beforeEach(async () => {
    mockService = {
      getEntidades: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Entidad 1' }] as Catalogo[])),
      getColonia: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Colonia 1' }] as Catalogo[])),
      getmunicipio: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Municipio 1' }] as Catalogo[])),
      getLocalidad: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Localidad 1' }] as Catalogo[])),
      getInfo: jest.fn().mockReturnValue(of({
        calle: 'Avenida Reforma',
        numeroExterior: '123',
        numeroInterior: '',
        colonia: 'Centro',
        municipio: 'CDMX',
        estado: 'Ciudad de México',
        codigoPostal: '01000',
        telefona: '1234567890'
      }))
    };

    mockStore = {
      setEntidadFed: jest.fn(),
      setMunicipiosAlcaldia: jest.fn(),
      setColonia: jest.fn(),
      setLocalidad: jest.fn(),
      setPaisInput: jest.fn(),
      setNumeroInterior: jest.fn(),
      setCodigoPostal: jest.fn(),
      setTelefona: jest.fn()
    };

    mockQuery = {
      entidadFederativa$: of({ id: 1, descripcion: 'Entidad 1' } as Catalogo),
      colonia$: of({ id: 1, descripcion: 'Colonia 1' } as Catalogo),
      localidad$: of({ id: 1, descripcion: 'Localidad 1' } as Catalogo),
      municipio$: of({ id: 1, descripcion: 'Municipio 1' } as Catalogo),
      paisInput$: of('México' as any),
      numeroInterior$: of('101' as any),
      codigoPostal$: of('01000' as any),
      telefona$: of('1234567890' as any)
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, NotifDomicileComponent, TituloComponent, CatalogoSelectComponent],
      declarations: [],
      providers: [
        { provide: CancelacionesService, useValue: mockService },
        { provide: CancelacionesStore, useValue: mockStore },
        { provide: CancelacionesQuery, useValue: mockQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotifDomicileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct controls', () => {
    expect(component.notifDomicileForm.contains('entidadFederativa')).toBeTruthy();
    expect(component.notifDomicileForm.contains('domicilio')).toBeTruthy();
    expect(component.notifDomicileForm.contains('calle')).toBeTruthy();
    expect(component.notifDomicileForm.contains('numeroExterior')).toBeTruthy();
    expect(component.notifDomicileForm.contains('numeroInterior')).toBeTruthy();
    expect(component.notifDomicileForm.contains('codigoPostal')).toBeTruthy();
    expect(component.notifDomicileForm.contains('pais')).toBeTruthy();
    expect(component.notifDomicileForm.contains('municipioAlcaldia')).toBeTruthy();
    expect(component.notifDomicileForm.contains('colonia')).toBeTruthy();
    expect(component.notifDomicileForm.contains('telefona')).toBeTruthy();
    expect(component.notifDomicileForm.contains('localidad')).toBeTruthy();
  });

  it('should initialize form values from query observables', () => {
    expect(component.notifDomicileForm.get('entidadFederativa')?.value).toEqual({ id: 1, descripcion: 'Entidad 1' });
    expect(component.notifDomicileForm.get('colonia')?.value).toEqual({ id: 1, descripcion: 'Colonia 1' });
    expect(component.notifDomicileForm.get('localidad')?.value).toEqual({ id: 1, descripcion: 'Localidad 1' });
    expect(component.notifDomicileForm.get('municipioAlcaldia')?.value).toEqual({ id: 1, descripcion: 'Municipio 1' });
    expect(component.notifDomicileForm.get('pais')?.value).toBe('México');
    expect(component.notifDomicileForm.get('numeroInterior')?.value).toBe('101');
    expect(component.notifDomicileForm.get('codigoPostal')?.value).toBe('01000');
    expect(component.notifDomicileForm.get('telefona')?.value).toBe('1234567890');
  });

  it('should call loadInfo and update form values', () => {
    component.loadInfo();
    expect(mockService.getInfo).toHaveBeenCalled();
    expect(component.notifDomicileForm.get('calle')?.value).toBe('Avenida Reforma');
    expect(component.notifDomicileForm.get('numeroExterior')?.value).toBe('123');
  });

  it('should update store when getEntidad is called', () => {
    component.notifDomicileForm.get('entidadFederativa')?.setValue({ id: 1, descripcion: 'Entidad 1' });
    component.getEntidad();
    expect(mockStore.setEntidadFed).toHaveBeenCalledWith({ id: 1, descripcion: 'Entidad 1' });
  });

  it('should update store when getMunicipiosOalcaldia is called', () => {
    component.notifDomicileForm.get('municipioAlcaldia')?.setValue({ id: 1, descripcion: 'Municipio 1' });
    component.getMunicipiosOalcaldia();
    expect(mockStore.setMunicipiosAlcaldia).toHaveBeenCalledWith({ id: 1, descripcion: 'Municipio 1' });
  });

  it('should update store when getColonia is called', () => {
    component.notifDomicileForm.get('colonia')?.setValue({ id: 1, descripcion: 'Colonia 1' });
    component.getColonia();
    expect(mockStore.setColonia).toHaveBeenCalledWith({ id: 1, descripcion: 'Colonia 1' });
  });

  it('should update store when getLocalidad is called', () => {
    component.notifDomicileForm.get('localidad')?.setValue({ id: 1, descripcion: 'Localidad 1' });
    component.getLocalidad();
    expect(mockStore.setLocalidad).toHaveBeenCalledWith({ id: 1, descripcion: 'Localidad 1' });
  });

  it('should update store when updatePais is called', () => {
    component.notifDomicileForm.get('pais')?.setValue('México');
    component.updatePais();
    expect(mockStore.setPaisInput).toHaveBeenCalledWith('México');
  });

  it('should update store when updateNumeroInterior is called', () => {
    component.notifDomicileForm.get('numeroInterior')?.setValue('101');
    component.updateNumeroInterior();
    expect(mockStore.setNumeroInterior).toHaveBeenCalledWith('101');
  });

  it('should update store when updateCodigoPostal is called', () => {
    component.notifDomicileForm.get('codigoPostal')?.setValue('01000');
    component.updateCodigoPostal();
    expect(mockStore.setCodigoPostal).toHaveBeenCalledWith('01000');
  });

  it('should update store when updateTelefona is called', () => {
    component.notifDomicileForm.get('telefona')?.setValue('1234567890');
    component.updateTelefona();
    expect(mockStore.setTelefona).toHaveBeenCalledWith('1234567890');
  });

  it('should clean up subscriptions on destroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});