import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, ModeloDeFormaDinamica, TablaDinamicaComponent, TablaSeleccion, TituloComponent, ValidacionesFormularioService, Validadores } from '@libs/shared/data-access-user/src';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DATOS_DE_LA_SOLICICTUD, INFORMACION_DE_LA_OBRA_ARTE, OBRA_DE_ARTE_ALERT } from '../../constantes/exportar-ilustraciones.enum';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosDelSolicitud } from '../../models/exportar-ilustraciones.model';
import { ExportarIlustracionesService } from '../../services/exportar-ilustraciones.service';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { Modal } from 'bootstrap';
import { ValidadoresDeFormulariosComponent } from '@libs/shared/data-access-user/src/tramites/components/validadores-de-formularios/validadores-de-formularios/validadores-de-formularios.component';

/**
  * @component DatosDeLaSolicitudComponent
  * @selector datos-de-la-solicitud
  * @description
  * Este componente es responsable de gestionar y renderizar los datos relacionados con la solicitud 
  * de exportación de obras de arte. Incluye formularios dinámicos, tablas configurables y modales 
  * para la interacción del usuario.
  * 
  * Funcionalidades principales:
  * - Renderiza un formulario dinámico basado en la configuración definida en `INFORMACION_DE_LA_OBRA_ARTE`.
  * - Muestra una tabla dinámica con los datos de la solicitud, configurada mediante `configuracionTabla`.
  * - Gestiona la apertura y cierre de modales para agregar o confirmar datos.
  * - Valida los campos del formulario utilizando el servicio `ValidacionesFormularioService`.
  * - Obtiene datos relacionados con monedas y fracciones arancelarias desde el servicio `ExportarIlustracionesService`.
  * 
  * Componentes importados:
  * - `TituloComponent`: Componente para mostrar títulos en el formulario.
  * - `TablaDinamicaComponent`: Componente para mostrar tablas dinámicas.
  * - `FormasDinamicasComponent`: Componente para renderizar formularios dinámicos.
  * - `AlertComponent`: Componente para mostrar alertas.
  * - `CatalogoSelectComponent`: Componente para seleccionar valores de un catálogo.
  * 
  * @templateUrl ./datos-de-la-solicitud.component.html
  * @styleUrl ./datos-de-la-solicitud.component.scss
  */
@Component({
  selector: 'datos-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    TablaDinamicaComponent,
    FormasDinamicasComponent,
    AlertComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    ValidadoresDeFormulariosComponent
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})

