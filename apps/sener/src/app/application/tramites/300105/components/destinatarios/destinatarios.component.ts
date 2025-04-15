import {
  Catalogo,
  ConfiguracionColumna,
  CrosslistComponent,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  CrosslistBoton,
  OBTENER_BOTONES_CROSSLIST,
} from '../../enum/crosslist-botons.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Tramite300105State,
  Tramite300105Store,
} from '../../estados/tramite300105.store';
import { Subject, takeUntil } from 'rxjs';
import { Tramite300105Query } from '../../estados/tramite300105.query';
import { AutorizacionDeRayosXService } from '../../services/autorizacion-de-rayos-x.service';
import { DESTINATARIO_TABLA_CONFIGURACION, DestinatarioConfiguracionItem, MERCANCIA_TABLA_CONFIGURACION, MercanciaConfiguracionItem } from '../../enum/destinatario-tabla.enum';

/*
 * Componente que gestiona los datos de la solicitud, incluyendo la configuración de formularios,
 * tablas dinámicas y la interacción con servicios relacionados con autorizaciones de vida silvestre.
 */
@Component({
  selector: 'app-destinatarios',
  templateUrl: './destinatarios.component.html',
  styleUrls: ['./destinatarios.component.scss'],
})
export class DestinatariosComponent implements OnInit, OnDestroy {
  /**
   * Referencia al componente Crosslist para gestionar listas dinámicas.
   */
  @ViewChild(CrosslistComponent) crosslistComponent!: CrosslistComponent;

  /**
   * Formulario reactivo para los datos de la solicitud.
   */
  formularioSolicitud!: FormGroup;

  /**
   * Formulario reactivo para los datos de la mercancía.
   */
  formularioMercancia!: FormGroup;

  /**
   * Indica si se seleccionó otra fracción en el formulario de mercancía.
   */
  otraFraccionSeleccionada!: boolean;

  /**
   * Estado actual de la solicitud.
   */
  estadoSolicitud300105!: Tramite300105State;

  /**
   * Botones configurados para la lista dinámica de aduanas.
   */
  botonesAduanas!: CrosslistBoton[];

  /**
   * Lista original de aduanas disponibles.
   */
  listaOriginalAduanas: string[] = [];

  /**
   * Lista de aduanas seleccionadas.
   */
  listaSeleccionadaAduanas: string[] = [];

  /**
   * Botones configurados para la lista dinámica de movimientos.
   */
  botonesMovimientos!: CrosslistBoton[];

  /**
   * Lista original de movimientos disponibles.
   */
  listaOriginalMovimientos: string[] = [];

  /**
   * Lista de movimientos seleccionados.
   */
  listSeleccionadaMovimientos: string[] = [];

  /**
   * Configuración de las columnas para la tabla.
   */
  configuracionTabla: ConfiguracionColumna<DestinatarioConfiguracionItem>[] =
  DESTINATARIO_TABLA_CONFIGURACION;

      /**
   * Configuración de las columnas para la tabla.
   */
  mercanciaTabla: ConfiguracionColumna<MercanciaConfiguracionItem>[] =
  MERCANCIA_TABLA_CONFIGURACION;

  /**
   * Tipo de selección para la tabla dinámica.
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Datos de la tabla de mercancías.
   */
  datosTablaDestinatario!: DestinatarioConfiguracionItem[];

  datosMercanciaTablaMercancia!: MercanciaConfiguracionItem[];

  /**
   * Fila seleccionada en la tabla de mercancías.
   */
  filaSeleccionadaMercancia!: DestinatarioConfiguracionItem;

  /**
   * Lista de filas seleccionadas en la tabla de mercancías.
   */
  listaFilaSeleccionadaMercancia!: DestinatarioConfiguracionItem[];

  /**
   * Indica si un archivo está seleccionado.
   */
  enableModficarBoton: boolean = false;

  /**
   * Indica si se debe mostrar el modal de datos de mercancía.
   */
  mostrarModalDatosMercancia: boolean = false;

  /**
   * Indica si se debe mostrar el popup de selección múltiple.
   */
  mostrarPopupSeleccionMultiple: boolean = false;
  /**
   * Indica si el popup está abierto.
   */
  multipleSeleccionPopupAbierto: boolean = false;

  /**
   * Indica si el popup está cerrado.
   */
  multipleSeleccionPopupCerrado: boolean = true;

  /**
   * Indica si el popup está abierto.
   */
  confirmEliminarPopupAbierto: boolean = false;

  /**
   * Indica si el popup está cerrado.
   */
  confirmEliminarPopupCerrado: boolean = true;

  /**
   * Indica si el botón de eliminar está habilitado.
   */
  enableEliminarBoton: boolean = false;

  /**
   * Observable para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private notificadorDestruccion$: Subject<void> = new Subject();


  /**
   * Indica si se está realizando una operación de actualización.
   */
  esOperacionDeActualizacion: boolean = false;

