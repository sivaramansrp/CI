import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActualizacionImportacionSanitariaComponent } from './actualizacion-importacion-sanitaria.component';
import { PERMISO_MAQUILA } from '../../constantes/actualizacion-importacion-sanitaria.enum';

describe('ActualizacionImportacionSanitariaComponent', () => {
  let component: ActualizacionImportacionSanitariaComponent;
  let fixture: ComponentFixture<ActualizacionImportacionSanitariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizacionImportacionSanitariaComponent],
      imports:[PERMISO_MAQUILA]
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizacionImportacionSanitariaComponent);
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
