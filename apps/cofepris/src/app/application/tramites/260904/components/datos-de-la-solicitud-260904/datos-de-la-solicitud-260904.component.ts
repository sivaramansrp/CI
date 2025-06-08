import { Subject, map} from 'rxjs';
import {Tramite260904State, Tramite260904Store } from '../../estados/tramite260904.store';
import { ALERT } from '../../enums/datos-de-la-solicitud-260904.enum';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConsultaioQuery} from "@ng-mf/data-access-user";
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/datos-de-la-solicitud-260904.enum';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs';


import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite260904Query } from '../../estados/tramite260904.query';
import { Validators } from '@angular/forms';

/**
 * Componente para gestionar los datos de la solicitud 260904.
 * 
 * @selector app-datos-de-la-solicitud-260904
 * @standalone true
 * @imports [
 *   CommonModule,
 *   AlertComponent,
 *   InputRadioComponent,
 *   ReactiveFormsModule,
 *   TituloComponent
 * ]
 * @templateUrl ./datos-de-la-solicitud-260904.component.html
 * @styleUrl ./datos-de-la-solicitud-260904.component.scss
 */
@Component({
  selector: 'app-datos-de-la-solicitud-260904',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    InputRadioComponent,
    ReactiveFormsModule,
    TituloComponent,
  ],
  templateUrl: './datos-de-la-solicitud-260904.component.html',
  styleUrl: './datos-de-la-solicitud-260904.component.scss',
})
export class DatosDeLaSolicitud260904Component implements OnInit, OnDestroy {
  /**
     * Indica si el formulario es colapsable.
     */
   colapsable: boolean = true;
 
   /**
    * Textos de alerta.
    */
   TEXTOS = ALERT;
 
   
   /**
    * Estado seleccionado del trámite 260911.
    */
   estadoSeleccionado!: Tramite260904State;
 
   /**
    * Opciones de botón de radio.
    */
   btonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;
 
   /**
    * Formulario principal.
    */
   form!: FormGroup;
 
   /**
    * Formulario de datos del establecimiento.
    */
   datosDelEstablecimiento!: FormGroup;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;
 
   /** 
 * Observable utilizado para gestionar la destrucción de suscripciones y evitar fugas de memoria.
 * Se emite un valor y se completa cuando el componente se destruye.
 */
   private destroy$ = new Subject<void>();
 
   /**
    * Constructor del componente.
    * 
    * @param fb FormBuilder para crear formularios.
    * @param tramite260904Query Consulta de datos del trámite.
    * @param tramite260904Store Almacenamiento de datos del trámite.
    */
   constructor(
     private fb: FormBuilder,
     private tramite260904Query: Tramite260904Query,
     private tramite260904Store: Tramite260904Store,
     private consultaQuery: ConsultaioQuery,
       ) {
         this.consultaQuery.selectConsultaioState$
           .pipe(
             takeUntil(this.destroy$),
             map((seccionState) => {
               this.esFormularioSoloLectura = seccionState.readonly || true;
               this.inicializarEstadoFormulario();
             })
           )
           .subscribe();
       }
 
   /**
    * Método de inicialización del componente.
    */
   ngOnInit(): void {

    this.tramite260904Query.selectTramite260904$
    .pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (data) => {
        this.estadoSeleccionado = data;
      }
    );
    this.crearFormulario();
    this.getValorStore();
    this.inicializarEstadoFormulario();
  }

  /**
   * Inicializa el estado del formulario según el modo de solo lectura.
   * Si el formulario está en modo solo lectura, deshabilita los controles correspondientes.
   * Si no, habilita los controles para permitir la edición.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.form.get('btonDeRadio')?.disable();
      this.form.get('justificacion')?.disable();
      this.datosDelEstablecimiento.get('rfcDel')?.disable();
      this.datosDelEstablecimiento.get('denominacion')?.disable();
      this.datosDelEstablecimiento.get('correo')?.disable();
    } else {
      this.form.get('btonDeRadio')?.disable();
      this.form.get('justificacion')?.disable();
      this.datosDelEstablecimiento.get('rfcDel')?.disable();
      this.datosDelEstablecimiento.get('denominacion')?.disable();
      this.datosDelEstablecimiento.get('correo')?.disable();
  }
}
 
   /**
    * Método para mostrar u ocultar el formulario colapsable.
    */
   mostrar_colapsable(): void {
     this.colapsable = !this.colapsable;
   }
 
   /**
    * Método para crear el formulario.
    */
   crearFormulario(): void {
     this.form = this.fb.group({
       btonDeRadio: [this.estadoSeleccionado.btonDeRadio, [Validators.required]],
       justificacion: [this.estadoSeleccionado.justificacion, [Validators.required]],
     });
 
     this.datosDelEstablecimiento = this.fb.group({
       rfcDel: [this.estadoSeleccionado.rfcDel, Validators.required],
       denominacion: [this.estadoSeleccionado.denominacion, Validators.required],
       correo: [this.estadoSeleccionado.correo, Validators.required],
     });
   } 
 
   /**
    * Método para habilitar los controles del formulario.
    */
   toggleFormControls(): void {
     Object.keys(this.datosDelEstablecimiento.controls).forEach(
       (controlName) => {
         const CONTROL = this.datosDelEstablecimiento.get(controlName);
         if (CONTROL?.disabled) {
           CONTROL.enable();
         }
       }
     );
   }
 
 
    /**
    * Actualiza un valor específico en el store del trámite.
    * 
    * @param FormGroup - Formulario reactivo.
    * @param control - Nombre del control cuyo valor se actualizará en el store.
    */
    setValorStore(FormGroup: FormGroup, control: string): void {
     const VALOR = FormGroup.get(control)?.value;
     this.tramite260904Store.setTramite260904State({
       [control]: VALOR
     });
   }
 
   /**
    * Obtiene el estado actual del trámite desde el store.
    */
   getValorStore(): void {
     this.tramite260904Query.selectTramite260904$.pipe(
       takeUntil(this.destroy$)
     ).subscribe(
       (data) => {
         this.estadoSeleccionado = data;
       }
     );
   }
    /**
     * @inheritdoc
     * @description
     * Método del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
     * Se utiliza para emitir y completar el observable `destroy$`, permitiendo limpiar suscripciones y evitar fugas de memoria.
     */
    ngOnDestroy(): void {
     this.destroy$.next();
     this.destroy$.complete();
   }
 }