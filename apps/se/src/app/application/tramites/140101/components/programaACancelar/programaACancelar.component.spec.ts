import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramaACancelarComponent } from './programaACancelar.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { ProgramaACancelarService } from '../../services/programACancelar.service';
import { Tramite140101Store } from '../../../../estados/tramites/tramite140101.store';
import { Tramite140101Query } from '../../../../estados/queries/tramite140101.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src/core/services/shared/validaciones-formulario/validaciones-formulario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProgramaACancelarComponent', () => {
  let component: ProgramaACancelarComponent;
  let fixture: ComponentFixture<ProgramaACancelarComponent>;
  let mockProgramaACancelarService: any;
  let mockTramite140101Store: any;
  let mockTramite140101Query: any;
  let mockFormValidator: any;

  beforeEach(async () => {
    mockProgramaACancelarService = {
      obtenerDatos: jest.fn().mockReturnValue(of([
        { folioPrograma: 'FOL123', idProgramaSeleccionado: 1, modalidad: 'MOD', representacionFederal: 'REP', tipoPrograma: 'TIPO', estatus: 'ACTIVO' }
      ]))
    };
    mockTramite140101Store = {
      setDatosData: jest.fn(),
      setPrograma: jest.fn(),
      setRadioSelection: jest.fn()
    };
    mockTramite140101Query = {
      selectSolicitud$: of({
        programaACancelar: {
          folioPrograma: 'FOL123',
          idProgramaSeleccionado: 1,
          modalidad: 'MOD',
          representacionFederal: 'REP',
          tipoPrograma: 'TIPO',
          estatus: 'ACTIVO'
        },
        solicitudObservaciones: 'Obs',
        confirmar: true,
        radio: 0,
        datos: [
          { folioPrograma: 'FOL123', idProgramaSeleccionado: 1, modalidad: 'MOD', representacionFederal: 'REP', tipoPrograma: 'TIPO', estatus: 'ACTIVO' }
        ]
      })
    };
    mockFormValidator = {
      isValid: jest.fn().mockReturnValue(true)
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ProgramaACancelarComponent, HttpClientTestingModule],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: ProgramaACancelarService, useValue: mockProgramaACancelarService },
        { provide: Tramite140101Store, useValue: mockTramite140101Store },
        { provide: Tramite140101Query, useValue: mockTramite140101Query },
        { provide: ValidacionesFormularioService, useValue: mockFormValidator }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramaACancelarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario con los valores correctos', () => {
    expect(component.programaForm.value).toMatchObject({
      idProgramaSeleccionado: 1,
      solicitudObservaciones: 'Obs',
      confirmar: true
    });
  });

  it('debe actualizar el formulario y el store al llamar valorDeAlternancia', () => {
    const row = { folioPrograma: 'FOL999', idProgramaSeleccionado: '2', modalidad: 'MOD2', representacionFederal: 'REP2', tipoPrograma: 'TIPO2', estatus: 'INACTIVO' };
    component.datosTabla = [row];
    component.valorDeAlternancia(row);
    expect(mockTramite140101Store.setPrograma).toHaveBeenCalledWith(row);
    expect(component.programaForm.get('folioPrograma')?.value).toBe('FOL999');
  });

  it('debe deshabilitar el formulario si soloLectura es true', () => {
    component.soloLectura = true;
    component.inicializarFormulario();
    expect(component.programaForm.disabled).toBe(true);
  });

  it('debe llamar a formValidator.isValid en isValid()', () => {
    const result = component.isValid('folioPrograma');
    expect(mockFormValidator.isValid).toHaveBeenCalledWith(component.programaForm, 'folioPrograma');
    expect(result).toBe(true);
  });

  it('debe limpiar las suscripciones al destruir el componente', () => {
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});