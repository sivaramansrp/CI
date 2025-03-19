import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FederatariosYPlantasVistaComponent } from './federatarios-y-plantas-vista.component';
import { Tramite80102Query } from '../../estados/tramite80102.query';
import { Tramite80102Store } from '../../estados/tramite80102.store';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('FederatariosYPlantasVistaComponent', () => {
  let component: FederatariosYPlantasVistaComponent;
  let fixture: ComponentFixture<FederatariosYPlantasVistaComponent>;
  let mockStore: any;
  let mockQuery: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    // Create mocks for dependencies
    mockStore = { setFederatarios: jest.fn() };
    mockQuery = {
      selectDatosFederatarios$: of([]), // Mock the observable
    };
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn(),
        },
      },
    };

    // Configure TestBed
    await TestBed.configureTestingModule({
      imports: [FederatariosYPlantasVistaComponent],
      declarations: [],
      providers: [
        { provide: Tramite80102Store, useValue: mockStore },
        { provide: Tramite80102Query, useValue: mockQuery },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FederatariosYPlantasVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize federatariosTablaConfiguracion correctly', () => {
    expect(component.federatariosTablaConfiguracion.TablaSeleccion).toEqual('CHECKBOX');
  });

  it('should initialize federatariosTablaLista$ with observable data', (done) => {
    component.federatariosTablaLista$.subscribe((data) => {
      expect(data).toEqual([]);
      done();
    });
  });

  it('should initialize plantasDisponiblesTablaConfiguracion correctly', () => {
    expect(
      component.plantasDisponiblesTablaConfiguracion.TablaSeleccion
    ).toEqual('CHECKBOX');
  });

  it('should initialize plantasImmexTablaConfiguracion correctly', () => {
    expect(component.plantasImmexTablaConfiguracion.TablaSeleccion).toEqual(
      'CHECKBOX'
    );
  });

  it('should initialize plantasDisponiblesTablaLista as an empty array', () => {
    expect(component.plantasDisponiblesTablaLista).toEqual([]);
  });

  it('should initialize plantasImmexTablaLista as an empty array', () => {
    expect(component.plantasImmexTablaLista).toEqual([]);
  });
});
