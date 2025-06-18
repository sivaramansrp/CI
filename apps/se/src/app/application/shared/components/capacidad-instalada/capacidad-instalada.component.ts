import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { CatalogoSelectComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent,} from '@libs/shared/data-access-user/src';
import { CAPACIDAD_INSTALADA } from '../../constantes/capacidad-instalada.enum';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComplementarState, ComplementarStore } from '../../../estados/tramites/complementar.store';
import { ComplementarQuery } from '../../../estados/queries/complementar.query';
import { map, Subject, takeUntil } from 'rxjs';


/**
 * Componente para la capacidad instalada
 * @export CapacidadInstaladaComponent
 * */
@Component({
  selector: 'app-capacidad-instalada',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './capacidad-instalada.component.html',
  styleUrl: './capacidad-instalada.component.css',
})
export class CapacidadInstaladaComponent implements OnInit {
   /**
   * Formulario reactivo que gestiona los datos relacionados con el pago de derechos, como clave, dependencia, banco,
   * llave, fecha e importe.
   */
  capacidadForm!: FormGroup;
   /**
     * Estado de la solicitud 221601, que contiene los valores actuales de la solicitud.
     */
    public solicitudState!: ComplementarState;
    /**
     * Subject utilizado para gestionar la destrucción del componente y evitar memory leaks.
     */
    private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Constructor de la clase CapacidadInstaladaComponent
   * @param {Location} ubicaccion - Servicio de Angular para manejar la ubicación del navegador
   */
  constructor(private ubicaccion: Location, private fb: FormBuilder,private complementarStore: ComplementarStore,
      private complementarQuery: ComplementarQuery,) {
    
  }
   /**
   * Método que se ejecuta cuando el componente es inicializado.
   * 
   * Inicializa el formulario reactivo con los valores actuales de la solicitud.
   */
  ngOnInit(): void {
    this.inicializarFormulario();
  }
  /**
   * Tipo de selección para la tabla de capacidad instalada
   * @property {TablaSeleccion} constructorapacidadInstaladaTablaSeleccion
   */
  constructorapacidadInstaladaTablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Encabezados de la tabla de capacidad instalada
   * @property {any} capacidadInstaladaEncabezado
   */
  capacidadInstaladaEncabezado = CAPACIDAD_INSTALADA;

  /**
   * Datos de la tabla de capacidad instalada
   * @property {any[]} capacidadInstaladaDatos
   */
  capacidadInstaladaDatos = [];

  /**
   * Catálogo de fracciones arancelarias de producto terminado
   * @property {any[]} fraccionArancelariaProductoTerminadoCatlogo
   */
  fraccionArancelariaProductoTerminadoCatlogo!:[{ "id": 1, "descripcion": "GUADALAJARA" }];

  /**
   * Vuelve a la ubicación anterior en el historial del navegador
   * @returns {void}
   */
  regrasar(): void {
    this.ubicaccion.back();
  }
  /** Inicializa los datos del formulario suscribiéndose al estado del trámite.  
 *  Asigna el estado actual al modelo local del componente. */
   inicializarFormulario(): void {
    this.complementarQuery.selectSolicitud$
          .pipe(
            takeUntil(this.destroyNotifier$),
            map((seccionState) => {
              this.solicitudState = seccionState as ComplementarState;
            })
          )
          .subscribe();
   this.capacidadForm = this.fb.group({
      fraccionArancelariaProductoTerminado: [this.solicitudState.fraccionArancelariaProductoTerminado, Validators.required],
      umt: [this.solicitudState.umt],
      descripcionComercialProductoTerminado: [this.solicitudState.descripcionComercialProductoTerminado, Validators.required],
      turnos: [this.solicitudState.turnos],
      horasPorTurno: [this.solicitudState.horasPorTurno],
      cantidadEmpleados: [this.solicitudState.cantidadEmpleados],
      cantidadMaquinaria: [this.solicitudState.cantidadMaquinaria],
      descripcionMaquinaria: [this.solicitudState.descripcionMaquinaria, Validators.required],
      capacidadInstaladaMensual: [this.solicitudState.capacidadInstaladaMensual],
      capacidadInstaladaAnual: [this.solicitudState.capacidadInstaladaAnual],
      calculoCapacidadInstalada: [this.solicitudState.calculoCapacidadInstalada],
      capacidadUtilizadaPct: [this.solicitudState.capacidadUtilizadaPct]
    });
  }
   /**
   * Método que actualiza el store con los valores del formulario.
   * 
   * @param form - Formulario reactivo con los datos actuales.
   * @param campo - El campo que debe actualizarse en el store.
   * @param metodoNombre - El nombre del método en el store que se debe invocar.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof ComplementarStore): void {
    const VALOR = form.get(campo)?.value;
    (this.complementarStore[metodoNombre] as (value: unknown) => void)(VALOR);
  }
}
