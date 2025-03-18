import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CatalogoSelectComponent,
  InputFecha,
  InputFechaComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';
import {
  COMPLEMENTO_DE_PLANTA,
  FECHA_DE_FIN_DE_VIGENCIA,
  FECHA_DE_FIRMA,
} from '../../constantes/complementar-planta.enum';
@Component({
  selector: 'app-complementar-planta',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './complementar-planta.component.html',
  styleUrl: './complementar-planta.component.scss',
})
export class ComplementarPlantaComponent {
  fetchaDeFirma: InputFecha = FECHA_DE_FIRMA;
  fetchaDeFinDeVigencia: InputFecha = FECHA_DE_FIN_DE_VIGENCIA;
  permaneceraMercanciaProgramaOptions = [];
  documentoOptions = [];

  complecomplementoDePlantaTableSelection = TablaSeleccion.CHECKBOX;
  complementoDePlantaEncabezado = COMPLEMENTO_DE_PLANTA;
  complementoDePlantaDatos = [];
}
