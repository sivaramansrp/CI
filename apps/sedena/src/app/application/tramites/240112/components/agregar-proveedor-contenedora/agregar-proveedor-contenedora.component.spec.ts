import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarProveedorContenedoraComponent } from './agregar-proveedor-contenedora.component';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AgregarProveedorComponent } from '../../../../shared/components/agregar-proveedor/agregar-proveedor.component';

describe('AgregarProveedorContenedoraComponent', () => {
  let component: AgregarProveedorContenedoraComponent;
  let fixture: ComponentFixture<AgregarProveedorContenedoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations:[AgregarProveedorContenedoraComponent],
      imports: [HttpClientTestingModule,AgregarProveedorComponent],
      providers: [DatosSolicitudService],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarProveedorContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
