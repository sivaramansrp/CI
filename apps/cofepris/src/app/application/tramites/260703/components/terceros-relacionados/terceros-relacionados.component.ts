import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Destinatario, Fabricante } from '../../model/solicitud-permiso.model';
import { Subject, takeUntil } from 'rxjs';
import { SolicitudPermisoService } from '../../services/solicitud-permiso.service';

@Component({
  selector: 'app-terceros-relacionados',
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.css',
})
export class TercerosRelacionadosComponent implements OnInit, OnDestroy {

  /**
   * Tipo de selección de la tabla (por ejemplo, selección por checkbox).
   */
  tipoSeleccionTabla: TablaSeleccion = TablaSeleccion.CHECKBOX;

  configuiracionTablaDestinatario: ConfiguracionColumna<Destinatario>[] = [
    {
      encabezado: 'Nombre/denominación o razón social',
      clave: (item: Destinatario) => item.nombre,
      orden: 1,
    },
    { encabezado: 'RFC', clave: (item: Destinatario) => item.rfc, orden: 2 },
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
    { encabezado: 'Estado', clave: (item: Destinatario) => '---', orden: 14 },
    {
      encabezado: 'Código Postal',
      clave: (item: Destinatario) => item.codigoPostal,
      orden: 15,
    },
  ];
  datosTablaDestinatario!: Destinatario[];
  destinatarioTablaSeleccion: boolean = false;

  configuiracionTablaFabricante: ConfiguracionColumna<Fabricante>[] = [
    {
      encabezado: 'Nombre/denominación o razón social',
      clave: (item: Fabricante) => item.nombre,
      orden: 1,
    },
    { encabezado: 'RFC', clave: (item: Fabricante) => item.rfc, orden: 2 },
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
    { encabezado: 'Estado', clave: (item: Fabricante) => '---', orden: 14 },
    {
      encabezado: 'Código Postal',
      clave: (item: Fabricante) => item.codigoPostal,
      orden: 15,
    },
  ];
  datosTablaFabricante!: Fabricante[];
  fabricanteTablaSeleccion: boolean = false;

  /**
   * Observable utilizado para limpiar las suscripciones al destruir el componente.
   * Esto ayuda a evitar fugas de memoria.
   */
  private notificadorDestruccion$: Subject<void> = new Subject();

  constructor(private solicitudPermisoService: SolicitudPermisoService) {
    //
  }

  ngOnInit(): void {
    this.solicitudPermisoService.obtenerDatosDestinatarios()
    .pipe(takeUntil(this.notificadorDestruccion$))
    .subscribe((destinatario: Destinatario[]) => {
      this.datosTablaDestinatario = destinatario
    });

    this.solicitudPermisoService.obtenerDatosFabricantes()
    .pipe(takeUntil(this.notificadorDestruccion$))
    .subscribe((fabricante: Fabricante[]) => {
      this.datosTablaFabricante = fabricante
    });
  }

  manejarFilaSeleccionadaDestinatario(filaSeleccionada: Destinatario[]): void {
    this.destinatarioTablaSeleccion = filaSeleccionada.length > 0;
  }

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
