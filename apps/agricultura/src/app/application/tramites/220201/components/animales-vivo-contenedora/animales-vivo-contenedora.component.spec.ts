import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimalesVivoContenedoraComponent } from './animales-vivo-contenedora.component';

describe('AnimalesVivoContenedoraComponent', () => {
  let component: AnimalesVivoContenedoraComponent;
  let fixture: ComponentFixture<AnimalesVivoContenedoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalesVivoContenedoraComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalesVivoContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
