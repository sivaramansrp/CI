import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SolicitudDeRegistroTpl120101State, Tramite120101Store } from '../../../../estados/tramites/tramite120101.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { REPRESENTACION_FEDERAL } from '../../constantes/solicitud-de-registro-tpl.enum';
import { ServicioDeFormularioService } from '../../services/forma-servicio/servicio-de-formulario.service';
import { SolicitudDeRegistroTplService } from '../../services/solicitud-de-registro-tpl.service';
import { Tramite120101Query } from '../../../../estados/queries/tramite120101.query';

@Component({
  selector: 'representacion-federal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormasDinamicasComponent],
  templateUrl: './representacion-federal.component.html',
  styleUrl: './representacion-federal.component.scss',
})
export class RepresentacionFederalComponent implements OnInit {
  /**
   * compo doc
   * @property representacionFederalFormData
   * @description
   * Esta propiedad contiene la configuración de los campos del formulario dinámico
   * utilizado en el componente. La configuración está basada en la constante
   * `REPRESENTACION_FEDERAL`, que define los detalles de cada campo, como su
   * identificador, etiqueta, tipo de entrada, validadores, y más.
   *
   * Se utiliza para renderizar dinámicamente los campos del formulario y para
   * gestionar su comportamiento, como la validación y la interacción con los datos
   * obtenidos de los servicios.
   */
  public representacionFederalFormData = REPRESENTACION_FEDERAL;

  /**
   * compo doc
   * @type {FormGroup}
   * @memberof RepresentacionFederalComponent
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

  /**
   * Estado de la solicitud de la sección 120101.
   * @type {SolicitudDeRegistroTpl120101State}
   * @memberof BienFinalComponent
   */
  public solicitudDeRegistroState!: SolicitudDeRegistroTpl120101State;

  /** Subject para destruir el componente */
  public destroy$ = new Subject<void>();

  constructor(
    private solicitudDeRegistroTplService: SolicitudDeRegistroTplService,
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
    this.servicioDeFormularioService.registerForm(
      'representacionFederal',
      this.ninoFormGroup
    );
    this.obtenerEstadosDatos();
    this.obtenerRepresentacionFederalDatos();
  }

  public obtenerEstadosDatos(): void {
    this.solicitudDeRegistroTplService
      .getEstadosDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const ESTADO_FIELD = this.representacionFederalFormData.find(
          (datos: ModeloDeFormaDinamica) => datos.campo === 'estado'
        ) as ModeloDeFormaDinamica;
        if (ESTADO_FIELD && !ESTADO_FIELD.opciones) {
          if (Array.isArray(data)) {
            ESTADO_FIELD.opciones = data.map(
              (item: { id: number; descripcion: string }) => ({
                descripcion: item.descripcion,
                id: item.id,
              })
            );
          }
        }
      });
  }

  public obtenerRepresentacionFederalDatos(): void {
    this.solicitudDeRegistroTplService
      .getRepresentacionFederalDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const REPRESENTACION_FIELD = this.representacionFederalFormData.find(
          (datos: ModeloDeFormaDinamica) =>
            datos.campo === 'representacionFederal'
        ) as ModeloDeFormaDinamica;
        if (REPRESENTACION_FIELD && !REPRESENTACION_FIELD.opciones) {
          if (Array.isArray(data)) {
            REPRESENTACION_FIELD.opciones = data.map(
              (item: { id: number; descripcion: string }) => ({
                descripcion: item.descripcion,
                id: item.id,
              })
            );
          }
        }
      });
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
      this.servicioDeFormularioService.setFormValue('representacionFederal', {
        [event.campo]: event.valor,
      });
  
    }
  }
}
