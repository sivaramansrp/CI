import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroExportadorAutorizadoComponent } from './registro-exportador-autorizado.component';

import { InputRadioComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

describe('RegistroExportadorAutorizadoComponent', () => {
  let component: RegistroExportadorAutorizadoComponent;
  let fixture: ComponentFixture<RegistroExportadorAutorizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RegistroExportadorAutorizadoComponent,
        CommonModule,
        ReactiveFormsModule,
        InputRadioComponent,
        TituloComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroExportadorAutorizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.registroExportadorForm).toBeDefined();
    expect(component.registroExportadorForm.get('solicitaSeparacionContable')?.value).toBeFalsy();
    expect(component.registroExportadorForm.get('solicitaExportadorAutorizado')?.value).toBeFalsy();
    expect(component.registroExportadorForm.get('condicionExportador')?.value).toBe('');
    expect(component.registroExportadorForm.get('solicitaExportadorAutorizadoJPN')?.value).toBeFalsy();
    expect(component.registroExportadorForm.get('condicionExportadorJPN')?.value).toBe('');
  });

  it('should update showDivExportador when solicitaExportadorAutorizado changes', () => {
    const SOLICITA_EXPORTADOR_AUTORIZADO_CONTROL = component.registroExportadorForm.get('solicitaExportadorAutorizado');
    SOLICITA_EXPORTADOR_AUTORIZADO_CONTROL?.setValue(true);
    component.onSolicitaExportadorAutorizadoChange({ target: { checked: true } } as unknown as Event);
    expect(component.showDivExportador).toBe(true);

    SOLICITA_EXPORTADOR_AUTORIZADO_CONTROL?.setValue(false);
    component.onSolicitaExportadorAutorizadoChange({ target: { checked: false } } as unknown as Event);
    expect(component.showDivExportador).toBeFalsy();
  });

  it('should update showDivExportadorJPN when solicitaExportadorAutorizadoJPN changes', () => {
    const SOLICITA_EXPORTADOR_AUTORIZADO_JPN_CONTROL = component.registroExportadorForm.get('solicitaExportadorAutorizadoJPN');
    SOLICITA_EXPORTADOR_AUTORIZADO_JPN_CONTROL?.setValue(true);
    component.onSolicitaExportadorAutorizadoJPNChange({ target: { checked: true } } as unknown as Event);
    expect(component.showDivExportadorJPN).toBe(true);

    SOLICITA_EXPORTADOR_AUTORIZADO_JPN_CONTROL?.setValue(false);
    component.onSolicitaExportadorAutorizadoJPNChange({ target: { checked: false } } as unknown as Event);
    expect(component.showDivExportadorJPN).toBeFalsy();
  });

  it('should update condicionExportador when onCambioCondicionExportador is called', () => {
    component.onCambioCondicionExportador('new value');
    expect(component.registroExportadorForm.get('condicionExportador')?.value).toBe('new value');
  });

  it('should update condicionExportadorJPN when onCambioCondicionExportadorJPN is called', () => {
    component.onCambioCondicionExportadorJPN('new value');
    expect(component.registroExportadorForm.get('condicionExportadorJPN')?.value).toBe('new value');
  });
});