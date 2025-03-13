import { AdministrarResiduosService } from '@ng-mf/data-access-user';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TableComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { takeUntil } from 'rxjs';

/**
 * Componente para administrar residuos
 */
@Component({
  selector: 'app-administrar-residuos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, TableComponent],
  templateUrl: './administrar-residuos.component.html',
  styleUrl: './administrar-residuos.component.scss',
})
export class AdministrarResiduosComponent implements OnInit, OnDestroy {
  /**
   * Datos del encabezado de la tabla
   */
  tableHeaderData: string[] = [];
  /**
   * Datos del cuerpo de la tabla
   */
  tableBodyData: { tbodyData: string[] }[] = [];
  /**
   * Datos de la tabla obtenidos de un archivo JSON
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getEstablecimientoTableData: any;
  /**
   * Formulario para el recuento total de filas
   */
  formularioParaRecuentoTotal!: FormGroup;

  private destroyed$ = new Subject<void>();
  
  /**
   * Constructor de la clase
   * @param fb - FormBuilder para crear formularios reactivos
   * @param service - Servicio para administrar residuos
   */
  constructor(private fb: FormBuilder, private service: AdministrarResiduosService) {
    // constructor
  }

  /**
   * Método de inicialización del componente
   */
  ngOnInit(): void {
    this.crearFormularioParaRecuentoTotal();
    this.loadAdministrarResiduos();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Obtiene los datos del establecimiento y los asigna a las variables de la tabla
   */
  public getEstablecimiento(): void {
    this.tableHeaderData = this.getEstablecimientoTableData.tableHeader;
    this.tableBodyData = this.getEstablecimientoTableData.tableBody;
}

  /**
   * Crea el formulario para el recuento total de filas
   */
  crearFormularioParaRecuentoTotal(): void {
    this.formularioParaRecuentoTotal = this.fb.group({
      recuentoTotalDeFilas: [{ value: '', disabled: true }],
    });
  }

  /**
   * Actualiza el recuento total de filas en el formulario
   */
  public actualizarRecuentoTotalDeFilas(): void {
    const TOTAL_ROW_COUNT = this.tableBodyData.length;
    this.formularioParaRecuentoTotal.patchValue({ recuentoTotalDeFilas: TOTAL_ROW_COUNT });
}

  /**
   * Carga los datos para administrar residuos
   */
  loadAdministrarResiduos(): void {
    this.service
      .getAdministrarResiduos()
      .pipe(
        takeUntil(this.destroyed$) // Se usa takeUntil para asegurarse de que las suscripciones se cancelen al destruirse el componente
      )
      .subscribe((data) => {
        this.getEstablecimientoTableData = data;
        this.getEstablecimiento();
        this.actualizarRecuentoTotalDeFilas();
      });
  }
}