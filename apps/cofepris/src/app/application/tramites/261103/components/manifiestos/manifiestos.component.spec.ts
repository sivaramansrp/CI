import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ManifiestosComponent } from './manifiestos.component';
import { By } from '@angular/platform-browser';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';

describe('ManifiestosComponent', () => {
  let componente: ManifiestosComponent;
  let fixture: ComponentFixture<ManifiestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ManifiestosComponent, InputRadioComponent],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {  
    fixture = TestBed.createComponent(ManifiestosComponent);
    componente = fixture.componentInstance;
    // componente.manifestoDeVeracidad = 'Test Manifesto';
    componente.radioOptions = [
      { label: 'Opción 1', value: 'Opción 1' },
      { label: 'Opción 2', value: 'Opción 2' },
    ];
    componente.declaracionEstaMarcado = true;
    componente.Aduana = new FormBuilder().group({
      aduanas: [false],
      informacionConfidencial: [''],
    });

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería renderizar el texto de manifestoDeVeracidad', () => {
    const ETIQUETA = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(ETIQUETA.textContent.trim()).toContain('Test Manifesto');
  });

  it('debería vincular el checkbox al control del formulario', () => {
    const CHECKBOX = fixture.debugElement.query(By.css('input[type="checkbox"]')).nativeElement;
    expect(CHECKBOX.checked).toBe(true);
    CHECKBOX.click();
    fixture.detectChanges();
    expect(componente.Aduana.get('aduanas')?.value).toBe(false);
  });

  it('debería vincular las opciones de radio al control del formulario', () => {
    const COMPONENTE_RADIO = fixture.debugElement.query(By.directive(InputRadioComponent)).componentInstance;
    expect(COMPONENTE_RADIO.radioOptions).toEqual(['Opción 1', 'Opción 2']);
    expect(COMPONENTE_RADIO.layout).toBe('horizontal');
  });

  it('debería llamar a setValoresStore al cambiar el radio', () => {
    const ESPIA = jest.spyOn(componente, 'setValoresStore');
    const COMPONENTE_RADIO = fixture.debugElement.query(By.directive(InputRadioComponent)).componentInstance;
    COMPONENTE_RADIO.change.emit('Opción 1');
    fixture.detectChanges();
    expect(ESPIA).toHaveBeenCalledWith(componente.Aduana, 'informacionConfidencial');
  });
});