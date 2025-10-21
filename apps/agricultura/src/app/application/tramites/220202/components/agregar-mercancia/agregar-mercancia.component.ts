/* eslint-disable complexity */
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';
import { AnimalesEventos } from '../../../../shared/models/datos-de-la-solicitue.model';

import { DatosMercancia, FilaSolicitud } from '../../models/220202/fitosanitario.model';
import { CommonModule } from '@angular/common';
import { FitosanitarioQuery } from '../../queries/fitosanitario.query';
import { FitosanitarioStore } from '../../estados/fitosanitario.store';
import { MercanciaFormComponent } from '../../shared/mercancia-form/mercancia-form.component';
import { CatalogosService } from '../../services/220202/catalogos/catalogos.service';
import { RegistroSolicitudService } from '../../services/220202/registro-solicitud/registro-solicitud.service';

/**
 * @description Decorador que define un componente de Angular llamado `AnimalesVivoContenedoraComponent`.
 * Este componente es independiente (standalone) y utiliza el módulo común de Angular (`CommonModule`) 
 * y el componente `AnimalesVivoDetallesComponent` como dependencias importadas.
 * 
 * @selector `app-animales-vivo-contenedora` - Selector utilizado para instanciar este componente en una plantilla HTML.
 * 
 * @templateUrl `./animales-vivo-contenedora.component.html` - Ruta del archivo HTML que define la estructura visual del componente.
 * 
 * @styleUrl `./animales-vivo-contenedora.component.scss` - Ruta del archivo SCSS que contiene los estilos específicos del componente.
 */
@Component({
  selector: 'app-agregar-mercancia',
  standalone: true,
  imports: [CommonModule, MercanciaFormComponent],
  templateUrl: './agregar-mercancia.component.html',
})
export class AgregarMercanciaComponent implements OnDestroy{
  /**
   * Datos de la solicitud que se recibirán como entrada en el componente.
   * @type {DatosDeLaSolicitud}
   */
  public catalogosDatos: DatosMercancia ={
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
    tipoDeProductoList: []
  }

  /**
   * @description Subject utilizado para destruir las suscripciones y evitar fugas de memoria cuando el componente se destruye.
   * @type {Subject<void>}
   */
  public destroyNotifier$ = new Subject<void>();

  @Output() cerrar = new EventEmitter<void>();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es true, los campos del formulario no serán editables por el usuario.
   */
  public formularioSolicitud!: FilaSolicitud;

  /**
   * @description Datos de la tabla principal.
   * @type {FilaSolicitud[]}
   */
  cuerpoTabla: FilaSolicitud[] = [];

  /**
   * Constructor de la clase `AnimalesVivoContenedoraComponent`.
   * 
   * Este constructor inicializa los servicios necesarios y configura las suscripciones
   * para manejar los datos relacionados con los animales vivos en el contexto de la aplicación.
   * 
   * @param agriculturaApiService Servicio para interactuar con la API de Agricultura.
   *                              Se utiliza para obtener datos desde un archivo JSON remoto.
   * @param fitosanitarioQuery Servicio de consulta para acceder al estado de los datos fitosanitarios.
   *                           Proporciona un flujo reactivo para observar cambios en el estado.
   * @param fitosanitarioStore Servicio para manejar el almacenamiento del estado fitosanitario.
   *                           Permite la gestión centralizada del estado de la aplicación.
   * 
   * @description
   * - Obtiene datos desde un archivo JSON remoto utilizando el servicio `AgriculturaApiService`.
   * - Configura una suscripción al estado reactivo proporcionado por `FitosanitarioQuery`.
   * - Actualiza las propiedades locales `cuerpoTabla` y `formularioSolicitud` basándose en los datos
   *   seleccionados del estado reactivo.
   * - Maneja la destrucción de las suscripciones utilizando `takeUntil` con un observable de notificación.
   */
  constructor(public agriculturaApiService: AgriculturaApiService,
    public fitosanitarioQuery: FitosanitarioQuery,
    public fitosanitarioStore: FitosanitarioStore,
    public catalogosService: CatalogosService

  ) {
    this.agriculturaApiService.obtenerRespuestaPorUrl('animales-vivo.json').subscribe((resp) => {
      this.catalogosDatos = resp;
      this.catalogosDatos.nicoList = [];
    });
    //ponemos la lista nico vacia por que s¿depende de lo que seleccione fracciona arancelaria
    // vamos por el catalogo de Fraccion arancelaria
    this.getFraccionArancelariaLista();

    this.fitosanitarioQuery.seleccionarState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((estado) => {
          this.cuerpoTabla = estado.tablaDatos;
          const VALOR = estado.selectedDatos[0];
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
              uso: VALOR.uso || '',
              paisDeOrigen: VALOR.paisDeOrigen || '',
              paisDeProcedencia: VALOR.paisDeProcedencia || '',
              noPartida: VALOR.noPartida || '',
              tipoDeProducto: VALOR.tipoDeProducto || '',
              numeroDeLote: VALOR.numeroDeLote || '',
              certificadoInternacionalElectronico: VALOR.certificadoInternacionalElectronico || ''
            };
          }
        })
      )
      .subscribe();
  }

  /**
   * @description Método que se ejecuta al enviar el formulario de solicitud de animales vivos.
   * @param valor Datos del formulario de solicitud de animales vivos.
   */
  agregarDatosFormulario(valor: AnimalesEventos): void {
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
      certificadoInternacionalElectronico: valor.formulario.certificadoInternacionalElectronico || ''
    }
    this.fitosanitarioStore.update(state => {
      const INDEX = state.tablaDatos.findIndex(item => item.id === DATOS.id);

      const UPDATE_TABLA_DATOS =
        INDEX !== -1
          ? state.tablaDatos.map((item, i) => (i === INDEX ? DATOS : item))
          : [...state.tablaDatos, DATOS];
      return {
        ...state,
        tablaDatos: UPDATE_TABLA_DATOS,
        selectedDatos: [] 
      };
    });

  }

  /**
   * @description Obtiene la lista de fraccion arancelaria desde un archivo JSON.
   * @method getFraccionArancelariaLista
   * @returns {void}
   */
  getFraccionArancelariaLista(): void {
    this.catalogosService.obtieneCatalogoFraccionesArancelarias(220202)
      .pipe(
        takeUntil(this.destroyNotifier$)
      ).subscribe(
        (data): void => {
          this.catalogosDatos.fraccionArancelariaList = data.datos ?? [];
        }
      );

  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Se utiliza para limpiar recursos y suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
