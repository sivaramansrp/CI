import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { Tramite261401Store } from '../../../../estados/tramites/tramite261401.store';
import { Tramite261401Query } from '../../../../estados/queries/tramite261401.query';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Destinatario } from '../../enums/destinatario.enum';
import { SolicitudModificacionPermisoSalidaTerritorioService } from '../../services/solicitudModificacionPermisoSalidaTerritorio.service';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let solicitudDatosServiceMock: jest.Mocked<SolicitudModificacionPermisoSalidaTerritorioService>;
  let tramite261401StoreMock: jest.Mocked<Tramite261401Store>;

  beforeEach(async () => {
    solicitudDatosServiceMock = {
      obtenerDestinatarioListo: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Destinatario 1' }])),
    } as unknown as jest.Mocked<SolicitudModificacionPermisoSalidaTerritorioService>;

    tramite261401StoreMock = {
      setDestinatarioDatos: jest.fn(),
    } as unknown as jest.Mocked<Tramite261401Store>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [TercerosRelacionadosComponent],
      providers: [
        { provide: SolicitudModificacionPermisoSalidaTerritorioService, useValue: solicitudDatosServiceMock },
        { provide: Tramite261401Store, useValue: tramite261401StoreMock },
        { provide: Tramite261401Query, useValue: {} }, 
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], 
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerDestinatarioListo on ngOnInit', () => {
    const obtenerDestinatarioListoSpy = jest.spyOn(component, 'obtenerDestinatarioListo');
    component.ngOnInit();
    expect(obtenerDestinatarioListoSpy).toHaveBeenCalled();
  });

  it('should populate destinatarioDatos and call setDestinatarioDatos in the store', () => {
    const mockDestinatarios: Destinatario[] = [
      {
        nombre: 'Destinatario 1',
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
  
    solicitudDatosServiceMock.obtenerDestinatarioListo.mockReturnValue(of(mockDestinatarios));
  
    component.obtenerDestinatarioListo();
  
    expect(component.destinatarioDatos).toEqual(mockDestinatarios);
    expect(tramite261401StoreMock.setDestinatarioDatos).toHaveBeenCalledWith(mockDestinatarios);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});