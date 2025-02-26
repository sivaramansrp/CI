import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepresentacionFederalComponent } from './representacion-federal.component';

describe('RepresentacionFederalComponent', () => {
  let component: RepresentacionFederalComponent;
  let fixture: ComponentFixture<RepresentacionFederalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepresentacionFederalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentacionFederalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('debería inicializar el formulario correctamente', () => {
    expect(component.representacionForm).toBeDefined();
    expect(component.representacionForm.get('entidad')).toBeDefined();
    expect(component.representacionForm.get('representacion')).toBeDefined();
  });

  it('debería definir el método entidadoOnChange', () => {
    expect(component.entidadoOnChange).toBeDefined();
  });

  it('debería definir el método representacionOnChange', () => {
    expect(component.representacionOnChange).toBeDefined();
  });
});
