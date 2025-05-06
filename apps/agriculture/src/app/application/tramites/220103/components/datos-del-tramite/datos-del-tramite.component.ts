/**
 * @componente
 * @nombre DatosDelTramiteComponent
 * @descripción
 * Componente que gestiona los datos del trámite 220103.
 * Proporciona funcionalidades para manejar formularios dinámicos, tablas de mercancías, y la interacción con el estado del trámite.
 */

import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-datos-del-tramite',
  standalone: true,
  imports: [CommonModule, AlertComponent, TituloComponent, FormasDinamicasComponent, TablaDinamicaComponent],
  templateUrl: './datos-del-tramite.component.html',
  styleUrl: './datos-del-tramite.component.scss',
})
export class DatosDelTramiteComponent implements OnInit, OnDestroy {
  /**
   * Notificador para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * Lista de mercancías seleccionadas en la tabla.
   */
  mercanciasSeleccionadas: Mercancia[] = [];

  /**
   * Mensaje importante que se muestra en el componente.
   */
  importante: string = IMPORTANTE.Importante;

  /**
   * Formulario dinámico para los datos del trámite.
   */
  datosDelTramiteFormulario!: FormGroup;

  /**
   * Formulario dinámico para los datos de mercancías.
   */
  datosMercanciaFormulario!: FormGroup;

  /**
   * Configuración de los campos del formulario de datos del trámite.
   */
  formularioDatos: ModeloDeFormaDinamica[] = CAMPOS_FORMULARIO_DATOS_DEL_TRAMITE;

  /**
   * Configuración de los campos del formulario de mercancías.
   */
  mercanciaFormularioDatos: ModeloDeFormaDinamica[] = CAMPOS_FORMULARIO_MERCANCIAS;

  /**
   * Estado seleccionado del trámite.
   */
  estadoSeleccionado!: Tramite220103State;

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
   * @param fb - FormBuilder para inicializar los formularios.
   * @param tramite220103Query - Query para obtener el estado del trámite.
   * @param tramite220103Store - Store para gestionar el estado del trámite.
   * @param service - Servicio para interactuar con la API de mercancías.
   */
  constructor(
    fb: FormBuilder,
    private tramite220103Query: Tramite220103Query,
    private tramite220103Store: Tramite220103Store,
    private service: SanidadAcuicolaImportacionService
  ) {
    this.datosDelTramiteFormulario = fb.group({});
    this.datosMercanciaFormulario = fb.group({});
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe al estado del trámite y actualiza los datos de la tabla.
   */
  ngOnInit(): void {
    this.tramite220103Query.selectTramite220103State$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state) => {
        this.estadoSeleccionado = state;
        this.datosTabla = state['Tablamercancia'] as Mercancia[] || [];
      });
  }

  /**
   * Obtiene la descripción de la fracción arancelaria y actualiza el formulario y el estado.
   */
  getDescripcionFraccion(): void {
    this.datosMercanciaFormulario.patchValue({
      descripcionFraccion: 'Los demas',
      umt: 'kilogramo',
    });
    this.tramite220103Store.setTramite220103State('descripcionFraccion', 'Los demas');
    this.tramite220103Store.setTramite220103State('umt', 'kilogramo');
  }

  /**
   * Establece un cambio de valor en el estado del trámite.
   * 
   * @param $event - Evento que contiene el campo y el valor a actualizar.
   */
  establecerCambioDeValor($event: { campo: string; valor: unknown }): void {
    this.tramite220103Store.setTramite220103State($event.campo, $event.valor);
    if ($event.campo === 'fraccionArancelaria') {
      this.getDescripcionFraccion();
    }
    if ($event.campo === 'uso') {
      const OTRO_USO_ITEM = this.mercanciaFormularioDatos.find((item) => item.campo === 'otroUso');
      if (OTRO_USO_ITEM) {
        OTRO_USO_ITEM.mostrar = this.datosMercanciaFormulario.get('uso')?.value;
      }
    }
  }

  /**
   * Obtiene las mercancías seleccionadas en la tabla.
   * 
   * @param $event - Lista de mercancías seleccionadas.
   */
  getMercanciasSeleccionadas($event: Mercancia[]): void {
    this.mercanciasSeleccionadas = $event;
  }

  /**
   * Agrega una mercancía al estado del trámite.
   */
  agregarMercancia(): void {
    if (this.datosMercanciaFormulario.valid) {
      this.getMercancia();
      this.datosMercanciaFormulario.reset();
    }
  }

  /**
   * Obtiene las mercancías desde el servicio y actualiza el estado.
   */
  getMercancia(): void {
    this.service.getMercancias()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((response: Mercancia[]) => {
        if (response) {
          this.tramite220103Store.setTramite220103State('Tablamercancia', response);
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
  mercanciaModificar(): void {
    this.datosMercanciaFormulario.patchValue(this.mercanciasSeleccionadas[0]);
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}