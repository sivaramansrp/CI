/* eslint-disable sort-imports */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, Catalogo, CatalogoSelectComponent, REQUISITOS_OPCIONALES, TituloComponent } from '@libs/shared/data-access-user/src';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';

@Component({
  selector: 'app-requisitos-necesarios',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    AlertComponent,
    CatalogoSelectComponent
  ],
  templateUrl: './requisitos-necesarios.component.html',
  styleUrl: './requisitos-necesarios.component.scss',
})
export class RequisitosNecesariosComponent implements OnInit {

  public TEXTOS = REQUISITOS_OPCIONALES;
  public tipoDocumentoCatalogo!: Catalogo[];
  // getTipoDeDocumentoDatos

  constructor(
      private certificadosLicenciasSvc: CertificadosLicenciasPermisosService
  ) {
    //
  }

  ngOnInit(): void {
    this.getTipoDeDocumentoCatalog();
  }

  public getTipoDeDocumentoCatalog(): void {
    this.certificadosLicenciasSvc.getTipoDeDocumentoDatos().subscribe((response) => {
      const API_DATOS = JSON.parse(JSON.stringify(response));
      this.tipoDocumentoCatalogo = API_DATOS.data;
    });
  }

  public setValoresStore(): void {
    // setValoresStore
  }
}
