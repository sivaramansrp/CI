import {
  AlertComponent,
  InputCheckComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';

import { CommonModule } from '@angular/common';
import { TipoDevAviso } from '../../models/aviso.model';

import { AvisoUnicoService } from '../../services/aviso-unico.service';
import { UnicoQuery } from '../../estados/queries/unico.query';

import { UnicoState, UnicoStore } from '../../estados/renovacion.store';

/**
 * Componente para manejar los tipos de aviso en el formulario de modificación.
 * Este componente contiene un formulario reactivo para capturar diversas opciones
 * relacionadas con la modalidad de certificación y otros aspectos del trámite.
 */
@Component({
  selector: 'app-tipo-de-aviso',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    AlertComponent,
    InputCheckComponent,
  ],
  templateUrl: './tipoDeAviso.component.html',
})
export class TipoDeAvisoComponent implements OnInit, OnDestroy {
  /** Formulario reactivo para gestionar los tipos de aviso */
  miFormulario!: FormGroup;

  /** Objeto que contiene los datos del tipo de aviso */
 

  /** EventEmitter para emitir los datos del formulario cuando se envíen */
  @Output() tabEnabledData = new EventEmitter<TipoDevAviso>();

  /** Variable para habilitar o deshabilitar el formulario */
  isDisabled: boolean = false;

  /**
     * Estado actual de la solicitud.
     */
    public solicitudState!: UnicoState;

  /** Modalidad de certificación */
  modalidadCertificacion!: TipoDevAviso;

  /** Sujeto para manejar el ciclo de vida de los observables */
  private destroy$: Subject<void> = new Subject<void>();
   /**
   * Constructor del componente.
   * @param fb Constructor de formularios reactivos.
   * @param service Servicio para obtener datos relacionados con el aviso único.
   * @param unicoStore Almacén para manejar el estado de la aplicación.
   * @param unicoQuery Consultas para obtener el estado actual de la aplicación.
   */

   constructor(private fb: FormBuilder,private service: AvisoUnicoService,private unicoStore: UnicoStore,
      private unicoQuery: UnicoQuery) {}
      
  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura el formulario, carga datos iniciales y suscribe al estado de la aplicación.
   */    

  ngOnInit(): void {
     this.unicoQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.solicitudState = seccionState;
          this.crearFormMiFormulario();
        })
      )
      .subscribe();
    this.inicializamiFormulario();
  }

   /**
     * Inicializa los datos del formulario con la información del servicio de aviso.
     * Establece la modalidad de certificación en el store.
     */
    inicializamiFormulario(): void {
      this.service.getAvisoModify()
        .pipe(
          takeUntil(this.destroy$),
          map((resp) => {
            this.unicoStore.setModalidadCertificacion(resp.descripcion);
          })
        )
        .subscribe();
    }

     /**
   * Crea el formulario reactivo para el tipo de aviso con valores predefinidos.
   */
  crearFormMiFormulario(): void {
    this.miFormulario = this.fb.group({
      modalidadCertificacion: [
        { value: this.solicitudState?.modalidadCertificacion, disabled: true },
      ],
      foreignClientsSuppliers: [this.solicitudState?.foreignClientsSuppliers],
      nationalSuppliers: [this.solicitudState?.nationalSuppliers],
      modificationsMembers: [this.solicitudState?.modificationsMembers],
      changesToLegalDocuments: [this.solicitudState?.changesToLegalDocuments],
      mergerOrSplitNotice: [this.solicitudState?.mergerOrSplitNotice],
      additionFractions: [this.solicitudState?.additionFractions],
      additionmodificación: [this.solicitudState?.additionmodificación],
      additionPresentación: [this.solicitudState?.additionPresentación],
      acepto253: [this.solicitudState?.acepto253, Validators.required],
    });
  }
/**
   * Emite los valores del formulario cuando el usuario lo envía.
   */
  aiEnviar(): void {
    this.tabEnabledData.emit(this.miFormulario.value);
  }

  /**
   * Establece valores en el almacén desde el formulario.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Nombre del método en el almacén.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof UnicoStore): void {
    const VALOR = form.get(campo)?.value;
    (this.unicoStore[metodoNombre] as (value: string) => void)(VALOR);
  }
  /**
   * Método que se ejecuta al destruir el componente.
   * Libera recursos y cancela suscripciones.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}