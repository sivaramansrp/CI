import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FederatariosYPlantasVistaComponent } from './federatarios-y-plantas-vista.component';

describe('FederatariosYPlantasComponent', () => {
  let component: FederatariosYPlantasVistaComponent;
  let fixture: ComponentFixture<FederatariosYPlantasVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FederatariosYPlantasVistaComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FederatariosYPlantasVistaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
