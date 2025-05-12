import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnexoUnoSeccionComponent } from './anexo-uno-seccion.component';

describe('AnexoUnoSeccionComponent', () => {
  let component: AnexoUnoSeccionComponent;
  let fixture: ComponentFixture<AnexoUnoSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnexoUnoSeccionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnexoUnoSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
