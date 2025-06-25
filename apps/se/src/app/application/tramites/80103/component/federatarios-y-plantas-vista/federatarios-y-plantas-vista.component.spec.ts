import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FederatariosYPlantasVistaComponent } from './federatarios-y-plantas-vista.component';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { Tramite80101Store } from '../../estados/tramite80101.store';
import { of } from 'rxjs';
import { FederatariosEncabezado } from '../../../../shared/models/federatarios-y-plantas.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FederatariosYPlantasVistaComponent', () => {
  let component: FederatariosYPlantasVistaComponent;
  let fixture: ComponentFixture<FederatariosYPlantasVistaComponent>;

  const MOCK_FEDERATARIOS: FederatariosEncabezado[] = [
    {
      nombre: 'Juan',
      primerApellido: 'Pérez',
      segundoApellido: 'Lopez',
      numeroDeActa: 'ACT123',
      fechaDelActa: '2023-01-01',
      numeroDeNotaria: '789',
      entidadFederativa: 'CDMX',
      municipioODelegacion: 'Coyoacán',
    },
  ];

  const mockQuery = {
    selectDatosFederatarios$: of(MOCK_FEDERATARIOS),
  };

  const mockStore = {
    setFederatarios: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FederatariosYPlantasVistaComponent,
        HttpClientTestingModule, // required for internal services
      ],
      providers: [
        { provide: Tramite80101Query, useValue: mockQuery },
        { provide: Tramite80101Store, useValue: mockStore },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // suppress subcomponent errors
    }).compileComponents();

    fixture = TestBed.createComponent(FederatariosYPlantasVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit-like logic in constructor
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar federatariosTablaLista$ con el observable del query', (done) => {
    component.federatariosTablaLista$.subscribe((data) => {
      expect(data).toEqual(MOCK_FEDERATARIOS);
      done();
    });
  });

  it('debe llamar a store.setFederatarios con los datos correctos al ejecutar setFormaDatos()', () => {
    const dato: FederatariosEncabezado = MOCK_FEDERATARIOS[0];
    component.setFormaDatos(dato);
    expect(mockStore.setFederatarios).toHaveBeenCalledWith(dato);
  });

  it('debe tener estadosCatalogos por defecto igual a JALISCO', () => {
    expect(component.estadosCatalogos).toEqual([{ id: 1, descripcion: 'JALISCO' }]);
  });
});
