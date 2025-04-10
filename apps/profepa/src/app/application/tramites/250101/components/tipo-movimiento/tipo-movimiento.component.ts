import {
  Catalogo,
  CatalogoSelectComponent,
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { MOVIMIENTO_OPCIONES_DE_BOTON_DE_RADIO } from '../../constantes/flora-fauna.enum';
import { TipoMovimientoService } from '../../services/tipo-movimiento.service';

@Component({
  selector: 'app-tipo-movimiento',
  standalone: true,
  imports: [TituloComponent, InputRadioComponent, CatalogoSelectComponent],
  templateUrl: './tipo-movimiento.component.html',
  styleUrl: './tipo-movimiento.component.scss', 
})
export class TipoMovimientoComponent implements OnInit {
  movimientoOpcionDeBotonDeRadio = MOVIMIENTO_OPCIONES_DE_BOTON_DE_RADIO;

  constructor(private tipoMovimientoService: TipoMovimientoService) {
    //
  }

  aduanaData: Catalogo[] = [];
  inspectoriaData: Catalogo[] = [];
  municipioData: Catalogo[] = [];

  ngOnInit(): void {
    this.tipoMovimientoService.getAduanaData().subscribe((data) => {
      this.aduanaData = data;
    });

    this.tipoMovimientoService.getInspectoriaData().subscribe((data) => {
      this.inspectoriaData = data;
    });

    this.tipoMovimientoService.getAlcaldiaData().subscribe((data) => {
      this.municipioData = data;
    });
  }
}
