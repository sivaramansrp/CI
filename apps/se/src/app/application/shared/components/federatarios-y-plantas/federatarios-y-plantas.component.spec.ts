import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FederatariosYPlantasComponent } from './federatarios-y-plantas.component';
import { ActivatedRoute } from '@angular/router';

describe('FederatariosYPlantasComponent', () => {
  let component: FederatariosYPlantasComponent;
  let fixture: ComponentFixture<FederatariosYPlantasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FederatariosYPlantasComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FederatariosYPlantasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});