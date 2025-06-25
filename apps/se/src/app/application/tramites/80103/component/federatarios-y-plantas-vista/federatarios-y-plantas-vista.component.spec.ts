import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FederatariosYPlantasVistaComponent } from './federatarios-y-plantas-vista.component';
import { Tramite80101Store } from '../../estados/tramite80101.store';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FederatariosEncabezado } from '../../../../shared/models/federatarios-y-plantas.model';

describe('FederatariosYPlantasVistaComponent', () => {
  let component: FederatariosYPlantasVistaComponent;
  let fixture: ComponentFixture<FederatariosYPlantasVistaComponent>;

  const MOCK_FEDERATARIOS: FederatariosEncabezado[] = [
    {
      nombre: 'John',
      primerApellido: 'Doe',
      segundoApellido: 'Smith',
      numeroDeActa: '12345',
      fechaDelActa: '2024-01-01',
      numeroDeNotaria: '789',
      entidadFederativa: 'Jalisco',
      municipioODelegacion: 'Guadalajara',
    },
  ];

  const mockActivatedRoute = {
    snapshot: {
      params: {},
      queryParams: {},
      data: {},
    },
  };

  const mockStore = {
    setFederatarios: jest.fn(),
  };

  const mockQuery = {
    selectDatosFederatarios$: of(MOCK_FEDERATARIOS),
  };

  // ✅ Stub FederatariosYPlantasComponent
  @Component({
    selector: 'app-federatarios-y-planta',
    template: '',
  })
  class StubFederatariosYPlantasComponent {
    @Input() federatariosTablaConfiguracion: any;
    @Input() plantasDisponiblesTablaConfiguracion: any;
    @Input() plantasImmexTablaConfiguracion: any;
    @Input() federatariosTablaLista: any;
    @Input() plantasDisponiblesTablaLista: any;
    @Input() plantasImmexTablaLista: any;
    @Input() estadosCatalogos: any;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        StubFederatariosYPlantasComponent, // ✅ Stub included
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Tramite80101Store, useValue: mockStore },
        { provide: Tramite80101Query, useValue: mockQuery },
      ],
      imports: [CommonModule, HttpClientTestingModule, RouterTestingModule,FederatariosYPlantasVistaComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ safe for unknown elements
    }).compileComponents();

    fixture = TestBed.createComponent(FederatariosYPlantasVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize federatariosTablaLista$ with observable from query', (done) => {
    component.federatariosTablaLista$.subscribe((data) => {
      expect(data).toEqual(MOCK_FEDERATARIOS);
      done();
    });
  });

  it('should call setFederatarios when setFormaDatos is called', () => {
    const mockDato: FederatariosEncabezado = {
      nombre: 'Jane',
      primerApellido: 'Doe',
      segundoApellido: 'Smith',
      numeroDeActa: '123',
      fechaDelActa: '2024-01-01',
      numeroDeNotaria: '456',
      entidadFederativa: 'CDMX',
      municipioODelegacion: 'Benito Juárez',
    };

    component.setFormaDatos(mockDato);
    expect(mockStore.setFederatarios).toHaveBeenCalledWith(mockDato);
  });

  it('should have default estadosCatalogos with JALISCO', () => {
    expect(component.estadosCatalogos).toEqual([{ id: 1, descripcion: 'JALISCO' }]);
  });
});
