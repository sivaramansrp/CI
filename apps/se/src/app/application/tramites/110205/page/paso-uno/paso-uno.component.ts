/**
 * @component PasoUnoComponent
 * @description Este componente es responsable de manejar el primer paso del trámite.
 * Incluye la lógica para seleccionar una pestaña y actualizar el índice.
 * 
 * @import { Component } from '@angular/core';
 */

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { CertificadoOrigenComponent } from '../../components/certificado-origen/certificado-origen.component';
import { PeruCertificadoService } from '../../services/peru-certificado.service';
import { PeruDestinatarioComponent } from '../../components/peru-destinatario/peru-destinatario.component';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * @property {number} indice - El índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Subject utilizado como notificador para destruir las suscripciones activas
   * Se utiliza junto con el operador takeUntil en las suscripciones de RxJS.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * @property {PeruDestinatarioComponent} peruDestinatarioComponent
   * @description Referencia al componente hijo `PeruDestinatarioComponent` mediante ViewChild.
   * Permite acceder a los métodos y propiedades del formulario del destinatario desde el componente padre.
   */
  @ViewChild(PeruDestinatarioComponent) peruDestinatarioComponent?: PeruDestinatarioComponent;
  /**
   * Referencia al componente SolicitanteComponent mediante ViewChild.
   * Se utiliza para invocar métodos o acceder a propiedades del componente hijo.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * @property {CertificadoOrigenComponent} certificadoOrigen
   * @description
   * Referencia al componente hijo `CertificadoOrigenComponent` mediante ViewChild.
   * Permite acceder a los métodos y propiedades del formulario de certificado de origen desde el componente padre.
   */
  @ViewChild('CertificadoOrigen') certificadoOrigen!: CertificadoOrigenComponent;

  /**
   * @property {DatosCertificadoComponent} datosCertificado
   * @description
   * Referencia al componente hijo `DatosCertificadoComponent` mediante ViewChild.
   * Permite acceder a los métodos y propiedades del formulario de datos del certificado desde el componente padre.
   */
  @ViewChild('DatosCertificado') datosCertificado!: PeruDatosCertificadoComponent;

  /**
   * @constructor
   * @param {ConsultaioQuery} consultaQuery - Servicio para consultar el estado del trámite.
   * @param {PeruCertificadoService} peruCertificadoService - Servicio para gestionar los datos del certificado de Perú.
   * Inicializa las dependencias necesarias para el componente.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    public peruCertificadoService: PeruCertificadoService
  ) {}

  /**
   * @method ngOnInit
   * @description Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al estado del trámite y, si corresponde, carga los datos del formulario.
   * Si no se requiere actualización, habilita la visualización de los datos de respuesta.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();
    if (
      this.consultaState &&
      this.consultaState.procedureId === '110205' &&
      this.consultaState.update
    ) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Delegates validation to PeruDestinatarioComponent
   */
  public validateAllForms(): boolean {
    return this.peruDestinatarioComponent?.validateAllForms() ?? true;
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.peruCertificadoService
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.peruCertificadoService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * @method seleccionaTab
   * @description Selecciona una pestaña y actualiza el índice.
   * @param {number} i - El índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * @method validarFormularios
   * @description
   * Valida todos los formularios del paso uno: solicitante, certificado de origen y datos del certificado.
   * Marca los controles como tocados si algún formulario es inválido para mostrar los errores de validación.
   * Retorna `true` si todos los formularios son válidos, de lo contrario retorna `false`.
   *
   * @returns {boolean} Indica si todos los formularios del paso uno son válidos.
   */
  public validarFormularios(): boolean {
    let isValid = true;

    if (this.solicitante?.form) {
      if (this.solicitante.form.invalid) {
        this.solicitante.form.markAllAsTouched();
        isValid = false;
      }
    } else {
      isValid = false;
    }

    if (this.certificadoOrigen) {
      if (!this.certificadoOrigen.validarFormulario()) {
        isValid = false;
      }
    } else {
      isValid = false;
    }

    if (this.datosCertificado) {
      if (!this.datosCertificado.validateAll()) {
        isValid = false;
      }
    } else {
      isValid = false;
    }

    console.log('isValid', isValid, this.solicitante, this.certificadoOrigen, this.datosCertificado);

    return isValid;
  }

  /**
   * @method ngOnDestroy
   * @description Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Utiliza el Subject `destroyNotifier$` para notificar la destrucción y completar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}