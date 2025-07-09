import { Catalogo, CatalogoSelectComponent, CategoriaMensaje, ConsultaioQuery, InputRadioComponent, Notificacion, NotificacionesComponent, TipoNotificacionEnum, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NOTA, OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/oea-textil-registro.enum';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite32609Store, Tramites32609State } from '../../estados/tramites32609.store';
import { AgregarMiembroEmpresaComponent } from '../agregar-miembro-empresa/agregar-miembro-empresa.component';
import { CommonModule } from '@angular/common';
import { ControlInventariosComponent } from '../control-inventarios/control-inventarios.component';
import { DomiciliosRfcSolicitanteComponent } from '../domicilios-rfc-solicitante/domicilios-rfc-solicitante.component';
import { NumeroEmpleadosBimestreComponent } from '../numero-empleados-bimestre/numero-empleados-bimestre.component';
import { OeaTextilRegistroService } from '../../services/oea-textil-registro.service';

@Component({
  selector: 'app-datos-comunes',
  standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      CatalogoSelectComponent,
      InputRadioComponent,
      NotificacionesComponent,
      NumeroEmpleadosBimestreComponent,
      DomiciliosRfcSolicitanteComponent,
      ControlInventariosComponent,
      TituloComponent,
      AgregarMiembroEmpresaComponent
    ],
  templateUrl: './datos-comunes.component.html',
  styleUrl: './datos-comunes.component.css',
})
export class DatosComunesComponent implements OnInit, OnDestroy {

   /**
   * Indicates whether the entity is consolidated in ET.
   *
   * @type {boolean}
   * @default false
   */
  radioSeleccionado: boolean = false;
  /**
   * Expresión regular para validar que el campo solo contenga dígitos.
   */
  esTablaVisible:boolean = false;

  /**
   * Indica si la sección "Respuesta Obligatoria" debe ser visible.
   * Se muestra cuando pagoCuotasIMSS es seleccionado como "No" (valor '0').
   */
  mostrarRespuestaObligatoria: boolean = false;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;
  /**
   * @property {FormGroup} forma
   * Formulario reactivo que contiene los controles y validaciones para los datos de las empresas transportistas.
   */
  public forma!: FormGroup;

   /**
   * @property {Tramites32609State} seccionState
   * Estado actual del formulario.
   */
  public seccionState!: Tramites32609State;

    /**
   * Opciones de botón de radio.
   */
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;
  /**
   * Lista de sectores productivos.
   */
  sectorProductivoList!: Catalogo[];
  /**
   * Lista de sectores de servicio.
   */
  sectorServicio!: Catalogo[];
  /**
   * Lista de bimestres.
   */
  bimestreList!: Catalogo[];

  /**
   * Notificación que se muestra al usuario.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Mensaje que indica un requisito obligatorio para acceder a la nota.
   */
  REQUISITO_OBLIGATORIO = NOTA.REQUISITO_OBLIGATORIO_PARA_ACCEDER_NOTA;
  EMPLEADO_REQUISITO = NOTA.EMPLEADO_REQUISITO_RGCE;


  /**
   * Indica si el diálogo de notificación está habilitado.
   */
  public esHabilitarElDialogo: boolean = false;

  /**
   * @property {Subject<void>} destroyed$
   * Observable utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  public destroyed$ = new Subject<void>();

  constructor(public fb: FormBuilder, 
    private consultaioQuery: ConsultaioQuery,
    private tramite32609Store: Tramite32609Store,
    private servicio: OeaTextilRegistroService) {
    this.consultaioQuery.selectConsultaioState$
        .pipe(
          takeUntil(this.destroyed$),
          map((seccionState) => {
           this.esFormularioSoloLectura = seccionState.readonly;
            this.inicializarEstadoFormulario();
          })
        )
        .subscribe();
  }

  /**
   * @method ngOnInit
   * Hook de ciclo de vida para inicializar el componente.
   */
  ngOnInit(): void {
    // this.enPatchStoredFormData();
    this.obtenerlistadescargable();
     this.inicializarEstadoFormulario();
  }

