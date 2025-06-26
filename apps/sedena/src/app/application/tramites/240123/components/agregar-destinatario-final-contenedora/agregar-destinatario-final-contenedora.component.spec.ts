import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarDestinatarioFinalContenedoraComponent } from './agregar-destinatario-final-contenedora.component';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { Tramite240123Store } from '../../estados/tramite240123Store.store';
import { Tramite240123Query } from '../../estados/tramite240123Query.query';
import { CatalogoSelectComponent, InputRadioComponent } from '@ng-mf/data-access-user';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';

describe('AgregarDestinatarioFinalContenedoraComponent', () => {
  let component: AgregarDestinatarioFinalContenedoraComponent;
  let fixture: ComponentFixture<AgregarDestinatarioFinalContenedoraComponent>;
  let datosSolicitudServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;
  let locationMock: any;

  beforeEach(async () => {
    datosSolicitudServiceMock = {
      obtenerListaCodigosPostales: jest.fn().mockReturnValue(of([{ id: 1, nombre: '1000' }])),
      obtenerListaPaises: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'México' }])),
      obtenerListaEstados: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'CDMX' }])),
      obtenerListaMunicipios: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Benito Juárez' }])),
      obtenerListaLocalidades: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Centro' }])),
      obtenerListaColonias: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Roma' }])),
    };

    tramiteStoreMock = {
      updateDestinatarioFinalTablaDatos: jest.fn(),
    };

    tramiteQueryMock = {};

    locationMock = {
      back: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        AgregarDestinatarioFinalContenedoraComponent,
        ReactiveFormsModule,
        CatalogoSelectComponent,
        InputRadioComponent,
      ],
      providers: [
        { provide: DatosSolicitudService, useValue: datosSolicitudServiceMock },
        { provide: Tramite240123Store, useValue: tramiteStoreMock },
        { provide: Tramite240123Query, useValue: tramiteQueryMock },
        { provide: Location, useValue: locationMock },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarDestinatarioFinalContenedoraComponent);
    component = fixture.componentInstance;
    component.cerrar = new EventEmitter<void>();
    jest.spyOn(component.cerrar, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and load data', () => {
    expect(component.agregarDestinatarioFinal).toBeDefined();
    expect(datosSolicitudServiceMock.obtenerListaPaises).toHaveBeenCalled();
    expect(component.paisesDatos.length).toBeGreaterThan(0);
  });

  it('should update validators based on campoObligatorio = true', () => {
    component.campoObligatorio = true;
    component.campoObligatorioChange();
    expect(component.agregarDestinatarioFinal.get('colonia')?.validator).toBeNull();
  });

  it('should update validators based on campoObligatorio = false', () => {
    component.campoObligatorio = false;
    component.campoObligatorioChange();
    expect(component.agregarDestinatarioFinal.get('calle')?.validator).toBeNull();
  });

  it('should handle tipoPersona value change', () => {
    component.tipoPersonaCambioDeValor('Física');
    expect(component.agregarDestinatarioFinal.get('tipoPersona')?.value).toBe('Física');
  });

  it('should handle nacionalidad value change', () => {
    component.terecerosNacionalidadCambioDeValor('Mexicana');
    expect(component.agregarDestinatarioFinal.get('nacionalidad')?.value).toBe('Mexicana');
  });

  it('should clear the form properly', () => {
    component.limpiarFormulario();
    expect(component.agregarDestinatarioFinal.value).toEqual(expect.objectContaining({
      tipoPersona: null,
      nacionalidad: null
    }));
  });

  it('should cancel and emit cerrar', () => {
    component.cancelar();
    expect(component.cerrar.emit).toHaveBeenCalled();
  });

  it('should save destinatario and emit cerrar', () => {
    component.agregarDestinatarioFinal.patchValue({
      nombres: 'Luis',
      primerApellido: 'Martínez',
      denominacionRazon: 'S.A.',
      segundoApellido: 'Gómez',
      rfc: 'LUMG910101XXX',
      curp: 'LUMG910101HDFRRL09',
      lada: '55',
      telefono: '12345678',
      correoElectronico: 'luis@example.com',
      calle: 'Insurgentes',
      numeroExterior: '10',
      numeroInterior: '',
      colonia: 'Roma',
      municipio: 'Benito Juárez',
      localidad: 'Centro',
      estado: 'CDMX',
      codigoPostal: '12345',
      pais: 'México',
    });

    component.guardarDestinatario();

    expect(component.destinatarios.length).toBe(1);
    expect(tramiteStoreMock.updateDestinatarioFinalTablaDatos).toHaveBeenCalledWith(component.destinatarios);
    expect(component.cerrar.emit).toHaveBeenCalled();
  });

  it('should update destinatario list in store', () => {
    const lista = [{ nombreRazonSocial: 'A', pais: 'MX' }];
    component.updateDestinatarioFinalTablaDatos(lista as any);
    expect(tramiteStoreMock.updateDestinatarioFinalTablaDatos).toHaveBeenCalledWith(lista);
  });

  it('should unsubscribe on destroy', () => {
    const nextSpy = jest.spyOn(component['unsubscribe$'], 'next');
    const completeSpy = jest.spyOn(component['unsubscribe$'], 'complete');
    component.ngOnDestroy?.();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
