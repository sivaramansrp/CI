import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormularioRecuperacion, RecuperacionStore } from '../../../estados/RecuperacionState.store';
import { Notificacion, TipoPersona } from '@libs/shared/data-access-user/src';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NotificacionesComponent } from "@libs/shared/data-access-user/src/tramites/components/notificaciones/notificaciones.component";
import { RecuperacionCuentaService } from '../../../estados/RecuperacionCuentaResponse';
import { Router } from '@angular/router';

/**
 * Componente para manejar la recuperación de cuenta
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
    /** Expresiones regulares para validaciones */
    private readonly REGEX = {
        RFC_MEXICANO: /^([A-ZÑ&]{3,4})(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])([A-Z0-9]{2})$/,
        RFC_EXTRANJERO: /^([A-Z&]{4})(\d{6})([A-Z0-9]{3})$/,
        CURP: /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[HM]{1}[A-Z]{1}[A-Z]{2}\d{3}$/,
        CP_MEXICANO: /^(0[1-9]|[1-4][0-9]|5[0-2])[0-9]{3}$/,
        CP_EXTRANJERO: /^[A-Za-z0-9- ]{3,10}$/
    };

    /** Formulario reactivo para la recuperación de cuenta */
    public recuperarForm!: FormGroup;
    
    /** Enum de TipoPersona para usar en el template */
    public readonly TipoPersona = TipoPersona;
    
    /** Notificación para mostrar alertas */
    public nuevaAlertaNotificacion: Notificacion | null = null;
    
    /** Subject para manejar la limpieza de suscripciones */
    private readonly DESTRUIR$ = new Subject<void>();

    constructor(
        private readonly fb: FormBuilder,
        private readonly router: Router,
        private readonly recuperacionStore: RecuperacionStore,
        private readonly recuperacionService: RecuperacionCuentaService
    ) {}

    /** Inicialización del componente */
    public ngOnInit(): void {
        this.inicializarFormulario();
    }

    /** Limpieza al destruir el componente */
    public ngOnDestroy(): void {
        this.DESTRUIR$.next();
        this.DESTRUIR$.complete();
    }

    /**
     * Verifica si la nacionalidad es mexicana
     */
    public esMexicana(): boolean {
        if (!this.recuperarForm) {
            return false;
        }
        return this.recuperarForm.get('nacionalidad')?.value === 'SI';
    }

    /**
     * Maneja el cambio en el campo nacionalidad
     */
    public alCambiarNacionalidad(event: Event): void {
    if (!this.recuperarForm) {return;}

    const ES_NACIONAL = (event.target as HTMLInputElement).value === 'SI';
    
    // Limpiar y reiniciar
    this.limpiarMensajeAlerta();
    this.reiniciarCamposFormulario();
    
    // Actualizar nacionalidad y reiniciar campos dependientes
    this.recuperarForm.patchValue({
        nacionalidad: ES_NACIONAL, // Ahora asignamos directamente el booleano
        tipoDocumento: '',
        tipoPersona: '',
        usuario: '',
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        razonSocial: '',
        codigoPostal: '',
        estado: '',
        pais: ''
    });

    if (ES_NACIONAL) {
        // Habilitar tipo documento para mexicanos
        const TIPODOC_CONTROL = this.recuperarForm.get('tipoDocumento');
        if (TIPODOC_CONTROL) {
            TIPODOC_CONTROL.enable();
            TIPODOC_CONTROL.setValidators([Validators.required]);
            TIPODOC_CONTROL.updateValueAndValidity();
        }
    } else {
        // Habilitar tipo persona para extranjeros
        const TIPOPERSONA_CONTROL = this.recuperarForm.get('tipoPersona');
        if (TIPOPERSONA_CONTROL) {
            TIPOPERSONA_CONTROL.enable();
            TIPOPERSONA_CONTROL.setValidators([Validators.required]);
            TIPOPERSONA_CONTROL.updateValueAndValidity();
        }
    }
}
//     public alCambiarNacionalidad(event: Event): void {
//     if (!this.recuperarForm) {return;}

//     const ES_NACIONAL = (event.target as HTMLInputElement).value === 'SI';
    
//     // Limpiar y reiniciar
//     this.limpiarMensajeAlerta();
//     this.reiniciarCamposFormulario();
    
