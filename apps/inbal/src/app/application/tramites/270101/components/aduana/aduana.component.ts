import { ADUANA_ALERT, ITINERARIO_DE_EXPORTACION, ITINERARIO_DE_EXPORTACION_MAXIMO } from '../../constantes/exportar-ilustraciones.enum';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, ModeloDeFormaDinamica, TablaDinamicaComponent, TablaSeleccion, TituloComponent, Validadores } from '@libs/shared/data-access-user/src';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AduanaDeSalida } from '../../models/exportar-ilustraciones.model';
import { CommonModule } from '@angular/common';
import { ExportarIlustracionesService } from '../../services/exportar-ilustraciones.service';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { Modal } from 'bootstrap';
import { ValidadoresDeFormulariosComponent } from '@libs/shared/data-access-user/src/tramites/components/validadores-de-formularios/validadores-de-formularios/validadores-de-formularios.component';

@Component({
  selector: 'aduana',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    TituloComponent,
    CatalogoSelectComponent,
    ValidadoresDeFormulariosComponent,
    AlertComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './aduana.component.html',
  styleUrl: './aduana.component.scss',
})
export class AduanaComponent implements OnInit, OnDestroy {
   /**
   * Referencia al elemento del modal para agregar mercancías.
   */
  @ViewChild('modalAduana') modal!: ElementRef;

   /**
   * Referencia al botón para cerrar el modal.
   */
   @ViewChild('closeModal') closeModal!: ElementRef;

   /**
   * compo doc
   * @type {FormGroup}
   * @memberof AduanaComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
   */
  public forma: FormGroup = new FormGroup({
    aduana: new FormControl({}),
  });

  /**
   * compo doc
   * @type {FormGroup}
   * @memberof AduanaComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
   */
  public modalForma: FormGroup = new FormGroup({
    itinerarioFormGroup: new FormGroup({}),
    itinerarioMaximoFormGroup: new FormGroup({})
  });

  /**
   * compo doc
   * @getter ninoFormGroup
   * @description
   * Este getter devuelve el grupo de formularios anidado llamado `ninoFormGroup`
   * dentro del formulario reactivo principal `forma`.
   * Se utiliza para acceder y manipular los controles y valores específicos de este grupo de formularios.
   *
   * @returns {FormGroup} El grupo de formularios `ninoFormGroup` como un objeto de tipo `FormGroup`.
   *
   * @example
   * const grupo = this.ninoFormGroup;
   * grupo.get('campo').setValue('nuevo valor');
   */
  get itinerarioFormGroup(): FormGroup {
    return this.modalForma.get('itinerarioFormGroup') as FormGroup;
  }

  /**
   * compo doc
   * @getter ninoFormGroup
   * @description
   * Este getter devuelve el grupo de formularios anidado llamado `ninoFormGroup`
   * dentro del formulario reactivo principal `forma`.
   * Se utiliza para acceder y manipular los controles y valores específicos de este grupo de formularios.
   *
   * @returns {FormGroup} El grupo de formularios `ninoFormGroup` como un objeto de tipo `FormGroup`.
   *
   * @example
   * const grupo = this.ninoFormGroup;
   * grupo.get('campo').setValue('nuevo valor');
   */
  get itinerarioMaximoFormGroup(): FormGroup {
    return this.modalForma.get('itinerarioMaximoFormGroup') as FormGroup;
  }

  /**
   * @property {Catalogo[]} aduanaData
   * @description
   * Almacena los datos relacionados con las fracciones arancelarias.
   * @default []
   */
  public aduanaData: Catalogo[] = [];

  /**
   * @property {Catalogo[]} transporteData
   * @description
   * Almacena los datos relacionados con las fracciones arancelarias.
   * @default []
   */
  public transporteData: Catalogo[] = [];

  public validadores: Validadores[] = [
      { tipo: 'required', valor: '', mensaje: 'Este campo es obligatorio' }
    ]

  /**
   * Subject utilizado para destruir las suscripciones y evitar fugas de memoria.
   */
  private destroy$ = new Subject<void>();

  /**
  * @property alertInformacion
  * @type {string}
  * @description
  * Esta propiedad almacena el mensaje de alerta relacionado con la información de la obra de arte. 
  * El valor de esta propiedad se obtiene de la constante `ADUANA_ALERT`, que contiene el contenido 
  * predefinido para mostrar en el componente de alerta.
  * 
  * @example
  * console.log(this.aduanaAlert);
  * // Muestra el contenido de la alerta configurada en `ADUANA_ALERT`.
  */
  public aduanaAlert = ADUANA_ALERT;

   /**
   * Configuración de la tabla de selección.
   */
  public tablaSeleccion = TablaSeleccion;

