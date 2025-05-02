import { ACUSE_DATOS, ACUSE_ENCABEZADOS } from "../../constants/validar-inicialmente-certificado.enum";
import { ConfiguracionColumna, TablaAcciones, TablaDinamicaComponent } from "@libs/shared/data-access-user/src";
import { AcuseLista } from "../../models/validar-inicialmente-certificado.model";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: 'app-acuse-ceror',
  standalone: true,
  imports: [
    CommonModule,
    TablaDinamicaComponent
  ],
  templateUrl: './acuse-ceror.component.html',
  styleUrl: './acuse-ceror.component.scss',
})
export class AcuseCerorComponent {
  public acuseEncabezados: ConfiguracionColumna<AcuseLista>[] = ACUSE_ENCABEZADOS;
  acuseTablaDatos: AcuseLista[] = ACUSE_DATOS
  acciones = TablaAcciones



  constructor(

  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }
}