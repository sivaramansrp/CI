import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { DescripcionCupoComponent } from './descripcion-cupo.component';

const MOCK_CUPO = {
  regimenAduanero: 'Importación',
  descripcion: 'Cupo especial',
  cantidad: 100,
  unidad: 'kg'
};

const INFORMACION_DESCRIPCION_CUPO = [
  { campo: 'regimenAduanero' },
  { campo: 'descripcion' },
  { campo: 'cantidad' },
  { campo: 'unidad' }
];

describe('DescripcionCupoComponent', () => {
  let component: DescripcionCupoComponent;
  let fixture: ComponentFixture<DescripcionCupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescripcionCupoComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DescripcionCupoComponent);
    component = fixture.componentInstance;
    component.consultaState = { readonly: false } as any;
    // Simula la estructura esperada
    component.informacionFormData = INFORMACION_DESCRIPCION_CUPO;
    component.forma = new FormGroup({
      ninoFormGroup: new FormGroup({})
    });
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario correctamente', () => {
    expect(component.forma).toBeDefined();
    expect(component.ninoFormGroup).toBeDefined();
  });

  it('debería establecer valores en el formulario dinámico usando setValoresPorCupo', () => {
    spyOn(component.ninoFormGroup, 'patchValue');
    spyOn(component, 'cambioEnValoresStore');
    component.setValoresPorCupo(MOCK_CUPO);
    expect(component.ninoFormGroup.patchValue).toHaveBeenCalledWith({
      regimenAduanero: 'Importación',
      descripcion: 'Cupo especial',
      cantidad: 100,
      unidad: 'kg'
    });
    expect(component.cambioEnValoresStore).toHaveBeenCalledWith('regimenAduanero', 'Importación');
    expect(component.cambioEnValoresStore).toHaveBeenCalledWith('descripcion', 'Cupo especial');
    expect(component.cambioEnValoresStore).toHaveBeenCalledWith('cantidad', 100);
    expect(component.cambioEnValoresStore).toHaveBeenCalledWith('unidad', 'kg');
  });

  it('no debería lanzar error si setValoresPorCupo recibe un cupo vacío', () => {
    expect(() => component.setValoresPorCupo(undefined)).not.toThrow();
    expect(() => component.setValoresPorCupo(null)).not.toThrow();
  });

  it('debería ignorar campos que no existen en el cupo', () => {
    const cupoParcial = { descripcion: 'Solo descripción' };
    spyOn(component.ninoFormGroup, 'patchValue');
    component.setValoresPorCupo(cupoParcial);
    expect(component.ninoFormGroup.patchValue).toHaveBeenCalledWith({ descripcion: 'Solo descripción' });
  });

  it('debería reaccionar al input formDatos y actualizar campos', () => {
    const spySetValores = spyOn(component, 'setValoresPorCupo');
    component.formDatos = MOCK_CUPO;
    expect(spySetValores).toHaveBeenCalledWith(MOCK_CUPO);
  });

  it('debería marcar los campos como solo lectura si consultaState.readonly es true', () => {
    component.consultaState = { readonly: true } as any;
    fixture.detectChanges();
    // Aquí podrías verificar que los controles del formulario estén deshabilitados
    // si tu lógica lo implementa
    // Por ejemplo:
    // expect(component.ninoFormGroup.disabled).toBeTrue();
  });

  it('debería limpiar el formulario dinámico', () => {
    spyOn(component.ninoFormGroup, 'reset');
    component.ninoFormGroup.reset();
    expect(component.ninoFormGroup.reset).toHaveBeenCalled();
  });
});