export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  /**
   * Referencia al elemento del modal para agregar mercancías.
   */
  @ViewChild('modal') modalElement!: ElementRef;

  /**
   * Referencia al modal de confirmación.
   */
  @ViewChild('confirmarModal') confirmarModalElement!: ElementRef;

  /**
   * Referencia al botón para cerrar el modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;
  /**
   * Configuración de la tabla de selección.
   */
  public tablaSeleccion = TablaSeleccion;

  /**
  * @property informacionlabel
  * @type {typeof DATOS_DE_LA_SOLICICTUD}
  * @description
  * Esta propiedad almacena las etiquetas de los campos del formulario, basadas en la constante `DATOS_DE_LA_SOLICICTUD`. 
  * Se utiliza para acceder dinámicamente a los nombres de los campos y mostrarlos en el formulario.
  * 
  * @example
  * console.log(this.informacionlabel.AUTOR);
  * // Muestra "Autor", que es el valor asociado a la clave `AUTOR` en `DATOS_DE_LA_SOLICICTUD`.
  */
  public informacionlabel = DATOS_DE_LA_SOLICICTUD;

  /**
   * Configuración de la tabla.
   */
  public configuracionTabla: ConfiguracionColumna<DatosDelSolicitud>[] = [
    {
      encabezado: DATOS_DE_LA_SOLICICTUD.AUTOR,
      clave: (item: DatosDelSolicitud) => item.autor,
      orden: 1,
    },
    {
      encabezado: DATOS_DE_LA_SOLICICTUD.TITULO,
      clave: (item: DatosDelSolicitud) => item.titulo,
      orden: 2,
    },
    {
      encabezado:
      DATOS_DE_LA_SOLICICTUD.TECNICA_DE_REALIZACION,
      clave: (item: DatosDelSolicitud) => item.tecnicaDeRealizacion,
      orden: 3,
    },
    {
      encabezado:
      DATOS_DE_LA_SOLICICTUD.CON_MARCO,
      clave: (item: DatosDelSolicitud) => item.conMarco,
      orden: 4,
    },
    {
      encabezado: DATOS_DE_LA_SOLICICTUD.ANCHO,
      clave: (item: DatosDelSolicitud) => item.ancho,
      orden: 5,
    },
    {
      encabezado: DATOS_DE_LA_SOLICICTUD.ALTO,
      clave: (item: DatosDelSolicitud) => item.alto,
      orden: 6,
    },
    {
      encabezado: DATOS_DE_LA_SOLICICTUD.PROFUNDIDAD,
      clave: (item: DatosDelSolicitud) => item.profundidad,
      orden: 7,
    },
    {
      encabezado: DATOS_DE_LA_SOLICICTUD.DIAMETRO,
      clave: (item: DatosDelSolicitud) => item.diametro,
      orden: 8,
    },
    {
      encabezado: DATOS_DE_LA_SOLICICTUD.VARIABLES,
      clave: (item: DatosDelSolicitud) => item.variables,
      orden: 9,
    },
    {
      encabezado: DATOS_DE_LA_SOLICICTUD.ANO_DE_CREACION,
      clave: (item: DatosDelSolicitud) => item.anoDeCreacion,
      orden: 10,
    },
    {
      encabezado: DATOS_DE_LA_SOLICICTUD.AVALUO,
      clave: (item: DatosDelSolicitud) => item.avaluo,
      orden: 11,
    },
    {
      encabezado: DATOS_DE_LA_SOLICICTUD.MONEDA,
      clave: (item: DatosDelSolicitud) => item.moneda,
      orden: 12,
    },
    {
      encabezado: DATOS_DE_LA_SOLICICTUD.PROPIETARIO,
      clave: (item: DatosDelSolicitud) => item.propietario,
      orden: 13,
    },
    {
      encabezado: DATOS_DE_LA_SOLICICTUD.FRACCION_ARANCELARIA,
      clave: (item: DatosDelSolicitud) => item.fraccionArancelaria,
      orden: 14,
    },
    {
      encabezado: DATOS_DE_LA_SOLICICTUD.DESCRIPCION,
      clave: (item: DatosDelSolicitud) => item.descripcion,
      orden: 15,
    },
  ];

  /**
   * Datos configurados para la tabla.
   */
  public configuracionTablaDatos: DatosDelSolicitud[] = [];

  /**
   * compo doc
   * @type {FormGroup}
   * @memberof RepresentacionFederalComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
   */
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
    anoDeCreacion: new FormControl({value: '', disabled: false}),
    avaluo: new FormControl({value: '', disabled: false}),
    moneda: new FormControl({value: '', disabled: false}),
    propietario: new FormControl({value: '', disabled: false}),
    fraccionArancelaria: new FormControl({value: '', disabled: false}),
    descripcion: new FormControl({value: '', disabled: true}),
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
  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }

   /**
   * compo doc
   * @property informacionFormData
   * @type {ModeloDeFormaDinamica[]}
   * @description
   * Esta propiedad contiene la configuración de los campos del formulario dinámico
   * utilizado en el componente. La configuración está basada en la constante
   * `INFORMACION_DE_LA_OBRA_ARTE`, que define los detalles de cada campo, como su
   * identificador, etiqueta, tipo de entrada, validadores, y más.
   *
   * Se utiliza para renderizar dinámicamente los campos del formulario y para
   * gestionar su comportamiento, como la validación y la interacción con los datos
   * obtenidos de los servicios.
   */
   public informacionFormData = INFORMACION_DE_LA_OBRA_ARTE;

   /**
  * @property alertInformacion
  * @type {string}
  * @description
  * Esta propiedad almacena el mensaje de alerta relacionado con la información de la obra de arte. 
  * El valor de esta propiedad se obtiene de la constante `OBRA_DE_ARTE_ALERT`, que contiene el contenido 
  * predefinido para mostrar en el componente de alerta.
  * 
  * @example
  * console.log(this.alertInformacion);
  * // Muestra el contenido de la alerta configurada en `OBRA_DE_ARTE_ALERT`.
  */
  public alertInformacion = OBRA_DE_ARTE_ALERT;

   /** Subject para destruir el componente */
     private destroy$ = new Subject<void>();

  /**
    * @property {Catalogo[]} monedaData
    * @description
    * Almacena los datos relacionados con las monedas.
    * @default []
    */
    public monedaData: Catalogo[] = [];

    /**
   * @property {Catalogo[]} arancelariaData
   * @description
   * Almacena los datos relacionados con las fracciones arancelarias.
   * @default []
   */
  public arancelariaData: Catalogo[] = [];

  /**
   * @property {Catalogo[]} autorData
   * @description
   * Almacena los datos relacionados con las fracciones arancelarias.
   * @default []
   */
  public autorData: Catalogo[] = [];

  public validadores: Validadores[] = [
    { tipo: 'required', valor: '', mensaje: 'Este campo es obligatorio' }
  ]

  /**
  * @constructor
  * @description
  * Este constructor inicializa el componente `DatosDeLaSolicitudComponent` e inyecta los servicios necesarios 
  * para gestionar los datos y validaciones del formulario. 
  * 
  * Servicios inyectados:
  * - `ExportarIlustracionesService`: Servicio utilizado para obtener datos relacionados con monedas y fracciones arancelarias.
  * - `ValidacionesFormularioService`: Servicio utilizado para validar los campos del formulario.
  * 
  * @param {ExportarIlustracionesService} exportarIlustracionesService - Servicio para gestionar datos de exportación.
  * @param {ValidacionesFormularioService} validacionesService - Servicio para manejar validaciones del formulario.
  */
