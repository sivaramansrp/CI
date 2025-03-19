/**
 * PermisoRenunciaDeDerechosComponent es un componente que maneja la renuncia de derechos de permisos.
 * @packageDocumentation
 * @module PermisoRenunciaDeDerechosComponent
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite140111State, Tramite140111Store } from '../../estados/tramite140111.store';
import { CommonModule } from '@angular/common';
import { MANIFIESTO_BAJO_PROTESTA } from '../../enums/permiso-renuncia-de-derechos.enum';
import { PermisoFormInterface } from '../../model/renuncia-de-derechos.model';
import { RenunciaDeDerechosAlServicio } from '../../services/renuncia-de-derechos-al.service';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite140111Query } from '../../estados/tramite140111.query';


/**
 * PermisoRenunciaDeDerechosComponent es un componente que maneja la renuncia de derechos de permisos.
 */
@Component({
  selector: 'app-permiso-renuncia-de-derechos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  templateUrl: './permiso-renuncia-de-derechos.component.html',
  styleUrl: './permiso-renuncia-de-derechos.component.scss',
})
export class PermisoRenunciaDeDerechosComponent implements OnInit, OnDestroy {

  /**
   * Configuración del formulario de renuncia de derechos de permisos.
   */
  public permisoForm!: FormGroup;

   /**
   * Declaración bajo protesta de decir verdad.
   */
  public MANIFIESTO_BAJO_PROTESTA = MANIFIESTO_BAJO_PROTESTA;

  /**
   * Subject utilizado para manejar la destrucción del componente y evitar fugas de memoria.
   */
  public destroyed$ = new Subject<void>();

  /**
   * Inicializa el componente PermisoRenunciaDeDerechosComponent.
   * @constructor
   * @param {FormBuilder} fb - El constructor de formularios.
   * @returns void
   * @description Inicializa el componente PermisoRenunciaDeDerechosComponent.
   */
  constructor(private fb:FormBuilder, private Servicio: RenunciaDeDerechosAlServicio, private tramite140111Store:Tramite140111Store,private tramite140111Query:Tramite140111Query) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * @returns void
   * @description Crea el formulario de renuncia de permisos y establece los valores iniciales.
   */
  ngOnInit(): void {
    this.crearpermisoForm();
    this.enPatchForm();
    this.enPatchStoredFormData()
  }

   /**
   * Crea el formulario de renuncia de derechos de permisos.
   * @returns void
   * @description Crea y configura el formulario de renuncia de derechos de permisos.
   */
  crearpermisoForm(): void {
    this.permisoForm = this.fb.group({
      folioTrámite: [{ value: '', disabled: true }],
      tipoDeSolicitud: [{ value: '', disabled: true }],
      régimen: [{ value: '', disabled: true }],
      clasificaciónDelRégimen: [{ value: '', disabled: true }],
      periodoDeVigencia: [{ value: '', disabled: true }],
      unidadDeMedida: [{ value: '', disabled: true }],
      fracciónArancelaria: [{ value: '', disabled: true }],
      cantidadAutorizada: [{ value: '', disabled: true }],
      valorAutorizado: [{ value: '', disabled: true }],
      nico: [{ value: '', disabled: true }],
      descripciónNico: [{ value: '', disabled: true }],
      acotación: [{ value: '', disabled: true }],
      permisoVálidoDesde: [{ value: '', disabled: true }],
      permisoVálidoHasta: [{ value: '', disabled: true }],
      motivoRenunciaDeDerechos:['', [Validators.required, Validators.maxLength(255)]],
      controlar: [true, Validators.requiredTrue]
    });
  }


  /**
   * Establece los valores del formulario de renuncia de derechos de permisos.
   * @param {PermisoFormInterface} data - Los datos del formulario de renuncia de derechos de permisos.
   * @returns void
   * @description Establece los valores del formulario de renuncia de derechos de permisos a partir de los datos proporcionados.
   */
  enPatchForm(): void {
    this.Servicio.getDescripcionDelCupo()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data: PermisoFormInterface) => {
      this.permisoForm.patchValue({
        folioTrámite: data.folioTrámite,
        tipoDeSolicitud: data.tipoDeSolicitud,
        régimen: data.régimen,
        clasificaciónDelRégimen: data.clasificaciónDelRégimen,
        periodoDeVigencia: data.periodoDeVigencia,
        unidadDeMedida: data.unidadDeMedida,
        fracciónArancelaria: data.fracciónArancelaria,
        cantidadAutorizada: data.cantidadAutorizada,
        valorAutorizado: data.valorAutorizado,
        nico: data.nico,
        descripciónNico: data.descripciónNico,
        acotación: data.acotación,
        permisoVálidoDesde: data.permisoVálidoDesde,
        permisoVálidoHasta: data.permisoVálidoHasta,
      });
    });
  }

   /**
   * Obtiene el valor de un control en el formulario y lo pasa a un método del store para actualizar el estado.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite140111Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite140111Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Actualiza el formulario con datos del store
   */
  enPatchStoredFormData(): void {
    this.tramite140111Query.selectTramite140111$
        .pipe(
          takeUntil(this.destroyed$),
          map((seccionState:Tramite140111State) => {
            this.permisoForm.patchValue(
                {
                  motivoRenunciaDeDerechos:seccionState.motivoRenunciaDeDerechos,
                }
              )
          })
        )
        .subscribe();
  }

   /**
   * Método para verificar si un control del formulario es inválido.
   * @param {string} nombreControl - Nombre del control del formulario.
   * @returns {boolean} - Retorna true si el control es inválido, de lo contrario false.
   */
   esInvalido(nombreControl: string): boolean {
    const CONTROL = this.permisoForm.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

    /**
   * Método de ciclo de vida de Angular que se ejecuta al destruir el componente.
   */
    ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
    }

}
