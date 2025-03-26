import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolicitudService } from '../../service/solicitud.service';
import { map, Subject, takeUntil } from 'rxjs';
import { Solicitud80302State, Tramite80302Store } from '../../../../estados/tramites/tramite80302.store';
import { Tramite80302Query } from '../../../../estados/queries/tramite80302.query';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { DatosDelModificacion } from '../../estados/models/datos-tramite.model';

@Component({
  selector: 'app-modificacion',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TituloComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './modificacion.component.html',
  styleUrl: './modificacion.component.css',
})
export class ModificacionComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private tramite80302Store: Tramite80302Store,
    private tramite80302Query: Tramite80302Query
  ) {}

  /**
   * Grupo de formulario para el formulario de solicitud.
   */
  modificacionForm!: FormGroup;
  public destroyNotifier$: Subject<void> = new Subject();
  public derechoState: Solicitud80302State = {} as Solicitud80302State;

  /**
   * Configuración de las columnas de la tabla.
   */
  public encabezadoDeTabla: ConfiguracionColumna<DatosDelModificacion>[] = [
    { encabezado: '', clave: (ele) => ele.id, orden: 0 },
    { encabezado: 'Calle', clave: (ele) => ele.calle, orden: 1 },
    {
      encabezado: 'Número Exterior',
      clave: (ele) => ele.numeroExterior,
      orden: 2,
    },
    {
      encabezado: 'Número Interior',
      clave: (ele) => ele.numeroInterior,
      orden: 3,
    },
    {
      encabezado: 'Código Postal',
      clave: (ele) => ele.codigoPosta,
      orden: 4,
    },
    { encabezado: 'Colonia', clave: (ele) => ele.colonia, orden: 5 },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (ele) => ele.municipioOAlcaldia,
      orden: 6,
    },
    {
      encabezado: 'Entidad Federativa',
      clave: (ele) => ele.entidadFederativa,
      orden: 7,
    },
    { encabezado: 'País', clave: (ele) => ele.pais, orden: 8 },
    {
      encabezado: 'Registro Federal de Contribuyentes',
      clave: (ele) => ele.rfc,
      orden: 9,
    },
    {
      encabezado: 'Domicilio fiscal del solicitante',
      clave: (ele) => ele.domicilioFiscal,
      orden: 10,
    },
    {
      encabezado: 'Razón Social',
      clave: (ele) => ele.razonSocial,
      orden: 11,
    },
    {
      encabezado: 'Estatus',
      clave: (ele) => ele.desEstatus,
      orden: 12,
    },
  ];

  /**
   * Define los datos que se mostrarán en la tabla dinámica.
   */
  datosTabla: any[] = [];

  ngOnInit(): void {
    this.tramite80302Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.derechoState = {
            ...this.derechoState,
            ...seccionState,
          };
        })
      )
      .subscribe();
    this.inicializarFormulario();
    this.loadDatosModificacion();
    this.loadDatosTablaData();
  }

  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Notifica a todos los observables que deben completarse y limpia las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica a todos los observables que deben completar.
    this.destroyNotifier$.unsubscribe(); // Cancela cualquier suscripción activa.
  }

  inicializarFormulario(): void {
    this.modificacionForm = this.fb.group({
      rfc: [this.derechoState?.datosModificacion?.rfc, []],
      federal: [this.derechoState?.datosModificacion?.federal, []],
      tipo: [this.derechoState?.datosModificacion?.tipo, []],
      programa: [this.derechoState?.datosModificacion?.programa, []],
    });
  }

  loadDatosModificacion(): void {
    this.solicitudService
      .getDatosModificacion()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos) => {
        (
          this.tramite80302Store.setDatosModificacion as (
            valor: unknown
          ) => void
        )(datos);
        this.setFormValues();
      });
  }

  /**
   * Cargar datos de la tabla.
   *
   * Este método obtiene los datos de la tabla desde el servicio `datosTramiteService`
   * y los almacena en la propiedad `datosTabla`. Utiliza `takeUntil` para cancelar la suscripción
   * cuando el componente se destruye, evitando fugas de memoria.
   *
   * @example
   * // Llamar al método para cargar los datos de la tabla
   * this.loadDatosTablaData();
   */
  loadDatosTablaData(): void {
    this.solicitudService
      .getDatosTableData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.datosTabla = data;
      });
  }

  setFormValues(): void {
    this.modificacionForm
      .get('rfc')
      ?.setValue(this.derechoState?.datosModificacion?.rfc);
    this.modificacionForm
      .get('federal')
      ?.setValue(this.derechoState?.datosModificacion?.federal);
    this.modificacionForm
      .get('tipo')
      ?.setValue(this.derechoState?.datosModificacion?.tipo);
    this.modificacionForm
      .get('programa')
      ?.setValue(this.derechoState?.datosModificacion?.programa);
  }

  /**
   * Establecer valores en el store del trámite.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo.
   * @param metodoNombre Nombre del método en el store.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite80302Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite80302Store[metodoNombre] as (valor: unknown) => void)(VALOR);
  }
}
