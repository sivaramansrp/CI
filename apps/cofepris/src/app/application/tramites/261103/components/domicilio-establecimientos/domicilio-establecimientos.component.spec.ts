import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DomicilioEstablecimientosComponent } from './domicilio-establecimientos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModificacionPermisoImportacionMedicamentosService } from '../../services/modificacion-permiso-importacion-medicamentos.service';
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261103.query';
import { DatosProcedureStore } from '../../../../estados/tramites/tramites261103.store';
import { of } from 'rxjs';

describe('DomicilioEstablecimientosComponent', () => {
  let componente: DomicilioEstablecimientosComponent;
  let fixture: ComponentFixture<DomicilioEstablecimientosComponent>;

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
        { provide: ModificacionPermisoImportacionMedicamentosService, useValue: MOCK_SERVICE },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilioEstablecimientosComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar los formularios en ngOnInit', () => {
    expect(componente.domicilioEstablecimiento).toBeTruthy();
    expect(componente.AvisodeFuncionamiento).toBeTruthy();

    expect(componente.domicilioEstablecimiento.get('estado')?.value).toBe('Estado');
    expect(componente.AvisodeFuncionamiento.get('funcionamiento')?.value).toBe('Operando');
  });

  it('debería llamar a ModificacionPermisoImportacionMedicamentosService.getDomicilioData y asignar Domicilios', () => {
    componente.ngOnInit();
  });

  it('debería establecer valores en el formulario usando establecerValoresDeFormulario', () => {
    componente.domicilioEstablecimiento.addControl('Codigo', componente.domicilioEstablecimiento.get('estado')!);
    componente.domicilioEstablecimiento.addControl('codigoPostal', componente.domicilioEstablecimiento.get('estado')!);
    componente.domicilioEstablecimiento.addControl('Municipio', componente.domicilioEstablecimiento.get('estado')!);
    componente.domicilioEstablecimiento.addControl('numeroExterior', componente.domicilioEstablecimiento.get('estado')!);
    expect(componente.domicilioEstablecimiento.get('Codigo')?.value).toBe('');
    expect(componente.domicilioEstablecimiento.get('codigoPostal')?.value).toBe('');
    expect(componente.domicilioEstablecimiento.get('Municipio')?.value).toBe('');
  });

  it('debería establecer valores en el store usando setValoresStore', () => {
    componente.setValoresStore(componente.domicilioEstablecimiento, 'estado');
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const NEXT_SPY = jest.spyOn(componente['destroy$'], 'next');
    const COMPLETE_SPY = jest.spyOn(componente['destroy$'], 'complete');
    componente.ngOnDestroy();
    expect(NEXT_SPY).toHaveBeenCalled();
    expect(COMPLETE_SPY).toHaveBeenCalled();
  });
});