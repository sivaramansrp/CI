import { AbstractControl, FormBuilder, ValidatorFn } from '@angular/forms';
import { Catalogo, ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { EXENTO_DE_PAGO } from '../../constantes/certificado-zoosanitario.enum';
import { FormGroup } from '@angular/forms';
import { MediodetransporteService } from '../../services//medio-de-transporte.service';
import { ReplaySubject } from 'rxjs';
import { Solicitud220402Query } from '../../estados/queries/tramites220402.query';
import { Solicitud220402State } from '../../estados/tramites/tramites220402.store';
import { Solicitud220402Store } from '../../estados/tramites/tramites220402.store';
import { Subject } from 'rxjs';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-pago-de-derecho',
  templateUrl: './pago-de-derecho.component.html',
  styleUrl: './pago-de-derecho.component.scss',
})
export class PagoDeDerechoComponent implements OnInit, OnDestroy {
  /**
   * @property {ReplaySubject<boolean>} destroyed$
   * @description ReplaySubject utilizado para notificar la destrucción del componente y evitar fugas de memoria.
   * 
   * Este ReplaySubject emite un valor cuando el componente es destruido y se completa para liberar recursos.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * @property {Solicitud220402State} derechoState
   * @description Estado actual del derecho, que contiene información relacionada con el trámite y el solicitante.
   */
  public derechoState!: Solicitud220402State;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Subject utilizado para notificar y completar las suscripciones activas al destruir el componente, evitando fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {FormGroup} FormSolicitud
   * @description Formulario principal que contiene los datos del derecho.
   */
  FormSolicitud!: FormGroup;

  /**
   * @property {string} respuesta
   * @description Respuesta obtenida del servidor o utilizada para mostrar información en el componente.
   * @default ''
   */
  respuesta: string = '';

  /**
   * @property {CatalogosSelect} mercanciaCatalogo
   * @description Catálogo que contiene información sobre las mercancías disponibles.
   */
  public mercanciaCatalogo!: CatalogosSelect;

  /**
   * @property {Catalogo} bancoSeleccionado
   * @description Banco seleccionado por el usuario en el formulario.
   */
  bancoSeleccionado!: Catalogo;

  /**
    * Opciones disponibles para el grupo de radio.
    */
  radioOpcions = EXENTO_DE_PAGO;

