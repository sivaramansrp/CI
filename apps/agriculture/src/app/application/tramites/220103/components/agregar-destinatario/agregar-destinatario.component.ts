/**
 * @componente
 * @nombre AgregarDestinatarioComponente
 * @descripción
 * Componente que gestiona la funcionalidad para agregar destinatarios en el trámite 220103.
 * Proporciona un formulario dinámico y maneja la interacción con el estado del trámite.
 */

import { CommonModule } from '@angular/common';

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputRadioComponent, ModeloDeFormaDinamica, TituloComponent } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

import { Subject, takeUntil } from 'rxjs';

import { CAMPOS_FORMULARIO_DATOS_PERSONALES_AGREGAR_DESTINATARIO, TIPO_PERSONA } from '../../constantes/sanidad-acuicola-importacion.enum';

import { Tramite220103Query } from '../../estados/queries/tramites220103.query';

import { Tramite220103State, Tramite220103Store } from '../../estados/tramites/tramites220103.store';

import { SanidadAcuicolaImportacionService } from '../../services/sanidad-acuicola-importacion.service';


@Component({
  selector: 'app-agregar-destinatario',
  standalone: true,
  imports: [CommonModule, TituloComponent, InputRadioComponent, FormasDinamicasComponent, ReactiveFormsModule],
  templateUrl: './agregar-destinatario.component.html',
  styleUrl: './agregar-destinatario.component.scss',
})
export class AgregarDestinatarioComponent implements OnInit, OnDestroy {

  @Output() closeModal = new EventEmitter<void>();

  /**
   * Tipo de persona (Física o Moral).
   */
  tipoPersona = TIPO_PERSONA;

  /**
   * Notificador para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private notificadorDestruccion$ = new Subject<void>();

  /**
   * Configuración del formulario dinámico.
   */
  formularioConfiguracion: ModeloDeFormaDinamica[] = CAMPOS_FORMULARIO_DATOS_PERSONALES_AGREGAR_DESTINATARIO;

  /**
   * Formulario reactivo para agregar destinatarios.
   */
  formularioAgregarDestinatario!: FormGroup;

  /**
   * Estado seleccionado del trámite.
   */
  estadoSeleccionado!: Tramite220103State;

  /**
   * Constructor del componente.
   * 
   * @param formBuilder - FormBuilder para inicializar el formulario.
   * @param consultaTramite - Consulta para obtener el estado del trámite.
   * @param almacenTramite - Almacén para gestionar el estado del trámite.
   * @param servicio - Servicio para interactuar con la API de sanidad acuícola.
   */
  constructor(
    private formBuilder: FormBuilder,
    private tramite220103Query: Tramite220103Query,
    private tramite220103Store: Tramite220103Store,
    private servicio: SanidadAcuicolaImportacionService
  ) { }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Inicializa el formulario, obtiene el estado del trámite y configura las opciones dinámicas.
   */
  ngOnInit(): void {
    this.obtenerColonia();
    this.obtenerEstadoValor();
    this.inicializarFormulario();
    this.cambiarValoresTipoPersona();
  }

  /**
   * Inicializa el formulario reactivo con los campos requeridos.
   */
  inicializarFormulario(): void {
    this.formularioAgregarDestinatario = this.formBuilder.group({
      tipoPersona: [this.estadoSeleccionado?.['tipoPersona'] || '', Validators.required],
    });
  }

  /**
   * Obtiene el estado del trámite y lo asigna a la propiedad `estadoSeleccionado`.
   */
  obtenerEstadoValor(): void {
    this.tramite220103Query.selectTramite220103State$
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((estado) => {
        this.estadoSeleccionado = estado;
      });
  }

  /**
   * Obtiene las opciones de colonia desde el servicio y las asigna al formulario dinámico.
   */
  obtenerColonia(): void {
    this.servicio.getColonia()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((opciones) => {
        const CAMPO_COLONIA = this.formularioConfiguracion.find((campo) => campo.campo === 'colonia');
        if (CAMPO_COLONIA) {
          CAMPO_COLONIA.opciones = opciones;
        }
      });
  }

  /**
   * Cambia la visibilidad de los campos del formulario según el tipo de persona seleccionado.
   */
  cambiarValoresTipoPersona(): void {
    const TIPO_PERSONA_SELECCIONADA = this.estadoSeleccionado?.['tipoPersona'];
    if (TIPO_PERSONA_SELECCIONADA) {
      const CAMPO_NOMBRE = this.formularioConfiguracion.find((campo) => campo.campo === 'nombre');
      const CAMPO_PRIMER_APELLIDO = this.formularioConfiguracion.find((campo) => campo.campo === 'primerApellido');
      const CAMPO_SEGUNDO_APELLIDO = this.formularioConfiguracion.find((campo) => campo.campo === 'segundoApellido');
      const CAMPO_RAZON_SOCIAL = this.formularioConfiguracion.find((campo) => campo.campo === 'razonSocial');

      if (CAMPO_NOMBRE && CAMPO_PRIMER_APELLIDO && CAMPO_SEGUNDO_APELLIDO && CAMPO_RAZON_SOCIAL) {
        CAMPO_NOMBRE.mostrar = TIPO_PERSONA_SELECCIONADA === 'Física';
        CAMPO_PRIMER_APELLIDO.mostrar = TIPO_PERSONA_SELECCIONADA === 'Física';
        CAMPO_SEGUNDO_APELLIDO.mostrar = TIPO_PERSONA_SELECCIONADA === 'Física';
        CAMPO_RAZON_SOCIAL.mostrar = TIPO_PERSONA_SELECCIONADA === 'Moral';
      }
    }
  }

  /**
   * Establece un cambio de valor en el estado del trámite.
   * 
   * @param evento - Evento que contiene el campo y el valor a actualizar.
   */
  establecerCambioDeValor(evento: { campo: string; valor: unknown }): void {
    this.tramite220103Store.setTramite220103State(evento.campo, evento.valor);
    if (evento.campo === 'tipoPersona') {
      this.cambiarValoresTipoPersona();
    }
  }

  guardarDestinatario(): void {
    if (this.formularioAgregarDestinatario.valid) {
      this.getDestinatario();
      this.formularioAgregarDestinatario.reset();
      this.closeModal.emit();
    } else {
      this.formularioAgregarDestinatario.markAllAsTouched();
    }
  }
  getDestinatario(): void {
    this.servicio.getDestinatario()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((valor) => {
        this.tramite220103Store.setTramite220103State('tablaDestinatario', valor);
      });
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