/* eslint-disable sort-imports */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { Catalogo, CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  imports: [CommonModule,TituloComponent,CatalogoSelectComponent,ReactiveFormsModule],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss',
})
export class PagoDeDerechosComponent implements OnInit {

   public bancoCatalogo!: Catalogo[];
   public pagoDerechosForm!: FormGroup;

  constructor(  
    private certificadosLicenciasSvc: CertificadosLicenciasPermisosService,
    private fb: FormBuilder
  ) {
    //
   }

  ngOnInit(): void {
    this.getBancoCatalogDatos();
    this.cerrarPagoDerechosForm();
  }

  public cerrarPagoDerechosForm(): void {
    this.pagoDerechosForm = this.fb.group({
      claveDeReferencia: [''],
      cadenaDaLaDependencia: [''],
      banco: [''],
      laveDePago: [''],
      fechaDePago: [''],
      importeDePago: ['']
    });
  }

  public getBancoCatalogDatos(): void {
    this.certificadosLicenciasSvc.getBancoDatos().subscribe((response) => {
      const API_DATOS = JSON.parse(JSON.stringify(response));
      this.bancoCatalogo = API_DATOS.data;
    });
  }
}
