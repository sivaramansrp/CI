/**
 * Importa módulos y utilidades de Angular necesarios para formularios reactivos, validación y observables
 * @packageDocumentation
 * @module PagoDeDerechosComponent
 */

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { dropdownList } from '../../modelos/registro-empresas-transporte.model';
import { CommonModule } from '@angular/common';
import {NOTA} from '../../enums/registro-empresas-transporte.enum';
import { RegistroEmpresasTransporteService } from '../../services/registro-empresas-transporte.service';
import { CrosslistComponent, CrossListLable, REGEX_SOLO_NUMEROS, TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite30401Store } from '../../estados/tramites30401.store';
import { Tramite30401Query } from '../../estados/tramites30401.query';
import { CROSLISTA_ENTRADA } from '../../enums/croslista.enums';

@Component({
  selector: 'app-empresas-transportistas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CrosslistComponent],
  providers: [RegistroEmpresasTransporteService],
  templateUrl: './empresas-transportistas.component.html',
  styleUrl: './empresas-transportistas.component.scss',
})
export class EmpresasTransportistasComponent implements OnInit, OnDestroy {
  
  /**
   * Formulario reactivo para manejar los campos de entrada del usuario.
   */
  public empresasForm!: FormGroup;

  /**
   * Subject para manejar la destrucción del componente y evitar fugas de memoria.
   */
  public destroyed$ = new Subject<void>();

  /**
   * Lista de datos relacionados con bancos obtenidos desde el servicio.
   */
  public bancoList!: dropdownList[];
  public tipodeTransitoList!: Observable<dropdownList[]>;
  public entidadFederativaList!: Observable<dropdownList[]>;
  public municipioDelegacionList!: Observable<dropdownList[]>;
  public coloniaList!: Observable<dropdownList[]>;

  public CAPITAL_SOCIAL_NOTA = NOTA.CAPITAL_SOCIAL_NOTA;
  
  public MI_REPRESENTADA_NOTA = NOTA.MI_REPRESENTADA_NOTA;


  /**
   * Referencia a los componentes de la lista de fechas.
   */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

   /**
   * Lista de países disponibles para la selección de procedencia.
   */
   public aduanasAutorizadas = CROSLISTA_ENTRADA;
   /**
     * Lista de países disponibles para la selección de origen.
     */
   public seleccionarAduanasEntrada = CROSLISTA_ENTRADA;

    /**
       * Lista de países seleccionados como origen.
       */
    public seleccionadasAduanasEntradaDatos: string[] = [];
 
   /**
   * Control de formulario para la aduanasDeEntradaFecha.
   */
  //  aduanasDeEntradaFecha: FormControl = new FormControl('');


   /**
   * Botones para gestionar la lista cruzada de países de origen.
   */
   aduanasEntradaBotons = [
    {
      btnNombre: 'Agregar',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[0].agregar('t'),
    },
    {
      btnNombre: 'Agregar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].agregar(''),
    },
    {
      btnNombre: 'Eliminar',
      class: 'btn-danger',
      funcion: (): void => this.crossList.toArray()[0].quitar(''),
    },
    {
      btnNombre: 'Eliminar todas',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].quitar('t'),
    },
  ];

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
   * Maneja el cambio de selección de países de origen.
   * @param events Lista de países seleccionados.
   */
  aduanasEntradaSeleccionadasChange(events: string[]): void {
    this.seleccionadasAduanasEntradaDatos = events;
    this.empresasForm.patchValue({
      paisDeOriginDatos: events,
    });
  }

  /**
   * Hook de ciclo de vida para inicializar la lógica del componente y cargar datos.
   */
  ngOnInit(): void {
    this.crearForm();
    this.enPatchStoredFormData();
    this.obtenerlistadescargable();
  }

  /**
   * Crea el formulario reactivo con las reglas de validación para cada control.
   */
  crearForm(): void {
    this.empresasForm = this.fb.group({
      numeroCaat: ['', Validators.required],
      tipodeTransito: ['', Validators.required],
      calle: ['', Validators.required],
      numeroExterior: ['', [Validators.required, Validators.pattern(REGEX_SOLO_NUMEROS)]],
      numeroInterior: [''],
      entidadFederativa: ['', Validators.required],
      municipioDelegacion: ['', Validators.required],
      colonia: ['', Validators.required],
      localidad: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      capitalSocial: ['', Validators.required],
      numero: ['', Validators.required],
      fecha: ['', Validators.required],
      capitalSocialCheck: [false, Validators.requiredTrue],
      miRepresentadaCheck: [false, Validators.requiredTrue],
    });
  }



  obtenerlistadescargable(): void {
    this.tipodeTransitoList = this.Servicio.tipodeTransitoList();
    this.entidadFederativaList = this.Servicio.entidadFederativaList();
    this.municipioDelegacionList = this.Servicio.municipioDelegacionList();
    this.coloniaList = this.Servicio.coloniaList();
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
          this.empresasForm.patchValue({
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
    const CONTROL = this.empresasForm.get(nombreControl);
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
