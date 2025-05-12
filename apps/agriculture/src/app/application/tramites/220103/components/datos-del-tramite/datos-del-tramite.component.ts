/**
 * @componente
 * @nombre DatosDelTramiteComponente
 * @descripción
 * Componente que gestiona los datos del trámite 220103.
 * Proporciona funcionalidades para manejar formularios dinámicos, tablas de mercancías y la interacción con el estado del trámite.
 */

import { CommonModule } from '@angular/common';

import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';

import { AlertComponent, ModeloDeFormaDinamica, TablaSeleccion } from '@ng-mf/data-access-user';
import { CAMPOS_FORMULARIO_DATOS_DEL_TRAMITE, CAMPOS_FORMULARIO_MERCANCIAS, CONFIGURACION_MERCANCIAS, IMPORTANTE } from '../../constantes/sanidad-acuicola-importacion.enum';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { Mercancia } from '../../modelos/sanidad-acuicola-importacion.model';
import { SanidadAcuicolaImportacionService } from '../../services/sanidad-acuicola-importacion.service';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite220103Query } from '../../estados/queries/tramites220103.query';

import { Tramite220103State, Tramite220103Store } from '../../estados/tramites/tramites220103.store';
import { Modal } from 'bootstrap';
import { guid } from '@datorama/akita';

/**
 * Componente que gestiona los datos del trámite 220103.
 */
@Component({
  selector: 'app-datos-del-tramite',
  standalone: true,
  imports: [CommonModule, AlertComponent, TituloComponent, FormasDinamicasComponent, TablaDinamicaComponent],
  templateUrl: './datos-del-tramite.component.html',
  styleUrl: './datos-del-tramite.component.scss',
})
export class DatosDelTramiteComponent implements OnInit, OnDestroy {

  /**
   * Indica si se está modificando una mercancía.
   */
  esModificarMercancia: boolean = false;

  /**
   * Referencia al modal de mercancías.
   */
  @ViewChild('modalMercancia') elementoModal!: ElementRef;

  /**
   * Instancia del modal de Bootstrap.
   */
  private instanciaModal!: Modal;

  /**
   * Notificador para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private notificadorDestruccion$ = new Subject<void>();

  /**
   * Lista de mercancías seleccionadas en la tabla.
   */
  mercanciasSeleccionadas: Mercancia[] = [];

  /**
   * Mensaje importante que se muestra en el componente.
   */
  mensajeImportante: string = IMPORTANTE.Importante;

  /**
   * Formulario dinámico para los datos del trámite.
   */
  formularioDatosTramite!: FormGroup;

  /**
   * Formulario dinámico para los datos de mercancías.
   */
  formularioDatosMercancia!: FormGroup;

  /**
   * Configuración de los campos del formulario de datos del trámite.
   */
  configuracionFormularioDatos: ModeloDeFormaDinamica[] = CAMPOS_FORMULARIO_DATOS_DEL_TRAMITE;

  /**
   * Configuración de los campos del formulario de mercancías.
   */
  configuracionFormularioMercancia: ModeloDeFormaDinamica[] = CAMPOS_FORMULARIO_MERCANCIAS;

  /**
   * Estado seleccionado del trámite.
   */
  estadoSeleccionado!: Tramite220103State;

  /**
   * Estado seleccionado de la mercancía.
   */
  estadoSeleccionadoMercancia!: Tramite220103State;

  /**
   * Configuración de la tabla de mercancías.
   */
  configuracionTabla = CONFIGURACION_MERCANCIAS;

  /**
   * Datos de la tabla de mercancías.
   */
  datosTabla: Mercancia[] = [];

