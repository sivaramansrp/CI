import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScianTablaContenedoraComponent } from './scian-tabla-contenedora.component';

describe('ScianTablaContenedoraComponent', () => {
  let component: ScianTablaContenedoraComponent;
  let fixture: ComponentFixture<ScianTablaContenedoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScianTablaContenedoraComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScianTablaContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
