import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConfiguracionColumna,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { Destinatario, Fabricante } from '../../model/solicitud-permiso.model';
import { Subject, map, takeUntil } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { SolicitudPermisoService } from '../../services/solicitud-permiso.service';

/**
 * Componente que representa la gestión de terceros relacionados.
 * Permite mostrar y gestionar tablas de destinatarios y fabricantes relacionados con el trámite.
 */
@Component({
  selector: 'app-terceros-relacionados',
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent implements OnInit, OnDestroy {
  /**
   * Tipo de selección de la tabla (por ejemplo, selección por checkbox).
   */
  tipoSeleccionTabla: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas de la tabla de destinatarios.
   * Define cómo se mostrarán los datos de los destinatarios.
   */
  configuiracionTablaDestinatario: ConfiguracionColumna<Destinatario>[] = [
    {
      encabezado: 'Nombre/denominación o razón social',
      clave: (item: Destinatario) => item.nombre,
      orden: 1,
    },
    { encabezado: 'R.F.C.', clave: (item: Destinatario) => item.rfc, orden: 2 },
    { encabezado: 'CURP', clave: (item: Destinatario) => item.curp, orden: 3 },
    {
      encabezado: 'Teléfono',
      clave: (item: Destinatario) => item.telefono,
      orden: 4,
    },
    {
      encabezado: 'Correo electrónico',
      clave: (item: Destinatario) => item.correoElectronico,
      orden: 5,
    },
    {
      encabezado: 'Calle',
      clave: (item: Destinatario) => item.calle,
      orden: 6,
    },
    {
      encabezado: 'Número exterior',
      clave: (item: Destinatario) => item.numeroExterior,
      orden: 7,
    },
    {
      encabezado: 'Número interior',
      clave: (item: Destinatario) => item.numeroInterior,
      orden: 8,
    },
    { encabezado: 'País', clave: (item: Destinatario) => item.pais, orden: 9 },
    {
      encabezado: 'Colonia',
      clave: (item: Destinatario) => item.colonia,
      orden: 10,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (item: Destinatario) => item.municipio,
      orden: 11,
    },
    {
      encabezado: 'Localidad',
      clave: (item: Destinatario) => item.localidad,
      orden: 12,
    },
    {
      encabezado: 'Estado',
      clave: (item: Destinatario) => item.estado,
      orden: 13,
    },
    { encabezado: 'Estado', clave: () => '---', orden: 14 },
    {
      encabezado: 'Código Postal',
      clave: (item: Destinatario) => item.codigoPostal,
      orden: 15,
    },
  ];

  /**
   * Datos de la tabla de destinatarios.
   */
  datosTablaDestinatario!: Destinatario[];

  /**
   * Indica si hay filas seleccionadas en la tabla de destinatarios.
   */
  destinatarioTablaSeleccion: boolean = false;

  /**
   * Configuración de las columnas de la tabla de fabricantes.
   * Define cómo se mostrarán los datos de los fabricantes.
   */
  configuiracionTablaFabricante: ConfiguracionColumna<Fabricante>[] = [
    {
      encabezado: 'Nombre/denominación o razón social',
      clave: (item: Fabricante) => item.nombre,
      orden: 1,
    },
    { encabezado: 'R.F.C.', clave: (item: Fabricante) => item.rfc, orden: 2 },
    { encabezado: 'CURP', clave: (item: Fabricante) => item.curp, orden: 3 },
    {
      encabezado: 'Teléfono',
      clave: (item: Fabricante) => item.telefono,
      orden: 4,
    },
    {
      encabezado: 'Correo electrónico',
      clave: (item: Fabricante) => item.correoElectronico,
      orden: 5,
    },
    { encabezado: 'Calle', clave: (item: Fabricante) => item.calle, orden: 6 },
    {
      encabezado: 'Número exterior',
      clave: (item: Fabricante) => item.numeroExterior,
      orden: 7,
    },
    {
      encabezado: 'Número interior',
      clave: (item: Fabricante) => item.numeroInterior,
      orden: 8,
    },
    { encabezado: 'País', clave: (item: Fabricante) => item.pais, orden: 9 },
    {
      encabezado: 'Colonia',
      clave: (item: Fabricante) => item.colonia,
      orden: 10,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (item: Fabricante) => item.municipio,
      orden: 11,
    },
    {
      encabezado: 'Localidad',
      clave: (item: Fabricante) => item.localidad,
      orden: 12,
    },
    {
      encabezado: 'Estado',
      clave: (item: Fabricante) => item.estado,
      orden: 13,
    },
    { encabezado: 'Estado', clave: () => '---', orden: 14 },
    {
      encabezado: 'Código Postal',
      clave: (item: Fabricante) => item.codigoPostal,
      orden: 15,
    },
  ];

  /**
   * Datos de la tabla de fabricantes.
   */
  datosTablaFabricante!: Fabricante[];

  /**
   * Indica si hay filas seleccionadas en la tabla de fabricantes.
   */
  fabricanteTablaSeleccion: boolean = false;

  /**
   * Observable utilizado para limpiar las suscripciones al destruir el componente.
   * Esto ayuda a evitar fugas de memoria.
   */
  private notificadorDestruccion$: Subject<void> = new Subject();

  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
   esFormularioSoloLectura: boolean = false; 

  /**
   * Constructor del componente.
   * solicitudPermisoService Servicio para obtener los datos de destinatarios y fabricantes.
   */
  constructor(private solicitudPermisoService: SolicitudPermisoService, private consultaioQuery: ConsultaioQuery) {
      this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.notificadorDestruccion$),
      map((seccionState) => {
       this.esFormularioSoloLectura = seccionState.readonly;
       
      })
    )
    .subscribe()
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Configura las suscripciones necesarias y carga los datos iniciales.
   */
  ngOnInit(): void {
    this.solicitudPermisoService
      .obtenerDatosDestinatarios()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((destinatario: Destinatario[]) => {
        this.datosTablaDestinatario = destinatario;
      });

    this.solicitudPermisoService
      .obtenerDatosFabricantes()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((fabricante: Fabricante[]) => {
        this.datosTablaFabricante = fabricante;
      });
  }

  /**
   * Maneja la selección de filas en la tabla de destinatarios.
   * filaSeleccionada Lista de destinatarios seleccionados.
   */
  manejarFilaSeleccionadaDestinatario(filaSeleccionada: Destinatario[]): void {
    this.destinatarioTablaSeleccion = filaSeleccionada.length > 0;
  }

  /**
   * Maneja la selección de filas en la tabla de fabricantes.
   * filaSeleccionada Lista de fabricantes seleccionados.
   */
  manejarFilaSeleccionadaFabricante(filaSeleccionada: Fabricante[]): void {
    this.fabricanteTablaSeleccion = filaSeleccionada.length > 0;
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}
