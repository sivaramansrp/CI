import {
  Catalogo,
  CatalogoSelectComponent,
  InputFecha,
  InputFechaComponent,
  MercanciaTablaData,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomicilioInfo, Mercancia } from '../models/plantas-consulta.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CONFIGURACION_MERCANCIA } from '../constantes/modificacion.enum';
import { CertificadosOrigenGridService } from '../services/certificadosOrigenGrid.service';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '../models/configuracio-columna.model';
import { ToastrService } from 'ngx-toastr';
import { Tramite110204Query } from '../estados/tramite110204.query';
import { Tramite110204Store } from '../estados/tramite110204.store';

export const FECHA_INICIO = {
  labelNombre: 'Fecha iniciO',
  required: true,
  habilitado: true,
};

export const FECHA_FINAL = {
  labelNombre: 'Fecha fin',
  required: true,
  habilitado: true,
};

@Component({
  selector: 'app-certificado-origen',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    CommonModule,
    TablaDinamicaComponent,
    InputFechaComponent,
  ],
  providers: [ToastrService],
  templateUrl: './certificado-origen.component.html',
  styleUrl: './certificado-origen.component.scss',
})
export class CertificadoOrigenComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  datosConfidencialesProductor: boolean = false;
  productorMismoExportador: boolean = false;
  mercanciasInvalidas: boolean = false;
  public fechaInicioInput: InputFecha = FECHA_INICIO;
  public fechaFinalInput: InputFecha = FECHA_FINAL;

  /**
   * Lista de catálogos que representan los estados.
   * @type {Observable<Catalogo[]>}
   */
  estados$!: Observable<Catalogo[]>;

  /**
   * Estado seleccionado.
   * @type {Catalogo}
   */

  /**
   * @observable
   * @name pais$
   * @type {Observable<Catalogo[]>}
   * @description
   * Observable que emite una lista de objetos de tipo Catalogo,
   * representando los países y bloques disponibles.
   */
  pais$!: Observable<Catalogo[]>;

  estado!: Catalogo;
  paisBloque!: Catalogo;
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Configuración de las columnas de la tabla que muestra la bitácora.
   * @type {ConfiguracionColumna<Mercancia>[]}
   */
  configuracionTabla: ConfiguracionColumna<Mercancia>[] =
    CONFIGURACION_MERCANCIA;

  /**
   * Datos de la bitácora obtenidos desde el servicio.
   * @type {Mercancia[]}
   */
  datos: Mercancia[] = [];

/**
   * Selección de la tabla inicializada como indefinida.
   * @type {TablaSeleccion}
   */
  seleccionTabla = TablaSeleccion.UNDEFINED;

  constructor(
    private fb: FormBuilder,
    private store: Tramite110204Store,
    public tramiteQuery: Tramite110204Query,
    public certificadoService: CertificadosOrigenGridService,
    private toastr: ToastrService
  ) {
    this.certificadoService
      .obtenerMercancia()
      .pipe(takeUntil(this.destroyNotifier$)) // Se cancela la suscripción cuando se destruye el componente.
      .subscribe(
        (data: Mercancia[]) => {
          setTimeout(() => {
            console.log(data);
            
            this.datos = [...data]; // Almacena los datos de la bitácora en la variable `datos`.
            console.log(this.datos, 'datos');
          }, 1000);
        },
        () => {
          this.toastr.error('Error al cargar los estados'); // Manejo de errores.
        }
      );
    this.form = this.fb.group({
      entidadFederativa: ['', [Validators.required, Validators.min(0)]],
      bloque: ['', [Validators.required, Validators.min(0)]],
    });

    this.estados$ = this.tramiteQuery.selectAltaPlanta$;
    this.pais$ = this.tramiteQuery.selectPaisBloque$;
  }

  ngOnInit(): void {
    this.cargarEstados();
    this.cargarBloque();
  }
  /**
   * Establece el estado en el almacén (store) con el valor proporcionado.
   *
   * @param {Catalogo} estado - El estado que se desea establecer en el almacén. Este parámetro debe ser de tipo `Catalogo`.
   *
   * @returns {void} - No devuelve ningún valor.
   */
  cargarEstados(): void {
    this.certificadoService
      .obtenerListaEstado()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.store.setaltaPlanta(data);
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }

  cargarBloque(): void {
    this.certificadoService
      .obtenerPaísBloque()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.store.setBloque(data);
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }
  tipoEstadoSeleccion(estado: Catalogo): void {
    this.store.setEstado(estado);
  }
  tipoSeleccion(estado: Catalogo): void {
    this.store.setEstado(estado);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Getter para obtener el control del formulario de la entidad federativa.
   * @returns {FormControl} El control para la entidad federativa.
   */
  get formularioControl(): FormControl {
    return this.form.get('entidadFederativa') as FormControl;
  }

  buscarDomicilios(): void {
    const ENTIDAD = this.formularioControl?.value;

    if (ENTIDAD && ENTIDAD !== '-1') {
      this.certificadoService
        .obtenerMercancia()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe(
          (data: Mercancia[]) => {
            console.log(data, 'data');

            this.store.setbuscarDomicilios(data);
          },
          () => {
            this.toastr.error('Error al buscar domicilios');
          }
        );
    } else {
      // Maneja el caso donde la selección de la entidad no es válida.
      this.toastr.error('Seleccione una entidad federativa válida.');
    }
  }

  public cambioFechaInicio(nuevo_valor: string) {
    this.form.get('fechaInicio')?.setValue(nuevo_valor);
    this.form.get('fechaInicio')?.markAsUntouched();
  }

  public cambioFechaFinal(nuevo_valor: string) {
    this.form.get('fechaFinal')?.setValue(nuevo_valor);
    this.form.get('fechaFinal')?.markAsUntouched();
  }
}