  /**
   * Configuración de la tabla.
   */
  public configuracionTabla: ConfiguracionColumna<AduanaDeSalida>[] = [
    {
      encabezado: 'Tipo',
      clave: (item: AduanaDeSalida) => item.tipo,
      orden: 1,
    },
    {
      encabezado: 'Tipo ciudad',
      clave: (item: AduanaDeSalida) => item.ciudad,
      orden: 2,
    },
    {
      encabezado: 'Sede',
      clave: (item: AduanaDeSalida) => item.sede,
      orden: 3,
    },
    {
      encabezado: 'Tipo traslado',
      clave: (item: AduanaDeSalida) => item.tipoDeTraslado,
      orden: 4,
    },
    {
      encabezado: 'Fecha exhibición',
      clave: (item: AduanaDeSalida) => item.fechaExhibicion,
      orden: 5,
    },
    {
      encabezado: 'Observaciones',
      clave: (item: AduanaDeSalida) => item.observaciones,
      orden: 6,
    },
    {
      encabezado: 'Fecha inicio',
      clave: (item: AduanaDeSalida) => item.fechoInicio,
      orden: 6,
    },
    {
      encabezado: 'Fecha fin',
      clave: (item: AduanaDeSalida) => item.fechaFin,
      orden: 6,
    }
  ];
  
  /**
   * Datos configurados para la tabla.
   */
  public configuracionTablaDatos: AduanaDeSalida[] = [];

  /**
   * Datos configurados para la tabla.
   */
  public datosSeleccionados: AduanaDeSalida[] = [];

  /**
   * compo doc
   * @property itinerarioFormData
   * @type {ModeloDeFormaDinamica[]}
   * @description
   * Esta propiedad contiene la configuración de los campos del formulario dinámico
   * utilizado en el componente. La configuración está basada en la constante
   * `ITINERARIO_DE_EXPORTACION`, que define los detalles de cada campo, como su
   * identificador, etiqueta, tipo de entrada, validadores, y más.
   *
   * Se utiliza para renderizar dinámicamente los campos del formulario y para
   * gestionar su comportamiento, como la validación y la interacción con los datos
   * obtenidos de los servicios.
   */
    public itinerarioFormData = ITINERARIO_DE_EXPORTACION;

     /**
   * compo doc
   * @property itinerarioMaximoFormData
   * @type {ModeloDeFormaDinamica[]}
   * @description
   * Esta propiedad contiene la configuración de los campos del formulario dinámico
   * utilizado en el componente. La configuración está basada en la constante
   * `ITINERARIO_DE_EXPORTACION_MAXIMO`, que define los detalles de cada campo, como su
   * identificador, etiqueta, tipo de entrada, validadores, y más.
   *
   * Se utiliza para renderizar dinámicamente los campos del formulario y para
   * gestionar su comportamiento, como la validación y la interacción con los datos
   * obtenidos de los servicios.
   */
    public itinerarioMaximoFormData = ITINERARIO_DE_EXPORTACION_MAXIMO;

  constructor(
    public exportarIlustracionesService: ExportarIlustracionesService,
  ) {
    //
  }

  ngOnInit(): void {
    this.obtenerAduanaDeSalida();
    this.obtrenerTipoDeTraslado();
  }

  public obtenerAduanaDeSalida(): void {
    this.exportarIlustracionesService
    .getAduanaDeSalidaData()
    .pipe(takeUntil(this.destroy$))
    .subscribe((resp: Catalogo[]) => {
      this.aduanaData = resp;
    });
  }

