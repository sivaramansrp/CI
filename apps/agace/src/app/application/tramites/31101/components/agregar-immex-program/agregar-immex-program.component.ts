import { AGREGAR_IMMEX_CONFIGURACION } from '../../constants/solicitud.enum';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { Domicilios } from '../../models/solicitud.model';
import { EntidadFederativa } from '../../models/solicitud.model';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud31101Query } from '../../estados/solicitud31101.query';
import { Solicitud31101State } from '../../estados/solicitud31101.store';
import { Solicitud31101Store } from '../../estados/solicitud31101.store';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/** Configuración del componente AgregarImmexProgram
 * Archivo de plantilla que define la vista del componente
 * Archivo de estilos específico del componente
 * Módulos importados necesarios para el funcionamiento del componente
 */
@Component({
  selector: 'app-agregar-immex-program',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './agregar-immex-program.component.html',
  styleUrl: './agregar-immex-program.component.scss',
})
/** Configuración del componente AgregarImmexProgram
 * Archivo de plantilla que define la vista del componente
 * Archivo de estilos específico del componente
 * Módulos importados necesarios para el funcionamiento del componente
 */
export class AgregarImmexProgramComponent implements OnInit, OnDestroy {
  /** Formulario para agregar un programa IMMEX */
  agregarImmexProgramForm!: FormGroup;

  /** Sujeto para manejar la destrucción de suscripciones */
  private destroy$: Subject<void> = new Subject<void>();

  /** Tipo de selección en la tabla */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /** Configuración de columnas para la tabla de domicilios */
  agregarImmexProgramConfiguracionColumnas: ConfiguracionColumna<EntidadFederativa>[] =
    AGREGAR_IMMEX_CONFIGURACION;

  /** Evento de salida para emitir el valor agregado */
  @Output() agregarImmexValor = new EventEmitter<Domicilios>();

  /** Datos de domicilios */
  domiciliosDatos: EntidadFederativa[] = [] as EntidadFederativa[];

  /** Entidad federativa seleccionada */
  entidadFederativa: CatalogosSelect = {} as CatalogosSelect;

  /** Lista de domicilios seleccionados */
  domicilioslista: EntidadFederativa[] = [] as EntidadFederativa[];

  /** Estado de la solicitud */
  solicitud31101State: Solicitud31101State = {} as Solicitud31101State;

  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud31101Store: Solicitud31101Store,
    public solicitud31101Query: Solicitud31101Query
  ) {
    /** Obtiene los datos generales del catálogo */
    this.entidadFederativaCatalogo();

    /** Obtiene los datos de la entidad federativa */
    this.conseguirEntidadFederativaDatos();
  }

  /** Inicializa el formulario */
  ngOnInit(): void {
    this.agregarImmexProgramForm = this.fb.group({
      entidadFederativa: [this.solicitud31101State.entidadFederativa],
    });

    /**Suscripción para obtener la solicitud y actualizar el formulario */
    this.solicitud31101Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud31101State) => {
          this.solicitud31101State = respuesta;
          this.agregarImmexProgramForm.patchValue({
            entidadFederativa: this.solicitud31101State.entidadFederativa,
          });
        })
      )
      .subscribe();
  }

  /** Obtiene los datos generales del catálogo desde el servicio */
  entidadFederativaCatalogo(): void {
    this.solicitudService
      .entidadFederativaCatalogo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: CatalogosSelect) => {
          this.entidadFederativa = respuesta;
        },
      });
  }

  /** Maneja la selección de entidad federativa */
  seleccionArentidadFederativa(evento: Catalogo): void {
    this.domicilioslista = this.domiciliosDatos;
    this.solicitud31101Store.actualizarEntidadFederativa(evento.id);
  }

  /** Agrega un programa IMMEX y emite los datos */
  agregarImmexProgram(): void {
    const VALOR = {
      instalacionPrincipal: '',
      cveTipoInstalacion: '',
      tipoInstalacion: '',
      cveEntidadFederativa: this.domicilioslista[0].cveEntidadFederativa,
      entidadFederativa: '',
      cveDelegacionMunicipio: '',
      municipioDelegacion: this.domicilioslista[0].municipioDelegacion,
      direccion: this.domicilioslista[0].direccion,
      codigoPostal: this.domicilioslista[0].codigoPostal,
      registroSESAT: this.domicilioslista[0].registroSESAT,
      procesoProductivo: '',
      fechaModificacion: '',
      cveEstatus: '',
      estatus: '',
      noExterior: '',
      noInterior: '',
      cveColonia: '',
      calle: '',
      descCol: '',
      idRecinto: '',
      numFolioAcuse: '',
      observaciones: '',
    };

    /** Emite el valor agregado */
    this.agregarImmexValor.emit(VALOR);
  }

  /** Obtiene los datos de la entidad federativa desde el servicio */
  conseguirEntidadFederativaDatos(): void {
    this.solicitudService
      .conseguirEntidadFederativaDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: EntidadFederativa[]) => {
          this.domiciliosDatos = respuesta;
        },
      });
  }

  /** Maneja la destrucción de suscripciones */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
