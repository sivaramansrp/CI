import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificacionPermisoImportacionComponent } from './modificacion-permiso-importacion.component';

describe('ModificacionPermisoImportacionComponent', () => {
  let component: ModificacionPermisoImportacionComponent;
  let fixture: ComponentFixture<ModificacionPermisoImportacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificacionPermisoImportacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificacionPermisoImportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
