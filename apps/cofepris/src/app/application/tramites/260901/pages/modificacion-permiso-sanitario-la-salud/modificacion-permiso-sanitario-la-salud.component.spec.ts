import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificacionPermisoSanitarioLaSaludComponent } from './modificacion-permiso-sanitario-la-salud.component';

describe('ModificacionPermisoSanitarioLaSaludComponent', () => {
  let component: ModificacionPermisoSanitarioLaSaludComponent;
  let fixture: ComponentFixture<ModificacionPermisoSanitarioLaSaludComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificacionPermisoSanitarioLaSaludComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ModificacionPermisoSanitarioLaSaludComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
