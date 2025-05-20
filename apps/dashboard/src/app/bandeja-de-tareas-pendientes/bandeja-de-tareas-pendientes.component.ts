import { BANDEJA_DE_TAREAS_PENDIENTES_FORMA, BandejaDeTareasPendientes, ConfiguracionColumna, LibBandejaComponent, ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BandejaDeSolicitudeService } from '../services/bandeja-de-solicitude.service';
import { CommonModule } from '@angular/common';
import tramiteDetailsData from '@libs/shared/theme/assets/json/tramiteList.json';


/* 
  Componente bandeja-de-tareas-pendientes:
  - selector: etiqueta HTML del componente.
  - standalone: componente independiente.
  - imports: módulos requeridos.
  - templateUrl: HTML del componente.
  - styleUrl: estilos del componente.
*/
@Component({
  selector: 'bandeja-de-tareas-pendientes',
  standalone: true,
  imports: [CommonModule,LibBandejaComponent],
  templateUrl: './bandeja-de-tareas-pendientes.component.html',
  styleUrl: './bandeja-de-tareas-pendientes.component.scss',
})
/*
 * Componente responsable de mostrar la bandeja de tareas pendientes.
 * Implementa OnInit para cargar los datos de la bandeja al iniciar,
 * e implementa OnDestroy para liberar recursos y cancelar suscripciones activas.
 */
export class BandejaDeTareasPendientesComponent implements OnInit,OnDestroy {
/*
 * Subject utilizado para emitir un valor y completar las suscripciones activas 
 * cuando el componente se destruye, evitando fugas de memoria.
 */
  private destroyNotifier$: Subject<void> = new Subject();
  public departamentoDatos: Array<any> = [];
    /*
   * Configuración de las columnas que se mostrarán en la tabla de tareas pendientes.
   */
  public dePendientesConfiguracionTabla: ConfiguracionColumna<BandejaDeTareasPendientes>[] = [
      {
        encabezado: 'Folio trámite',
        clave: (artículo:BandejaDeTareasPendientes) => artículo.folioTramite,
        orden: 1,
      },
      {
        encabezado: 'Tipo de trámite',
        clave: (artículo:BandejaDeTareasPendientes) => artículo.tipoDeTramite,
        orden: 2,
      },
      {
        encabezado: 'Nombre de la tarea',
        clave: (artículo:BandejaDeTareasPendientes) => artículo.nombreDeLaTarea,
        orden: 3,
      },
      {
        encabezado: 'Fecha de asignación',
        clave: (artículo:BandejaDeTareasPendientes) => artículo.fechaDeAsignacion,
        orden: 4,
      },
      {
        encabezado: 'Estado de trámite',
        clave: (artículo:BandejaDeTareasPendientes) => artículo.estadoDeTramite,
        orden: 5,
      },
      {
        encabezado: 'Departamento',
        clave: (artículo:BandejaDeTareasPendientes) => artículo.departamento,
        orden: 6,
      },
      {
        encabezado: 'Número de procedimiento',
        clave: (artículo:BandejaDeTareasPendientes) => artículo.numeroDeProcedimiento,
        orden: 7,
      },
      {
        encabezado: 'Origin',
        clave: (artículo:BandejaDeTareasPendientes) => artículo.origin,
        orden: 8,
      }
    ];
    /*
   * Datos que se mostrarán en la tabla de tareas pendientes.
   */
    public dePendientesTablaDatos: BandejaDeTareasPendientes[] = [];
     /*
   * Estructura del formulario utilizado para la bandeja de tareas pendientes.
   */
    public bandejaDeTareasForma = BANDEJA_DE_TAREAS_PENDIENTES_FORMA;
  /*
   * Constructor del componente.
   * Inyecta el servicio BandejaDeSolicitudeService para obtener los datos necesarios.
   */
    constructor(private bandejaSvc: BandejaDeSolicitudeService) {
  
    }
 /*
   * Hook de inicialización del componente.
   * Llama al método para obtener los datos de la tabla al cargar el componente.
   */
    ngOnInit(): void {
      this.getBandejaDeTablaDatos();
      this.getNombreDelDepartamento();
    }
/*
   * Método para obtener los datos de la tabla de tareas pendientes desde el servicio.
   * Se suscribe al observable y asigna los datos obtenidos a la propiedad correspondiente.
   */
    public getBandejaDeTablaDatos(): void {
      this.bandejaSvc.getTareasPendientesTablaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
        this.dePendientesTablaDatos = JSON.parse(JSON.stringify(response));
      });
    }

    public getNombreDelDepartamento(): void {
      this.bandejaSvc.getDepartamento().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
        const API_RESPONSE = JSON.parse(JSON.stringify(response));
        const DATOS = API_RESPONSE.data;
        this.departamentoDatos = DATOS;
        const CLASIFICACION_FIELD = this.bandejaDeTareasForma.find((datos: ModeloDeFormaDinamica) => datos.id === 'departamento') as ModeloDeFormaDinamica;
        if (CLASIFICACION_FIELD) {
          if (!CLASIFICACION_FIELD.opciones) {
            CLASIFICACION_FIELD.opciones = DATOS.map((item: { ID_DEPENDENCIA: number; ACRONIMO: string }) => ({
              descripcion: item.ACRONIMO,
              id: item.ID_DEPENDENCIA,
            }));
          }
        }
      });
    }

    public departamento(event: { campo: string; valor: any }): void {
      const SELECTED_DEPARTAMENTO = this.departamentoDatos.filter((item) => item.ID_DEPENDENCIA === Number(event));
      this.getProcedimiento(SELECTED_DEPARTAMENTO[0].ACRONIMO);

    }

    public getProcedimiento(departamento: string): void {
        let PROCEDURE_NUMERO = [];
        PROCEDURE_NUMERO = tramiteDetailsData.filter((v) => v.department === departamento.toLocaleLowerCase());
        const FILTERED_FIELD = this.bandejaDeTareasForma.find((datos: ModeloDeFormaDinamica) => datos.id === 'procedimiento') as ModeloDeFormaDinamica;
        if (FILTERED_FIELD) {
          FILTERED_FIELD.opciones = PROCEDURE_NUMERO.map((item: { id: number; tramite: number }) => ({
              descripcion: item.tramite,
              id: item.id,
            }));
        }
    }
 /*
   * Hook de destrucción del componente.
   * Finaliza las suscripciones activas al destruir el componente para evitar fugas de memoria.
   */
    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }
}
