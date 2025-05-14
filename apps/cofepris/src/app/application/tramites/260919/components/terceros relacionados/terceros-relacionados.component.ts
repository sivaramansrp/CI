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

  /**
   * Método que se ejecuta al destruir el componente.
   * Marca el observable `destroyed$` como completado para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}