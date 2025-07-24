import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosDeLaSolicitudComponent } from '../../components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosParaMovilizacionComponent } from '../../components/datos-para-movilizacion/datos-para-movilizacion.component';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';
import { PagoDeDerechosComponent } from '../../components/pago-de-derechos/pago-de-derechos.component';
import { ReactiveFormsModule } from '@angular/forms';
import{SolicitanteComponent} from '@libs/shared/data-access-user/src'
import { TercerospageComponent } from '../../components/tercerospage/tercerospage.component';




/**
 * @fileoverview
 * Componente para gestionar el primer paso del proceso de importación de acuicultura (trámite 220203).
 * Coordina múltiples formularios incluyendo solicitante, datos de solicitud, movilización, terceros y pagos.
 * Cobertura de documentación completa: cada clase, método, propiedad y ViewChild está documentado en español.
 * @module PasoUnoComponent
 */

/**
 * Componente standalone que gestiona el primer paso del proceso de importación de acuicultura.
 * Coordina la validación y gestión de datos de múltiples secciones del formulario.
 * Implementa las interfaces OnInit y OnDestroy para el manejo adecuado del ciclo de vida.
 * 
 * @class PasoUnoComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 * @memberof PasoUnoComponent
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [
    SolicitanteComponent, TercerospageComponent, ReactiveFormsModule, DatosDeLaSolicitudComponent, DatosParaMovilizacionComponent, PagoDeDerechosComponent, CommonModule
  ]
})
export class PasoUnoComponent implements OnInit,OnDestroy {

  /**
   * Índice de la pestaña actualmente seleccionada en el formulario.
   * @public
   * @type {number}
   * @default 1
   * @memberof PasoUnoComponent
   */
  indice: number = 1;

  /**
   * Lista de secciones del formulario con sus respectivos índices, títulos y componentes asociados.
   * @public
   * @type {Array<{ index: number; title: string; component: string; }>}
   * @memberof PasoUnoComponent
   */
  seccionesDeLaSolicitud = [
    { index: 1, title: 'Solicitante', component: 'solicitante' },
    { index: 2, title: 'Datos de la solicitud', component: 'datos-de-la-solicitud' },
    { index: 3, title: 'Datos para movilización nacional', component: 'datos-para-movilizacion-nacional' },
    { index: 4, title: 'Terceros relacionados', component: 'terceror-relacionados' },
    { index: 5, title: 'Pago de derechos', component: 'pago-de-derechos' }
  ];

  /**
   * Referencia al componente hijo SolicitanteComponent para manejar los datos del solicitante.
   * @public
   * @type {SolicitanteComponent}
   * @memberof PasoUnoComponent
   */
  @ViewChild('solicitanteRef') solicitante!: SolicitanteComponent;
  
  /**
   * Referencia al componente hijo DatosDeLaSolicitudComponent para manejar los datos de la solicitud.
   * @public
   * @type {DatosDeLaSolicitudComponent}
   * @memberof PasoUnoComponent
   */
  @ViewChild('datosSolicitudRef') datosSolicitud!: DatosDeLaSolicitudComponent;
  
  /**
   * Referencia al componente hijo DatosParaMovilizacionComponent para manejar los datos de movilización.
   * @public
   * @type {DatosParaMovilizacionComponent}
   * @memberof PasoUnoComponent
   */
  @ViewChild('datosParaMovilizacionRef') datosParaMovilizacion!: DatosParaMovilizacionComponent;
  
  /**
   * Referencia al componente hijo PagoDeDerechosComponent para manejar los pagos de derechos.
   * @public
   * @type {PagoDeDerechosComponent}
   * @memberof PasoUnoComponent
   */
  @ViewChild('pagoDerechosRef') pagoDerechos!: PagoDeDerechosComponent;
  
  /**
   * Referencia al componente hijo TercerospageComponent para manejar los terceros relacionados.
   * @public
   * @type {TercerospageComponent}
   * @memberof PasoUnoComponent
   */
  @ViewChild('tercerospageRef') tercerospage!: TercerospageComponent;

  /**
   * Subject utilizado para notificar y completar las suscripciones activas al destruir el componente.
   * Evita fugas de memoria y se utiliza junto con el operador takeUntil.
   * @private
   * @readonly
   * @type {Subject<void>}
   * @memberof PasoUnoComponent
   */
  private readonly DESTROY_NOTIFIER$ = new Subject<void>();


  /**
   * Constructor que inyecta los servicios requeridos para el funcionamiento del componente.
   * @constructor
   * @param {ImportacionDeAcuiculturaService} importacionDeAcuiculturaService - Servicio para gestionar operaciones relacionadas con la importación de acuicultura
   * @param {ConsultaioQuery} consultaQuery - Query para manejar el estado de las consultas
   * @memberof PasoUnoComponent
   */
  constructor(private importacionDeAcuiculturaService: ImportacionDeAcuiculturaService, private consultaQuery: ConsultaioQuery) {

  }

  /**
   * Cambia el índice de la pestaña seleccionada en el formulario.
   * @public
   * @param {number} i - El índice de la pestaña a seleccionar
   * @memberof PasoUnoComponent
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al estado de consulta para detectar actualizaciones y guardar datos del formulario.
   * @public
   * @memberof PasoUnoComponent
   */
  ngOnInit(): void {

    this.consultaQuery.selectConsultaioState$
    .pipe(takeUntil(this.DESTROY_NOTIFIER$))
    .subscribe((seccionState) => {
      console.log(seccionState);
      if(seccionState.update){
              this.guardarDatosFormulario();
      }
    });
  }
  /**
   * Método que valida todos los formularios del paso uno del trámite de acuicultura.
   * Verifica la validez de cada sección: solicitante, datos de solicitud, movilización, terceros y pagos.
   * @public
   * @returns {boolean} Retorna true si todos los formularios son válidos, false en caso contrario
   * @memberof PasoUnoComponent
   */ 
