import { BandejaDeTareasPendientes, BandejaTareasPendientesBody, ResponseTable, RespuestaDatos } from "../../models/shared/bandeja-de-tareas-pendientes.model";
import { Observable, catchError, map, retry, take, throwError } from "rxjs";
import { API_GET_BANDEJATAREA } from "../../constants/api-constants";
import { ENVIRONMENT } from "../../../enviroments/enviroment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class BandejaDeSolicitudeService {
    /**
     * URL base del servidor al que se realizarán las solicitudes para la consulta de la bandeja de tareas pendientes.
     * Esta variable almacena la dirección del host que será utilizada por los métodos del servicio para interactuar con la API correspondiente.
     */
    private readonly host: string;

    constructor(private http: HttpClient) { 
        this.host = `${ENVIRONMENT.API_HOST}/api/`;
    }

    /**
     * Envía una solicitud POST al endpoint de bandeja de tareas pendientes con el cuerpo proporcionado
     * y retorna un observable con la lista de tareas pendientes transformadas.
     *
     * @param body Objeto de tipo `BandejaTareasPendientesBody` que contiene los parámetros de la consulta.
     * @returns Observable que emite un arreglo de objetos `BandejaDeTareasPendientes` con la información de las tareas pendientes.
     *
     * @remarks
     * - Realiza hasta 2 reintentos en caso de error en la petición HTTP.
     * - Solo toma la primera respuesta exitosa.
     * - Transforma la respuesta del backend al formato requerido por la aplicación.
     * - En caso de error, emite un error personalizado con información del endpoint.
     */
    public postBandejaTareas(body: BandejaTareasPendientesBody): Observable<BandejaDeTareasPendientes[]> {
    const ENDPOINT = `${this.host}` + API_GET_BANDEJATAREA;
        return this.http.post<ResponseTable>(ENDPOINT, body).pipe(
            retry(2),
            take(1),
            map((x: ResponseTable) => x.datos as unknown as RespuestaDatos[]),
            map((datos: RespuestaDatos[]) => {
                return datos.map((dato: RespuestaDatos) => ({  
                    folioTramite: dato.folio_tramite,
                    tipoDeTramite: dato.tipo_tramite,
                    nombreDeLaTarea: dato.action_name,
                    fechaDeAsignacion: dato.fecha_inicio_tarea,
                    estadoDeTramite: dato.estado_tramite,
                    departamento: dato.nombre_grupo,
                    numeroDeProcedimiento: "301",
                    origin: dato.bpi_id
                } as BandejaDeTareasPendientes))
            }),
            catchError(() => {
                const ERROR = new Error(`Ocurrió un error al devolver la información ${ENDPOINT} `);
                return throwError(() => ERROR);
            })
        );
    }
}