import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";
import { AlertComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/alert/alert.component";
import { ConfiguracionColumna, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { MercanciaCertificado, ProductoresAsociados } from '../../models/certificado.model';
import { TablaDinamicaComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component";
import { CertificadoService } from '../../services/certificado.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
const TEXTO_DE_ALERTA_MERCANCIAS ='Mercancias del Certificado';
const TEXTO_DE_ALERTA_PRODUCTORES= 'Productores asociados';

@Component({
  selector: 'app-certificado-de-origen',
  standalone: true,
  imports: [CommonModule, TituloComponent, AlertComponent, TablaDinamicaComponent,ReactiveFormsModule],
  templateUrl: './certificado-de-origen.component.html',
  styleUrl: './certificado-de-origen.component.css',
})
export class CertificadoDeOrigenComponent implements OnInit {
  TEXTO_DE_ALERTA_MERCANCIAS = TEXTO_DE_ALERTA_MERCANCIAS;
  TEXTO_DE_ALERTA_PRODUCTORES = TEXTO_DE_ALERTA_PRODUCTORES;
  TablaSeleccion = TablaSeleccion;
   cancelacionForm!: FormGroup;
  public mercanciaCertificadoTablaDatos: MercanciaCertificado[] = [];
  public productoresAsociadosTablaDatos: ProductoresAsociados[] = [];

  public encabezadosMercancias: ConfiguracionColumna<MercanciaCertificado>[] = [
      {encabezado: 'Número de Orden',clave: (ele: MercanciaCertificado) => ele.numeroOrden, orden: 1, },
      {encabezado: 'Fracción Arancelaria', clave: (ele: MercanciaCertificado) => ele.fraccionArancelaria,orden: 2,},
      {encabezado: 'Nombre Técnico',clave: (ele: MercanciaCertificado) => ele.nombreTecnico, orden: 3,},
      {encabezado: 'Nombre Comercial',clave: (ele: MercanciaCertificado) => ele.nombreComercial,orden: 4,},
      {encabezado: 'Nombre en Inglés',clave: (ele: MercanciaCertificado) => ele.nombreIngles, orden: 5,},
      {encabezado: 'Complemento descripción',clave: (ele: MercanciaCertificado) => ele.complementoDescripcion, orden: 6,},
      {encabezado: 'Número de certificado',clave: (ele: MercanciaCertificado) => ele.numeroCertificado, orden: 7, },
      {encabezado: 'Pais/Bloque', clave: (ele: MercanciaCertificado) => ele.pais,orden: 8,},
      {encabezado: 'Tratado/Acuerdo',clave: (ele: MercanciaCertificado) => ele.tratado, orden: 9,},
      {encabezado: 'Fecha expedición',clave: (ele: MercanciaCertificado) => ele.fechaExpedicion,orden: 10,},
      {encabezado: 'Fecha vencimíento',clave: (ele: MercanciaCertificado) => ele.fechaVencimiento, orden: 11,},
    ];

  public encabezadosProductores : ConfiguracionColumna<ProductoresAsociados>[] = [
    {encabezado: 'Nombre del productor',clave: (ele: ProductoresAsociados) => ele.nombreProductor, orden: 1, },
    {encabezado: 'Número de registro fiscal', clave: (ele: ProductoresAsociados) => ele.numeroRegistroFiscal,orden: 2,},
    {encabezado: 'Dirección',clave: (ele: ProductoresAsociados) => ele.direccion, orden: 3,},
    {encabezado: 'Correo Electrónico',clave: (ele: ProductoresAsociados) => ele.correoElectronico,orden: 4,},
    {encabezado: 'Teléfono',clave: (ele: ProductoresAsociados) => ele.telefono, orden: 5,},
    {encabezado: 'Razón Social',clave: (ele: ProductoresAsociados) => ele.razonSocial, orden: 6,},
  ];

constructor(private certificadoService:CertificadoService ){}

  ngOnInit(): void {
    this.cancelacionForm = new FormGroup({
      motivoCancelacion: new FormControl('', Validators.required)
    });
    this.getMercanciaCertificadoTabla();
  }

  validarDestinatarioFormulario(): void {
    if (this.cancelacionForm.invalid) {
      this.cancelacionForm.markAllAsTouched();
    }
  }

  public getMercanciaCertificadoTabla(): void {
    this.certificadoService.getMercanciaCertificadoTabla().subscribe((data) => {
      console.log(data)
      this.mercanciaCertificadoTablaDatos = data;
    });
  }
}
