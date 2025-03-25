/* eslint-disable sort-imports */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, Catalogo, CatalogoSelectComponent, REQUISITOS_OPCIONALES, TituloComponent } from '@libs/shared/data-access-user/src';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-requisitos-necesarios',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    AlertComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './requisitos-necesarios.component.html',
  styleUrl: './requisitos-necesarios.component.scss',
})
export class RequisitosNecesariosComponent implements OnInit {

  public TEXTOS = REQUISITOS_OPCIONALES;
  public tipoDocumentoCatalogo!: Catalogo[];
  public tipoDeDocumentoForm!: FormGroup;

  constructor(
      private certificadosLicenciasSvc: CertificadosLicenciasPermisosService,
      private fb: FormBuilder
  ) {
    //
  }

  ngOnInit(): void {
    this.getTipoDeDocumentoCatalog();
    this.cerrarTipoDeDocumentoForm();
  }

  public getTipoDeDocumentoCatalog(): void {
    this.certificadosLicenciasSvc.getTipoDeDocumentoDatos().subscribe((response) => {
      const API_DATOS = JSON.parse(JSON.stringify(response));
      this.tipoDocumentoCatalogo = API_DATOS.data;
    });
  }

  public cerrarTipoDeDocumentoForm(): void {
    this.tipoDeDocumentoForm = this.fb.group({
      tipoDocumento: ['']
    });
  }

  public setValoresStore(): void {
    // setValoresStore
  }
}
