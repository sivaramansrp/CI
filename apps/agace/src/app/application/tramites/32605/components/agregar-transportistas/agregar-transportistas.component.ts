import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { Solicitud32605State } from '../../estados/solicitud32605.store';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { TransportistasTable } from '../../models/solicitud.model';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Decorador que define el componente 'AgregarTransportistasComponent'.
 * Incluye configuración de selector, template, estilos y módulos importados.
 */
@Component({
  selector: 'app-agregar-transportistas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  templateUrl: './agregar-transportistas.component.html',
  styleUrl: './agregar-transportistas.component.scss',
})
/**
 * Decorador que define el componente 'AgregarTransportistasComponent'.
 * Incluye configuración de selector, template, estilos y módulos importados.
 */
export class AgregarTransportistasComponent implements OnInit, OnDestroy {
  /** Formulario reactivo para capturar datos del transportista */
  transportistaCertificacionForm!: FormGroup;

  /** Sujeto utilizado para cancelar suscripciones y evitar fugas de memoria */
  private destroy$: Subject<void> = new Subject<void>();

  /** Estado actual de la solicitud obtenido desde el store */
  solicitud32605State: Solicitud32605State = {} as Solicitud32605State;

  /** Evento que emite los datos del transportista seleccionado al componente padre */
  @Output() transportistasDatos = new EventEmitter<TransportistasTable>();

  /**
   * Constructor del componente. Se inyectan los servicios necesarios para formularios y gestión de estado.
   */
  constructor(
    private fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud32605Store: Solicitud32605Store,
    public solicitud32605Query: Solicitud32605Query
  ) {}

  /**
   * Ciclo de vida ngOnInit: inicializa el formulario y se suscribe al estado de la solicitud.
   */
  ngOnInit(): void {
    this.transportistaCertificacionForm = this.fb.group({
      transportistaRFC: [
        this.solicitud32605State.transportistaRFC,
        [Validators.required, Validators.maxLength(13)],
      ],
      transportistaRFCModifTrans: [
        {
          value: this.solicitud32605State.transportistaRFCModifTrans,
          disabled: true,
        },
        [Validators.maxLength(13)],
      ],
      transportistaRazonSocial: [
        {
          value: this.solicitud32605State.transportistaRazonSocial,
          disabled: true,
        },
        [Validators.maxLength(254)],
      ],
      transportistaDomicilio: [
        {
          value: this.solicitud32605State.transportistaDomicilio,
          disabled: true,
        },
        [Validators.maxLength(300)],
      ],
      transportistaCaat: [
        { value: this.solicitud32605State.transportistaCaat, disabled: true },
        [Validators.maxLength(254)],
      ],
      transportistaIdDomicilio: [
        this.solicitud32605State.transportistaIdDomicilio,
      ],
      transportistaIdRFC: [this.solicitud32605State.transportistaIdRFC],
      transportistaIdRazonSocial: [
        this.solicitud32605State.transportistaIdRazonSocial,
      ],
      transportistaIdCaat: [this.solicitud32605State.transportistaIdCaat],
    });

    /** Se suscribe al estado de la solicitud para mantener sincronizado el formulario */
    this.solicitud32605Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32605State) => {
          this.solicitud32605State = respuesta;
          this.transportistaCertificacionForm.patchValue({
            transportistaRFC: respuesta.transportistaIdRFC,
            transportistaRFCModifTrans: respuesta.transportistaRFCModifTrans,
            transportistaRazonSocial: respuesta.transportistaIdRazonSocial,
            transportistaDomicilio: respuesta.transportistaDomicilio,
            transportistaCaat: respuesta.transportistaCaat,
          });
        })
      )
      .subscribe();
  }

  /**
   * Actualiza el RFC del transportista en el store.
   */
  actualizarTransportistaRFC(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarTransportistaRFC(VALOR);
  }

  /**
   * Actualiza el RFC modificado del transportista en el store.
   */
  actualizarTransportistaRFCModifTrans(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarTransportistaRFCModifTrans(VALOR);
  }

  /**
   * Actualiza la razón social del transportista en el store.
   */
  actualizarTransportistaRazonSocial(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarTransportistaRazonSocial(VALOR);
  }

  /**
   * Actualiza el domicilio del transportista en el store.
   */
  actualizarTransportistaDomicilio(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarTransportistaDomicilio(VALOR);
  }

  /**
   * Actualiza el CAAT del transportista en el store.
   */
  actualizarTransportistaCaat(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarTransportistaCaat(VALOR);
  }

  /**
   * Verifica si un control del formulario es inválido y ha sido tocado.
   * @param id ID del control del formulario
   * @returns booleano que indica si el campo es inválido
   */
  noEsValido(id: string): boolean | undefined {
    const CONTROL = this.transportistaCertificacionForm.get(id);
    return CONTROL?.invalid && CONTROL?.touched;
  }

  /**
   * Ejecuta la búsqueda del transportista si el RFC ha sido ingresado.
   */
  selectBuscarTransportista(): void {
    if (this.transportistaCertificacionForm.get('transportistaRFC')?.value) {
      this.conseguirTransportistasLista();
    }
  }

  /**
   * Llama al servicio para obtener la lista de transportistas y actualiza el store.
   */
  conseguirTransportistasLista(): void {
    this.solicitudService
      .conseguirTransportistasLista()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: TransportistasTable[]) => {
          this.solicitud32605Store.actualizarTransportistaRazonSocial(
            respuesta[0].razonSocial
          );
          this.solicitud32605Store.actualizarTransportistaDomicilio(
            respuesta[0].domicilio
          );
          this.solicitud32605Store.actualizarTransportistaCaat(
            respuesta[0].caat
          );
        },
      });
  }

  /**
   * Prepara un objeto con los datos del transportista y lo emite al componente padre.
   */
  aceptarTransportista(): void {
    const OBJETO_JSON: TransportistasTable = {
      rfc: this.transportistaCertificacionForm.get('transportistaRFCModifTrans')
        ?.value,
      razonSocial: this.transportistaCertificacionForm.get(
        'transportistaRazonSocial'
      )?.value,
      domicilio: this.transportistaCertificacionForm.get(
        'transportistaDomicilio'
      )?.value,
      caat: this.transportistaCertificacionForm.get('transportistaCaat')?.value,
    };
    this.transportistasDatos.emit(OBJETO_JSON);
  }

  /**
   * Ciclo de vida ngOnDestroy: finaliza el observable para prevenir fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
