/**
 * compo doc
 * @component ListaDomicilios90305Component
 * @description
 * Este componente muestra una lista de domicilios relacionados con Prosec.
 * Los datos se obtienen desde el servicio `ProsecModificacionServiceTsService`
 * y se presentan en una tabla dinámica.
 */

import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import {
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';


import { ConfiguracionColumna } from '@ng-mf/data-access-user';


import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProsecModificacionServiceTsService } from '../../services/prosec-modificacion.service';

import { ProsecModificacionModel } from '../../models/prosec-modificacion.model';

/**
 * compo doc
 * @selector app-lista-domicilios-90305
 * @standalone true
 */
@Component({
  selector: 'app-lista-domicilios-90305',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
  ],
  templateUrl: './lista-domicilios-90305.component.html',
  styleUrl: './lista-domicilios-90305.component.scss',
})
export class ListaDomicilios90305Component implements OnInit, OnDestroy {
  /** Subject para destruir el componente */
  private destroy$ = new Subject<void>();
  listaDomiciliosForm!: FormGroup;
  /**
   *
   * compo doc
   * @constructor
   * @param {ProsecModificacionServiceTsService} listaDomicilios - Servicio para obtener la lista de domicilios
   */
  constructor(private listaDomicilios: ProsecModificacionServiceTsService) {
    //constructor
  }

  /** Controla qué botón se muestra en la interfaz */
  showSecondButton = false;

  /** Alterna la visibilidad de los botones */
  toggleButtons():void {
    this.showSecondButton = !this.showSecondButton;
  }

  /** Configuración de columnas para la tabla dinámica */
  configuracionTabla: ConfiguracionColumna<ProsecModificacionModel >[] = [
    {
      encabezado: 'Calle',
      clave: (item: ProsecModificacionModel ) => item.calle,
      orden: 1,
    },
    {
      encabezado: 'Número exterior',
      clave: (item: ProsecModificacionModel ) => item.numeroExterior,
      orden: 2,
    },
    {
      encabezado: 'Número interior',
      clave: (item: ProsecModificacionModel ) => item.numeroInterior,
      orden: 3,
    },
    {
      encabezado: 'Código postal',
      clave: (item: ProsecModificacionModel ) => item.codigoPostal,
      orden: 4,
    },
    {
      encabezado: 'Colonia',
      clave: (item: ProsecModificacionModel ) => item.colonia,
      orden: 5,
    },
    {
      encabezado: 'Localidad',
      clave: (item: ProsecModificacionModel ) => item.localidad,
      orden: 6,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (item: ProsecModificacionModel ) => item.municipioOAlcaldia,
      orden: 7,
    },
    {
      encabezado: 'Entidad Federativa',
      clave: (item: ProsecModificacionModel ) => item.entidadFederativa,
      orden: 8,
    },
    {
      encabezado: 'País',
      clave: (item: ProsecModificacionModel ) => item.pais,
      orden: 9,
    },
    {
      encabezado: 'Teléfono',
      clave: (item: ProsecModificacionModel ) => item.telefono,
      orden: 10,
    },
  ];

  /** Enum para la selección de tablas */
  TablaSeleccion = TablaSeleccion;

  /** Datos de domicilios obtenidos del servicio */
  personaparas: ProsecModificacionModel [] = [];

  /** Método del ciclo de vida de Angular - inicializa el componente y carga la lista de domicilios */
  ngOnInit() :void{
    this.loadDomicilios();
  }

  /**
   * Obtiene la lista de domicilios desde el servicio y la almacena en `personaparas`
   */
  loadDomicilios(): void {
    this.listaDomicilios
      .getListaDomicilios()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.personaparas = resp;
      });
  }

  /*
   * Método del ciclo de vida de Angular - destruye el componente
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
