import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notificacion, NotificacionesComponent, Transportista } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite303Store, Tramite303StoreService } from '../../../../core/estados/tramites/tramite303.store';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Tramite303Query } from '../../../../core/queries/tramite303.query';
import { TransportistaService } from '../../../../core/services/303/trasportista.service';

@Component({
  selector: 'app-registro-trasportista',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotificacionesComponent],
  templateUrl: './registro-trasportista.component.html',
  styleUrl: './registro-trasportista.component.scss',
})
export class RegistroTrasportistaComponent implements OnInit, OnDestroy {
  /**
   * Formulario para el registro de transportistas
   */
  public FormTrasportista!: FormGroup;
  /**
   * Alerta para mostrar mensajes de éxito o error
   */
  public alerta: string | null = null;

  /** Notificación a mostrar al usuario */
  public nuevaNotificacion!: Notificacion;
  /**
   * Lista de transportistas registrados
   */
  listaTransportistas: Transportista[] = [];
  /** 
   * Notificador para destruir las suscripciones y evitar fugas de memoria 
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /** Estado del trámite 303 consultado */
  public tramiteConsultado?: Tramite303Store;
  /**
   * Constructor del componente
   * @param fb FormBuilder para crear formularios reactivos
   */
  constructor(private fb: FormBuilder,
    private transportistaService: TransportistaService,
    private tramite303State: Tramite303StoreService,
    private tramite303Query: Tramite303Query,
    private router: Router
  ) {
    this.inicializarFormulario();
  }

  /**
   * Inicialización del componente
   * Se configura el formulario y se suscribe a los cambios de los campos relevantes para actualizar las validaciones
   */
  ngOnInit(): void {
    this.tramite303Query.selectSolicitud$
      .pipe(
        map((seccionState) => {
          this.tramiteConsultado = seccionState;
          this.listaTransportistas = seccionState?.listaTransportistas || [];
        }),
        takeUntil(this.destroyNotifier$)
      )
      .subscribe();
    this.suscribirACambios();
  }

  inicializarFormulario(): void {
    this.FormTrasportista = this.fb.group({
      nacionalidad: ['nacional'],
      tipoPersona: ['fisica'],
      rfc: [''],
      nombre: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      taxID: [''],
      razonSocial: ['']
    });
    this.actualizarValidaciones();
  }

  /**
   * Suscribe a los cambios de los campos 'nacionalidad' y 'tipoPersona'
   * para actualizar las validaciones del formulario en función de los valores seleccionados.
   * Esto permite que el formulario se adapte dinámicamente a las selecciones del usuario.
   */
  private suscribirACambios(): void {
    this.FormTrasportista.get('nacionalidad')?.valueChanges.subscribe(() => {
      this.limpiarCamposPersona();
      this.actualizarValidaciones();
    });
    this.FormTrasportista.get('tipoPersona')?.valueChanges.subscribe(() => {
      this.limpiarCamposPersona();
      this.actualizarValidaciones();
    });
    this.actualizarValidaciones();
  }

  /**
 * Limpia únicamente los campos de datos personales de transportista
 */
  private limpiarCamposPersona(): void {
    this.FormTrasportista.patchValue({
      rfc: '',
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      taxID: '',
      razonSocial: ''
    }, { emitEvent: false }); // Evita disparar valueChanges de nuevo
  }

