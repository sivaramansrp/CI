import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RecuperacionCuentaService } from '../../../estados/RecuperacionCuentaResponse';
import { RecuperacionStore } from '../../../estados/RecuperacionState.store';
import { Router } from '@angular/router';

/**
 * Componente para manejar la recuperación de contraseña
 * Maneja diferentes flujos según nacionalidad y tipo de persona
 */
@Component({
  selector: 'app-mantenimiento-cuenta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [RecuperacionStore],
  templateUrl: './mantenimiento-cuenta.component.html',
  styleUrls: ['./mantenimiento-cuenta.component.scss']
})
export class MantenimientoCuentaComponent implements OnInit, OnDestroy {
  /** Formulario reactivo para la recuperación de cuenta */
  public recuperarForm!: FormGroup;
  
  /** Mensaje de alerta para mostrar estados y errores */
  public mensajeAlerta: string | null = null;
  
  /** Tab activa actual (nacional/extranjero) */
  public activeTab: 'nacional' | 'extranjero' = 'nacional';
  
  /** Subject para manejar la limpieza de suscripciones */
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly recuperacionStore: RecuperacionStore,
    private readonly recuperacionService: RecuperacionCuentaService
  ) {}

  /** Inicialización del componente */
  public ngOnInit(): void {
    this.initializeForm();
    this.subscribeToFormChanges();
  }

  /** Limpieza al destruir el componente */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Verifica si la nacionalidad es mexicana
   * @returns boolean
   */
  public isMexicana(): boolean {
    return this.recuperarForm.get('nacionalidad')?.value === true;
  }

  /**
   * Maneja el envío del formulario
   */
  public onSubmit(): void {
    if (this.recuperarForm.valid && this.isValidFlow()) {
      const FORM_DATA = this.recuperarForm.value;
      this.updateStore();
      
      this.recuperacionService.recuperarCuenta(FORM_DATA)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.mensajeAlerta = `Recuperación exitosa - Correo: ${response.correo}, Usuario: ${response.usuario}`;
          },
          error: (error) => {
            this.mensajeAlerta = 'Error al recuperar la cuenta. Por favor intente nuevamente.';
            console.error('Error en recuperación:', error);
          }
        });
    } else {
      this.mensajeAlerta = 'Por favor complete todos los campos requeridos';
      this.recuperarForm.markAllAsTouched();
    }
  }

  /**
   * Navega a la página de login
   */
  public onSalir(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Inicializa el formulario con valores por defecto
   * @private
   */
  private initializeForm(): void {
    this.recuperarForm = this.fb.group({
      nacionalidad: [null, Validators.required],
      tipoDocumento: [null],
      tipoPersona: [null],
      usuario: [''],
      nombre: [''],
      primerApellido: [''],
      segundoApellido: [''],
      razonSocial: [''],
      codigoPostal: [''],
      estado: [''],
      pais: ['']
    });
  }

  /**
   * Suscribe a los cambios del formulario
   * @private
   */
  private subscribeToFormChanges(): void {
    // Suscripción a cambios en nacionalidad
    this.recuperarForm.get('nacionalidad')?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged()
      )
      .subscribe(esNacional => {
        this.clearAlertMessage();
        this.activeTab = esNacional ? 'nacional' : 'extranjero';
        this.resetFormFields();
        
        if (!esNacional) {
          this.handleExtranjeroValidations();
        }
        this.updateStore();
      });

    // Suscripción a cambios en tipo de documento
    this.recuperarForm.get('tipoDocumento')?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged()
      )
      .subscribe(tipoDoc => {
        this.clearAlertMessage();
        this.resetDependentFields();
        
        if (this.isMexicana()) {
          this.updateValidationsByDocType(tipoDoc);
          this.updateStore();
        }
      });

    // Suscripción a cambios en tipo de persona
    this.recuperarForm.get('tipoPersona')?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged()
      )
      .subscribe(tipo => {
        this.clearAlertMessage();
        this.resetPersonTypeFields(tipo);
        
        if (this.isMexicana() && this.recuperarForm.get('tipoDocumento')?.value === 'RFC') {
          this.updateValidationsByDocType('RFC');
        } else if (!this.isMexicana()) {
          this.updateExtranjeroValidations(tipo);
        }
        
        this.updateStore();
      });
  }

  /**
   * Limpia el mensaje de alerta
   * @private
   */
  private clearAlertMessage(): void {
    this.mensajeAlerta = null;
  }

  /**
   * Resetea los campos del formulario
   * @private
   */
  private resetFormFields(): void {
    const FIELDS_TO_RESET = [
      'tipoDocumento',
      'tipoPersona',
      'usuario',
      'nombre',
      'primerApellido',
      'segundoApellido',
      'razonSocial',
      'codigoPostal',
      'estado',
      'pais'
    ];

    FIELDS_TO_RESET.forEach(field => {
      this.recuperarForm.get(field)?.reset();
      this.recuperarForm.get(field)?.clearValidators();
      this.recuperarForm.get(field)?.updateValueAndValidity({ emitEvent: false });
    });
  }

  /**
   * Resetea campos dependientes del tipo de persona
   * @private
   */
  private resetPersonTypeFields(tipo: 'fisica' | 'moral' | null): void {
    if (tipo === 'fisica') {
      this.recuperarForm.get('razonSocial')?.reset();
    } else {
      ['nombre', 'primerApellido', 'segundoApellido'].forEach(field => {
        this.recuperarForm.get(field)?.reset();
      });
    }
  }

  /**
   * Resetea los campos dependientes cuando cambia el tipo de documento
   * @private
   */
  private resetDependentFields(): void {
    const FIELDS_TO_RESET = [
      'usuario',
      'nombre',
      'primerApellido',
      'segundoApellido',
      'razonSocial',
      'tipoPersona'
    ];

    FIELDS_TO_RESET.forEach(field => {
      this.recuperarForm.get(field)?.reset();
      this.recuperarForm.get(field)?.clearValidators();
      this.recuperarForm.get(field)?.updateValueAndValidity({ emitEvent: false });
    });
  }

  /**
   * Actualiza validaciones para extranjeros
   * @private
   */
  private handleExtranjeroValidations(): void {
  // Habilitar el campo de tipo de persona
  this.recuperarForm.get('tipoPersona')?.enable();
  
  // Limpiar validaciones previas
  this.resetFormFields();
  
  const TIPO = this.recuperarForm.get('tipoPersona')?.value;
  if (TIPO) {
    this.updateExtranjeroValidations(TIPO);
  }
}

  /**
   * Actualiza validaciones según tipo de documento
   * @param tipoDoc - Tipo de documento (RFC/CURP)
   * @private
   */
  private updateValidationsByDocType(tipoDoc: 'RFC' | 'CURP' | null): void {
  if (!tipoDoc) {
    return;
  }

  // Limpiar validaciones previas
  Object.keys(this.recuperarForm.controls).forEach(key => {
    this.recuperarForm.get(key)?.clearValidators();
    this.recuperarForm.get(key)?.updateValueAndValidity({ emitEvent: false });
  });

  const REQUIRED_VALIDATOR = [Validators.required, Validators.minLength(1)];

  if (tipoDoc === 'RFC') {
    // Habilitar selección de tipo de persona para RFC
    this.recuperarForm.get('tipoPersona')?.enable();
    
    // Validar según el tipo de persona
    const TIPOPERSONA = this.recuperarForm.get('tipoPersona')?.value;
    
    if (TIPOPERSONA === 'fisica') {
      ['usuario', 'nombre', 'primerApellido', 'segundoApellido'].forEach(field => {
        this.recuperarForm.get(field)?.setValidators(REQUIRED_VALIDATOR);
        this.recuperarForm.get(field)?.updateValueAndValidity({ emitEvent: false });
      });
    } else if (TIPOPERSONA === 'moral') {
      ['usuario', 'razonSocial'].forEach(field => {
        this.recuperarForm.get(field)?.setValidators(REQUIRED_VALIDATOR);
        this.recuperarForm.get(field)?.updateValueAndValidity({ emitEvent: false });
      });
    }
  } else if (tipoDoc === 'CURP') {
    // Para CURP, deshabilitar tipo de persona y establecer validaciones
    this.recuperarForm.get('tipoPersona')?.disable();
    this.recuperarForm.get('tipoPersona')?.setValue(null, { emitEvent: false });
    
    ['usuario', 'nombre', 'primerApellido', 'segundoApellido'].forEach(field => {
      this.recuperarForm.get(field)?.setValidators(REQUIRED_VALIDATOR);
      this.recuperarForm.get(field)?.updateValueAndValidity({ emitEvent: false });
    });
  }

  // Forzar actualización del formulario
  this.recuperarForm.updateValueAndValidity();
}

  /**
   * Actualiza validaciones para extranjeros
   * @private
   */
  private updateExtranjeroValidations(TIPO: 'fisica' | 'moral'): void {
  const REQUIRED_VALIDATOR = [Validators.required, Validators.minLength(1)];
  const CAMPOS_COMUNES = ['codigoPostal', 'estado', 'pais'];
  
  // Limpiar validaciones previas
  Object.keys(this.recuperarForm.controls).forEach(key => {
    this.recuperarForm.get(key)?.clearValidators();
    this.recuperarForm.get(key)?.updateValueAndValidity({ emitEvent: false });
  });

  // Establecer validaciones según tipo de persona
  if (TIPO === 'fisica') {
    ['nombre', 'primerApellido', ...CAMPOS_COMUNES].forEach(field => {
      this.recuperarForm.get(field)?.setValidators(REQUIRED_VALIDATOR);
      this.recuperarForm.get(field)?.updateValueAndValidity({ emitEvent: false });
    });
  } else {
    ['razonSocial', ...CAMPOS_COMUNES].forEach(field => {
      this.recuperarForm.get(field)?.setValidators(REQUIRED_VALIDATOR);
      this.recuperarForm.get(field)?.updateValueAndValidity({ emitEvent: false });
    });
  }

  // Forzar actualización del formulario
  this.recuperarForm.updateValueAndValidity();
}

  /**
   * Establece validadores para campos específicos
   * @private
   */
  private setValidatorsForFields(CAMPOS: string[]): void {
    // Limpiar validadores existentes
    Object.keys(this.recuperarForm.controls).forEach(key => {
      this.recuperarForm.get(key)?.clearValidators();
      this.recuperarForm.get(key)?.updateValueAndValidity({ emitEvent: false });
    });

    // Establecer nuevos validadores
    CAMPOS.forEach(field => {
      this.recuperarForm.get(field)?.setValidators([Validators.required]);
      this.recuperarForm.get(field)?.updateValueAndValidity({ emitEvent: false });
    });

    // Forzar actualización del formulario
    this.recuperarForm.updateValueAndValidity();
  }

  /**
   * Actualiza el store con los datos del formulario
   * @private
   */
  private updateStore(): void {
    const FORM_DATA = this.recuperarForm.value;
    
    this.recuperacionStore.update(state => ({
      ...state,
      activeTab: this.activeTab,
      formData: FORM_DATA
    }));
  }

  /**
   * Verifica si el flujo actual es válido según las reglas de negocio
   * @returns boolean
   */
  public isValidFlow(): boolean {
    const FORM_VALUE = this.recuperarForm.value;
    
    if (this.isMexicana()) {
      // Flujo RFC Física
      if (FORM_VALUE.tipoDocumento === 'RFC' && FORM_VALUE.tipoPersona === 'fisica') {
        return this.isValidNationalRfcPersonaFisica();
      }
      
      // Flujo CURP
      if (FORM_VALUE.tipoDocumento === 'CURP') {
        return this.isValidNationalCurp();
      }

      // Flujo RFC Moral
      if (FORM_VALUE.tipoDocumento === 'RFC' && FORM_VALUE.tipoPersona === 'moral') {
        return this.isValidNationalRfcPersonaMoral();
      }
    }

    // Flujo Extranjero
    return this.isValidForeignFlow();
  }

  /**
   * Valida el flujo específico para RFC persona física nacional
   * @returns boolean
   * @private
   */
  private isValidNationalRfcPersonaFisica(): boolean {
    const FORM_VALUE = this.recuperarForm.value;
    const HAS_REQUIRED_FIELDS = Boolean(
      FORM_VALUE.usuario?.trim() &&
      FORM_VALUE.nombre?.trim() &&
      FORM_VALUE.primerApellido?.trim() &&
      FORM_VALUE.segundoApellido?.trim()
    );

    return HAS_REQUIRED_FIELDS;
  }

  /**
   * Valida el flujo específico para RFC persona moral nacional
   * @returns boolean
   * @private
   */
  private isValidNationalRfcPersonaMoral(): boolean {
    const FORM_VALUE = this.recuperarForm.value;
    return Boolean(
      FORM_VALUE.usuario?.trim() &&
      FORM_VALUE.razonSocial?.trim()
    );
  }

  /**
   * Valida el flujo CURP nacional
   * @returns boolean
   * @private
   */
  private isValidNationalCurp(): boolean {
    const FORM_VALUE = this.recuperarForm.value;
    const HAS_REQUIRED_FIELDS = Boolean(
      FORM_VALUE.usuario?.trim() &&
      FORM_VALUE.nombre?.trim() &&
      FORM_VALUE.primerApellido?.trim() &&
      FORM_VALUE.segundoApellido?.trim()
    );

    return HAS_REQUIRED_FIELDS;
  }

  /**
   * Valida el flujo extranjero
   * @private
   */
  private isValidForeignFlow(): boolean {
    if (!this.recuperarForm.get('tipoPersona')?.value) {
      return false;
    }
    
    return this.recuperarForm.get('tipoPersona')?.value === 'fisica'
      ? this.isValidForeignPersonaFisica()
      : this.isValidForeignPersonaMoral();
  }

  /**
   * Valida el flujo para persona física extranjera
   * @returns boolean
   * @private
   */
  private isValidForeignPersonaFisica(): boolean {
    const FORM_VALUE = this.recuperarForm.value;
    return Boolean(
      FORM_VALUE.nombre?.trim() &&
      FORM_VALUE.primerApellido?.trim() &&
      FORM_VALUE.codigoPostal?.trim() &&
      FORM_VALUE.estado?.trim() &&
      FORM_VALUE.pais?.trim()
    );
  }

  /**
   * Valida el flujo para persona moral extranjera
   * @returns boolean
   * @private
   */
  private isValidForeignPersonaMoral(): boolean {
    const FORM_VALUE = this.recuperarForm.value;
    return Boolean(
      FORM_VALUE.razonSocial?.trim() &&
      FORM_VALUE.codigoPostal?.trim() &&
      FORM_VALUE.estado?.trim() &&
      FORM_VALUE.pais?.trim()
    );
  }
}