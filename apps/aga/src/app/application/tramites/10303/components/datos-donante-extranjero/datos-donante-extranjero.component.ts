import { Component, OnInit } from '@angular/core';
import { map, merge } from 'rxjs';

import { CATALOGOS_ID, Catalogo } from '@ng-mf/data-access-user';
import { DATOS_DONATE_EXTRANJERO_LABELS } from '../../constantes/donaciones-extranjeras.enum';
import { DonacionesExtranjerasService } from '../../services/donaciones-extranjeras/donaciones-extranjeras.service';

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
    const PAIS$ = this.donacionesExtranjerasService
      .getPaises(CATALOGOS_ID.CAT_PAIS)
      .pipe(
        map((resp) => {
          this.pais = resp.data;
        })
      );

    const CVE_DOCUMENTO_RESIDENCIA$ = this.donacionesExtranjerasService
      .getDocumentoResidencia(CATALOGOS_ID.CAT_DOCUMENTO_RESIDENCIA)
      .pipe(
        map((resp) => {
          this.cveDocumentoResidencia = resp.data;
        })
      );

    merge(
      PAIS$,
      CVE_DOCUMENTO_RESIDENCIA$
    ).subscribe();
  }
}
