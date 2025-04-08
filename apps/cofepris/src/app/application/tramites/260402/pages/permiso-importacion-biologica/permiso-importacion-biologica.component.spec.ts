import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermisoImportacionBiologicaComponent } from './permiso-importacion-biologica.component';
import { PERMISO_MAQUILA } from '../../constantes/permiso-importacion-biologica.enum';

describe('PermisoImportacionBiologicaComponent', () => {
  let component: PermisoImportacionBiologicaComponent;
  let fixture: ComponentFixture<PermisoImportacionBiologicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermisoImportacionBiologicaComponent],
      imports:[PERMISO_MAQUILA]
    }).compileComponents();

    fixture = TestBed.createComponent(PermisoImportacionBiologicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pantallasPasos with PERMISO_MAQUILA', () => {
    expect(component.pantallasPasos).toEqual(PERMISO_MAQUILA);
  });

  it('should have initial indice value set to 1', () => {
    expect(component.indice).toBe(1);
  });
});
