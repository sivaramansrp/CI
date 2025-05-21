import { BANDEJA_DE_TAREAS_PENDIENTES_FORMA, BandejaDeTareasPendientes, ConfiguracionColumna, LibBandejaComponent, ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BandejaDeSolicitudeService } from '../services/bandeja-de-solicitude.service';
import { CommonModule } from '@angular/common';
import { SeleccionadoDepartamento } from '@libs/shared/data-access-user/src/core/models/shared/bandeja-de-tareas-pendientes.model';
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
  /**
   * Almacena los datos relacionados con los departamentos.
   * Cada elemento del arreglo representa un departamento y su información asociada.
   * La estructura de cada elemento es de tipo `any`, por lo que puede contener cualquier forma de datos de departamento.
   */
  public departamentoDatos: Array<any> = [];
  /**
   * Almacena una lista de números de procedimiento.
   *
   * @remarks
   * Este arreglo contiene los números de procedimiento relevantes para el componente.
   * El tipo está definido como `Array<any>`, lo que permite almacenar cualquier tipo de valor.
   * Considere especificar un tipo más preciso para una mejor seguridad de tipos.
   */
  public procedureNumero: Array<any> = [];
  /**
   * Representa el objeto del departamento actualmente seleccionado.
   * 
   * @property {boolean} tieneDepartamento - Indica si un departamento está seleccionado.
   * @property {string} numeroDeProcedimiento - El número de procedimiento asociado al departamento.
   * @property {string} nombreDelDepartamento - El nombre del departamento seleccionado.
   */
  public selectedDepartamentoObj: SeleccionadoDepartamento = {
    tieneDepartamento: false,
    numeroDeProcedimiento: '',
    nombreDelDepartamento: '',
  };
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

    /**
     * Obtiene los datos de los departamentos desde el servicio y actualiza las opciones del campo del formulario.
     *
     * Este método se suscribe al observable `getDepartamento` de `bandejaSvc`, procesa la respuesta de la API
     * y asigna los datos de los departamentos a `departamentoDatos`. Luego localiza el campo del formulario con el ID 'departamento'
     * en `bandejaDeTareasForma` y, si el campo existe y aún no tiene opciones, llena su propiedad `opciones`
     * con los acrónimos e IDs de los departamentos.
     */
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

    /**
     * Maneja los cambios en el departamento o procedimiento seleccionado según el evento proporcionado.
     *
     * @param event - Un objeto que contiene el campo (`campo`) que está cambiando y su nuevo valor (`valor`).
     *   - Si `campo` es `'departamento'`, actualiza el objeto de departamento seleccionado, asigna su acrónimo y obtiene los procedimientos relacionados.
     *   - Si `campo` es `'procedimiento'`, actualiza el objeto de departamento seleccionado con el número de procedimiento seleccionado.
     *   - Para cualquier otro valor, reinicia el estado de selección del departamento.
     */
    public departamento(event: { campo: string; valor: any }): void {
      if(event.campo === 'departamento') {
        this.selectedDepartamentoObj.tieneDepartamento = true;
        const SELECTED_DEPARTAMENTO = this.departamentoDatos.filter((item) => item.ID_DEPENDENCIA === Number(event.valor));
        if(SELECTED_DEPARTAMENTO[0].ACRONIMO !== null && SELECTED_DEPARTAMENTO[0].ACRONIMO !== undefined && SELECTED_DEPARTAMENTO[0].ACRONIMO !== '') {
          this.selectedDepartamentoObj.nombreDelDepartamento = SELECTED_DEPARTAMENTO[0].ACRONIMO;
          this.getProcedimiento(SELECTED_DEPARTAMENTO[0].ACRONIMO);
        }
      } else if(event.campo === 'procedimiento') {
        this.selectedDepartamentoObj.tieneDepartamento = false;
        const SELECTED_PROCEDURE = this.procedureNumero.filter((item) => item.id === Number(event.valor));
        this.selectedDepartamentoObj.numeroDeProcedimiento = SELECTED_PROCEDURE[0].tramite;
      } else {
          this.selectedDepartamentoObj.tieneDepartamento = false;
      }

    }

    /**
     * Filtra la lista de procedimientos (`tramiteDetailsData`) por el departamento especificado,
     * actualiza la propiedad `procedureNumero` con los resultados filtrados y establece las
     * opciones disponibles para el campo 'procedimiento' en el formulario dinámico (`bandejaDeTareasForma`).
     *
     * @param departamento - El nombre del departamento por el cual filtrar los procedimientos.
     */
    public getProcedimiento(departamento: string): void {
        this.procedureNumero = [];
        this.procedureNumero = tramiteDetailsData.filter((v) => v.department === departamento.toLocaleLowerCase());
        const FILTERED_FIELD = this.bandejaDeTareasForma.find((datos: ModeloDeFormaDinamica) => datos.id === 'procedimiento') as ModeloDeFormaDinamica;
        if (FILTERED_FIELD) {
          FILTERED_FIELD.opciones = this.procedureNumero.map((item: { id: number; tramite: number }) => ({
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
