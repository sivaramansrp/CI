/**
 * Importa módulos y utilidades de Angular necesarios para formularios reactivos, validación y observables
 * @packageDocumentation
 * @module PagoDeDerechosComponent
 */

import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AlertComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, distinctUntilChanged, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import {NOTA} from '../../enums/registro-empresas-transporte.enum';
import { RegistroEmpresasTransporteService } from '../../services/registro-empresas-transporte.service';
import { Tramite30401Query } from '../../estados/tramites30401.query';
import { Tramite30401Store } from '../../estados/tramites30401.store';
import { dropdownList } from '../../modelos/registro-empresas-transporte.model';


/**
 * Selector del componente
 * Habilita el uso independiente de este componente
 * Módulos necesarios
 * Proveedores de servicios para inyección de dependencias
 * Ruta del archivo HTML
 * Ruta del archivo CSS
 */
@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, AlertComponent],
  providers: [RegistroEmpresasTransporteService],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss',
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {

  /**
   * Formulario reactivo para manejar los campos de entrada del usuario.
   */
  public pagoDeDerechosForm!: FormGroup;

  /**
   * Subject para manejar la destrucción del componente y evitar fugas de memoria.
   */
  public destroyed$ = new Subject<void>();

  /**
   * Lista de datos relacionados con bancos obtenidos desde el servicio.
   */
  public bancoList!: dropdownList[];

     /**
   * Declaración bajo protesta de decir verdad.
   */
     public EFECTUAR_EL_PAGO = NOTA.EFECTUAR_EL_PAGO;

       /**
   * Nota: Debes capturar todos los campos de pago de aprovechamiento
   */
      public DEBES_CAPTURAR = NOTA.DEBES_CAPTURAR;
     

  /**
   * Constructor para inyectar los servicios y las tiendas necesarias.
   * @param fb - FormBuilder para formularios reactivos.
   * @param tramite30401Store - Tienda para gestionar el estado del formulario.
   * @param tramite30401Query - Servicio de consulta para acceder a los datos del store.
   * @param Servicio - Servicio para obtener la lista de bancos.
   */
  constructor(
    public fb: FormBuilder,
    private tramite30401Store: Tramite30401Store,
    private tramite30401Query: Tramite30401Query,
    private Servicio: RegistroEmpresasTransporteService
  ) {
     // No se necesita lógica de inicialización adicional.
  }

  /**
   * Hook de ciclo de vida para inicializar la lógica del componente y cargar datos.
   */
  ngOnInit(): void {
    this.crearForm();
    this.enPatchStoredFormData();
    this.getBancoList();
  }

  /**
   * Crea el formulario reactivo con las reglas de validación para cada control.
   */
  crearForm(): void {
    this.pagoDeDerechosForm = this.fb.group({
      claveDeReferencia: ['', [Validators.maxLength(50)]],
      cadenaPagoDependencia: ['', [Validators.maxLength(50)]],
      clave: ['', Validators.required],
      llaveDePago: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{10}$')]],
      fecPago: ['', [Validators.required, PagoDeDerechosComponent.fechaLimValidator()]],
      impPago: ['', [Validators.maxLength(16), PagoDeDerechosComponent.noComaValidator()]],
      efectuarElPago: [true, Validators.requiredTrue]
    });

    // Actualiza y valida el campo 'fecPago' cuando cambia su valor
    this.pagoDeDerechosForm.get('fecPago')?.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.pagoDeDerechosForm.get('fecPago')?.updateValueAndValidity({ emitEvent: false });
      });

    // Actualiza y valida el campo 'impPago' cuando cambia su valor
    this.pagoDeDerechosForm.get('impPago')?.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.pagoDeDerechosForm.get('impPago')?.updateValueAndValidity({ emitEvent: false });
      });
  }

  /**
   * Validador para asegurar que la fecha seleccionada no sea en el futuro.
   */
  public static fechaLimValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: unknown } | null => {
      const LIM = control.value;
      if (LIM) {
        const [YEAR, MONTH, DAY] = LIM.split('-');
        const FECHA = new Date(+Number(YEAR), +Number(MONTH) - 1, +Number(DAY));
        const TODAY = new Date();
        if (FECHA.getTime() > TODAY.getTime()) {
          return { fechaLim: true }; // Retorna error si la fecha está en el futuro
        }
      }
      return null; // Fecha válida
    };
  }

  /**
   * Validador para asegurar que la entrada no contenga comas.
   */
  public static noComaValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: unknown } | null => {
      const VALUE = control.value;
      if (VALUE && VALUE.includes(',')) {
        return { noComa: true }; // Retorna error si el valor contiene comas
      }
      return null; // Entrada válida
    };
  }

  /**
   * Obtiene la lista de bancos del servicio y la asigna a `bancoList`.
   */
  getBancoList(): void {
    this.Servicio.onBancoList()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: dropdownList[]) => {
        this.bancoList = data;
      });
  }

  /**
   * Pasa el valor de un campo del formulario a la tienda para la gestión del estado.
   * @param form - El formulario reactivo.
   * @param campo - El nombre del campo en el formulario.
   * @param metodoNombre - El método en la tienda para actualizar el estado.
   */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite30401Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite30401Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Actualiza el formulario con datos obtenidos desde la tienda.
   */
  public enPatchStoredFormData(): void {
    this.tramite30401Query.selectTramite30401$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.pagoDeDerechosForm.patchValue({
            claveDeReferencia: seccionState.claveDeReferencia,
            cadenaPagoDependencia: seccionState.cadenaPagoDependencia,
            clave: seccionState.clave,
            llaveDePago: seccionState.llaveDePago,
            fecPago: seccionState.fecPago,
            impPago: seccionState.impPago,
          });
        })
      )
      .subscribe();
  }

  /**
   * Verifica si un control del formulario es inválido, tocado o modificado.
   * @param {string} nombreControl - Nombre del control a verificar.
   * @returns {boolean} - True si el control es inválido, de lo contrario false.
   */
  public esInvalido(nombreControl: string): boolean {
    const CONTROL = this.pagoDeDerechosForm.get(nombreControl);
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