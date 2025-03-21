import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { DatosDeSolicitud } from '../../models/solicitud-datos.model';
import { ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Mercancia } from '../../models/mercancia.model';
import { Modal } from 'bootstrap';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { REGEX_CORREO_ELECTRONICO } from '@libs/shared/data-access-user/src';
import { REGEX_TELEFONO } from '@libs/shared/data-access-user/src';
import { RadioOptions } from '../../models/solicitud-datos.model';
import { Solicitud } from '../../models/solicitud-datos.model';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { Solicitud260101State } from '../../estados/tramites260101.store';
import { Solicitud260101Store } from '../../estados/tramites260101.store';
import { SolicitudDatos } from '../../models/solicitud-datos.model';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Subject } from 'rxjs';
import { TEXTOS } from '../../constantes/constantes';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TableData } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente que representa los datos de la solicitud.
 */
@Component({
  selector: 'app-solicitud-datos',
  templateUrl: './solicitud-datos.component.html',
  styleUrl: './solicitud-datos.component.scss',
})
/**
 * Componente que representa los datos de la solicitud
 */
export class SolicitudDatosComponent implements OnInit, OnDestroy {
  /**
   * Obtiene los datos de enumeración y establece valores de TEXTOS.
   * Esta variable contiene los textos estáticos utilizados en el componente.
   */
  TEXTOS = TEXTOS;

  /**
   * Controla la visibilidad del panel plegable.
   * El valor predeterminado está establecido en verdadero (panel ampliado).
   */
  public colapsable = true;

  /**
   * Controlador para manejar la destrucción del componente.
   * Utilizado para liberar recursos relacionados con las suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Encabezados de las columnas de la tabla.
   * Representados como un arreglo de cadenas de texto.
   */
  tablaHeadData: string[] = [];

  /**
   * Filas de datos de la tabla, basadas en la estructura de SolicitudDatos.
   */
  tablaFilaDatos: SolicitudDatos[] = [];

  /**
   * Configuración de la tabla SCIAN.
   * Contiene encabezados y cuerpo de datos vacíos al inicio.
   */
  public tableDataSCIAN: TableData = {
    tableHeader: [],
    tableBody: [],
  };

  /**
   * Configuración de la tabla de mercancías.
   * Contiene encabezados y cuerpo de datos vacíos al inicio.
   */
  public tableDataMercancias: TableData = {
    tableHeader: [],
    tableBody: [],
  };

  /**
   * Catálogo relacionado con el régimen.
   * Inicializado como un objeto vacío.
   */
  regimenCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo relacionado con la aduana.
   * Inicializado como un objeto vacío.
   */
  aduanaCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo relacionado con los estados.
   * Inicializado como un objeto vacío.
   */
  estadoCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Formulario reactivo utilizado para gestionar datos de la solicitud.
   * Se inicializará más adelante en el componente.
   */
  solicitudForm!: FormGroup;

  /**
   * Datos de las mercancías seleccionadas.
   * Representados como un arreglo de objetos tipo Mercancia.
   */
  selectedMercanciasDatos: Mercancia[] = [];

  /**
   * Referencia al elemento del modal para agregar mercancías.
   * Utilizado para manipular el modal mediante su elemento HTML.
   */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;

  /**
   * Opciones de botones de selección por radio.
   * Representadas como un arreglo de objetos tipo RadioOptions.
   */
  hacerlosRadioOptions: RadioOptions[] = [];

  /**
   * Controla el valor seleccionado en los botones de selección por radio.
   * Inicializado con un valor predeterminado de 0.
   */
  hacerlosPublicos = 0;

  /**
   * Estado actual de la solicitud.
   * Inicializado como un objeto vacío con la estructura de Solicitud260101State.
   */
  solicitud260101State: Solicitud260101State = {} as Solicitud260101State;

