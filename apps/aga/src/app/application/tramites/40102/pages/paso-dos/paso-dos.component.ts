import { Component, OnDestroy, OnInit } from '@angular/core';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { Subject } from 'rxjs';
import { TEXTOS } from '@ng-mf/data-access-user';
import { base64ToHex, CATALOGOS_ID, encodeToISO88591Hex } from '@ng-mf/data-access-user';
import { takeUntil } from 'rxjs/operators';
import { Certificado } from '../../../40101/pages/paso-dos/paso-dos.component';
import { modificarTerrestreService } from '../../components/services/modificacar-terrestre.service';
import { Chofer40102Query } from '../../estados/chofer40102.query';
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent implements OnInit, OnDestroy {
  /**
   * Constante que contiene los textos utilizados en el componente.
   */
  /**
   * Constante que contiene los textos utilizados en el componente.
   */
  TEXTOS: string = '';

  isSuccessCert: boolean = false
  cadenaOriginal = '';
  idSolicitud: number | undefined;
  /**
   * Lista de tipos de documentos disponibles para el trámite.
   */
  tiposDocumentos: Catalogo[] = [];

  /**
   * Clase CSS utilizada para mostrar un mensaje de alerta informativa.
   */
  infoAlert = 'alert-info';

  /**
   * Catálogo de documentos disponibles para el trámite.
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * Lista de documentos seleccionados por el usuario.
   */
  documentosSeleccionados: Catalogo[] = [];

  /**
   * Notificador para gestionar la destrucción de suscripciones activas y evitar fugas de memoria.
   */
  private destroyNotifier$ = new Subject<void>();

  constructor(private catalogosServices: CatalogosService, private modificarTerrestreService: modificarTerrestreService, private chofer40102Query: Chofer40102Query) { }
  /**
   * 
Gancho del ciclo de vida angular que se llama después de que se inicializan las propiedades enlazadas a datos.
   */
  ngOnInit(): void {
    // this.getTiposDocumentos();
    this.cadenaOriginal = this.chofer40102Query.getValue().cadenaOriginal
  }

  /**
   * Obtiene el catalgoso de los tipos de documentos disponibles para el trámite.
   */
  // getTiposDocumentos(): void {
  //   this.catalogosServices
  //     .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
  //     .pipe(takeUntil(this.destroyNotifier$))
  //     .subscribe({
  //       next: (resp): void => {
  //         if (resp.length > 0) {
  //           this.catalogoDocumentos = resp;
  //         }
  //       },
  //     });
  // }


  /**
   * Obtiene el catalgoso de los tipos de documentos disponibles para el trámite.
   */
  getDatosOfFirma(event: Certificado): void {
    const CADENAHEX = encodeToISO88591Hex(this.cadenaOriginal);
    const FIRMAHEX = base64ToHex(event ? event.firma : '');
    this.modificarTerrestreService.firmaDatos({
      cadena_original: CADENAHEX,
      sello: FIRMAHEX,
      certificate_serial_number: event ? event.certSerialNumber : ''
    }).subscribe((res) => {
      if (Number(res.codigo) === 0) {
        this.isSuccessCert = true
        this.TEXTOS = res.mensaje
      }
    });
  }


  /**
   * Gancho del ciclo de vida angular que se llama antes de que se destruya el componente.
   * Se utiliza para limpiar las suscripciones y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
