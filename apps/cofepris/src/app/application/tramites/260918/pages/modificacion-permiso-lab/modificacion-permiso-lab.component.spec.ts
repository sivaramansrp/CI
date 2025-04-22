import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificacionPermisoLabComponent } from './modificacion-permiso-lab.component';

describe('ModificacionPermisoLabComponent', () => {
  let component: ModificacionPermisoLabComponent;
  let fixture: ComponentFixture<ModificacionPermisoLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificacionPermisoLabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificacionPermisoLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
