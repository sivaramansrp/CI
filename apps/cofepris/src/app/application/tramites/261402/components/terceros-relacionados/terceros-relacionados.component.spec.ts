import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { Tramite261402Store } from '../../../../estados/tramites/tramite261402.store';
import { Tramite261402Query } from '../../../../estados/queries/tramite261402.query';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InformaciondeProcedencia } from '../../enums/informacion-de-procedencia.enum';
import { SolicitudModificacionPermisoInternacionService } from '../../services/solicitud-modificacion-permiso-internacion.service';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let solicitudDatosServiceMock: jest.Mocked<SolicitudModificacionPermisoInternacionService>;
  let tramite261402StoreMock: jest.Mocked<Tramite261402Store>;

  beforeEach(async () => {
    solicitudDatosServiceMock = {
      obtenerDestinatarioListo: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'InformaciondeProcedencia 1' }])),
    } as unknown as jest.Mocked<SolicitudModificacionPermisoInternacionService>;

    tramite261402StoreMock = {
      setDestinatarioDatos: jest.fn(),
    } as unknown as jest.Mocked<Tramite261402Store>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [TercerosRelacionadosComponent],
      providers: [
        { provide: SolicitudModificacionPermisoInternacionService, useValue: solicitudDatosServiceMock },
        { provide: Tramite261402Store, useValue: tramite261402StoreMock },
        { provide: Tramite261402Query, useValue: {} }, 
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], 
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe llamar a obtenerDestinatarioListo en ngOnInit', () => {
    const OBTENER_DESTINATARIO_LISTO_SPY = jest.spyOn(component, 'obtenerDestinatarioListo');
    component.ngOnInit();
    expect(OBTENER_DESTINATARIO_LISTO_SPY).toHaveBeenCalled();
  });

  it('Debe completar destinatarioDatos y llamar a setDestinatarioDatos en el almacén', () => {
    const MOCK_DESTINATARIOS: InformaciondeProcedencia[] = [
      {
        nombre: 'InformaciondeProcedencia 1',
        curp: 'RFC123456',
        calle: 'CURP123456',
        telefono: '1234567890',
        correoElectronico: 'destinatario1@example.com',
        rfc: 'Address 1',
        numeroExterior: '123',
        numeroInterior: 'A',
        pais: 'Mexico',
        colonia: 'Colonia 1',
        municipio: 'Municipio 1',
        estado: 'Estado 1',
        estado2: 'Estado 2',  
        codigo: '12345',
        localidad: 'Localidad 1',
      },
    ];
  
    solicitudDatosServiceMock.obtenerDestinatarioListo.mockReturnValue(of(MOCK_DESTINATARIOS));
  
    component.obtenerDestinatarioListo();
  
    expect(component.destinatarioDatos).toEqual(MOCK_DESTINATARIOS);
    expect(tramite261402StoreMock.setDestinatarioDatos).toHaveBeenCalledWith(MOCK_DESTINATARIOS);
  });

  it('Deberían limpiar las suscripciones en ngOnDestroy', () => {
    const DESTROY_SPY = jest.spyOn(component['destroyNotifier$'], 'next');
    const COMPLETE_SPY = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(DESTROY_SPY).toHaveBeenCalled();
    expect(COMPLETE_SPY).toHaveBeenCalled();
  });
});