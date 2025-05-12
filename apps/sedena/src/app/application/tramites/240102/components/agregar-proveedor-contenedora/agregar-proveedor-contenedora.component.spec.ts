import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarProveedorContenedoraComponent } from './agregar-proveedor-contenedora.component';

describe('AgregarProveedorContenedoraComponent', () => {
  let component: AgregarProveedorContenedoraComponent;
  let fixture: ComponentFixture<AgregarProveedorContenedoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarProveedorContenedoraComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarProveedorContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
