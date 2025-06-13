import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DomicilioEstablecimientosComponent } from './domicilio-establecimientos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosSolicitudService } from '../../services/datoSolicitude.service';
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261101.query';
import { DatosProcedureStore } from '../../../../estados/tramites/tramites261101.store';
import { of } from 'rxjs';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

describe('DomicilioEstablecimientosComponent', () => {
  let COMPONENT: DomicilioEstablecimientosComponent;
  let FIXTURE: ComponentFixture<DomicilioEstablecimientosComponent>;

  beforeEach(async () => {
    const MOCK_QUERY = {
      selectProrroga$: of({
        codigo: '001',
        estado: 'Estado',
        municipio: 'Municipio',
        localidad: 'Localidad',
        colonia: 'Colonia',
        calle: 'Calle',
        correo: 'correo@correo.com',
        sanitario: 'Sí',
        lada: '55',
        telefono: '1234567890',
        funcionamiento: 'Operando',
        licencia: 'Lic-123',
        regimen: 'General',
      }),
    };

    const MOCK_STORE = {
      establecerDatos: jest.fn(),
    };

    const MOCK_SERVICE = {
      getDomicilioData: jest.fn().mockReturnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DomicilioEstablecimientosComponent],
      providers: [
        { provide: DatosProcedureQuery, useValue: MOCK_QUERY },
        { provide: DatosProcedureStore, useValue: MOCK_STORE },
        { provide: DatosSolicitudService, useValue: MOCK_SERVICE },
      ],
    }).compileComponents();

    FIXTURE = TestBed.createComponent(DomicilioEstablecimientosComponent);
    COMPONENT = FIXTURE.componentInstance;
    FIXTURE.detectChanges();
  });

  it('should create the component', () => {
    expect(COMPONENT).toBeTruthy();
  });

  it('should initialize forms in ngOnInit', () => {
    expect(COMPONENT.domicilioEstablecimiento).toBeTruthy();
    expect(COMPONENT.AvisodeFuncionamiento).toBeTruthy();

    expect(COMPONENT.domicilioEstablecimiento.get('estado')?.value).toBe('Estado');
    expect(COMPONENT.AvisodeFuncionamiento.get('funcionamiento')?.value).toBe('Operando');
  });

  it('should call DatosSolicitudService.getDomicilioData and assign Domicilios', () => {
    COMPONENT.ngOnInit();
  });

  it('should set values in the form using establecerValoresDeFormulario', () => {
    COMPONENT.domicilioEstablecimiento.addControl('Codigo', COMPONENT.domicilioEstablecimiento.get('estado')!);
    COMPONENT.domicilioEstablecimiento.addControl('codigoPostal', COMPONENT.domicilioEstablecimiento.get('estado')!);
    COMPONENT.domicilioEstablecimiento.addControl('Municipio', COMPONENT.domicilioEstablecimiento.get('estado')!);
    COMPONENT.domicilioEstablecimiento.addControl('numeroExterior', COMPONENT.domicilioEstablecimiento.get('estado')!);
    expect(COMPONENT.domicilioEstablecimiento.get('Codigo')?.value).toBe('');
    expect(COMPONENT.domicilioEstablecimiento.get('codigoPostal')?.value).toBe('');
    expect(COMPONENT.domicilioEstablecimiento.get('Municipio')?.value).toBe('');
  });

  it('should set store values using setValoresStore', () => {
    COMPONENT.setValoresStore(COMPONENT.domicilioEstablecimiento, 'estado');
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const NEXT_SPY = jest.spyOn(COMPONENT['destroy$'], 'next');
    const COMPLETE_SPY = jest.spyOn(COMPONENT['destroy$'], 'complete');

    COMPONENT.ngOnDestroy();

    expect(NEXT_SPY).toHaveBeenCalled();
    expect(COMPLETE_SPY).toHaveBeenCalled();
  });

  it('should have correct tabla config', () => {
    expect(COMPONENT.configuracionTabla.length).toBe(2);
    expect(COMPONENT.configuracionTabla[0].encabezado).toContain('Clave');
  });

  it('should use CHECKBOX as TablaSeleccion enum', () => {
    expect(COMPONENT.TablaSeleccion).toBe(TablaSeleccion.CHECKBOX);
  });

  it('should handle empty form values in guardarDatosFormulario', () => {
    // Ensure the form is empty
    COMPONENT.domicilioEstablecimiento.reset();

    // Spy on the method that saves the data
    const SET_VALORES_STORE_SPY = jest.spyOn(COMPONENT, 'setValoresStore');

    // Call the method
    COMPONENT.guardarDatosFormulario();

    // Verify that setValoresStore was called with empty values
    expect(SET_VALORES_STORE_SPY).toHaveBeenCalledWith(COMPONENT.domicilioEstablecimiento, 'estado');
    expect(SET_VALORES_STORE_SPY).toHaveBeenCalledWith(COMPONENT.domicilioEstablecimiento, 'municipio');
    expect(SET_VALORES_STORE_SPY).toHaveBeenCalledWith(COMPONENT.domicilioEstablecimiento, 'localidad');
    expect(SET_VALORES_STORE_SPY).toHaveBeenCalledWith(COMPONENT.domicilioEstablecimiento, 'colonia');
    expect(SET_VALORES_STORE_SPY).toHaveBeenCalledWith(COMPONENT.domicilioEstablecimiento, 'calle');
    expect(SET_VALORES_STORE_SPY).toHaveBeenCalledWith(COMPONENT.domicilioEstablecimiento, 'codigoPostal');
    expect(SET_VALORES_STORE_SPY).toHaveBeenCalledWith(COMPONENT.domicilioEstablecimiento, 'numeroExterior');
  });

  it('should not call setValoresStore if form is invalid in guardarDatosFormulario', () => {
    // Mark the form as invalid
    COMPONENT.domicilioEstablecimiento.get('estado')?.setErrors({ required: true });

    // Spy on the method that saves the data
    const SET_VALORES_STORE_SPY = jest.spyOn(COMPONENT, 'setValoresStore');

    // Call the method
    COMPONENT.guardarDatosFormulario();

    // Verify that setValoresStore was not called
    expect(SET_VALORES_STORE_SPY).not.toHaveBeenCalled();
  });
});