  /**
   * @property {CatalogosSelect} bancoCatalogo
   * @description Catálogo que contiene información sobre los bancos disponibles.
   * 
   * @property {string} labelNombre - Nombre del catálogo.
   * @property {boolean} required - Indica si el catálogo es obligatorio.
   * @property {string} primerOpcion - Texto de la primera opción del catálogo.
   * @property {Catalogo[]} catalogos - Lista de opciones disponibles en el catálogo.
   */
  public bancoCatalogo: CatalogosSelect = {
    labelNombre: 'Banco',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };
  /**
   * @property {ConsultaioState} consultaDatos
   * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   */
  consultaDatos!: ConsultaioState;
  /**
   * @property {boolean} soloLectura
   * @description Indica si el formulario o los campos están en modo de solo lectura.
   * @default false
   */
  soloLectura: boolean = false;
  /**
   * @constructor
   * @description Constructor del componente `PagoDeDerechoComponent`.
   * 
   * Este constructor inicializa los servicios necesarios para el funcionamiento del componente y realiza la carga inicial de datos del catálogo de bancos mediante el método `fetchBancoData`.
   * 
   */
  constructor(
    private fb: FormBuilder,
    private solicitud220402Store: Solicitud220402Store,
    private solicitud220402Query: Solicitud220402Query,
    private validacionesService: ValidacionesFormularioService,
    private mediodetransporteService: MediodetransporteService,
    private consultaioQuery: ConsultaioQuery,

  ) {
    this.fetchBancoData();
  }
  /**
  * @method ngOnInit
  * @description Inicializa el componente, configura el estado del formulario y carga los datos necesarios.
  */
  ngOnInit(): void {
    this.getMercancia();
    this.solicitud220402Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.derechoState = seccionState;
        })
      )
      .subscribe();
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    this.inicializarFormulario();
  }
  /**
   * @method inicializarFormulario
   * @description Inicializa el formulario `FormSolicitud` con los datos del estado actual y configura su comportamiento dinámico.
   */
  inicializarFormulario(): void {
    this.FormSolicitud = this.fb.group({
      datosImportadorExportador: this.fb.group({
        exentoDePago: [this.derechoState?.exentoDePago, [Validators.required]],
        nombreImportExport: [this.derechoState?.nombreImportExport, [Validators.required]],
        justificacion: [this.derechoState?.justificacion, [Validators.required]],
        claveDeReferencia: [this.derechoState?.claveDeReferencia, []],
        cadenaDependencia: [this.derechoState?.cadenaDependencia, [Validators.required]],
        banco: [this.derechoState?.banco, [Validators.required]],
        llaveDePago: [this.derechoState?.llaveDePago, [Validators.required]],
        fechaPago: [this.derechoState?.fechaPago, [Validators.required, PagoDeDerechoComponent.fechaLimValidator()]],
        importePago: [this.derechoState?.importePago, []],
      }),
    });
    this.inicializarEstadoFormulario();

    // Activa la lógica cuando el formulario se ha inicializado
    if (this.consultaDatos.create) {
      this.actualizarCamposDeFormularioBasadosEnExentoDePago();
    }
  }
  /**
   * @method inicializarEstadoFormulario
   * @description Configura el estado del formulario `FormSolicitud` según el modo de solo lectura.
   */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.FormSolicitud?.disable();
    } else {
      this.FormSolicitud?.enable();
    }
  }
  /**
   * @method exentoDePagoChange
   * @description Actualiza los campos del formulario según el valor seleccionado en el campo 'exentoDePago'.
   */
  exentoDePagoChange(): void {
    this.actualizarCamposDeFormularioBasadosEnExentoDePago();
  }
  /**
   * @method actualizarBanco
   * @description Actualiza el banco seleccionado en el formulario con el valor proporcionado.
   */
  actualizarBanco(e: Catalogo): void {
    this.bancoSeleccionado = e;
  }
  /**
   * @method fetchBancoData
   * @description Obtiene los datos del catálogo de bancos y los asigna al formulario.
   */
  fetchBancoData(): void {
    this.mediodetransporteService
      .getMedioDeTransporte()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data): void => {
        this.bancoCatalogo.catalogos = data as Catalogo[];
      });
  }
  /**
   * Actualiza los campos del formulario en función del valor de 'exentoDePago'.
   *
   * Si el valor es 'No', establece valores específicos en los campos del formulario y los desactiva.
   * De lo contrario, restablece y desactiva los campos del formulario.
   *
   * @param value - El valor de 'exentoDePago' para determinar las actualizaciones de los campos del formulario.
   */

  actualizarCamposDeFormularioBasadosEnExentoDePago(): void {
    const EXENTODEPAGO = this.FormSolicitud.get('datosImportadorExportador.exentoDePago')?.value;
    this.FormSolicitud.reset({
      datosImportadorExportador: { exentoDePago: EXENTODEPAGO }
    });
    this.FormSolicitud?.enable();
    if (EXENTODEPAGO === 'No') {
      this.FormSolicitud.patchValue({
        datosImportadorExportador: { claveDeReferencia: 454000554, importePago: 594.0 }
      });
      this.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.setValidators([Validators.required]);
      this.FormSolicitud.get('datosImportadorExportador.llaveDePago')?.setValidators([Validators.required]);
      this.FormSolicitud.get('datosImportadorExportador.fechaPago')?.setValidators([Validators.required, PagoDeDerechoComponent.fechaLimValidator()]);
      this.FormSolicitud.get('datosImportadorExportador.justificacion')?.setValidators([]);
      this.FormSolicitud.get('datosImportadorExportador.justificacion')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.claveDeReferencia')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.importePago')?.disable();
    } else {
      this.FormSolicitud.get('datosImportadorExportador.justificacion')?.setValidators([Validators.required]);
      this.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.setValidators([]);
      this.FormSolicitud.get('datosImportadorExportador.llaveDePago')?.setValidators([]);
      this.FormSolicitud.get('datosImportadorExportador.fechaPago')?.setValidators([]);
      this.FormSolicitud.get('datosImportadorExportador.claveDeReferencia')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.importePago')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.llaveDePago')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.fechaPago')?.disable();
    }
    const GRUPO = this.FormSolicitud.get('datosImportadorExportador') as FormGroup;
    if (GRUPO) {
      Object.values(GRUPO.controls).forEach(control => {
        control.updateValueAndValidity();
      });
    }
  }
  /**
   * Inicializa el objeto `mercancia` con propiedades y valores predefinidos.
   *
   * El objeto `mercancia` contiene las siguientes propiedades:
   * - `labelNombre`: Una cadena de texto que se establece en 'Mercancía', utilizada como etiqueta o título.
   * - `required`: Un valor booleano que se establece en `true`, indicando que este campo es obligatorio.
   * - `primerOpcion`: Una cadena de texto que se establece en 'Seleccione un valor', utilizada como opción predeterminada o de marcador de posición en un menú desplegable.
   * - `catalogos`: Un arreglo de objetos que representan las opciones en el catálogo. Cada objeto tiene:
   *   - `id`: Un identificador único para la opción.
   *   - `descripcion`: Una cadena de texto que describe la opción. Actualmente, ambas opciones tienen la misma descripción 'Opción 1'.
   */

  public getMercancia(): void {
    this.mercanciaCatalogo = {
      labelNombre: 'Mercancía',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'Opción 1',
        },
        {
          id: 2,
          descripcion: 'Opción 1',
        },
      ],
    };
  }

  /**
   * Este método se utiliza para validar la forma del transporte. - 220402
   * @param form: Forma del transporte
   * @param field: campo del formulario
   * @returns Validaciones del formulario
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Establece los valores en el store de tramite5701.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Solicitud220402Store): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud220402Store[metodoNombre] as (value: (boolean | string | null)) => void)(VALOR);
  }

  /**
  * Obtiene el grupo de formulario 'datosImportadorExportador' del formulario principal 'FormSolicitud'.
  *
  * @returns {FormGroup} El grupo de formulario 'datosImportadorExportador'.
  */
  get datosImportadorExportador(): FormGroup {
    return this.FormSolicitud.get('datosImportadorExportador') as FormGroup;
  }
  /**
   * Validador para asegurar que la fecha seleccionada no sea en el futuro.
   */
  public static fechaLimValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: unknown } | null => {
      const LIM = control.value;
      if (LIM) {
        const [YEAR, MONTH, DAY] = LIM.split('-');
        const FECHA = new Date(+Number(YEAR), +Number(MONTH) - 1, +Number(DAY));
        const TODAY = new Date();
        if (FECHA.getTime() > TODAY.getTime()) {
          return { fechaLim: true }; // Retorna error si la fecha está en el futuro
        }
      }
      return null; // Fecha válida
    };
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * 
   * Libera los recursos y cancela las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
