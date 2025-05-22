import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosDestinoComponent } from './terceros-relacionados-destino.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { TercerosRelacionadosDestinoService } from '../../services/tereceros-relacionados-destino.service';
import { Tramite260104Query } from '../../estados/queries/tramite260104.query';
import { Tramite260104Store } from '../../estados/stores/tramite260104.store';
import { Fabricante, Destinatario } from '../../models/terceros-relacionados-destino.model';
import { of } from 'rxjs';

describe('TercerosRelacionadosDestinoComponent', () => {
  let component: TercerosRelacionadosDestinoComponent;
  let fixture: ComponentFixture<TercerosRelacionadosDestinoComponent>;
  let router: Router;
  let tercerosDataService: TercerosRelacionadosDestinoService;

  beforeEach(async () => {
    const routerMock = { navigate: jest.fn() };
    const tercerosDataServiceMock = { setFabricante: jest.fn() };
    const tramite260104QueryMock = {
      getFabricanteTablaDatos$: of([]),
      getDestinatarioFinalTablaDatos$: of([]),
    };

    await TestBed.configureTestingModule({
      imports: [TercerosRelacionadosDestinoComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
              queryParams: {}
            }
          }
        },
        { provide: Router, useValue: routerMock },
        { provide: TercerosRelacionadosDestinoService, useValue: tercerosDataServiceMock },
        { provide: Tramite260104Query, useValue: tramite260104QueryMock },
        { provide: Tramite260104Store, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosDestinoComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    tercerosDataService = TestBed.inject(TercerosRelacionadosDestinoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize fabricantes$ observable on ngOnInit', () => {
    expect(component.fabricanteTablaDatos).toBeDefined();
  });

  it('should initialize destinatarios$ observable on ngOnInit', () => {
    expect(component.destinatarioFinalTablaDatos).toBeDefined();
  });

  it('should call setFabricante and update selectedFabricante in getFabricanteDatos', () => {
    const mockFabricantes = [{
      tipoPersona: 'Moral',
      nombreRazonSocial: 'test',
      rfc: "test",
      curp: '',
      telefono: '',
      correoElectronico: '',
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      pais: '',
      colonia: '',
      municipioAlcaldia: '',
      localidad: '',
      estadoLocalidad: '',
      estado: '',
      coloniaEquivalente: '',
      lada: '',
      descPais: '',
    }];

    component.fabricanteTablaDatos = mockFabricantes;

    component.getFabricanteDatos(mockFabricantes);

    expect(component.selectedFabricante).toEqual(mockFabricantes);
    expect(component.estaOcultoDes).toBe(true);
    expect(tercerosDataService.setFabricante).toHaveBeenCalledWith(mockFabricantes);
  });

  it('should navigate to modify destinatarios route if selectedDestinario is not empty', () => {
    component.selectedDestinario = [{
      tipoPersona: 'FISICA',
      rfc: 'XAXX010101000',
      nombres: 'John',
      nombreRazonSocial: '',
      primerApellido: 'Doe',
      segundoApellido: 'Smith',
      pais: '1',
      estadoLocalidad: '1',
      estado: '',
      curp: '',
      municipioAlcaldia: '1',
      localidad: '1',
      codigoPostal: '12345',
      colonia: '1',
      calle: 'Main Street',
      numeroExterior: '123',
      numeroInterior: '',
      lada: '55',
      telefono: '12345678',
      correoElectronico: 'john.doe@example.com',
      descPais: '',
      descEstado: '',
      descMunicipio: '',
      descLocalidad: '',
      descCodigoPostal: '',
      descColonia: ''
    }];

    component.modifySelectedDestinatarios();

    expect(router.navigate).toHaveBeenCalledWith(['../modificar-destinatario-final'], {
      relativeTo: component.activatedRoute,
    });
  });

  it('should log a warning if selectedDestinario is empty in modifySelectedDestinatarios', () => {
    console.warn = jest.fn();
    component.selectedDestinario = [];

    component.modifySelectedDestinatarios();

    expect(console.warn).toHaveBeenCalledWith('No destinatarios selected for modification.');
  });
});
