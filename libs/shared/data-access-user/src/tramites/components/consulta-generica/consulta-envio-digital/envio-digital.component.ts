import { BodyTablaEnvioDigital, HeaderTablaEnvioDigital } from '../../../../core/models/shared/consulta-generica.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CONSULTA_ENVIODIGITAL } from '../../../../core/enums/consulta-generica.enum';
import { CommonModule } from '@angular/common';
import { EnviosDigitalesService } from '../../../../core/services/consultagenerica/envio-digital-service';
import { FolioQuery } from '../../../../core/queries/folio.query';

@Component({
  selector: 'lib-envio-digital',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './envio-digital.component.html',
  styleUrl: './envio-digital.component.scss',
})
export class EnvioDigitalComponent implements OnInit, OnDestroy {
  /**
   * Variable para almacenar el folio recuperado desde el store.
   * @type {string}
   */
  public folio!: string;

  /**
   * Formulario reactivo para el envío digital.
   * @type {FormGroup}
   */
  public envioDigitalForm!: FormGroup;

  /**
   * Subject utilizado para manejar la cancelación de suscripciones.
   * @type {Subject<void>}
   */
  public unsubscribe$ = new Subject<void>();

  /**
   * Encabezado de la tabla de envíos digitales.
   * Contiene las columnas que se mostrarán en la tabla.
   * @type {HeaderTablaEnvioDigital[]}
   */
  readonly encabezadoTablaDigital: HeaderTablaEnvioDigital[] = CONSULTA_ENVIODIGITAL.encabezadoTablaEnvioDigital;

  /**
   * Datos de la tabla de envíos digitales en estado de envío.
   * Contiene los registros que se mostrarán en la tabla.
   * @type {BodyTablaEnvioDigital[]}
   */
  public datosTablaDigital: BodyTablaEnvioDigital[] = [];

  /**
   * Datos de la tabla de envíos digitales en estado de revisión.
   * Contiene los registros que se mostrarán en la tabla.
   * @type {BodyTablaEnvioDigital[]}
   */
  public datosTablaDigitalRevision: BodyTablaEnvioDigital[] = [];

  /**
   * Constructor de la clase EnvioDigitalComponent.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param folioQuery Consulta del folio desde el store.
   * @param envioDigitalService Servicio para obtener los datos de envíos digitales.
   */
  constructor(
    private fb: FormBuilder,
    private folioQuery: FolioQuery,
    private envioDigitalService: EnviosDigitalesService
  ) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Configura el formulario reactivo, recupera el folio y obtiene los datos de envíos digitales.
   */
  ngOnInit(): void {
    /** 
     * Crear el formulario reactivo para el envío digital.
     */
    this.crearEnvioDigitalFormForm();

    /** 
     * Recuperar el folio desde el store.
     */
    this.folioQuery.getFolio().subscribe((folio) => {
      this.folio = folio || '';
    });

    /** 
     * Llamar al método para obtener los envíos digitales en estado de envío.
     */
    this.getListaEnviosDigitales();

    /** 
     * Llamar al método para obtener los envíos digitales en estado de revisión.
     */
    this.getListaRevisionDigitales();
  }

  /**
   * Crea el formulario para el envío digital.
   * @returns {void}
   */
  crearEnvioDigitalFormForm(): void {
    this.envioDigitalForm = this.fb.group({
      tipoDocumento: [
        { value: '', disabled: true },
        [Validators.required, Validators.maxLength(250)],
      ],
      pais: [
        { value: '', disabled: true },
        [Validators.required, Validators.maxLength(250)],
      ],
      numero: [
        { value: '', disabled: true },
        [Validators.required, Validators.maxLength(250)],
      ],
    });
  }

  /**
   * Método para obtener los envíos digitales en estado de envío desde el servicio.
   * Se suscribe al observable del servicio para obtener los datos.
   * @returns {void}
   */
  getListaEnviosDigitales(): void {
    this.envioDigitalService
      .getEnvioDigital()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.datosTablaDigital = data;
      });
  }

  /**
   * Método para obtener los envíos digitales en estado de revisión desde el servicio.
   * Se suscribe al observable del servicio para obtener los datos.
   * @returns {void}
   */
  getListaRevisionDigitales(): void {
    this.envioDigitalService
      .getRevisionDigital()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.datosTablaDigitalRevision = data;
      });
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente se destruye.
   * Cancela todas las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}