import { Component, OnInit } from '@angular/core';
import { map, merge } from 'rxjs';

import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { DonacionesExtranjerasService } from 'libs/shared/data-access-user/src/core/services/10303/donaciones-extranjeras/donaciones-extranjeras.service';

import { Contribuyente, ContribuyenteRespuesta } from 'libs/shared/data-access-user/src/core/models/10303/donaciones-extranjeras.model';
import { CATALOGOS_ID } from 'libs/shared/data-access-user/src/tramites/constantes/constantes';

/**
 * Componente para gestionar los datos de la persona autorizada para recibir donaciones.
 */
@Component({
  selector: 'app-datos-persona-oir-recibir',
  templateUrl: './datos-persona-oir-recibir.component.html',
  styleUrl: './datos-persona-oir-recibir.component.scss'
})
export class DatosPersonaOirRecibirComponent implements OnInit {
  /** 
   * Lista de países obtenida desde el servicio. 
   */
  pais!: Catalogo[];

  /**
   * RFC de la persona autorizada para recibir donaciones.
   */
  rfcPersonaAutorizada: string = '';

  /**
   * Nombre completo de la persona autorizada.
   */
  nombrePersonaAutorizada: string = '';

  /**
   * Calle de la persona autorizada.
   */
  callePersonaAutorizada: string = '';

  /**
   * Número exterior de la persona autorizada.
   */
  numExteriorPersonaAutorizada: string = '';

  /**
   * Número interior de la persona autorizada.
   */
  numInteriorPersonaAutorizada: string = '';

  /**
   * Estado de la persona autorizada.
   */
  estadoPersonaAutorizada: string = '';

  /**
   * Colonia de la persona autorizada.
   */
  coloniaPersonaAutorizada: string = '';

  /**
   * Código postal de la persona autorizada.
   */
  codigoPostalPersonaAutorizada: string = '';

  /**
   * Clave del país de la persona autorizada.
   */
  cvePaisPersonaAutorizada: string = '';

  /**
   * Correo electrónico de la persona autorizada.
   */
  correoElectronicoPersonaAutorizada: string = '';

  /**
   * Teléfono de la persona autorizada.
   */
  telefonoPersonaAutorizada: string = '';

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
   * Busca un contribuyente por RFC y actualiza los datos de la persona autorizada.
   * @param valor - Valor que indica si la búsqueda debe proceder.
   * @param id - RFC del contribuyente a buscar.
   */
  buscarContribuyenteRfc(valor: number, id: string): void {
    // Implement the logic to search for the contributor by RFC
    this.donacionesExtranjerasService.buscarContribuyente(id).subscribe({
      next: (result: ContribuyenteRespuesta) => {
        const data = result?.data[0];
        if (data !== null) {
          if (valor === 4) {
            this.construirPOyR(data, true);
          }
          else {
            alert("Valor erronio");
          }
        } else {
          if (valor === 4) {
            this.construirPOyR(data, false);
          } else {
            alert("Valor erronio");
          }
        }
      }
    });
  }

  /**
   * Completa los campos del formulario con los datos del contribuyente encontrado.
   * @param data - Datos del contribuyente obtenidos de la búsqueda.
   * @param encontrado - Indica si el contribuyente fue encontrado.
   */
  construirPOyR(data: Contribuyente, encontrado: boolean): void {
    if (encontrado) {
      if (data.rfc.length === 12) {
        this.nombrePersonaAutorizada = data.razonSocial ?? '';
      } else {
        this.nombrePersonaAutorizada = `${data.nombre} ${data.apellidoPaterno} ${data.apellidoMaterno}`;
      }

      this.callePersonaAutorizada = data.calle;
      this.numExteriorPersonaAutorizada = data.numeroExterior;
      this.numInteriorPersonaAutorizada = data.numeroInterior ?? '';
      this.estadoPersonaAutorizada = data.estado;
      this.coloniaPersonaAutorizada = data.colonia;
      this.codigoPostalPersonaAutorizada = data.codigoPostal;
      this.cvePaisPersonaAutorizada = data.pais;
      this.correoElectronicoPersonaAutorizada = data.correoElectronico;
      this.telefonoPersonaAutorizada = data.telefono;
    } else {
      this.restablecerFormulario();
    }
  }

  /**
   * Resetea todos los campos del formulario a sus valores iniciales.
   */
  restablecerFormulario(): void {
    this.rfcPersonaAutorizada = '';
    this.nombrePersonaAutorizada = '';
    this.callePersonaAutorizada = '';
    this.numExteriorPersonaAutorizada = '';
    this.numInteriorPersonaAutorizada = '';
    this.estadoPersonaAutorizada = '';
    this.coloniaPersonaAutorizada = '';
    this.codigoPostalPersonaAutorizada = '';
    this.cvePaisPersonaAutorizada = '';
    this.correoElectronicoPersonaAutorizada = '';
    this.telefonoPersonaAutorizada = '';
  }
}
