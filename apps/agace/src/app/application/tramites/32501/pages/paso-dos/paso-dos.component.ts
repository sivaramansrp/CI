import { AvisoCatalogo } from '../../models/aviso-catalogo.model';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { MercDesmSinMonService } from '../../services/merc-desm-sin-mon.service';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { RequisitosObligatorios } from '../../models/aviso-catalogo.model';
import { Subject } from 'rxjs';
import { TEXTOS } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { takeUntil } from 'rxjs';
/**
 * Este componente se muestra en el paso dos del proceso.
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
/**
 * Este componente se muestra en el paso dos del proceso.
 */
export class PasoDosComponent implements OnInit, OnDestroy {
  /** Textos utilizados en el componente */
  TEXTOS = TEXTOS;

  /** Lista de tipos de documentos disponibles */
  tiposDocumentos: Catalogo[] = [];

  /** Clase CSS para mostrar alertas de información */
  infoAlert = 'alert-info';

  /** Catálogo de documentos disponibles */
  catalogoDocumentos: Catalogo[] = [];

  /** Sujeto para manejar la destrucción de observables */
  private destroy$: Subject<void> = new Subject<void>();

  /** Documento seleccionado por el usuario */
  seleccionadoTipoDeDocumento: Catalogo = {} as Catalogo;

  /** Configuración de la tabla para agregar nuevos requisitos obligatorios */
  configuracionAgregarNuevoTabla: ConfiguracionColumna<RequisitosObligatorios>[] =
    [
      {
        encabezado: '',
        clave: (item: RequisitosObligatorios) => item.numeroDeSerie,
        orden: 1,
      },
      {
        encabezado: '',
        clave: (item: RequisitosObligatorios) => item.valor,
        orden: 2,
      },
    ];

  /** Datos de requisitos obligatorios para agregar */
  datosAgregarNuevo: RequisitosObligatorios[] = [] as RequisitosObligatorios[];

  /** Tipo de selección de la tabla */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /** Configuración de la tabla de tipos de documentos */
  configuracionTipoTabla: ConfiguracionColumna<Catalogo>[] = [
    {
      encabezado: 'Tipo de documento',
      clave: (item: Catalogo) => item.descripcion,
      orden: 1,
    },
  ];

  /** Lista de datos de tipos de documentos */
  datosTipo: Catalogo[] = [] as Catalogo[];

  /** Opción de tipo de documento seleccionado */
  opcionTipoDeDocumento: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Constructor del componente.
   * @param catalogosServices Servicio para obtener los catálogos.
   * @param mercDesmSinMonService Servicio para manejar los datos del aviso del catálogo.
   */
  constructor(
    private catalogosServices: CatalogosService,
    public mercDesmSinMonService: MercDesmSinMonService
  ) {
    // Constructor
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
    this.obtenerAvisoDelCatalogo();
    this.obtenerDatosAgregarNuevo();
  }

  /**
   * Obtiene el aviso del catálogo desde el servicio correspondiente.
   */
  obtenerAvisoDelCatalogo(): void {
    this.mercDesmSinMonService
      .obtenerAvisoDelCatalogo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: AvisoCatalogo) => {
          this.opcionTipoDeDocumento = respuesta.opcionTipoDeDocumento;
        },
      });
  }

  /**
   * Obtiene la lista de tipos de documentos desde el catálogo.
   */
  getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp): void => {
          if (resp.length > 0) {
            this.catalogoDocumentos = resp;
          }
        },
      });
  }

  /**
   * Obtiene los datos de los requisitos obligatorios desde el servicio.
   */
  obtenerDatosAgregarNuevo(): void {
    this.mercDesmSinMonService
      .obtenerDatosAgregarNuevo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: RequisitosObligatorios[]) => {
          this.datosAgregarNuevo = respuesta;
        },
      });
  }

  /**
   * Actualiza el tipo de documento seleccionado.
   * @param evento Documento seleccionado por el usuario.
   */
  actualizarTipoDeDocumento(evento: Catalogo): void {
    this.seleccionadoTipoDeDocumento = evento;
  }

  /**
   * Limpia la selección de documentos.
   */
  seleccionarEliminar(): void {
    this.datosTipo = [];
  }

  /**
   * Agrega un nuevo tipo de documento a la lista de seleccionados.
   */
  seleccionarAgregarNuevo(): void {
    this.datosTipo.push(this.seleccionadoTipoDeDocumento);
  }

  /**
   * Método que se ejecuta al destruir el componente para limpiar los observables.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
