import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { REGEX_DESCRIPCION_ESPECIALES } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

import { REG_X } from '@libs/shared/data-access-user/src';

import { TituloComponent } from '@libs/shared/data-access-user/src';

import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';

import { Tramite110218Query } from '../../estados/queries/tramite110218.query';

import { Solicitud110218State, Tramite110218Store } from '../../estados/tramites/tramite110218.store';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente para manejar los datos del destinatario para el certificado técnico de Japón.
 *
 * Este componente permite a los usuarios introducir y visualizar los datos del destinatario,
 * incluyendo información personal y de contacto.
 */
@Component({
  selector: 'app-destinatario',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './destinatario.component.html',
  styleUrls: ['./destinatario.component.scss'],
})
export class DestinatarioComponent implements OnInit, OnDestroy {
  /**
   * Formulario para los datos personales del destinatario.
   * Contiene campos como nombre, apellidos, número de registro fiscal y razón social.
   */
  datosDelDestinatario!: FormGroup;

  /**
   * Formulario para el domicilio del destinatario.
   * Contiene campos como calle, número, ciudad, correo electrónico, fax y teléfono.
   */
  domicilioDelDestinatario!: FormGroup;

  /**
   * Estado seleccionado del trámite 110218.
   * Contiene los valores actuales almacenados en el estado global.
   */
  estadoSeleccionado!: Solicitud110218State;

  /**
   * Subject utilizado para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   *
   * formBuilder - Constructor de formularios reactivos.
   * tramite110218Store - Store para manejar el estado del trámite 110218.
   * tramite110218Query - Query para consultar el estado del trámite 110218.
   * service - Servicio para obtener datos del destinatario.
   */
  constructor(
    public formBuilder: FormBuilder,
    private tramite110218Store: Tramite110218Store,
    private tramite110218Query: Tramite110218Query,
    private service: CertificadoTecnicoJaponService
  ) {}

  /**
   * Crea el formulario para los datos personales del destinatario.
   * Los campos incluyen nombre, apellidos, número de registro fiscal y razón social.
   */
  crearFormularioDatosDelDestinatario(): void {
    this.datosDelDestinatario = this.formBuilder.group({
      /**
       * Nombre del destinatario.
       * Campo obligatorio, solo permite letras y espacios.
       */
      nombre: [
        this.estadoSeleccionado?.nombre,
        [Validators.required, Validators.pattern(REGEX_DESCRIPCION_ESPECIALES)],
      ],
      /**
       * Primer apellido del destinatario.
       * Campo obligatorio, solo permite letras y espacios.
       */
      primerApellido: [
        this.estadoSeleccionado?.primerApellido,
        [Validators.required, Validators.pattern(REGEX_DESCRIPCION_ESPECIALES)],
      ],
      /**
       * Segundo apellido del destinatario.
       * Campo de solo lectura.
       */
      segundoApellido: [{ value: '', disabled: true }],
      /**
       * Número de registro fiscal del destinatario.
       * Campo obligatorio, solo permite números.
       */
      numeroderegistroFiscal: [
        this.estadoSeleccionado?.numeroderegistroFiscal,
        [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)],
      ],
      /**
       * Razón social del destinatario.
       * Campo obligatorio.
       */
      razonSocial: [this.estadoSeleccionado?.razonSocial, [Validators.required]],
    });
  }

  /**
   * Crea el formulario para el domicilio del destinatario.
   * Los campos incluyen calle, número, ciudad, correo electrónico, fax y teléfono.
   */
  crearFormularioDomicilioDelDestinatario(): void {
    this.domicilioDelDestinatario = this.formBuilder.group({
      /**
       * Calle del domicilio del destinatario.
       * Campo obligatorio.
       */
      calle: [this.estadoSeleccionado?.calle, Validators.required],
      /**
       * Número o letra del domicilio del destinatario.
       * Campo obligatorio.
       */
      numeroLetra: [this.estadoSeleccionado?.numeroLetra, Validators.required],
      /**
       * Ciudad del domicilio del destinatario.
       * Campo obligatorio.
       */
      ciudad: [this.estadoSeleccionado?.ciudad, Validators.required],
      /**
       * Correo electrónico del destinatario.
       * Campo obligatorio, debe ser un correo válido.
       */
      correoElectronico: [
        this.estadoSeleccionado?.correoElectronico,
        [Validators.required, Validators.email],
      ],
      /**
       * Fax del destinatario.
       * Campo obligatorio, solo permite números.
       */
      fax: [
        this.estadoSeleccionado?.fax,
        [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)],
      ],
      /**
       * Teléfono del destinatario.
       * Campo obligatorio, solo permite números.
       */
      telefono: [
        this.estadoSeleccionado?.telefono,
        [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)],
      ],
    });
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Obtiene los datos necesarios y configura los formularios.
   */
  ngOnInit(): void {
    this.obtenerDatosDeTabla();
    this.getValorStore();
    this.crearFormularioDatosDelDestinatario();
    this.crearFormularioDomicilioDelDestinatario();
  }

  /**
   * Obtiene los datos del destinatario desde el servicio.
   * Actualiza el campo "segundoApellido" en el formulario con los datos obtenidos.
   */
  obtenerDatosDeTabla(): void {
    this.service
      .getdestinatario()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: { segundoApellido: string }) => {
        this.datosDelDestinatario.patchValue({
          segundoApellido: data.segundoApellido,
        });
      });
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Libera las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Actualiza un valor específico en el store del trámite.
   *
   * FormGroup - Formulario reactivo.
   * control - Nombre del control cuyo valor se actualizará en el store.
   */
  setValorStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite110218Store.setTramite110218State({
      [control]: VALOR,
    });
  }

  /**
   * Obtiene el estado actual del trámite desde el store.
   * Suscribe al observable del estado y actualiza la propiedad `estadoSeleccionado`.
   */
  getValorStore(): void {
    this.tramite110218Query.selectTramite110218State$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.estadoSeleccionado = data;
      });
  }
}