import { Component, OnDestroy } from '@angular/core';
import { MENSAJE_DOBLE_CLIC } from 'libs/shared/data-access-user/src/core/enums/220203/importacion-de-acuicultura.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { ImportacionDeAcuiculturaService } from 'libs/shared/data-access-user/src/core/services/220203/importacion-de-acuicultura.service';

@Component({
  selector: 'app-datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss'
})
export class DatosDeLaSolicitudComponent implements OnDestroy {
  alertMessage: string = MENSAJE_DOBLE_CLIC;
  /**
   * Indica si la sección es colapsable.
   * @property {boolean} colapsable
   */
  colapsable: boolean = false;


  /**
 * Alterna el estado colapsable de la sección del formulario.
 * @method mostrar_colapsable
 */
  datosMercanciaFormGroup!: FormGroup;
  aduanaDeIngresoList: Catalogo[] = [];
  oficinaInspeccionList: Catalogo[] = [];
  puntoInspeccionList: Catalogo[] = [];
  tipoRequisitoList: Catalogo[] = [];
  arancelariaList: Catalogo[] = [];
  regimenList: Catalogo[] = [];
  nicoList: Catalogo[] = [];
  umcList: Catalogo[] = [];
  usoList: Catalogo[] = [];
  paisDeOrigenList: Catalogo[] = [];
  paisDeProcedenciaList: Catalogo[] = [];
  encabezadosComunesTabla: string[] = ["No. partida", "Tipo de requisito", "Requisito", "Número de Certificado Internacional", "Fracción arancelaria", "Descripción de la fracción", "Nico"]
  detalleTable: string[] = ["Nombre científico"]
  detallecuerpoTabla: string[] = [];
  cuerpoTabla: string[] = [];
  myScrollbarValue: boolean = true;
  constructor(private readonly fb: FormBuilder, private readonly importacionDeAcuiculturaServices: ImportacionDeAcuiculturaService) {
    this.createFromGroup();
    this.obtenerCatalogosTransporte();
  }
  createFromGroup() {
    this.datosMercanciaFormGroup = this.fb.group({
      realizarGroup: this.fb.group({
        aduanaIngreso: ['', Validators.required],
        oficinaInspeccion: ['', Validators.required],
        puntoInspeccion: ['', Validators.required],
        numeroGuia: ['', Validators.required],
        regimen: ['', Validators.required]
      }),
      mercanciaGroup: this.fb.group({
        tipoRequisito: ['', Validators.required],
        requisito: ['', Validators.required],
        numeroCertificadoInternacional: ['', Validators.required],
        numeroOficioCasoEspecial: [''], // Added this field
        fraccionArancelaria: ['', Validators.required],
        descripcionFraccionArancelaria: [{ value: '', disabled: true }, Validators.required],
        nico: ['', Validators.required],
        descripcionNico: [{ value: '', disabled: true }, Validators.required],
        descripcion: [''],
        cantidadUMT: ['', Validators.required],
        umt: [{ value: '', disabled: true }, Validators.required],
        cantidadUMC: ['', Validators.required],
        umc: ['', Validators.required],
        uso: ['', Validators.required],
        numeroDeLote: ['', Validators.required],
        faseDeDesarrollo: ['', Validators.required],
        especie: ['', Validators.required],
        paisDeOrigen: ['', Validators.required],
        paisDeProcedencia: ['', Validators.required]
      }),
      detalles: this.fb.group({
        nombreCientifico: ['', Validators.required]
      })
    })



  }
  /**
  * @description Obtiene los datos del catálogo de transporte.
  */

  obtenerCatalogosTransporte() {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('transporte.json').subscribe((data => {
      this.aduanaDeIngresoList = data.data as Catalogo[];
    }));
  }
  /**
 * @description Obtiene los datos del catálogo de transporte.
 */
  ngOnDestroy(): void {
    this.importacionDeAcuiculturaServices.actualizarDatosMercancia(this.datosMercanciaFormGroup.value);
  }
  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }

}
