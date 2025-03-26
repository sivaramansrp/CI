import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";
import { AlertComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/alert/alert.component";
import { ConfiguracionColumna, InputFecha, TablaSeleccion, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { FECHAENCIMIENTO, FECHAEXPEDICIÓN, FECHAFINAL, FECHAINICIAL, MercanciaCertificado, ProductoresAsociados } from '../../models/certificado.model';
import { TablaDinamicaComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component";
import { CertificadoService } from '../../services/certificado.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFechaComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component";
import { Solicitud110219State, Tramite110219Store } from '../../estados/Tramite110219.store';
import { Tramite110219Query } from '../../estados/Tramite110219.query';
import { map, ReplaySubject, takeUntil } from 'rxjs';
const TEXTO_DE_ALERTA_MERCANCIAS ='Mercancias del Certificado';
const TEXTO_DE_ALERTA_PRODUCTORES= 'Productores asociados';

@Component({
  selector: 'app-certificado-de-origen',
  standalone: true,
  imports: [CommonModule, TituloComponent, AlertComponent, TablaDinamicaComponent, ReactiveFormsModule, InputFechaComponent],
  templateUrl: './certificado-de-origen.component.html',
  styleUrl: './certificado-de-origen.component.css',
})
export class CertificadoDeOrigenComponent implements OnInit,OnDestroy {

  cancelacionForm!: FormGroup;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public mercanciaCertificadoTablaDatos: MercanciaCertificado[] = [];
  public productoresAsociadosTablaDatos: ProductoresAsociados[] = [];
  TEXTO_DE_ALERTA_PRODUCTORES = TEXTO_DE_ALERTA_PRODUCTORES;
  TEXTO_DE_ALERTA_MERCANCIAS = TEXTO_DE_ALERTA_MERCANCIAS;
  fechaInicialInput: InputFecha = FECHAEXPEDICIÓN;
  fechaFinalInput: InputFecha =FECHAENCIMIENTO;
  public solicitudState!: Solicitud110219State;
  TablaSeleccion = TablaSeleccion;

  public encabezadosMercancias: ConfiguracionColumna<MercanciaCertificado>[] = [
      {encabezado: 'Número de Orden',clave: (ele: MercanciaCertificado) => ele.numeroOrden, orden: 1, },
      {encabezado: 'Fracción Arancelaria', clave: (ele: MercanciaCertificado) => ele.fraccionArancelaria,orden: 2,},
      {encabezado: 'Nombre Técnico',clave: (ele: MercanciaCertificado) => ele.nombreTecnico, orden: 3,},
      {encabezado: 'Nombre Comercial',clave: (ele: MercanciaCertificado) => ele.nombreComercial,orden: 4,},
      {encabezado: 'Nombre en Ingles',clave: (ele: MercanciaCertificado) => ele.nombreIngles, orden: 5,},
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

 constructor(private certificadoService: CertificadoService,
    private fb:FormBuilder, 
    private validacionesService: ValidacionesFormularioService,
    private store: Tramite110219Store,
    private query: Tramite110219Query,
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  ngOnInit(): void {
    
    this.cancelacionForm = new FormGroup({
      motivoCancelacion: new FormControl('', Validators.required)
    });
    this.getMercanciaCertificadoTabla();

     this.query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyed$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        )
        .subscribe();
        this.donanteDomicilio();
  }

  validarDestinatarioFormulario(): void {
    if (this.cancelacionForm.invalid) {
      this.cancelacionForm.markAllAsTouched();
    }
  }

  public getMercanciaCertificadoTabla(): void {
    this.certificadoService.getMercanciaCertificadoTabla().subscribe((data) => {
      this.mercanciaCertificadoTablaDatos = data;
    });
  }
  
    isValid(form: FormGroup, field: string): boolean {
      return this.validacionesService.isValid(form, field) || false;
    }
  
    setValoresStore(
      form: FormGroup,
      campo: string,
      metodoNombre: keyof Tramite110219Store
    ): void {
      const VALOR = form.get(campo)?.value;
      (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
    }
   
    get validacionForm(): FormGroup {
      return this.cancelacionForm.get('validacionForm') as FormGroup;
    }
  
    donanteDomicilio(): void {
      
      this.cancelacionForm = this.fb.group({
        validacionForm: this.fb.group({
          motivoCancelacion:[this.solicitudState?.motivoCancelacion,[Validators.required]],
          fechaExpedicion:[this.solicitudState?.fechaExpedicion, [Validators.required]],
          fechaVencimiento:[this.solicitudState?.fechaVencimiento, [Validators.required]],
        })})

        if (this.cancelacionForm.invalid) {
          this.cancelacionForm.markAllAsTouched();
          this.cancelacionForm.markAsDirty();
        }
}
ngOnDestroy(): void {
this.destroyed$.next(true);
this.destroyed$.complete();
}

}