import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { TramiteState, TramiteStore } from '../../../core/estados/tramite.store';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TramiteQuery } from '../../../core/queries/tramite.query';

@Component({
  selector: 'app-consulta-tramite',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consulta-tramite.component.html',
  styleUrl: './consulta-tramite.component.scss',
})

export class ConsultaTramiteComponent implements OnInit {
  /** 
   * Formulario de búsqueda 
   */
  public FormBuscaTramite!: FormGroup;

  /**
    * Estado de la solicitud.
    */
  public solicitudTramiteState!: TramiteState;

  /**
    * Notificador para destruir las suscripciones.
    */
  private destroyNotifier$: Subject<void> = new Subject();
  constructor(private router: Router,
    private fb: FormBuilder,
    private tramiteStates: TramiteStore,
    private solicitudtramiteQuery: TramiteQuery,
  ) {
    /**
     * Constructor de la clase ConsultaTramiteComponent.
     * @param router - Router para la navegación.
     * @param fb - FormBuilder para crear formularios reactivos.
     * @param tramiteStates - Store para manejar el estado del trámite.
     * @param solicitudtramiteQuery - Query para obtener el estado de la solicitud del trámite.
     */
  }

  /** 
   * Método para inicializar el formulario 
   */
  ngOnInit(): void {
    this.solicitudtramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudTramiteState = seccionState;
        })
      )
      .subscribe();
    /** 
     * Inicializa el formulario de búsqueda al iniciar el componente
     */ 
    this.inicializaFormConsulta();
  }

  /** 
   * Método para inicializar el formulario de búsqueda 
   */
  inicializaFormConsulta(): void {
    this.FormBuscaTramite = this.fb.group({
      idTramite: [''],
    });
  }

  /**
   *  Método para buscar el trámite 
   */
  buscarTramite(): void {
    this.router.navigate(['datos-generales-tramite']);
  }

  /**
   * Maneja la selección de un trámite actualizando el store con los valores del formulario proporcionado.
   *
   * @param {FormGroup} form - El FormGroup que contiene los datos del formulario relacionados con el trámite.
   * @param {string} campo - El nombre del campo asociado con la selección del trámite.
   * @param {string} metodoNombre - El nombre del método que se utilizará para procesar la selección del trámite.
   * @returns {void}
   */
  tramiteSeleccionado(form: FormGroup, campo: string, metodoNombre: string): void {
    this.setValoresStore(form, campo, metodoNombre);
  }

  /**
     * Establece los valores en el store.
     *
     * @param {FormGroup} form - El formulario del cual se obtiene el valor.
     * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
     * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
     * @returns {void}
     */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: string): void {
    const VALOR = form.get(campo)?.value;
    /**
     *  Suponiendo que TramiteStore tiene un método 'update' o similar para actualizar el estado
     *  Reemplaza 'update' por el método correcto si es diferente
     */ 
    this.tramiteStates.update({ [metodoNombre]: VALOR });
  }

}
