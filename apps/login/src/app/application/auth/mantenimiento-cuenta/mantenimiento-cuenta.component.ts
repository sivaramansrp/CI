import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import { CommonModule } from '@angular/common';
import { Notificacion} from '@libs/shared/data-access-user/src';
import { NotificacionesComponent } from "@libs/shared/data-access-user/src/tramites/components/notificaciones/notificaciones.component";
import { RecuperacionCuentaService } from '../../../estados/RecuperacionCuentaResponse';
import { RecuperacionStore } from '../../../estados/RecuperacionState.store';
import { Router } from '@angular/router';
import { TipoPersona } from '@libs/shared/data-access-user/src';

/**
 * Componente para manejar la recuperación de contraseña
 * Maneja diferentes flujos según nacionalidad y tipo de persona
 */
@Component({
  selector: 'app-mantenimiento-cuenta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotificacionesComponent],
  providers: [RecuperacionStore],
  templateUrl: './mantenimiento-cuenta.component.html',
  styleUrls: ['./mantenimiento-cuenta.component.scss']
})
export class MantenimientoCuentaComponent implements OnInit, OnDestroy {
  /** 
   * Expresiones regulares para las diferentes validaciones del formulario
   * @private
   */
  private readonly REGEX = {
      /** Regex para validar RFC de persona física mexicana */
      RFC_MEXICANOFISICA: /^([A-ZÑ&]{4}\d{6}[A-Z0-9]{3})$/,
      /** Regex para validar RFC de persona moral mexicana */
      RFC_MEXICANOMORAL: /^([A-ZÑ&]{3}\d{6}[A-Z0-9]{3})$/,
      /** Regex para validar RFC de extranjero */
      RFC_EXTRANJERO: /^([A-Z&]{4})(\d{6})([A-Z0-9]{3})$/,
      /** Regex para validar CURP */
      CURP: /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
      /** Regex para validar código postal mexicano */
      CP_MEXICANO: /^(0[1-9]|[1-4][0-9]|5[0-2])[0-9]{3}$/,
      /** Regex para validar código postal extranjero */
      CP_EXTRANJERO: /^[A-Za-z0-9- ]{3,10}$/
  };
  /** Formulario reactivo para la recuperación de cuenta */
  public recuperarForm!: FormGroup;
  /** Enum de TipoPersona para usar en el template */
  public readonly Persona = TipoPersona;
  
/** Notificación para mostrar alertas */
public nuevaAlertaNotificacion: Notificacion | null = null;
  
  /** Tab activa actual (nacional/extranjero) */
  public activeTab: 'nacional' | 'extranjero' = 'nacional';
  
  /** Subject para manejar la limpieza de suscripciones */
  private readonly destroy$ = new Subject<void>();

