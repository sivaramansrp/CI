import { Catalogo, CatalogoSelectComponent, InputFecha, InputFechaComponent, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import {FECHAPAGODATE, FECHA_DE_PAGO } from '../../constantes/pago-de-derechos.enum';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CertificadoZoosanitarioServiceService } from '../../../tramites/220201/services/220201/certificado-zoosanitario.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RadioOpcion } from '../../../tramites/220201/models/220201/certificado-zoosanitario.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  imports: [
       CommonModule,
        TituloComponent,
        ReactiveFormsModule,
        InputFechaComponent,
        CatalogoSelectComponent,
        InputRadioComponent,
        FormsModule
  ],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss',
})
export class PagoDeDerechosComponent {
   /**
     * Configuración predeterminada para el campo de fecha de pago.
     */
    fechaInicioInput: InputFecha = FECHA_DE_PAGO;
  
    /**
     * Lista de opciones para el selector de justificación.
     */
    justificacionSelector: Catalogo[] = [];
  
    /**
     * Bandera para determinar si el formulario está en modo solo lectura.
     */
    esFormularioSoloLectura: boolean = false;
  
    /**
     * Fecha de pago predeterminada que se puede actualizar.
     */
    fechaPagoDate: string = FECHAPAGODATE;
  
    /**
     * Lista de opciones para el selector de banco.
     */
    bancoSelector: Catalogo[] = [];
  
    /**
     * Formulario reactivo que gestiona los campos del pago de derechos.
     */
    pagoForm: FormGroup = this.fb.group({
      exentoPago: [{ value: 'si', disabled: false }, Validators.required],
      justificacion: [{ value: '', disabled: false }, Validators.required],
      claveReferencia: [{ value: '', disabled: true }],
      cadenaDependencia: [{ value: '', disabled: true }],
      banco: [{ value: '', disabled: true }],
      llavePago: [{ value: '', disabled: true }],
      importePago: [{ value: '', disabled: true }]
    });
  
    /**
     * Opciones disponibles para el campo de radio sobre la exención de pago.
     */
    radioOptions: RadioOpcion[] = [
      { label: "No", value: "no" },
      { label: "Sí", value: "si" }
    ];
  
    /**
     * Sujeto para manejar la destrucción de observables y evitar fugas de memoria.
     */
    private destroyNotifier$ = new Subject<void>();
  
    /**
     * Constructor del componente. Inyecta los servicios y realiza una carga inicial de catálogos.
     * @param fb Constructor de formularios reactivos.
     * @param httpServicios Cliente HTTP para peticiones.
     * @param certificadoZoosanitarioServices Servicio para actualizar datos de pago.
     * @param certificadoZoosanitarioQuery Fuente de datos del estado actual de certificado.
     * @param consultaQuery Fuente de datos del estado de consulta.
     */
    constructor(
      private readonly fb: FormBuilder,
      private readonly httpServicios: HttpClient,
      private readonly certificadoZoosanitarioServices: CertificadoZoosanitarioServiceService,
    ) {
  
    }
}
