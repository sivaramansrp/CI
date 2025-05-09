import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EnlaceOperativo } from '../../models/solicitud.model';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { REGEX_TELEFONO_DIGITOS } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { RepresentanteLegal } from '../../models/solicitud.model';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { Solicitud32605State } from '../../estados/solicitud32605.store';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
/**
 * Componente para agregar un enlace operativo.
 * Utiliza un formulario reactivo para capturar y emitir la información del enlace operativo.
 */
@Component({
  selector: 'app-agregar-enlace-operativo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  templateUrl: './agregar-enlace-operativo.component.html',
  styleUrl: './agregar-enlace-operativo.component.scss',
})
/**
 * Componente para agregar un enlace operativo.
 * Utiliza un formulario reactivo para capturar y emitir la información del enlace operativo.
 */
export class AgregarEnlaceOperativoComponent implements OnInit, OnDestroy {
  /** Formulario reactivo para capturar los datos del enlace operativo */
  agregarEnlaceOperativoForm!: FormGroup;

  /** Subject para manejar la destrucción de suscripciones */
  private destroy$: Subject<void> = new Subject<void>();

  /** Estado actual de la solicitud */
  solicitud32605State: Solicitud32605State = {} as Solicitud32605State;

  /** Evento para emitir el objeto EnlaceOperativo al componente padre */
  @Output() agregarEnlaceOperativo = new EventEmitter<EnlaceOperativo>();

