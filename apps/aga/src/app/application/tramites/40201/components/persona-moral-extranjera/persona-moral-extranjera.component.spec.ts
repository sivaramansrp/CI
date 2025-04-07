import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonaMoralExtranjeraComponent } from './persona-moral-extranjera.component';

describe('PersonaMoralExtranjeraComponent', () => {
  let component: PersonaMoralExtranjeraComponent;
  let fixture: ComponentFixture<PersonaMoralExtranjeraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaMoralExtranjeraComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonaMoralExtranjeraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
