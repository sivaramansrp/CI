/**
 * Importa módulos y utilidades de Angular necesarios para formularios reactivos, validación y observables
 * @packageDocumentation
 * @module PagoDeDerechosComponent
 */
import { Catalogo, CrosslistComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { CROSLISTA_ENTRADA } from '../../enums/croslista.enums';
import { CapitalSocialComponent } from '../capital-social/capital-social.component';
import { CommonModule } from '@angular/common';
import { DatosGeneralesComponent } from '../datos-generales/datos-generales.component';
import { DireccionEmpresaComponent } from '../direccion-empresa/direccion-empresa.component';
import {NOTA} from '../../enums/registro-empresas-transporte.enum';
import { RegistroEmpresasTransporteService } from '../../services/registro-empresas-transporte.service';
import { Tramite30401Query } from '../../estados/tramites30401.query';
import { Tramites30401State } from '../../estados/tramites30401.store';
import { permisoComponent } from '../permiso-expedido/permiso-expedido.component';

@Component({
  selector: 'app-empresas-transportistas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CrosslistComponent, DatosGeneralesComponent, DireccionEmpresaComponent, CapitalSocialComponent, permisoComponent],
  providers: [RegistroEmpresasTransporteService],
  templateUrl: './empresas-transportistas.component.html',
  styleUrl: './empresas-transportistas.component.scss',
})
export class EmpresasTransportistasComponent implements OnInit, OnDestroy {

  public empresasForm!: FormGroup;
  public destroyed$ = new Subject<void>();
  public tipoTransitoList$!: Observable<Catalogo[]>;
  public entidadFederativaList$!: Observable<Catalogo[]>;
  public delegacionMunicipioList$!: Observable<Catalogo[]>;
  public cveFolioCaat$!: Observable<string>;
  public coloniaList$!: Observable<Catalogo[]>;
  public CAPITAL_SOCIAL_NOTA = NOTA.CAPITAL_SOCIAL_NOTA;
  public MI_REPRESENTADA_NOTA = NOTA.MI_REPRESENTADA_NOTA;

  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

   public aduanasAutorizadas = CROSLISTA_ENTRADA;
   public seleccionarAduanasEntrada = CROSLISTA_ENTRADA;
   public seleccionadasAduanasEntradaDatos: string[] = [];
   public seccionState!: Tramites30401State;
  
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
    private tramite30401Query: Tramite30401Query,
    private Servicio: RegistroEmpresasTransporteService,
    private cdr: ChangeDetectorRef,
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
      cboAduanasActuarSeleccionadas: events,
    });
  }

  /**
   * Hook de ciclo de vida para inicializar la lógica del componente y cargar datos.
   */
  ngOnInit(): void {
    this.enPatchStoredFormData();
    this.crearForm();
    this.obtenerlistadescargable();
  }

  /**
   * Crea el formulario reactivo con las reglas de validación para cada control.
   */
  crearForm(): void {
    this.empresasForm = this.fb.group({
      numeroCaat: this.fb.group({
        cveFolioCaat: [{ value: '', disabled: true }, Validators.required],
        tipoTransito: [this.seccionState?.tipoTransito, Validators.required],
      }),
      cboAduanasActuarSeleccionadas: [this.seccionState.cboAduanasActuarSeleccionadas, Validators.required],
      domicilio: this.fb.group({
        calle: [this.seccionState?.calle, [Validators.required, Validators.maxLength(100)]],
        numeroExterior: [this.seccionState?.numeroExterior, [Validators.required, Validators.maxLength(55)]],
        numeroInterior: [this.seccionState?.numeroInterior, [Validators.maxLength(55)]],
        entidadFederativa: [this.seccionState?.entidadFederativa, Validators.required],
        delegacionMunicipio: [this.seccionState?.delegacionMunicipio, Validators.required],
        colonia: [this.seccionState?.colonia, Validators.required],
        localidad: [this.seccionState?.localidad, Validators.required],
        codigoPostal: [this.seccionState?.codigoPostal, [Validators.required, Validators.maxLength(6)]],
      }),
      empresasCapitalSocial: this.fb.group({
        capitalSocial: [this.seccionState?.capitalSocial, Validators.required],
      }),
      permiso: this.fb.group({
        numeroFolioPermiso: [this.seccionState?.numeroFolioPermiso, [Validators.required, Validators.maxLength(20)]],
        fechaExpedicion: [this.seccionState?.fechaExpedicion, Validators.required],
        elCapitalSocial: [this.seccionState?.elCapitalSocial, Validators.requiredTrue],
        miRepresentada: [this.seccionState?.miRepresentada, Validators.requiredTrue],
      })
    });
}


  obtenerlistadescargable(): void {
    this.tipoTransitoList$ = this.Servicio.tipoTransitoList();
    this.entidadFederativaList$ = this.Servicio.entidadFederativaList();
    this.delegacionMunicipioList$ = this.Servicio.delegacionMunicipioList();
    this.coloniaList$ = this.Servicio.coloniaList();
    this.cveFolioCaat$ = this.Servicio.cveFolioCaat().pipe(
      map((datos:{id?:number; value: string}) => {
      return datos.value
      })
    );
    this.cdr.detectChanges()
  }

  /**
   * Actualiza el formulario con datos obtenidos desde la tienda.
   */
  public enPatchStoredFormData(): void {
    this.tramite30401Query.selectTramite30401$
      .pipe(
        takeUntil(this.destroyed$)
      ).subscribe((datos: Tramites30401State) => {
        this.seccionState = datos;
      });
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