  /**
   * Tipo de selección de la tabla (checkbox).
   */
  seleccionTabla: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Constructor del componente.
   * 
   * @param formBuilder - FormBuilder para inicializar los formularios.
   * @param tramite220103Store - Almacén para gestionar el estado del trámite.
   * @param tramite220103Query - Consulta para obtener el estado del trámite.
   * @param servicio - Servicio para interactuar con la API de mercancías.
   */
  constructor(
    formBuilder: FormBuilder,
    private tramite220103Store: Tramite220103Store,
    private tramite220103Query: Tramite220103Query,
    private servicio: SanidadAcuicolaImportacionService
  ) {
    this.formularioDatosTramite = formBuilder.group({});
    this.formularioDatosMercancia = formBuilder.group({});
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe al estado del trámite y actualiza los datos de la tabla.
   */
  ngOnInit(): void {
    this.obtenerEstado();
    this.obtenerAduanaDeIngreso();
    this.obtenerMedioDeTransporte();
    this.obtenerOrigen();
    this.obtenerUmc();
    this.obtenerUso();
    this.obtenerPais();
  }

  /**
   * Obtiene el estado actual del trámite y actualiza los datos de la tabla.
   */
  obtenerEstado(): void {
    this.tramite220103Query.selectTramite220103State$
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((estado) => {
        this.estadoSeleccionado = estado;
        this.estadoSeleccionadoMercancia = estado['mercancia'] ?? {} as Tramite220103State;
        this.datosTabla = estado.tablaMercancia || [];
      });
  }

  /**
   * Obtiene la descripción de la fracción arancelaria y actualiza el formulario y el estado.
   */
 obtenerDescripcionFraccion(): void {
    if (this.formularioDatosMercancia.get('fraccionArancelaria')?.value === '30019099') {
      this.formularioDatosMercancia.patchValue({
        descripcionFraccion: 'Los demás',
        umt: 'kilogramo',
      });
      this.tramite220103Store.setTramite220103State('descripcionFraccion', 'Los demás');
      this.tramite220103Store.setTramite220103State('umt', 'kilogramo');
    }
  }

  /**
   * Establece un cambio de valor en el estado del trámite.
   * 
   * @param evento - Evento que contiene el campo y el valor a actualizar.
   * @param prop - Propiedad específica del estado a actualizar (opcional).
   */
  establecerCambioDeValor(evento: { campo: string; valor: unknown }, prop?: string): void {
    this.tramite220103Store.setTramite220103State(evento.campo, evento.valor, prop);
    if (evento.campo === 'fraccionArancelaria') {
      this.obtenerDescripcionFraccion();
    }
    if (evento.campo === 'uso') {
      const OTRO_USO_ITEM = this.configuracionFormularioMercancia.find((item) => item.campo === 'otroUso');
      if (OTRO_USO_ITEM) {
        OTRO_USO_ITEM.mostrar = this.formularioDatosMercancia.get('uso')?.value !== '';
      }
    }
  }

  /**
   * Obtiene las opciones de aduanas de ingreso desde el servicio.
   */
  obtenerAduanaDeIngreso(): void {
    this.servicio.getAdunaDeIngreso()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((opciones) => {
        if (opciones) {
          const ADUANA = this.configuracionFormularioDatos.find((aduana) => aduana.campo === 'aduanaDeIngreso');
          if (ADUANA) {
            ADUANA.opciones = opciones;
          }
        }
      });
  }

  /**
   * Obtiene las opciones de medios de transporte desde el servicio.
   */
  obtenerMedioDeTransporte(): void {
    this.servicio.getMedioDeTransporte()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((opciones) => {
        if (opciones) {
          const MEDIO_TRANSPORTE = this.configuracionFormularioDatos.find((medioTransporte) => medioTransporte.campo === 'medioDeTransporte');
          if (MEDIO_TRANSPORTE) {
            MEDIO_TRANSPORTE.opciones = opciones;
          }
        }
      });
  }

  /**
   * Obtiene las opciones de origen desde el servicio.
   */
  obtenerOrigen(): void {
    this.servicio.getOrigen()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((opciones) => {
        if (opciones) {
          const ORIGEN = this.configuracionFormularioMercancia.find((origen) => origen.campo === 'origen');
          if (ORIGEN) {
            ORIGEN.opciones = opciones;
          }
        }
      });
  }

  /**
   * Obtiene las opciones de UMC desde el servicio.
   */
  obtenerUmc(): void {
    this.servicio.getUmc()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((opciones) => {
        if (opciones) {
          const UMC = this.configuracionFormularioMercancia.find((umc) => umc.campo === 'umc');
          if (UMC) {
            UMC.opciones = opciones;
          }
        }
      });
  }

  /**
   * Obtiene las opciones de uso desde el servicio.
   */
  obtenerUso(): void {
    this.servicio.getUso()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((opciones) => {
        if (opciones) {
          const USO = this.configuracionFormularioMercancia.find((uso) => uso.campo === 'uso');
          if (USO) {
            USO.opciones = opciones;
          }
        }
      });
  }

  /**
   * Obtiene las opciones de países desde el servicio.
   */
  obtenerPais(): void {
    this.servicio.getPais()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((opciones) => {
        if (opciones) {
          const PAIS_ORIGEN = this.configuracionFormularioMercancia.find((pais) => pais.campo === 'paisOrigen');
          const PAIS_PROCEDENCIA = this.configuracionFormularioMercancia.find((pais) => pais.campo === 'paisProcedencia');
          if (PAIS_ORIGEN) {
            PAIS_ORIGEN.opciones = opciones;
          }
          if (PAIS_PROCEDENCIA) {
            PAIS_PROCEDENCIA.opciones = opciones;
          }
        }
      });
  }

  /**
   * Obtiene las mercancías seleccionadas en la tabla.
   * 
   * @param evento - Lista de mercancías seleccionadas.
   */
  obtenerMercanciasSeleccionadas(evento: Mercancia[]): void {
    this.mercanciasSeleccionadas = evento;
  }

  /**
   * Agrega una mercancía al estado del trámite.
   */
  agregarMercancia(): void {
    if (this.formularioDatosMercancia.valid) {
      const MERCANCIA: Mercancia = this.formularioDatosMercancia.value;
      if (this.esModificarMercancia) {
        MERCANCIA.id = this.mercanciasSeleccionadas[0].id;
        this.esModificarMercancia = false;
      } else {
        MERCANCIA.id = guid();
        this.postMercancia(MERCANCIA.id);
      }
      this.cerrarModal();
      this.formularioDatosMercancia.reset();
    } else if (this.formularioDatosMercancia.invalid) {
      this.formularioDatosMercancia.markAllAsTouched();
    }
  }

  /**
   * Cierra el modal de mercancías.
   */
  cerrarModal(): void {
    const INSTANCIA = Modal.getInstance(this.elementoModal.nativeElement);
    if (INSTANCIA) {
      this.instanciaModal = INSTANCIA;
    }
    this.instanciaModal.hide();
  }

  /**
   * Obtiene las mercancías desde el servicio y actualiza el estado.
   * 
   * @param id - Identificador de la mercancía.
   */
  postMercancia(id: string): void {
    this.servicio.getMercancias()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((respuesta: Mercancia[]) => {
        if (respuesta) {
          respuesta[0].id = id;
          this.tramite220103Store.setTramite220103State('tablaMercancia', respuesta);
        }
      });
  }

  /**
   * Elimina una mercancía seleccionada del estado del trámite.
   */
  eliminarMercancia(): void {
    if (this.mercanciasSeleccionadas[0]?.id) {
      this.tramite220103Store.eliminarMercancia(this.mercanciasSeleccionadas[0].id);
    }
    this.mercanciasSeleccionadas = [];
  }

  /**
   * Modifica una mercancía seleccionada en el formulario.
   */
  modificarMercancia(): void {
    if (this.mercanciasSeleccionadas.length > 0) {
      this.esModificarMercancia = true;
      this.formularioDatosMercancia.patchValue(this.mercanciasSeleccionadas[0]);
    }
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}