  /**
   * Actualiza las validaciones del formulario en función de la nacionalidad y tipo de persona seleccionados.
   * Dependiendo de si es nacional o extranjero, y si es persona física o moral,
   * se establecen diferentes validaciones para los campos RFC, nombre, apellido paterno,
   * apellido materno, taxID y razón social.
   */
  private actualizarValidaciones(): void {
    const NACIONALIDAD = this.FormTrasportista.get('nacionalidad')?.value;
    const TIPOPERSONA = this.FormTrasportista.get('tipoPersona')?.value;

    const ESNACIONALFISICA = NACIONALIDAD === 'nacional' && TIPOPERSONA === 'fisica';
    const ESEXTRANJEROFISICA = NACIONALIDAD === 'extranjero' && TIPOPERSONA === 'fisica';
    const ESNACIONALMORAL = NACIONALIDAD === 'nacional' && TIPOPERSONA === 'moral';
    const ESEXTRANJEROMORAL = NACIONALIDAD === 'extranjero' && TIPOPERSONA === 'moral';

    const RFC = this.FormTrasportista.get('rfc');
    const NOMBRE = this.FormTrasportista.get('nombre');
    const APELLIDOPATERNO = this.FormTrasportista.get('apellidoPaterno');
    const APELLIDOMATERNO = this.FormTrasportista.get('apellidoMaterno');
    const TAXID = this.FormTrasportista.get('taxID');
    const RAZONSOCIAL = this.FormTrasportista.get('razonSocial');

    RFC?.clearValidators();
    NOMBRE?.clearValidators();
    APELLIDOPATERNO?.clearValidators();
    APELLIDOMATERNO?.clearValidators();
    TAXID?.clearValidators();
    RAZONSOCIAL?.clearValidators();

    if (ESNACIONALFISICA) {
      RFC?.setValidators([Validators.required]);
      NOMBRE?.setValidators([Validators.required]);
      APELLIDOPATERNO?.setValidators([Validators.required]);
    }

    if (ESEXTRANJEROFISICA) {
      NOMBRE?.setValidators([Validators.required]);
      APELLIDOPATERNO?.setValidators([Validators.required]);
      TAXID?.setValidators([Validators.required]);
    }

    if (ESNACIONALMORAL) {
      RFC?.setValidators([Validators.required]);
      RAZONSOCIAL?.setValidators([Validators.required]);
    }

    if (ESEXTRANJEROMORAL) {
      RAZONSOCIAL?.setValidators([Validators.required]);
      TAXID?.setValidators([Validators.required]);
    }

    RFC?.updateValueAndValidity();
    NOMBRE?.updateValueAndValidity();
    APELLIDOPATERNO?.updateValueAndValidity();
    APELLIDOMATERNO?.updateValueAndValidity();
    TAXID?.updateValueAndValidity();
    RAZONSOCIAL?.updateValueAndValidity();
  }

  /**
   * Limpia el formulario de registro de transportistas, restableciendo los valores por defecto
   * y actualizando las validaciones.
   */
  limpiarFormulario(): void {
    this.FormTrasportista.reset();
    this.actualizarValidaciones();
  }

  /**
   * Busca un transportista en función de la nacionalidad y tipo de persona.
   * @returns void
   */
  buscarTrasportista(): void {
    const NACIONALIDAD = this.FormTrasportista.get('nacionalidad')?.value;
    const TIPOPERSONA = this.FormTrasportista.get('tipoPersona')?.value;
    const RFC = this.FormTrasportista.get('rfc')?.value?.trim();
    const RFCVALUE = RFC?.trim();
    if (NACIONALIDAD !== 'nacional') {
      return;
    }
    if (!RFCVALUE) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'warning',
        modo: 'action',
        titulo: 'Aviso',
        mensaje: 'Debe capturar el RFC antes de buscar.',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return;
    }
    const BUSQUEDA$ =
      TIPOPERSONA === 'fisica'
        ? this.transportistaService.buscarFisicaPorRFC(RFCVALUE)
        : this.transportistaService.buscarMoralPorRFC(RFCVALUE);

