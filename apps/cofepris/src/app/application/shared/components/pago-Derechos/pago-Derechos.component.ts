import { AvisocalidadStore, SolicitudState } from '../../estados/stores/aviso-calidad.store';
import { Catalogo, InputFecha, InputFechaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, takeUntil } from 'rxjs';
import { AvisoImportacionService } from '../../services/parmiso-importacion.service';
import { AvisocalidadQuery } from '../../estados/queries/aviso-calidad.query';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { FECHA_DE_PAGO } from '../../models/pago-derechos.model';
import { Subject } from 'rxjs';


/**
 * Component Define el componente de Angular.
 * selector 'app-pago-derechos' Selector del componente.
 * standalone true Indica que el componente es independiente.
 * imports Lista de módulos y componentes importados.
 * templateUrl Ruta de la plantilla HTML del componente.
 * styleUrl Ruta de los estilos CSS del componente.
 */
@Component({
  selector: 'app-pago-derechos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CatalogoSelectComponent, TituloComponent, InputFechaComponent],
  templateUrl: './pago-Derechos.component.html',
  styleUrl: './pago-Derechos.component.scss',
})
export class PagoDerechosComponent implements OnDestroy, OnInit {
  /**
   * property {FormGroup} derechosForm - Formulario reactivo para capturar los datos del pago de derechos.
   */
  derechosForm!: FormGroup;

  /**
   * property {SolicitudState} solicitudState - Estado actual de la solicitud.
   */
  public solicitudState!: SolicitudState;

  /**
   * property {Subject<void>} destroyed$ - Sujeto para manejar la destrucción de suscripciones.
   */
  private destroyed$ = new Subject<void>();

  /**
   * property {Catalogo[]} derechosList - Lista de derechos obtenida del servicio.
   */
  public derechosList!: Catalogo[];

  /**
   * property {InputFecha} fechaInicioInput - Configuración de la fecha de pago.
   */
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;

    /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Indica si la fecha ingresada es válida.
   * Cuando es `true`, la fecha es válida; cuando es `false`, la fecha es inválida o pasada.
   */
  public esFechaValida: boolean = true;
  /**
   * constructor
   * param {FormBuilder} fb - Constructor para formularios reactivos.
   * param {AvisoImportacionService} service - Servicio para obtener datos relacionados con el aviso de importación.
   * param {AvisocalidadStore} avisocalidadStore - Store para gestionar el estado de aviso de calidad.
   * param {AvisocalidadQuery} avisocalidadQuery - Query para obtener datos del estado de aviso de calidad.
   */
  constructor(
    private fb: FormBuilder, // Inyección de dependencia para construir formularios.
    private service: AvisoImportacionService, // Inyección del servicio para obtener datos.
    private avisocalidadStore: AvisocalidadStore, // Inyección del store para manejar el estado.
    private avisocalidadQuery: AvisocalidadQuery ,// Inyección de la query para consultar el estado.
    private consultaioQuery: ConsultaioQuery, // Inyección de la query para consultar datos de la aplicación.
  ) {
    //Reservado para futuras inyecciones de dependencias o inicializaciones.
  }

  /**
   * method ngOnInit
   * description Método de inicialización del componente.
   */
  ngOnInit(): void {
    /**
    * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
    *
    * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
    * - Llama a `configurarGrupoForm()` para aplicar configuraciones basadas en el estado recibido.
    * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
    */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe()

    this.configurarGrupoForm(); // Configura el formulario reactivo.
    this.loadComboUnidadMedida(); // Carga la lista de derechos.
  }

/**
 * @method configurarGrupoForm
 * @description Configures the reactive form group for the "Datos del Establecimiento RFC" component.
 * This method initializes the form group with default values and validation rules for the fields:
 * - `rfcDel`: Optional field with a maximum length of 254 characters.
 * - `denominacionRazonSocial`: Required field with a maximum length of 254 characters.
 * - `correoElectronico`: Required field with a valid email format and a maximum length of 320 characters.
 * 
 * @memberof DatosDelEstablecimientoRfcComponent
 */
  configurarGrupoForm(): void {
 this.avisocalidadQuery.selectSolicitud$ // Observa los cambios en el estado de la solicitud.
      .pipe(
        takeUntil(this.destroyed$), // Finaliza la suscripción al destruir el componente.
        map((seccionState) => { // Mapea el estado recibido.
          this.solicitudState = seccionState; // Asigna el estado a la propiedad solicitudState.
        })
      )
      .subscribe(); // Se suscribe al observable.

    // Inicializa el formulario reactivo con los valores del estado.
    this.derechosForm = this.fb.group({
      claveReferencia: [this.solicitudState?.claveReferencia], // Campo claveReferencia.
      cadenaDependencia: [this.solicitudState?.cadenaDependencia], // Campo cadenaDependencia.
      banco: [this.solicitudState?.banco , Validators.required], // Campo banco.
      llavePago: [this.solicitudState?.llavePago], // Campo llavePago.
      fechaPago: [this.solicitudState?.fechaPago , Validators.required], // Campo fechaPago.
      importePago: [this.solicitudState?.importePago], // Campo importePago.
    });

     /*
     * Si el formulario está en modo solo lectura, deshabilita todos los campos.
     * En caso contrario, habilita los campos para permitir la edición.
     * Esto asegura que el formulario refleje correctamente el estado de solo lectura.
     */
    if (this.esFormularioSoloLectura && this.derechosForm ) {
      this.derechosForm.disable();
    } else {
      this.derechosForm.enable();
    }

  }
  /**
   * method loadComboUnidadMedida
   * description Carga la lista de derechos desde el servicio.
   */
  loadComboUnidadMedida(): void {
    this.service.getDatos() // Llama al servicio para obtener los datos.
      .pipe(takeUntil(this.destroyed$)) // Finaliza la suscripción al destruir el componente.
      .subscribe((data): void => { // Maneja los datos recibidos.
        this.derechosList = data as Catalogo[]; // Asigna los datos a la lista de derechos.
      });
  }

