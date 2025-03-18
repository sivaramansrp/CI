import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesPlantasComponent } from './detalles-plantas.component';

describe('DetallesPlantasComponent', () => {
  let component: DetallesPlantasComponent;
  let fixture: ComponentFixture<DetallesPlantasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesPlantasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetallesPlantasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
