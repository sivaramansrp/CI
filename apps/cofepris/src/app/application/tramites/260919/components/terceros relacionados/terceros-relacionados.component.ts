import { AlertComponent, InputRadioComponent, NotificacionesComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DESTINATARIO_CONFIGURACION_TABLA } from '../../constants/column-config.enum';
import { FilaTablaData } from '../../models/fila-modal';
import { ImportarDeRemediosHerbalsService } from '../../services/importar-de-remedios-herbals.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { TEXTOS } from '../../constants/constantes.enum';
import { takeUntil } from 'rxjs/operators';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-fabricante/terceros-fabricante.component';
/**
 * Componente para gestionar los terceros relacionados en el trámite.
 * Este componente permite obtener y mostrar datos relacionados con destinatarios,
 * fabricantes, proveedores y facturadores, utilizando servicios para realizar las solicitudes.
 */
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    TituloComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    NotificacionesComponent,
    InputRadioComponent,
    TercerosRelacionadosComponent
    
  ],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosrelacionadosComponent implements OnInit, OnDestroy {
  /** Constantes de texto utilizadas en el componente */
  TEXTOS = TEXTOS;

  /** Observable para manejar la destrucción del componente */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /** Configuración para la selección de filas en la tabla */
  destinatarioSeleccionTabla = TablaSeleccion.CHECKBOX;

  /** Configuración de las columnas de la tabla */
  destinatarioConfiguracionTabla = DESTINATARIO_CONFIGURACION_TABLA;

  /** Datos de los destinatarios */
  destinatarioDatos: FilaTablaData[] = [];

  /** Datos de los fabricantes */
  fabricanteDatos: FilaTablaData[] = [];

  /** Datos de los proveedores */
  proveedorDatos: FilaTablaData[] = [];

  /** Datos de los facturadores */
  facturadorDatos: FilaTablaData[] = [];

   /** Conjunto de filas seleccionadas en la tabla */
   selectedRows: Set<number> = new Set();

  /** Indica si el formulario está visible */
  esFormularioVisible = false;

  /**
   * Constructor del componente.
   * @param importarDeRemediosHerbals - Servicio para obtener datos relacionados con terceros.
   */
  constructor(
    private importarDeRemediosHerbals: ImportarDeRemediosHerbalsService,
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Llama a los métodos para obtener los datos de destinatarios, fabricantes, proveedores y facturadores.
   */
  ngOnInit(): void {
    this.getFabricanteData();
    this.getDestinatarioData();
    this.getFacturadorData();
    this.getProveedorData();
  }

  /**
   * Método para obtener los datos de los fabricantes.
   * Realiza una solicitud al servicio `ImportarDeRemediosHerbalsService` para obtener los datos de los fabricantes.
   * Los datos obtenidos se asignan a la propiedad `fabricanteDatos`.
   */
  getFabricanteData(): void {
    this.importarDeRemediosHerbals
      .getFabricanteData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.fabricanteDatos = data as unknown as FilaTablaData[];
      });
  }

  /**
   * Método para obtener los datos de los destinatarios.
   * Realiza una solicitud al servicio `ImportarDeRemediosHerbalsService` para obtener los datos de los destinatarios.
   * Los datos obtenidos se asignan a la propiedad `destinatarioDatos`.
   */
  getDestinatarioData(): void {
    this.importarDeRemediosHerbals
      .getDestinatarioData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.destinatarioDatos = data as unknown as FilaTablaData[];
      });
  }

  /**
   * Método para obtener los datos de los proveedores.
   * Realiza una solicitud al servicio `ImportarDeRemediosHerbalsService` para obtener los datos de los proveedores.
   * Los datos obtenidos se asignan a la propiedad `proveedorDatos`.
   */
  getProveedorData(): void {
    this.importarDeRemediosHerbals
      .getProveedorData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.proveedorDatos = data as unknown as FilaTablaData[];
      });
  }

  /**
   * Método para obtener los datos de los facturadores.
   * Realiza una solicitud al servicio `ImportarDeRemediosHerbalsService` para obtener los datos de los facturadores.
   * Los datos obtenidos se asignan a la propiedad `facturadorDatos`.
   */
  getFacturadorData(): void {
    this.importarDeRemediosHerbals
      .getFacturadorData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.facturadorDatos = data as unknown as FilaTablaData[];
      });
  }


   onSelectedRowsChange(selectedRows: FilaTablaData[]): void {
      this.selectedRows = new Set(selectedRows.map((row) => row.id));
      this.esFormularioVisible = false;
    }
    // openModificarMercancias(): void {
    //   if (this.selectedRows.size === 1) {
    //     const SELECTED_ID = Array.from(this.selectedRows)[0];
    //     const SELECTED_ROW_DATA = this.tableData.find(
    //       (row) => row.id === SELECTED_ID
    //     );
  
    //     if (SELECTED_ROW_DATA) {
    //       this.destinatarioForm.patchValue({
    //         agregarDestinatario: {
    //           tipoPersona: SELECTED_ROW_DATA.tipoPersona,
    //         },
    //         datosPersonales: {
    //           nombre: SELECTED_ROW_DATA.nombre,
    //           primerApellido: SELECTED_ROW_DATA.primerApellido,
    //           segundoApellido: SELECTED_ROW_DATA.segundoApellido,
    //           denominacion: SELECTED_ROW_DATA.denominacion,
    //           pais: SELECTED_ROW_DATA.pais,
    //           domicilio: SELECTED_ROW_DATA.domicilio,
    //           estado: SELECTED_ROW_DATA.estado,
    //           codigopostal: SELECTED_ROW_DATA.codigopostal,
    //           calle: SELECTED_ROW_DATA.calle,
    //           numeroExterior: SELECTED_ROW_DATA.numeroExterior,
    //           numeroInterior: SELECTED_ROW_DATA.numeroInterior,
    //           lada: SELECTED_ROW_DATA.lada,
    //           telefono: SELECTED_ROW_DATA.telefono,
    //           correoElectronico: SELECTED_ROW_DATA.correoElectronico,
    //         },
    //       });
  
    //       this.esFormularioVisible = true;
    //     }
    //   }
    // }
    // agregarMercancias(): void {
    //   this.esFormularioVisible = true;
    //   this.destinatarioForm.reset();
    // }
    // onDeleted(): void {
    //   if (this.selectedRows.size > 0) {
    //     // this.abrirModal();
    //   }
    // }
  
  /**
   * Método que se ejecuta al destruir el componente.
   * Marca el observable `destroyed$` como completado para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}