  /**
   * Configuración para la selección de filas en la tabla de mercancías.
   * Utiliza selección con checkbox.
   */
  mercanciasSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas de la tabla de mercancías.
   * Define las columnas y cómo se obtienen los datos de cada mercancía.
   */
  mercanciasConfiguracionTabla: ConfiguracionColumna<Mercancia>[] = [
    {
      encabezado: 'Clasificación del producto',
      clave: (item: Mercancia) => item.clasificaionProductos,
      orden: 1,
    },
    {
      encabezado: 'Especificar Clasificación del producto',
      clave: (item: Mercancia) => item.especificarProducto,
      orden: 2,
    },
    {
      encabezado: 'Denominación específico del producto',
      clave: (item: Mercancia) => item.nombreProductoEspecifico,
      orden: 3,
    },
    {
      encabezado: 'Marca',
      clave: (item: Mercancia) => item.marca,
      orden: 4,
    },
    {
      encabezado: 'Fracción arancelaria',
      clave: (item: Mercancia) => item.fraccionArancelaria,
      orden: 5,
    },
    {
      encabezado: 'Descripción de la fracción arancelaria',
      clave: (item: Mercancia) => item.descripcionFraccionArancelaria,
      orden: 6,
    },
    {
      encabezado: 'Unidad de medida de comercialización (UMC)',
      clave: (item: Mercancia) => item.umc,
      orden: 7,
    },
    {
      encabezado: 'Cantidad UMC',
      clave: (item: Mercancia) => item.cantidadUMC,
      orden: 8,
    },
    {
      encabezado: 'Unidad de medida de tarifa (UMT)',
      clave: (item: Mercancia) => item.umt,
      orden: 9,
    },
    {
      encabezado: 'Cantidad UMT',
      clave: (item: Mercancia) => item.cantidadUMT,
      orden: 10,
    },
    {
      encabezado: 'País de origen',
      clave: (item: Mercancia) => item.paisDeOrigen,
      orden: 11,
    },
    {
      encabezado: 'País de procedencia',
      clave: (item: Mercancia) => item.paisDeProcedencia,
      orden: 12,
    },
    {
      encabezado: 'Tipo de producto',
      clave: (item: Mercancia) => item.tipoProducto,
      orden: 13,
    },
    {
      encabezado: 'Uso específico',
      clave: (item: Mercancia) => item.usoEspecifico,
      orden: 14,
    },
  ];

  /**
   * Datos de las mercancías.
   * Representados como un arreglo de objetos tipo Mercancia.
   */
  mercanciasDatos: Mercancia[] = [];

  /**
   * Constructor del componente.
   * Inicializa servicios y otras dependencias necesarias.
   * @param solicitudDatosService - Servicio para manejar datos relacionados con la solicitud.
   * @param solicitud260101Store - Almacén para gestionar el estado de la solicitud.
   * @param solicitud260101Query - Consulta para observar los cambios en el estado de la solicitud.
   * @param fb - Servicio para construir formularios reactivos.
   */
  constructor(
    public solicitudDatosService: SolicitudDatosService,
    public solicitud260101Store: Solicitud260101Store,
    public solicitud260101Query: Solicitud260101Query,
    public fb: FormBuilder
  ) {
    //
  }