  /**
   * method setValoresStore
   * description Actualiza un valor específico en el store.
   * template T
   * param {FormGroup} form - Formulario reactivo.
   * param {string} campo - Nombre del campo en el formulario.
   * param {keyof AvisocalidadStore} metodoNombre - Método del store a invocar.
   */
  setValoresStore<T>(form: FormGroup, campo: string, metodoNombre: keyof AvisocalidadStore): void {
    const VALOR = form.get(campo)?.value as T; // Obtiene el valor del campo.
    (this.avisocalidadStore[metodoNombre] as (value: T) => void)(VALOR); // Llama al método correspondiente del store.
  }

   /**
   * @method onReset
   * @description Limpia todos los campos del formulario de pago de derechos.
   */
  alReiniciar(): void {
    this.derechosForm.reset();
  }

   /**
   * @method onFechaCambiada
   * @description Actualiza la fecha de pago en el formulario.
   *
   * @param {string} fecha - Fecha seleccionada en el componente `InputFecha`.
   */
  onFechaCambiada(fecha: string): void {
    this.derechosForm.patchValue({ fechaPago: fecha });
  }



  /**
   * @description Verifica si un control del formulario es inválido.
   * @param nombreControl El nombre del control a verificar.
   * @returns Verdadero si el control es inválido y está tocado o modificado, de lo contrario, falso.
   */
  esInvalido(nombreControl: string): boolean {
    if (
      nombreControl === 'fechaPago' &&
      this.derechosForm.get('fechaPago')?.value !== '' &&
      this.derechosForm.get('fechaPago')?.value !== null
    ) {
      this.esFechaPasada(this.derechosForm.get('fechaPago')?.value);
      if (!this.esFechaValida) {
        this.derechosForm
          .get('fechaPago')
          ?.setErrors({ esFechaPasada: true });
        return true;
      }

      this.derechosForm
        .get('fechaPago')
        ?.setErrors({ esFechaPasada: false });
      return false;
    }
    const CONTROL = this.derechosForm.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

 /**
   * @method esFechaPasada
   * @description Verifica si una fecha proporcionada es anterior a la fecha actual.
   *
   * @param {string} fechaStr - La fecha en formato de cadena que se desea evaluar.
   *
   * @returns {void} No retorna ningún valor, pero actualiza la propiedad `esFechaValida`
   * indicando si la fecha proporcionada es una fecha pasada.
   *
   * @example
   * // Supongamos que la fecha actual es 2023-03-15
   * this.esFechaPasada('2023-03-14'); // esFechaValida será true
   * this.esFechaPasada('2023-03-16'); // esFechaValida será false
   */
  esFechaPasada(fechaStr: string): void {
    if (!fechaStr) {
      this.esFechaValida = false;
      return;
    }

    const [DAY, MONTH, YEAR] = fechaStr.split('/').map(Number);

    const FECHA_ENTRADA = new Date(YEAR, MONTH - 1, DAY);
    const HOY = new Date();
    if (isNaN(FECHA_ENTRADA.getTime())) {
      this.esFechaValida = false;
      return;
    }
    HOY.setHours(0, 0, 0, 0);
    FECHA_ENTRADA.setHours(0, 0, 0, 0);
    this.esFechaValida = FECHA_ENTRADA <= HOY;
  }


  /**
   * method ngOnDestroy
   * description Método para limpiar las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(); // Emite un valor para finalizar las suscripciones.
    this.destroyed$.complete(); // Completa el Subject.
  }
}
