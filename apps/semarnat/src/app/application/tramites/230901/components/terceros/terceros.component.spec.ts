import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosComponent } from './terceros.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { AutorizacionesDeVidaSilvestreService } from '../../services/autorizaciones-de-vida-silvestre.service';
import { Tramite230901Store } from '../../estados/store/tramite230901.store';
import { Tramite230901Query } from '../../estados/query/tramite230901.query';
import { CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { DestinatarioConfiguracionItem } from '../../enum/destinatario-tabla.enum';

describe('TercerosComponent', () => {
  let component: TercerosComponent;
  let fixture: ComponentFixture<TercerosComponent>;
  let tramite230901StoreMock: any;
  let tramite230901QueryMock: any;
  let autorizacionesDeVidaSilvestreServiceMock: any;

  beforeEach(async () => {
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
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and tablaDatos on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formularioDestinatario).toBeDefined();
    expect(component.formularioDestinatario.get('entidadFederativa')?.value).toBe('MORELOS');
    expect(component.datosTabla).toEqual([{ pais: 'MEXICO (ESTADOS UNIDOS MEXICANOS)', ciudad: '---', entidadFederativa: 'MORELOS', domicilio: 'prueba', codigoPostal: 96533 }]);
  });

  it('should call inicializaTercerosDatosCatalogos on ngOnInit', () => {
    component.ngOnInit();
    expect(autorizacionesDeVidaSilvestreServiceMock.inicializaTercerosDatosCatalogos).toHaveBeenCalled();
  });

  it('should handle changes in entidadFederativa and update the store', () => {
    component.ngOnInit();
    component.formularioDestinatario.get('entidadFederativa')?.setValue('MORELOS');
    component.manejarCambioEntidadFederativa();
    expect(tramite230901StoreMock.setEntidadFederativa).toHaveBeenCalledWith('MORELOS');
    expect(component.datosTabla.length).toBe(1);
  });

  it('should not add duplicate entries to tablaDatos', () => {
    component.ngOnInit();
    component.formularioDestinatario.get('entidadFederativa')?.setValue('MORELOS');
    component.manejarCambioEntidadFederativa();
    component.manejarCambioEntidadFederativa();
    expect(component.datosTabla.length).toBe(1);
  });

  it('should handle fila seleccionada and enable modificar button', () => {
    const mockRow: DestinatarioConfiguracionItem = {
      pais: 'MEXICO',
      ciudad: 'Cuernavaca',
      entidadFederativa: 'MORELOS',
      domicilio: 'Calle 123',
      codigoPostal: 62000,
    };
    component.manejarFilaSeleccionada([mockRow]);
    expect(component.botonModificarHabilitado).toBe(true);
  });

  it('should disable modificar button when no fila is seleccionada', () => {
    component.manejarFilaSeleccionada([]);
    expect(component.botonModificarHabilitado).toBe(false);
  });

  it('should open the popup and update the store', () => {
    component.abrirPopup();
    expect(component.popupAbierto).toBe(true);
    expect(tramite230901StoreMock.setTercerosPopupState).toHaveBeenCalledWith(true);
  });

  it('should close the popup and update the store', () => {
    component.cerrarPopup();
    expect(component.popupAbierto).toBeFalsy();
    expect(component.popupCerrado).toBeFalsy();
    expect(tramite230901StoreMock.setTercerosPopupState).toHaveBeenCalledWith(false);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['notificadorDestruccion$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['notificadorDestruccion$'], 'complete');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});