  /**
   * Método del ciclo de vida `OnInit`.
   * Inicializa el formulario reactivo y configura las suscripciones necesarias.
   */
  ngOnInit(): void {
    this.solicitudForm = this.fb.group({
      /** Razón social del solicitante. */
      razonSocial: [
        { value: this.solicitud260101State.razonSocial, disabled: true },
        [Validators.required, Validators.maxLength(30)],
      ],
      /** Correo electrónico del solicitante con validación de patrón. */
      correoElectronico: [
        { value: this.solicitud260101State.correoElectronico, disabled: true },
        [Validators.required, Validators.pattern(REGEX_CORREO_ELECTRONICO)],
      ],
      /** Código postal del domicilio del solicitante. */
      codigoPostal: [
        { value: this.solicitud260101State.codigoPostal, disabled: true },
        [Validators.required, Validators.maxLength(10)],
      ],
      /** Estado asociado al domicilio. */
      estado: [this.solicitud260101State.estado, [Validators.required]],
      /** Municipio del domicilio del solicitante. */
      municipio: [
        { value: this.solicitud260101State.municipio, disabled: true },
        [Validators.required],
      ],
      /** Localidad del domicilio. */
      localidad: [
        { value: this.solicitud260101State.localidad, disabled: true },
      ],
      /** Colonia del domicilio. */
      colonia: [{ value: this.solicitud260101State.colonia, disabled: true }],
      /** Calle del domicilio. */
      calle: [
        { value: this.solicitud260101State.calle, disabled: true },
        [Validators.required, Validators.maxLength(68)],
      ],
      /** Código LADA del número telefónico del solicitante. */
      lada: [{ value: this.solicitud260101State.lada, disabled: true }],
      /** Número telefónico con validación de longitud y formato. */
      telefono: [
        { value: this.solicitud260101State.telefono, disabled: true },
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(REGEX_TELEFONO),
        ],
      ],
      /** Indicador de aviso de funcionamiento del solicitante. */
      avisoDeFuncionamiento: [this.solicitud260101State.avisoDeFuncionamiento],
      /** Licencia sanitaria del solicitante. */
      licenciaSanitaria: [this.solicitud260101State.licenciaSanitaria],
      /** Estado del producto (fresco, congelado o vivo). */
      liveFreshFrozen: [this.solicitud260101State.liveFreshFrozen],
      /** Régimen asociado al trámite. */
      regimen: [this.solicitud260101State.regimen, [Validators.required]],
      /** Aduana asociada al trámite. */
      aduana: [this.solicitud260101State.aduana, [Validators.required]],
      /** Indicador de selección "hacerlos". */
      hacerlos: [this.solicitud260101State.hacerlos, [Validators.required]],
      /** RFC del solicitante. */
      rfc: [
        this.solicitud260101State.rfc,
        [Validators.required, Validators.maxLength(13)],
      ],
      /** Razón social del representante legal. */
      legalRazonSocial: [
        { value: this.solicitud260101State.legalRazonSocial, disabled: true },
        [Validators.required, Validators.maxLength(30)],
      ],
      /** Apellido paterno del solicitante. */
      apellidoPaterno: [
        { value: this.solicitud260101State.apellidoPaterno, disabled: true },
        [Validators.required, Validators.maxLength(30)],
      ],
      /** Apellido materno del solicitante. */
      apellidoMeterno: [
        { value: this.solicitud260101State.apellidoMeterno, disabled: true },
        [Validators.maxLength(30)],
      ],
      /** Indicador de manifiesto en el estado actual. */
      manifesto: [this.solicitud260101State.manifesto],
    });

