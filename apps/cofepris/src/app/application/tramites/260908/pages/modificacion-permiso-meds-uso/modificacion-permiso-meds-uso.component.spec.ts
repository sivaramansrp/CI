import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificacionPermisoMedsUsoComponent } from './modificacion-permiso-meds-uso.component';

describe('ModificacionPermisoMedsUsoComponent', () => {
  let component: ModificacionPermisoMedsUsoComponent;
  let fixture: ComponentFixture<ModificacionPermisoMedsUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificacionPermisoMedsUsoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificacionPermisoMedsUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
