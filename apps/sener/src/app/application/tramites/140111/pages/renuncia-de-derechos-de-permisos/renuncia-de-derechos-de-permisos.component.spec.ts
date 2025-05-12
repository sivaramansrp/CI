import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RenunciaDeDerechosDePermisosComponent } from './renuncia-de-derechos-de-permisos.component';

describe('RenunciaDeDerechosDePermisosComponent', () => {
  let component: RenunciaDeDerechosDePermisosComponent;
  let fixture: ComponentFixture<RenunciaDeDerechosDePermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RenunciaDeDerechosDePermisosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RenunciaDeDerechosDePermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
