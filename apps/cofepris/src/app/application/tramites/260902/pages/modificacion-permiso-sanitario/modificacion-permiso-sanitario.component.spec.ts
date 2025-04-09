import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificacionPermisoSanitarioComponent } from './modificacion-permiso-sanitario.component';

describe('ModificacionPermisoSanitarioComponent', () => {
  let component: ModificacionPermisoSanitarioComponent;
  let fixture: ComponentFixture<ModificacionPermisoSanitarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificacionPermisoSanitarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificacionPermisoSanitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
