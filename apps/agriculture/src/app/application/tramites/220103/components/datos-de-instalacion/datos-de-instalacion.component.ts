/**
 * @componente
 * @nombre DatosDeInstalacionComponente
 * @descripción
 * Componente que gestiona los datos de instalación para el trámite 220103.
 * Proporciona funcionalidades para manejar formularios dinámicos y la interacción con el estado del trámite.
 */

import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModeloDeFormaDinamica, TituloComponent } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

import { Subject, takeUntil } from 'rxjs';

import { CAMPOS_FORMULARIO_DATOS_DE_INSTALACION } from '../../constantes/sanidad-acuicola-importacion.enum';
import { Tramite220103Query } from '../../estados/queries/tramites220103.query';

import { Tramite220103State, Tramite220103Store} from '../../estados/tramites/tramites220103.store';
/**
 * Componente que gestiona los datos de instalación para el trámite 220103.
 */
@Component({
  selector: 'app-datos-de-instalacion',
  standalone: true,
  imports: [CommonModule, TituloComponent, FormasDinamicasComponent],
  templateUrl: './datos-de-instalacion.component.html',
  styleUrl: './datos-de-instalacion.component.scss',
})
export class DatosDeInstalacionComponent implements OnInit, OnDestroy {


  /**
   * Notificador para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private notificadorDestruccion$ = new Subject<void>();

  /**
   * Estado seleccionado del trámite.
   */
  estadoSeleccionado!: Tramite220103State;

  /**
   * Formulario dinámico para los datos de instalación.
   */
  formularioDatosDeInstalacion!: FormGroup;

  /**
   * Configuración de los campos del formulario de datos de instalación.
   */
  configuracionFormularioDatosDeInstalacion: ModeloDeFormaDinamica[] = CAMPOS_FORMULARIO_DATOS_DE_INSTALACION;

  /**
   * Constructor del componente.
   * 
   * @param formBuilder - FormBuilder para inicializar los formularios.
   * @param almacenTramite - Almacén para gestionar el estado del trámite.
   * @param consultaTramite - Consulta para obtener el estado del trámite.
   */
  constructor(
    private formBuilder: FormBuilder,
    private tramite220103Query: Tramite220103Query,
    private tramite220103Store: Tramite220103Store
  ) {
    this.formularioDatosDeInstalacion = this.formBuilder.group({});
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe al estado del trámite y actualiza los datos del estado seleccionado.
   */
  ngOnInit(): void {
    this.tramite220103Query.selectTramite220103State$
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((estado) => {
        this.estadoSeleccionado = estado;
      });
  }

  /**
   * Establece un cambio de valor en el estado del trámite.
   * 
   * @param evento - Evento que contiene el campo y el valor a actualizar.
   */
  establecerCambioDeValor(evento: { campo: string; valor: unknown }): void {
    this.tramite220103Store.setTramite220103State(evento.campo, evento.valor);
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