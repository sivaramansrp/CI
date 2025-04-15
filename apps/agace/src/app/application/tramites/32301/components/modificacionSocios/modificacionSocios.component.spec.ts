import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificacionSociosComponent } from './modificacionSocios.component';

describe('ModificacionSociosComponent', () => {
  let component: ModificacionSociosComponent;
  let fixture: ComponentFixture<ModificacionSociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificacionSociosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificacionSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
