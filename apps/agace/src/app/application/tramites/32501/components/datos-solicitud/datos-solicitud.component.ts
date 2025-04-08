import { AvisoCatalogo } from '../../models/aviso-catalogo.model';
import { AvisoOpcionesDeRadio } from '../../models/aviso-catalogo.model';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ElementRef } from '@angular/core';
import { FECHA_INGRESO } from '../../enums/solicitud32501.enum';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { MercanciasDesmontadasOSinMontarService } from '../../services/mercancias-desmontadas-o-sin-montar.service';
import { Modal } from 'bootstrap';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { OperacionDeImportacion } from '../../models/aviso-catalogo.model';
import { REGEX_NUMEROS_USD } from '@libs/shared/data-access-user/src';
import { REGEX_REEMPLAZAR } from '@libs/shared/data-access-user/src';
import { REGEX_SOLO_NUMEROS } from '@libs/shared/data-access-user/src';
import { Solicitud32501Query } from '../../estados/solicitud32501.query';
import { Solicitud32501State } from '../../estados/solicitud32501.store';
import { Solicitud32501Store } from '../../estados/solicitud32501.store';
import { Subject } from 'rxjs';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente `DatosSolicitudComponent` que gestiona la lógica y la interfaz de usuario
 * para la sección de datos de solicitud en el trámite 32501.
 *
 */
@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.scss',
})
/**
 * Componente `DatosSolicitudComponent` que gestiona la lógica y la interfaz de usuario
 * para la sección de datos de solicitud en el trámite 32501.
 *
 */
export class DatosSolicitudComponent implements OnInit, OnDestroy {
  /**
   * Formulario para la gestión de avisos.
   */
  formAviso!: FormGroup;

  /**
   * Opciones de radio para el tipo de aviso.
   */
  avisoOpcionesDeRadio: AvisoOpcionesDeRadio = {} as AvisoOpcionesDeRadio;

  /**
   * Tipo de aviso seleccionado.
   */
  tipoAviso: string | number = 'por defecto';

  /**
   * Opción seleccionada para Fracción Arancelaria.
   */
  opcionFraccionArancelaria: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Opción seleccionada para Entidad Federativa.
   */
  opcionEntidadFederativa: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Opción seleccionada para Delegación o Municipio.
   */
  opcionDelegacionMunicipio: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Opción seleccionada para Colonia.
   */
  opcionColonia: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Observable para manejar la destrucción de suscripciones.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Referencia al modal para agregar mercancías.
   */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;

  /**
   * Fecha de inicio predefinida.
   */
  public fechaInicioInput: InputFecha = FECHA_INGRESO;

  /**
   * Tipo de selección de la tabla.
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas para la tabla de operaciones de importación.
   */
  configuracionColumnas: ConfiguracionColumna<OperacionDeImportacion>[] = [
    {
      encabezado: 'Patente o autorización del agente aduanal',
      clave: (item: OperacionDeImportacion) => item.agenteAduanal,
      orden: 1,
    },
    {
      encabezado: 'RFC del agente aduanal',
      clave: (item: OperacionDeImportacion) => item.rfc,
      orden: 2,
    },
    {
      encabezado: 'Número de pedimento',
      clave: (item: OperacionDeImportacion) => item.numeroDePedimento,
      orden: 3,
    },
    {
      encabezado: 'Aduana de importación',
      clave: (item: OperacionDeImportacion) => item.aduanaDeImportacion,
      orden: 4,
    },
  ];

  /**
   * Lista de operaciones de importación.
   */
  operacionDeImportacionLista: OperacionDeImportacion[] =
    [] as OperacionDeImportacion[];

  /**
   * Estado de la solicitud 32501.
   */
  solicitud32501State: Solicitud32501State = {} as Solicitud32501State;

