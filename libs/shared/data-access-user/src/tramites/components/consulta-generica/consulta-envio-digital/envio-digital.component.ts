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
   * Variable para almacenar el folio
   */
  public folio!: string;    
  envioDigitalForm!: FormGroup;
  public unsubscribe$ = new Subject<void>();
    /**
     * Subject para notificar la destrucción del componente.
     */
    public destroyNotifier$: Subject<void> = new Subject();
    /**
     * Implementación para la tabla de documentos de requerimientos.
     *
     */
  
  constructor(private fb: FormBuilder, private folioQuery: FolioQuery, private envioDigitalService: EnviosDigitalesService) {
      /**
       * * Se inyecta el FormBuilder para crear el formulario de envio digital
       * * Se inyecta el FolioQuery para recuperar el folio desde el store
       * * Se inyecta el CommonModule para usar las directivas de Angular
       * * Se inyecta el ReactiveFormsModule para usar los formularios reactivos
       * * Se inyecta el Validators para validar los campos del formulario  
       * * Se inyecta el HeaderTablaEnvioDigital y BodyTablaEnvioDigital para crear la tabla de envio digital
       * * Se inyecta el CONSULTA_ENVIODIGITAL para crear la tabla de envio digital
       * 
       */
    }

  ngOnInit(): void {
    this.crearEnvioDigitalFormForm();
    /**
     * Recuperar el folio desde el store
     */
    this.folioQuery.getFolio().subscribe(folio => {
      this.folio = folio || '';
    });
    /**
     * Llamar al método para obtener los envios con estado envio al inicializar el componente
     */
    this.getListaEnviosDigitales();
    /**
     * Llamar al método para obtener los envios con estado revisión al inicializar el componente
     */
    this.getListaRevisionDigitales();
  }
  /**
       * Implementación para la tabla Estado de envio.
       *
       */
      readonly encabezadoTablaDigital : HeaderTablaEnvioDigital[] = CONSULTA_ENVIODIGITAL.encabezadoTablaEnvioDigital;  
      /**
         * Variable para almacenar los documentos con estado de envio.
         */
      datosTablaDigital: BodyTablaEnvioDigital[] = [];

      /**
         * Variable para almacenar los documentos con estado de envio.
         */
      datosTablaDigitalRevision: BodyTablaEnvioDigital[] = [];

  /**
     * Crea el formulario para envio Digital
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
       * Método para obtener los envios digitales en estado en envío desde el servicio.
       * unsubscribe$ - Subject para manejar la cancelación de suscripciones.
       * suscribe - Se suscribe al observable del servicio para obtener los datos.
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
       * Método para obtener los envios digitales en estado de revisión desde el servicio.
       * unsubscribe$ - Subject para manejar la cancelación de suscripciones.
       * suscribe - Se suscribe al observable del servicio para obtener los datos.
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
       * Método `ngOnDestroy()`.
       * Este método se ejecuta cuando el componente se destruye y realiza las siguientes acciones:
       * - Desuscribe la suscripción a los cambios en el formulario reactivo.
       *
       * @memberof EnvioDigitalComponent
       */
      ngOnDestroy(): void {
        this.destroyNotifier$.next();
        this.destroyNotifier$.complete();
      }
}