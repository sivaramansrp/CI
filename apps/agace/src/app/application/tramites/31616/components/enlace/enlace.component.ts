import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Solicitud31616TercerosState, Tramite31616TercerosStore } from '../../../../estados/tramites/tramite31616_terceros.store';
import { map, takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { TableComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite31616TercerosQuery } from '../../../../estados/queries/tramite31616_terceros.query';
import enlace from '@libs/shared/theme/assets/json/31601/enlace.json';
import enlaceData from '@libs/shared/theme/assets/json/31601/enlace-data.json';

@Component({
  selector: 'app-enlace',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent, // Componente para mostrar tablas
    TituloComponent, // Componente para mostrar un título
    ReactiveFormsModule, // Módulo para trabajar con formularios reactivos
    FormsModule, // Módulo para trabajar con formularios
  ],
  templateUrl: './enlace.component.html',
  styleUrl: './enlace.component.css',
})
export class EnlaceComponent implements OnInit,OnDestroy {
    /**
   * Encabezados de la tabla de enlace.
   */
    public enlaceHeaderData: string[] = [];

    /**
     * Cuerpo de la tabla de enlace, donde se almacenan los datos.
     */
    public enlanceBodyData: unknown = [];
  
    /**
     * Datos de la tabla de enlace que se cargan desde un archivo JSON.
     */
    public enlaceTableData = enlace;
  
    /**
     * Formulario reactivo para el representante.
     */
    public enlace!: FormGroup;
  
    /**
     * Datos predefinidos de un representante, que se cargan en el formulario.
     */
    representativeData = enlaceData;
    /**
     * Estado de la solicitud.
     */
    public solicitudState!: Solicitud31616TercerosState;
    /**
     * Notificador para destruir las suscripciones.
     */
    private destroyNotifier$: Subject<void> = new Subject();
  
    /**
     * Constructor del componente.
     * @param {FormBuilder} fb - Instancia de FormBuilder para la creación de formularios.
     * @param {Tramite31616TercerosStore} tramite31616TercerosStore - Store para gestionar el estado del trámite.
     * @param {Tramite31616TercerosQuery} tramite31616TercerosQuery - Query para obtener el estado del trámite.
     */
    constructor(
      private fb: FormBuilder,
      private tramite31616Store: Tramite31616TercerosStore,
      private tramite31616Query: Tramite31616TercerosQuery
    ) {
      //Añade lógica aquí
    }
  
    /**
     * Método que se ejecuta al inicializar el componente.
     * Configura el formulario reactivo y carga los encabezados de la tabla.
     */
    ngOnInit(): void {
      this.tramite31616Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        )
        .subscribe();
      this.getRegistroForm()
  
      // Carga los datos de la tabla
      this.getEnlace();
    }
  
    /**
     * Método que obtiene los encabezados de la tabla de enlace.
     */
    public getEnlace():void {
      this.enlaceHeaderData = this.enlaceTableData.tableHeader;
    }
  
    /**
     * Variable que controla la visibilidad del modal.
     */
    public modal: string = 'modal';
  
    /**
     * Referencia al elemento de cierre del modal.
     */
    @ViewChild('closeModal') closeModal!: ElementRef;
  
    /**
     * Método que abre el modal y carga el formulario con los datos predefinidos del representante.
     */
    public abrirModal():void {
      this.modal = 'show'; // Muestra el modal
      this.getRegistroForm(); // Carga los datos en el formulario
    }
  
    /**
     * Método que configura el formulario con los datos del representante.
     */
    public getRegistroForm():void {
      this.enlace = this.fb.group({
        resigtroFedral: [this.solicitudState?.resigtroFedral && this.solicitudState?.resigtroFedral !=='' ? this.solicitudState?.resigtroFedral : this.representativeData.resigtro, Validators.required],
        rfc: ['', Validators.required],
        nombre: ['', Validators.required],
        apellidoPaterno: ['', Validators.required],
        apellidoMaterno: ['', Validators.required],
        cargo: [this.solicitudState?.cargo && this.solicitudState?.cargo !=='' ? this.solicitudState?.cargo : this.representativeData.cargo, Validators.required],
        cuidad: ['', Validators.required],
        telefonoEnlace: [this.solicitudState?.telefonoEnlace && this.solicitudState?.telefonoEnlace !=='' ? this.solicitudState?.telefonoEnlace : this.representativeData.telefono, Validators.required],
        correoEnlace: [this.solicitudState?.correoEnlace && this.solicitudState?.correoEnlace !=='' ? this.solicitudState?.correoEnlace : this.representativeData.correo, Validators.required],
        suplente: [this.solicitudState?.suplente, Validators.required],
      });
  
      // Rellena el formulario con los datos del representante
      this.patchData();
    }
  
    /**
     * Método que parchea los datos en el formulario, cargando la información del representante.
     */
    public patchData():void {
      // Se insertan los valores en los campos del formulario
      this.enlace.patchValue({
        rfc: this.representativeData.rfc,
        nombre: this.representativeData.nombre,
        apellidoPaterno: this.representativeData.apellidoPaterno,
        apellidoMaterno: this.representativeData.apellidoMaterno,
        cuidad: this.representativeData.cuidad,
      });
  
      // Deshabilita los campos que no deben ser modificados
      this.enlace.get('rfc')?.disable();
      this.enlace.get('nombre')?.disable();
      this.enlace.get('apellidoPaterno')?.disable();
      this.enlace.get('apellidoMaterno')?.disable();
      this.enlace.get('cuidad')?.disable();
    }

    /**
     * Establece el valor de un campo en el store de Tramite31601.
     *
     * @param {FormGroup} form - El grupo de formularios que contiene el campo.
     * @param {string} campo - El nombre del campo cuyo valor se va a establecer.
     * @param {keyof Tramite31601Store} metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
     */
    setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite31616TercerosStore): void {
      const VALOR = form.get(campo)?.value;
      (this.tramite31616Store[metodoNombre] as (value: string) => void)(VALOR);
    }
  
    /**
     * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
     * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
     */
    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }
}
