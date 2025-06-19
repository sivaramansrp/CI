import {
  AlertComponent,
  Catalogo,
  CatalogoSelectComponent,
  TablaDinamicaComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import {
  AutorizacionProsecStore,
  ProsecState,
} from '../../estados/autorizacion-prosec.store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, delay, map, takeUntil, tap } from 'rxjs';
import { AUtorizacionProsecQuery } from '../../queries/autorizacion-prosec.query';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { FilaPlantas } from '../../models/prosec.module';
import { HttpErrorResponse } from '@angular/common/http';
import { ProsecService } from '../../services/prosec.service';
import { SeccionLibQuery } from '@ng-mf/data-access-user';
import { SeccionLibState } from '@ng-mf/data-access-user';
import { SeccionLibStore } from '@ng-mf/data-access-user';
import { TEXTO } from '../../constantes/prosec.module';
import { TablaSeleccion } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-domicilios-de-plantas',
  templateUrl: './domicilios-de-plantas.component.html',
  styleUrls: ['./domicilios-de-plantas.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TituloComponent,
    AlertComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    CommonModule,
  ],
})
export class DomiciliosDePlantasComponent implements OnInit, OnDestroy {
  /**
   * @property {FormGroup} forma - El grupo de formularios para capturar los datos de las plantas.
   */
  forma!: FormGroup;

  /**
   * @property {string} TEXTO - Constante de texto utilizada en el componente.
   */
  TEXTO: string = TEXTO;

  /**
   * @property {Catalogo[]} estadoSeleccionar - Array de catálogos de estados.
   */
  estadoSeleccionar: Catalogo[] = [];

  /**
   * @property {Catalogo[]} RepresentacionFederal - Array de catálogos de representación federal.
   */
  RepresentacionFederal: Catalogo[] = [];

  /**
   * @property {Catalogo[]} ActividadProductiva - Array de catálogos de actividad productiva.
   */
  ActividadProductiva: Catalogo[] = [];

  plantasDatos: FilaPlantas[] = [];

  TablaSeleccion = TablaSeleccion;

  private destroyNotifier$: Subject<void> = new Subject();

  private domiciliosState!: ProsecState;

  private seccionState!: SeccionLibState;

  plantaColumnsConfiguracion: ConfiguracionColumna<FilaPlantas>[] = [
    { encabezado: 'Calle', clave: (fila) => fila.calle, orden: 1 },
    {
      encabezado: 'Número exterior',
      clave: (fila) => fila.numeroExterior,
      orden: 2,
    },
    {
      encabezado: 'Número interior',
      clave: (fila) => fila.numeroInterior,
      orden: 3,
    },
    {
      encabezado: 'Código postal',
      clave: (fila) => fila.codigoPostal,
      orden: 4,
    },
    {
      encabezado: 'Colonia',
      clave: (fila) => fila.colonia,
      orden: 5,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (fila) => fila.municipioOAlcaldia,
      orden: 6,
    },
    {
      encabezado: 'País',
      clave: (fila) => fila.pais,
      orden: 7,
    },
    {
      encabezado: 'Registro',
      clave: (fila) => fila.registro,
      orden: 8,
    },
    {
      encabezado: 'Registro federal de contribuyentes',
      clave: (fila) => fila.registroFederalDeContribuyentes,
      orden: 9,
    },
    {
      encabezado: 'Razón social',
      clave: (fila) => fila.razonSocial,
      orden: 10,
    },
    {
      encabezado: 'Domicilio fiscal del solicitante',
      clave: (fila) => fila.domicilioFiscalDelSolicitante,
      orden: 11,
    },
  ];

