import { AnimalesEventos, AnimalesFormularioSolicitud, DatosDeLaSolicitud } from '../../../../shared/models/datos-de-la-solicitue.model';
import { Component, OnDestroy } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';

import { CommonModule } from '@angular/common';
import { FilaSolicitud } from '../../models/220202/fitosanitario.model';
import { FitosanitarioQuery } from '../../queries/fitosanitario.query';
import { FitosanitarioStore } from '../../estados/fitosanitario.store';
import { MercanciaFormComponent } from '../../shared/mercancia-form/mercancia-form.component';



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
  public catalogosDatos: DatosDeLaSolicitud ={
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
  }


  /**
   * @description Subject utilizado para destruir las suscripciones y evitar fugas de memoria cuando el componente se destruye.
   * @type {Subject<void>}
   */
  public destroyNotifier$ = new Subject<void>();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es true, los campos del formulario no serán editables por el usuario.
   */
  public formularioSolicitud!: AnimalesFormularioSolicitud;

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
    public fitosanitarioStore: FitosanitarioStore
  ) {
    this.agriculturaApiService.obtenerRespuestaPorUrl('animales-vivo.json').subscribe((resp) => {
      this.catalogosDatos = resp;
    });
    this.fitosanitarioQuery.seleccionarState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((estado) => {
          this.cuerpoTabla = estado.tablaDatos;
          const VALOR = estado.selectedDatos[0];
          if (VALOR) {
            this.formularioSolicitud = {
              tipoRequisito: VALOR.tipoRequisito || '',
              requisito: VALOR.requisito || '',
              numeroCertificado: '',
              fraccionArancelaria: VALOR.fraccionArancelaria || '',
              descripcionFraccion: VALOR.descripcionFraccion || '',
              nico: VALOR.nico || '',
              descripcionNico: VALOR.descripcionNico || '',
              descripcion: VALOR.descripcion || '',
              cantidadUMT: String(VALOR.cantidadUMT || ''),
              umt: VALOR.umt || '',
              cantidadUMC: String(VALOR.cantidadUMC || ''),
              umc: VALOR.umc || '',
              especie: '',
              uso: VALOR.uso || '',
              paisOrigen: '',
              paisDeProcedencia: VALOR.paisDeProcedencia || ''
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
      id: Date.now(), // O usa un generador de ID adecuado según tu lógica
      noPartida: '',
      tipoRequisito: valor.formulario.tipoRequisito || '',
      requisito: valor.formulario.requisito || '',
      numeroCertificadoInternacional: '',
      fraccionArancelaria: valor.formulario.fraccionArancelaria || '',
      descripcionFraccion: valor.formulario.descripcionFraccion || '',
      nico: valor.formulario.nico || '',
      descripcionNico: valor.formulario.descripcionNico || '',
      descripcion: valor.formulario.descripcion || '',
      umt: '',
      cantidadUMT: valor.formulario.cantidadUMT || '',
      umc: valor.formulario.umc || '',
      cantidadUMC: valor.formulario.cantidadUMC || '',
      uso: valor.formulario.uso || '',
      tipoDeProducto: '',
      numeroDeLote: '',
      paisDeOrigen: '',
      paisDeProcedencia: valor.formulario.paisDeProcedencia || '',
      certificadoInternacionalElectronico: ''
    }
    this.fitosanitarioStore.update(state => ({
      ...state,
      tablaDatos: [...state.tablaDatos, DATOS],
      selectedDatos: []
    }));
  }



  /**
   * Método que se ejecuta automáticamente cuando el componente se destruye.
   * 
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar
   * a los suscriptores que el ciclo de vida del componente ha finalizado. Luego, completa
   * el observable para liberar recursos y evitar posibles fugas de memoria.
   * 
   * Es una práctica común en Angular para manejar la limpieza de suscripciones a observables
   * y otros recursos que deben ser liberados cuando el componente deja de existir.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
