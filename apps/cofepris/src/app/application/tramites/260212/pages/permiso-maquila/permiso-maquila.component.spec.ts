import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermisoMaquilaComponent } from './permiso-maquila.component';
import { PERMISO_MAQUILA } from '../../constantes/permiso-maquila.enum';

describe('PermisoMaquilaComponent', () => {
  let component: PermisoMaquilaComponent;
  let fixture: ComponentFixture<PermisoMaquilaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermisoMaquilaComponent],
      imports:[PERMISO_MAQUILA]
    }).compileComponents();

    fixture = TestBed.createComponent(PermisoMaquilaComponent);
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
