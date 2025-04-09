import { Component, OnDestroy, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'; 


import { AvisoImportacionService } from '../../services/parmiso-importacion.service'; 


import { map, takeUntil } from 'rxjs'; 
import { Subject } from 'rxjs'; 

import { Catalogo, InputFecha, InputFechaComponent, TituloComponent } from '@libs/shared/data-access-user/src'; 


import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src'; 
import { FECHA_DE_PAGO } from '../../models/pago-derechos.model'; 

import { AvisocalidadStore, SolicitudState } from '../../estados/stores/aviso-calidad.store'; 


import { AvisocalidadQuery } from '../../estados/queries/aviso-calidad.query'; 


/**
 * Component Define el componente de Angular.
 * selector 'app-pago-derechos' Selector del componente.
 * standalone true Indica que el componente es independiente.
 * imports Lista de módulos y componentes importados.
 * templateUrl Ruta de la plantilla HTML del componente.
 * styleUrl Ruta de los estilos CSS del componente.
 */
@Component({
  selector: 'app-pago-derechos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CatalogoSelectComponent, TituloComponent, InputFechaComponent],
  templateUrl: './pago-Derechos.component.html',
  styleUrl: './pago-Derechos.component.scss',
})
export class PagoDerechosComponent implements OnDestroy, OnInit {
  /**
   * property {FormGroup} derechosForm - Formulario reactivo para capturar los datos del pago de derechos.
   */
  derechosForm!: FormGroup;

  /**
   * property {SolicitudState} solicitudState - Estado actual de la solicitud.
   */
  public solicitudState!: SolicitudState;

  /**
   * property {Subject<void>} destroyed$ - Sujeto para manejar la destrucción de suscripciones.
   */
  private destroyed$ = new Subject<void>();

  /**
   * property {Catalogo[]} derechosList - Lista de derechos obtenida del servicio.
   */
  public derechosList!: Catalogo[];

  /**
   * property {InputFecha} fechaInicioInput - Configuración de la fecha de pago.
   */
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;

  /**
   * constructor
   * param {FormBuilder} fb - Constructor para formularios reactivos.
   * param {AvisoImportacionService} service - Servicio para obtener datos relacionados con el aviso de importación.
   * param {AvisocalidadStore} avisocalidadStore - Store para gestionar el estado de aviso de calidad.
   * param {AvisocalidadQuery} avisocalidadQuery - Query para obtener datos del estado de aviso de calidad.
   */
  constructor(
    private fb: FormBuilder, // Inyección de dependencia para construir formularios.
    private service: AvisoImportacionService, // Inyección del servicio para obtener datos.
    private avisocalidadStore: AvisocalidadStore, // Inyección del store para manejar el estado.
    private avisocalidadQuery: AvisocalidadQuery // Inyección de la query para consultar el estado.
  ) {
    //constructor
  }

  /**
   * method ngOnInit
   * description Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.avisocalidadQuery.selectSolicitud$ // Observa los cambios en el estado de la solicitud.
      .pipe(
        takeUntil(this.destroyed$), // Finaliza la suscripción al destruir el componente.
        map((seccionState) => { // Mapea el estado recibido.
          this.solicitudState = seccionState; // Asigna el estado a la propiedad solicitudState.
        })
      )
      .subscribe(); // Se suscribe al observable.

    // Inicializa el formulario reactivo con los valores del estado.
    this.derechosForm = this.fb.group({
      claveReferencia: [this.solicitudState?.claveReferencia], // Campo claveReferencia.
      cadenaDependencia: [this.solicitudState?.cadenaDependencia], // Campo cadenaDependencia.
      banco: [this.solicitudState?.banco], // Campo banco.
      llavePago: [this.solicitudState?.llavePago], // Campo llavePago.
      fechaPago: [this.solicitudState?.fechaPago], // Campo fechaPago.
      importePago: [this.solicitudState?.importePago], // Campo importePago.
    });

    this.loadComboUnidadMedida(); // Carga la lista de derechos.
  } 

  /**
   * method loadComboUnidadMedida
   * description Carga la lista de derechos desde el servicio.
   */
  loadComboUnidadMedida(): void {
    this.service.getDatos() // Llama al servicio para obtener los datos.
      .pipe(takeUntil(this.destroyed$)) // Finaliza la suscripción al destruir el componente.
      .subscribe((data): void => { // Maneja los datos recibidos.
        this.derechosList = data as Catalogo[]; // Asigna los datos a la lista de derechos.
      });
  }

  /**
   * method cambioFechaIngreso
   * description Actualiza la fecha de pago en el formulario y en el store.
   * param {string} nuevo_valor - Nuevo valor de la fecha de pago.
   */
  public cambioFechaIngreso(nuevo_valor: string): void {
    this.derechosForm.get('fechaPago')?.setValue(nuevo_valor); // Actualiza el valor en el formulario.
    this.derechosForm.get('fechaPago')?.markAsUntouched(); // Marca el campo como no modificado.
    this.avisocalidadStore.setfechaPago(nuevo_valor); // Actualiza el valor en el store.
  }

  /**
   * method setValoresStore
   * description Actualiza un valor específico en el store.
   * template T
   * param {FormGroup} form - Formulario reactivo.
   * param {string} campo - Nombre del campo en el formulario.
   * param {keyof AvisocalidadStore} metodoNombre - Método del store a invocar.
   */
  setValoresStore<T>(form: FormGroup, campo: string, metodoNombre: keyof AvisocalidadStore): void {
    const VALOR = form.get(campo)?.value as T; // Obtiene el valor del campo.
    (this.avisocalidadStore[metodoNombre] as (value: T) => void)(VALOR); // Llama al método correspondiente del store.
  }
    
  /**
   * method ngOnDestroy
   * description Método para limpiar las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(); // Emite un valor para finalizar las suscripciones.
    this.destroyed$.complete(); // Completa el Subject.
  }
}