  /**
   * Constructor del componente.
   * autorizacionDeRayosXService Servicio para manejar datos relacionados con autorizaciones de vida silvestre.
   * tramite300105Store Almacén de estado para el trámite 300105.
   * tramite300105Query Consulta de estado para el trámite 300105.
   * formBuilder Constructor de formularios reactivos.
   */
  constructor(
    public autorizacionDeRayosXService: AutorizacionDeRayosXService,
    private tramite300105Store: Tramite300105Store,
    private tramite300105Query: Tramite300105Query,
    private formBuilder: FormBuilder
  ) {
    // No se realiza ninguna acción aquí en el constructor.
  }

  /**
   * Método del ciclo de vida de Angu131lar que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.tramite300105Query.selectTramite300105$
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((state) => {
        this.estadoSolicitud300105 = state;
      });

    this.botonesMovimientos = OBTENER_BOTONES_CROSSLIST(
      this.crosslistComponent
    );

    this.datosTablaDestinatario = this.estadoSolicitud300105.destinatarioTablaDatos;
  }

  crearNuevoFormularioMercancia(data?: DestinatarioConfiguracionItem): void {
    const DEFAULT_DATA: DestinatarioConfiguracionItem = {
      id: 0,
      denominacionRazon: '',
      domicilio: '',
      pais: '',
      correo: '',
      paginaWeb: '',
      tipoMercancia: '',
      ...data,
    };

    this.formularioMercancia = this.formBuilder.group({
      id: [DEFAULT_DATA.id],
      denominacionRazon: [
        DEFAULT_DATA.denominacionRazon,
        [Validators.required],
      ],
      domicilio: [DEFAULT_DATA.domicilio, [Validators.required]],
      pais: [DEFAULT_DATA.pais, [Validators.required]],
      correo: [
        DEFAULT_DATA.correo,
        [Validators.required],
      ],
      paginaWeb: [DEFAULT_DATA.paginaWeb, [Validators.required]],
      tipoMercancia: [
        DEFAULT_DATA.tipoMercancia,
        [Validators.required],
      ]
    });
  }

  /**
   * Maneja el cambio en la fracción arancelaria seleccionada.
   * $event Evento que contiene la información de la fracción arancelaria seleccionada.
   */
  manejarCambioFraccionArancelaria($event: Catalogo): void {
    const FRACCION_DESCRIPCION =
      this.autorizacionDeRayosXService.fraccionArancelariaDescripcion.find(
        (item) => Number(item.id) === Number($event.descripcion)
      );
    this.formularioMercancia
      .get('fraccionDescripcion')
      ?.setValue(FRACCION_DESCRIPCION?.descripcion);
  }

  /**
   * Maneja la fila seleccionada en la tabla de mercancías.
   * fila Fila seleccionada.
   */
  manejarFilaSeleccionada(fila: DestinatarioConfiguracionItem[]): void {
    if (fila.length === 0) {
      this.enableModficarBoton = false;
      this.enableEliminarBoton = false;
      return;
    }
    this.listaFilaSeleccionadaMercancia = fila;
    this.filaSeleccionadaMercancia = fila[fila.length - 1];
    this.enableModficarBoton = true;
    this.enableEliminarBoton = true;
  }

  /**
   * Actualiza la fila seleccionada con los datos más recientes de la tabla.
   */
  actualizarFilaSeleccionada(): void {
    const UPDATED_DATA = this.datosTablaDestinatario.find(
      (item) => item.id === this.filaSeleccionadaMercancia.id
    );

    if (UPDATED_DATA) {
      this.filaSeleccionadaMercancia = { ...UPDATED_DATA };
    }
  }

  /**
   * Modifica los datos de una fila seleccionada en la tabla de mercancías.
   * Actualiza el formulario de mercancía con los datos de la fila seleccionada
   * y abre el modal para editar los datos.
   */
  modificarItemMercancia(): void {
    if (this.listaFilaSeleccionadaMercancia.length < 2) {
      const GET_INDEX = (array: Catalogo[], value: string): number =>
        array.findIndex((item) => item.descripcion === value) + 1;
      
      this.actualizarFilaSeleccionada();
      this.esOperacionDeActualizacion = true;
        const DESTINATARIO_CONFIGURACION_ITEM: DestinatarioConfiguracionItem = {
        denominacionRazon: this.filaSeleccionadaMercancia.denominacionRazon,
        domicilio: this.filaSeleccionadaMercancia.domicilio,
        pais: GET_INDEX(
          this.autorizacionDeRayosXService.pais,
          this.filaSeleccionadaMercancia.pais
        ).toString(),
        correo: this.filaSeleccionadaMercancia.correo,
        paginaWeb: this.filaSeleccionadaMercancia.paginaWeb,
        tipoMercancia: this.filaSeleccionadaMercancia.tipoMercancia,
      };

      this.crearNuevoFormularioMercancia(DESTINATARIO_CONFIGURACION_ITEM);
      this.alternarModalMercancia();
    } else {
      this.abrirMultipleSeleccionPopup();
    }
  }

