/**
 * @component SectoresYMercanciasComponent
 * @description Este componente es responsable de manejar los sectores y mercancías.
 * Incluye la lógica para obtener y gestionar los datos de los sectores, así como los catálogos relacionados.
 * 
 * @import { Component, OnInit } from '@angular/core';
 * @import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
 * @import { PARATEXTO } from '../../../../shared/constantes/prosec/prosec.module';
 * @import { CatalogosSelect } from '../../../../core/models/shared/components.model';
 * @import { Catalogo } from '../../../../core/models/shared/catalogos.model';
 * @import { ProsecService } from '../../../../core/services/90101/prosec.module';
 * @import { SECTORCOLUMNS } from '../../../../shared/constantes/prosec/prosec.module';
 */

import { AutorizacionProsecStore, ProsecState } from '../../estados/autorizacion-prosec.store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AUtorizacionProsecQuery } from '../../queries/autorizacion-prosec.query';
import { Catalogo } from '@ng-mf/data-access-user';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { FilaSectors } from '../../models/prosec.module';
import { HttpErrorResponse } from '@angular/common/http';
import { PARATEXTO } from '../../constantes/prosec.module';
import { ProsecService } from '../../services/prosec.service';
import { SeccionLibQuery } from '@ng-mf/data-access-user';
import { SeccionLibState } from '@ng-mf/data-access-user';
import { SeccionLibStore } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { delay } from 'rxjs';
import { map } from 'rxjs';
import { Subject } from 'rxjs';
import { tap } from 'rxjs';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'app-sectores-y-mercancias',
  templateUrl: './sectores-y-mercancias.component.html',
  styleUrl: './sectores-y-mercancias.component.scss',
})
export class SectoresYMercanciasComponent implements OnInit, OnDestroy {

  /**
   * @property {FormGroup} sectoresYMercancias - El grupo de formularios para capturar los datos de los sectores y mercancías.
   */
  sectoresYMercancias!: FormGroup;

  /**
   * @property {string} TEXTO - Constante de texto utilizada en el componente.
   */
  TEXTO: string = PARATEXTO;

  /**
   * @property {Catalogo[]} sector - Array de catálogos de sectores.
   */
  sector: Catalogo[] = [];

  TablaSeleccion = TablaSeleccion;

  sectors: any[] = [];

  sectorColumnsConfiguracion: ConfiguracionColumna<FilaSectors>[] = [
    { encabezado: 'Lista de sectores', clave: (fila) => fila.sectorLista, orden: 1 },
    { encabezado: 'Clave del sector', clave: (fila) => fila.sectorClave, orden: 2 },
  ];

  private destroyNotifier$: Subject<void> = new Subject();

  private sectoresState!: ProsecState

  private seccionState!: SeccionLibState


  constructor(private readonly fb: FormBuilder, 
    private ProsecService: ProsecService, 
    private AutorizacionProsecStore: AutorizacionProsecStore,
    private AUtorizacionProsecQuery: AUtorizacionProsecQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery
  ) {}

  /**
   * @method ngOnInit
   * @description Inicializa el componente y obtiene las listas de datos.
   */
  // ngOnInit(): void {
  //   this.obtenserLista();
  // }

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
            this.sectoresState = state as ProsecState;
          })
        )
        .subscribe();
      this.initActionFormBuild();
      this.obtenserListaEstado();
      this.recuperarDatos();

      this.seccionStore.establecerFormaValida([false]);

      this.sectoresYMercancias.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_value) => {
          if (this.sectoresYMercancias.valid) {
            this.AutorizacionProsecStore.setFormaValida([{ id: 2, descripcion: "AllValida" }])
          }
        })
      )
      .subscribe();

      if(this.sectoresState.formaValida[0].descripcion = 'AllValida'){
        this.seccionStore.establecerSeccion([true]);
        this.seccionStore.establecerFormaValida([true])
      }
      else{
        this.seccionStore.establecerFormaValida([false]);
      }

    }
  
    initActionFormBuild(): void {
      this.sectoresYMercancias = this.fb.group({
        sector: [
          this.sectoresState.Sector,
          Validators.required
        ],
        Fraccion_arancelaria: [
          this.sectoresState.Fraccion_arancelaria
        ]
      })
    }

    setValoresStore(
      form: FormGroup,
      campo: string,
      metodoNombre: keyof AutorizacionProsecStore
    ): void {
      const VALOR = form.get(campo)?.value;
      console.log(VALOR);
      (this.AutorizacionProsecStore[metodoNombre] as (value: any) => void)(
        VALOR
      );
    }

  /**
   * @method obtenserListaEstado
   * @description Obtiene la lista de sectores desde el servicio.
   */
  obtenserListaEstado(): void {
    this.ProsecService.obtenerMenuDesplegable('sector.json').subscribe({
      next: (data) => {
        this.sector = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.sector = [];
      }
    });
  }

  recuperarDatos(): void {
    this.ProsecService.obtenerTablaDatos('sectorDatos.json').subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.sectors)) {
          this.sectors = response.sectors
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
      }
    });
  }

  sectorSeleccion(Sector: Catalogo): void {
    this.AutorizacionProsecStore.setActividadProductiva([Sector]);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}