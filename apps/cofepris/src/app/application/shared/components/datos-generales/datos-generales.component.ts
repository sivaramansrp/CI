import { CommonModule } from '@angular/common';

import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  Catalogo,
  CatalogoSelectComponent,
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Subject, takeUntil } from 'rxjs';

import TipoPersonaBtn from '@libs/shared/theme/assets/json/260402/tipoPersonaBtn.json';

import { TercerosProcedenciaService } from '../../services/terceros-procedencia.service';
import { TipoMoModel } from '../../models/permiso-importacion-biologica.models';
@Component({
  selector: 'app-datos-generales',
  standalone: true,
  imports: [
    TituloComponent,
    CatalogoSelectComponent,
    InputRadioComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './datos-generales.component.html',
  styleUrl: './datos-generales.component.scss',
})
export class DatosGeneralesComponent implements OnInit, OnDestroy {
  /**
   * @private
   * @description Sujeto utilizado para manejar la desuscripción de observables y evitar fugas de memoria.
   * Se emite un valor `void` cuando el componente se destruye.
   */
  private unsubscribe$ = new Subject<void>();
  /**
   * Evento que emite los datos del formulario cuando este es válido.
   */
  @Output() formularioGuardar = new EventEmitter<TipoMoModel>();
  /**
   * Evento que emite cuando se cancela la sección de datos generales.
   */
  @Output() cancelDatosGenerales = new EventEmitter<void>();
  /**
   * Variable que contiene los datos del botón de tipo de persona.
   */
  radioBtn = TipoPersonaBtn;
  /**
   * Formulario reactivo que contiene los datos generales.
   */
  datosGeneralesForm!: FormGroup;

  pais: Catalogo[] = [];

  constructor(private tercerosProcedenciaService: TercerosProcedenciaService) {}
  /**
   * @comdoc
   * Cierra el componente de datos generales.
   * Emite un evento para notificar que se ha cancelado la operación de datos generales.
   */
  closeDatosGenerales(): void {
    this.cancelDatosGenerales.emit();
  }

  /**
   * @override
   * @description Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Llama a la función `informacionProcedencia` para cargar la información inicial necesaria.
   */
  ngOnInit(): void {
    this.informacionProcedencia();

    this.tercerosProcedenciaService
      .getData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.pais = data;
      });
  }

  /**
   * @method informacionProcedencia
   * @description Configura y crea un formulario reactivo para capturar información de procedencia.
   * Este formulario incluye campos como tipo de persona, razón social, dirección, contacto,
   * y otros datos personales necesarios.
   *
   * @returns {void} No retorna ningún valor.
   */
  informacionProcedencia(): void {
    this.datosGeneralesForm = new FormGroup({
      tipoPersona: new FormControl('', Validators.required),
      razonSocial: new FormControl('', Validators.required),
      pais: new FormControl('', Validators.required),
      estado: new FormControl(''),
      codigoPostal: new FormControl(''),
      calle: new FormControl('', Validators.required),
      numeroExterior: new FormControl('', Validators.required),
      numeroInterior: new FormControl(''),
      lada: new FormControl(''),
      telefono: new FormControl(''),
      correoElectronico: new FormControl('', [Validators.email]),
      nombre: new FormControl(''),
      primerApellido: new FormControl(''),
      segundoApellido: new FormControl(''),
    });
  }

  /**
   * @method enviarFormulario
   * @description Envía el formulario si es válido. Si el formulario `datosGeneralesForm` pasa la validación,
   * emite los valores del formulario a través del evento `formularioGuardar`.
   *
   * @returns {void} No retorna ningún valor.
   */
  enviarFormulario(): void {
    this.formularioGuardar.emit(this.datosGeneralesForm.value);
  }
  /**
   * @inheritdoc
   * @description Este método se ejecuta automáticamente cuando el componente se destruye.
   * Se utiliza para completar y limpiar cualquier suscripción activa, evitando fugas de memoria.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
