import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificacionPermisoImportacionTratamientosComponent } from './modificacion-permiso-importacion-tratamientos.component';

describe('ModificacionPermisoImportacionTratamientosComponent', () => {
  let component: ModificacionPermisoImportacionTratamientosComponent;
  let fixture: ComponentFixture<ModificacionPermisoImportacionTratamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificacionPermisoImportacionTratamientosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ModificacionPermisoImportacionTratamientosComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
