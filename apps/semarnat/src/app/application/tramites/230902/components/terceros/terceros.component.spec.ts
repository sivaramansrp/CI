import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TercerosComponent } from './terceros.component';
import { PermisoCitesService } from '../../services/permiso-cites.service';
import { Tramite230902Store } from '../../estados/tramite230902.store';
import { Tramite230902Query } from '../../estados/tramite230902.query';
import { of } from 'rxjs';

describe('TercerosComponent', () => {
  let component: TercerosComponent;
  let fixture: ComponentFixture<TercerosComponent>;
  let permisoCitesServiceMock: any;
  let tramite230902StoreMock: any;
  let tramite230902QueryMock: any;

  beforeEach(async () => {
    permisoCitesServiceMock = {
      inicializaTercerosDatosCatalogos: jest.fn()
    };

    tramite230902StoreMock = {
      setIsPopupOpen: jest.fn(),
      setIsPopupClose: jest.fn(),
      setEntidadFederativa: jest.fn()
    };

    tramite230902QueryMock = {
      selectSolicitud$: of({
        entidadFederativa: 'Entidad1'
      })
    };

    await TestBed.configureTestingModule({
      declarations: [ TercerosComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: PermisoCitesService, useValue: permisoCitesServiceMock },
        { provide: Tramite230902Store, useValue: tramite230902StoreMock },
        { provide: Tramite230902Query, useValue: tramite230902QueryMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TercerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.ngOnInit();
    expect(component.destinatarioForm).toBeDefined();
    expect(component.destinatarioForm.get('entidadFederativa')?.value).toBe('Entidad1');
  });

  it('should open the popup', () => {
    component.openPopup();
    expect(component.isPopupOpen).toBe(true);
    expect(tramite230902StoreMock.setIsPopupOpen).toHaveBeenCalledWith(true);
  });

  it('should close the popup', () => {
    component.closePopup();
    expect(component.isPopupOpen).toBeFalsy();
    expect(component.isPopupClose).toBeFalsy();
    expect(tramite230902StoreMock.setIsPopupOpen).toHaveBeenCalledWith(false);
    expect(tramite230902StoreMock.setIsPopupClose).toHaveBeenCalledWith(false);
  });

  it('should handle entidad federativa change', () => {
    component.createDestinatarioForm();
    component.onEntidadFederativaChange();
    expect(tramite230902StoreMock.setEntidadFederativa).toHaveBeenCalledWith('Entidad1');
    expect(component.tablaDatos.length).toBe(1);
  });

  it('should destroy subscriptions on component destroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should call inicializaTercerosDatosCatalogos on init', () => {
    component.ngOnInit();
    expect(permisoCitesServiceMock.inicializaTercerosDatosCatalogos).toHaveBeenCalled();
  });

  it('should update solicitud230902State on subscription', () => {
    component.ngOnInit();
    expect(component.solicitud230902State).toEqual({ entidadFederativa: 'Entidad1' });
  });
});