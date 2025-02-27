import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Catalogo, CatalogoPaises } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { Subject } from 'rxjs';
import { initializeSolicitud230401State, Solicitud230401State, Tramite230401Store } from '../../../../estados/230401/tramite230401.store';
import { ALERTA_DE_MATERIAL } from 'libs/shared/data-access-user/src/tramites/constantes/servicios-extraordinarios.enum';
import { ValidacionesFormularioService } from 'libs/shared/data-access-user/src/core/services/shared/validaciones-formulario/validaciones-formulario.service';
import { CROSLISTA_DE_PAISES, LISTA_DE_ENTRADA_PERSONALIZADA } from 'libs/shared/data-access-user/src/tramites/constantes/230401/invocar-constante.enum';
import { CrossListLable } from 'libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { InvocarActionService } from 'libs/shared/data-access-user/src/core/services/230401/invocar-action.service';

@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.scss'
})
export class DatosSolicitudComponent {
  FormSolicitud!: FormGroup;
  tipoSolicitudSeleccionada!: number;
  paisesOrigen!: CatalogoPaises[];
  paisesProcedencia!: CatalogoPaises[];
  aduanas!: Catalogo[];
  seccionAduanera!: Catalogo[];
  tipoOperacion!: Catalogo[];

  public crosListadepaises = CROSLISTA_DE_PAISES;
  private destroyNotifier$: Subject<void> = new Subject();
  public solicitudState!: Solicitud230401State;
  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Pais de procedencia',
    derecha: 'Pais(es) seleccionados',
  }
  public paisDelProductoLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País donde se elabora el producto',
    derecha: 'País(es) seleccionado(s)',
  }
  public aduanasDeEntradaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Aduanas de entrada disponibles',
    derecha: 'Aduanas de entrada seleccionadas',
  }

  /**
   * Lista de fechas paisDeProcedenciaSeleccionadas.
   */
  paisDeProcedenciaSeleccionadas: string[] = [];

  /**
  * Lista de datos de fechas paisDeProcedenciaDatos.
  */
  paisDeProcedenciaDatos: string[] = [];

  /**
  * Lista de rangos de días seleccionarOrigenDelPais.
  */
  seleccionarOrigenDelPais: string[] = this.crosListadepaises;
  /**
   * Control de formulario para la paisDeProcedenciaFecha.
   */
  paisDeProcedenciaFecha: FormControl = new FormControl('');

  /**
   * Control de formulario para la fecha paisDeProcedenciaFechaSeleccionada.
   */
  paisDeProcedenciaFechaSeleccionada: FormControl = new FormControl('');

  /**
    * Botones de acción disponibles para gestionar las listas de fechas.
    */
  paisDeProcedenciaBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: () => this.agregar(''),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: () => this.agregar('t'),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: () => this.quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: () => this.quitar('t'),
    },
  ];

  /**
   * Lista de fechas paisDelProductoSeleccionadas.
   */
  paisDelProductoSeleccionadas: string[] = [];

  /**
  * Lista de datos de fechas paisDelProductoDatos.
  */
  paisDelProductoDatos: string[] = [];

  /**
  * Lista de rangos de días seleccionarOrigenDelPais.
  */
  listapaisDelProducto: string[] = this.crosListadepaises;
  /**
   * Control de formulario para la paisDelProductoFecha.
   */
  paisDelProductoFecha: FormControl = new FormControl('');

  /**
   * Control de formulario para la fecha paisDelProductoFechaSeleccionada.
   */
  paisDelProductoFechaSeleccionada: FormControl = new FormControl('');

  /**
    * Botones de acción disponibles para gestionar las listas de fechas.
    */
  paisDelProductoBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: () => this.agregarDos(''),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: () => this.agregarDos('t'),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: () => this.quitarDos(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: () => this.quitarDos('t'),
    },
  ];

  /**
  * Lista de fechas aduanasDeEntradaSeleccionadas.
  */
  aduanasDeEntradaSeleccionadas: string[] = [];

  /**
  * Lista de datos de fechas aduanasDeEntradaDatos.
  */
  aduanasDeEntradaDatos: string[] = [];

  /**
  * Lista de rangos de días seleccionarOrigenDelPais.
  */
  listadeEntradaPersonalizada = LISTA_DE_ENTRADA_PERSONALIZADA;
  /**
   * Control de formulario para la aduanasDeEntradaFecha.
   */
  aduanasDeEntradaFecha: FormControl = new FormControl('');

  /**
   * Control de formulario para la fecha aduanasDeEntradaFechaSeleccionada.
   */
  aduanasDeEntradaFechaSeleccionada: FormControl = new FormControl('');

  /**
    * Botones de acción disponibles para gestionar las listas de fechas.
    */
  aduanasDeEntradaBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: () => this.agregarTres(''),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: () => this.agregarTres('t'),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: () => this.quitarTres(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: () => this.quitarTres('t'),
    },
  ];

  constructor(public invocarService: InvocarActionService,
    public tramite230401Store: Tramite230401Store, private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService

  ) { }

  ngOnInit(): void {
    initializeSolicitud230401State();
    this.invocarService.inicializaPasoUnoDatosCatalogos();
    this.creatFormSolicitud();
  }

  /**
   * Una constante que contiene el valor del objeto 'PROTESTA'.
   * Se utiliza para almacenar datos adicionales relacionados con el componente.
   */

  TEXTOS = ALERTA_DE_MATERIAL;
  /**
   * 
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
  public infoAlert = 'alert-info';

  /**
  * Verifica si un campo específico en un formulario es válido.
  *
  * @param {FormGroup} form - El formulario que contiene el campo a validar.
  * @param {string} field - El nombre del campo a validar.
  * @returns {boolean} - Retorna `true` si el campo es válido, de lo contrario `false`.
  */
  isValid(form: FormGroup, field: string): any {
    return this.validacionesService.isValid(form, field);
  }
  /**
 * Agrega elementos a la lista de fechas según el tipo especificado.
 * @param {string} tipo - Tipo de acción a realizar.
 */
  agregar(tipo: string): void {
    if (tipo === 't') {
      this.paisDeProcedenciaSeleccionadas = [...this.seleccionarOrigenDelPais];
      this.paisDeProcedenciaDatos = [];
    } else {
      const fechaValor = this.paisDeProcedenciaFecha.value.map(Number);
      this.paisDeProcedenciaSeleccionadas.push(this.paisDeProcedenciaDatos[fechaValor]);
      this.paisDeProcedenciaDatos.splice(fechaValor, 1);
    }
  }

  /**
   * Elimina elementos de la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  quitar(tipo: string = ''): void {
    if (tipo === 't') {
      this.paisDeProcedenciaDatos = [...this.paisDeProcedenciaSeleccionadas];
      this.paisDeProcedenciaSeleccionadas = [];
    } else {
      const fechaValor = this.paisDeProcedenciaFechaSeleccionada.value.map(Number);
      this.paisDeProcedenciaDatos.push(this.paisDeProcedenciaSeleccionadas[fechaValor]);
      this.paisDeProcedenciaSeleccionadas.splice(fechaValor, 1);
    }
  }
  /**
* Agrega elementos a la lista de fechas según el tipo especificado.
* @param {string} tipo - Tipo de acción a realizar.
*/
  agregarDos(tipo: string): void {
    if (tipo === 't') {
      this.paisDelProductoSeleccionadas = [...this.listapaisDelProducto];
      this.paisDelProductoDatos = [];
    } else {
      const fechaValor = this.paisDelProductoFecha.value.map(Number);
      this.paisDelProductoSeleccionadas.push(this.paisDelProductoDatos[fechaValor]);
      this.paisDelProductoDatos.splice(fechaValor, 1);
    }
  }

  /**
   * Elimina elementos de la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  quitarDos(tipo: string = ''): void {
    if (tipo === 't') {
      this.paisDelProductoDatos = [...this.paisDelProductoSeleccionadas];
      this.paisDelProductoSeleccionadas = [];
    } else {
      const fechaValor = this.paisDeProcedenciaFechaSeleccionada.value.map(Number);
      this.paisDelProductoDatos.push(this.paisDelProductoSeleccionadas[fechaValor]);
      this.paisDelProductoSeleccionadas.splice(fechaValor, 1);
    }
  }

  /**
* Agrega elementos a la lista de fechas según el tipo especificado.
* @param {string} tipo - Tipo de acción a realizar.
*/
  agregarTres(tipo: string): void {
    if (tipo === 't') {
      this.aduanasDeEntradaSeleccionadas = [...this.seleccionarOrigenDelPais];
      this.aduanasDeEntradaDatos = [];
    } else {
      const fechaValor = this.aduanasDeEntradaFecha.value.map(Number);
      this.aduanasDeEntradaSeleccionadas.push(this.aduanasDeEntradaDatos[fechaValor]);
      this.aduanasDeEntradaDatos.splice(fechaValor, 1);
    }
  }

  /**
   * Elimina elementos de la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  quitarTres(tipo: string = ''): void {
    if (tipo === 't') {
      this.aduanasDeEntradaDatos = [...this.aduanasDeEntradaSeleccionadas];
      this.aduanasDeEntradaSeleccionadas = [];
    } else {
      const fechaValor = this.aduanasDeEntradaFechaSeleccionada.value.map(Number);
      this.aduanasDeEntradaDatos.push(this.aduanasDeEntradaSeleccionadas[fechaValor]);
      this.aduanasDeEntradaSeleccionadas.splice(fechaValor, 1);
    }
  }

  /**
  * Establece los valores en el store de tramite5701.
  *
  * @param {FormGroup} form - El formulario del cual se obtiene el valor.
  * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
  * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
  * @returns {void}
  */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: string): void {
    const valor = form.get(campo)?.value;
    (this.tramite230401Store as any)[metodoNombre](valor);
    if (campo === 'cantidad' && valor !== null && valor !== undefined) {
      const numeroActivo = Number(valor);
      const valorFormateado = String.fromCharCode(numeroActivo);
      this.tramite230401Store.setCantidadLetra(valorFormateado);
    }
  }

  /**
   * Selecciona el tipo de solicitud y actualiza el estado correspondiente.
   * 
   * Este método obtiene el valor del tipo de solicitud del formulario,
   * lo convierte a un número entero y lo asigna a la propiedad 
   * `tipoSolicitudSeleccionada`. Luego, actualiza el estado del 
   * `tramite230401Store` con el tipo de solicitud seleccionado.
   */
  tipoSolicitudSeleccion(): void {
    this.tipoSolicitudSeleccionada = parseInt(
      this.FormSolicitud.get('tipoSolicitud')?.value,
      10
    );
    const tipoSolicitud = this.FormSolicitud.get('tipoSolicitud')?.value;
    this.tramite230401Store.setTipoSolicitud(tipoSolicitud);
  }

  /**
   * Selecciona el número de permiso de coferprise y actualiza el estado correspondiente.
   */
  noDePermisocoferpriseSeleccion(): void {
    const noDePermisocoferprise = this.FormSolicitud.get('noDePermisocoferprise')?.value;
    this.tramite230401Store.setNoDePermisocoferprise(noDePermisocoferprise);
  }

  /**
   * Selecciona la fracción arancelaria y actualiza el estado correspondiente.
   */
  fraccionArancelariaSeleccion(): void {
    const fraccionArancelaria = this.FormSolicitud.get('fraccionArancelaria')?.value;
    this.tramite230401Store.setFraccionArancelaria(fraccionArancelaria);
  }

  /**
   * Selecciona la autorización y actualiza el estado correspondiente.
   */
  seleccioneAutorizacion(): void {
    const autorizacion = this.FormSolicitud.get('autorizacion')?.value;
    this.tramite230401Store.setAutorizacion(autorizacion);
  }

  /**
   * Selecciona el número CAS y actualiza el estado correspondiente.
   */
  numeroCasSeleccione(): void {
    const numeroCas = this.FormSolicitud.get('numeroCas')?.value;
    this.tramite230401Store.setNumeroCas(numeroCas);
  }

  /**
   * Selecciona la clasificación y actualiza el estado correspondiente.
   */
  clasificacionSeleccione(): void {
    const clasificacion = this.FormSolicitud.get('clasificacion')?.value;
    this.tramite230401Store.setClasificacion(clasificacion);
  }

  /**
   * Selecciona el estado físico y actualiza el estado correspondiente.
   */
  estadoFisicoSeleccione(): void {
    const estadoFisico = this.FormSolicitud.get('estadoFisico')?.value;
    this.tramite230401Store.setEstadoFisico(estadoFisico);
  }

  /**
   * Selecciona los datos del objeto y actualiza el estado correspondiente.
   */
  datosObjectoSeleccione(): void {
    const datosObjecto = this.FormSolicitud.get('datosObjecto')?.value;
    this.tramite230401Store.setDatosObjecto(datosObjecto);
  }

  /**
   * Selecciona la unidad de medida y actualiza el estado correspondiente.
   */
  unidadDeMedidaSeleccione(): void {
    const unidadDeMedida = this.FormSolicitud.get('unidadDeMedida')?.value;
    this.tramite230401Store.setUnidadDeMedida(unidadDeMedida);
  }

  /**
    * Crea el formulario de solicitud.
    * @return {void} No retorna ningún valor.
    */
  creatFormSolicitud(): void {
    this.FormSolicitud = this.fb.group({
      tipoSolicitud: [
        this.solicitudState?.tipoSolicitud,
        [Validators.required],
      ],
      autorizacion: [this.solicitudState?.autorizacion],
      noDePermisocoferprise: [
        this.solicitudState?.noDePermisocoferprise,
        [Validators.required],
      ],
      nombreComercial: [
        { value: this.solicitudState?.nombreComercial, disabled: true },
      ],
      cantidadAtorizada: [
        { value: this.solicitudState?.cantidadAtorizada, disabled: true },
      ],
      fraccionArancelaria: [
        this.solicitudState?.fraccionArancelaria,
        [Validators.required],
      ],
      descripcionDeLaFraccion: [
        { value: this.solicitudState?.descripcionDeLaFraccion, disabled: true },
      ],
      descripcionNoArancelaria: [
        { value: this.solicitudState?.descripcionNoArancelaria, disabled: true },
      ],
      nombreQuimico: [
        { value: this.solicitudState?.nombreQuimico, disabled: true },
      ],
      numeroCas: [
        this.solicitudState?.numeroCas,
        [Validators.required],
      ],
      nombreDeLaMercancia: [
        this.solicitudState?.nombreDeLaMercancia,
        [Validators.maxLength(50)],
      ],
      unNumero: [
        this.solicitudState?.unNumero,
        [Validators.required, , Validators.min(1), Validators.max(10000)],
      ],
      datosNombreComercial: [
        this.solicitudState?.datosNombreComercial,
        [Validators.maxLength(50)],
      ],
      datosNumeroComun: [
        this.solicitudState?.datosNumeroComun,
        [Validators.maxLength(50)],
      ],
      datosPorcentaje: [
        this.solicitudState?.datosPorcentaje,
        [Validators.required, , Validators.min(1), Validators.max(10000)],
      ],
      datosComponentes: [
        this.solicitudState?.datosComponentes,
        [Validators.maxLength(50)],
      ],
      clasificacion: [
        this.solicitudState?.clasificacion,
        [Validators.required],
      ],
      estadoFisico: [
        this.solicitudState?.estadoFisico,
        [Validators.required],
      ],
      datosObjecto: [
        this.solicitudState?.datosObjecto,
        [Validators.required],
      ],
      especifique: [
        this.solicitudState?.especifique,
        [Validators.maxLength(50)],
      ],
      especifiqueDos: [
        this.solicitudState?.especifiqueDos,
        [Validators.maxLength(50)],
      ],
      cantidad: [
        this.solicitudState?.cantidad,
        [Validators.required, , Validators.min(1), Validators.max(10000)],
      ],
      cantidadLetra: [
        { value: this.solicitudState?.cantidadLetra, disabled: true },
      ],
      unidadDeMedida: [
        this.solicitudState?.unidadDeMedida,
        [Validators.required],
      ],
    });

  }



  /**
 * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
 *
 * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
 * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
 *
 * @returns {void} No retorna ningún valor.
 */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
