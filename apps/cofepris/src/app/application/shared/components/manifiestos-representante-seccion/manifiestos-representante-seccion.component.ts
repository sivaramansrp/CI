/**
 * @fileoverview Componente `ManifiestosRepresentanteSeccionComponent`
 * Este componente gestiona el formulario relacionado con los manifiestos del representante,
 * incluyendo datos como RFC, nombre, apellidos, y opciones de información confidencial.
 * También permite la interacción con el estado global y la búsqueda de datos del representante.
 */

import { CommonModule } from '@angular/common';

import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { EstablecimientoService } from '../../services/establecimiento.service';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';

import {
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';


import { MANIFIESTOS_DECLARACION } from '../../constantes/aviso-de-funcionamiento.enum';

import { DatosDelSolicituteSeccionQuery } from '../../estados/queries/datos-del-solicitute-seccion.query';
import { DatosDelSolicituteSeccionStateStore,DatosDelSolicituteSeccionState } from '../../estados/stores/datos-del-solicitute-seccion.store';

import { Manifiestistos, PropietarioTipoPersona } from '../../models/datos-de-la-solicitud.model';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
@Component({
  selector: 'app-manifiestos-representante-seccion',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    InputRadioComponent,
    FormsModule,
  ],
  templateUrl: './manifiestos-representante-seccion.component.html',
  styleUrl: './manifiestos-representante-seccion.component.scss',
})
export class ManifiestosRepresentanteSeccionComponent
  implements OnInit, OnDestroy
{
@Input() showRepresentanteLegal: boolean = true;
  /**
   * Subject utilizado para destruir las suscripciones y evitar fugas de memoria.
   */
  private destroy$ = new Subject<void>();

  /**
   * Opciones para el radio de información confidencial.
   */
  informacionConfidencialRadioOption: PropietarioTipoPersona[]=[];

  /**
   * Texto de los manifiestos.
   */
  manifiestosText: string = '';

  /**
   * Formulario para gestionar los datos del representante.
   */
  manifiestosRepresentanteForm!: FormGroup;

  /**
   * Indica si el formulario debe estar deshabilitado.
   */
 formularioDeshabilitado: boolean = false;

  
 /**
  * Estado de la solicitud de la sección .
  */
      public solicitudState!: DatosDelSolicituteSeccionState;
  /**
   * Constructor del componente.
   * @param fb FormBuilder para inicializar formularios reactivos.
   * @param representanteStore Store para gestionar el estado del representante.
   * @param representanteQuery Query para obtener el estado inicial del representante.
   */
  constructor(
    private fb: FormBuilder,
    private representanteStore: DatosDelSolicituteSeccionStateStore,
    private representanteQuery: DatosDelSolicituteSeccionQuery,
    private establecimientoService :EstablecimientoService,
     private consultaioQuery: ConsultaioQuery,
  ) {
    // Inicializa el formulario y carga los datos iniciales.
           this.consultaioQuery.selectConsultaioState$
            .pipe(
              takeUntil(this.destroy$),
              map((seccionState)=>{
                this.formularioDeshabilitado = seccionState.readonly; 
                this.inicializarEstadoFormulario();
              })
            )
            .subscribe()
  }

  /**
   * Ciclo de vida `OnInit`.
   * Inicializa el formulario y carga los datos iniciales.
   */
  ngOnInit(): void {
    this.manifiestosText = MANIFIESTOS_DECLARACION.MANIFIESTOS;
    this.establecimientoService
      .getInformacionConfidencialRadioOptions()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: PropietarioTipoPersona[]) => {
        this.informacionConfidencialRadioOption = data; // Bind the fetched data
       
      });
  }
  /**
   * Maneja el evento de cambio en el campo de RFC del representante.
   * Llama a la función para buscar el representante por RFC.
   */
  hasError(controlName: string, errorName: string) {
    return this.manifiestosRepresentanteForm.get(controlName)?.touched &&
           this.manifiestosRepresentanteForm.get(controlName)?.hasError(errorName);
  }
   /**
   * Maneja los cambios en los controles del formulario y actualiza el estado global.
   * @param controlName Nombre del control que cambió.
   */
   onControlChange(controlName: string): void {
    const CONTROL_VALUE = this.manifiestosRepresentanteForm.get(controlName)?.value;

    switch (controlName) {
      case 'representanteRfc':
        this.representanteStore.setRepresentanteRfc(CONTROL_VALUE);
        break;
      case 'representanteNombre':
        this.representanteStore.setRepresentanteNombre(CONTROL_VALUE);
        break;
      case 'apellidoPaterno':
      case 'apellidoMaterno':
        this.representanteStore.setRepresentanteApellidos(
          this.manifiestosRepresentanteForm.get('apellidoPaterno')?.value,
          this.manifiestosRepresentanteForm.get('apellidoMaterno')?.value
        );
        break;
      case 'informacionConfidencialRadio':
        this.representanteStore.setInformacionConfidencial(CONTROL_VALUE);
        break;
      default:
        break;
    }
  }
  /**
   * Busca los datos del representante por RFC y los actualiza en el formulario.
   */
  buscarRepresentanteRfc(): void {
    const RFC = this.manifiestosRepresentanteForm.get('representanteRfc')?.value;
    if (RFC) {
      this.establecimientoService
        .getManifiestosByRfc(RFC)
        .pipe(takeUntil(this.destroy$))
        .subscribe((representante: Manifiestistos | null) => {
          if (representante) {
            this.manifiestosRepresentanteForm.patchValue({
              representanteNombre: representante.representanteNombre,
              apellidoPaterno: representante.apellidoPaterno,
              apellidoMaterno: representante.apellidoMaterno,
            });

     
            this.representanteStore.setRepresentanteNombre(representante.representanteNombre);
            this.representanteStore.setRepresentanteApellidos(
              representante.apellidoPaterno,
              representante.apellidoMaterno
            );
          }
        });
    }
  }

  /**
   * Inicializa el formulario reactivo para los datos del representante.
   * Define los controles y sus validaciones.
   * Además, carga el estado inicial del store en el formulario.
   */
  inicializarFormulario(): void {
    this.manifiestosRepresentanteForm = this.fb.group({
      representanteRfc: ['', Validators.required],
      manifests: [true, Validators.required],
      informacionConfidencialRadio: ['', Validators.required],
      representanteNombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: [''],
    });

    // Carga el estado inicial en el formulario desde el store
    this.representanteQuery
      .select()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.manifiestosRepresentanteForm.patchValue(state, {
          emitEvent: false,
        });
      });
  }

    /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.formularioDeshabilitado) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }  
  }

  
  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.formularioDeshabilitado) {
        this.manifiestosRepresentanteForm.disable();
      } else if (!this.formularioDeshabilitado) {
        this.manifiestosRepresentanteForm.enable();
      } else {
        // No se requiere ninguna acción en el formulario
      }
  }


  /**
   * Ciclo de vida `OnDestroy`.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
