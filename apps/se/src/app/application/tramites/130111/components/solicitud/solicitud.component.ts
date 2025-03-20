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

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PartidasDeLaComponent],
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit {
  form!: FormGroup;
  formForTotalCount!: FormGroup;
  tableHeaderData: ConfiguracionColumna<any>[] = [];
  tableBodyData: any[] = [];
  mostrarTabla = false;
  filaSeleccionada: any = null;
  private destroyed$: Subject<void> = new Subject();
  CHECKBOX = TablaSeleccion.CHECKBOX;
  public getEstablecimientoTableData = PartidasdelaTable;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tramite130111Store: Tramite130111Store,
    private tramite130111Query: Tramite130111Query
  ) {
     // Constructor necesario para la inyección de dependencias
  }

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
          this.form.patchValue({
            cantidad: seccionState.cantidad,
            valorPartidaUSD: seccionState.valorPartidaUSD,
            descripcion: seccionState.descripcion,
          });
        })
      )
      .subscribe();
  }

  crearFormulario(): void {
    this.form = this.fb.group({
      cantidad: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(18)]],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
      valorPartidaUSD: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'), Validators.maxLength(20)]],
    });
  }

  formularioTotalCount(): void {
    this.formForTotalCount = this.fb.group({
      cantidadTotal: [{ value: '', disabled: true }],
      valorTotalUSD: [{ value: '', disabled: true }],
    });
  }

  getEstablecimiento(): void {
    this.tableHeaderData = this.getEstablecimientoTableData.tableHeader.map((header, index) => ({
      encabezado: header,
      clave: (fila: any): string => fila.tbodyData[index],
      orden: index,
    }));
    this.tableBodyData = this.getEstablecimientoTableData.tableBody;
  }

  calculateTotals(): void {
    const CANTITAD_TOTAL = this.tableBodyData.reduce((sum: number, item: { tbodyData: string[] }) => sum + parseFloat(item.tbodyData[0]), 0);
    const VALOR_TOTALUSD = this.tableBodyData.reduce((sum: number, item: { tbodyData: string[] }) => sum + parseFloat(item.tbodyData[5]), 0);
    this.formForTotalCount.controls['cantidadTotal'].setValue(CANTITAD_TOTAL);
    this.formForTotalCount.controls['valorTotalUSD'].setValue(VALOR_TOTALUSD);
  }

  handleFilaSeleccionada(filasSeleccionadas: any[]): void {
    this.filaSeleccionada = filasSeleccionadas.length ? filasSeleccionadas[0] : null;
    if (this.filaSeleccionada) {
      this.tramite130111Store.storeTableValues(this.filaSeleccionada);
    }
  }

  validarYEnviarFormulario(): void {
    this.mostrarTabla = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.mostrarTabla = true;
    }
  }

  navegarParaModificarPartida(): void {
    if (this.filaSeleccionada) {
      this.tramite130111Store.setMostrarTabla(true);
      this.tramite130111Store.storeTableValues(this.filaSeleccionada);
    }
  }

  setValoresStore(event: { form: FormGroup; campo: string; metodoNombre: string }): void {
    const VALOR = event.form.get(event.campo)?.value;
    const METODO_NOMBRE= event.metodoNombre as keyof Tramite130111Store; // Type assertion
    if (METODO_NOMBRE in this.tramite130111Store) {
      (this.tramite130111Store[METODO_NOMBRE] as (value: any) => void)(VALOR);
    } else {
      console.error(`Método ${METODO_NOMBRE} no existe en Tramite130111Store`);
    }
  }
}