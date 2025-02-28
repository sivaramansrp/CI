import { Component, OnInit } from '@angular/core';
import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { DonacionesExtranjerasService } from 'libs/shared/data-access-user/src/core/services/10303/donaciones-extranjeras/donaciones-extranjeras.service';
import { CATALOGOS_ID } from 'libs/shared/data-access-user/src/tramites/constantes/constantes';
import { map, merge } from 'rxjs';
import { Contribuyente, ContribuyenteRespuesta } from 'libs/shared/data-access-user/src/core/models/10303/donaciones-extranjeras.model';

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
    const pais$ = this.donacionesExtranjerasService
      .getPaises(CATALOGOS_ID.CAT_PAIS)
      .pipe(
        map((resp) => {
          this.pais = resp.data;
        })
      );

    merge(
      pais$
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
        const data = result?.data[0];
        if (data !== null) {
          if (valor === 6) {
            this.fabricante(data, true);
          }
          else {
            alert("Valor erronio");
          }
        } else {
          if (valor === 6) {
            this.fabricante(data, false);
          } else {
            alert("Valor erronio");
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
