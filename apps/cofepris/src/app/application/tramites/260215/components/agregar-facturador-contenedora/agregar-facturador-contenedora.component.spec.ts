import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarFacturadorContenedoraComponent } from './agregar-facturador-contenedora.component';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { Tramite260215Store } from '../../estados/tramites/tramite260215.store';
import { Tramite260215Query } from '../../estados/queries/tramite260215.query';
import { Facturador } from '../../../../shared/models/terceros-relacionados.model';
import { provideHttpClient } from '@angular/common/http';

describe('AgregarFacturadorContenedoraComponent', () => {
  let component: AgregarFacturadorContenedoraComponent;
  let fixture: ComponentFixture<AgregarFacturadorContenedoraComponent>;
  let storeMock: any;
  let queryMock: any;
  let routeMock: any;

  beforeEach(async () => {
    storeMock = {
      updateFacturadorTablaDatos: jest.fn(),
    };

    queryMock = {
      selectTramiteState$: of({
        facturadorTablaDatos: [{ id: 1, nombre: 'Facturador 1' }],
        facturadorTablaModificaDatos: [{ id: 2, nombre: 'Facturador 2' }],
      }),
    };

    routeMock = {
      queryParams: of({}),
    };

    await TestBed.configureTestingModule({
      imports: [AgregarFacturadorContenedoraComponent, require('@angular/common/http/testing').HttpClientTestingModule],
      providers: [
        provideHttpClient(),
        { provide: Tramite260215Store, useValue: storeMock },
        { provide: Tramite260215Query, useValue: queryMock },
        { provide: ActivatedRoute, useValue: routeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarFacturadorContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tramiteState and facturadorTablaDatos from query', () => {
    expect(component.tramiteState).toBeDefined();
    expect(component.facturadorTablaDatos).toEqual([{ id: 1, description: 'Facturador 1' }]);
  });

  it('should clear facturadorTablaDatos if update param is false', () => {
    component.route.queryParams = of({ update: 'false' });
    component.ngOnInit();
    expect(component.facturadorTablaDatos).toEqual([]);
  });

  it('should set facturadorTablaDatos from tramiteState if update param is true', () => {
    component.tramiteState = {
      facturadorTablaModificaDatos: [{ id: 2, description: 'Facturador 2' }],
    } as any;
    component.route.queryParams = of({ update: 'true' });
    component.ngOnInit();
    expect(component.facturadorTablaDatos).toEqual([{ id: 2, description: 'Facturador 2' }]);
  });

  it('should call store.updateFacturadorTablaDatos when updateFacturadorTablaDatos is called', () => {
  const facturador: Facturador = {
  id: 1,
  nombres: 'Nombre',
  nombreRazonSocial: 'Razon Social',
  rfc: 'RFC123',
  curp: 'CURP123',
  telefono: '1234567890',
  tipoPersona: 'Física',
  nacionalidad: 'Mexicana',
  pais: 'México',
  entidadFederativa: 'CDMX',
  codigoPostal: '12345',
  municipioAlcaldia: 'Benito Juárez',
  localidad: 'Localidad',
  estadoLocalidad: 'Estado',
  coloniaEquivalente: 'Colonia',
  correoElectronico: 'correo@ejemplo.com',
  calle: 'Calle Ejemplo',
  numeroExterior: '123',
  numeroInterior: 'A',
  colonia: 'Colonia Ejemplo'
  // ...add any other required properties
};
    component.updateFacturadorTablaDatos([facturador]);
    expect(storeMock.updateFacturadorTablaDatos).toHaveBeenCalledWith([facturador]);
  });
});