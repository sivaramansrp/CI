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

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el observable de fabricantes en ngOnInit', () => {
    expect(component.fabricanteTablaDatos).toBeDefined();
  });

  it('debe inicializar el observable de destinatarios en ngOnInit', () => {
    expect(component.destinatarioFinalTablaDatos).toBeDefined();
  });

  it('debe llamar a setFabricante y actualizar selectedFabricante en getFabricanteDatos', () => {
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

  it('debe mostrar una advertencia si selectedDestinario está vacío en modifySelectedDestinatarios', () => {
    console.warn = jest.fn();
    component.selectedDestinario = [];

    component.modifySelectedDestinatarios();

    expect(console.warn).toHaveBeenCalledWith('No destinatarios selected for modification.');
  });
});
