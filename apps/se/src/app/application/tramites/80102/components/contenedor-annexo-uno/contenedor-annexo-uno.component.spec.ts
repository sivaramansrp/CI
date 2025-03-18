import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContenedorAnnexoUnoComponent } from './contenedor-annexo-uno.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ContenedorAnnexoUnoComponent', () => {
  let component: ContenedorAnnexoUnoComponent;
  let fixture: ComponentFixture<ContenedorAnnexoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenedorAnnexoUnoComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ContenedorAnnexoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
