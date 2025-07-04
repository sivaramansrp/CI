import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent, CatalogoSelectComponent, ConfiguracionColumna, InputRadioComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, ElementRef, EventEmitter,Input, Output, ViewChild } from '@angular/core';
import {DatosDeLaSolicitud, TercerosrelacionadosTable, TercerosrelacionadosdestinoTable} from '../../models/tercerosrelacionados.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OPCION_DE_BOTON_DE_RADIO, SELECCIONADO } from '../../constantes/tercerosrelacionados.enum';
import { CommonModule } from '@angular/common';
import { RadioOpcion } from '../../../tramites/220201/models/220201/certificado-zoosanitario.model';

@Component({
  selector: 'app-tercerosrelacionados',
  standalone: true,
  imports: [CommonModule,TituloComponent,AlertComponent,TablaDinamicaComponent,ReactiveFormsModule,InputRadioComponent,CatalogoSelectComponent],
  templateUrl: './tercerosrelacionados.component.html',
  styleUrl: './tercerosrelacionados.component.scss',
})
export class TercerosrelacionadosComponent{
  infoAlert:string="alert-info"
  seleccionado:string = SELECCIONADO;
  mostrarVista: boolean = false;
  opcionDeBotonDeRadio: RadioOpcion[] =OPCION_DE_BOTON_DE_RADIO;
  @ViewChild('nextField') nextField!: ElementRef<HTMLInputElement>;
    @Input() catalogosDatos: DatosDeLaSolicitud = {} as DatosDeLaSolicitud;
    /**
       * Indica si el formulario debe mostrarse en modo solo lectura.
       *
       * @type {boolean}
       * @default false
       * @see https://compodoc.app/
       *
       * @description
       * Cuando es verdadero, el formulario se presenta únicamente para visualización,
       * deshabilitando la edición de los campos.
       */
      @Input() esFormularioSoloLectura:boolean = false;
      @Input() cuerpoTablaDestino:TercerosrelacionadosdestinoTable[] = [];
      @Output() eliminarSeleccion: EventEmitter<TercerosrelacionadosdestinoTable[]> = new EventEmitter();

    /**
     * @description
     * Tipo de selección para la solicitud.
     * Utiliza la enumeración TablaSeleccion para definir el tipo de selección.
     * @type {TablaSeleccion}
     */
    tipoSeleccionsoli: TablaSeleccion = TablaSeleccion.CHECKBOX;

    listaDeFilaSeleccionada: TercerosrelacionadosdestinoTable[] = [];
      /**
       * @description
       * Configuración de las columnas para la tabla de solicitudes de datos.
       * Utiliza la interfaz ConfiguracionColumna para definir las columnas.
       * @type {ConfiguracionColumna<SolicitudData>[]}
       */
      configuracionColumnasExportador: ConfiguracionColumna<TercerosrelacionadosTable>[] = [
        { encabezado: 'Nombre/denominación o razón social', clave: (fila) => fila.exportadorNombre, orden: 1 },
        { encabezado: 'Teléfono', clave: (fila) => fila.exportadorTelefono, orden: 2 },
        { encabezado: 'Correo', clave: (fila) => fila.exportadorCorreo, orden: 3 },
        { encabezado: 'Domicilio', clave: (fila) => fila.exportadorDomicilio, orden: 4 },
        { encabezado: 'País', clave: (fila) => fila.exportadorPais, orden: 5 },
      ];
        cuerpoTablaExportador: TercerosrelacionadosTable[] = [];

         /**
       * @description
       * Configuración de las columnas para la tabla de solicitudes de datos.
       * Utiliza la interfaz ConfiguracionColumna para definir las columnas.
       * @type {ConfiguracionColumna<SolicitudData>[]}
       */
      configuracionColumnasDestino: ConfiguracionColumna<TercerosrelacionadosdestinoTable>[] = [
        { encabezado: 'Nombre/denominación o razón social', clave: (fila) => fila.nombre, orden: 1 },
        { encabezado: 'Teléfono', clave: (fila) => fila.telefono, orden: 2 },
        { encabezado: 'Correo', clave: (fila) => fila.correo, orden: 3 },
        { encabezado: 'Calle', clave: (fila) => fila.calle, orden: 4 },
        { encabezado: 'Número exterior', clave: (fila) => fila.numeroExterior, orden: 5 },
        { encabezado: 'Número interior', clave: (fila) => fila.numeroInterior, orden: 6 },
        { encabezado: 'País', clave: (fila) => fila.pais, orden: 7 },
        { encabezado: 'Colonia', clave: (fila) => fila.colonia, orden: 8 },
        { encabezado: 'Municipio/Alcaldía', clave: (fila) => fila.municipio, orden: 9 },
        { encabezado: 'Entidad Federativa', clave: (fila) => fila.estado, orden: 10 },
        { encabezado: 'Código Postal', clave: (fila) => fila.codigoPostal, orden: 11 },
      ];
       buscarForm!: FormGroup;

constructor(public readonly router: Router,public route: ActivatedRoute,private fb: FormBuilder) {
  this.buscarForm = this.fb.group({
      tipoPersona: ['yes'],
      razonSocial: [''],
      correoElectronico: [''],
      pais: ['1'],
      entidadFederativa: ['']
    });
}
goToAgregarDestinatario():void {
  this.router.navigate(['../agregar-destinatario'], { relativeTo: this.route });
}
modificarDestinatario():void{
    const ID = 1;
  this.router.navigate(['../agregar-destinatario',ID], { relativeTo: this.route });
}
  /**

   * Actualiza filas seleccionadas de destinatarios.

   * @param filas Filas seleccionadas.

   */

  onSeleccionDestinatario(filas: TercerosrelacionadosdestinoTable[]): void {
    this.listaDeFilaSeleccionada = filas;
  }

    emitEliminar():void {
    this.eliminarSeleccion.emit(this.listaDeFilaSeleccionada);
  }

buscarDestinatario():void{
this.mostrarVista=!this.mostrarVista;
  this.nextField.nativeElement.focus();
}
limpiarFormulario():void{
  this.buscarForm.reset();
  this.buscarForm.patchValue({
    tipoPersona: 'yes',
    pais: '1',
  });
}
}
