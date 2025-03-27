import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputFecha, TituloComponent } from '@libs/shared/data-access-user/src';
import { Router, RouterModule } from '@angular/router';

/**
 * Configuración para el campo de fecha inicial.
 */
export const FECHA_INICIO: InputFecha = {
  labelNombre: 'Fecha inicial',
  required: true,
  habilitado: true,
};

/**
 * Configuración para el campo de fecha final.
 */
export const FECHA_FINAL: InputFecha = {
  labelNombre: 'Fecha final',
  required: true,
  habilitado: true,
};

@Component({
  selector: 'acuses-y-resoluiones-folio-del-tramite-detalles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent,RouterModule],
  templateUrl: './acuses-y-resoluiones-folio-del-tramite-detalles.component.html',
  styleUrls: ['./acuses-y-resoluiones-folio-del-tramite-detalles.component.scss'],
})
export class AcusesYResoluionesFolioDelTramiteDetallesComponent implements OnInit {
  /**
   * Formulario reactivo para acuses y resoluciones.
   */
  public acusesYResolucionesFormGroup!: FormGroup;

  /**
   * Configuración del campo de fecha inicial.
   */
  public fechaInicioInput: InputFecha = FECHA_INICIO;

  /**
   * Configuración del campo de fecha final.
   */
  public fechaFinalInput: InputFecha = FECHA_FINAL;

  /**
   * Servicio de enrutamiento.
   */
  //public router!: Router;

   @Input() public prodecureUrl = '';

  /**
   * Constructor de la clase.
   * @param formBuilder Servicio para construir formularios reactivos.
   */
  public constructor(protected readonly formBuilder: FormBuilder,
    public router: Router
  ) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */
  public ngOnInit(): void {
    this.acusesYResolucionesFormGroup = this.formBuilder.group({
      folio: [{ value: '', disabled: true }],
      dependencia: [''],
      fechaInicial: [''],
      fechaFinal: [''],
      unidadAdministrativaORepresentaciónFederal: [''],
      tipoDeSolicitud: [''],
      estatusDeLaSolicitud: [''],
      díasHábilesTranscurridos: [''],
    });

    this.initializeFormValues();
  }

  /**
   * Inicializa los valores del formulario.
   */
  public initializeFormValues(): void {
    this.acusesYResolucionesFormGroup.get('folio')?.setValue('11105');
    this.acusesYResolucionesFormGroup.get('dependencia')?.setValue('AGA');
    this.acusesYResolucionesFormGroup.get('fechaInicial')?.setValue('todayDate');
    this.acusesYResolucionesFormGroup.get('fechaFinal')?.setValue('');
    this.acusesYResolucionesFormGroup
      .get('unidadAdministrativaORepresentaciónFederal')
      ?.setValue('Shekhar K');
    this.acusesYResolucionesFormGroup
      .get('tipoDeSolicitud')
      ?.setValue('Retirada de la autorización de donaciones');
    this.acusesYResolucionesFormGroup.get('estatusDeLaSolicitud')?.setValue('En trámite');
    this.acusesYResolucionesFormGroup.get('díasHábilesTranscurridos')?.setValue('10');
  }

  /**
   * Navega a la página de acuses y resoluciones.
   */
  public continuar(): void {
    console.log(this.prodecureUrl);
    this.router.navigate([this.prodecureUrl]);

    //this.router.navigate(['/pago/retirada-de-la-autorizacion-de-donaciones/solicitud']);

  }
}