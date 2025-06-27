import { ConsultaioQuery } from '@ng-mf/data-access-user';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, map } from 'rxjs';
import { AdministrarResiduosService } from '../../services/administrar-residuos.service';
import { Solicitud231001State } from '../../estados/tramites/tramite231001.store';
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

  /**
   * Sujeto utilizado para gestionar la destrucción y limpieza de suscripciones en el componente.
   * Se emite un valor cuando el componente se destruye, permitiendo cancelar observables y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();
    /**
 * Indica si el formulario está en modo solo lectura.
 * Cuando se establece en `true`, todos los controles del formulario y elementos interactivos
 * se deshabilitan, impidiendo que el usuario realice cambios. Esta propiedad normalmente se
 * configura según el estado de la aplicación, por ejemplo, al visualizar una solicitud enviada
 * o cuando el usuario no tiene permisos de edición.
 */
  esFormularioSoloLectura: boolean = false;
    /**
 * Estado actual de la sección del trámite 120501.
 * Esta propiedad almacena los datos del estado de la sección, obtenidos generalmente
 * desde el store o desde una consulta al backend. Se utiliza para inicializar y actualizar
 * los formularios del componente con los valores correspondientes a la solicitud en curso.
 */
   private seccionState!: Solicitud231001State;
  /**
   * Constructor de la clase
   * FormBuilder para crear formularios reactivos
   * Servicio para administrar residuos
   */
  constructor(private fb: FormBuilder, private service: AdministrarResiduosService,private consultaioQuery: ConsultaioQuery) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
           this.crearFormularioParaRecuentoTotal();
        })
      )
      .subscribe();
  }

  /**
   * Método de inicialización del componente
   */
  ngOnInit(): void {
    this.crearFormularioParaRecuentoTotal();
    this.loadAdministrarResiduos();
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   * Se utiliza para emitir y completar el observable `destroyed$`, permitiendo limpiar suscripciones y evitar fugas de memoria.
   */
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