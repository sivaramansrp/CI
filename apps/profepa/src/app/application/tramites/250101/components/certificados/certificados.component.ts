import { Component, OnInit } from '@angular/core';
import { TableComponent,TituloComponent } from '@libs/shared/data-access-user/src';
import { CertificadosService } from '../../services/certificados.service';

@Component({
  selector: 'app-certificados',
  standalone: true,
  imports: [
    TituloComponent,
    TableComponent
  ],
  templateUrl: './certificados.component.html',
  styleUrl: './certificados.component.scss'
})
export class CertificadosComponent implements OnInit{

constructor(private certificadosService: CertificadosService ){
  //
}

  ngOnInit(): void {
    this.certificadosService.getFitosanitoriosEncabezadoDeTabla().subscribe((data: any) => {
      this.tablaFitosanitoriosData = data.columns;
    });

    this.certificadosService.getPermisoCertificadosDeTabla().subscribe((data: any) => {
      this.tablaPermisoCertificadosData = data.columns;
    });
  }

  tablaFitosanitoriosData: string[] = [];
  tablaPermisoCertificadosData: string[] = [];
}