  constructor(
    private readonly fb: FormBuilder,
    private ProsecService: ProsecService,
    private AutorizacionProsecStore: AutorizacionProsecStore,
    private AUtorizacionProsecQuery: AUtorizacionProsecQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery
  ) {
    // Constructor logic can be added here if needed
  }

  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccionState = seccionState;
        })
      )
      .subscribe();
    this.AUtorizacionProsecQuery.selectProsec$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.domiciliosState = state as ProsecState;
        })
      )
      .subscribe();
    this.initActionFormBuild();
    this.obtenerLista();

    this.seccionStore.establecerFormaValida([false]);

    this.forma.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_value) => {
          if (this.forma.valid) {
            this.AutorizacionProsecStore.setFormaValida([
              { id: 1, descripcion: 'Valida' },
            ]);
          }
        })
      )
      .subscribe();

    if (this.domiciliosState.formaValida[0]?.descripcion === 'AllValida') {
      this.seccionStore.establecerSeccion([true]);
      this.seccionStore.establecerFormaValida([true]);
    } else {
      this.seccionStore.establecerFormaValida([false]);
    }
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof AutorizacionProsecStore
  ): void {
    // Cambiado el tipo "any" por "unknown" para cumplir con las reglas de TypeScript
    const VALOR = form.get(campo)?.value;
    (this.AutorizacionProsecStore[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  initActionFormBuild(): void {
    // Se asegura que el formulario se inicialice correctamente con las validaciones necesarias
    this.forma = this.fb.group({
      modalidad: [this.domiciliosState.modalidad],
      Estado: [this.domiciliosState.Estado, Validators.required],
      RepresentacionFederal: [
        this.domiciliosState.RepresentacionFederal,
        Validators.required,
      ],
      ActividadProductiva: [
        this.domiciliosState.ActividadProductiva,
        Validators.required,
      ],
    });
  }

  /**
   * @method obtenserListaEstado
   * @description Obtiene la lista de estados desde el servicio.
   */
  obtenerListaEstado(): void {
    this.ProsecService.obtenerMenuDesplegable('estado.json').subscribe({
      next: (data) => {
        this.estadoSeleccionar = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.estadoSeleccionar = [];
      },
    });
  }

  /**
   * @method obtenserListaFederal
   * @description Obtiene la lista de representación federal desde el servicio.
   */
  obtenerListaFederal(): void {
    this.ProsecService.obtenerMenuDesplegable('federal.json').subscribe({
      next: (data) => {
        this.RepresentacionFederal = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.RepresentacionFederal = [];
      },
    });
  }

  /**
   * @method obtenserListaActividad
   * @description Obtiene la lista de actividad productiva desde el servicio.
   */
  obtenerListaActividad(): void {
    this.ProsecService.obtenerMenuDesplegable(
      'actividad_productiva.json'
    ).subscribe({
      next: (data) => {
        this.ActividadProductiva = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.ActividadProductiva = [];
      },
    });
  }

  /**
   * @method obtenserLista
   * @description Obtiene las listas de datos de estados, representación federal y actividad productiva.
   */
  obtenerLista(): void {
    this.obtenerListaEstado();
    this.obtenerListaFederal();
    this.obtenerListaActividad();
    this.recuperarDatos();
  }

  estadoSeleccion(Estado: Catalogo): void {
    this.AutorizacionProsecStore.setEstado([Estado]);
  }

  fedralSeleccion(RepresentacionFederal: Catalogo): void {
    this.AutorizacionProsecStore.setRepresentacionFederal([
      RepresentacionFederal,
    ]);
  }

  productivaSeleccion(ActividadProductiva: Catalogo): void {
    this.AutorizacionProsecStore.setActividadProductiva([ActividadProductiva]);
  }

  recuperarDatos(): void {
    this.ProsecService.obtenerTablaDatos('plantasDatos.json').subscribe({
      next: (response) => {
        if (response && 'plantasDatos' in response && Array.isArray(response.plantasDatos)) {
          this.plantasDatos = response.plantasDatos;
        } else {
          this.plantasDatos = [];
        }
      },
      error: (_error: HttpErrorResponse) => {
        this.plantasDatos = [];
      },
    });
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
