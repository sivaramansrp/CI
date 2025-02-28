import { Component, OnInit } from '@angular/core';
import { map, merge } from 'rxjs';

import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { DonacionesExtranjerasService } from 'libs/shared/data-access-user/src/core/services/10303/donaciones-extranjeras/donaciones-extranjeras.service';

import { Contribuyente, ContribuyenteRespuesta } from 'libs/shared/data-access-user/src/core/models/10303/donaciones-extranjeras.model';
import { CATALOGOS_ID } from 'libs/shared/data-access-user/src/tramites/constantes/constantes';

/**
 * Componente para gestionar los datos del representante legal autorizado para recibir donaciones.
 */
@Component({
  selector: 'app-datos-rep-legal-recibir-donacion',
  templateUrl: './datos-rep-legal-recibir-donacion.component.html',
  styleUrl: './datos-rep-legal-recibir-donacion.component.scss'
})
export class DatosRepLegalRecibirDonacionComponent implements OnInit {
  /**
   * Lista de países obtenida desde el servicio.
   */
  pais!: Catalogo[];

  /**
   * RFC del representante legal autorizado para recibir donaciones.
   */
  rfcRepLegalAutorizado: string = '';

  /**
   * Nombre completo del representante legal autorizado.
   */
  nombreRepLegalAutorizado: string = '';

  /**
   * Calle del representante legal autorizado.
   */
  calleRepLegalAutorizado: string = '';

  /**
   * Número exterior del representante legal autorizado.
   */
  numExteriorRepLegalAutorizado: string = '';

  /**
   * Número interior del representante legal autorizado.
   */
  numInteriorRepLegalAutorizado: string = '';

  /**
   * Estado del representante legal autorizado.
   */
  estadoRepLegalAutorizado: string = '';

  /**
   * Colonia del representante legal autorizado.
   */
  coloniaRepLegalAutorizado: string = '';

  /**
   * Código postal del representante legal autorizado.
   */
  codigoPostalRepLegalAutorizado: string = '';

  /**
   * Clave del país del representante legal autorizado.
   */
  cvePaisRepLegalAutorizado: string = '';

  /**
   * Correo electrónico del representante legal autorizado.
   */
  correoElectronicoRepLegalAutorizado: string = '';

  /**
   * Teléfono del representante legal autorizado.
   */
  telefonoRepLegalAutorizado: string = '';

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
   * Se ejecuta al inicializar el componente.
   * Llama a la función `inicializaCatalogos()` para cargar los catálogos necesarios.
   */
  ngOnInit(): void {
    this.inicializaCatalogos();
  }

  /**
   * Inicializa los catálogos necesarios, como el de países.
   * Llama al servicio `donacionesExtranjerasService` para obtener la lista de países.
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
   * Busca un contribuyente por RFC y actualiza los datos del representante legal autorizado.
   * @param {number} valor - Valor que indica si la búsqueda debe proceder.
   * @param {string} id - RFC del contribuyente a buscar.
   */
  buscarContribuyenteRfc(valor: number, id: string): void {
    // Implement the logic to search for the contributor by RFC
    this.donacionesExtranjerasService.buscarContribuyente(id).subscribe({
      next: (result: ContribuyenteRespuesta) => {
        const data = result?.data[0];
        if (data !== null) {
          if (valor === 3) {
            this.construirRLAu(data, true);
          }
          else {
            alert("Valor erronio");
          }
        } else {
          if (valor === 3) {
            this.construirRLAu(data, false);
          } else {
            alert("Valor erronio");
          }
        }
      }
    });
  }

  /**
   * Completa los campos del formulario con los datos del contribuyente encontrado.
   * @param {Contribuyente} data - Datos del contribuyente obtenidos de la búsqueda.
   * @param {boolean} encontrado - Indica si el contribuyente fue encontrado.
   */
  construirRLAu(data: Contribuyente, encontrado: boolean): void {
    if (encontrado) {
      if (data.rfc.length === 12) {
        this.nombreRepLegalAutorizado = data.razonSocial ?? '';
      } else {
        this.nombreRepLegalAutorizado = `${data.nombre} ${data.apellidoPaterno} ${data.apellidoMaterno}`;
      }

      this.calleRepLegalAutorizado = data.calle;
      this.numExteriorRepLegalAutorizado = data.numeroExterior;
      this.numInteriorRepLegalAutorizado = data.numeroInterior ?? '';
      this.estadoRepLegalAutorizado = data.estado;
      this.coloniaRepLegalAutorizado = data.colonia;
      this.codigoPostalRepLegalAutorizado = data.codigoPostal;
      this.cvePaisRepLegalAutorizado = data.pais;
      this.correoElectronicoRepLegalAutorizado = data.correoElectronico;
      this.telefonoRepLegalAutorizado = data.telefono;
    } else {
      this.restablecerFormulario();
    }
  }

  /**
   * Resetea todos los campos del formulario a sus valores iniciales.
   */
  restablecerFormulario(): void {
    this.rfcRepLegalAutorizado = '';
    this.nombreRepLegalAutorizado = '';
    this.calleRepLegalAutorizado = '';
    this.numExteriorRepLegalAutorizado = '';
    this.numInteriorRepLegalAutorizado = '';
    this.estadoRepLegalAutorizado = '';
    this.coloniaRepLegalAutorizado = '';
    this.codigoPostalRepLegalAutorizado = '';
    this.cvePaisRepLegalAutorizado = '';
    this.correoElectronicoRepLegalAutorizado = '';
    this.telefonoRepLegalAutorizado = '';
  }
}
