import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosProcedureQuery } from '../../../estados/queries/tramites261101.query';
import { DatosProcedureState } from '../../../estados/tramites/tramites261101.store';
import { DatosProcedureStore } from '../../../estados/tramites/tramites261101.store';
import { DatosSolicitudService } from '../services/dato-solicitude.service'
import { DatosestablecimientoComponent } from './DatosEstablecimiento/datosestablecimiento.component';
import { DomicilioEstablecimientosComponent } from './DomicilioEstablecimientos/domicilio-establecimientos.component';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { ManifiestosComponent } from './Manifiestos/manifiestos.component';
import { MercanciasComponent } from './Mercancias/mercancias.component';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RepresentanteLegalComponent } from './Representantelegal/representante-legal.component';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';

/**
* Texto de adjuntar para terceros.
*/
const TERCEROS_TEXTO_DE_ADJUNTAR = "El Servicio de Administracion  es el sujeto obligado y responsable del tratamiento de los datos personales que se recaban a traves de la Ventanilla Digital Mexicana de Come, los datos personalespodran ser utilizados y transferidos a la autoridades competentes, con la finalidad de llevar a cabo cualquier tramite relacionado con importaciones, exportaciones y transito de mercancias  de comercio exterior incluyendo las regulaciones y restricciones no arancelanas que, conforme a la legislacion aplicable, sea exigido por las autondades competentes en materia de comercio exterior  y/o consultar informacion sobre los procedimientos para la importacion, exportacion y transito de mercanciasde comercio exterior, incluyendo las regulaciones y restricciones no arancelarias, asa como las notificaciones ue se deriven de dichos tramites y seran protegidos, incorporados y tratados en el sistema de datos personales de la VUCEM, asatiismo podran ser transmitidos a las autoridades competentes establecidas en el Decreto por el que se establece la Ventanilla Digital Mexicana de Comercio Exterior, putilicado en el Diario Oficial de la  Federacion el 14 de enero de 2011, asi como al propio titular de la informacion. El titular en su caso, podramanifestar su negativa para el tratamiento de sus datos personales para finalidades y transteennas de  los mismos que requieran el consentimiento del ntular. Si desea conocer";




@Component({
  selector: 'app-datos-solicitud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatosestablecimientoComponent,
    DomicilioEstablecimientosComponent, MercanciasComponent, ManifiestosComponent,
    RepresentanteLegalComponent, InputRadioComponent, TituloComponent, AlertComponent],
  templateUrl: './DatosSolicitud.component.html',
  styleUrl: './DatosSolicitud.component.css',
})
export class DatosSolicitudComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para datos preoperativos.
   */
  preOperativeForm!: FormGroup;
  /** Subject para notificar la destrucción del componente */
  private destroy$ = new Subject<void>();
  /**
   * @property {Catalogo[]} radioOptions
   *  Opciones del radio button obtenidas desde preOperativo.json.
   */
  radioOptions = [
    {
      label: 'Prorroga',
      value: 'Prorroga',
    },
    {
      label: 'Modificacion',
      value: 'Modificacion',
    },
  ];
  /**
   * Clase de alerta informativa.
   */
  infoAlert = 'alert-info';



  /**
   * Texto de adjuntar para terceros.
   */
  TEXTO_DE_ADJUNTAR: string = TERCEROS_TEXTO_DE_ADJUNTAR;

  private seccionState!: DatosProcedureState;
  constructor(private fb: FormBuilder,
    private DatosSolicitudService: DatosSolicitudService,
    private store: DatosProcedureStore,
    private query: DatosProcedureQuery) {
    //constructor
  }
  ngOnInit(): void {
    this.obtenerDatosFormulario();
    this.crearFormulario();
  }

  /**
* Gancho de ciclo de vida OnDestroy
*/
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
    * Pasa el valor de un campo del formulario a la tienda para la gestión del estado.
    * @param form - El formulario reactivo.
    * @param campo - El nombre del campo en el formulario.
    */
  setValoresStore(form: FormGroup, campo: string): void {
    const VALOR = form.get(campo)?.value;
    this.store.establecerDatos({ [campo]: VALOR });
  }
  
  crearFormulario(): void {
    this.preOperativeForm = this.fb.group({
      ideGenerica1: [this.seccionState?.ideGenerica1],
      observaciones: [this.seccionState?.observaciones, [Validators.required]],
    });
  }
  /**
   * Validar campo del formulario
   * @param field Nombre del campo
   * @returns Booleano que indica si el campo es válido
   */
  isValid(field: string): boolean {
    return Boolean(DatosSolicitudService.isValid(this.preOperativeForm, field));
  }
  /**
* Gancho de ciclo de vida obtenerDatosFormulario
*/
  obtenerDatosFormulario(): void {
    this.query.selectProrroga$?.pipe(takeUntil(this.destroy$))
      .subscribe((data: DatosProcedureState) => {
        this.seccionState = data;
      });
  }
}
