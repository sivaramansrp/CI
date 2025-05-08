import {
  BtnContinuarComponent,
  Catalogo,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';
import { CatalogoSelectComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { FormBuilder } from '@angular/forms';
import { ModificacionDelCmbioDeSectorService } from '../../services/modificacion-del-cambio-de-sector.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './tipo-de-persona.component.html',
  styles: ``,
  host: {},
  imports: [WizardComponent, BtnContinuarComponent, CatalogoSelectComponent],
  standalone: true,
})
export class TipoDePersonaComponent {
  tipoDePersonaSeleccionar: Catalogo[] = [
    { "id": 1, "descripcion": "Modal" }
];

  constructor(
    private formBuilder: FormBuilder,
    private modificacionDelCmbioDeSectorService: ModificacionDelCmbioDeSectorService
  ) {}
}
