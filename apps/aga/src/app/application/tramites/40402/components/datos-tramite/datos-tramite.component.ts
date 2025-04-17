import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { Tramite40402Service } from '../../estados/tramite40402.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-datos-tramite',
  templateUrl: './datos-tramite.component.html',
  styleUrls: ['./datos-tramite.component.scss'],
})
export class DatosTramiteComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo utilizado para capturar los datos del trámite.
   */
  formulario!: FormGroup;
  /**
   * Lista de códigos de transportación obtenidos desde el servicio.
   */
  codigoTransportacion: unknown[] = [];
  /**
   * Lista de tipos de CAAT aéreo obtenidos desde el servicio.
   */
  tipoCaatAereo: unknown[] = [];
  /**
   * Catálogo de tipos de CAAT aéreo.
   */
  public tipoDeCaatAerea!: Catalogo[];
  /**
   * Catálogo de códigos de transportación aérea.
   */
  public ideCodTransportacionAerea!: Catalogo[];
  /**
   * Notificador para gestionar la destrucción de suscripciones activas.
   */

  private destroyNotifier$ = new Subject<void>();
  /**
   * Constructor del componente.
   * @param fb - FormBuilder para inicializar el formulario reactivo.
   * @param tramite40402Service - Servicio para interactuar con la API relacionada con el trámite.
   */

  constructor(
    private fb: FormBuilder,
    private tramite40402Service: Tramite40402Service
  ) {}
  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarCodigoTransportacion();
    this.cargarTipoCaatAereo();
    this.tipoDeCaatAereaData();
    this.ideCodTransportacionAereaData();
  }
  /**
   * Inicializa el formulario reactivo con los campos necesarios.
   */

  private inicializarFormulario(): void {
    this.formulario = this.fb.group({
      idSolicitud: [''],
      idPersonaSolicitud: [''],
      ideGenerica1: [''],
      claveFolioCAAT: ['', [Validators.required, Validators.maxLength(4)]],
      cveFolioCaat: [''],
      descripcionTipoCaat: [''],
      tipoDeCaatAerea: [],
      ideCodTransportacionAerea: [],
      codIataIcao: [''],
      fechaInicioVigencia: [''],
      fechaFinVigencia: [''],
    });
  }
  /**
   * Obtiene un FormArray de solicitudes CAAT del formulario.
   */

  get caatSolicitudes(): FormArray {
    return this.formulario.get('solicitud.caatSolicitudes') as FormArray;
  }
  /**
   * Convierte el valor del campo `claveFolioCAAT` a mayúsculas.
   * @param event - Evento que contiene el valor ingresado por el usuario.
   */
  caatConMayusculas(event: any): void {
    const VALOR = event.target.value;
    this.formulario.get('claveFolioCAAT')?.setValue(VALOR.toUpperCase());
  }
  /**
   * Carga los códigos de transportación desde el servicio.
   */

  public cargarCodigoTransportacion(): void {
    this.tramite40402Service
      .geTideCodTransportacionAerea()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos) => {
        this.codigoTransportacion = datos;
      });
  }
  /**
   * Carga los tipos de CAAT aéreo desde el servicio.
   */
  public cargarTipoCaatAereo(): void {
    this.tramite40402Service
      .getTipoDeCaatAerea ()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos) => {
        this.tipoCaatAereo = datos;
      });
  }
  /**
   * Marca todos los controles del formulario como tocados para mostrar errores.
   * @param formGroup - Grupo de formulario a marcar como tocado.
   */
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
  /**
   * Busca una solicitud utilizando el valor de `claveFolioCAAT` proporcionado en el formulario.
   */
  buscarSolicitudPorCAAT(): void {
    if (this.formulario.valid) {
      const CLAVE_FOLIO = this.formulario.get('claveFolioCAAT')?.value;
      this.tramite40402Service
        .buscarSolicitudPorCAATe(CLAVE_FOLIO)
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((respuesta) => {
          if (respuesta) {
            this.formulario.patchValue({
              idSolicitud: respuesta.idSolicitud || '',
              idPersonaSolicitud: respuesta.idPersonaSolicitud || '',
              ideGenerica1: respuesta.ideGenerica1 || '',
              claveFolioCAAT: respuesta.claveFolioCAAT || '',
              cveFolioCaat: respuesta.cveFolioCaat || '',
              descripcionTipoCaat: respuesta.descripcionTipoCaat || '',
              tipoDeCaatAerea: respuesta.tipoDeCaatAerea || '',
              ideCodTransportacionAerea:
                respuesta.ideCodTransportacionAerea || '',
              codIataIcao: respuesta.codIataIcao || '',
              fechaInicioVigencia: respuesta.fechaInicioVigencia || '',
              fechaFinVigencia: respuesta.fechaFinVigencia || '',
            });
          }
        });
    }
  }
  /**
   * Carga los datos del catálogo de tipos de CAAT aéreo desde el servicio.
   */

  tipoDeCaatAereaData(): void {
    this.tramite40402Service
      .getTipoDeCaatAerea ()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.tipoDeCaatAerea = data;
      });
  }
  /**
   * Carga los datos del catálogo de códigos de transportación aérea desde el servicio.
   */
  ideCodTransportacionAereaData(): void {
    this.tramite40402Service
      .geTideCodTransportacionAerea()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.ideCodTransportacionAerea = data;
      });
  }
  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
