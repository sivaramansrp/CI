import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FederatariosYPlantasVistaComponent } from './federatarios-y-plantas-vista.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('FederatariosYPlantasVistaComponent', () => {
  let component: FederatariosYPlantasVistaComponent;
  let fixture: ComponentFixture<FederatariosYPlantasVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FederatariosYPlantasVistaComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FederatariosYPlantasVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
