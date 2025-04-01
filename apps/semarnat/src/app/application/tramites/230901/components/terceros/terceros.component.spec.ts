import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosComponent } from './terceros.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AutorizacionesDeVidaSilvestreService } from '../../services/autorizaciones-de-vida-silvestre.service';
import { Tramite230901Store } from '../../estados/store/tramite230901.store';
import { Tramite230901Query } from '../../estados/query/tramite230901.query';
import { CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';

describe('TercerosComponent', () => {
  let component: TercerosComponent;
  let fixture: ComponentFixture<TercerosComponent>;
  let tramite230901StoreMock: any;
  let tramite230901QueryMock: any;
  let autorizacionesDeVidaSilvestreServiceMock: any;

  beforeEach(async () => {
    // Mock dependencies
    tramite230901StoreMock = {
      setEntidadFederativa: jest.fn(),
      setTercerosPopupState: jest.fn(),
    };

    tramite230901QueryMock = {
      selectSolicitud$: of({
        entidadFederativa: 'MORELOS',
      }),
    };

    autorizacionesDeVidaSilvestreServiceMock = {
      inicializaTercerosDatosCatalogos: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [TercerosComponent],
      imports: [ReactiveFormsModule, TablaDinamicaComponent, CatalogoSelectComponent, TituloComponent],
      providers: [
        { provide: Tramite230901Store, useValue: tramite230901StoreMock },
        { provide: Tramite230901Query, useValue: tramite230901QueryMock },
        { provide: AutorizacionesDeVidaSilvestreService, useValue: autorizacionesDeVidaSilvestreServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.destinatarioForm).toBeDefined();
    expect(component.destinatarioForm.get('entidadFederativa')?.value).toBe('MORELOS');
  });

  it('should call inicializaTercerosDatosCatalogos on ngOnInit', () => {
    component.ngOnInit();
    expect(autorizacionesDeVidaSilvestreServiceMock.inicializaTercerosDatosCatalogos).toHaveBeenCalled();
  });

  it('should handle changes in entidadFederativa and update the store', () => {
    component.ngOnInit();
    component.destinatarioForm.get('entidadFederativa')?.setValue('MORELOS');
    component.onEntidadFederativaChange();
    expect(tramite230901StoreMock.setEntidadFederativa).toHaveBeenCalledWith('MORELOS');
    expect(component.tablaDatos.length).toBe(1);
  });

  it('should not add duplicate entries to tablaDatos', () => {
    component.ngOnInit();
    component.destinatarioForm.get('entidadFederativa')?.setValue('MORELOS');
    component.onEntidadFederativaChange();
    component.onEntidadFederativaChange(); // Call again to simulate duplicate addition
    expect(component.tablaDatos.length).toBe(1); // Should still be 1
  });

  it('should open the popup and update the store', () => {
    component.openPopup();
    expect(component.isPopupOpen).toBe(true);
    expect(tramite230901StoreMock.setTercerosPopupState).toHaveBeenCalledWith(true);
  });

  it('should close the popup and update the store', () => {
    component.closePopup();
    expect(component.isPopupOpen).toBeFalsy();
    expect(component.isPopupClose).toBeFalsy();
    expect(tramite230901StoreMock.setTercerosPopupState).toHaveBeenCalledWith(false);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});