  /**
   * Constructor de la clase `DatosSolicitudComponent`.
   *
   * @param fb - Servicio de `FormBuilder` para la creación y gestión de formularios reactivos.
   * @param MercanciasDesmontadasOSinMontarService - Servicio para manejar operaciones relacionadas con mercancías desmanteladas sin monitoreo.
   * @param solicitud32501Query - Servicio para realizar consultas relacionadas con la solicitud 32501.
   * @param solicitud32501Store - Almacén para gestionar el estado de la solicitud 32501.
   *
   * Este constructor inicializa el componente obteniendo el aviso del catálogo
   * y la operación de importación mediante las funciones `obtenerAvisoDelCatalogo`
   * y `obtenerOperacionDeImportacion`.
   */
  constructor(
    public fb: FormBuilder,
    public mercanciasDesmontadasOSinMontarService: MercanciasDesmontadasOSinMontarService,
    public solicitud32501Query: Solicitud32501Query,
    public solicitud32501Store: Solicitud32501Store
  ) {
    this.obtenerAvisoDelCatalogo();
    this.obtenerOperacionDeImportacion();
    this.obtenerAvisoOpcionesDeRadio();
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   *
   * - Configura el formulario `formAviso` con los valores iniciales y validaciones necesarias
   *   basadas en el estado `solicitud32501State`.
   * - Suscribe al observable `seleccionarSolicitud$` para actualizar el estado del formulario
   *   cuando se reciben nuevos datos de la solicitud.
   * - Utiliza `takeUntil` para gestionar la desuscripción automática cuando el componente
   *   se destruye, evitando fugas de memoria.
   */
  ngOnInit(): void {
    this.formAviso = this.fb.group({
      adace: [{ value: this.solicitud32501State.adace, disabled: true }],
      fechaIniExposicion: [
        { value: this.solicitud32501State.fechaIniExposicion, disabled: true },
        Validators.required,
      ],
      ideGenerica1: [
        this.solicitud32501State.ideGenerica1,
        [Validators.required],
      ],
      idTransaccionVU: [
        this.solicitud32501State.idTransaccionVU,
        [Validators.maxLength(25), Validators.minLength(25)],
      ],
      cveFraccionArancelaria: [
        this.solicitud32501State.cveFraccionArancelaria,
        Validators.required,
      ],
      nico: [
        this.solicitud32501State.nico,
        [
          Validators.required,
          Validators.pattern(REGEX_SOLO_NUMEROS),
          Validators.maxLength(2),
          Validators.minLength(2),
        ],
      ],
      peso: [
        this.solicitud32501State.peso,
        [
          Validators.required,
          Validators.pattern(REGEX_NUMEROS_USD),
          Validators.maxLength(16),
          Validators.max(9999999999999.99),
          Validators.min(0.01),
        ],
      ],
      valorUSD: [
        this.solicitud32501State.valorUSD,
        [
          Validators.required,
          Validators.pattern(REGEX_NUMEROS_USD),
          Validators.maxLength(15),
          Validators.max(9999999999999.99),
          Validators.min(0.01),
        ],
      ],
      descripcionMercancia: [
        this.solicitud32501State.descripcionMercancia,
        Validators.required,
        Validators.maxLength(250),
      ],
      nombreComercial: [
        this.solicitud32501State.nombreComercial,
        [Validators.maxLength(250)],
      ],
      entidadFederativa: [
        this.solicitud32501State.entidadFederativa,
        Validators.required,
      ],
      delegacionMunicipio: [
        this.solicitud32501State.delegacionMunicipio,
        Validators.required,
      ],
      colonia: [this.solicitud32501State.colonia, [Validators.required]],
      calle: [this.solicitud32501State.calle, [Validators.required,Validators.maxLength(250)]],
      numeroExterior: [
        this.solicitud32501State.numeroExterior,
       [ Validators.required, Validators.maxLength(15)]
      ],
      numeroInterior: [this.solicitud32501State.numeroInterior,[Validators.maxLength(15)]],
      codigoPostal: [
        this.solicitud32501State.codigoPostal,
        [Validators.required, Validators.pattern(REGEX_SOLO_NUMEROS),Validators.maxLength(5)],
      ],
    });

    this.solicitud32501Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((respuesta: Solicitud32501State) => {
          this.solicitud32501State = respuesta;
          this.formAviso.patchValue({
            adace: this.solicitud32501State.adace,
            fechaIniExposicion: this.solicitud32501State.fechaIniExposicion,
            ideGenerica1: this.solicitud32501State.ideGenerica1,
            idTransaccionVU: this.solicitud32501State.idTransaccionVU,
            cveFraccionArancelaria:
              this.solicitud32501State.cveFraccionArancelaria,
            nico: this.solicitud32501State.nico,
            peso: this.solicitud32501State.peso,
            valorUSD: this.solicitud32501State.valorUSD,
            descripcionMercancia: this.solicitud32501State.descripcionMercancia,
            nombreComercial: this.solicitud32501State.nombreComercial,
            entidadFederativa: this.solicitud32501State.entidadFederativa,
            delegacionMunicipio: this.solicitud32501State.delegacionMunicipio,
            colonia: this.solicitud32501State.colonia,
            calle: this.solicitud32501State.calle,
            numeroExterior: this.solicitud32501State.numeroExterior,
            numeroInterior: this.solicitud32501State.numeroInterior,
            codigoPostal: this.solicitud32501State.codigoPostal,
          });
        })
      )
      .subscribe();
  }

