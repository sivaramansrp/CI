import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import mockData from '@libs/shared/theme/assets/json/40101/solicitante-mockdata.json';
import { EXPOSICION_RADIO_OPCIONS,MODALIDAD_RADIO_OPCIONS } from '../../constantes/permiso-de-exportacion.enum';
import { PermisoDeExportacionService } from '../../services/permiso-de-exportacion.service';
import { Subject, takeUntil } from 'rxjs';

/**
 * Componente para gestionar el formulario del solicitante.
 */
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
  standalone: true,
  imports: [
      CommonModule,
      ReactiveFormsModule,
      TituloComponent,
      InputRadioComponent,
      CatalogoSelectComponent
    ]
})
export class SolicitudComponent implements OnInit {
  /**
   * Grupo de formulario para el formulario de solicitud.
   */
  ModalidadForm!: FormGroup;

  CantidadForm!: FormGroup;

  ObservacionesForm! : FormGroup;

  LugarDeSalidaForm! : FormGroup;

  public radioOpcions = MODALIDAD_RADIO_OPCIONS;

  aduana:Catalogo[] = [];

  exposicionRadioOpcions = EXPOSICION_RADIO_OPCIONS;

  public valorSeleccionado!: string;
  private destroyed$ = new Subject<void>();


  /**
   * Constructor para inyectar las dependencias necesarias.
   * @param fb - Servicio FormBuilder para crear formularios reactivos.
   */
  // eslint-deshabilitar-la-siguiente-línea-sin-función-vacía
  constructor(private fb: FormBuilder,public service:PermisoDeExportacionService) {/**
    * Constructor para inyectar las dependencias necesarias.
    * @param fb - Servicio FormBuilder para crear formularios reactivos.
    */

    this.ModalidadForm = this.fb.group({
      modalidadOpcion: [""],
      exposicionOpcion: ["false"],
      nombre: [""],
      });

    this.LugarDeSalidaForm = this.fb.group({
      aduana: [""],
      aduanaEntrada :[""]
    })
    this.ObservacionesForm = this.fb.group({
      monumentos: [""],
    })
    this.CantidadForm = this.fb.group({
      cantidad: [""],
    })
   }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Inicializa el formulario `solicitudForm` con los campos necesarios.
   * @returns {void}
   */
  ngOnInit(): void {

    this. getAduana();
    if (this.ModalidadForm.get('exposicionOpcion')?.value === "false") {
      this.ModalidadForm.get('nombre')?.disable();
    }
   // this.setFormValues();

  }

  /**
   * Establece los valores del formulario `solicitudForm` utilizando datos simulados.
   * 
   * Este método llena los siguientes campos en el formulario:
   * - rfc: El RFC (Registro Federal de Contribuyentes).
   * - denominacion: La denominación o razón social.
   * - actividadEconomica: La actividad económica.
   * - correoElectronico: La dirección de correo electrónico.
   * 
   * @remarks
   * Este método asume que `mockData` contiene los campos necesarios
   * y que `solicitudForm` está correctamente inicializado.
   */
  setFormValues():void {
  }

  public cambiarRadio(value: string | number) {
    this.valorSeleccionado = value as string;
  }

  getAduana():void{
    this.service.getAduana().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data:Catalogo) => {
        this.aduana = Array.isArray(data) ? data : [data];
      }
    );
  }
}