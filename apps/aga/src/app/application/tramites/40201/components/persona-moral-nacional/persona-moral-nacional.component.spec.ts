import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonaMoralNacionalComponent } from './persona-moral-nacional.component';

describe('PersonaMoralNacionalComponent', () => {
  let component: PersonaMoralNacionalComponent;
  let fixture: ComponentFixture<PersonaMoralNacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaMoralNacionalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonaMoralNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
