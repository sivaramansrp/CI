import {
  ALERTA_DE_MANIFESTO_Y_DECLARACIONES,
  ALERTA_OPCIONS,
  CAMPOS_ADICIONALES_POR_PROCEDIMIENTO_MAP,
  CAMPOS_REQUERIDOS_FORMULARIO_MAP,
  CORREO_ELECTRONICO,
  PROCEDIMIENTOS_NO_PARA_ELEMENTO_CALLE,
  PROCEDIMIENTOS_NO_PARA_ELEMENTO_COLAPSABLE,
  PROCEDIMIENTOS_NO_PARA_ELEMENTO_CORREO_ELECTRONIC,
  PROCEDIMIENTOS_NO_PARA_ELEMENTO_RFC_DEL_SANITARIO,
  PROCEDIMIENTOS_PARA_DESHABILITAR_MUNICIPIO_ALCALDIA,
  REPRESENTANTE_LEGAL,
} from '../../constantes/datos-solicitud.enum';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Catalogo,
  DatosDeTablaSeleccionados,
  DatosSolicitudFormState,
  OpcionConfig,
  TablaMercanciasConfig,
  TablaMercanciasDatos,
  TablaOpcionConfig,
} from '../../models/datos-solicitud.model';
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { delay, takeUntil } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ScianConfig } from '../../models/datos-solicitud.model';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaScianConfig } from '../../models/datos-solicitud.model';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    AlertComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  /**
   * @property {Subject<void>} destroyNotifier$
   * Subject utilizado para cancelar suscripciones activas al destruir el componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {ScianConfig<TablaScianConfig>} scianConfig
   * Configuración de la tabla SCIAN recibida como input.
   */
  @Input() public scianConfig!: ScianConfig<TablaScianConfig>;

  /**
   * @property {TablaMercanciasConfig<TablaMercanciasDatos>} tablaMercanciasConfig
   * Configuración de la tabla de mercancías recibida como input.
   */
  @Input()
  public tablaMercanciasConfig!: TablaMercanciasConfig<TablaMercanciasDatos>;

  /**
   * @property {OpcionConfig<TablaOpcionConfig>} opcionConfig
   * Configuración de la tabla de opciones.
   */
  @Input() public opcionConfig!: OpcionConfig<TablaOpcionConfig>;

  /**
   * @property {DatosSolicitudFormState} datosSolicitudFormState
   * Estado inicial del formulario de solicitud, recibido como input.
   */
  @Input() public datosSolicitudFormState!: DatosSolicitudFormState;

  /**
   * @property {boolean} opcionesColapsableState
   * Estado colapsable inicial para mostrar u ocultar ciertas secciones.
   */
  @Input() public opcionesColapsableState!: boolean;

  /**
   * @property {number} idProcedimiento
   * Identificador único del procedimiento asociado a la solicitud.
   * Este valor es recibido como un input desde el componente padre.
   *
   * @decorador @Input
   */
  @Input() public idProcedimiento!: number;

  /**
   * @event opcionSeleccionado
   * Emite las opciones seleccionadas al componente padre.
   */
  @Output() opcionSeleccionado: EventEmitter<TablaOpcionConfig[]> =
    new EventEmitter<TablaOpcionConfig[]>();

  /**
   * @event scianSeleccionado
   * Emite los registros seleccionados de SCIAN.
   */
  @Output() scianSeleccionado: EventEmitter<TablaScianConfig[]> =
    new EventEmitter<TablaScianConfig[]>();

  /**
   * @event mercanciasSeleccionado
   * Emite los registros de mercancías seleccionados.
   */
  @Output() mercanciasSeleccionado: EventEmitter<TablaMercanciasDatos[]> =
    new EventEmitter<TablaMercanciasDatos[]>();

  /**
   * @event datosDeTablaSeleccionados
   * Emite una estructura que agrupa las selecciones de SCIAN, opciones y mercancías.
   */
  @Output() datosDeTablaSeleccionados: EventEmitter<DatosDeTablaSeleccionados> =
    new EventEmitter<DatosDeTablaSeleccionados>();

  /**
   * @event datasolicituActualizar
   * Emite el estado actualizado del formulario cada vez que cambia su valor.
   */
  @Output() datasolicituActualizar: EventEmitter<DatosSolicitudFormState> =
    new EventEmitter<DatosSolicitudFormState>();

  /**
   * @property {FormGroup} datosSolicitudForm
   * Formulario reactivo principal del componente.
   */
  public datosSolicitudForm!: FormGroup;

  /**
   * @property {Catalogo[]} estadoDatos
   * Lista de estados para catálogos relacionados.
   */
  public estadoDatos: Catalogo[] = [];

  /**
   * @property {Catalogo[]} regimenDatos
   * Lista de regímenes disponibles.
   */
  public regimenDatos: Catalogo[] = [];

  /**
   * @property {Catalogo[]} adunasDeEntradasDatos
   * Lista de aduanas de entrada disponibles.
   */
  public adunasDeEntradasDatos: Catalogo[] = [];

  /**
   * @property {string} infoAlert
   * Clase CSS usada para mostrar alertas informativas.
   */
  public infoAlert = 'alert-info';

  /**
   * @property {string} alertaDeManifestoContenido
   * Mensaje de alerta relacionado con el manifiesto y declaraciones.
   */
  public alertaDeManifestoContenido = ALERTA_DE_MANIFESTO_Y_DECLARACIONES;

  /**
   * @property {string} alertaOpicion
   * Mensaje de alerta para la tabla de opciones.
   */
  public alertaOpicion = ALERTA_OPCIONS;

  /**
   * @property {TablaMercanciasDatos[]} tablaMercanciasLista
   * Lista de mercancías mostradas en la tabla.
   */
  public tablaMercanciasLista: TablaMercanciasDatos[] = [];

  /**
   * @property {TablaScianConfig[]} scianLista
   * Lista de registros SCIAN seleccionados.
   */
  public scianLista: TablaScianConfig[] = [];

  /**
   * @property {TablaOpcionConfig[]} opcionLista
   * Lista de opciones seleccionadas.
   */
  public opcionLista: TablaOpcionConfig[] = [];

  /**
   * @property {boolean} opcionesColapsable
   * Controla el estado de colapsado de la sección de opciones.
   */
  public opcionesColapsable = false;

  /**
   * @property {boolean} mostrarElementoColapsable
   * Controla si se debe mostrar un elemento colapsable en la interfaz de usuario.
   *
   * @description
   * Este valor se utiliza para determinar si un elemento colapsable debe ser visible
   * o no, dependiendo de la lógica implementada en el componente.
   */
  public mostrarElementoColapsable = true;

  /**
   * @property {boolean} mostrarCorreoElectronico
   * Controla la visibilidad del campo de correo electrónico en el formulario.
   *
   * @description
   * Este valor se utiliza para determinar si el campo de correo electrónico debe ser visible
   * o no, dependiendo de la lógica implementada en el componente.
   */
  public mostrarCorreoElectronico = true;

  public correoElectronicoMostrar = true;

  public mostrarRepresentanteLegal = true;
  

  /**
   * @property {boolean} mostrarRFCSanitario
   * Controla la visibilidad del campo de RFC sanitario en el formulario.
   *
   * @description
   * Este valor se utiliza para determinar si el campo de RFC sanitario debe ser visible
   * o no, dependiendo de la lógica implementada en el componente.
   */
  public mostrarRFCSanitario = true;

  /**
   * @property {boolean} mostrarRFCCalle
   * Controla la visibilidad del campo de RFC de calle en el formulario.
   *
   * @description
   * Este valor se utiliza para determinar si el campo de RFC de calle debe ser visible
   * o no, dependiendo de la lógica implementada en el componente.
   */
  public mostrarRFCCalle = true;
  /**
   * @constructor
   * Inyecta los servicios necesarios para el enrutamiento y construcción del formulario.
   *
   * @param fb - FormBuilder para crear el formulario reactivo.
   * @param router - Servicio de enrutamiento.
   * @param activatedRoute - Ruta actual activa.
   */
  constructor(
    public fb: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public datosSolicitudService: DatosSolicitudService
  ) {
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'regimenDatos',
      '/cofepris/regimenDatos.json'
    );
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'adunasDeEntradasDatos',
      '/cofepris/adunasDeEntradasDatos.json'
    );
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'estadoDatos',
      '/cofepris/estadoDatos.json'
    );
  }

  /**
   * @method ngOnInit
   * @description Hook que se ejecuta al inicializar el componente.
   * Crea el formulario, activa la escucha de cambios y sincroniza el estado con el input.
   */
  ngOnInit(): void {
    this.mostrarCorreoElectronico =
      PROCEDIMIENTOS_NO_PARA_ELEMENTO_CORREO_ELECTRONIC.includes(
        this.idProcedimiento
      )
        ? false
        : true;
    this.crearDatosSolicitudForm();
    this.actualizarDatosFormularioSolicitud();
    this.datosSolicitudForm.valueChanges
      .pipe(takeUntil(this.destroyNotifier$), delay(10))
      .subscribe((value) => {
        if (value) {
          const VALORES_COMPLETOS = this.datosSolicitudForm.getRawValue();
          this.datasolicituActualizar.emit(VALORES_COMPLETOS);
        }
      });

    this.opcionesColapsable = this.opcionesColapsableState;
    this.mostrarElementoColapsable =
      PROCEDIMIENTOS_NO_PARA_ELEMENTO_COLAPSABLE.includes(this.idProcedimiento)
        ? false
        : true;
    this.mostrarRFCSanitario =
      PROCEDIMIENTOS_NO_PARA_ELEMENTO_RFC_DEL_SANITARIO.includes(
        this.idProcedimiento
      )
        ? false
        : true;
    this.mostrarRFCCalle = PROCEDIMIENTOS_NO_PARA_ELEMENTO_CALLE.includes(
      this.idProcedimiento
    )
      ? false
      : true;

    this.correoElectronicoMostrar = CORREO_ELECTRONICO.includes(this.idProcedimiento)
      ? true
      : false;

    this.mostrarRepresentanteLegal = REPRESENTANTE_LEGAL.includes(this.idProcedimiento)
      ? false
      : true;

  }

  /**
   * @method crearDatosSolicitudForm
   * @description Crea y configura el formulario reactivo `datosSolicitudForm` con los campos necesarios
   *              para capturar la información de la solicitud. Cada campo incluye validaciones como
   *              longitud mínima, longitud máxima y obligatoriedad.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  crearDatosSolicitudForm(): void {
    this.datosSolicitudForm = this.fb.group({
      rfcSanitario: [
        this.datosSolicitudFormState.rfcSanitario,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150),
        ],
      ],
      denominacionRazon: [
        this.datosSolicitudFormState.denominacionRazon,
        [
          Validators.minLength(2),
          Validators.maxLength(150),
        ],
      ],
      correoElectronico: [
        this.datosSolicitudFormState.correoElectronico,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150),
        ],
      ],
      codigoPostal: [
        this.datosSolicitudFormState.codigoPostal,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150),
        ],
      ],
      estado: [
        this.datosSolicitudFormState.estado,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150),
        ],
      ],
      municipioAlcaldia: [
        {
          value: this.datosSolicitudFormState.municipioAlcaldia,
          disabled:
            PROCEDIMIENTOS_PARA_DESHABILITAR_MUNICIPIO_ALCALDIA.includes(
              this.idProcedimiento
            ),
        },
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150),
        ],
      ],
      localidad: [this.datosSolicitudFormState.localidad],
      colonia: [this.datosSolicitudFormState.colonia],
      calleYNumero: [
        this.datosSolicitudFormState.calleYNumero,
        [Validators.required],
      ],
      calle: [this.datosSolicitudFormState.calle, [Validators.required]],
      lada: [this.datosSolicitudFormState.lada, [Validators.required]],
      telefono: [this.datosSolicitudFormState.telefono, [Validators.required]],
      aviso: [this.datosSolicitudFormState.aviso],
      licenciaSanitaria: [
        this.datosSolicitudFormState.licenciaSanitaria,
        [Validators.required],
      ],
      regimen: [this.datosSolicitudFormState.regimen, [Validators.required]],
      adunasDeEntradas: [
        this.datosSolicitudFormState.adunasDeEntradas,
        [Validators.required],
      ],
      aeropuerto: [
        this.datosSolicitudFormState.aeropuerto,
        [Validators.required],
      ],
      publico: [this.datosSolicitudFormState.publico, [Validators.required]],
      representanteRfc: [
        this.datosSolicitudFormState.representanteRfc,
        [Validators.required],
      ],
      representanteNombre: [
        this.datosSolicitudFormState.representanteNombre,
        [Validators.required],
      ],
      apellidoPaterno: [
        this.datosSolicitudFormState.apellidoPaterno,
        [Validators.required],
      ],
      apellidoMaterno: [
        this.datosSolicitudFormState.apellidoMaterno,
        [Validators.required],
      ],
    });
  }

  /**
 * @method actualizarDatosFormularioSolicitud
 * @description Actualiza las validaciones de los campos del formulario `datosSolicitudForm`
 * en función de los procedimientos definidos en `CAMPOS_REQUERIDOS_FORMULARIO_MAP`.
 
 */
  actualizarDatosFormularioSolicitud():void{
    CAMPOS_REQUERIDOS_FORMULARIO_MAP.forEach((procedimientos, campo) => {
      if (procedimientos?.includes(this.idProcedimiento)) {
        const CONTROL = this.datosSolicitudForm.get(campo);
        if (CONTROL) {
          CONTROL.setValidators(Validators.required);
          CONTROL.updateValueAndValidity();
        }
      }
    });
  }

  /**
   * Valida si el campo de un formulario no contiene errores
   * @param {AbstractControl} control  : Control del formulario
   * @param {string} campo  : Nombre del campo a validar, si el control es un FormGroup
   * @returns {boolean | null} : Retorna true si el campo contiene errores y ha sido tocado, de lo contrario retorna false
   */
  // eslint-disable-next-line class-methods-use-this
  public isValid(control: AbstractControl, campo?: string): boolean | null {
    if (control instanceof FormGroup && campo) {
      return control.controls[campo].errors && control.controls[campo].touched;
    }
    return control.errors && control.touched;
  }

  /**
   * Busca el RFC del representante en el formulario y, si existe,
   * actualiza los campos relacionados con el nombre, apellido paterno
   * y apellido materno del representante con valores predeterminados.
   *
   * @remarks
   * Este método verifica si el campo 'representanteRfc' tiene un valor
   * en el formulario `datosSolicitudForm`. Si el valor está presente,
   * se actualizan los campos 'representanteNombre', 'apellidoPaterno'
   * y 'apellidoMaterno' con datos específicos.
   */
  buscarRepresentanteRfc(): void {
    const RFC = this.datosSolicitudForm.get('representanteRfc')?.value;
    if (RFC) {
      this.datosSolicitudForm.patchValue({
        representanteNombre: 'EUROFOODS DE MEXICO',
        apellidoPaterno: 'GONZALEZ',
        apellidoMaterno: 'PINAL',
      });
    }
  }

  /**
   * Elimina elementos de la configuración SCIAN que coincidan con los elementos de la lista SCIAN.
   *
   * Este método filtra los datos de la configuración SCIAN (`scianConfig.datos`) eliminando
   * aquellos elementos cuya clave coincida con algún elemento de la lista SCIAN (`scianLista`).
   *
   * Si hay un elemento seleccionado (`scianSeleccionado`), emite los datos actualizados
   * de la configuración SCIAN.
   */
  eliminarScian(): void {
    if (!this.scianLista.length) {
      return;
    }
    this.scianConfig.datos = this.scianConfig.datos.filter(
      (idx: TablaScianConfig) => {
        return !this.scianLista.some(
          (idx2: TablaScianConfig) => idx2.clave === idx.clave
        );
      }
    );
    if (this.scianSeleccionado) {
      this.scianSeleccionado.emit(this.scianConfig.datos);
    }
  }

  /**
   * Elimina las mercancías seleccionadas de la lista de datos de la tabla.
   *
   * Este método filtra los datos de la tabla de mercancías (`tablaMercanciasConfig.datos`)
   * eliminando aquellos elementos cuya clasificación de producto coincide con
   * alguno de los elementos en la lista de mercancías (`tablaMercanciasLista`).
   *
   * Si hay mercancías seleccionadas (`mercanciasSeleccionado`), emite el evento
   * con los datos actualizados de la tabla de mercancías.
   */
  eliminarMercancias(): void {
    if (!this.tablaMercanciasLista.length) {
      return;
    }
    this.tablaMercanciasConfig.datos = this.tablaMercanciasConfig.datos.filter(
      (idx: TablaMercanciasDatos) => {
        return !this.tablaMercanciasLista.some(
          (idx2: TablaMercanciasDatos) =>
            idx2.clasificacionProducto === idx.clasificacionProducto
        );
      }
    );
    if (this.mercanciasSeleccionado) {
      this.mercanciasSeleccionado.emit(this.tablaMercanciasConfig.datos);
    }
  }

  /**
   * Navega a la ruta de acciones
   * @param accionesPath
   */
  irAAcciones(accionesPath: string): void {
    this.router.navigate([accionesPath], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * Agrega los elementos seleccionados de la lista SCIAN a la configuración actual
   * y emite los datos actualizados si hay un elemento seleccionado.
   * Luego, navega a la ruta de acciones correspondiente.
   *
   * @remarks
   * - Combina los datos existentes con los nuevos elementos seleccionados de la lista SCIAN.
   * - Emite un evento con los datos actualizados si `scianSeleccionado` está definido.
   * - Redirige al usuario a la ruta '../scian-selecion'.
   */
  agregarScian(): void {
    this.scianConfig.datos = this.scianConfig.datos.concat(this.scianLista);
    if (this.scianSeleccionado) {
      this.scianSeleccionado.emit(this.scianConfig.datos);
    }
    this.irAAcciones('../scian-selecion');
  }

  /**
   * Agrega las mercancías seleccionadas a la configuración de la tabla y emite el evento correspondiente.
   *
   * Este método concatena los datos de la lista de mercancías seleccionadas con los datos existentes
   * en la configuración de la tabla. Si hay un elemento seleccionado, emite un evento con los datos
   * actualizados. Finalmente, navega a la ruta especificada para realizar acciones adicionales.
   *
   * @returns {void} Este método no devuelve ningún valor.
   */
  agregarMercancias(): void {
    this.tablaMercanciasConfig.datos = this.tablaMercanciasConfig.datos.concat(
      this.tablaMercanciasLista
    );
    if (this.mercanciasSeleccionado) {
      this.mercanciasSeleccionado.emit(this.tablaMercanciasConfig.datos);
    }
    this.irAAcciones('../mercancia-datos');
  }

  /**
   * Emite un evento con los datos seleccionados de las listas asociadas.
   *
   * Este método recopila las listas seleccionadas de `scianLista`,
   * `tablaMercanciasLista` y `opcionLista`, y las emite a través del
   * evento `datosDeTablaSeleccionados`.
   *
   * @remarks
   * Este método es útil para comunicar los datos seleccionados a otros
   * componentes o servicios que estén escuchando el evento emitido.
   */
  modificarDatos(): void {
    this.datosDeTablaSeleccionados.emit({
      scianSeleccionados: this.scianLista,
      mercanciasSeleccionados: this.tablaMercanciasLista,
      opcionSeleccionados: this.opcionLista,
      opcionesColapsableState: this.opcionesColapsable,
    });
  }

  /**
   * Muestra u oculta una sección colapsable basada en el orden proporcionado.
   *
   * @param orden - Un número que indica el orden de la sección colapsable.
   *                Si el valor es 1, alterna el estado de `opcionesColapsable`.
   */
  mostrarColapsable(orden: number): void {
    if (orden === 1) {
      this.opcionesColapsable = !this.opcionesColapsable;
      this.datosDeTablaSeleccionados.emit({
        scianSeleccionados: this.scianLista,
        mercanciasSeleccionados: this.tablaMercanciasLista,
        opcionSeleccionados: this.opcionLista,
        opcionesColapsableState: this.opcionesColapsable,
      });
    }
  }
  /**
   * Método que se ejecuta cuando se cambia el estado de un elemento.
   * Actualmente no tiene implementación.
   *
   * @returns {void} No retorna ningún valor.
   */
  cambioDeEstado(event: Catalogo): void {
    if (this.idProcedimiento === 260301) {
      if (event) {
        this.datosSolicitudForm
          .get('municipioAlcaldia')
          ?.setValue('DISTITO FEDERAL', { emitEvent: true });
      }
    }
  }

  /**
   * Verifica si un campo es requerido según la configuración de campos requeridos.
   *
   * @param {string} campo - Nombre del campo a verificar.
   * @returns {boolean} Retorna `true` si el campo es requerido, `false` en caso contrario.
   */
  esCampoRequerido(campo: string): boolean {
    const PROCEDIMIENTOS = CAMPOS_REQUERIDOS_FORMULARIO_MAP.get(campo);
    return PROCEDIMIENTOS?.includes(this.idProcedimiento) ?? false;
  }

  /**
   * Verifica si un campo adicional debe mostrarse según la configuración de procedimientos.
   *
   * @param {string} campo - Nombre del campo a verificar.
   * @returns {boolean} Retorna `true` si el campo adicional debe mostrarse, `false` en caso contrario.
   */
  mostrarCamposDelProcedimiento(campo: string): boolean {
    const PROCEDIMIENTOS = CAMPOS_ADICIONALES_POR_PROCEDIMIENTO_MAP.get(campo);
    return PROCEDIMIENTOS?.includes(this.idProcedimiento) ?? false;
  }

  /**
   * @method cambioAviso
   * @description Método que habilita o deshabilita el campo `aviso` en el formulario reactivo `datosSolicitudForm`
   * dependiendo del estado del checkbox seleccionado.
   *
   * @param {Event} event - Evento que se dispara al cambiar el estado del checkbox.
   * @returns {void} Este método no retorna ningún valor.
   **/
  cambioAviso(event: Event): void {
    const CHECKED = (event.target as HTMLInputElement).checked;
    if (CHECKED) {
      this.datosSolicitudForm.get('licenciaSanitaria')?.disable();
    } else {
      this.datosSolicitudForm.get('licenciaSanitaria')?.enable();
    }
  }
  /**
   * Emite un evento con los datos seleccionados de la tabla.
   *
   * Este método recopila las listas seleccionadas de SCIAN, mercancías y opciones,
   * y las emite a través del evento `datosDeTablaSeleccionados` para que puedan ser
   * procesadas por otros componentes o servicios.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
