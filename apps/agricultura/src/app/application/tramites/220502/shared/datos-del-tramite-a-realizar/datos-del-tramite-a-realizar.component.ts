import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { DatosDelTramiteRealizar } from '../../models/solicitud-pantallas.model';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { InputFecha } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud220502Query } from '../../estados/tramites220502.query';
import { Solicitud220502State } from '../../estados/tramites220502.store';
import { Solicitud220502Store } from '../../estados/tramites220502.store';
import { SolicitudPantallasService } from '../../services/solicitud-pantallas.service';
import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
/**
 * Componente para gestionar los datos del trámite a realizar.
 */
@Component({
  selector: 'app-datos-del-tramite-a-realizar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (): ControlContainer =>
        inject<ControlContainer>(ControlContainer, { skipSelf: true }),
    },
  ],
  providers: [SolicitudPantallasService],
  templateUrl: './datos-del-tramite-a-realizar.component.html',
  styleUrl: './datos-del-tramite-a-realizar.component.scss',
})
/** Componente para gestionar los datos del trámite a realizar */
export class DatosDelTramiteARealizarComponent implements OnInit, OnDestroy {
  /**
   * Clave de entrada utilizada para identificar el control dentro del grupo de formulario principal.
   */
  @Input() claveDeControl: string = '';

  /**
   * Inyecta el contenedor de control del formulario principal.
   */
  parentContainer = inject(ControlContainer);

  /**
   * Getter para acceder al grupo de formularios principal.
   */
  get grupoFormularioPadre(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  /**
   * Configuración del campo de fecha para la 'Fecha de Inicio de Vigencia'.
   *
   * Contiene las propiedades visuales y de validación del componente de entrada de fecha.
   */
  configuracionFechaFinVigencia: InputFecha = {
    labelNombre: 'Fecha de Inicio de Vigencia',
    required: false,
    habilitado: true,
  };

  /**
   * Opciones de selección de formulario para diferentes datos del catálogo.
   */
  certificadosAutorizados: CatalogosSelect = {} as CatalogosSelect;

  /** Opciones de selección de formulario para diferentes datos del catálogo. */
  horaDeInspeccion: CatalogosSelect = {} as CatalogosSelect;

  /** Opciones de selección de formulario para diferentes datos del catálogo. */
  aduanaDeIngreso: CatalogosSelect = {} as CatalogosSelect;

  /** Opciones de selección de formulario para diferentes datos del catálogo. */
  sanidadAgropecuaria: CatalogosSelect = {} as CatalogosSelect;

  /** Opciones de selección de formulario para diferentes datos del catálogo. */
  puntoDeInspeccion: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Campo de entrada de fecha inicializado con la constante FECHA_INSPECCION.
   */
  fechaInicioInput: InputFecha = {
    labelNombre: 'Fecha de Inicio de Vigencia',
    required: false,
    habilitado: false,
  };

  /**
   * Subject para desuscribirse de los observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Estado de la solicitud para gestionar los datos relacionados con la solicitud 220502.
   * Se inicializa como un objeto vacío con la estructura de `Solicitud220502State`.
   */
  solicitud220502State: Solicitud220502State = {} as Solicitud220502State;

  /**
   * Indica si el formulario está deshabilitado.
   */
  @Input() formularioDeshabilitado!: boolean;

  /** Constructor para inyectar el servicio de solicitud de pantallas. */
  constructor(
    private solicitudService: SolicitudPantallasService,
    private solicitud220502Store: Solicitud220502Store,
    private solicitud220502Query: Solicitud220502Query,
    private cdRef: ChangeDetectorRef
  ) {
    // Se puede agregar aquí el código de inicialización si es necesario en el futuro.
  }

  /**
   * Gancho de ciclo de vida que inicializa los controles de formulario cuando se carga el componente.
   */
  ngOnInit(): void {
    if (this.claveDeControl) {
      this.grupoFormularioPadre.addControl(
        this.claveDeControl,
        new FormGroup({
          certificadosAutorizados: new FormControl(
            this.solicitud220502State.certificadosAutorizados,
            [Validators.required]
          ),
          horaDeInspeccion: new FormControl(
            this.solicitud220502State.horaDeInspeccion,
            [Validators.required]
          ),
          aduanaDeIngreso: new FormControl(
            this.solicitud220502State.aduanaDeIngreso,
            [Validators.required]
          ),
          sanidadAgropecuaria: new FormControl(
            this.solicitud220502State.sanidadAgropecuaria,
            [Validators.required]
          ),
          puntoDeInspeccion: new FormControl(
            this.solicitud220502State.puntoDeInspeccion,
            [Validators.required]
          ),
          fechaDeInspeccion: new FormControl(
            this.solicitud220502State.fechaDeInspeccion,
            [Validators.required]
          ),
        })
      );
      this.cargarDatosIniciales();
      this.solicitud220502Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyed$),
          map((res: Solicitud220502State) => {
            this.solicitud220502State = res;
            const FORM_GROUP = this.grupoFormularioPadre.get(
              this.claveDeControl
            ) as FormGroup;

            if (FORM_GROUP) {
              FORM_GROUP.patchValue({
                certificadosAutorizados:
                  this.solicitud220502State.certificadosAutorizados,
                horaDeInspeccion: this.solicitud220502State.horaDeInspeccion,
                aduanaDeIngreso: this.solicitud220502State.aduanaDeIngreso,
                sanidadAgropecuaria:
                  this.solicitud220502State.sanidadAgropecuaria,
                puntoDeInspeccion: this.solicitud220502State.puntoDeInspeccion,
                fechaDeInspeccion: this.solicitud220502State.fechaDeInspeccion,
              });
            }
          })
        )
        .subscribe();
    }