constructor(
  public exportarIlustracionesService: ExportarIlustracionesService,
  private validacionesService: ValidacionesFormularioService
 ) {
  //
 }

   /**
  * @method ngOnInit
  * @description
  * Este método es parte del ciclo de vida del componente y se ejecuta automáticamente 
  * después de que Angular haya inicializado todas las propiedades vinculadas al componente. 
  * En este caso, se utiliza para obtener datos relacionados con las monedas y las fracciones 
  * arancelarias desde los servicios correspondientes y asignarlos a las propiedades del componente.
  * 
  * Funcionalidad:
  * - Obtiene los datos de monedas desde el servicio `exportarIlustracionesService` y los asigna a `monedaData`.
  * - Obtiene los datos de fracciones arancelarias desde el servicio `exportarIlustracionesService` y los asigna a `arancelariaData`.
  * - Utiliza `takeUntil` para gestionar la destrucción de las suscripciones y evitar fugas de memoria.
  * 
  * @example
  * ngOnInit(): void {
  *   this.exportarIlustracionesService.getMonedaData()
  *     .pipe(takeUntil(this.destroy$))
  *     .subscribe((data) => {
  *       this.monedaData = data;
  *     });
  * 
  *   this.exportarIlustracionesService.getArancelariaData()
  *     .pipe(takeUntil(this.destroy$))
  *     .subscribe((data) => {
  *       this.arancelariaData = data;
  *     });
  * }
  */
