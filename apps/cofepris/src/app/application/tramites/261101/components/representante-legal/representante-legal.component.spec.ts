import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RepresentanteLegalComponent } from './representante-legal.component';
import { By } from '@angular/platform-browser';

describe('RepresentanteLegalComponent', () => {
  let component: RepresentanteLegalComponent;
  let fixture: ComponentFixture<RepresentanteLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RepresentanteLegalComponent], // Importar el componente aquí
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentanteLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el grupo de formulario', () => {
    expect(component.domicilioEstablecimiento).toBeInstanceOf(FormGroup);
    expect(component.domicilioEstablecimiento.controls['representanteLegalRFC']).toBeTruthy();
    expect(component.domicilioEstablecimiento.controls['buscar']).toBeTruthy();
    expect(component.domicilioEstablecimiento.controls['representanteLegalNombre']).toBeTruthy();
    expect(component.domicilioEstablecimiento.controls['representanteLegalApPaterno']).toBeTruthy();
    expect(component.domicilioEstablecimiento.controls['representanteLegalApMaterno']).toBeTruthy();
  });

  it('debería renderizar correctamente los inputs del formulario', () => {
    const representanteLegalRFCInput = fixture.debugElement.query(By.css('#representanteLegalRFCPostal'));
    const buscarInput = fixture.debugElement.query(By.css('#buscar'));
    const representanteLegalNombreInput = fixture.debugElement.query(By.css('#representanteLegalNombre'));
    const representanteLegalApPaternoInput = fixture.debugElement.query(By.css('#representanteLegalApMaterno'));

    expect(representanteLegalRFCInput).toBeTruthy();
    expect(buscarInput).toBeTruthy();
    expect(representanteLegalNombreInput).toBeTruthy();
    expect(representanteLegalApPaternoInput).toBeTruthy();
  });

  it('debería llamar a setValoresStore cuando un input cambia', () => {
    jest.spyOn(component, 'setValoresStore');
    const representanteLegalRFCInput = fixture.debugElement.query(By.css('#representanteLegalRFCPostal')).nativeElement;

    representanteLegalRFCInput.value = 'representanteLegalRFC123';
    representanteLegalRFCInput.dispatchEvent(new Event('change'));

    expect(component.setValoresStore).toHaveBeenCalledWith(component.domicilioEstablecimiento, 'representanteLegalRFC');
  });

  it('debería actualizar el valor del control del formulario cuando se llama setValoresStore', () => {
    component.setValoresStore(component.domicilioEstablecimiento, 'representanteLegalRFC');
    expect(component.domicilioEstablecimiento.get('representanteLegalRFC')?.value).toBe('representanteLegalRFC123');
  });

  it('debería manejar renderizado condicional (si aplica)', () => {
    // Agregar pruebas para cualquier elemento condicional en la plantilla
  });

  it('debería manejar entradas inválidas del formulario de manera adecuada', () => {
    component.domicilioEstablecimiento.get('representanteLegalRFC')?.setValue('');
    expect(component.domicilioEstablecimiento.valid).toBeFalsy();
  });
});
