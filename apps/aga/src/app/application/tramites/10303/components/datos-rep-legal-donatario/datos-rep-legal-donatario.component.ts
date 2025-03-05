import { Component, OnInit } from '@angular/core';
import { map, merge } from 'rxjs';

import { DonacionesExtranjerasService } from '../../services/donaciones-extranjeras/donaciones-extranjeras.service';

import { CATALOGOS_ID, Catalogo } from '@ng-mf/data-access-user';
import { Contribuyente, ContribuyenteRespuesta } from '../../models/donaciones-extranjeras.model';

/**
 * Componente que maneja los datos del representante legal del donatario.
 */
@Component({
  selector: 'app-datos-rep-legal-donatario',
  templateUrl: './datos-rep-legal-donatario.component.html',
  styleUrl: './datos-rep-legal-donatario.component.scss'
})
export class DatosRepLegalDonatarioComponent implements OnInit {
  /**
   * Lista de países obtenida desde el servicio.
   */
  pais!: Catalogo[];

  /**
   * RFC del representante legal donatario. 
   */
  rfcRepLegalDonatario: string = '';

  /**
   * Nombre del representante legal donatario.
   */
  nombreRepLegalDonatario: string = '';

  /**
   * Calle del representante legal donatario.
   */
  calleRepLegalDonatario: string = '';

  /**
   * Número exterior del representante legal donatario.
   */
  numExteriorRepLegalDonatario: string = '';

  /**
   * Número interior del representante legal donatario.
   */
  numInteriorRepLegalDonatario: string = '';

  /**
   * Estado del representante legal donatario.
   */
  estadoRepLegalDonatario: string = '';

  /**
   * Colonia del representante legal donatario.
   */
  coloniaRepLegalDonatario: string = '';

  /**
   * Código postal del representante legal donatario.
   */
  codigoPostalRepLegalDonatario: string = '';

  /**
   * Clave del país del representante legal donatario.
   */
  cvePaisRepLegalDonatario: string = '';

  /**
   * Correo electrónico del representante legal donatario.
   */
  correoElectronicoRepLegalDonatario: string = '';

  /**
   * Teléfono del representante legal donatario.
   */
  telefonoRepLegalDonatario: string = '';

  /**
   * Constructor del componente.
   * 
   * @param donacionesExtranjerasService Servicio para gestionar las donaciones extranjeras.
   */
  constructor(
    private donacionesExtranjerasService: DonacionesExtranjerasService
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método que se ejecuta cuando el componente se inicializa.
   * Llama a la función `inicializaCatalogos()` para cargar los catálogos de países.
   */
  ngOnInit(): void {
    this.inicializaCatalogos();
  }

  /**
   * Método que inicializa los catálogos necesarios, como el de países, llamando al servicio `donacionesExtranjerasService`.
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
   * Busca un contribuyente por RFC y actualiza los datos del representante legal donatario.
   * 
   * @param {number} valor - Valor que determina si la búsqueda se debe realizar correctamente (en este caso 2).
   * @param {string} id - RFC del contribuyente que se va a buscar.
   */
  buscarContribuyenteRfc(valor: number, id: string): void {
    // Implementar la lógica para buscar el colaborador por RFC
    this.donacionesExtranjerasService.buscarContribuyente(id).subscribe({
      next: (result: ContribuyenteRespuesta) => {
        const DATA = result?.data[0];
        if (DATA !== null) {
          if (valor === 2) {
            this.construirRLdonatario(DATA, true);
          }
          else {
            console.error("Valor erronio");
          }
        } else {
          if (valor === 2) {
            this.construirRLdonatario(DATA, false);
          } else {
            console.error("Valor erronio");
          }
        }
      }
    });
  }

  /**
   * Completa los campos del formulario con los datos del contribuyente encontrado.
   * Si el contribuyente no se encuentra, resetea el formulario.
   * 
   * @param {Contribuyente} data - Datos del contribuyente obtenidos de la búsqueda.
   * @param {boolean} encontrado - Indica si el contribuyente fue encontrado (true o false).
   */
  construirRLdonatario(data: Contribuyente, encontrado: boolean): void {
    if (encontrado) {
      if (data.rfc.length === 12) {
        this.nombreRepLegalDonatario = data.razonSocial ?? '';
      } else {
        this.nombreRepLegalDonatario = `${data.nombre} ${data.apellidoPaterno} ${data.apellidoMaterno}`;
      }

      this.calleRepLegalDonatario = data.calle;
      this.numExteriorRepLegalDonatario = data.numeroExterior;
      this.numInteriorRepLegalDonatario = data.numeroInterior ?? '';
      this.estadoRepLegalDonatario = data.estado;
      this.coloniaRepLegalDonatario = data.colonia;
      this.codigoPostalRepLegalDonatario = data.codigoPostal;
      this.cvePaisRepLegalDonatario = data.pais;
      this.correoElectronicoRepLegalDonatario = data.correoElectronico;
      this.telefonoRepLegalDonatario = data.telefono;
    } else {
      this.restablecerFormulario();
    }
  }

  /**
   * Resetea todos los campos del formulario a sus valores iniciales.
   */
  restablecerFormulario(): void {
    this.rfcRepLegalDonatario = '';
    this.nombreRepLegalDonatario = '';
    this.calleRepLegalDonatario = '';
    this.numExteriorRepLegalDonatario = '';
    this.numInteriorRepLegalDonatario = '';
    this.estadoRepLegalDonatario = '';
    this.coloniaRepLegalDonatario = '';
    this.codigoPostalRepLegalDonatario = '';
    this.cvePaisRepLegalDonatario = '';
    this.correoElectronicoRepLegalDonatario = '';
    this.telefonoRepLegalDonatario = '';
  }
}
