import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FederatariosYPlantasVistaComponent } from './federatarios-y-plantas-vista.component';
import { Tramite80101Store } from '../../estados/tramite80101.store';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { of } from 'rxjs';

describe('FederatariosYPlantasVistaComponent', () => {
  let component: FederatariosYPlantasVistaComponent;
  let fixture: ComponentFixture<FederatariosYPlantasVistaComponent>;
  let mockStore: any;
  let mockQuery: any;

  beforeEach(async () => {
    mockStore = {
      setFederatarios: jest.fn()
    };
    mockQuery = {
      selectDatosFederatarios$: of([{ id: 1, nombre: 'Federatario 1' }])
    };

    await TestBed.configureTestingModule({
      imports: [FederatariosYPlantasVistaComponent],
      providers: [
        { provide: Tramite80101Store, useValue: mockStore },
        { provide: Tramite80101Query, useValue: mockQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FederatariosYPlantasVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

});