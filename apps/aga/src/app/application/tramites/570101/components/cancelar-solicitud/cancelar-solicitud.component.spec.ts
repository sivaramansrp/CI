import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelarSolicitudComponent } from './cancelar-solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CancelarSolicitudStore } from '../../estados/tramite570101.store';
import { CatalogoSelectComponent, FechasService, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { CancelarSolicitudService } from '../../service/cancelar-solicitud.service';
import { CancelarSolicitudQuery } from '../../estados/tramite570101.query';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CancelarSolicitudComponent', () => {
  let component: CancelarSolicitudComponent;
  let fixture: ComponentFixture<CancelarSolicitudComponent>;
  let cancelarSolicitudServiceMock: any;
  let cancelarSolicitudStoreMock: any;
  let cancelarSolicitudQueryMock: any;
  let fechaServiceMock: any;
  let validacionesServiceMock: any;

  beforeEach(async () => {
    // Mock Services
    cancelarSolicitudServiceMock = {
      getCancelarSolicitud: jest.fn().mockReturnValue(of({
        folioSVEX: '1234',
        folioVUCEM: '5678',
        tipoDeCancelacion: '1',
        horaInicio: '',
        horaFin: '',
        descripcion: '',
        fechasSeleccionadas: { selectedFechas: [] }
      }))
    };

    cancelarSolicitudStoreMock = {
      setTipoSolicitudSeleccion: jest.fn(),
      setFechasSeleccionadas: jest.fn(),
      setDescripcion: jest.fn()
    };

    cancelarSolicitudQueryMock = {
      selectCancelarSolicitud$: of({
        folioSVEX: '1234',
        folioVUCEM: '5678',
        tipoDeCancelacion: '1',
        horaInicio: '',
        horaFin: '',
        descripcion: '',
        fechasSeleccionadas: { selectedFechas: [] }
      })
    };

    fechaServiceMock = {
      obtenerDiasEntreFechas: jest.fn().mockReturnValue(['01-03-2025', '02-03-2025', '03-03-2025'])
    };

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true)
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CatalogoSelectComponent],
      declarations: [CancelarSolicitudComponent],
      providers: [
        FormBuilder,
        { provide: CancelarSolicitudStore, useValue: cancelarSolicitudStoreMock },
        { provide: FechasService, useValue: fechaServiceMock },
        { provide: CancelarSolicitudService, useValue: cancelarSolicitudServiceMock },
        { provide: CancelarSolicitudQuery, useValue: cancelarSolicitudQueryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values from state', () => {
    expect(component.formCancelorSolicitud.value).toEqual({
      folioSVEX: '1234',
      folioVUCEM: '5678',
      tipoDeCancelacion: '1',
      horaInicio: '',
      horaFin: '',
      descripcion: '',
      fechasSeleccionadas: { selectedFechas: [] }
    });
  });

  it('should call getCancelarSolicitud on init and patch values', () => {
    expect(cancelarSolicitudServiceMock.getCancelarSolicitud).toHaveBeenCalled();
    expect(component.formCancelorSolicitud.get('folioSVEX')?.value).toBe('1234');
  });

  it('should update esSeleccionadaTipoParcial when tipoDeCancelacion changes', () => {
    component.formCancelorSolicitud.get('tipoDeCancelacion')?.setValue('2');
    component.tipoSolicitudSeleccion();
    expect(component.esSeleccionadaTipoParcial).toBe(true);
  });

  it('should call store when setting tipo de cancelacion', () => {
    component.tipoSolicitudSeleccion();
    expect(cancelarSolicitudStoreMock.setTipoSolicitudSeleccion).toHaveBeenCalledWith('1');
  });

  it('should call store when updating selected fechas', () => {
    component.onFechasSeleccionadasChange(['02-03-2025']);
    expect(cancelarSolicitudStoreMock.setFechasSeleccionadas).toHaveBeenCalledWith(['02-03-2025']);
  });

  it('should call store when updating descripcion', () => {
    component.formCancelorSolicitud.get('descripcion')?.setValue('Test description');
    component.onDescripcionChange();
    expect(cancelarSolicitudStoreMock.setDescripcion).toHaveBeenCalledWith('Test description');
  });

  it('should return valid status for a form field', () => {
    expect(component.isValid(component.formCancelorSolicitud, 'descripcion')).toBe(true);
    expect(validacionesServiceMock.isValid).toHaveBeenCalledWith(component.formCancelorSolicitud, 'descripcion');
  });

  it('should clean up subscriptions on destroy', () => {
    const spy = jest.spyOn(component.destroyNotifier$, 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

});