    // Observa cambios en el estado de la solicitud y actualiza el formulario reactivo.
    this.solicitud260101Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((res: Solicitud260101State) => {
          this.solicitud260101State = res;
          this.solicitudForm.patchValue({
            razonSocial: this.solicitud260101State.razonSocial,
            correoElectronico: this.solicitud260101State.correoElectronico,
            codigoPostal: this.solicitud260101State.codigoPostal,
            estado: this.solicitud260101State.estado,
            municipio: this.solicitud260101State.municipio,
            localidad: this.solicitud260101State.localidad,
            colonia: this.solicitud260101State.colonia,
            calle: this.solicitud260101State.calle,
            lada: this.solicitud260101State.lada,
            telefono: this.solicitud260101State.telefono,
            avisoDeFuncionamiento:
              this.solicitud260101State.avisoDeFuncionamiento,
            licenciaSanitaria: this.solicitud260101State.licenciaSanitaria,
            liveFreshFrozen: this.solicitud260101State.liveFreshFrozen,
            regimen: this.solicitud260101State.regimen,
            aduana: this.solicitud260101State.aduana,
            hacerlos: this.solicitud260101State.hacerlos,
            rfc: this.solicitud260101State.rfc,
            legalRazonSocial: this.solicitud260101State.legalRazonSocial,
            apellidoPaterno: this.solicitud260101State.apellidoPaterno,
            apellidoMeterno: this.solicitud260101State.apellidoMeterno,
            manifesto: this.solicitud260101State.manifesto,
          });
          this.mercanciasDatos = this.solicitud260101State.mercanciasDatos;
        })
      )
      .subscribe();

    // Obtiene catálogos y datos relacionados con la aplicación.
    this.obtenerEstadoCatalogo();
    this.obtenerDatosDeAplicacion();
    this.obtenerRegimenDestinaraListo();
    this.obtenerAduanaListo();
    this.obtenerMercanciaListo();
    this.obtenerSolicitud();
  }

  /**
   * Muestra u oculta el panel plegable.
   * Cambia el estado de la propiedad `colapsable`.
   */
  mostrarColapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Obtiene los datos iniciales de la solicitud y los actualiza en el estado.
   */
  obtenerSolicitud(): void {
    this.solicitudDatosService.obtenerSolicitud().subscribe({
      next: (res: Solicitud) => {
        this.solicitud260101Store.setRazonSocial(res.razonSocial);
        this.solicitud260101Store.setCorreoElectronico(res.correoElectronico);
        this.solicitud260101Store.setCodigoPostal(res.codigoPostal);
        this.solicitud260101Store.setMunicipio(res.municipio);
        this.solicitud260101Store.setLocalidad(res.localidad);
        this.solicitud260101Store.setColonia(res.colonia);
        this.solicitud260101Store.setCalle(res.calle);
        this.solicitud260101Store.setLada(res.lada);
        this.solicitud260101Store.setTelefono(res.telefono);
        this.solicitud260101Store.setLegalRazonSocial(res.legalRazonSocial);
        this.solicitud260101Store.setApellidoPaterno(res.apellidoPaterno);
        this.solicitud260101Store.setApellidoMeterno(res.apellidoMeterno);
      },
    });
  }

  /**
   * Obtiene el catálogo de estados desde el servicio y actualiza la variable `estadoCatalogo`.
   */
  obtenerEstadoCatalogo(): void {
    this.solicitudDatosService.obtenerEstadoCatalogo().subscribe({
      next: (res: CatalogosSelect) => {
        this.estadoCatalogo = res;
      },
    });
  }

  /**
   * Obtiene los datos de la aplicación relacionados con la solicitud,
   * incluyendo encabezados, filas de la tabla y opciones de selección.
   * Actualiza las propiedades correspondientes con los valores obtenidos.
   */
  obtenerDatosDeAplicacion(): void {
    this.solicitudDatosService.obtenerDatosDeSolicitud().subscribe({
      next: (res: DatosDeSolicitud) => {
        this.tablaHeadData = res.tablaHeadData;
        this.tablaFilaDatos = res.tablaFilaDatos;
        this.hacerlosRadioOptions = res.hacerlosRadioOptions;
        this.tableDataSCIAN =
          Array.isArray(res.tablaFilaDatos) &&
          typeof res.tablaFilaDatos[0] === 'object'
            ? res.tablaFilaDatos[0]?.SCIANLista || ({} as TableData)
            : ({} as TableData);
      },
    });
  }

  /**
   * Obtiene la lista de mercancías desde el servicio y actualiza el estado en el Store.
   */
  obtenerMercanciaListo(): void {
    this.solicitudDatosService.obtenerMercanciaListo().subscribe({
      next: (res: Mercancia[]) => {
        this.solicitud260101Store.setMercanciasDatos(res);
      },
    });
  }

  /**
   * Obtiene el catálogo de regímenes desde el servicio y actualiza la variable `regimenCatalogo`.
   */
  obtenerRegimenDestinaraListo(): void {
    this.solicitudDatosService.obtenerRegimenDestinaraListo().subscribe({
      next: (res: CatalogosSelect) => {
        this.regimenCatalogo = res;
      },
    });
  }

  /**
   * Obtiene el catálogo de aduanas desde el servicio y actualiza la variable `aduanaCatalogo`.
   */
  obtenerAduanaListo(): void {
    this.solicitudDatosService.obtenerAduanaListo().subscribe({
      next: (res: CatalogosSelect) => {
        this.aduanaCatalogo = res;
      },
    });
  }

  /**
   * Actualiza los datos de la tabla SCIAN según el índice proporcionado.
   * @param tablaFilaDatos - Filas de datos de la tabla.
   * @param index - Índice de la fila seleccionada.
   */
  updateSCIANData(tablaFilaDatos: SolicitudDatos[], index: number): void {
    this.tableDataSCIAN = tablaFilaDatos[index].SCIANLista;
  }

  /**
   * Abre el modal para modificar mercancías.
   * Utiliza la referencia del elemento del modal en el DOM.
   */
  openModificarMercancias(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Abre el modal para agregar nuevas mercancías.
   * Utiliza la referencia del elemento del modal en el DOM.
   */
  openAgregarMercancias(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Actualiza el estado seleccionado en el Store.
   * @param event - Objeto del catálogo que contiene el estado seleccionado.
   */
  setEstado(event: Catalogo): void {
    this.solicitud260101Store.setEstado(event.id);
  }

  /**
   * Actualiza la licencia sanitaria en el Store.
   * @param event - Evento que contiene el valor de la licencia sanitaria.
   */
  setLicenciaSanitaria(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setLicenciaSanitaria(VALUE);
  }

  /**
   * Actualiza el régimen seleccionado en el Store.
   * @param event - Objeto del catálogo que contiene el régimen seleccionado.
   */
  setRegimen(event: Catalogo): void {
    this.solicitud260101Store.setRegimen(event.id);
  }

  /**
   * Actualiza la aduana seleccionada en el Store.
   * @param event - Objeto del catálogo que contiene la aduana seleccionada.
   */
  setAduana(event: Catalogo): void {
    this.solicitud260101Store.setAduana(event.id);
  }

  /**
   * Actualiza el valor de "hacerlos" en el Store.
   * @param event - Valor seleccionado para la propiedad "hacerlos".
   */
  setHacerlos(event: number | string): void {
    this.solicitud260101Store.setHacerlos(event);
  }

  /**
   * Actualiza el RFC en el Store.
   * @param event - Evento que contiene el valor del RFC.
   */
  setRFC(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setRfc(VALUE);
  }

  /**
   * Obtiene los datos seleccionados de mercancías desde el evento.
   * @param event - Lista de mercancías seleccionadas.
   */
  getMercanciasDatos(event: Mercancia[]): void {
    this.selectedMercanciasDatos = event;
  }

  /**
   * Elimina la primera mercancía seleccionada de la lista en el Store.
   */
  eliminarMercancias(): void {
    if (this.selectedMercanciasDatos.length > 0) {
      this.solicitud260101Store.removeMercanciaDatos(
        this.selectedMercanciasDatos[0]
      );
    }
  }

  /**
   * Actualiza el estado del producto como fresco, congelado o vivo en el Store.
   * @param event - Evento que contiene el estado seleccionado.
   */
  setLiveFreshFrozen(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).checked;
    this.solicitud260101Store.setLiveFreshFrozen(VALUE);
  }

  /**
   * Actualiza el indicador de aviso de funcionamiento en el Store.
   * @param event - Evento que contiene el valor del indicador.
   */
  setAvisoDeFuncionamiento(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).checked;
    this.solicitud260101Store.setAvisoDeFuncionamiento(VALUE);
  }

  /**
   * Actualiza el indicador de manifiesto en el Store.
   * @param event - Evento que contiene el valor del indicador.
   */
  setManifesto(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).checked;
    this.solicitud260101Store.setManifesto(VALUE);
  }

  /**
   * Método del ciclo de vida `OnDestroy`.
   * Libera los recursos y elimina las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