//     // Actualizar nacionalidad y reiniciar campos dependientes
//     this.recuperarForm.patchValue({
//         nacionalidad: ES_NACIONAL ? 'SI' : 'NO',
//         tipoDocumento: '',
//         tipoPersona: '',
//         usuario: '',
//         nombre: '',
//         primerApellido: '',
//         segundoApellido: '',
//         razonSocial: '',
//         codigoPostal: '',
//         estado: '',
//         pais: ''
//     });

//     if (ES_NACIONAL) {
//         // Habilitar tipo documento para mexicanos
//         const TIPODOC_CONTROL = this.recuperarForm.get('tipoDocumento');
//         if (TIPODOC_CONTROL) {
//             TIPODOC_CONTROL.enable();
//             TIPODOC_CONTROL.setValidators([Validators.required]);
//             TIPODOC_CONTROL.updateValueAndValidity();
//         }
//     } else {
//         // Habilitar tipo persona para extranjeros
//         const TIPOPERSONA_CONTROL = this.recuperarForm.get('tipoPersona');
//         if (TIPOPERSONA_CONTROL) {
//             TIPOPERSONA_CONTROL.enable();
//             TIPOPERSONA_CONTROL.setValidators([Validators.required]);
//             TIPOPERSONA_CONTROL.updateValueAndValidity();
//         }
//     }
// }

    /**
     * Maneja el cambio en el tipo de documento
     */
    public alCambiarTipoDocumento(event: Event): void {
        const TIPO_DOC = (event.target as HTMLInputElement).value as 'RFC' | 'CURP';
        this.limpiarMensajeAlerta();
        this.reiniciarCamposDependientes();
        
        if (TIPO_DOC === 'RFC') {
            // Habilitar selección de tipo de persona primero
            const TIPOPERSONA_CONTROL = this.recuperarForm.get('tipoPersona');
            if (TIPOPERSONA_CONTROL) {
                TIPOPERSONA_CONTROL.enable();
                TIPOPERSONA_CONTROL.setValidators([Validators.required]);
                TIPOPERSONA_CONTROL.updateValueAndValidity();
            }
            
            // Habilitar campo usuario con validación RFC
            const USUARIO_CONTROL = this.recuperarForm.get('usuario');
            if (USUARIO_CONTROL) {
                USUARIO_CONTROL.enable();
                USUARIO_CONTROL.setValidators([
                    Validators.required,
                    Validators.pattern(this.REGEX.RFC_MEXICANO)
                ]);
                USUARIO_CONTROL.updateValueAndValidity();
            }
        } else if (TIPO_DOC === 'CURP') {
            // Habilitar campos necesarios para CURP
            const CAMPOS = ['usuario', 'nombre', 'primerApellido', 'segundoApellido'];
            CAMPOS.forEach(campo => {
                const CONTROL = this.recuperarForm.get(campo);
                if (CONTROL) {
                    CONTROL.enable();
                    if (campo === 'usuario') {
                        CONTROL.setValidators([
                            Validators.required,
                            Validators.pattern(this.REGEX.CURP)
                        ]);
                    } else {
                        CONTROL.setValidators([Validators.required]);
                    }
                    CONTROL.updateValueAndValidity();
                }
            });
        }
        
        this.actualizarStore();
    }

    /**
     * Maneja el cambio en el tipo de persona
     */
    public alCambiarTipoPersona(event: Event): void {
    if (!this.recuperarForm) {return;}

    const TIPO = (event.target as HTMLInputElement).value as TipoPersona;
    this.limpiarMensajeAlerta();
    this.reiniciarCamposTipoPersona();

    const ES_NACIONAL = this.esMexicana();
    
    if (!ES_NACIONAL) {
        // Flujo Extranjero
        if (TIPO === TipoPersona.FISICA) {
            // Habilitar campos de persona física
            ['nombre', 'primerApellido', 'segundoApellido'].forEach(campo => {
                const control = this.recuperarForm.get(campo);
                if (control) {
                    control.enable();
                    control.setValidators([Validators.required]);
                    control.updateValueAndValidity();
                }
            });
        } else {
            // Habilitar campos de persona moral
            const razonSocialControl = this.recuperarForm.get('razonSocial');
            if (razonSocialControl) {
                razonSocialControl.enable();
                razonSocialControl.setValidators([Validators.required]);
                razonSocialControl.updateValueAndValidity();
            }
        }

        // Asegurar que los campos comunes estén habilitados
        ['codigoPostal', 'estado', 'pais'].forEach(campo => {
            const control = this.recuperarForm.get(campo);
            if (control) {
                control.enable();
                control.setValidators([Validators.required]);
                if (campo === 'codigoPostal') {
                    control.addValidators([Validators.pattern(this.REGEX.CP_EXTRANJERO)]);
                }
                control.updateValueAndValidity();
            }
        });
    }
    
    this.actualizarStore();
}

    /**
     * Maneja el envío del formulario
     */
    public alEnviar(): void {
        if (this.recuperarForm.valid && this.esFlujoValido()) {
            const DATOS_FORM = this.recuperarForm.getRawValue() as FormularioRecuperacion;
            this.actualizarStore();
            
            this.recuperacionService.recuperarCuenta(DATOS_FORM)
                .pipe(takeUntil(this.DESTRUIR$))
                .subscribe({
                    next: (respuesta) => {
                        this.nuevaAlertaNotificacion = {
                            tipoNotificacion: 'success',
                            categoria: 'success',
                            modo: 'action',
                            titulo: 'Éxito',
                            mensaje: `Recuperación exitosa - Correo: ${respuesta.correo}, Usuario: ${respuesta.usuario}`,
                            cerrar: false,
                            tiempoDeEspera: 2000,
                            txtBtnAceptar: 'Aceptar',
                            txtBtnCancelar: ''
                        };
                    },
                    error: () => {
                        this.nuevaAlertaNotificacion = {
                            tipoNotificacion: 'alert',
                            categoria: 'danger',
                            modo: 'action',
                            titulo: 'Error',
                            mensaje: 'Error al recuperar la cuenta. Por favor intente nuevamente.',
                            cerrar: false,
                            tiempoDeEspera: 2000,
                            txtBtnAceptar: 'Aceptar',
                            txtBtnCancelar: ''
                        };
                    }
                });
        }
    }

    /**
     * Navega a la página de login
     */
    public alSalir(): void {
        this.router.navigate(['/login']);
    }

    /**
     * Verifica si el flujo actual es válido según las reglas de negocio
     */
    public esFlujoValido(): boolean {
    if (!this.recuperarForm) {
        console.log('Formulario no inicializado');
        return false;
    }
    
    const DATOS_FORM = this.recuperarForm.getRawValue() as FormularioRecuperacion;
    
    console.log('Validando flujo con datos:', DATOS_FORM);
    
    if (DATOS_FORM?.nacionalidad === undefined || DATOS_FORM?.nacionalidad === null) {
        console.log('Nacionalidad no seleccionada');
        return false;
    }

    // Si es extranjero (nacionalidad === false)
    if (!DATOS_FORM.nacionalidad) {
        const ES_VALIDO = this.validarFlujoExtranjero(DATOS_FORM);
        console.log('Resultado validación extranjero:', ES_VALIDO);
        return ES_VALIDO;
    }

    // Si es mexicano (nacionalidad === true)
    const ES_VALIDO = this.validarFlujoMexicano(DATOS_FORM);
    console.log('Resultado validación mexicano:', ES_VALIDO);
    return ES_VALIDO;
}

