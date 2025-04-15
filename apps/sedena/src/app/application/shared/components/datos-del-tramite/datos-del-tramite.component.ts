import { ActivatedRoute } from '@angular/router';
import { CROSLISTA_ADUANAS_DISPONIBLES } from '../../constants/datos-del-tramilte.enum';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CrossListLable } from '@ng-mf/data-access-user';
import { CrosslistComponent } from '@ng-mf/data-access-user';
import { DatosDelTramiteFormState } from '../../models/datos-del-tramite.model';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { MERCANCIA_ENCABEZADO_DE_TABLA } from '../../models/datos-del-tramite.model';
import { MercanciaDetalle } from '../../models/datos-del-tramite.model';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
/**
 * @title Datos del Trámite
 * @description Componente que gestiona el formulario de datos del trámite como permisos, uso final y selección de aduanas.
 * @summary Componente utilizado para capturar y emitir los datos del trámite.
 */

@Component({
  selector: 'app-datos-del-tramite',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CrosslistComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
  ],
  templateUrl: './datos-del-tramite.component.html',
  styleUrl: './datos-del-tramite.component.css',
})
export class DatosDelTramiteComponent implements OnInit, OnDestroy {
  /**
   * @property {Subject<void>} unsubscribe$
   * Subject para cancelar suscripciones activas y evitar fugas de memoria.
   * Se completa en el hook `ngOnDestroy`.
   * @private
   */
  private unsubscribe$ = new Subject<void>();
  /**
   * Lista de aduanas disponibles para mostrar en el componente Crosslist.
   * @property {string[]} seleccionarAduanasDisponibles
   */
  public seleccionarAduanasDisponibles = CROSLISTA_ADUANAS_DISPONIBLES;

  /**
   * Aduanas seleccionadas por el usuario desde el componente Crosslist.
   * @property {string[]} seleccionarAduanasDisponiblesDatos
   */
  public seleccionarAduanasDisponiblesDatos: string[] = [];

  /**
   * Etiquetas que se utilizan en el componente Crosslist para mostrar los títulos de los listados.
   * @property {CrossListLable} aduanasDisponiblesLabel
   */
  public aduanasDisponiblesLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Aduanas disponibles',
    derecha: 'Aduanas seleccionadas',
  };

  /**
   * Grupo de formularios principal para capturar los datos del trámite.
   * @property {FormGroup} form
   */
  form!: FormGroup;

  /**
   * Estado inicial del formulario del trámite, recibido desde el componente padre.
   * @property {DatosDelTramiteFormState} datosDelTramiteFormState
   */
  @Input() datosDelTramiteFormState!: DatosDelTramiteFormState;

  /**
   * Lista de datos de mercancías que se utilizan en la tabla dinámica.
   * @property {MercanciaDetalle[]} datosMercanciaTabla
   */
  @Input() datosMercanciaTabla: MercanciaDetalle[] = [];

  /**
   * Configuración utilizada para construir la tabla dinámica de mercancías.
   * @property {any} mercanciaTablaConfiguracion
   */
  public mercanciaTablaConfiguracion = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: MERCANCIA_ENCABEZADO_DE_TABLA,
    datos: [],
  };

  /**
   * Indica si el componente debe estar oculto o visible.
   * @type {boolean}
   */
  @Input() estaOculto!: boolean;

  /**
   * Evento que emite los datos actualizados del formulario hacia el componente padre.
   * @event updateDatosDelTramiteFormulario
   */
  @Output() updateDatosDelTramiteFormulario =
    new EventEmitter<DatosDelTramiteFormState>();

  /**
   * Constructor del componente.
   * @method constructor
   * @param {FormBuilder} fb - Servicio para crear formularios reactivos.
   * @param {ActivatedRoute} activatedRoute - Ruta activa utilizada para navegación relativa.
   * @param {Router} router - Servicio de enrutamiento.
   * @returns {void}
   */
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router // eslint-disable-next-line no-empty-function
  ) {}
  /**
   * Crea el formulario reactivo `agregarDestinatarioFinal` utilizando `FormBuilder`.
   * Define los campos y sus validaciones.
   *
   */
  crearFormaulario(): void {
    this.form = this.fb.group({
      permisoGeneral: ['', Validators.required],
      paisDestino: [
        { value: 'MEXICO (ESTADOS UNIDOS MEXICANOS)', disabled: true },
      ],
      usoFinal: ['', Validators.required],
    });
  }

  /**
   * Maneja el evento de cambio en la selección de aduanas.
   * @method aduanasDisponiblesSeleccionadasChange
   * @param {string[]} events - Lista de aduanas seleccionadas.
   * @returns {void}
   */
  aduanasDisponiblesSeleccionadasChange(events: string[]): void {
    this.seleccionarAduanasDisponiblesDatos = events;
  }

  /**
   * Navega hacia el path de acciones relativo especificado.
   * @method irAAcciones
   * @param {string} accionesPath - Ruta relativa hacia la sección de acciones.
   * @returns {void}
   */
  irAAcciones(accionesPath: string): void {
    this.router.navigate([accionesPath], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * Inicializa el formulario con los valores actuales del estado del trámite
   * y escucha los cambios para emitir actualizaciones.
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.crearFormaulario();
    this.form.patchValue({
      permisoGeneral: this.datosDelTramiteFormState.permisoGeneral,
      usoFinal: this.datosDelTramiteFormState.usoFinal,
    });

    this.seleccionarAduanasDisponiblesDatos =
      this.datosDelTramiteFormState.aduanasSeleccionadas;

    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((formValue) => {
        const DATOS_DEL_TRAMITE: DatosDelTramiteFormState = {
          permisoGeneral: formValue.permisoGeneral,
          paisDestino: formValue.paisDestino,
          usoFinal: formValue.usoFinal,
          aduanasSeleccionadas: this.seleccionarAduanasDisponiblesDatos,
        };
        this.updateDatosDelTramiteFormulario.emit(DATOS_DEL_TRAMITE);
      });
  }
  /**
   * @method ngOnDestroy
   * @description Hook de destrucción del componente. Libera las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