  /**
   * Constructor de la clase que inicializa las dependencias necesarias.
   *
   * @param fb - Constructor de formularios reactivos.
   * @param solicitudService - Servicio para obtener y gestionar los datos de la solicitud.
   * @param solicitud32605Store - Store de Akita para el estado de la solicitud 32605.
   * @param solicitud32605Query - Consulta (query) de Akita para acceder al estado de la solicitud 32605.
   */
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud32605Store: Solicitud32605Store,
    public solicitud32605Query: Solicitud32605Query
  ) {}

  /** Inicializa el formulario y suscribe al estado de la solicitud */
  ngOnInit(): void {
    this.agregarEnlaceOperativoForm = this.fb.group({
      agregarEnlaceRfcTercero: [
        this.solicitud32605State.rfcTercero,
        [Validators.required],
      ],
      agregarEnlaceRfc: [
        { value: this.solicitud32605State.rfc, disabled: true },
      ],
      agregarEnlaceNombre: [
        { value: this.solicitud32605State.nombre, disabled: true },
      ],
      agregarEnlaceApellidoPaterno: [
        { value: this.solicitud32605State.apellidoPaterno, disabled: true },
      ],
      agregarEnlaceApellidoMaterno: [
        { value: this.solicitud32605State.apellidoMaterno, disabled: true },
      ],
      agregarEnlaceCiudadEstado: [
        {
          value: this.solicitud32605State.agregarEnlaceCiudadEstado,
          disabled: true,
        },
      ],
      agregarEnlaceCargo: [this.solicitud32605State.agregarEnlaceCargo],
      agregarEnlaceTelefono: [
        this.solicitud32605State.telefono,
        [Validators.required, Validators.pattern(REGEX_TELEFONO_DIGITOS)],
      ],
      agregarEnlaceCorreoElectronico: [
        this.solicitud32605State.correoElectronico,
        [Validators.required, Validators.email],
      ],
      agregarEnlaceSuplente: [this.solicitud32605State.agregarEnlaceSuplente],
    });

    /** Escucha los cambios en el estado de la solicitud y actualiza el formulario */
    this.solicitud32605Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32605State) => {
          this.solicitud32605State = respuesta;
          this.agregarEnlaceOperativoForm.patchValue({
            agregarEnlaceRfcTercero: this.solicitud32605State.rfcTercero,
            agregarEnlaceRfc: this.solicitud32605State.rfc,
            agregarEnlaceNombre: this.solicitud32605State.nombre,
            agregarEnlaceApellidoPaterno:
              this.solicitud32605State.apellidoPaterno,
            agregarEnlaceApellidoMaterno:
              this.solicitud32605State.apellidoMaterno,
            agregarEnlaceCiudadEstado:
              this.solicitud32605State.agregarEnlaceCiudadEstado,
            agregarEnlaceCargo: this.solicitud32605State.agregarEnlaceCargo,
            agregarEnlaceTelefono: this.solicitud32605State.telefono,
            agregarEnlaceCorreoElectronico:
              this.solicitud32605State.correoElectronico,
            agregarEnlaceSuplente:
              this.solicitud32605State.agregarEnlaceSuplente,
          });
        })
      )
      .subscribe();
  }

  /**
   * Llama al servicio para obtener los datos del representante legal
   * y actualiza el estado con esos datos.
   */
  buscarTerceroNacionalIDC(): void {
    if (this.agregarEnlaceOperativoForm.get('rfcTercero')?.value) {
      this.solicitudService
        .conseguirRepresentanteLegalDatos()
        .pipe(takeUntil(this.destroy$))
        .subscribe((respuesta: RepresentanteLegal) => {
          this.solicitud32605Store.actualizarEnlaceRfc(respuesta.rfc);
          this.solicitud32605Store.actualizarEnlaceNombre(respuesta.nombre);
          this.solicitud32605Store.actualizarEnlaceApellidoPaterno(
            respuesta.apellidoPaterno
          );
          this.solicitud32605Store.actualizarEnlaceApellidoMaterno(
            respuesta.apellidoMaterno
          );
          this.solicitud32605Store.actualizarEnlaceTelefono(respuesta.telefono);
          this.solicitud32605Store.actualizarEnlaceCorreoElectronico(
            respuesta.correoElectronico
          );
        });
    }
  }

  /** Actualiza el RFC del tercero en el store */
  actualizarRfcTercero(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarRfcTercero(VALOR);
  }

  /** Actualiza el teléfono en el store */
  actualizarTelefono(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarTelefono(VALOR);
  }

  /** Actualiza el correo electrónico en el store */
  actualizarCorreoElectronico(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarCorreoElectronico(VALOR);
  }

  /** Actualiza el cargo en el store */
  agregarEnlaceCargo(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32605Store.actualizarEnlaceCargo(VALOR);
  }

  /** Actualiza el valor del campo suplente en el store */
  actualizarEnlaceSuplente(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).checked;
    this.solicitud32605Store.actualizarEnlaceSuplente(VALOR);
  }

  /**
   * Construye el objeto EnlaceOperativo con los valores del formulario
   * y lo emite al componente padre.
   */
  aceptarEnlaceSuplente(): void {
    const OBJETO_JSON: EnlaceOperativo = {
      rfc: this.agregarEnlaceOperativoForm.get('agregarEnlaceRfc')?.value,
      nombre: this.agregarEnlaceOperativoForm.get('agregarEnlaceNombre')?.value,
      apellidoPaterno: this.agregarEnlaceOperativoForm.get(
        'agregarEnlaceApellidoPaterno'
      )?.value,
      apellidoMaterno: this.agregarEnlaceOperativoForm.get(
        'agregarEnlaceApellidoMaterno'
      )?.value,
      claveCiudad: '',
      ciudad: this.agregarEnlaceOperativoForm.get('agregarEnlaceCiudadEstado')
        ?.value,
      cargo: this.agregarEnlaceOperativoForm.get('agregarEnlaceCargo')?.value,
      telefono: this.agregarEnlaceOperativoForm.get('agregarEnlaceTelefono')
        ?.value,
      correo: this.agregarEnlaceOperativoForm.get(
        'agregarEnlaceCorreoElectronico'
      )?.value,
      suplente:
        this.agregarEnlaceOperativoForm.get('agregarEnlaceSuplente')?.value ===
        true
          ? 'Maria López'
          : '',
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      colonia: '',
      codigoPostal: '',
      localidad: '',
      delegacionMunicipio: '',
    };
    this.agregarEnlaceOperativo.emit(OBJETO_JSON);
  }

  /**
   * Verifica si un campo del formulario no es válido.
   * @param id Identificador del campo en el formulario.
   * @returns true si el campo es inválido y ha sido tocado, de lo contrario undefined.
   */
  noEsValido(id: string): boolean | undefined {
    const CONTROL = this.agregarEnlaceOperativoForm.get(id);
    return CONTROL?.invalid && CONTROL?.touched;
  }

  /** Finaliza todas las suscripciones para evitar fugas de memoria */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
