import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModeloDeFormaDinamica, TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { Subject, takeUntil } from 'rxjs';
import { CONFIGURACION_PARA_ENCABEZADO_DE_TABLA } from '../../../120201/constantes/cupos-constantes.enum';
import { CONSULTAR_CUPO } from '../../constantes/solicitud-de-registro-tpl.enum';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { InstrumentoCupoTPLForm } from '../../../120201/models/cupos.model';
import { SolicitudDeRegistroTplService } from '../../services/solicitud-de-registro-tpl.service';

@Component({
  selector: 'consultar-cupo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './consultar-cupo.component.html',
  styleUrl: './consultar-cupo.component.scss',
})
export class ConsultarCupoComponent implements OnInit {

  @Output() public emitFilaClicHandler = new EventEmitter<InstrumentoCupoTPLForm>();
  /**
      * compo doc
      * @property consultarCupoFormData
      * @description
      * Esta propiedad contiene la configuración de los campos del formulario dinámico 
      * utilizado en el componente. La configuración está basada en la constante 
      * `CONSULTAR_CUPO`, que define los detalles de cada campo, como su 
      * identificador, etiqueta, tipo de entrada, validadores, y más.
      * 
      * Se utiliza para renderizar dinámicamente los campos del formulario y para 
      * gestionar su comportamiento, como la validación y la interacción con los datos 
      * obtenidos de los servicios.
      */
    public consultarCupoFormData = CONSULTAR_CUPO;
  
    /**
     * compo doc
     * @type {FormGroup}
     * @memberof ConsultarCupoComponent
     * @description
     * Este es un formulario reactivo de Angular representado por un FormGroup.
     * Se utiliza para manejar y validar los datos del formulario en el componente.
     */
    public forma: FormGroup = new FormGroup({
      ninoFormGroup: new FormGroup({})
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
     * Configuración para el encabezado de la tabla.
     */
    configuracionParaEncabezadoDeTabla = CONFIGURACION_PARA_ENCABEZADO_DE_TABLA;

    /**
     * Configuración de la tabla dinámica.
     */
    cuerpoTabla: InstrumentoCupoTPLForm[] = [];

    constructor(
      private solicitudDeRegistroTplService: SolicitudDeRegistroTplService
    ) {
      //
    }

    ngOnInit(): void {
      this.obtenerClasificacionRegimenDatos();
      this.obtenerPaisDatos();
    }

    public obtenerClasificacionRegimenDatos(): void {
      this.solicitudDeRegistroTplService.getClasificacionRegimenData()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        const CLASIFICACION_FIELD = this.consultarCupoFormData.find((datos: ModeloDeFormaDinamica) => datos.campo === 'clasificacion') as ModeloDeFormaDinamica;
        if (CLASIFICACION_FIELD && !CLASIFICACION_FIELD.opciones) {
          CLASIFICACION_FIELD.opciones =data.map((item: { id: number; descripcion: string }) => ({
            descripcion: item.descripcion,
            id: item.id,
          }));
        }
      });
    }

    public obtenerPaisDatos(): void {
      this.solicitudDeRegistroTplService.getPaisData()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        const PAIS_FIELD = this.consultarCupoFormData.find((datos: ModeloDeFormaDinamica) => datos.campo === 'pais') as ModeloDeFormaDinamica;
        if (PAIS_FIELD && !PAIS_FIELD.opciones) {
          PAIS_FIELD.opciones =data.map((item: { id: number; descripcion: string }) => ({
            descripcion: item.descripcion,
            id: item.id,
          }));
        }
      });
    }

    /**
   * Busca los datos de la tabla.
   * @description Este método se ejecuta cuando se hace clic en el botón de búsqueda.
   * @returns {void}
   */
  buscar(): void {
    if (this.ninoFormGroup.valid) {
      this.solicitudDeRegistroTplService.obtenerTablaDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        const TABLA_DATOS = resp.data;
        const NUEVO_CUERPO_TABLA = TABLA_DATOS.map((item: InstrumentoCupoTPLForm) => ({
          cveTratado: item.cveTratado,
          cveRegimenClasificacion: item.cveRegimenClasificacion,
          cvePaisDestino: item.cvePaisDestino,
          fraccionArancelaria: item.fraccionArancelaria,
          categoriaTextilDescripcion: item.categoriaTextilDescripcion,
          productoDescripcion: item.productoDescripcion,
          subProductoClasificacion: item.subProductoClasificacion,
          fechaInicioVigencia: item.fechaInicioVigencia,
          fechaFinVigencia: item.fechaFinVigencia,
          montoDisponible: item.montoDisponible,
          categoriaTextil: item.categoriaTextil,
          asignacionMecanismo: item.asignacionMecanismo,
          unidad: item.unidad,
          conversionFactor: item.conversionFactor
          })
        );
        this.cuerpoTabla = NUEVO_CUERPO_TABLA;
      });
    }
  }

  public onFilaClicHandler(event: InstrumentoCupoTPLForm): void {
    if (event) {
      this.emitFilaClicHandler.emit(event);
    }
  }
}
