import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SolicitudDeRegistroTpl120101State, Tramite120101Store } from '../../../../estados/tramites/tramite120101.store';
import { Subject, map, takeUntil } from 'rxjs';
import { BIEN_FINAL } from '../../constantes/solicitud-de-registro-tpl.enum';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { ServicioDeFormularioService } from '../../services/forma-servicio/servicio-de-formulario.service';
import { Tramite120101Query } from '../../../../estados/queries/tramite120101.query';

@Component({
  selector: 'bien-final',
  standalone: true,
  imports: [CommonModule, FormasDinamicasComponent, ReactiveFormsModule],
  templateUrl: './bien-final.component.html',
  styleUrl: './bien-final.component.scss',
})
export class BienFinalComponent implements OnInit {
  /**
   * compo doc
   * @property bienFinalFormData
   * @description
   * Esta propiedad contiene la configuración de los campos del formulario dinámico
   * utilizado en el componente. La configuración está basada en la constante
   * `BIEN_FINAL`, que define los detalles de cada campo, como su
   * identificador, etiqueta, tipo de entrada, validadores, y más.
   *
   * Se utiliza para renderizar dinámicamente los campos del formulario y para
   * gestionar su comportamiento, como la validación y la interacción con los datos
   * obtenidos de los servicios.
   */
  public bienFinalFormData = BIEN_FINAL;

  /**
   * compo doc
   * @type {FormGroup}
   * @memberof BienFinalComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
   */
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
  });

  /**
   * compo doc
   * @getter ninoFormGroup
   * @description
   * Este getter devuelve el grupo de formularios anidado llamado `ninoFormGroup`
   * dentro del formulario reactivo principal `forma`.
   * Se utiliza para acceder y manipular los controles y valores específicos de este grupo de formularios.
   *
   * @returns {FormGroup} El grupo de formularios `ninoFormGroup` como un objeto de tipo `FormGroup`.
   *
   * @example
   * const grupo = this.ninoFormGroup;
   * grupo.get('campo').setValue('nuevo valor');
   */
  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }

  /** Subject para destruir el componente */
  public destroy$ = new Subject<void>();

  /**
  * Estado de la solicitud de la sección 120101.
  * @type {SolicitudDeRegistroTpl120101State}
  * @memberof BienFinalComponent
  */
  public solicitudDeRegistroState!: SolicitudDeRegistroTpl120101State;

  /**
  * @constructor
  * @description
  * Este constructor inicializa el componente `BienFinalComponent` e inyecta los servicios necesarios 
  * para gestionar los datos y validaciones del formulario. 
  * @param tramite120101Store Servicio encargado de gestionar el estado dinámico asociado al trámite 120101.
  * @param tramite120101Query Consulta que facilita la obtención de datos específicos del estado del trámite 120101.
  */
constructor(
  private tramite120101Store: Tramite120101Store,
  private tramite120101Query: Tramite120101Query,
  private servicioDeFormularioService: ServicioDeFormularioService
 ) {
  //
 }

 ngOnInit(): void {
  this.tramite120101Query.selectSolicitudDeRegistroTpl$
    .pipe(
      takeUntil(this.destroy$),
      map((seccionState) => {
        this.solicitudDeRegistroState = seccionState;
      })
    )
    .subscribe();
    this.servicioDeFormularioService.registerForm('bienFinalForm', this.ninoFormGroup)
 }

  /**
  * compo doc
  * @method establecerCambioDeValor
  * @description
  * Este método se utiliza para manejar los cambios en los valores de un formulario dinámico.
  * Recibe un evento que contiene el nombre del campo y su nuevo valor, y actualiza el estado
  * dinámico del formulario en el store correspondiente.
  * 
  * @param event - Un objeto que contiene el campo que ha cambiado y su nuevo valor.
  * El objeto tiene la estructura: `{ campo: string; valor: any }`.
  * 
  * @example
  * establecerCambioDeValor({ campo: 'nombre', valor: 'Juan' });
  * // Actualiza el campo 'nombre' con el valor 'Juan' en el store dinámico.
  */
  establecerCambioDeValor(event: { campo: string; valor: object | string }): void {
    if (event) {
      this.tramite120101Store.setDynamicFieldValue(event.campo, event.valor);
      this.servicioDeFormularioService.setFormValue('bienFinalForm', {
        [event.campo]: event.valor,
      });
  
    }
  }
}
