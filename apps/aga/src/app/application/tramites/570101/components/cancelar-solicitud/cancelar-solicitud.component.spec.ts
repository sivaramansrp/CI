/* eslint-disable dot-notation */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelarSolicitudComponent } from './cancelar-solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CancelarSolicitudStore } from '../../estados/tramite570101.store';
import { CatalogoSelectComponent, FechasService, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { CancelarSolicitudService } from '../../service/cancelar-solicitud.service';
import { CancelarSolicitudQuery } from '../../estados/tramite570101.query';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CancelarSolicitudForm } from '../../modelos/cancelar-solicitud.modalidad.model';

describe('CancelarSolicitudComponent', () => {
  let component: CancelarSolicitudComponent;
  let fixture: ComponentFixture<CancelarSolicitudComponent>;
  let cancelarSolicitudServiceMock: any;
  let cancelarSolicitudStoreMock: any;
  let cancelarSolicitudQueryMock: any;
  let cancelarSolicitudFormState: CancelarSolicitudForm;
  let fechaServiceMock: any;
  let validacionesServiceMock: any;

  beforeEach(async () => {
    // Mock Services
    cancelarSolicitudServiceMock = {
      getCancelarSolicitud: jest.fn().mockReturnValue(of({
        folioSVEX: "SVEX470000012025",
        folioVUCEM: "01057001000120252470000002",
        tipoDeCancelacion: "",
        horaInicio: "06:00",
        horaFin: "23:00",
        descripcion: "",
        fechasSeleccionadas: {
            selectedFechas: [] 
        }
      })),
      getSelectRangoDias: jest.fn().mockReturnValue(of(['2023-01-01', '2023-01-02'])),
      getTipoSolicitud: jest.fn().mockReturnValue(
        of([{ modalidad: 'Total' }, { modalidad: 'Parcial' }])
      )
    };

    cancelarSolicitudStoreMock = {
      setTipoDeCancelacion: jest.fn(),
      setFechasSeleccionadas: jest.fn(),
      setDescripcion: jest.fn()
    };

    cancelarSolicitudFormState = {
      folioSVEX: "SVEX470000012025",
      folioVUCEM: "01057001000120252470000002",
      tipoDeCancelacion: "",
      horaInicio: "06:00",
      horaFin: "23:00",
      descripcion: "",
      fechasSeleccionadas: {
          selectedFechas: [] 
      }
    }
    
    cancelarSolicitudQueryMock = {
      selectCancelarSolicitud$: of({
        folioSVEX: "SVEX470000012025",
        folioVUCEM: "01057001000120252470000002",
        tipoDeCancelacion: "",
        horaInicio: "06:00",
        horaFin: "23:00",
        descripcion: "",
        fechasSeleccionadas: {
            selectedFechas: [] 
        }
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
    expect(component.formCancelorSolicitud).toBeDefined();
    expect(component.formCancelorSolicitud.get('folioSVEX')?.value).toBe('SVEX470000012025');
    expect(component.formCancelorSolicitud.get('folioVUCEM')?.value).toBe('01057001000120252470000002');
    expect(component.formCancelorSolicitud.get('tipoDeCancelacion')?.value).toBe('');
    expect(component.formCancelorSolicitud.get('horaInicio')?.value).toBe('06:00');
    expect(component.formCancelorSolicitud.get('horaFin')?.value).toBe('23:00');
    expect(component.formCancelorSolicitud.get('descripcion')?.value).toBe('');
    expect(component.formCancelorSolicitud.get('fechasSeleccionadas.selectedFechas')?.value).toStrictEqual([]);
  });

  it('should call getCancelarSolicitud on init and patch values', () => {
    expect(cancelarSolicitudServiceMock.getCancelarSolicitud).toHaveBeenCalled();
    expect(component.formCancelorSolicitud.get('folioSVEX')?.value).toBe('SVEX470000012025');
  });

  it('should update esSeleccionadaTipoParcial when tipoDeCancelacion changes', () => {
    component.formCancelorSolicitud.get('tipoDeCancelacion')?.setValue('2');
    component.tipoSolicitudSeleccion();
    expect(component.esSeleccionadaTipoParcial).toBe(true);
  });

  it('should set esSeleccionadaTipoParcial and call store when tipoDeCancelacion is set', () => {
    component.formCancelorSolicitud.patchValue({ tipoDeCancelacion: '2' });
    component.tipoSolicitudSeleccion();
    expect(component.esSeleccionadaTipoParcial).toBe(true);
    expect(cancelarSolicitudStoreMock.setTipoDeCancelacion).toHaveBeenCalledWith(cancelarSolicitudFormState,'2');
  });
  
  it('should set esSeleccionadaTipoParcial to false for a non-parcial tipoDeCancelacion', () => {
    component.formCancelorSolicitud.patchValue({ tipoDeCancelacion: '1' });
    component.tipoSolicitudSeleccion();
    expect(component.esSeleccionadaTipoParcial).toBe(false);
    expect(cancelarSolicitudStoreMock.setTipoDeCancelacion).toHaveBeenCalledWith(cancelarSolicitudFormState,'1');
  });

  it('should call store when updating selected fechas', () => {
    component.onFechasSeleccionadasChange(['02-03-2025']);
    expect(cancelarSolicitudStoreMock.setFechasSeleccionadas).toHaveBeenCalledWith(cancelarSolicitudFormState, ['02-03-2025']);
  });

  it('should call store when updating descripcion', () => {
    component.formCancelorSolicitud.get('descripcion')?.setValue('Test description');
    component.onDescripcionChange();
    expect(cancelarSolicitudStoreMock.setDescripcion).toHaveBeenCalledWith(cancelarSolicitudFormState,'Test description', );
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

  it('should fetch and populate selectRangoDias', () => {
    expect(cancelarSolicitudServiceMock.getSelectRangoDias).toHaveBeenCalled();
    expect(component.selectRangoDias).toEqual(['2023-01-01', '2023-01-02']);
  });

  it('should fetch and populate tipoSolicitud', () => {
    expect(cancelarSolicitudServiceMock.getTipoSolicitud).toHaveBeenCalled();
    expect(component.tipoSolicitud).toEqual([{ modalidad: 'Total' }, { modalidad: 'Parcial' }]);
  });
});