//     public esFlujoValido(): boolean {
//     if (!this.recuperarForm) {
//         console.log('Formulario no inicializado');
//         return false;
//     }
    
//     const DATOS_FORM = this.recuperarForm.getRawValue() as FormularioRecuperacion;
    
//     console.log('Validando flujo con datos:', DATOS_FORM);
    
//     if (!DATOS_FORM?.nacionalidad) {
//         console.log('Nacionalidad no seleccionada');
//         return false;
//     }

//     const ES_VALIDO = this.esMexicana() 
//         ? this.validarFlujoRFCMexicano(DATOS_FORM)
//         : this.validarFlujoExtranjero(DATOS_FORM);

//     console.log('Resultado validación:', ES_VALIDO);

//     return ES_VALIDO;
// }

private validarFlujoRFCMexicano(DATOS: FormularioRecuperacion): boolean {
    if (!DATOS.usuario?.trim() || !this.REGEX.RFC_MEXICANO.test(DATOS.usuario)) {
        return false;
    }

    if (DATOS.tipoPersona === TipoPersona.FISICA) {
        return Boolean(
            DATOS.nombre?.trim() &&
            DATOS.primerApellido?.trim() &&
            DATOS.segundoApellido?.trim()
        );
    } else if (DATOS.tipoPersona === TipoPersona.MORAL) {
        return Boolean(DATOS.razonSocial?.trim());
    }

    return false;
}

