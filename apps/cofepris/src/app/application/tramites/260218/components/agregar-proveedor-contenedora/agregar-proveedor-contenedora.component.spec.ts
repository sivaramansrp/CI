import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarsProveedorContenedoraComponent } from './agregar-proveedor-contenedora.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AgregarsProveedorContenedoraComponent', () => {
  let component: AgregarsProveedorContenedoraComponent;
  let fixture: ComponentFixture<AgregarsProveedorContenedoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarsProveedorContenedoraComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarsProveedorContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
