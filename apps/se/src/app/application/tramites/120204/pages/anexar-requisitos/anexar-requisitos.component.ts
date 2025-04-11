import { CATALOGOS_ID, Catalogo, CatalogosService } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TEXTOS } from '@libs/shared/data-access-user/src/tramites/constantes/303/texto.enum';

/**
 * Componente que representa el segundo paso del trámite.
 * Permite al usuario anexar documentos necesarios para el trámite.
 */
@Component({
  selector: 'app-anexar-requisitos',
  templateUrl: './anexar-requisitos.component.html',
  styleUrl: './anexar-requisitos.component.scss',
})
export class AnexarRequisitosComponent {
  /**
   * Textos utilizados en el componente.
   */
  TEXTOS = TEXTOS;

  /**
   * Clase CSS para mostrar una alerta informativa.
   */
  claseAlertaInformativa = 'alert-info';
}
