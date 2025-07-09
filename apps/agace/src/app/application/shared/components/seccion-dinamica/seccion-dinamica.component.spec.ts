import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeccionDinamicaComponent } from './seccion-dinamica.component';

describe('SeccionDinamicaComponent', () => {
  let component: SeccionDinamicaComponent;
  let fixture: ComponentFixture<SeccionDinamicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionDinamicaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeccionDinamicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