  /**
 * Obtiene los datos de transporte desde el servicio y los asigna a `transporteData`.
 */
  public obtrenerTipoDeTraslado(): void {
    this.exportarIlustracionesService.getTransporteData()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.transporteData = data;
      const TIPO_TRASLADO_FIELD = this.itinerarioFormData.find((datos: ModeloDeFormaDinamica) => datos.campo === 'tipoDeTraslado') as ModeloDeFormaDinamica;
      if (TIPO_TRASLADO_FIELD) {
        if (!TIPO_TRASLADO_FIELD.opciones) {
          TIPO_TRASLADO_FIELD.opciones = this.transporteData.map((item: { id: number; descripcion: string }) => ({
            descripcion: item.descripcion,
            id: item.id,
          }));
        }
      }
    });
  }

  /**
    * @method abrirDialogo
    * @description
    * Este método se utiliza para abrir un modal en el componente. 
    * Verifica si existe una referencia al elemento del modal (`modal`) 
    * y, de ser así, crea una instancia del modal y lo muestra.
    * 
    * Funcionalidad:
    * - Verifica la existencia de la referencia al elemento del modal.
    * - Crea una instancia del modal utilizando Bootstrap y lo muestra.
    * 
    * @example
    * this.abrirDialogo();
    * // Abre el modal configurado en el componente.
    */
    abrirDialogo(): void {
      if (this.modal) {
        const INSTANCIA_MODAL = new Modal(this.modal.nativeElement);
        INSTANCIA_MODAL.show();
      }
    }

    /**
  * @method agregarConfirmarModal
  * @description
  * Este método abre un modal de confirmación si el formulario `ninoFormGroup` es válido. 
  * Si el formulario no es válido, marca todos los campos como tocados para mostrar los errores de validación.
  * 
  * Funcionalidad:
  * - Verifica si el formulario `ninoFormGroup` es válido.
  * - Si es válido, cierra el modal actual y abre el modal de confirmación.
  * - Si no es válido, marca todos los campos del formulario como tocados.
  * 
  * @example
  * this.agregarConfirmarModal();
  * // Abre el modal de confirmación si el formulario es válido.
  */
  agregarConfirmarModal(): void {
    if (this.configuracionTablaDatos.length === 0) {
      if (this.itinerarioFormGroup.valid) {
        const DETALLES = {
          tipo: this.itinerarioFormGroup.get('tipoItinerario')?.value,
          ciudad: this.itinerarioFormGroup.get('ciudad')?.value,
          sede: '',
          tipoDeTraslado: this.itinerarioFormGroup.get('tipoDeTraslado')?.value,
          fechaExhibicion: '',
          observaciones: this.itinerarioFormGroup.get('observaciones')?.value,
          fechoInicio: AduanaComponent.formatoFecha(this.itinerarioFormGroup.get('fechaInicio')?.value),
          fechaFin: AduanaComponent.formatoFecha(this.itinerarioFormGroup.get('fechaFin')?.value)
        };
        this.configuracionTablaDatos?.push(DETALLES);
        const TIPO_ITINERARIO_VALUE = this.itinerarioFormGroup.get('tipoItinerario')?.value;
        this.itinerarioFormGroup.reset();
        this.itinerarioFormGroup.get('tipoItinerario')?.setValue(TIPO_ITINERARIO_VALUE);
        this.cerrarModal();
      } else {
        this.itinerarioFormGroup.markAllAsTouched();
      }
    } else {
      if (this.itinerarioMaximoFormGroup.valid) {
        const DETALLES = {
          tipo: this.itinerarioMaximoFormGroup.get('tipoItinerario')?.value,
          ciudad: this.itinerarioMaximoFormGroup.get('ciudad')?.value,
          sede: this.itinerarioMaximoFormGroup.get('nombre')?.value,
          tipoDeTraslado: '',
          fechaExhibicion: AduanaComponent.formatoFecha(this.itinerarioMaximoFormGroup.get('fechaExhibicion')?.value),
          observaciones: this.itinerarioMaximoFormGroup.get('observaciones')?.value,
          fechoInicio: AduanaComponent.formatoFecha(this.itinerarioMaximoFormGroup.get('fechaInicio')?.value),
          fechaFin: AduanaComponent.formatoFecha(this.itinerarioMaximoFormGroup.get('fechaFin')?.value)
        };
        this.configuracionTablaDatos?.push(DETALLES);
        const TIPO_ITINERARIO_VALUE = this.itinerarioMaximoFormGroup.get('tipoItinerario')?.value;
        this.itinerarioMaximoFormGroup.reset();
        this.itinerarioMaximoFormGroup.get('tipoItinerario')?.setValue(TIPO_ITINERARIO_VALUE);
        this.cerrarModal();
      } else {
        this.itinerarioMaximoFormGroup.markAllAsTouched();
      }
    }
  }

  public static formatoFecha(date: Date | string): string {
    let DATE: Date;
    if (typeof date === "string") {
      DATE = new Date(date);
    } else if (date instanceof Date) {
      DATE = date;
    } else {
      return "";
    }
    const FECHA_FORMATEADA = DATE.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
    return FECHA_FORMATEADA;
  }

   /**
  * @method cerrarModal
  * @description
  * Este método se utiliza para cerrar el modal actual en el componente. 
  * Verifica si existe una referencia al botón de cierre del modal (`closeModal`) 
  * y, de ser así, simula un clic en dicho botón para cerrar el modal.
  * 
  * Funcionalidad:
  * - Verifica la existencia de la referencia al botón de cierre del modal.
  * - Simula un clic en el botón para cerrar el modal.
  * 
  * @example
  * this.cerrarModal();
  * // Cierra el modal actual.
  */
   cerrarModal(): void {
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
  }

  public listaDeFilaSeleccionada(event: AduanaDeSalida[]): void {
    if (event.length > 0) {
      event.forEach((item) => {
        this.datosSeleccionados.push(item);
      });
    }
  }

  public eliminar(): void {
    this.datosSeleccionados.forEach((item) => {
      const INDEX = this.configuracionTablaDatos?.findIndex((obj) => obj.ciudad === item.ciudad);
      if (INDEX !== -1) {
        this.configuracionTablaDatos?.splice(INDEX, 1);
      }
    });
  }

  /**
  * @method ngOnDestroy
  * @description
  * Este método es parte del ciclo de vida del componente y se ejecuta automáticamente 
  * cuando el componente está a punto de ser destruido. Se utiliza para limpiar las suscripciones 
  * activas y evitar fugas de memoria en la aplicación.
  * 
  * Funcionalidad:
  * - Notifica a través del `Subject` `destroy$` que el componente será destruido.
  * - Completa el `Subject` para liberar los recursos asociados.
  * 
  * @example
  * ngOnDestroy(): void {
  *   this.destroy$.next();
  *   this.destroy$.complete();
  * }
  */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