  /** Constructor del componente */
  constructor(
    /** FormBuilder para crear el formulario reactivo */
  private readonly fb: FormBuilder,
    /** Router para la navegación */
    private readonly router: Router,
    /** Store para el estado de recuperación */
    private readonly recuperacionStore: RecuperacionStore,
    /** Servicio para recuperación de cuenta */
    private readonly recuperacionService: RecuperacionCuentaService,
    /** Change detector para forzar detección de cambios */
    private readonly cdr: ChangeDetectorRef
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
    if (this.recuperarForm.valid && this.flujoValido()) {
      const FORM_DATA = this.recuperarForm.value;
      this.updateStore();
      
      this.recuperacionService.recuperarCuenta(FORM_DATA)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if(response.correo !== '' || response.usuario !== '') {
              this.nuevaAlertaNotificacion = {
                  tipoNotificacion: 'alert',
                  categoria: 'success',
                  modo: 'action',
                  titulo: 'Éxito',
                  mensaje: `Recuperación exitosa - Correo: ${response.correo}, Usuario: ${response.usuario}`,
                  cerrar: false,
                  tiempoDeEspera: 2000,
                  txtBtnAceptar: 'Aceptar',
                  txtBtnCancelar: ''
              };
              this.cdr.detectChanges();
            }else {
              this.nuevaAlertaNotificacion = {
                  tipoNotificacion: 'alert',
                  categoria: 'danger',
                  modo: 'action',
                  titulo: 'Éxito',
                  mensaje: `No se encontró información de recuperación para el usuario: ${response.usuario}. Por favor, verifique los datos ingresados.`,
                  cerrar: false,
                  tiempoDeEspera: 2000,
                  txtBtnAceptar: 'Aceptar',
                  txtBtnCancelar: ''
              };
              this.cdr.detectChanges();
            }            
          },
          error: (error) => {            
            this.nuevaAlertaNotificacion = {
                tipoNotificacion: 'alert',
                categoria: 'danger',
                modo: 'action',
                titulo: 'Error',
                mensaje: 'Error al recuperar la cuenta. Por favor intente nuevamente.' + error.message,
                cerrar: false,
                tiempoDeEspera: 2000,
                txtBtnAceptar: 'Aceptar',
                txtBtnCancelar: ''
            };
            this.cdr.detectChanges();
          }
        });
    } else {      
      this.nuevaAlertaNotificacion = {
                tipoNotificacion: 'alert',
                categoria: 'danger',
                modo: 'action',
                titulo: 'Error',
                mensaje: 'Por favor complete todos los campos requeridos.' ,
                cerrar: false,
                tiempoDeEspera: 2000,
                txtBtnAceptar: 'Aceptar',
                txtBtnCancelar: ''
            };
            this.cdr.detectChanges();
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
      personaTipo: [''],
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
   * Suscribe a los cambios en los campos del formulario
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
    this.recuperarForm.get('personaTipo')?.valueChanges
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

     // Suscripción a campos de RFC Persona Moral
    const RFC_MORAL_FIELDS = ['usuario', 'razonSocial'];
    RFC_MORAL_FIELDS.forEach(field => {
        this.recuperarForm.get(field)?.valueChanges
            .pipe(
                takeUntil(this.destroy$),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (this.isMexicana() && 
                    this.recuperarForm.get('tipoDocumento')?.value === 'RFC' && 
                    this.recuperarForm.get('personaTipo')?.value === TipoPersona.MORAL) {
                    this.isValidNationalRfcPersonaMoral();
                    this.recuperarForm.updateValueAndValidity();
                    this.cdr.detectChanges();
                }
            });
    });
    
    //Suscripción a campos de RFC Persona Física
    const RFC_FISICA_FIELDS = ['usuario', 'nombre', 'primerApellido', 'segundoApellido'];
    RFC_FISICA_FIELDS.forEach(field => {
        this.recuperarForm.get(field)?.valueChanges
            .pipe(
                takeUntil(this.destroy$),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (this.isMexicana() && 
                    this.recuperarForm.get('tipoDocumento')?.value === 'RFC' && 
                    this.recuperarForm.get('personaTipo')?.value === TipoPersona.FISICA) {                    
                    this.recuperarForm.updateValueAndValidity();
                    this.cdr.detectChanges();
                }
            });
    });
  }

  /**
   * Limpia el mensaje de alerta
   * @private
   */
  private clearAlertMessage(): void {
    this.nuevaAlertaNotificacion = null;    
  }

  /**
   * Resetea los campos del formulario a su estado inicial
   * @private
   */
  private resetFormFields(): void {
    const FIELDS_TO_RESET = [
      'tipoDocumento',
      'personaTipo',
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
   * @param tipo - Tipo de persona (FISICA/MORAL/null)
   * @private
   */
  private resetPersonTypeFields(tipo: TipoPersona.FISICA | TipoPersona.MORAL | null): void {
    if (tipo === TipoPersona.FISICA) {
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
      'personaTipo'
    ];

    FIELDS_TO_RESET.forEach(field => {
      this.recuperarForm.get(field)?.reset();
      this.recuperarForm.get(field)?.clearValidators();
      this.recuperarForm.get(field)?.updateValueAndValidity({ emitEvent: false });
    });
  }

  /**
   * Maneja las validaciones específicas para usuarios extranjeros
   * @private
   */
  private handleExtranjeroValidations(): void {
    // Habilitar el campo de tipo de persona
    this.recuperarForm.get('personaTipo')?.enable();
    
    // Limpiar validaciones previas
    this.resetFormFields();
    
    const TIPO = this.recuperarForm.get('personaTipo')?.value;
    if (TIPO) {
      this.updateExtranjeroValidations(TIPO);
    }
  }

  /**
   * Actualiza el estado del formulario y validaciones según tipo de documento
   * @param tipoDoc - Tipo de documento (RFC/CURP)
   * @private
   */
    private updateValidationsByDocType(tipoDoc: 'RFC' | 'CURP' | null): void {
        if (!tipoDoc) {return;}

        const REQUIRED_VALIDATOR = [Validators.required, Validators.minLength(1)];
        const USUARIOCONTROL = this.recuperarForm.get('usuario');

        // 1. Primera validación: Nacionalidad
        if (this.isMexicana()) {
            // ES MEXICANO
            // 2. Validar tipo de identificación
            if (tipoDoc === 'RFC') {
                // Es RFC - Habilitar selección de tipo de persona
                this.recuperarForm.get('personaTipo')?.enable();
                
                // 3. Validar tipo de persona
                const PERSONA = this.recuperarForm.get('personaTipo')?.value;
                if (PERSONA === TipoPersona.FISICA) {
                    // Validar RFC formato persona física
                    USUARIOCONTROL?.setValidators([
                        ...REQUIRED_VALIDATOR,
                        Validators.pattern(this.REGEX.RFC_MEXICANOFISICA)
                    ]);
                    
                    // Campos adicionales persona física
                    ['nombre', 'primerApellido', 'segundoApellido'].forEach(field => {
                        this.recuperarForm.get(field)?.setValidators(REQUIRED_VALIDATOR);
                        this.recuperarForm.get(field)?.updateValueAndValidity({ emitEvent: false });
                    });
                } else if (PERSONA === TipoPersona.MORAL) {
                    // Validar RFC formato persona moral
                    USUARIOCONTROL?.setValidators([
                        ...REQUIRED_VALIDATOR,
                        Validators.pattern(this.REGEX.RFC_MEXICANOMORAL)
                    ]);
                    
                    // Campos adicionales persona moral
                    this.recuperarForm.get('razonSocial')?.setValidators(REQUIRED_VALIDATOR);
                    this.recuperarForm.get('razonSocial')?.updateValueAndValidity({ emitEvent: false });
                }
            } else if (tipoDoc === 'CURP') {
                // Es CURP - Deshabilitar tipo de persona
                this.recuperarForm.get('personaTipo')?.disable();
                this.recuperarForm.get('personaTipo')?.setValue(null, { emitEvent: false });
                
                // Validar formato CURP
                USUARIOCONTROL?.setValidators([
                    ...REQUIRED_VALIDATOR,
                    Validators.pattern(this.REGEX.CURP)
                ]);

                // Campos adicionales para CURP
                ['nombre', 'primerApellido', 'segundoApellido'].forEach(field => {
                    this.recuperarForm.get(field)?.setValidators(REQUIRED_VALIDATOR);
                    this.recuperarForm.get(field)?.updateValueAndValidity({ emitEvent: false });
                });
            }
        } else {
            // ES EXTRANJERO
            // 2. Validar tipo de persona
            const TIPO_PERSONA = this.recuperarForm.get('personaTipo')?.value;
            
            // Validar RFC formato extranjero
            USUARIOCONTROL?.setValidators([
                ...REQUIRED_VALIDATOR,
                Validators.pattern(this.REGEX.RFC_EXTRANJERO)
            ]);

            if (TIPO_PERSONA === TipoPersona.FISICA) {
                // Campos adicionales persona física extranjera
                ['nombre', 'primerApellido', 'codigoPostal', 'estado', 'pais'].forEach(field => {
                    this.recuperarForm.get(field)?.setValidators(REQUIRED_VALIDATOR);
                    this.recuperarForm.get(field)?.updateValueAndValidity({ emitEvent: false });
                });
            } else if (TIPO_PERSONA === TipoPersona.MORAL) {
                // Campos adicionales persona moral extranjera
                ['razonSocial', 'codigoPostal', 'estado', 'pais'].forEach(field => {
                    this.recuperarForm.get(field)?.setValidators(REQUIRED_VALIDATOR);
                    this.recuperarForm.get(field)?.updateValueAndValidity({ emitEvent: false });
                });
            }
        }

        // Actualizar validez del campo usuario
        USUARIOCONTROL?.updateValueAndValidity({ emitEvent: false });

        // Forzar actualización del formulario
        this.recuperarForm.updateValueAndValidity();
    }

  /**
   * Actualiza las validaciones según el tipo de persona para extranjeros
   * @param TIPO - Tipo de persona (FISICA/MORAL)
   * @private
   */
  private updateExtranjeroValidations(TIPO: TipoPersona.FISICA | TipoPersona.MORAL): void {
    const REQUIRED_VALIDATOR = [Validators.required, Validators.minLength(1)];
    const CAMPOS_COMUNES = ['codigoPostal', 'estado', 'pais'];
    
    // Limpiar validaciones previas
    Object.keys(this.recuperarForm.controls).forEach(key => {
      this.recuperarForm.get(key)?.clearValidators();
      this.recuperarForm.get(key)?.updateValueAndValidity({ emitEvent: false });
    });

    // Establecer validaciones según tipo de persona
    if (TIPO === TipoPersona.FISICA) {
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
  public flujoValido(): boolean {
    const FORM_VALUE = this.recuperarForm.value;
    
    if (this.isMexicana()) {
      // Flujo RFC Física
      if (FORM_VALUE.tipoDocumento === 'RFC' && FORM_VALUE.personaTipo === TipoPersona.FISICA) {
        return this.isValidNationalRfcPersonaFisica();
      }
      
      // Flujo CURP
      if (FORM_VALUE.tipoDocumento === 'CURP') {
        return this.isValidNationalCurp();
      }

      // Flujo RFC Moral
      if (FORM_VALUE.tipoDocumento === 'RFC' && FORM_VALUE.personaTipo === TipoPersona.MORAL) {        
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
    const RFC = this.recuperarForm.get('usuario')?.value;
    const NOMBRE = this.recuperarForm.get('nombre')?.value;
    const PRIMER_APELLIDO = this.recuperarForm.get('primerApellido')?.value;
    const SEGUNDO_APELLIDO = this.recuperarForm.get('segundoApellido')?.value;

    // Verificar que los campos requeridos tengan valor
    const HAS_REQUIRED_FIELDS = Boolean(
        RFC?.trim() &&
        NOMBRE?.trim() &&
        PRIMER_APELLIDO?.trim() &&
        SEGUNDO_APELLIDO?.trim()
    );

    // Validar el formato del RFC según el tipo específico para física
    const IS_VALID_RFC = this.REGEX.RFC_MEXICANOFISICA.test(RFC?.toUpperCase());
    return HAS_REQUIRED_FIELDS && IS_VALID_RFC;
  }

  /**
   * Valida el flujo específico para RFC persona moral nacional
   * @returns boolean
   * @private
   */
  private isValidNationalRfcPersonaMoral(): boolean {  
    const RFC = this.recuperarForm.get('usuario')?.value;
    const RAZONSOCIAL = this.recuperarForm.get('razonSocial')?.value;

    const HAS_REQUIRED_FIELDS = Boolean(
        RFC?.trim() && RAZONSOCIAL?.trim()
    );
    // Validar el formato del RFC
    const IS_VALID_RFC = this.REGEX.RFC_MEXICANOMORAL.test(RFC?.toUpperCase())
    return HAS_REQUIRED_FIELDS && IS_VALID_RFC;
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
    // Validar el formato de la CURP
    const IS_VALID_CURP = this.REGEX.CURP.test(FORM_VALUE.usuario?.toUpperCase());

    return HAS_REQUIRED_FIELDS && IS_VALID_CURP;
  }

  /**
  * Valida el flujo extranjero según el tipo de persona
  * @returns boolean - true si el flujo es válido
  * @private
  */
  private isValidForeignFlow(): boolean {
    if (!this.recuperarForm.get('personaTipo')?.value) {
      return false;
    }
    
    return this.recuperarForm.get('personaTipo')?.value === TipoPersona.FISICA
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