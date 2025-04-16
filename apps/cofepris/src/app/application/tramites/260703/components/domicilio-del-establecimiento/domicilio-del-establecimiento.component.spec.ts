import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';
import { Tramite260703Store } from '../../estados/store/tramite260703.store';
import { SolicitudPermisoService } from '../../services/solicitud-permiso.service';
import { DomicilioDelEstablecimientoComponent } from './domicilio-del-establecimiento.component';

describe('DomicilioDelEstablecimientoComponent', () => {
  let component: DomicilioDelEstablecimientoComponent;
  let fixture: ComponentFixture<DomicilioDelEstablecimientoComponent>;
  let tramite260703StoreMock: any;
  let tramite260703QueryMock: any;
  let solicitudPermisoServiceMock: any;

  beforeEach(async () => {
    tramite260703StoreMock = {
      actualizarEstadoFormularioDomicilioDelEstablecimiento: jest.fn(),
    };

    tramite260703QueryMock = {
      selectSolicitudPermiso$: of({
        domicilloDelEstablecimientoFormState: {
          codigoPostal: '12345',
          estado: 'Estado 1',
          descripcionMunicipio: 'Municipio 1',
          informacionExtra: 'Extra Info',
          descripcionColonia: 'Colonia 1',
          calle: 'Calle 1',
          lada: '55',
          telefono: '1234567890',
          funcionamiento: 'Funcionamiento 1',
          licencia: 'Licencia 1',
          regimen: 'Regimen 1',
          aduana: 'Aduana 1',
        },
      }),
    };

    solicitudPermisoServiceMock = {
      obtenerScianData: jest.fn().mockReturnValue(
        of([
          { id: 1, descripcion: 'SCIAN 1' },
          { id: 2, descripcion: 'SCIAN 2' },
        ])
      ),
    };

    await TestBed.configureTestingModule({
      declarations: [DomicilioDelEstablecimientoComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite260703Store, useValue: tramite260703StoreMock },
        { provide: Tramite260703Query, useValue: tramite260703QueryMock },
        { provide: SolicitudPermisoService, useValue: solicitudPermisoServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilioDelEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize solicitudPermisoState on ngOnInit', () => {
    component.ngOnInit();
    expect(component.solicitudPermisoState).toEqual({
      domicilloDelEstablecimientoFormState: {
        codigoPostal: '12345',
        estado: 'Estado 1',
        descripcionMunicipio: 'Municipio 1',
        informacionExtra: 'Extra Info',
        descripcionColonia: 'Colonia 1',
        calle: 'Calle 1',
        lada: '55',
        telefono: '1234567890',
        funcionamiento: 'Funcionamiento 1',
        licencia: 'Licencia 1',
        regimen: 'Regimen 1',
        aduana: 'Aduana 1',
      },
    });
  });

  it('should create the domicilloDelEstablecimientoForm on ngOnInit', () => {
    component.ngOnInit();
    expect(component.domicilloDelEstablecimientoForm).toBeDefined();
    expect(component.domicilloDelEstablecimientoForm.get('codigoPostal')?.value).toBe('12345');
    expect(component.domicilloDelEstablecimientoForm.get('estado')?.value).toBe('Estado 1');
    expect(component.domicilloDelEstablecimientoForm.get('descripcionMunicipio')?.value).toBe('Municipio 1');
  });

  it('should call obtenerScianData and populate datos', () => {
    component.obtenerScianData();
    expect(solicitudPermisoServiceMock.obtenerScianData).toHaveBeenCalled();
    expect(component.datos).toEqual([
      { id: 1, descripcion: 'SCIAN 1' },
      { id: 2, descripcion: 'SCIAN 2' },
    ]);
  });

  it('should call actualizarEstadoFormularioDomicilioDelEstablecimiento when setValoresStore is called', () => {
    component.ngOnInit();
    component.setValoresStore('codigoPostal');
    expect(tramite260703StoreMock.actualizarEstadoFormularioDomicilioDelEstablecimiento).toHaveBeenCalledWith({
      codigoPostal: '12345',
    });
  });

  it('should reset estado list when estadoSeleccion is called', () => {
    component.estado = [{ id: 1, descripcion: 'Estado 1' }];
    component.estadoSeleccion();
    expect(component.estado).toEqual([]);
  });

  it('should reset regimen list when regimeSeleccion is called', () => {
    component.regimen = [{ id: 1, descripcion: 'Regimen 1' }];
    component.regimeSeleccion();
    expect(component.regimen).toEqual([]);
  });

  it('should reset aduana list when aduanaSeleccion is called', () => {
    component.aduana = [{ id: 1, descripcion: 'Aduana 1' }];
    component.aduanaSeleccion();
    expect(component.aduana).toEqual([]);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});