ngOnInit(): void {
  this.obtenerAutor();
  /**
   * Obtiene los datos de moneda desde el servicio y los asigna a `monedaData`.
   */
  this.exportarIlustracionesService.getMonedaData()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((data) => {
      this.monedaData = data;
    });

  /**
   * Obtiene los datos de fracciones arancelarias desde el servicio y los asigna a `arancelariaData`.
   */
  this.exportarIlustracionesService.getArancelariaData()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((data) => {
      this.arancelariaData = data;
    });
}

  /**
  * @method obtenerAutor
  * @description
  * Este método se utiliza para obtener los datos relacionados con los autores desde el servicio 
  * `ExportarIlustracionesService` y asignarlos al campo correspondiente en el formulario dinámico.
  * 
  * Funcionalidad:
  * - Realiza una solicitud al servicio para obtener los datos de los autores.
  * - Asigna los datos obtenidos a la propiedad `autorData`.
  * - Busca el campo "autor" en la configuración del formulario dinámico (`informacionFormData`).
  * - Si el campo "autor" no tiene opciones configuradas, asigna las opciones obtenidas del servicio.
  * 
  * @example
  * this.obtenerAutor();
  * // Obtiene los datos de los autores y los asigna al formulario dinámico.
  */
  public obtenerAutor(): void {
    this.exportarIlustracionesService.getAutorData()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.autorData = data;
        const AUTOR_FIELD = this.informacionFormData.find((datos: ModeloDeFormaDinamica) => datos.campo === 'autor') as ModeloDeFormaDinamica;
        if (AUTOR_FIELD) {
          if (!AUTOR_FIELD.opciones) {
            AUTOR_FIELD.opciones = this.autorData.map((item: { id: number; descripcion: string }) => ({
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
  * Verifica si existe una referencia al elemento del modal (`modalElement`) 
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
    if (this.modalElement) {
      const INSTANCIA_MODAL = new Modal(this.modalElement.nativeElement);
      INSTANCIA_MODAL.show();
    }
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
    if (this.ninoFormGroup.valid && this.forma.valid) {
      // if (this.confirmarModalElement) {
      //   const INSTANCIA_MODAL = new Modal(
      //     this.confirmarModalElement.nativeElement
      //   );
      //   this.cerrarModal();
      //   INSTANCIA_MODAL.show();
      // }
      const DETALLES = {
        autor: this.ninoFormGroup.get('autor')?.value,
        titulo: this.ninoFormGroup.get('titulo')?.value,
        tecnicaDeRealizacion: this.ninoFormGroup.get('tecnicaDeRealizacion')?.value,
        conMarco: this.ninoFormGroup.get('medidas')?.value,
        ancho: this.ninoFormGroup.get('ancho')?.value,
        alto: this.ninoFormGroup.get('alto')?.value,
        profundidad: this.ninoFormGroup.get('profundidad')?.value,
        diametro: this.ninoFormGroup.get('diametro')?.value,
        variables: this.ninoFormGroup.get('variables')?.value,
        anoDeCreacion: this.forma.get('anoDeCreacion')?.value,
        avaluo: this.forma.get('avaluo')?.value,
        moneda: this.forma.get('moneda')?.value,
        propietario: this.forma.get('propietario')?.value,
        fraccionArancelaria: this.forma.get('fraccionArancelaria')?.value,
        descripcion: this.forma.get('descripcion')?.value,
      };
      this.configuracionTablaDatos?.push(DETALLES);
      this.ninoFormGroup.reset();
      this.forma.reset();
      this.cerrarModal();
    } else {
      this.ninoFormGroup.markAllAsTouched();
      this.forma.markAllAsTouched();
    }
  }

  /**
  * compo doc
  * @method esValido
  * @description 
  * Verifica si un campo específico del formulario es válido.
  * @param field El nombre del campo que se desea validar.
  * @returns {boolean | null} Un valor booleano que indica si el campo es válido.
  */
  public esValido(campo: string): boolean | null {
    return this.validacionesService.isValid(this.forma, campo);
  }

  /**
  * @method cambioEvento
  * @description
  * Este método se utiliza para manejar los eventos de cambio en los campos del formulario. 
  * Obtiene el valor actual del campo modificado y lo registra en la consola para su seguimiento.
  * 
  * Funcionalidad:
  * - Verifica si el evento y el nombre del campo son válidos.
  * - Obtiene el control del formulario asociado al campo proporcionado.
  * - Recupera el valor actual del campo y lo imprime en la consola.
  * 
  * @param {Event} event - Evento de cambio generado por el campo del formulario.
  * @param {string} campo - Nombre del campo que se modificó.
  * 
  * @example
  * this.cambioEvento($event, 'anoDeCreacion');
  * // Registra en la consola el valor actual del campo "anoDeCreacion".
  */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public cambioEvento(event: any, campo: string): void {
    let VALOR;
    if (event.target) {
      VALOR = (event.target as HTMLInputElement).value;
    } else {
      const CONTROL = this.forma.get(campo);
      VALOR = CONTROL ? CONTROL.value : null;
    }
    console.log(VALOR)
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
