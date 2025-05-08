/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable class-methods-use-this */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { TituloComponent } from '@ng-mf/data-access-user';

import { Agregar220401Store, solicitud220401State } from '../../../../estados/tramites/agregar220401.store';
import { AgregarQuery } from '../../../../estados/queries/agregar.query';

import { map, Subject, takeUntil } from 'rxjs';

/**
 * Componente que gestiona el formulario de pago de derechos de importación o exportación.
 * El formulario permite capturar información sobre la mercancía y el pago de derechos, y realiza 
 * la validación de campos y la habilitación/deshabilitación de ciertos campos según las selecciones del usuario.
 * 
 * @export
 * @class PagoDeDerechoComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-pago-de-derecho',
  templateUrl: './pago-de-derecho.component.html',
  styleUrls: ['./pago-de-derecho.component.scss'],
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, FormsModule, CatalogoSelectComponent],
  standalone: true,
})
export class PagoDeDerechoComponent implements OnInit, OnDestroy {
  FormSolicitud!: FormGroup; 
  private destroyNotifier$: Subject<void> = new Subject();
    public solicitudState!: solicitud220401State;
  answer: string = ''; // Respuesta seleccionada por el usuario
  
  public Justificacion!: Catalogo[]; // Opciones disponibles para justificar el pago
  public Banco!: Catalogo[]; // Opciones disponibles para seleccionar el banco
   // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder,
    private agregar220401Store: Agregar220401Store,
    private agregarQuery: AgregarQuery,
  ) { }

  /**
   * Hook de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * 
   * En este método:
   * - Se inicializan las opciones de justificación y banco llamando a `getJustificacion()` y `getBanco()`.
   * - Se define el grupo de formulario `FormSolicitud` con sus controles, validadores y valores iniciales.
   * - Se configura la lógica que habilita o deshabilita campos dependiendo de la selección del valor `exentoDePago`.
   * 
   * @memberof PagoDeDerechoComponent
   */
  ngOnInit(): void {
this.agregarQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.getJustificacion(); // Obtiene las opciones para justificar el pago
    this.getBanco(); // Obtiene las opciones para seleccionar el banco
    this.FormSolicitud = this.fb.group({
     exentoDePago: [this.solicitudState?.exentoDePago || 'No', Validators.required],
       Justificacion: [this.solicitudState?.Justificacion || '', [Validators.required]],
        nombreImportExport: ['', Validators.required],
        rfcImportExport: ['', Validators.required],
        cadenaDependencia: ['', Validators.required],
        Banco:[this.solicitudState?.Banco],
        llaveDePago:[this.solicitudState?.llaveDePago],
       fechaPago:[this.solicitudState?.fechaPago,[ Validators.required]],
       importePago: ['', Validators.required],
      });
    

    // Se activa la lógica para actualizar campos según el valor inicial de 'exentoDePago'
    this.updateFormFieldsBasedOnExentoDePago('No');

     // Escucha los cambios en el valor de 'exentoDePago' y actualiza los campos del formulario
    this.FormSolicitud.get('exentoDePago')?.valueChanges.subscribe((value) => {
      this.updateFormFieldsBasedOnExentoDePago(value);
    });

}

  /**
   * Actualiza los campos del formulario en función del valor de 'exentoDePago'.
   * 
   * Si el valor es 'No', se habilitan los campos necesarios y se asignan valores predeterminados.
   * Si el valor es 'Sí', los campos se deshabilitan y se resetean.
   * 
   * @param value - El valor de 'exentoDePago' para determinar cómo actualizar los campos del formulario.
   * @memberof PagoDeDerechoComponent
   */
  updateFormFieldsBasedOnExentoDePago(value: string): void {
    if (value === 'No') {
      this.FormSolicitud.get('rfcImportExport')?.setValue('454000554');
      this.FormSolicitud.get('cadenaDependencia')?.setValue('0001012A0000EX');
      this.FormSolicitud.get('importePago')?.setValue('594.0');
      this.FormSolicitud.get('fechaPago')?.enable();
      this.FormSolicitud.get('llaveDePago')?.enable();
      
      this.FormSolicitud.get('rfcImportExport')?.disable();
      this.FormSolicitud.get('cadenaDependencia')?.disable();
      this.FormSolicitud.get('importePago')?.disable();
    } else {
      this.FormSolicitud.get('rfcImportExport')?.reset();
      this.FormSolicitud.get('cadenaDependencia')?.reset();
      this.FormSolicitud.get('importePago')?.reset();
      
      this.FormSolicitud.get('rfcImportExport')?.disable();
      this.FormSolicitud.get('cadenaDependencia')?.disable();
      this.FormSolicitud.get('importePago')?.disable();
      this.FormSolicitud.get('fechaPago')?.disable();
      this.FormSolicitud.get('llaveDePago')?.disable();
    }
  }
  /**
 * Asigna al store el valor de un campo de formulario usando el método especificado.
 *
 * @param form Grupo de formulario que contiene el campo.
 * @param campo Nombre del control dentro del formulario.
 * @param metodoNombre Nombre del método del store (`Agregar220401Store`) que recibirá el valor.
 */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Agregar220401Store): void {
    const VALOR = form.get(campo)?.value;
    
   (this.agregar220401Store[metodoNombre] as (value: string) => void)(VALOR);
  }
  /**
   * Obtiene las opciones de justificación para el pago de derechos.
   * 
   * En este caso, las opciones son 'Sí' o 'No'.
   * 
   * @memberof PagoDeDerechoComponent
   */
  public getJustificacion(): void {
    this.Justificacion = [
      { id: 1, descripcion: 'Si' },
      { id: 2, descripcion: 'No' },
    ];
  }

  /**
   * Obtiene las opciones de banco disponibles.
   * 
   * En este caso, las opciones son 'Sí' o 'No'.
   * 
   * @memberof PagoDeDerechoComponent
   */
  public getBanco(): void {
    this.Banco = [
      { id: 1, descripcion: 'Si' },
      { id: 2, descripcion: 'No' },
    ];
  }

  /**
   * Método que puede extenderse para manejar la selección de justificación.
   * 
   * @memberof PagoDeDerechoComponent
   */
  // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  JustificacionSeleccion(): void { }

  /**
   * Método que puede extenderse para manejar la selección del banco.
   * 
   * @memberof PagoDeDerechoComponent
   */
  // eslint-disable-next-line no-empty-function
  BancoSeleccion(): void {
    
   }

  /**
   * Método para validar el formulario y registrar los valores si el formulario es válido.
   * 
   * Este método actualmente no realiza ninguna acción, pero se puede extender para realizar el registro o envío de los datos.
   * 
   * @memberof PagoDeDerechoComponent
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  validarFormulario() { }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