    if (this.formularioDeshabilitado) {
      this.grupoFormularioPadre.disable();
    } else {
      this.grupoFormularioPadre.enable();
    }
  }

  /**
   * Maneja la selección de 'Certificados Autorizados' y actualiza el control del formulario.
   * @param e El artículo del catálogo seleccionado.
   */
  certificadosSeleccion(e: Catalogo): void {
    this.actualizarFormValue('certificadosAutorizados', e.descripcion);
  }

  /**
   * Maneja la selección de 'Hora de Inspección' y actualiza el control del formulario.
   * @param e El artículo del catálogo seleccionado.
   */
  horaDeSeleccion(e: Catalogo): void {
    this.actualizarFormValue('horaDeInspeccion', e.descripcion);
  }

  /**
   * Maneja la selección de 'Aduana de Ingreso' y actualiza el control del formulario.
   * @param e El artículo del catálogo seleccionado.
   */
  aduanaDeSeleccion(e: Catalogo): void {
    this.actualizarFormValue('aduanaDeIngreso', e.descripcion);
  }

  /**
   * Maneja la selección de 'Sanidad Agropecuaria' y actualiza el control del formulario.
   * @param e El artículo del catálogo seleccionado.
   */
  sanidadSeleccion(e: Catalogo): void {
    this.actualizarFormValue('sanidadAgropecuaria', e.descripcion);
  }

  /**
   * Maneja la selección de 'Punto de Inspección' y actualiza el control del formulario.
   * @param e El artículo del catálogo seleccionado.
   */
  puntoDeSeleccion(e: Catalogo): void {
    this.actualizarFormValue('puntoDeInspeccion', e.descripcion);
  }

  /**
   * Actualiza un control de formulario específico con un nuevo valor.
   * @param nombreDeControl El nombre del control a actualizar.
   * @param value El nuevo valor a establecer.
   */
  private actualizarFormValue(nombreDeControl: string, value: string): void {
    if (
      this.claveDeControl &&
      this.grupoFormularioPadre.contains(this.claveDeControl)
    ) {
      this.grupoFormularioPadre.controls[this.claveDeControl].patchValue({
        [nombreDeControl]: value,
      });
    }
  }

  /**
   * Actualiza los datos iniciales de los campos del formulario según la información proporcionada.
   *
   * @param data - El objeto de datos que contiene valores para diferentes campos de catálogo.
   */
  actualizarDatosIniciales(data: DatosDelTramiteRealizar): void {
    const CATALOGOTEMPLATE = (
      label: string,
      required: boolean,
      catalogos: Catalogo[]
    ): CatalogosSelect => ({
      labelNombre: label,
      required,
      primerOpcion: 'Selecciona un valor',
      catalogos,
    });

    this.certificadosAutorizados = CATALOGOTEMPLATE(
      'Certificados autorizados pendientes',
      true,
      data.pendientesCertificados
    );
    this.horaDeInspeccion = CATALOGOTEMPLATE(
      'Hora de inspección',
      true,
      data.horaInspeccion
    );
    this.aduanaDeIngreso = CATALOGOTEMPLATE(
      'Aduana de ingreso',
      false,
      data.aduanaIngreso
    );
    this.sanidadAgropecuaria = CATALOGOTEMPLATE(
      'Oficina de inspección de Sanidad Agropecuaria',
      false,
      data.sanidadAgropecuaria
    );
    this.puntoDeInspeccion = CATALOGOTEMPLATE(
      'Punto de inspección',
      false,
      data.puntoInspeccion
    );
    this.cdRef.detectChanges();
  }

  /**
   * Carga datos del catálogo inicial para las selecciones de formulario.
   */
  cargarDatosIniciales(): void {
    this.solicitudService.getDataDatosDelTramite().subscribe({
      next: (data: DatosDelTramiteRealizar) => {
        this.actualizarDatosIniciales(data);
      },
    });
  }

  /**
   * Getter para acceder al grupo de formularios 'datosServicio'.
   */
  get datosServicio(): FormGroup {
    return this.grupoFormularioPadre.get('datosServicio') as FormGroup;
  }

  /**
   * Maneja los cambios en el campo de fecha de inicio.
   * @param nuevo_valor El nuevo valor de fecha seleccionado.
   */
  cambioFechaInicio(nuevo_valor: string): void {
    this.solicitud220502Store.setFechaDeInspeccion(nuevo_valor);
  }
  /**
   * Establece los certificados autorizados en el estado de la solicitud.
   * @param event Objeto de tipo Catalogo que contiene el ID del certificado autorizado.
   */
  setCertificadosAutorizados(event: Catalogo): void {
    this.solicitud220502Store.setCertificadosAutorizados(event.id);
  }

  /**
   * Define la hora de inspección en la solicitud.
   * @param event Objeto de tipo Catalogo que contiene el ID de la hora de inspección.
   */
  setHoraDeInspeccion(event: Catalogo): void {
    this.solicitud220502Store.setHoraDeInspeccion(event.id);
  }

  /**
   * Asigna la aduana de ingreso en el estado de la solicitud.
   * @param event Objeto de tipo Catalogo que contiene el ID de la aduana de ingreso.
   */
  setAduanaDeIngreso(event: Catalogo): void {
    this.solicitud220502Store.setAduanaDeIngreso(event.id);
  }

  /**
   * Establece la sanidad agropecuaria en la solicitud.
   * @param event Objeto de tipo Catalogo que contiene el ID de la sanidad agropecuaria.
   */
  setSanidadAgropecuaria(event: Catalogo): void {
    this.solicitud220502Store.setSanidadAgropecuaria(event.id);
  }

  /**
   * Define el punto de inspección en la solicitud.
   * @param event Objeto de tipo Catalogo que contiene el ID del punto de inspección.
   */
  setPuntoDeInspeccion(event: Catalogo): void {
    this.solicitud220502Store.setPuntoDeInspeccion(event.id);
  }
  /**
   * Gancho de ciclo de vida para limpiar los controles de formulario cuando se destruye el componente.
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Desuscribe el componente de todos los observables.
   * @returns {void}
   */
  ngOnDestroy(): void {
    if (
      this.claveDeControl &&
      this.grupoFormularioPadre.contains(this.claveDeControl)
    ) {
      this.grupoFormularioPadre.removeControl(this.claveDeControl);
    }
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
