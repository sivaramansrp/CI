import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermisoRenunciaDeDerechosComponent } from './permiso-renuncia-de-derechos.component';

describe('PermisoRenunciaDeDerechosComponent', () => {
  let component: PermisoRenunciaDeDerechosComponent;
  let fixture: ComponentFixture<PermisoRenunciaDeDerechosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermisoRenunciaDeDerechosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PermisoRenunciaDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