    BUSQUEDA$.subscribe({
      next: (transportista) => {
        if (!transportista) {
          this.mostrarNoEncontrado();
          return;
        }
        const ESNACIONAL = transportista.nacionalidad === 'nacional';
        const ESFISICA = transportista.tipoPersona === 'fisica';
        const ESMORAL = transportista.tipoPersona === 'moral';

        if (!ESNACIONAL) {
          this.nuevaNotificacion = {
            tipoNotificacion: 'alert',
            categoria: 'warning',
            modo: 'action',
            titulo: 'Aviso',
            mensaje: 'El transportista encontrado no es nacional.',
            cerrar: true,
            txtBtnAceptar: 'Aceptar',
            txtBtnCancelar: '',
          };
          return;
        }
        if ((TIPOPERSONA === 'fisica' && !ESFISICA) || (TIPOPERSONA === 'moral' && !ESMORAL)) {
          this.nuevaNotificacion = {
            tipoNotificacion: 'alert',
            categoria: 'warning',
            modo: 'action',
            titulo: 'Aviso',
            mensaje: 'No se encontró un transportista nacional con el tipo de persona seleccionado.',
            cerrar: true,
            txtBtnAceptar: 'Aceptar',
            txtBtnCancelar: '',
          };
          this.limpiarFormulario();
          return;
        }
        if (TIPOPERSONA === 'fisica') {
          this.FormTrasportista.patchValue({
            nombre: transportista.nombre,
            apellidoPaterno: transportista.apellidoPaterno,
            apellidoMaterno: transportista.apellidoMaterno,
            razonSocial: '',
            taxID: ''
          });
        } else {
          this.FormTrasportista.patchValue({
            razonSocial: transportista.denominacionRazonSocial,
            nombre: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            taxID: ''
          });
        }
        this.alerta = 'success';
      },
      error: (err) => {
        this.mostrarNoEncontrado();
        console.error('Error al buscar transportista', err);
        this.alerta = 'error';
      }
    });
  }
  /**
   * Muestra una notificación cuando no se encuentra un transportista.
   */
  private mostrarNoEncontrado(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'warning',
      modo: 'action',
      titulo: 'Aviso',
      mensaje: 'No se encontró ningún transportista con ese RFC.',
      cerrar: true,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
    this.limpiarFormulario();
  }

  /**
   * Maneja la acción de agregar un transportista.
   * Valida el formulario y muestra una alerta de éxito o error según corresponda.
   * Si el formulario es válido, se imprime en consola los datos del transportista.
   */
  agregar(): void {
    if (!this.FormTrasportista.valid) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'warning',
        modo: 'action',
        titulo: 'Aviso',
        mensaje: 'Antes de agregar un transportista debe llenar el formulario correctamente.',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      this.alerta = 'error';
      this.FormTrasportista.markAllAsTouched();
      setTimeout(() => {
        this.alerta = null;
      }, 4000);
      return;
    }
    const FORM_VALUE = this.FormTrasportista.value;
    const NUEVO_TRASPORTISTA: Transportista = {
      idPersonaTransportista: crypto.randomUUID(),
      tipoPersona: FORM_VALUE.tipoPersona,
      nacionalidad: FORM_VALUE.nacionalidad,
      esExtranjero: FORM_VALUE.nacionalidad === 'extranjero',
      esNacional: FORM_VALUE.nacionalidad === 'nacional',
      rfc: FORM_VALUE.rfc || '',
      rfcExtranjero: FORM_VALUE.taxID || '',
      nombre: FORM_VALUE.nombre || '',
      transportista: FORM_VALUE.nombre || FORM_VALUE.razonSocial || '',
      taxId: FORM_VALUE.taxID || '',
      denominacionRazonSocial: FORM_VALUE.razonSocial || '',
      apellidoPaterno: FORM_VALUE.apellidoPaterno || '',
      apellidoMaterno: FORM_VALUE.apellidoMaterno || ''
    };
    const YA_EXISTE = this.listaTransportistas.some(t => {
      if (NUEVO_TRASPORTISTA.esNacional) {
        return t.rfc?.toLowerCase() === NUEVO_TRASPORTISTA.rfc?.toLowerCase();
      }
      return t.rfcExtranjero?.toLowerCase() === NUEVO_TRASPORTISTA.rfcExtranjero?.toLowerCase();
    });
    if (YA_EXISTE) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'warning',
        modo: 'action',
        titulo: 'Aviso',
        mensaje: 'Ya existe un transportista con el mismo identificador.',
        cerrar: true,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return;
    }
    this.listaTransportistas = [...this.listaTransportistas, NUEVO_TRASPORTISTA];
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'success',
      modo: 'action',
      titulo: 'Éxito',
      mensaje: 'Transportista agregado correctamente.',
      cerrar: true,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
    this.limpiarFormulario();
    this.tramite303State.setListaTransportistas(this.listaTransportistas);
    this.router.navigate(['aga/despacho-mercancias/registro']);
  }

  /**
   * Obtiene el valor de la nacionalidad seleccionada en el formulario.
   * @returns La nacionalidad seleccionada ('nacional' o 'extranjero').
   */
  get nacionalidad(): string {
    return this.FormTrasportista.get('nacionalidad')?.value;
  }

  /**
   * Obtiene el tipo de persona seleccionado en el formulario.
   * @returns El tipo de persona ('fisica' o 'moral').
   */
  get tipoPersona(): string {
    return this.FormTrasportista.get('tipoPersona')?.value;
  }

  /**
   * Propiedades computadas para determinar el tipo de transportista según nacionalidad y tipo de persona.
   * Estas propiedades se utilizan para simplificar las validaciones y lógica del formulario.
   */
  get ESNACIONALFISICA(): boolean {
    return this.nacionalidad === 'nacional' && this.tipoPersona === 'fisica';
  }

  /**
   * Determina si el transportista es una persona física extranjera.
   * @returns true si es extranjero y persona física, false en caso contrario.
   */
  get ESEXTRANJEROFISICA(): boolean {
    return this.nacionalidad === 'extranjero' && this.tipoPersona === 'fisica';
  }

  /**
   * Determina si el transportista es una persona moral nacional.
   * @returns true si es nacional y persona moral, false en caso contrario.
   */
  get ESNACIONALMORAL(): boolean {
    return this.nacionalidad === 'nacional' && this.tipoPersona === 'moral';
  }

  /**
   * Determina si el transportista es una persona moral extranjera.
   * @returns true si es extranjero y persona moral, false en caso contrario.
   */
  get ESEXTRANJEROMORAL(): boolean {
    return this.nacionalidad === 'extranjero' && this.tipoPersona === 'moral';
  }

  /**
   * Maneja la limpieza de recursos al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
