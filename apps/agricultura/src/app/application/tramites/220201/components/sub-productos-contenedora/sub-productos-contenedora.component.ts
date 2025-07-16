/**
 * @file SubProductosContenedoraComponent
 * @description Componente contenedor para la gestión de sub-productos en el trámite 220201.
 * Proporciona la lógica para cargar catálogos, manejar el formulario y actualizar el estado.
 */

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';
import { SubProductosComponent } from '../../../../shared/components/sub-productos/sub-productos.component';
import { ProductoDetallaEventos, ProductosCatalogosDatos } from '../../../../shared/models/datos-de-la-solicitue.model';
import { ZoosanitarioStore } from '../../estados/220201/zoosanitario.store';
import { FilaSolicitud } from '../../models/220201/capturar-solicitud.model';
import { ZoosanitarioQuery } from '../../queries/220201/zoosanitario.query';
import { AgriculturaApiService } from '../../services/220201/agricultura-api.service';

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
export class SubProductosContenedoraComponent {

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
            this.formularioSolicitud = {
              id: VALOR.id || Math.floor(Math.random() * 1000000),
              tipoRequisito: VALOR.tipoRequisito || '',
              requisito: VALOR.requisito || '',
              numeroCertificadoInternacional: VALOR.numeroCertificadoInternacional || '',
              fraccionArancelaria: VALOR.fraccionArancelaria || '',
              descripcionFraccion: VALOR.descripcionFraccion || '',
              nico: VALOR.nico || '',
              descripcionNico: VALOR.descripcionNico || '',
              descripcion: VALOR.descripcion || '',
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
        })
      )
      .subscribe();
  }

  /**
   * Método que se ejecuta al enviar el formulario de solicitud de animales vivos.
   * Actualiza el estado con los datos del formulario.
   * @param valor Datos del formulario de solicitud de animales vivos.
   */
  agregarDatosFormulario(valor: ProductoDetallaEventos): void {
    const DATOS: FilaSolicitud = {
      id: valor.formulario.id || Math.floor(Math.random() * 1000000),
      noPartida: '',
      tipoRequisito: valor.formulario.tipoRequisito || '',
      requisito: valor.formulario.requisito || '',
      numeroCertificadoInternacional: valor.formulario.numeroCertificadoInternacional || '',
      fraccionArancelaria: valor.formulario.fraccionArancelaria || '',
      descripcionFraccion: valor.formulario.descripcionFraccion || '',
      nico: valor.formulario.nico || '',
      descripcionNico: valor.formulario.descripcionNico || '',
      descripcion: valor.formulario.descripcion || '',
      umt: valor.formulario.umt || '',
      cantidadUMT: valor.formulario.cantidadUMT || '',
      umc: valor.formulario.umc || '',
      cantidadUMC: valor.formulario.cantidadUMC || '',
      uso: valor.formulario.uso || '',
      tipoDeProducto: valor.formulario.tipoDeProducto || '',
      numeroDeLote: valor.formulario.numeroDeLote || '',
      paisDeOrigen: valor.formulario.paisDeOrigen || '',
      paisDeProcedencia: valor.formulario.paisDeProcedencia || '',
      certificadoInternacionalElectronico: valor.formulario.certificadoInternacionalElectronico || '',
      especie: valor.formulario.especie || '',
      tipoPresentacion: valor.formulario.tipoPresentacion || '',
      tipoPlanta: valor.formulario.tipoPlanta || '',
      plantaAutorizadaOrigen: valor.formulario.plantaAutorizadaOrigen || '',
      presentacion: valor.formulario.presentacion || ''
    }

    this.fitosanitarioStore.update(state => {
      const index = state.tablaDatos.findIndex(item => item.id === DATOS.id);
      console.log('Datos a agregar:', DATOS, state.tablaDatos, index);
      const updatedTablaDatos =
        index !== -1
          ? state.tablaDatos.map((item, i) => (i === index ? DATOS : item))
          : [...state.tablaDatos, DATOS];
      return {
        ...state,
        tablaDatos: updatedTablaDatos,
        selectedDatos: []
      };
    });

  }

}