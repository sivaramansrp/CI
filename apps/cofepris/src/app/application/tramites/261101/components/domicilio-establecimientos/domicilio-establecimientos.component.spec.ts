import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DomicilioEstablecimientosComponent } from './domicilio-establecimientos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosSolicitudService } from '../../services/datoSolicitude.service';
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261101.query';
import { DatosProcedureStore } from '../../../../estados/tramites/tramites261101.store';
import { of } from 'rxjs';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

describe('DomicilioEstablecimientosComponent', () => {
  let component: DomicilioEstablecimientosComponent;
  let fixture: ComponentFixture<DomicilioEstablecimientosComponent>;

  beforeEach(async () => {
    const mockQuery = {
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

    const mockStore = {
      establecerDatos: jest.fn(),
    };

    const mockService = {
      getDomicilioData: jest.fn().mockReturnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DomicilioEstablecimientosComponent],
      providers: [
        { provide: DatosProcedureQuery, useValue: mockQuery },
        { provide: DatosProcedureStore, useValue: mockStore },
        { provide: DatosSolicitudService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilioEstablecimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms in ngOnInit', () => {
    expect(component.domicilioEstablecimiento).toBeTruthy();
    expect(component.AvisodeFuncionamiento).toBeTruthy();

    expect(component.domicilioEstablecimiento.get('estado')?.value).toBe('Estado');
    expect(component.AvisodeFuncionamiento.get('funcionamiento')?.value).toBe('Operando');
  });

  it('should call DatosSolicitudService.getDomicilioData and assign Domicilios', () => {
    component.ngOnInit();
  });

  it('should set values in the form using establecerValoresDeFormulario', () => {
    component.domicilioEstablecimiento.addControl('Codigo', component.domicilioEstablecimiento.get('estado')!);
    component.domicilioEstablecimiento.addControl('codigoPostal', component.domicilioEstablecimiento.get('estado')!);
    component.domicilioEstablecimiento.addControl('Municipio', component.domicilioEstablecimiento.get('estado')!);
    component.domicilioEstablecimiento.addControl('numeroExterior', component.domicilioEstablecimiento.get('estado')!);
    expect(component.domicilioEstablecimiento.get('Codigo')?.value).toBe('');
    expect(component.domicilioEstablecimiento.get('codigoPostal')?.value).toBe('');
    expect(component.domicilioEstablecimiento.get('Municipio')?.value).toBe('');
  });

  it('should set store values using setValoresStore', () => {
    component.setValoresStore(component.domicilioEstablecimiento, 'estado');
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should have correct tabla config', () => {
    expect(component.configuracionTabla.length).toBe(2);
    expect(component.configuracionTabla[0].encabezado).toContain('Clave');
  });

  it('should use CHECKBOX as TablaSeleccion enum', () => {
    expect(component.TablaSeleccion).toBe(TablaSeleccion.CHECKBOX);
  });
  it('should handle empty form values in guardarDatosFormulario', () => {
    // Ensure the form is empty
    component.domicilioEstablecimiento.reset();
  
    // Spy on the method that saves the data
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
  
    // Call the method
    component.guardarDatosFormulario();
  
    // Verify that setValoresStore was called with empty values
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.domicilioEstablecimiento, 'estado');
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.domicilioEstablecimiento, 'municipio');
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.domicilioEstablecimiento, 'localidad');
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.domicilioEstablecimiento, 'colonia');
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.domicilioEstablecimiento, 'calle');
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.domicilioEstablecimiento, 'codigoPostal');
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.domicilioEstablecimiento, 'numeroExterior');
  });
  it('should not call setValoresStore if form is invalid in guardarDatosFormulario', () => {
    // Mark the form as invalid
    component.domicilioEstablecimiento.get('estado')?.setErrors({ required: true });
  
    // Spy on the method that saves the data
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
  
    // Call the method
    component.guardarDatosFormulario();
  
    // Verify that setValoresStore was not called
    expect(setValoresStoreSpy).not.toHaveBeenCalled();
  });
});