private validarFlujoCURPMexicano(DATOS: FormularioRecuperacion): boolean {
    return Boolean(
        DATOS.usuario?.trim() &&
        this.REGEX.CURP.test(DATOS.usuario) &&
        DATOS.nombre?.trim() &&
        DATOS.primerApellido?.trim() &&
        DATOS.segundoApellido?.trim()
    );
}

    // Métodos privados
    private inicializarFormulario(): void {
    this.recuperarForm = this.fb.group({
        nacionalidad: ['', [Validators.required]],
        tipoDocumento: [{ value: null, disabled: true }],
        tipoPersona: [{ value: null, disabled: true }],
        usuario: [{ value: '', disabled: true }],
        nombre: [{ value: '', disabled: true }],
        primerApellido: [{ value: '', disabled: true }],
        segundoApellido: [{ value: '', disabled: true }],
        razonSocial: [{ value: '', disabled: true }],
        codigoPostal: [{ value: '', disabled: true }],
        estado: [{ value: '', disabled: true }],
        pais: [{ value: '', disabled: true }]
    });
}

    private limpiarMensajeAlerta(): void {
        this.nuevaAlertaNotificacion = null;
    }

    private reiniciarCamposFormulario(): void {
        const CAMPOS = [
            'tipoDocumento', 'tipoPersona', 'usuario', 
            'nombre', 'primerApellido', 'segundoApellido', 
            'razonSocial', 'codigoPostal', 'estado', 'pais'
        ];

        CAMPOS.forEach(campo => {
            const CONTROL = this.recuperarForm.get(campo);
            if (CONTROL) {
                CONTROL.reset();
                CONTROL.disable();
                CONTROL.clearValidators();
                CONTROL.updateValueAndValidity();
            }
        });
    }

    private actualizarStore(): void {
        const DATOS_FORM = this.recuperarForm.getRawValue() as FormularioRecuperacion;
        this.recuperacionStore.update(state => ({
            ...state,
            formData: DATOS_FORM
        }));
    }

    private validarFlujoMexicano(datos: FormularioRecuperacion): boolean {
    if (!datos.tipoDocumento) {
        return false;
    }

    if (datos.tipoDocumento === 'RFC') {
        return this.validarFlujoRFC(datos);
    }
    
    return this.validarFlujoCURP(datos);
}

    // private validarFlujoRFC(datos: FormularioRecuperacion): boolean {
    //     if (!datos.usuario?.trim() || !this.REGEX.RFC_MEXICANO.test(datos.usuario)) {
    //         return false;
    //     }

    //     if (datos.tipoPersona === TipoPersona.FISICA) {
    //         return Boolean(
    //             datos.nombre?.trim() &&
    //             datos.primerApellido?.trim() &&
    //             datos.segundoApellido?.trim()
    //         );
    //     }
        
    //     return Boolean(datos.razonSocial?.trim());
    // }
    private validarFlujoRFC(datos: FormularioRecuperacion): boolean {
        // Validar que exista usuario (RFC) y cumpla el formato
        if (!datos.usuario?.trim() || !this.REGEX.RFC_MEXICANO.test(datos.usuario)) {
            return false;
        }

        // Validar tipo de persona y campos correspondientes
        if (datos.tipoPersona === TipoPersona.FISICA) {
            const CAMPOSVALIDOS = Boolean(
                datos.nombre?.trim() &&
                datos.primerApellido?.trim() &&
                datos.segundoApellido?.trim()
            );         
            debugger;   
            console.log('Validando Persona Física RFC:', {
                rfc: datos.usuario,
                nombre: datos.nombre,
                primerApellido: datos.primerApellido,
                segundoApellido: datos.segundoApellido,
                valido: CAMPOSVALIDOS
            });            
            return CAMPOSVALIDOS;
        }        
        return false; // Si no es persona física, no es válido para este flujo
    }

    private validarFlujoCURP(datos: FormularioRecuperacion): boolean {
        return Boolean(
            datos.usuario?.trim() &&
            this.REGEX.CURP.test(datos.usuario) &&
            datos.nombre?.trim() &&
            datos.primerApellido?.trim() &&
            datos.segundoApellido?.trim()
        );
    }

    private validarFlujoExtranjero(DATOS: FormularioRecuperacion): boolean {
    // Validar tipo de persona
    if (!DATOS.tipoPersona) {
        console.log('Tipo persona no seleccionado');
        return false;
    }

    // Validar campos comunes
    const CAMPOS_COMUNES_VALIDOS = Boolean(
        DATOS.codigoPostal?.trim() &&
        DATOS.estado?.trim() &&
        DATOS.pais?.trim()
    );

    if (!CAMPOS_COMUNES_VALIDOS) {
        console.log('Campos comunes inválidos', {
            codigoPostal: DATOS.codigoPostal,
            estado: DATOS.estado,
            pais: DATOS.pais
        });
        return false;
    }

    // Para Persona Moral
    if (DATOS.tipoPersona === TipoPersona.MORAL) {
        const RAZON_SOCIAL_VALIDA = Boolean(DATOS.razonSocial?.trim());
        
        console.log('Validando campos persona moral extranjera:', {
            razonSocial: DATOS.razonSocial,
            codigoPostal: DATOS.codigoPostal,
            estado: DATOS.estado,
            pais: DATOS.pais,
            todosLosCamposValidos: RAZON_SOCIAL_VALIDA && CAMPOS_COMUNES_VALIDOS
        });
        
        // Devolver true si tanto la razón social como los campos comunes son válidos
        return RAZON_SOCIAL_VALIDA && CAMPOS_COMUNES_VALIDOS;
    }

    // Para otros casos (incluyendo Persona Física)
    return false;
}
    //     private validarFlujoExtranjero(DATOS: FormularioRecuperacion): boolean {
    //     // Validar tipo de persona
    //     if (!DATOS.tipoPersona) {
    //         console.log('Tipo persona no seleccionado');
    //         return false;
    //     }

    //     // Validar campos comunes
    //     const CAMPOS_COMUNES_VALIDOS = Boolean(
    //         DATOS.codigoPostal?.trim() &&
    //         DATOS.estado?.trim() &&
    //         DATOS.pais?.trim()
    //     );

    //     if (!CAMPOS_COMUNES_VALIDOS) {
    //         console.log('Campos comunes inválidos', {
    //             codigoPostal: DATOS.codigoPostal,
    //             estado: DATOS.estado,
    //             pais: DATOS.pais
    //         });
    //         return false;
    //     }

    //     // Validar según tipo de persona
    //     if (DATOS.tipoPersona === TipoPersona.FISICA) {
    //         const CAMPOS_FISICA_VALIDOS = Boolean(
    //             DATOS.nombre?.trim() &&
    //             DATOS.primerApellido?.trim() &&
    //             DATOS.segundoApellido?.trim()
    //         );

    //         console.log('Validando campos persona física', {
    //             nombre: DATOS.nombre,
    //             primerApellido: DATOS.primerApellido,
    //             segundoApellido: DATOS.segundoApellido,
    //             validos: CAMPOS_FISICA_VALIDOS
    //         });

    //         return CAMPOS_FISICA_VALIDOS;
    //     } 
        
    //     if (DATOS.tipoPersona === TipoPersona.MORAL) {
    //         const RAZON_SOCIAL_VALIDA = Boolean(DATOS.razonSocial?.trim());
            
    //         console.log('Validando campos persona moral', {
    //             razonSocial: DATOS.razonSocial,
    //             valido: RAZON_SOCIAL_VALIDA
    //         });
            
    //         return RAZON_SOCIAL_VALIDA;
    //     }

    //     return false;
    // }

    /**
     * Reinicia los campos relacionados con el tipo de persona
     * @private
     */
    private reiniciarCamposTipoPersona(): void {
        const CAMPOS_PERSONA = [
            'usuario',
            'nombre',
            'primerApellido',
            'segundoApellido',
            'razonSocial'
        ];

        CAMPOS_PERSONA.forEach(campo => {
            const CONTROL = this.recuperarForm.get(campo);
            if (CONTROL) {
                CONTROL.reset();
                CONTROL.disable();
                CONTROL.clearValidators();
                CONTROL.updateValueAndValidity();
            }
        });
    }

    /**
     * Reinicia los campos dependientes del tipo de documento
     * @private
     */
    private reiniciarCamposDependientes(): void {
        const CAMPOS_DEPENDIENTES = [
            'tipoPersona',
            'usuario',
            'nombre',
            'primerApellido',
            'segundoApellido',
            'razonSocial'
        ];

        CAMPOS_DEPENDIENTES.forEach(campo => {
            const CONTROL = this.recuperarForm.get(campo);
            if (CONTROL) {
                CONTROL.reset();
                CONTROL.disable();
                CONTROL.clearValidators();
                CONTROL.updateValueAndValidity();
            }
        });
    }
}