import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonaFisicaExtranjeroComponent } from './persona-fisica-extranjero.component';

describe('PersonaFisicaExtranjeroComponent', () => {
  let component: PersonaFisicaExtranjeroComponent;
  let fixture: ComponentFixture<PersonaFisicaExtranjeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaFisicaExtranjeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonaFisicaExtranjeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
