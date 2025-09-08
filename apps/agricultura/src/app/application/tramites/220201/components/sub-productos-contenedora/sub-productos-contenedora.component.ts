/**
 * @file SubProductosContenedoraComponent
 * @description Componente contenedor para la gestión de sub-productos en el trámite 220201.
 * Proporciona la lógica para cargar catálogos, manejar el formulario y actualizar el estado.
 */

import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { ProductoDetallaEventos, ProductosCatalogosDatos } from '../../../../shared/models/datos-de-la-solicitue.model';
import { Subject,map, takeUntil, } from 'rxjs';
import { AgriculturaApiService } from '../../services/220201/agricultura-api.service';
import { CommonModule } from '@angular/common';
import { FilaSolicitud } from '../../models/220201/capturar-solicitud.model';
import { SubProductosComponent } from '../../../../shared/components/sub-productos/sub-productos.component';
import { ZoosanitarioQuery } from '../../queries/220201/zoosanitario.query';
import { ZoosanitarioStore } from '../../estados/220201/zoosanitario.store';

/**
 * Componente contenedor para sub-productos.
 */
@Component({
  selector: 'app-sub-productos-contenedora',
  standalone: true,
  imports: [CommonModule, SubProductosComponent],
  templateUrl: './sub-productos-contenedora.component.html',
  styleUrl: './sub-productos-contenedora.component.css',
})
export class SubProductosContenedoraComponent implements OnDestroy {

  /**
   * Datos de los catálogos de productos.
   * @type {ProductosCatalogosDatos}
   */
  public catalogosDatos: ProductosCatalogosDatos = {
    tipoRequisitoList: [],
    requisitoList: [],
    fraccionArancelariaList: [],
    nicoList: [],
    umtList: [],
    umcList: [],
    especieList: [],
    usoList: [],
    paisOrigenList: [],
    paisDeProcedenciaList: [],
    sexoList: [],
    presentacionList: [],
    cantidadPresentacionList: [],
    tipoPresentacionList: [],
    tipoPlantaList: [],
    plantaAutorizadaOrigenList: []
  }

  /**
   * Subject utilizado para destruir las suscripciones y evitar fugas de memoria cuando el componente se destruye.
   * @type {Subject<void>}
   */
  public destroyNotifier$ = new Subject<void>();

  /**
   * Datos del formulario de solicitud.
   * @type {FilaSolicitud}
   */
  public formularioSolicitud!: FilaSolicitud;

  /**
   * Evento para notificar el cierre del componente.
   * @type {EventEmitter<void>}
   */
  @Output() cerrar = new EventEmitter<void>();