   /**
     * @method crearFormsetValoresStore
     * Crea el formulario reactivo con sus controles y validaciones.
     */
    crearForm(): void {
      this.forma = this.fb.group({
          sectorProductivo: [this.seccionState?.sectorProductivo],
          sectorServicio: [this.seccionState?.sectorServicio],
          cumplimientoFiscalAduanero: [this.seccionState?.cumplimientoFiscalAduanero, Validators.required],
          autorizaOpinionSAT: [this.seccionState?.autorizaOpinionSAT, Validators.required],
          cuentaConEmpleadosPropios: [this.seccionState?.cuentaConEmpleadosPropios, Validators.required],
          bimestreUltimo: [this.seccionState?.bimestreUltimo, Validators.required],
          numeroDeEmpleadas: [this.seccionState?.numeroDeEmpleadas, Validators.required],
          retencionISRTrabajadores: [this.seccionState?.retencionISRTrabajadores, Validators.required],
          pagoCuotasIMSS: [this.seccionState?.pagoCuotasIMSS, Validators.required],
          cuentaConSubcontratacionEspecializada: [this.seccionState?.cuentaConSubcontratacionEspecializada, Validators.required],
          registroPadronLFT: [this.seccionState?.registroPadronLFT, Validators.required],
          listadoSATArt69: [this.seccionState?.listadoSATArt69, Validators.required],
          listadoSATArt69B: [this.seccionState?.listadoSATArt69B, Validators.required],
          listadoSATArt69BBis: [this.seccionState?.listadoSATArt69BBis, Validators.required],
          certificadosSellosVigentes: [this.seccionState?.certificadosSellosVigentes, Validators.required],
          infringioSupuestos17HBis: [this.seccionState?.infringioSupuestos17HBis, Validators.required],
          mediosContactoActualizadosBuzon: [this.seccionState?.mediosContactoActualizadosBuzon, Validators.required],
          suspensionPadronImportadoresExportadores: [this.seccionState?.suspensionPadronImportadoresExportadores, Validators.required],
          querellaSATUltimos3Anios: [this.seccionState?.querellaSATUltimos3Anios, Validators.required],
          ingresoInfoContableSAT: [this.seccionState?.ingresoInfoContableSAT, Validators.required],
      });
    }

    onValidateForm(): void {
      this.forma.markAllAsTouched();
      
      // Update validation status for all controls
      Object.keys(this.forma.controls).forEach(key => {
        const CONTROL = this.forma.get(key);
        if (CONTROL) {
          CONTROL.updateValueAndValidity();
        }
      });
    }
  
    /**
     * @method inicializarEstadoFormulario
     * Inicializa el estado del formulario dependiendo del modo de solo lectura.
     * Si el formulario está en modo solo lectura, se guardan los datos del formulario.
     * Si no, se crea el formulario reactivo.
     */
  inicializarEstadoFormulario(): void {
      if (this.esFormularioSoloLectura) {
        this.guardarDatosFormulario();
      } else {
        this.crearForm();
      }
    }
      /**
     * @method
     * @name guardarDatosFormulario
     * @description
     * Inicializa los formularios y obtiene los datos de la tabla.
     * Dependiendo del modo de solo lectura (`esFormularioSoloLectura`),
     * deshabilita o habilita todos los formularios del componente.
     * Si el formulario está en modo solo lectura, todos los formularios se deshabilitan para evitar modificaciones.
     * Si no está en modo solo lectura, todos los formularios se habilitan para permitir la edición.
     *
     * @returns {void}
     */
    guardarDatosFormulario(): void {
      this.crearForm();
      if (this.esFormularioSoloLectura) {
        this.forma.disable();
      } else {
        this.forma.enable();
      }
    }


      /**
     * Método genérico para manejar campos mutuamente excluyentes.
     * @param campoSeleccionado - El nombre del campo que se está seleccionando
     * @param campoAResetear - El nombre del campo que se debe resetear
     * @param valor - El valor seleccionado
     */
    manejarCamposMutuamenteExcluyentes(
      campoSeleccionado: string, 
      campoAResetear: string, 
      evento: Event
    ): void {
      const VALOR = (evento.target as HTMLSelectElement)?.value;
      if (VALOR) {
        // Resetear el campo opuesto
        this.forma.patchValue({
          [campoAResetear]: null
        });
        this.forma.get(campoAResetear)?.markAsPristine();
        // Guardar el valor seleccionado en el store
        this.setValoresStore(this.forma, campoSeleccionado);
        
        // Limpiar el valor del campo opuesto en el store
        this.tramite32609Store.establecerDatos({ [campoAResetear]: null });
      }
    }  

/**
 * Maneja cambio de radio button y actualiza visibilidad de campos.
 * @param valor - Valor seleccionado ('0' o '1')
 */
  enCambioDeValor(valor: string | number): void {
    this.radioSeleccionado = valor === '1' ? true : false;
  }


