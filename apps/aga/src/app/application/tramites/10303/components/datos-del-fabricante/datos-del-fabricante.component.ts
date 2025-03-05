import { Component, OnInit } from '@angular/core';
import { Observable, map, merge } from 'rxjs';

import { CATALOGOS_ID, Catalogo } from '@ng-mf/data-access-user';
import { Contribuyente, ContribuyenteRespuesta } from '../../models/donaciones-extranjeras.model';
import { DonacionesExtranjerasService } from '../../services/donaciones-extranjeras/donaciones-extranjeras.service';

/**
 * Componente para gestionar los datos del fabricante.
 */
@Component({
  selector: 'app-datos-del-fabricante',
  templateUrl: './datos-del-fabricante.component.html',
  styleUrl: './datos-del-fabricante.component.scss'
})
export class DatosDelFabricanteComponent implements OnInit {
  /** 
     * Lista de países obtenida desde el servicio.
     * @type {Catalogo[]}
     */
  pais!: Catalogo[];

  /** 
   * RFC del fabricante.
   * @type {string}
   */
  rfcFabricante: string = '';

  /** 
   * Nombre completo del fabricante.
   * @type {string}
   */
  nombreFabricante: string = '';

  /** 
   * Calle del fabricante.
   * @type {string}
   */
  calleFabricante: string = '';

  /** 
   * Número exterior de la dirección del fabricante.
   * @type {string}
   */
  numExteriorFabricante: string = '';

  /** 
   * Número interior de la dirección del fabricante.
   * @type {string}
   */
  numInteriorFabricante: string = '';

  /** 
   * Estado del fabricante.
   * @type {string}
   */
  estadoFabricante: string = '';

  /** 
   * Colonia del fabricante.
   * @type {string}
   */
  coloniaFabricante: string = '';

  /** 
   * Código postal del fabricante.
   * @type {string}
   */
  codigoPostalFabricante: string = '';

  /** 
   * Clave del país del fabricante.
   * @type {string}
   */
  cvePaisFabricante: string = '';

  /**
   * Constructor del componente.
   * 
   * @param donacionesExtranjerasService Servicio para gestionar las donaciones extranjeras.
   */
  constructor(
    private donacionesExtranjerasService: DonacionesExtranjerasService,
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Se ejecuta al inicializar el componente.
   * Llama a la función `inicializaCatalogos()` para obtener los catálogos.
   */
  ngOnInit(): void {
    this.inicializaCatalogos();
  }

  /**
   * Inicializa los catálogos necesarios, como el de países.
   */
  inicializaCatalogos(): void {
    const PAIS$: Observable<void> = this.donacionesExtranjerasService
      .getPaises(CATALOGOS_ID.CAT_PAIS)
      .pipe(
        map((resp) => {
          this.pais = resp.data;
        })
      );

    merge(
      PAIS$
    ).subscribe();
  }

  /**
   * Busca un contribuyente por su RFC.
   * 
   * @param valor Valor numérico para la búsqueda.
   * @param id Identificador del contribuyente.
   */
  buscarContribuyenteRfc(valor: number, id: string): void {
    //Implementar la lógica para buscar el colaborador por RFC
    this.donacionesExtranjerasService.buscarContribuyente(id).subscribe({
      next: (result: ContribuyenteRespuesta) => {
        const DATA = result?.data[0];
        if (DATA !== null) {
          if (valor === 6) {
            this.fabricante(DATA, true);
          }
          else {
            console.error("Valor erronio");
          }
        } else {
          if (valor === 6) {
            this.fabricante(DATA, false);
          } else {
            console.error("Valor erronio");
          }
        }
      }
    });
  }

  /**
   * Procesa los datos del fabricante.
   * 
   * @param data Datos del contribuyente.
   * @param encontrado Indica si el contribuyente fue encontrado.
   */
  fabricante(data: Contribuyente, encontrado: boolean): void {
    if (encontrado) {
      if (data.rfc.length === 12) {
        this.nombreFabricante = data.razonSocial ?? '';
      } else {
        this.nombreFabricante = `${data.nombre} ${data.apellidoPaterno} ${data.apellidoMaterno}`;
      }

      this.calleFabricante = data.calle;
      this.numExteriorFabricante = data.numeroExterior;
      this.numInteriorFabricante = data.numeroInterior ?? '';
      this.estadoFabricante = data.estado;
      this.coloniaFabricante = data.colonia;
      this.codigoPostalFabricante = data.codigoPostal;
      this.cvePaisFabricante = data.pais;
    } else {
      this.restablecerFormulario();
    }
  }

  /**
   * Resetea todos los campos del formulario a sus valores iniciales.
   */
  restablecerFormulario(): void {
    this.rfcFabricante = '';
    this.nombreFabricante = '';
    this.calleFabricante = '';
    this.numExteriorFabricante = '';
    this.numInteriorFabricante = '';
    this.estadoFabricante = '';
    this.coloniaFabricante = '';
    this.codigoPostalFabricante = '';
    this.cvePaisFabricante = '';
  }
}
