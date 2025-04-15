import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificacionGoceInmuebleComponent } from './modificacionGoceInmueble.component';

describe('ModificacionGoceInmuebleComponent', () => {
  let component: ModificacionGoceInmuebleComponent;
  let fixture: ComponentFixture<ModificacionGoceInmuebleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificacionGoceInmuebleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificacionGoceInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
