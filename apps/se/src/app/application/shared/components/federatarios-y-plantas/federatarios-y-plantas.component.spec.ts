import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FederatariosYPlantasComponent } from './federatarios-y-plantas.component';

describe('FederatariosYPlantasComponent', () => {
  let component: FederatariosYPlantasComponent;
  let fixture: ComponentFixture<FederatariosYPlantasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FederatariosYPlantasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FederatariosYPlantasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
