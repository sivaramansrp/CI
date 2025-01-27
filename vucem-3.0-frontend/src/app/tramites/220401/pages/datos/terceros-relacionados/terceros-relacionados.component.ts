import { Component } from '@angular/core';
import { TituloComponent } from '../../../../../shared/components/titulo/titulo.component';
import { TableComponent } from '../../../../../shared/components/table/table.component';

@Component({
  selector: 'app-terceros-relacionados',
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
  standalone: true,
  imports: [TituloComponent,TableComponent],
})
export class TercerosRelacionadosComponent {

  public establecimientoHeaderData: any[] = [];
  public establecimientoBodyData: any[] = [];
  public destinatarioHeaderData: any[] = [];
  public destinatarioBodyData: any[] = [];
  public importadorHeaderData: any[] = [];
  public importadorBodyData: any[] = [];


  constructor() {
  }

  ngOnInit(): void {
    this.getEstablecimiento();
    this.getDestinatario();
    this.getImportador();
  }

  public getEstablecimiento() {
    this.establecimientoHeaderData = ['Nombre/Denominación o Razón Social','Teléfono','Correo Electrónico','Tipo de Actividad del Establecimiento','Otro','Número de Certificado','Domicilio'];
    this.establecimientoBodyData = [
      {
        tbodyData: ['Establecimiento 1','123-456-7890','correo','Actividad 1','Otro detalle','Certificado 001','Domicilio 1'],
      }
    ]
  }

  public getDestinatario() {
    this.destinatarioHeaderData = ['Nombre/Denominación o Razón Social','Teléfono','Correo Electrónico','Domicilio','País'];
    this.destinatarioBodyData = []
  }

  public getImportador() {
    this.importadorHeaderData = ['Nombre/Denominación o Razón Social','Teléfono','Correo Electrónico','Domicilio','País'];
    this.importadorBodyData = []
  }

}
