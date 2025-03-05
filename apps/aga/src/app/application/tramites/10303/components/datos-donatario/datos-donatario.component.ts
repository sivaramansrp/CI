import { Component, OnInit } from '@angular/core';
import { map, merge } from 'rxjs';

import { DonacionesExtranjerasService } from '../../services/donaciones-extranjeras/donaciones-extranjeras.service';

import { CATALOGOS_ID, Catalogo} from '@ng-mf/data-access-user';
import { Contribuyente, ContribuyenteRespuesta } from '../../models/donaciones-extranjeras.model';

/**
 * Componente para gestionar los datos del donantario.
 */
@Component({
  selector: 'app-datos-donatario',
  templateUrl: './datos-donatario.component.html',
  styleUrl: './datos-donatario.component.scss'
})
export class DatosDonatarioComponent implements OnInit {
  /** 
   * Lista de países obtenida desde el servicio.
   * @type {Catalogo[]}
   */
  pais!: Catalogo[];

  /** 
   * RFC del donatario.
   * @type {string}
   */
  rfcDonatario: string = '';

  /** 
   * Nombre completo del donatario.
   * @type {string}
   */
  nombreDonatario: string = '';

  /** 
   * Calle del donatario.
   * @type {string}
   */
  calleDonatario: string = '';

  /** 
   * Número exterior de la dirección del donatario.
   * @type {string}
   */
  numExteriorDonatario: string = '';

  /** 
   * Número interior de la dirección del donatario.
   * @type {string}
   */
  numInteriorDonatario: string = '';

  /** 
   * Estado del donatario.
   * @type {string}
   */
  estadoDonatario: string = '';

  /** 
   * Colonia del donatario.
   * @type {string}
   */
  coloniaDonatario: string = '';

  /** 
   * Código postal del donatario.
   * @type {string}
   */
  codigoPostalDonatario: string = '';

  /** 
   * Clave del país del donatario.
   * @type {string}
   */
  cvePaisDonatario: string = '';

  /** 
   * Correo electrónico del donatario.
   * @type {string}
   */
  correoElectronicoDonatario: string = '';

  /** 
  * Teléfono del donatario.
  * @type {string}
  */
  telefonoDonatario: string = '';

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
    const PAIS$ = this.donacionesExtranjerasService
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
   * Busca un contribuyente por RFC y completa los datos del donatario si se encuentra.
   * @param valor - Valor que determina si se debe proceder o no con la búsqueda.
   * @param id - RFC del contribuyente a buscar.
   */
  buscarContribuyenteRfc(valor: number, id: string): void {
    //Implementar la lógica para buscar el colaborador por RFC
    this.donacionesExtranjerasService.buscarContribuyente(id).subscribe({
      next: (result: ContribuyenteRespuesta) => {
        const DATA = result?.data[0];
        if (DATA !== null) {
          if (valor === 1) {
            this.construirDonatario(DATA, true);
          }
          else {
            console.error("Valor erronio");
          }
        } else {
          if (valor === 1) {
            this.construirDonatario(DATA, false);
          } else {
            console.error("Valor erronio");
          }
        }
      }
    });
  }

  /**
   * Completa los campos del formulario con los datos del contribuyente encontrado.
   * @param data - Datos del contribuyente obtenidos.
   * @param encontrado - Indica si el contribuyente fue encontrado.
   */
  construirDonatario(data: Contribuyente, encontrado: boolean): void {
    if (encontrado) {
      if (data.rfc.length === 12) {
        this.nombreDonatario = data.razonSocial ?? '';
      } else {
        this.nombreDonatario = `${data.nombre} ${data.apellidoPaterno} ${data.apellidoMaterno}`;
      }

      this.calleDonatario = data.calle;
      this.numExteriorDonatario = data.numeroExterior;
      this.numInteriorDonatario = data.numeroInterior ?? '';
      this.estadoDonatario = data.estado;
      this.coloniaDonatario = data.colonia;
      this.codigoPostalDonatario = data.codigoPostal;
      this.cvePaisDonatario = data.pais;
      this.correoElectronicoDonatario = data.correoElectronico;
      this.telefonoDonatario = data.telefono;
    } else {
      this.restablecerFormulario();
    }
  }

  /**
   * Resetea todos los campos del formulario a sus valores iniciales.
   */
  restablecerFormulario(): void {
    this.rfcDonatario = '';
    this.nombreDonatario = '';
    this.calleDonatario = '';
    this.numExteriorDonatario = '';
    this.numInteriorDonatario = '';
    this.estadoDonatario = '';
    this.coloniaDonatario = '';
    this.codigoPostalDonatario = '';
    this.cvePaisDonatario = '';
    this.correoElectronicoDonatario = '';
    this.telefonoDonatario = '';
  }
}
