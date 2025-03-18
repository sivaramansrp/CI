import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContenedorAnnexoDosTresComponent } from './contenedor-annexo-dos-tres.component';

describe('ContenedorAnnexoDosTresComponent', () => {
  let component: ContenedorAnnexoDosTresComponent;
  let fixture: ComponentFixture<ContenedorAnnexoDosTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenedorAnnexoDosTresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContenedorAnnexoDosTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
