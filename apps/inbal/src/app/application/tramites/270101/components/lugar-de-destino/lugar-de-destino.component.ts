import { Catalogo, ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ExportarIlustracionesService } from '../../services/exportar-ilustraciones.service';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { LUGAR_DE_DESTINO } from '../../constantes/exportar-ilustraciones.enum';

@Component({
  selector: 'lugar-de-destino',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
],
  templateUrl: './lugar-de-destino.component.html',
  styleUrl: './lugar-de-destino.component.css',
})

export class LugarDeDestinoComponent implements OnInit, OnDestroy {
  /**
   * compo doc
   * @property lugarDeDestinoFormData
   * @type {ModeloDeFormaDinamica[]}
   * @description
   * Esta propiedad contiene la configuración de los campos del formulario dinámico
   * utilizado en el componente. La configuración está basada en la constante
   * `LUGAR_DE_DESTINO`, que define los detalles de cada campo, como su
   * identificador, etiqueta, tipo de entrada, validadores, y más.
   *
   * Se utiliza para renderizar dinámicamente los campos del formulario y para
   * gestionar su comportamiento, como la validación y la interacción con los datos
   * obtenidos de los servicios.
   */
    public lugarDeDestinoFormData = LUGAR_DE_DESTINO;

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

    /** Subject para destruir el componente */
    private destroy$ = new Subject<void>();
    
    /**
    * @property {Catalogo[]} lugarDeDestinoData
    * @description
    * Almacena los datos relacionados con las monedas.
    * @default []
    */
    public lugarDeDestinoData: Catalogo[] = [];

    constructor(
      public exportarIlustracionesService: ExportarIlustracionesService,
    ) {
      //
    }

    ngOnInit(): void {
      this.exportarIlustracionesService.getPaisData()
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe((data) => {
          this.lugarDeDestinoData = data;
          const MOTIVO_FIELD = this.lugarDeDestinoFormData.find((datos: ModeloDeFormaDinamica) => datos.campo === 'pais') as ModeloDeFormaDinamica;
          if (MOTIVO_FIELD) {
            if (!MOTIVO_FIELD.opciones) {
              MOTIVO_FIELD.opciones = this.lugarDeDestinoData.map((item: { id: number; descripcion: string }) => ({
                descripcion: item.descripcion,
                id: item.id,
              }));
            }
          }
        });
    }

    /**
  * @method ngOnDestroy
  * @description
  * Este método es parte del ciclo de vida del componente y se ejecuta automáticamente 
  * cuando el componente está a punto de ser destruido. Se utiliza para limpiar las suscripciones 
  * activas y evitar fugas de memoria en la aplicación.
  * 
  * Funcionalidad:
  * - Notifica a través del `Subject` `destroy$` que el componente será destruido.
  * - Completa el `Subject` para liberar los recursos asociados.
  * 
  * @example
  * ngOnDestroy(): void {
  *   this.destroy$.next();
  *   this.destroy$.complete();
  * }
  */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
