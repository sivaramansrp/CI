import { Catalogo, CatalogoSelectComponent, InputRadioComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {RadioOpcion,SolicitudJson} from '@libs/shared/data-access-user/src/core/models/231003/solicitud.model'
import { CommonModule } from '@angular/common';
import rawData from '@libs/shared/theme/assets/json/231003/solicitud.json';
const RADIO_OPCIONES = rawData as SolicitudJson;

@Component({
  selector: 'app-datos-residuos-peligrosos',
  standalone: true,
  imports: [CommonModule,
      TituloComponent,
      ReactiveFormsModule,InputRadioComponent,CatalogoSelectComponent,TableComponent],
  templateUrl: './datos-residuos-peligrosos.component.html',
  styleUrl: './datos-residuos-peligrosos.component.css',
})
export class DatosResiduosPeligrososComponent implements OnInit {
  datosResiduospPeligrosos!: FormGroup;

  nombre!: Catalogo[];

  public establecimientoHeaderData: string[] = [];

  public establecimientoBodyData: unknown = [];

  radioOptions: RadioOpcion[] = RADIO_OPCIONES.radioOptions;

  ngOnInit(): void {
    this.nombre = RADIO_OPCIONES.nombre;
    this.establecimientoHeaderData= RADIO_OPCIONES.PrimasRelacionadas[0]?.encabezadoDeTabla || [];
    this.establecimientoBodyData= RADIO_OPCIONES.PrimasRelacionadas[0]?.cuerpoTabla || [];
  }
}
