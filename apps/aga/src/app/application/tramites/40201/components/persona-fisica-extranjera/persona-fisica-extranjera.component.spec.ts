import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonaFisicaExtranjeraComponent } from './persona-fisica-extranjera.component';

describe('PersonaFisicaExtranjeraComponent', () => {
  let component: PersonaFisicaExtranjeraComponent;
  let fixture: ComponentFixture<PersonaFisicaExtranjeraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaFisicaExtranjeraComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonaFisicaExtranjeraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
