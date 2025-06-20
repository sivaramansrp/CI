import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Tramite140205State,
  Tramite140205Store,
} from '../../../../estados/tramites/tramite140205.store';
import {map, takeUntil} from 'rxjs';
import { CancelacionCertificadosService } from '../../services/cancelacionCertificados.service';
import { ReplaySubject } from 'rxjs';
import {Subject } from 'rxjs';
import { Tramite140205Query } from '../../../../estados/queries/tramite140205.query';



/**
 * @component
 * @name DatosEmpresaComponent
 * @description
 * Componente encargado de gestionar los datos de la empresa en el formulario de solicitud.
 * Este componente utiliza un formulario reactivo para capturar y validar la información de la empresa.
 *
 * @selector datos-empresa
 * @templateUrl ./datos-empresa.component.html
 * @styleUrl ./datos-empresa.component.scss
 * @standalone true
 * @imports [TituloComponent, ReactiveFormsModule]
 */
@Component({
  selector: 'datos-empresa',
  templateUrl: './datos-empresa.component.html',
  styleUrl: './datos-empresa.component.scss',
  standalone: true,
  imports: [TituloComponent, ReactiveFormsModule],
})
export class DatosEmpresaComponent implements OnInit, OnDestroy {

    /**
     * Subject para destruir notificador.
     */
    consultaDatos!: ConsultaioState;
    /**
     * Indica si el formulario está en modo solo lectura.
     * Cuando es `true`, los campos del formulario no se pueden editar.
     */
    soloLectura: boolean = false;
  
    
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  /**
   * @property {FormGroup} solicitudForm
   * @description Grupo de formulario para gestionar los datos de la solicitud.
   */
  solicitudForm!: FormGroup;

  /**
   * @property {boolean} mostrarDatosGenerales
   * @description Indica si se deben mostrar los datos generales de la empresa.
   */
  mostrarDatosGenerales: boolean = false;

  /**
   * @property {Tramite140205State} solicitudState
   * @description Estado actual de la solicitud.
   */
  public solicitudState!: Tramite140205State;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Notificador para destruir las suscripciones y evitar fugas de memoria.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * @constructor
   * @description Constructor del componente. Inicializa los servicios necesarios.
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {Tramite140205Store} store - Store para gestionar el estado de la solicitud.
   * @param {Tramite140205Query} query - Query para obtener el estado de la solicitud.
   * @param {CancelacionCertificadosService} validacionesService - Servicio para validaciones adicionales.
   */
  constructor(
    private fb: FormBuilder,
    private store: Tramite140205Store,
    private query: Tramite140205Query,
    private validacionesService: CancelacionCertificadosService,
     private consultaioQuery: ConsultaioQuery
  ) {}

  /**
   * @method ngOnInit
   * @description Método que se ejecuta al inicializar el componente.
   * Configura las suscripciones y el formulario inicial.
   */
  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.initImpresaDatosFormulario();

       this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarFormulario();
        })
      )
      .subscribe();
  }


    /**
   * Destruye el componente y libera recursos.
   *
   * Este método se llama cuando el componente se destruye, asegurando que no queden suscripciones activas.
   */
  inicializarFormulario(): void {
    if (this.soloLectura) {
      this.solicitudForm.disable();
       this.mostrarDatosGenerales = true;

    } else {
      this.solicitudForm.enable();
    }
  }
  /**
   * @method buscarEmpresa
   * @description Método para habilitar la visualización de los datos generales de la empresa.
   */
  buscarEmpresa(): void {
    this.mostrarDatosGenerales = true;
  }

  /**
   * @method grupoEmpresa
   * @description Getter para obtener el grupo de formulario relacionado con los datos de la empresa.
   * @returns {FormGroup} Grupo de formulario de la empresa.
   */
  get grupoEmpresa(): FormGroup {
    return this.solicitudForm.get('grupoEmpresa') as FormGroup;
  }

  /**
   * @method initImpresaDatosFormulario
   * @description Inicializa el formulario reactivo con los datos de la empresa.
   */
  initImpresaDatosFormulario(): void {
    this.solicitudForm = this.fb.group({
      grupoEmpresa: this.fb.group({
        rfc: [
          this.solicitudState?.grupoEmpresa?.rfc,
          [Validators.required, Validators.minLength(12)],
        ],
        nombre: [
          this.solicitudState?.grupoEmpresa?.nombre,
          [Validators.required, Validators.minLength(3)],
        ],
        primerApellido: [
          this.solicitudState?.grupoEmpresa?.primerApellido,
          [Validators.required, Validators.minLength(3)],
        ],
        segundoApellido: [
          this.solicitudState?.grupoEmpresa?.segundoApellido,
          [Validators.required, Validators.minLength(3)],
        ],
        actividadEconomica: [
          this.solicitudState?.grupoEmpresa?.actividadEconomica,
          [Validators.required, Validators.minLength(3)],
        ],
        datosRfc: [
          this.solicitudState?.grupoEmpresa?.datosRfc,
          [Validators.required, Validators.minLength(3)],
        ],
        clave: [
          this.solicitudState?.grupoEmpresa?.clave,
          [Validators.required, Validators.minLength(3)],
        ],
        correo: [
          this.solicitudState?.grupoEmpresa?.correo,
          [Validators.required, Validators.email],
        ],
        calle: [
          this.solicitudState?.grupoEmpresa?.calle,
          [Validators.required, Validators.minLength(3)],
        ],
        numeroExterior: [
          this.solicitudState?.grupoEmpresa?.numeroExterior,
          [Validators.required, Validators.minLength(1)],
        ],
        numeroInterior: [
          this.solicitudState?.grupoEmpresa?.numeroInterior,
          [Validators.required, Validators.minLength(1)],
        ],
        codigoPostal: [
          this.solicitudState?.grupoEmpresa?.codigoPostal,
          [Validators.required, Validators.minLength(5)],
        ],
        colonia: [
          this.solicitudState?.grupoEmpresa?.colonia,
          [Validators.required, Validators.minLength(3)],
        ],
        pais: [
          this.solicitudState?.grupoEmpresa?.pais,
          [Validators.required, Validators.minLength(3)],
        ],
        estado: [
          this.solicitudState?.grupoEmpresa?.estado,
          [Validators.required, Validators.minLength(3)],
        ],
        localidad: [
          this.solicitudState?.grupoEmpresa?.localidad,
          [Validators.required, Validators.minLength(3)],
        ],
        municipio: [
          this.solicitudState?.grupoEmpresa?.municipio,
          [Validators.required, Validators.minLength(3)],
        ],
        telefono: [
          this.solicitudState?.grupoEmpresa?.telefono,
          [Validators.required, Validators.minLength(10)],
        ],
      }),
      
    });
    this.inicializarFormulario();
  }

  /**
   * @method setValoresStore
   * @description Actualiza el estado del store con el valor seleccionado en el formulario.
   * @param {FormGroup} form - El formulario reactivo.
   * @param {string} campo - El nombre del campo en el formulario.
   * @param {keyof Tramite140205Store} metodoNombre - El nombre del método en el store para actualizar el estado.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite140205Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * @method ngOnDestroy
   * @description Método que se ejecuta al destruir el componente.
   * Libera los recursos y cancela las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