  /**
   * Obtiene un aviso del catálogo utilizando el servicio `mercanciasDesmontadasOSinMontarService`.
   * Se suscribe al observable y actualiza las opciones relacionadas con la fracción arancelaria,
   * entidad federativa, delegación/municipio y colonia con los valores obtenidos de la respuesta.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  obtenerAvisoDelCatalogo(): void {
    this.mercanciasDesmontadasOSinMontarService
      .obtenerAvisoDelCatalogo()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (respuesta: AvisoCatalogo) => {
          this.opcionFraccionArancelaria = respuesta.cveFraccionArancelaria;
          this.opcionEntidadFederativa = respuesta.entidadFederativa;
          this.opcionDelegacionMunicipio = respuesta.delegacionMunicipio;
          this.opcionColonia = respuesta.colonia;
        },
      });
  }

  obtenerAvisoOpcionesDeRadio():void{
    this.mercanciasDesmontadasOSinMontarService
      .obtenerAvisoOpcionesDeRadio()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (respuesta: AvisoOpcionesDeRadio) => {
          this.avisoOpcionesDeRadio = respuesta;
        },
      });
  }

  /**
   * Obtiene la lista de operaciones de importación desde el servicio correspondiente.
   *
   * Este método realiza una solicitud al servicio `MercanciasDesmontadasOSinMontarService` para obtener
   * las operaciones de importación y las asigna a la propiedad `operacionDeImportacionLista`.
   *
   * La suscripción al observable se gestiona utilizando el operador `takeUntil` para
   * evitar fugas de memoria, asegurándose de que se complete cuando el componente sea destruido.
   */
  obtenerOperacionDeImportacion(): void {
    this.mercanciasDesmontadasOSinMontarService
      .obtenerOperacionDeImportacion()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (respuesta: OperacionDeImportacion[]) => {
          this.operacionDeImportacionLista = respuesta;
        },
      });
  }

  /**
   * Establece el tipo de aviso basado en el evento proporcionado.
   *
   * @param evento - El evento que representa el tipo de aviso, puede ser una cadena o un número.
   * @returns void
   */
  setTipoDeAviso(evento: string | number): void {
    this.tipoAviso = evento;
  }

  /**
   * Actualiza la clave de la fracción arancelaria en el estado de la solicitud.
   *
   * @param evento - Objeto de tipo `Catalogo` que contiene la información de la fracción arancelaria seleccionada.
   */
  actualizarCveFraccionArancelaria(evento: Catalogo): void {
    this.solicitud32501Store.actualizarCveFraccionArancelaria(evento.id);
  }

  /**
   * Actualiza la entidad federativa en el estado de la solicitud.
   *
   * @param evento - Objeto de tipo `Catalogo` que contiene la información de la entidad federativa seleccionada.
   *                 Se utiliza el `id` de este objeto para actualizar la entidad federativa en el store.
   *
   * @returns void
   */
  actualizarEntidadFederativa(evento: Catalogo): void {
    this.solicitud32501Store.actualizarEntidadFederativa(evento.id);
  }

  /**
   * Actualiza la delegación o municipio en el estado de la solicitud.
   *
   * @param evento - Objeto de tipo `Catalogo` que contiene la información
   *                 necesaria para actualizar la delegación o municipio,
   *                 incluyendo su identificador único (`id`).
   */
  actualizarDelegacionMunicipio(evento: Catalogo): void {
    this.solicitud32501Store.actualizarDelegacionMunicipio(evento.id);
  }

  /**
   * Actualiza la colonia en el estado de la solicitud utilizando el identificador proporcionado.
   *
   * @param evento - Objeto de tipo `Catalogo` que contiene la información de la colonia seleccionada,
   * incluyendo su identificador único (`id`).
   */
  actualizarColonia(evento: Catalogo): void {
    this.solicitud32501Store.actualizarColonia(evento.id);
  }

  /**
   * Actualiza el ID de transacción VU en el estado de la solicitud.
   *
   * @param evento - El evento que contiene el elemento de entrada HTML.
   *                 Se espera que sea un evento de tipo `Event`.
   *
   * El método extrae el valor del elemento de entrada, elimina caracteres no deseados
   * utilizando una expresión regular (`REGEX_REEMPLAZAR`) y actualiza el ID de transacción
   * VU en el store correspondiente (`solicitud32501Store`).
   */
  actualizarIdTransaccionVU(evento: Event): void {
    const ELEMENTO_DE_ENTRADA = evento.target as HTMLInputElement;
    const VALOR = ELEMENTO_DE_ENTRADA.value.replace(REGEX_REEMPLAZAR, '');
    this.solicitud32501Store.actualizarIdTransaccionVU(VALOR);
  }

  /**
   * Actualiza el valor de "Nico" en el estado de la solicitud.
   *
   * @param evento - El evento que se dispara al interactuar con el elemento de entrada.
   *                  Se espera que sea un evento de tipo `Event`.
   *
   * El método toma el valor del elemento de entrada asociado al evento,
   * lo procesa eliminando caracteres no deseados según un patrón definido
   * por `REGEX_REEMPLAZAR`, y luego actualiza el estado de la solicitud
   * utilizando el valor procesado.
   */
  actualizarNico(evento: Event): void {
    const ELEMENTO_DE_ENTRADA = evento.target as HTMLInputElement;
    const VALOR = ELEMENTO_DE_ENTRADA.value.replace(REGEX_REEMPLAZAR, '');
    this.solicitud32501Store.actualizarNico(VALOR);
  }

  /**
   * Actualiza el peso en la tienda de la solicitud 32501.
   *
   * @param evento - El evento que contiene el elemento de entrada HTML.
   *                 Se espera que sea un evento de tipo `Event`.
   *
   * El valor del elemento de entrada se procesa eliminando caracteres
   * no deseados utilizando una expresión regular antes de actualizar
   * el peso en la tienda.
   */
  actualizarPeso(evento: Event): void {
    const ELEMENTO_DE_ENTRADA = evento.target as HTMLInputElement;
    const VALOR = ELEMENTO_DE_ENTRADA.value.replace(REGEX_REEMPLAZAR, '');
    this.solicitud32501Store.actualizarPeso(VALOR);
  }

  /**
   * Actualiza el valor en USD en el estado de la solicitud.
   *
   * @param evento - El evento que contiene el valor ingresado por el usuario.
   *                  Se espera que sea un evento de entrada (input).
   *
   * El método toma el valor del elemento de entrada del evento,
   * elimina caracteres no deseados utilizando una expresión regular,
   * y actualiza el valor en el store correspondiente.
   */
  actualizarValorUSD(evento: Event): void {
    const ELEMENTO_DE_ENTRADA = evento.target as HTMLInputElement;
    const VALOR = ELEMENTO_DE_ENTRADA.value.replace(REGEX_REEMPLAZAR, '');
    this.solicitud32501Store.actualizarValorUSD(VALOR);
  }

  /**
   * Actualiza la descripción de la mercancía en el estado de la solicitud.
   *
   * @param evento - El evento que contiene el valor ingresado en el campo de entrada.
   */
  actualizarDescripcionMercancia(evento: Event): void {
    const VALOR = evento.target as HTMLInputElement;
    this.solicitud32501Store.actualizarDescripcionMercancia(VALOR.value);
  }

  /**
   * Actualiza el código postal en el estado de la solicitud.
   *
   * @param evento - El evento que contiene el valor del código postal ingresado por el usuario.
   */
  actualizarCodigoPostal(evento: Event): void {
    const VALOR = evento.target as HTMLInputElement;
    this.solicitud32501Store.actualizarCodigoPostal(VALOR.value);
  }

  /**
   * Actualiza el número interior en el estado de la solicitud.
   * @param evento Evento del input que contiene el nuevo valor.
   */
  actualizarNumeroInterior(evento: Event): void {
    const VALOR = evento.target as HTMLInputElement;
    this.solicitud32501Store.actualizarNumeroInterior(VALOR.value);
  }

  /**
   * Actualiza el número exterior en el estado de la solicitud.
   * @param evento Evento del input que contiene el nuevo valor.
   */
  actualizarNumeroExterior(evento: Event): void {
    const VALOR = evento.target as HTMLInputElement;
    this.solicitud32501Store.actualizarNumeroExterior(VALOR.value);
  }

  /**
   * Actualiza la calle en el estado de la solicitud.
   * @param evento Evento del input que contiene el nuevo valor.
   */
  actualizarCalle(evento: Event): void {
    const VALOR = evento.target as HTMLInputElement;
    this.solicitud32501Store.actualizarCalle(VALOR.value);
  }

  /**
   * Actualiza el nombre comercial en el estado de la solicitud.
   * @param evento Evento del input que contiene el nuevo valor.
   */
  actualizarNombreComercial(evento: Event): void {
    const VALOR = evento.target as HTMLInputElement;
    this.solicitud32501Store.actualizarNombreComercial(VALOR.value);
  }

  /**
   * Muestra el modal para modificar una operación de importación.
   */
  modificarOperacionImp(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Muestra el modal para agregar una nueva operación de importación.
   */
  agregarOperacionImp(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Verifica si un campo del formulario no es válido.
   * @param id Identificador del campo en el formulario.
   * @returns true si el campo es inválido y ha sido tocado, de lo contrario undefined.
   */
  noEsValido(id: string): boolean | undefined {
    const CONTROL = this.formAviso.get(id);
    return CONTROL?.invalid && CONTROL?.touched;
  }

  /**
   * Verifica si un campo del formulario es válido.
   * @param field Nombre del campo en el formulario.
   * @returns true si el campo es inválido y ha sido tocado, de lo contrario false.
   */
  esValido(field: string): boolean {
    const CONTROL = this.formAviso.get(field);
    return CONTROL ? CONTROL.invalid && CONTROL.touched : false;
  }

  /**
   * Método de limpieza al destruir el componente.
   * Cancela suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
