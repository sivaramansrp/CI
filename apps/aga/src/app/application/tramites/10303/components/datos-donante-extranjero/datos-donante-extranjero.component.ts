import { Component, OnInit } from '@angular/core';
import { map, merge } from 'rxjs';

import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { DonacionesExtranjerasService } from 'libs/shared/data-access-user/src/core/services/10303/donaciones-extranjeras/donaciones-extranjeras.service';

import { CATALOGOS_ID } from 'libs/shared/data-access-user/src/tramites/constantes/constantes';
import { DATOS_DONATE_EXTRANJERO_LABELS } from 'libs/shared/data-access-user/src/tramites/constantes/10303/donaciones-extranjeras.enum';

/**
 * Componente para gestionar los datos del donante extranjero.
 */
@Component({
  selector: 'app-datos-donante-extranjero',
  templateUrl: './datos-donante-extranjero.component.html',
  styleUrl: './datos-donante-extranjero.component.scss'
})
export class DatosDonanteExtranjeroComponent implements OnInit {
  /**
   * Lista de países.
   */
  pais!: Catalogo[];

  /**
   * Lista de documentos de residencia.
   */
  cveDocumentoResidencia!: Catalogo[];

  /**
   * Etiquetas de los datos del donante extranjero.
   */
  datosDonanteExtranjero = DATOS_DONATE_EXTRANJERO_LABELS;

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
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   */
  ngOnInit(): void {
    this.inicializaCatalogos();
  }

  /**
   * Inicializa los catálogos de países y documentos de residencia.
   */
  inicializaCatalogos(): void {
    const pais$ = this.donacionesExtranjerasService
      .getPaises(CATALOGOS_ID.CAT_PAIS)
      .pipe(
        map((resp) => {
          this.pais = resp.data;
        })
      );

    const cveDocumentoResidencia$ = this.donacionesExtranjerasService
      .getDocumentoResidencia(CATALOGOS_ID.CAT_DOCUMENTO_RESIDENCIA)
      .pipe(
        map((resp) => {
          this.cveDocumentoResidencia = resp.data;
        })
      );

    merge(
      pais$,
      cveDocumentoResidencia$
    ).subscribe();
  }
}
