import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SeleccionDelCupoComponent } from './seleccion-del-cupo.component';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';

describe('SeleccionDelCupoComponent', () => {
  let component: SeleccionDelCupoComponent;
  let fixture: ComponentFixture<SeleccionDelCupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent],
      declarations: [SeleccionDelCupoComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionDelCupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario correctamente', () => {
    component.ngOnInit();
    expect(component.seleccionForm).toBeDefined();
    expect(component.seleccionForm.controls['regimen']).toBeDefined();
    expect(component.seleccionForm.controls['tratado']).toBeDefined();
    expect(component.seleccionForm.controls['producto']).toBeDefined();
    expect(component.seleccionForm.controls['subproducto']).toBeDefined();
  });

  it('debería tener valores iniciales vacíos en el formulario', () => {
    component.ngOnInit();
    expect(component.seleccionForm.value).toEqual({
      regimen: '',
      tratado: '',
      producto: '',
      subproducto: ''
    });
  });

  it('debería manejar el cambio de régimen', () => {
    spyOn(component, 'regimenOnChange');
    const event = new Event('change');
    component.regimenOnChange(event);
    expect(component.regimenOnChange).toHaveBeenCalledWith(event);
  });

  it('debería manejar el cambio de tratado', () => {
    spyOn(component, 'tratadoOnChange');
    const event = new Event('change');
    component.tratadoOnChange(event);
    expect(component.tratadoOnChange).toHaveBeenCalledWith(event);
  });

  it('debería manejar el cambio de producto', () => {
    spyOn(component, 'productoOnChange');
    const event = new Event('change');
    component.productoOnChange(event);
    expect(component.productoOnChange).toHaveBeenCalledWith(event);
  });

  it('debería manejar el cambio de subproducto', () => {
    spyOn(component, 'subproductoOnChange');
    const event = new Event('change');
    component.subproductoOnChange(event);
    expect(component.subproductoOnChange).toHaveBeenCalledWith(event);
  });
});