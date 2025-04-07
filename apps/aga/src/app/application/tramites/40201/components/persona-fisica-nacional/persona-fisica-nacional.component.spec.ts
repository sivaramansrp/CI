import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonaFisicaNacionalComponent } from './persona-fisica-nacional.component';

describe('PersonaFisicaNacionalComponent', () => {
  let component: PersonaFisicaNacionalComponent;
  let fixture: ComponentFixture<PersonaFisicaNacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaFisicaNacionalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonaFisicaNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