  toggleTablaPorValor(valor: string | number): void {
    this.esTablaVisible = valor === '1' ? true : false;
  } 

  /**
   * Maneja el cambio de selección para pagoCuotasIMSS y controla la visibilidad de "Respuesta Obligatoria".
   * @param valor - Valor seleccionado ('0' para No, '1' para Sí)
   */
  manejarPagoCuotasIMSS(valor: string | number): void {
    // Mostrar "Respuesta Obligatoria" solo cuando se selecciona "No" (valor '0')
    this.mostrarRespuestaObligatoria = valor === '0' || valor === 0; 
  }
  
  /**
   * @method esInvalido
   * Verifica si un control del formulario es inválido.
   * @param {string} nombreControl - Nombre del control a verificar.
   * @returns {boolean} - `true` si el control es inválido, de lo contrario `false`.
   */
  public esInvalido(nombreControl: string): boolean {
    const CONTROL = this.forma.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * Pasa el valor de un campo del formulario a la tienda para la gestión del estado.
   * @param form - El formulario reactivo.
   * @param campo - El nombre del campo en el formulario.
   */
  setValoresStore(form: FormGroup | null, campo: string): void {
    if (!form) {
      return;
    }
    const CONTROL = form.get(campo);
    if (CONTROL && CONTROL.value !== null && CONTROL.value !== undefined) {
      this.tramite32609Store.establecerDatos({ [campo]: CONTROL.value });
      
      // Clear validation errors if the field now has a valid value
      if (CONTROL.valid && CONTROL.touched) {
        CONTROL.markAsPristine();
      }
    }
  }

  /**
   * @method obtenerlistadescargable
   * Obtiene las listas necesarias para llenar los selectores del formulario.
   */
  obtenerlistadescargable(): void {
    this.servicio.sectorListaDeSelects()
      .pipe(takeUntil(this.destroyed$),
  map((data) => {
    this.sectorProductivoList = data.sectorProductivoList;
    this.sectorServicio = data.sectorServicioList;
    this.bimestreList = data.bimestreList;
  })
)
.subscribe();
  }

  /**
   * Envía los datos del formulario y muestra el modal de confirmación.
   * Si el formulario es inválido, marca todos los campos como tocados.
   */
  enviarDialogData(datos?:string): void {
    this.nuevaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.ALERTA,
        modo: 'modal',
        titulo: '',
        mensaje: datos ? datos : this.REQUISITO_OBLIGATORIO,
        cerrar: false,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
        tamanioModal: 'modal-md',
      };
  }


  /**
   * Método que se ejecuta cuando se selecciona una opción del botón de radio.
   * Habilita o deshabilita el diálogo de confirmación según la opción seleccionada.
   * @param {string, number} evento - El evento del cambio de valor del botón de radio.
   */
onSeleccionVerdadera(evento:string | number, nota?:string): void {
    if (evento && (evento === '1' || evento === 1)) {
      this.enviarDialogData(nota);
      this.esHabilitarElDialogo = true;
    } else {
      this.esHabilitarElDialogo = false;
    }
  
  }

  /**
   * Método que se ejecuta cuando se selecciona una opción del botón de radio.
   * Habilita o deshabilita el diálogo de confirmación según la opción seleccionada.
   * @param {string, number} evento - El evento del cambio de valor del botón de radio.
   * @param {string} nota - Nota opcional para enviar al diálogo.
   */
  onSeleccionfalsa(evento:string | number, nota?:string): void {
    if (evento && (evento === '0' || evento === 0)) {
      this.enviarDialogData(nota);
      this.esHabilitarElDialogo = true;
    } else {
      this.esHabilitarElDialogo = false;
    }
  
  }

   /**
   * Método para cerrar el modal de confirmación.
   * @returns {void}
   */
  cerrarModal(): void {
    this.esHabilitarElDialogo = false;
  }

  /**
   * @method ngOnDestroy
   * Hook de ciclo de vida que se ejecuta al destruir el componente.
   * Libera recursos y suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