public validarFormularios(): boolean {
  let isValid = true;
   if (this.solicitante?.form) {
      if (this.solicitante.form.invalid) {
        this.solicitante.form.markAllAsTouched();
        isValid = false;
      }
    } else {
      isValid = false;
    }
    if(this.datosSolicitud.datosMercanciaFormGroup){
      if(!this.datosSolicitud.validarFormulario()){
        isValid = false;
      }
    }
    else{
      isValid = false;
    }
    if(this.datosParaMovilizacion.formularioMovilizacion){
      if(!this.datosParaMovilizacion.validarFormulario()){
        isValid = false;
      }
    }
    else{
      isValid = false;
    }
    if(this.pagoDerechos){
      if(!this.pagoDerechos.validarFormulario()){
        isValid = false;
      }
    }
    else{
      isValid = false;
    }
    if(this.tercerospage){
      if(!this.tercerospage.validarFormulario()){
        isValid = false;
      }
    }
    else{
      isValid = false;
    }
  return isValid;
}
  /**
   * Obtiene los datos de acuicultura y actualiza el estado del formulario.
   * Realiza una suscripción al observable que retorna los datos de acuicultura.
   * Utiliza takeUntil para evitar fugas de memoria al destruir el componente.
   * @public
   * @memberof PasoUnoComponent
   */
guardarDatosFormulario(): void {
  this.importacionDeAcuiculturaService
    .getAcuiculturaData().pipe(
      takeUntil(this.DESTROY_NOTIFIER$)
    )
    .subscribe((resp) => {
      if (resp) {
        this.importacionDeAcuiculturaService.actualizarEstadoFormulario(resp);
      }
    });
}

/**
 * Método del ciclo de vida que se ejecuta cuando el componente es destruido.
 * Limpia los recursos suscritos y detiene las emisiones de datos para prevenir memory leaks.
 * @public
 * @memberof PasoUnoComponent
 */
ngOnDestroy(): void {
  this.DESTROY_NOTIFIER$.next();
  this.DESTROY_NOTIFIER$.complete();
}

}
