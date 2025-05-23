/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import ProductorTabla from 'libs/shared/theme/assets/json/90201/productor-indirecto-tabla.json';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { ProductorIndirectoTabla } from 'libs/shared/data-access-user/src/core/models/90201/expansion-de-productores.model';
import { TablaSeleccion } from 'libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import {
  Solicitud90201State,
  Tramite90201Store,
} from '../../../../estados/tramites/tramite90201.store';
import { Subject, takeUntil, map, Subscription } from 'rxjs';
import { Tramite90201Query } from '../../../../estados/queries/tramite90201.query';

/**
 * Componente ProductorIndirecto que se utiliza para mostrar y gestionar los ProductorIndirecto.
 *
 * Este componente utiliza varios subcomponentes como TituloComponent, TablaDinamicaComponent, CommonModule,
 * FormsModule y AlertComponent para mostrar información y permitir al usuario seleccionar y agregar tratados.
 *
 * @component
 */
@Component({
  selector: 'app-productor-indirecto',
  standalone: true,
  imports: [CommonModule, TituloComponent, TablaDinamicaComponent, FormsModule,ReactiveFormsModule],
  templateUrl: './productor-indirecto.component.html',
  styleUrl: './productor-indirecto.component.scss',
})
export class ProductorIndirectoComponent implements OnInit, OnDestroy {
  /**
   * Configuración para las columnas de la tabla en el componente Productor Indirecto.
   * Cada configuración de columna incluye el nombre del encabezado, una función clave para extraer el valor de un elemento y el orden de la columna.
   *
   * @type {ConfiguracionColumna<any>[]}
   * @property {string} encabezado - El nombre del encabezado de la columna.
   * @property {(item: any) => any} clave - Una función para extraer el valor de un elemento para la columna.
   * @property {number} orden - El orden de la columna en la tabla.
   */
  public configuracionTabla: ConfiguracionColumna<any>[] = [
    { encabezado: 'registro', clave: (item: any) => item.registro, orden: 1 },
    {
      encabezado: 'denominacion',
      clave: (item: any) => item.denominación,
      orden: 2,
    },
    { encabezado: 'correo', clave: (item: any) => item.correo, orden: 3 },
  ];

  /**
   * Un arreglo de objetos `ProductorIndirectoTabla` que representa los datos para la tabla de productor indirecto.
   * Se inicializa con los valores de `ProductorTabla`.
   */
  public tablaDatos: ProductorIndirectoTabla[] = ProductorTabla;
  /**
   * Representa el tipo de selección de checkbox utilizado en el componente.
   * Esto se establece al valor de `TablaSeleccion.CHECKBOX`.
   */
  public checkbox = TablaSeleccion.CHECKBOX;

  /**
   * Representa el estado de la solicitud.
   */
  public solicitudState!: Solicitud90201State;

  /**
   * Un Subject que se utiliza para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  formProductorIndirecto!: FormGroup;

  /**
   * Representa el RFC (Registro Federal de Contribuyentes) de un usuario.
   * Este es un identificador único utilizado para fines fiscales en México.
   */
  public rfc: string = '';

  /**
   * Representa la suscripción al estado de la solicitud.
   */
  private subscription: Subscription = new Subscription();
  
  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false; 

  /**
   * Constructor del componente SectoresYMercanciasComponent.
   *
   * @param _expansionDesvc - Servicio para manejar la expansión de productores.
   * @param fb - Instancia de FormBuilder para crear formularios reactivos.
   */
  constructor(
    private tramite90201Store: Tramite90201Store,
    private tramite90201Query: Tramite90201Query,
    private consultaioQuery: ConsultaioQuery,
    private fb: FormBuilder
  ) {
     this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
        this.inicializarProductorFormulario();
      })
    )
    .subscribe()
  }

    inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
     this.inicializarFormulario();
    }  
  }
   
  guardarDatosFormulario(): void {
      if (this.esFormularioSoloLectura) {
         this.formProductorIndirecto.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.formProductorIndirecto.enable();
      } else {
      }
  }
  /**
   * Inicializa el componente ProductorIndirecto.
   * Se suscribe al estado de la solicitud y actualiza el RFC con el valor del estado.
   */
  ngOnInit(): void {
  this.inicializarEstadoFormulario();
  }
  
  inicializarFormulario(): void{
       this.tramite90201Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;

           })
           
          ).subscribe()

          this.inicializarProductorFormulario();
    }

  inicializarProductorFormulario(): void {
    this.formProductorIndirecto = this.fb.group({
          rfc: [this.solicitudState?.rfc],
          })
        
  }
  
  setValoresStore(campo: string, metodoNombre: keyof Tramite90201Store): void {
    const VALOR = this.rfc;
    (this.tramite90201Store[metodoNombre] as (value: any) => void)(VALOR);
  }

 ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
