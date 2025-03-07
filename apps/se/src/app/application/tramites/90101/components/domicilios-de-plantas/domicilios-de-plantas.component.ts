/**
 * @component DomiciliosDePlantasComponent
 * @description Este componente es responsable de manejar los domicilios de plantas.
 * Incluye la lógica para obtener y gestionar los datos de las plantas, así como los catálogos relacionados.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
 * @import { TEXTO } from '../../../../shared/constantes/prosec/prosec.module';
 * @import { Catalogo } from '../../../../core/models/shared/catalogos.model';
 * @import { ProsecService } from '../../../../core/services/90101/prosec.module';
 * @import { PLANTACOLUMNS } from '../../../../shared/constantes/prosec/prosec.module';
 */

import { AutorizacionProsecStore, ProsecState } from '../../estados/autorizacion-prosec.store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AUtorizacionProsecQuery } from '../../queries/autorizacion-prosec.query';
import { Catalogo } from '@ng-mf/data-access-user';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { FilaPlantas } from '../../models/prosec.module'
import { ProsecService } from '../../services/prosec.service';
import { TEXTO } from '../../constantes/prosec.module';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { map } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-domicilios-de-plantas',
  templateUrl: './domicilios-de-plantas.component.html',
  styleUrls: ['./domicilios-de-plantas.component.scss'],
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

  TablaSeleccion = TablaSeleccion;

  private destroyNotifier$: Subject<void> = new Subject();

  private domiciliosState!: ProsecState;

  plantaColumnsConfiguracion: ConfiguracionColumna<FilaPlantas>[] = [
    { encabezado: 'Calle', 
      clave: (fila) => fila.calle, 
      orden: 1 },
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
  ];

  plantasDatos = [
    {
      calle: 'CALLE 5',
      numeroExterior: 'S/N',
      numeroInterior: '',
      codigoPostal: 81124,
      colonia: 'OTRA NO ESPECIFICADA EN EL CATÁLOGO',
      municipioOAlcaldia: 'GUASAVE'
    }

  ];



  constructor(
    private readonly fb: FormBuilder, 
    private ProsecService: ProsecService, 
    private AutorizacionProsecStore: AutorizacionProsecStore,
    private AUtorizacionProsecQuery: AUtorizacionProsecQuery,
  ) {
    // Constructor logic can be added here if needed
  }

  ngOnInit(): void {
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

  initActionFormBuild(): void {
    this.forma = this.fb.group({
      modalidad: [
        this.domiciliosState.modalidad,
        Validators.required,
      ]
    })
  }

  /**
   * @method obtenserListaEstado
   * @description Obtiene la lista de estados desde el servicio.
   */
  obtenerListaEstado(): void {
    this.ProsecService.obtenerMenuDesplegable('estado.json').subscribe(data => {
      this.estadoSeleccionar = data as Catalogo[];
    }
  );
  }

  /**
   * @method obtenserListaFederal
   * @description Obtiene la lista de representación federal desde el servicio.
   */
  obtenerListaFederal(): void {
    this.ProsecService.obtenerMenuDesplegable('federal.json').subscribe(data => {
      this.RepresentacionFederal = data as Catalogo[];
    });
  }

  /**
   * @method obtenserListaActividad
   * @description Obtiene la lista de actividad productiva desde el servicio.
   */
  obtenerListaActividad(): void {
    this.ProsecService.obtenerMenuDesplegable('actividad_productiva.json').subscribe(data => {
      this.ActividadProductiva = data as Catalogo[];
    });
  }

   /**
   * @method obtenserLista
   * @description Obtiene las listas de datos de estados, representación federal y actividad productiva.
   */
   obtenerLista() {
    this.obtenerListaEstado();
    this.obtenerListaFederal();
    this.obtenerListaActividad();
  }

  estadoSeleccion(Estado: Catalogo): void {
    this.AutorizacionProsecStore.setEstado([Estado]);
  }

  fedralSeleccion(RepresentacionFederal: Catalogo): void {
    this.AutorizacionProsecStore.setRepresentacionFederal([RepresentacionFederal]);
  }

  productivaSeleccion(ActividadProductiva: Catalogo): void {
    this.AutorizacionProsecStore.setActividadProductiva([ActividadProductiva]);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  
}