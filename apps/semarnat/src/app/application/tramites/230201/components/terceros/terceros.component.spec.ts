import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosComponent } from './terceros.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { Tramite230201Store } from '../../estados/tramite230201.store';
import { Tramite230201Query } from '../../estados/tramite230201.query';
import { CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { DestinatarioConfiguracionItem } from '../../enum/destinatario-tabla.enum';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TercerosComponent', () => {
  let component: TercerosComponent;
  let fixture: ComponentFixture<TercerosComponent>;
  let tramite230201StoreMock: any;
  let tramite230201QueryMock: any;
  let modalServiceMock: any;

  beforeEach(async () => {
    tramite230201StoreMock = {
      setEntidadFederativa: jest.fn(),
      setTercerosPopupState: jest.fn(),
      setDatosDestinatario: jest.fn(),
    };

    tramite230201QueryMock = {
      selectSolicitud$: of({
        entidadFederativa: 'MORELOS',
        destinatarios: [],
      }),
    };

    modalServiceMock = {
      show: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [TercerosComponent, ReactiveFormsModule, TablaDinamicaComponent, CatalogoSelectComponent, TituloComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Tramite230201Store, useValue: tramite230201StoreMock },
        { provide: Tramite230201Query, useValue: tramite230201QueryMock },
        { provide: BsModalService, useValue: modalServiceMock },
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
    expect(component.datosTabla).toEqual([]);
  });

  it('should handle changes in entidadFederativa and update the store', () => {
    component.ngOnInit();
    component.formularioDestinatario.get('entidadFederativa')?.setValue('MORELOS');
    component.manejarCambioEntidadFederativa();
  });

  it('should handle fila seleccionada and enable modificar button', () => {
    const mockRow: DestinatarioConfiguracionItem = {
      pais: 125,
      ciudad: 'Cuernavaca',
      domicilio: 'Calle 123',
      codigoPostal: 62000,
      nombre: 'John',
      apellidoPaterno: 'Doe',
      apellidoMaterno: '',
      razonSocial: '',
      paisStr: '',
    };

    component.manejarFilaSeleccionada([mockRow]);
    expect(component.botonModificarHabilitado).toBe(true);
  });

  it('should disable modificar button when no fila is seleccionada', () => {
    component.manejarFilaSeleccionada([]);
    expect(component.botonModificarHabilitado).toBe(false);
  });


  it('should close the popup and update the store', () => {
    component.cerrarPopup();
    expect(component.popupAbierto).toBeFalsy();
    expect(component.popupCerrado).toBeFalsy();
    expect(tramite230201StoreMock.setTercerosPopupState).toHaveBeenCalledWith(false);
  });


  it('should close the modal and reset the form', () => {
    component.modalRef = { hide: jest.fn() } as unknown as BsModalRef;
    component.cerrarModal();
    expect(component.modalRef.hide).toHaveBeenCalled();
    expect(component.agregarMercanciasForm.pristine).toBe(true);
  });


  it('should save destinatario data and update the store', () => {
    component.agregarMercanciasForm = new FormBuilder().group({
      pais: ['125'],
      ciudad: ['Cuernavaca'],
      domicilio: ['Calle 123'],
      codigoPostal: ['62000'],
      nombre: ['John'],
      apellidoPaterno: ['Doe'],
      apellidoMaterno: [''],
      razonSocial: [''],
    });

    component.guardarDestinatario();

    expect(component.datosTabla.length).toBe(1);
    expect(tramite230201StoreMock.setDatosDestinatario).toHaveBeenCalledWith(component.datosTabla);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['notificadorDestruccion$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['notificadorDestruccion$'], 'complete');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});