import { AL_DAR, AlertComponent, InputCheckComponent, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Solicitud260701State, Tramite260701Store } from '../../estados/tramites/tramite260701.store';
import { Subject,map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DomicilloDelComponent } from '../domicillo-del/domicillo-del.component';
import { ManifiestosComponent } from '../manifiestos/manifiestos.component';
import { RepresentanteLegalComponent } from '../representante-legal/representante-legal.component';
import { Tramite260701Query } from '../../estados/queries/tramite260701.query';

/**
 * Componente que representa la sección de datos de la solicitud en el formulario.
 * 
 * Este componente es responsable de mostrar y gestionar los datos relacionados con la solicitud.
 * Incluye un formulario reactivo con campos deshabilitados por defecto y funcionalidades para
 * alternar el estado colapsable de la sección y habilitar los controles del formulario.`
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlertComponent,
    TituloComponent,
    DomicilloDelComponent,
    ManifiestosComponent,
    RepresentanteLegalComponent,
    InputRadioComponent
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit,OnDestroy {
   
    /**
     * Grupo de formularios principal.
     * @type {FormGroup}
     */
    public forma!: FormGroup;
      /**
    * Opciones de radio.
    */
   public radioOpcions = [
    { label: 'Prórroga', value: 'Prórroga' },
    { label: 'Modificación', value: 'Modificación' },
    { label: 'Modificación y prórroga', value: 'Modificación y prórroga' }
  ];

    /**
     * Valor seleccionado del radio.
     */
      public valorSeleccionado!: string;
   
    /**
     * Indica si la sección es colapsable.
     * @type {boolean}
     * @default true
     */
    public colapsable: boolean = true;
   
    /**
     * Constantes importadas desde el archivo de enumeración que contienen textos importantes y advertencias.
     * @type {typeof AL_DAR}
     */
    public TEXTOS = AL_DAR;

    /**
     * Subject para notificar la destrucción del componente.
     */
    private destroyNotifier$: Subject<void> = new Subject();
    /**
     * Representa el estado de la Solicitud 260701.
     * Esta propiedad contiene los datos y la gestión del estado para la solicitud actual.
     * Se espera que se inicialice con una instancia de `Solicitud260701State`.
     */
    public solicitudState!: Solicitud260701State;
 
  /**
   * Constructor del componente DatosDeLaSolicitudComponent.
   * 
   * @param fb - Instancia de FormBuilder utilizada para crear y gestionar formularios reactivos.
   * @param tramite260701Store - Servicio de store para gestionar el estado del Trámite 260701.
   * @param tramite260701Query - Servicio de consulta para obtener datos relacionados con el Trámite 260701.
   */
  constructor(
    public readonly fb: FormBuilder,
    private tramite260701Store: Tramite260701Store,
    private tramite260701Query: Tramite260701Query
  ) {
    // Dependencia inyectada para uso posterior
  }


  
    /**
     * Método del ciclo de vida de Angular que se llama al inicializar el componente.
     * Obtiene datos del estado de la solicitud y configura el formulario.
     * @returns {void}
     */
    ngOnInit(): void {
      this.tramite260701Query.selectSolicitud$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
          this.solicitudState = seccionState;
      })).subscribe();
   
      this.forma = this.fb.group({
        tipoOperacion: [{ value: this.solicitudState.tipoOperacion, disabled: true }],
        justificacion: [{ value: this.solicitudState.justificacion, disabled: true }],
        denominacionORazonSocial: [{ value: this.solicitudState.denominacionORazonSocial, disabled: true }],
        correoElectronico: [{ value: this.solicitudState.correoElectronico, disabled: true }]
      });
    }
   
    /**
     * Alterna el estado colapsable de la sección del formulario.
     * @returns {void}
     */
    public mostrar_colapsable(): void {
      this.colapsable = !this.colapsable;
    }
   
    /**
     * Habilita todos los controles del formulario si están deshabilitados.
     * @returns {void}
     */
    public toggleFormControls(): void {
      Object.keys(this.forma.controls).forEach((controlName) => {
        const CONTROL = this.forma.get(controlName);
        if (CONTROL?.disabled) {
          CONTROL.enable();
        }
      });

    }

  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite260701Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260701Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Cambia el valor seleccionado del radio.
   * @param value Valor seleccionado.
   */
    public cambiarRadio(value: string | number) {
      this.valorSeleccionado = value as string;
    }
  
  /**
   * Método para actualizar el banco seleccionado.
   * @param e {Catalogo} Banco seleccionado.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
