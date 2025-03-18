import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContenedorComplementarPlantasComponent } from './contenedor-complementar-plantas.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ContenedorComplementarPlantasComponent', () => {
  let component: ContenedorComplementarPlantasComponent;
  let fixture: ComponentFixture<ContenedorComplementarPlantasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenedorComplementarPlantasComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ContenedorComplementarPlantasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