  /**
   * Constructor de la clase `SubProductosContenedoraComponent`.
   * 
   * @param agriculturaApiService Servicio para interactuar con la API de Agricultura.
   * @param fitosanitarioQuery Servicio para realizar consultas relacionadas con fitosanitarios.
   * @param fitosanitarioStore Servicio para gestionar el estado de fitosanitarios.
   */
  constructor(
    public agriculturaApiService: AgriculturaApiService,
    public fitosanitarioQuery: ZoosanitarioQuery,
    public fitosanitarioStore: ZoosanitarioStore
  ) {
    this.agriculturaApiService.obtenerProductoRespuestaPorUrl('productos.json').subscribe((resp) => {
      this.catalogosDatos = resp;
    });
    this.fitosanitarioQuery.seleccionarState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((estado) => {
          const VALOR = estado?.selectedDatos[0];
          if (VALOR) {
            this.formularioSolicitud = SubProductosContenedoraComponent.createFormularioFromValor(VALOR);
          }
        })
      )
      .subscribe();
  }

  private static createFormularioFromValor(VALOR: FilaSolicitud): FilaSolicitud {
    const BASIC_FIELDS = SubProductosContenedoraComponent.getBasicFields(VALOR);
    const ADDITIONAL_FIELDS = SubProductosContenedoraComponent.getAdditionalFields(VALOR);
    return { ...BASIC_FIELDS, ...ADDITIONAL_FIELDS } as FilaSolicitud;
  }

  private static getBasicFields(VALOR: FilaSolicitud): Partial<FilaSolicitud> {
    return {
      id: VALOR.id || Math.floor(Math.random() * 1000000),
      tipoRequisito: VALOR.tipoRequisito || '',
      requisito: VALOR.requisito || '',
      numeroCertificadoInternacional: VALOR.numeroCertificadoInternacional || '',
      fraccionArancelaria: VALOR.fraccionArancelaria || '',
      descripcionFraccion: VALOR.descripcionFraccion || '',
      nico: VALOR.nico || '',
      descripcionNico: VALOR.descripcionNico || '',
      descripcion: VALOR.descripcion || ''
    };
  }

  private static getAdditionalFields(VALOR: FilaSolicitud): Partial<FilaSolicitud> {
    return {
      cantidadUMT: String(VALOR.cantidadUMT || ''),
      umt: VALOR.umt || '',
      cantidadUMC: String(VALOR.cantidadUMC || ''),
      umc: VALOR.umc || '',
      especie: VALOR.especie || '',
      uso: VALOR.uso || '',
      paisDeOrigen: VALOR.paisDeOrigen || '',
      paisDeProcedencia: VALOR.paisDeProcedencia || '',
      noPartida: VALOR.noPartida || '',
      tipoDeProducto: VALOR.tipoDeProducto || '',
      numeroDeLote: VALOR.numeroDeLote || '',
      certificadoInternacionalElectronico: VALOR.certificadoInternacionalElectronico || '',
      tipoPresentacion: VALOR.tipoPresentacion || '',
      tipoPlanta: VALOR.tipoPlanta || '',
      plantaAutorizadaOrigen: VALOR.plantaAutorizadaOrigen || '',
      presentacion: VALOR.presentacion || ''
    };
  }

  /**
   * Método que se ejecuta al enviar el formulario de solicitud de animales vivos.
   * Actualiza el estado con los datos del formulario.
   * @param valor Datos del formulario de solicitud de animales vivos.
   */
  agregarDatosFormulario(valor: ProductoDetallaEventos): void {
    const DATOS = SubProductosContenedoraComponent.createDatosFromFormulario(valor.formulario);
    this.updateStoreWithDatos(DATOS);
  }

  private static createDatosFromFormulario(formulario: Partial<FilaSolicitud>): FilaSolicitud {
    const BASIC_DATA = SubProductosContenedoraComponent.getBasicDataFields(formulario);
    const ADDITIONAL_DATA = SubProductosContenedoraComponent.getAdditionalDataFields(formulario);
    return { ...BASIC_DATA, ...ADDITIONAL_DATA } as FilaSolicitud;
  }

  private static getBasicDataFields(formulario: Partial<FilaSolicitud>): Partial<FilaSolicitud> {
    return {
      id: formulario.id || Math.floor(Math.random() * 1000000),
      noPartida: '',
      tipoRequisito: formulario.tipoRequisito || '',
      requisito: formulario.requisito || '',
      numeroCertificadoInternacional: formulario.numeroCertificadoInternacional || '',
      fraccionArancelaria: formulario.fraccionArancelaria || '',
      descripcionFraccion: formulario.descripcionFraccion || '',
      nico: formulario.nico || '',
      descripcionNico: formulario.descripcionNico || '',
      descripcion: formulario.descripcion || ''
    };
  }

  private static getAdditionalDataFields(formulario: Partial<FilaSolicitud>): Partial<FilaSolicitud> {
    return {
      umt: formulario.umt || '',
      cantidadUMT: formulario.cantidadUMT || '',
      umc: formulario.umc || '',
      cantidadUMC: formulario.cantidadUMC || '',
      uso: formulario.uso || '',
      tipoDeProducto: formulario.tipoDeProducto || '',
      numeroDeLote: formulario.numeroDeLote || '',
      paisDeOrigen: formulario.paisDeOrigen || '',
      paisDeProcedencia: formulario.paisDeProcedencia || '',
      certificadoInternacionalElectronico: formulario.certificadoInternacionalElectronico || '',
      especie: formulario.especie || '',
      tipoPresentacion: formulario.tipoPresentacion || '',
      tipoPlanta: formulario.tipoPlanta || '',
      plantaAutorizadaOrigen: formulario.plantaAutorizadaOrigen || '',
      presentacion: formulario.presentacion || ''
    };
  }

  private updateStoreWithDatos(DATOS: FilaSolicitud): void {
    this.fitosanitarioStore.update(state => {
      const INDEX = state.tablaDatos.findIndex(item => item.id === DATOS.id);
      const UPDATED_TABLA_DATOS =
        INDEX !== -1
          ? state.tablaDatos.map((item, i) => (i === INDEX ? DATOS : item))
          : [...state.tablaDatos, DATOS];
      return {
        ...state,
        tablaDatos: UPDATED_TABLA_DATOS,
        selectedDatos: []
      };
    });
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}