  /**
   * Confirma la eliminación de los elementos seleccionados en la tabla de mercancías.
   * Si no hay elementos seleccionados, no realiza ninguna acción.
   * Si hay elementos seleccionados, abre el popup de confirmación de eliminación.
   */
  confirmEliminarMercanciaItem(): void {
    if (this.listaFilaSeleccionadaMercancia.length === 0) {
      return;
    }
    this.abrirElimninarConfirmationopup();
  }

  /**
 * Filtra y elimina los elementos seleccionados de la tabla de mercancías.
 * Actualiza el estado del almacén y cierra el popup de confirmación de eliminación.
 */
  eliminarMercanciaItem(): void {
    const IDS_TO_DELETE = this.listaFilaSeleccionadaMercancia.map(
      (item) => item.id
    );

    this.datosTablaDestinatario = this.datosTablaDestinatario.filter(
      (item) => !IDS_TO_DELETE.includes(item.id)
    );

    this.listaFilaSeleccionadaMercancia = [];
    this.tramite300105Store.setDestinatarioTablaDatos(this.datosTablaDestinatario);
    this.cerrarEliminarConfirmationPopup();
  }

  
/**
 * Abre el popup de selección múltiple si el botón de modificar está habilitado.
 */
  abrirMultipleSeleccionPopup(): void {
    if (this.enableModficarBoton) {
      this.multipleSeleccionPopupAbierto = true;
    }
  }

  /**
 * Cierra el popup de selección múltiple.
 */
  cerrarMultipleSeleccionPopup(): void {
    this.multipleSeleccionPopupAbierto = false;
    this.multipleSeleccionPopupCerrado = false;
  }

  /**
 * Abre el popup de confirmación de eliminación.
 */
  abrirElimninarConfirmationopup(): void {
    this.confirmEliminarPopupAbierto = true;
  }

  /**
 * Cierra el popup de confirmación de eliminación.
 */
  cerrarEliminarConfirmationPopup(): void {
    this.confirmEliminarPopupAbierto = false;
    this.confirmEliminarPopupCerrado = false;
  }

  /**
 * Alterna la visibilidad del modal de datos de mercancía.
 */
  alternarModalMercancia(): void {
    this.mostrarModalDatosMercancia = !this.mostrarModalDatosMercancia;
  }

  /**
   * Muestra el formulario de mercancía en un modal.
   */
  mostrarFormularioMercanciaModal(): void {
    this.esOperacionDeActualizacion = false;
    this.autorizacionDeRayosXService.inicializaMercanciaDatosCatalogos();
    this.crearNuevoFormularioMercancia();
    this.alternarModalMercancia();
  }

  /**
   * Valida si un control del formulario es inválido.
   * formControlName Nombre del control del formulario.
   * `true` si el control es inválido y ha sido tocado o modificado, de lo contrario `false`.
   */
  esControlInvalido(formControlName: string): boolean {
    const CONTROL = this.formularioMercancia.get(formControlName);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * Envía los datos del formulario de mercancía.
   * Valida el formulario, actualiza o agrega una nueva fila en la tabla de mercancías,
   * y actualiza el estado del almacén correspondiente.
   */
  enviarFormularioMercancia(): void {
    if (this.formularioMercancia.invalid || (!this.otraFraccionSeleccionada && this.formularioMercancia.get('fraccionArancelaria')?.value === '0')) {
      return;
    }
    
    const GET_DESCRIPTION = (array: Catalogo[], index: number): string => array[index - 1]?.descripcion || '';
  
    const TABLA_ROW: DestinatarioConfiguracionItem = {
      id: this.esOperacionDeActualizacion
        ? this.formularioMercancia.get('id')?.value
        : this.datosTablaDestinatario.length + 1,
      denominacionRazon: this.formularioMercancia.get('denominacionRazon')?.value,
      domicilio: this.formularioMercancia.get('domicilio')?.value,
      pais: GET_DESCRIPTION(
        this.autorizacionDeRayosXService.pais,
        this.formularioMercancia.get('pais')?.value
      ),
      correo: this.formularioMercancia.get('correo')?.value,
      paginaWeb: this.formularioMercancia.get('paginaWeb')?.value,
      tipoMercancia: GET_DESCRIPTION(
        this.autorizacionDeRayosXService.tipoMercancia,
        this.formularioMercancia.get('tipoMercancia')?.value
      ),
    };
  
    const EXISTING_INDEX = this.datosTablaDestinatario.findIndex(item => item.id === TABLA_ROW.id);
  
    if (EXISTING_INDEX > -1) {
      this.datosTablaDestinatario[EXISTING_INDEX] = TABLA_ROW;
    } else {
      this.datosTablaDestinatario = [...this.datosTablaDestinatario, TABLA_ROW];
    }
    
    this.tramite300105Store.setDestinatarioTablaDatos(this.datosTablaDestinatario);
    this.formularioMercancia.reset();
    this.alternarModalMercancia();
  }

  /**
   * Maneja el evento de cierre del modal de datos de mercancía.
   */
  ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}
