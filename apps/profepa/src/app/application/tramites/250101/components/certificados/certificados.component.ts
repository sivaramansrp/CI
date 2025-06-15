/**
 * @module CertificadosComponent
 * @description
 * Componente que gestiona la visualización y manipulación de certificados.
 * Proporciona funcionalidad para mostrar tablas y modales relacionados con certificados fitosanitarios y autorizaciones.
 */
import { CertificadosFilaTableDatos, CertificadosFitoFilaTableDatos, CertificadosTablaDatos, PermisosCertificadosFitoFilaTableDatos, TablaDatos } from '../../models/flora-fauna.models';// Importa la interfaz de datos para la tabla de certificados
import { Component, OnDestroy, OnInit } from '@angular/core';// Importa decoradores y ciclos de vida de Angular
import { CertificadosService } from '../../services/certificados.service';// Servicio para obtener datos relacionados con los certificados.
import { CommonModule } from '@angular/common';// Importa directivas comunes de Angular como ngIf y ngFor
import { ModalComponent } from '../modal/modal.component'; // Componente para mostrar modales.
import { Subject } from 'rxjs'; // Utilidad de RxJS para manejar observables y suscripciones.
import { TableComponent } from '@libs/shared/data-access-user/src'; // Importa componente compartido para la tabla.
import { TituloComponent } from '@libs/shared/data-access-user/src'; // Importa componente compartido para el título.

/**
 * @component CertificadosComponent
 * @description
 * Componente que permite al usuario gestionar y visualizar datos relacionados con certificados.
 */
@Component({
  selector: 'app-certificados', // Selector del componente.
  standalone: true, // Indica que este componente es independiente.
  imports: [CommonModule, TituloComponent, TableComponent, ModalComponent], // Importa módulos y componentes necesarios.
  templateUrl: './certificados.component.html', // Ruta al archivo de plantilla HTML.
  styleUrl: './certificados.component.scss', // Ruta al archivo de estilos SCSS.
})
export class CertificadosComponent implements OnInit, OnDestroy {
  /**
   * @property destroy$
   * @description
   * Sujeto utilizado para gestionar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private destroy$ = new Subject<void>();

  /**
   * @property showTableDiv
   * @description
   * Indica si la tabla principal debe mostrarse o no.
   */
  showTableDiv = true;

  /**
   * @property showFitosanitariosModal
   * @description
   * Indica si el modal de certificados fitosanitarios debe mostrarse o no.
   */
  showFitosanitariosModal = false;

  /**
   * @property showAutorizacionesModal
   * @description
   * Indica si el modal de autorizaciones debe mostrarse o no.
   */
  showAutorizacionesModal = false;

  /**
   * @property tablaCertificadosData
   * @description
   * Datos relacionados con la tabla de certificados.
   */
  tablaCertificadosData: string[] = [];

  /**
   * @property tablaFitosanitoriosData
   * @description
   * Datos relacionados con la tabla de certificados fitosanitarios.
   */
  tablaFitosanitoriosData: string[] = [];

  /**
   * @property tablaPermisoCertificadosData
   * @description
   * Datos relacionados con la tabla de permisos de certificados.
   */
  tablaPermisoCertificadosData: string[] = [];

 /**
   * @property tablaCertificadosFilaDatos
   * @description
   * Datos relacionados con la tabla de permisos de certificados fila.
   */
  tablaCertificadosFilaDatos: TablaDatos[]=[];
  /**
   * @property   tablaFitosanitoriosFilaDatos

   * @description
   * Datos relacionados con la tabla de permisos de certificados fito sanitorios fila.
   */
  tablaFitosanitoriosFilaDatos: TablaDatos[]=[];
    /**
   * @property   tablaPermisoCertificadosFilaDatos

   * @description
   * Datos relacionados con la tabla de permisos de certificados fito permiso certificados fila.
   */
  tablaPermisoCertificadosFilaDatos: TablaDatos[]=[];

  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
   esFormularioSoloLectura: boolean = false;
  /**
   * @constructor
   * @description
   * Constructor del componente. Inicializa los servicios necesarios.
   * @param certificadosService - Servicio para obtener datos relacionados con los certificados.
   */
  constructor(private certificadosService: CertificadosService) {
    // Constructor vacío.
  }

  /**
   * @method ngOnInit
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Obtiene datos de los servicios y los asigna a las propiedades correspondientes.
   */
  ngOnInit(): void {
    this.certificadosService
      .getFitosanitoriosEncabezadoDeTabla()
      .subscribe((data: CertificadosTablaDatos) => {
        this.tablaFitosanitoriosData = data.columns; // Asigna los datos de la tabla de fitosanitarios.
      });

    this.certificadosService
      .getPermisoCertificadosDeTabla()
      .subscribe((data: CertificadosTablaDatos) => {
        this.tablaPermisoCertificadosData = data.columns; // Asigna los datos de la tabla de permisos.
      });

    this.certificadosService
      .getCertificadosDeTabla()
      .subscribe((data: CertificadosTablaDatos) => {
        this.tablaCertificadosData = data.columns; // Asigna los datos de la tabla de certificados.
      });

      this.certificadosService
      .getCertificadosFilaDeTabla()
      .subscribe((data: CertificadosFilaTableDatos) => {
        this.tablaCertificadosFilaDatos = [data.data]; // Asigna los datos de la tabla de certificados fila.
      });

      this.certificadosService
      .getCertificadosFitoFilaDeTabla()
      .subscribe((data: CertificadosFitoFilaTableDatos) => {
        this.tablaFitosanitoriosFilaDatos = [data.data]; // Asigna los datos de la tabla de certificados fito fila.
      });

      this.certificadosService
      .getPermisoCertificadosFilaDeTabla()
      .subscribe((data: PermisosCertificadosFitoFilaTableDatos) => {
        this.tablaPermisoCertificadosFilaDatos= [data.data]; // Asigna los datos de la tabla de permiso certificados fila.
      });
  }

  /**
   * @method cambiarCertificadosFitosanitarios
   * @description
   * Alterna la visibilidad de la tabla principal y el modal de certificados fitosanitarios.
   */
  cambiarCertificadosFitosanitarios(): void {
    this.showTableDiv = !this.showTableDiv;
    this.showFitosanitariosModal = !this.showFitosanitariosModal;
  }

  /**
   * @method cambiarCertificadosAutorizaciones
   * @description
   * Alterna la visibilidad de la tabla principal y el modal de autorizaciones.
   */
  cambiarCertificadosAutorizaciones(): void {
    this.showTableDiv = !this.showTableDiv;
    this.showAutorizacionesModal = !this.showAutorizacionesModal;
  }

  /**
   * @method ngOnDestroy
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}