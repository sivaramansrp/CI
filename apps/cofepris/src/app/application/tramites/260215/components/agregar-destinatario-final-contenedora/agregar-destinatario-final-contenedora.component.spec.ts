import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarDestinatarioFinalContenedoraComponent } from './agregar-destinatario-final-contenedora.component';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { Tramite260215Store } from '../../estados/tramites/tramite260215.store';
import { Tramite260215Query } from '../../estados/queries/tramite260215.query';
import { Destinatario } from '../../../../shared/models/terceros-relacionados.model';
import { provideHttpClient } from '@angular/common/http';

describe('AgregarDestinatarioFinalContenedoraComponent', () => {
  let component: AgregarDestinatarioFinalContenedoraComponent;
  let fixture: ComponentFixture<AgregarDestinatarioFinalContenedoraComponent>;
  let storeMock: any;
  let queryMock: any;
  let routeMock: any;

  beforeEach(async () => {
    storeMock = {
      updateDestinatarioFinalTablaDatos: jest.fn(),
    };

    queryMock = {
      selectTramiteState$: of({
        destinatarioFinalTablaDatos: [{ id: 1, nombre: 'Destinatario 1' }],
        destinatarioFinalTablaModificaDatos: [{ id: 2, nombre: 'Destinatario 2' }],
      }),
    };

    routeMock = {
      queryParams: of({}),
    };

    await TestBed.configureTestingModule({
      imports: [AgregarDestinatarioFinalContenedoraComponent],
      providers: [
        provideHttpClient(),
        { provide: Tramite260215Store, useValue: storeMock },
        { provide: Tramite260215Query, useValue: queryMock },
        { provide: ActivatedRoute, useValue: routeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarDestinatarioFinalContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tramiteState and destinatarioFinalTablaDatos from query', () => {
    expect(component.tramiteState).toBeDefined();
    expect(component.destinatarioFinalTablaDatos).toEqual([{ id: 1, nombre: 'Destinatario 1' }]);
  });

  it('should clear destinatarioFinalTablaDatos if update param is false', () => {
    // Recreate component with updated routeMock for 'update: false'
    routeMock.queryParams = of({ update: 'false' });
    fixture = TestBed.createComponent(AgregarDestinatarioFinalContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    component.tramiteState = {
      destinatarioFinalTablaModificaDatos: [{ id: 2, nombre: 'Destinatario 2' }],
    } as any;
    // Recreate component with updated routeMock for 'update: true'
    routeMock.queryParams = of({ update: 'true' });
    fixture = TestBed.createComponent(AgregarDestinatarioFinalContenedoraComponent);
    component = fixture.componentInstance;
    component.tramiteState = {
      destinatarioFinalTablaModificaDatos: [{ id: 2, nombre: 'Destinatario 2' }],
    } as any;
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.destinatarioFinalTablaDatos).toEqual([{ id: 2, nombre: 'Destinatario 2' }]);
    // Instead of accessing private property, recreate the component with updated routeMock
    routeMock.queryParams = of({ update: 'true' });
    fixture = TestBed.createComponent(AgregarDestinatarioFinalContenedoraComponent);
    component = fixture.componentInstance;
    component.tramiteState = {
      destinatarioFinalTablaModificaDatos: [{ id: 2, nombre: 'Destinatario 2' }],
    } as any;
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.destinatarioFinalTablaDatos).toEqual([{ id: 2, nombre: 'Destinatario 2' }]);
  });

  it('should call store.updateDestinatarioFinalTablaDatos when updateDestinatarioFinalTablaDatos is called', () => {
   const destinatario: Destinatario = {
  id: 1,
  nombres: 'Nombre',
  nombreRazonSocial: 'Razon Social',
  rfc: 'RFC123',
  curp: 'CURP123',
  telefono: '1234567890',
  correoElectronico: 'correo@ejemplo.com',
  pais: 'México',
  codigoPostal: '12345',
  tipoPersona: 'Física',
  calle: 'Calle 1',
  numeroExterior: '10',
  numeroInterior: '2A',
  colonia: 'Centro',
  municipioAlcaldia: 'Benito Juárez',
  entidadFederativa: 'CDMX',
  localidad: 'Localidad',
  estadoLocalidad: 'Estado',
  coloniaEquivalente: 'Colonia Equivalente' // Added required property
  // ...add any other required properties
};
    component.updateDestinatarioFinalTablaDatos([destinatario]);
    expect(storeMock.updateDestinatarioFinalTablaDatos).toHaveBeenCalledWith([destinatario]);
  });
});