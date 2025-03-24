/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

import PartidasdelaTable from '@libs/shared/theme/assets/json/130111/partidas-de-la.json';

import { PartidasDeLaComponent } from '../../../../shared/components/partidas-de-la/partidas-de-la.component';
import { Tramite130111Store } from '../../estados/tramites/tramites130111.store';

import { Tramite130111Query } from '../../estados/queries/tramite130111.query';

/**
 * SolicitudComponent
 * Este componente es responsable de gestionar la solicitud del trámite 130111.
 * Proporciona formularios reactivos para capturar datos, una tabla dinámica para mostrar información,
 * y métodos para interactuar con el estado global y otros servicios.
 */
@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PartidasDeLaComponent],
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit {
  /**
   * form
   * Formulario reactivo principal para capturar los datos de la solicitud.
   */
  partidasDelaMercanciaForm!: FormGroup;

  /**
   * formForTotalCount
   * Formulario reactivo para capturar los totales de las partidas.
   */
  formForTotalCount!: FormGroup;

  /**
   * tableHeaderData
   * Configuración de las columnas de la tabla dinámica.
   */
  tableHeaderData: ConfiguracionColumna<any>[] = [];

  /**
   * tableBodyData
   * Datos que se mostrarán en el cuerpo de la tabla dinámica.
   */
  tableBodyData: any[] = [];

  /**
   * mostrarTabla
   * Bandera para mostrar u ocultar la tabla dinámica.
   */
  mostrarTabla = false;

  /**
   * filaSeleccionada
   * Fila seleccionada en la tabla dinámica.
   */
  filaSeleccionada: any = null;

  /**
   * destroyed$
   * Subject utilizado para manejar la destrucción de suscripciones.
   */
  private destroyed$: Subject<void> = new Subject();

  /**
   * CHECKBOX
   * Tipo de selección de la tabla dinámica (checkbox).
   */
  CHECKBOX = TablaSeleccion.CHECKBOX;

  /**
   * getEstablecimientoTableData
   * Datos de configuración de la tabla obtenidos de un archivo JSON.
   */
  public getEstablecimientoTableData = PartidasdelaTable;

  /**
   * 
   * Constructor para inicializar el componente e inyectar dependencias.
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tramite130111Store: Tramite130111Store,
    private tramite130111Query: Tramite130111Query
  ) {
    //Constructor para inicializar el componente e inyectar dependencias.
  }

  /**
   * ngOnInit
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Configura los formularios, obtiene datos iniciales y suscribe a cambios en el estado global.
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.formularioTotalCount();
    this.getEstablecimiento();
    this.calculateTotals();

    this.tramite130111Query.mostrarTabla$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((mostrarTabla) => {
        this.mostrarTabla = mostrarTabla;
      });

    this.tramite130111Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.partidasDelaMercanciaForm.patchValue({
            cantidad: seccionState.cantidad,
            valorPartidaUSD: seccionState.valorPartidaUSD,
            descripcion: seccionState.descripcion,
          });
        })
      )
      .subscribe();
  }

  /**
   * crearFormulario
   * Crea el formulario reactivo principal para capturar los datos de la solicitud.
   */
  crearFormulario(): void {
    this.partidasDelaMercanciaForm = this.fb.group({
      cantidad: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(18)]],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
      valorPartidaUSD: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'), Validators.maxLength(20)]],
    });
  }

  /**
   * formularioTotalCount
   * Crea el formulario reactivo para capturar los totales de las partidas.
   */
  formularioTotalCount(): void {
    this.formForTotalCount = this.fb.group({
      cantidadTotal: [{ value: '', disabled: true }],
      valorTotalUSD: [{ value: '', disabled: true }],
    });
  }

  /**
   * getEstablecimiento
   * Configura los datos de la tabla dinámica a partir de un archivo JSON.
   */
  getEstablecimiento(): void {
    this.tableHeaderData = this.getEstablecimientoTableData.tableHeader.map((header, index) => ({
      encabezado: header,
      clave: (fila: any): string => fila.tbodyData[index],
      orden: index,
    }));
    this.tableBodyData = this.getEstablecimientoTableData.tableBody;
  }

  /**
   * calculateTotals
   * Calcula los totales de cantidad y valor en USD a partir de los datos de la tabla.
   */
  calculateTotals(): void {
    const CANTITAD_TOTAL = this.tableBodyData.reduce((sum: number, item: { tbodyData: string[] }) => sum + parseFloat(item.tbodyData[0]), 0);
    const VALOR_TOTALUSD = this.tableBodyData.reduce((sum: number, item: { tbodyData: string[] }) => sum + parseFloat(item.tbodyData[5]), 0);
    this.formForTotalCount.controls['cantidadTotal'].setValue(CANTITAD_TOTAL);
    this.formForTotalCount.controls['valorTotalUSD'].setValue(VALOR_TOTALUSD);
  }

  /**
   * handleFilaSeleccionada
   * Maneja la selección de filas en la tabla dinámica y actualiza el estado global.
   * Lista de filas seleccionadas.
   */
  handleFilaSeleccionada(filasSeleccionadas: any[]): void {
    this.filaSeleccionada = filasSeleccionadas.length ? filasSeleccionadas[0] : null;
    if (this.filaSeleccionada) {
      this.tramite130111Store.storeTableValues(this.filaSeleccionada);
    }
  }

  /**
   * validarYEnviarFormulario
   * Valida el formulario y muestra la tabla dinámica si es válido.
   */
  validarYEnviarFormulario(): void {
    this.mostrarTabla = true;
    if (this.partidasDelaMercanciaForm.invalid) {
      this.partidasDelaMercanciaForm.markAllAsTouched();
    } else {
      this.mostrarTabla = true;
    }
  }

  /**
   * navegarParaModificarPartida
   * Navega para modificar una partida específica y actualiza el estado global.
   */
  navegarParaModificarPartida(): void {
    if (this.filaSeleccionada) {
      this.tramite130111Store.setMostrarTabla(true);
      this.tramite130111Store.storeTableValues(this.filaSeleccionada);
    }
  }

  /**
   * setValoresStore
   * Actualiza el estado global con los valores del formulario.
   * Objeto que contiene el formulario, el campo y el nombre del método a ejecutar.
   */
  setValoresStore(event: { form: FormGroup; campo: string; metodoNombre: string }): void {
    const VALOR = event.form.get(event.campo)?.value;
    const METODO_NOMBRE = event.metodoNombre as keyof Tramite130111Store; // Type assertion
    if (METODO_NOMBRE in this.tramite130111Store) {
      (this.tramite130111Store[METODO_NOMBRE] as (value: any) => void)(VALOR);
    } else {
      console.error(`Método ${METODO_NOMBRE} no existe en Tramite130111Store`);
    }
  }
}