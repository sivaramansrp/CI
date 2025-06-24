import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FederatariosYPlantasVistaComponent } from './federatarios-y-plantas-vista.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
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
      imports: [FederatariosYPlantasVistaComponent, HttpClientTestingModule],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(FederatariosYPlantasVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

});