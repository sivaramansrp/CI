/**
 * @fileoverview
 * El `PasoUnoComponent` es un componente de Angular diseñado para gestionar la funcionalidad del primer paso del trámite.
 * Proporciona la lógica para cambiar entre pestañas y notificar al servicio sobre el estado actual.
 * 
 * @module PasoUnoComponent
 * @description
 * Este componente permite la navegación entre pestañas y utiliza el servicio `AmpliacionServiciosService` para gestionar 
 * la visibilidad de ciertos elementos en función de la pestaña seleccionada.
 */
import { Component, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { Ampliacion3RsComponent } from '../../components/ampliacion-3Rs/ampliacion-3rs.component';
import { AmpliacionAnexoComponent } from '../../components/ampliacion-anexo/ampliacion-anexo.component';
import { AmpliacionServiciosService } from '../../services/ampliacion-servicios.service';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit, OnDestroy {
    /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   */
  @ViewChild('solicitanteRef') solicitante!: SolicitanteComponent;
    /**
   * Referencia al componente ImportadorExportadorComponent para acceder a sus métodos de validación.
   * Permite validar el formulario de datos de importador/exportador antes de continuar al siguiente paso.
   */
  @ViewChild('ampliacionServiciosRef')
  ampliacionAnexoComponent!: AmpliacionAnexoComponent;

  @ViewChild('ampliacion3RsRef')
  ampliacion3RsComponent!: Ampliacion3RsComponent;
  /**
   * Índice de la pestaña seleccionada.
   * @property {number} indice
   */
  indice: number = 1;

  /**
   * Indica si los datos de respuesta están disponibles.
   * Valor inicial: false.
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Estado de la consulta actual.
   * Este estado se obtiene a través de ConsultaioQuery.
   */
  public consultaState!: ConsultaioState;

  /**
   * Subject para notificar la destrucción del componente.
   * Se utiliza para limpiar suscripciones y evitar fugas de memoria.
   */
  public destroyNotifier$: Subject<void> = new Subject();

 /**
 * Indica si el formulario está en modo solo lectura.
 * Cuando es `true`, los campos del formulario no se pueden editar.
 */
 esFormularioSoloLectura: boolean = false;

 /* Agrega esta propiedad para definir tus pestañas (todas las pestañas siempre visibles) */
 seccionesDeLaSolicitud = [
  { index: 1, title: 'Solicitante' },
  { index: 2, title: 'Anexo I' },
  { index: 3, title: "3 R's" }
];


  /**
   * Constructor del componente.
   * @constructor
   * @param {AmpliacionServiciosService} ampliacionServiciosService - Servicio para gestionar la visibilidad de elementos.
   * @param {ConsultaioQuery} consultaQuery - Query para obtener el estado de la consulta actual.
   */
  constructor(private ampliacionServiciosService: AmpliacionServiciosService,
              private consultaQuery: ConsultaioQuery
  ) {
    // No se necesita lógica de inicialización adicional.
  }

  /**
   * Cambia la pestaña seleccionada y notifica al servicio si la pestaña es la 1 o la 2.
   * @method seleccionaTab
   * @param {number} i - Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe al estado de consulta y actualiza el estado del componente según sea necesario.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.subscribe((seccionState) => {
      this.consultaState = seccionState;
      if (this.consultaState.update || this.consultaState.readonly) {
        this.guardarDatosFormulario();
      } else {
        this.esDatosRespuesta = true;
      }
    });
  }
  /**
   * Guarda los datos del formulario utilizando el servicio de ampliación de servicios.
   */
  guardarDatosFormulario(): void {
    this.ampliacionServiciosService
    .getServiciosData().pipe(
      takeUntil(this.destroyNotifier$)
    )
    .subscribe((resp) => {
      if(resp) {
       this.esDatosRespuesta = true;
       this.ampliacionServiciosService.actualizarEstadoFormulario(resp);

      }
    });
}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
ngOnDestroy(): void {
  this.destroyNotifier$.next();
  this.destroyNotifier$.complete();
}
  /**
   * Valida todos los formularios del paso uno.
   * Retorna true si todos los formularios son válidos, false en caso contrario.
   */
  validarFormularios(): boolean {
  console.log('=== Starting paso-uno validarFormularios ===');
  let isValid = true;

  // Validate solicitante form
  console.log('Checking solicitante component...');
  console.log('solicitante exists:', !!this.solicitante);
  console.log('solicitante.form exists:', !!(this.solicitante?.form));
  
  // if (this.solicitante?.form) {
  //   const solicitanteValid = this.solicitante.form.valid;
  //   console.log('solicitante form valid:', solicitanteValid);
  //   console.log('solicitante form errors:', this.solicitante.form.errors);
    
  //   if (this.solicitante.form.invalid) {
  //     this.solicitante.form.markAllAsTouched();
  //     isValid = false;
  //     console.log('Solicitante form is invalid');
  //   }
  // } else {
  //   console.log('Solicitante form not found');
  // }

  // Validate ampliacion anexo component (tab 2)
  
  //  if (this.ampliacionAnexoComponent) {
  //   const AMPLIACION_ANEXO_VALID = this.ampliacionAnexoComponent.validarFormulario();
    
  //   if (!AMPLIACION_ANEXO_VALID) {
  //     isValid = false;
  //   }
  // } else {
  //   if (this.esDatosRespuesta) {
  //     isValid = false;
  //   }
  // }

  //Validate ampliacion 3Rs component (tab 3) - This is the key validation
  
  if (this.ampliacion3RsComponent) {
    const AMPLIACION_3RS_VALID = this.ampliacion3RsComponent.validarFormulario();
    
    if (!AMPLIACION_3RS_VALID) {
      isValid = false;
    }
  } else {
    if (this.esDatosRespuesta) {
      isValid = false;
    }
  }

  console.log('Final validation result:', isValid);
  console.log('=== End paso-uno validarFormularios ===');
  return isValid;
} 
}