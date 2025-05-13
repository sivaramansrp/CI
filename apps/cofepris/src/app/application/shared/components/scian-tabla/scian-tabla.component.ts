import { Catalogo, TablaScianConfig } from '../../models/datos-solicitud.model';
import { CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { PROCEDIMIENTOS_NO_PARA_ELEMENTO_DESCRIPCION_REQUERIDO } from '../../constantes/datos-scian.enum';

@Component({
  selector: 'app-scian-tabla',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent],
  templateUrl: './scian-tabla.component.html',
  styleUrl: './scian-tabla.component.scss',
  providers: [DatosSolicitudService],
})
export class ScianTablaComponent implements OnInit {

  /**
   * Evento que emite el objeto seleccionado de tipo `TablaScianConfig`.
   * Se utiliza para notificar al componente padre cuando un SCiAN ha sido seleccionado.
   */
  @Output() scianSeleccionado: EventEmitter<TablaScianConfig> = new EventEmitter<TablaScianConfig>();

  /**
   * Identificador del procedimiento relacionado.
   * Este valor debe ser proporcionado por el componente padre.
   */
  @Input() public idProcedimiento!: number;

  /**
   * Formulario reactivo que contiene los controles relacionados con el SCiAN.
   */
  public scianForm!: FormGroup;

  /**
   * Lista principal de elementos del catálogo SCiAN.
   */
  public scianLista: Catalogo[] = [];

  /**
   * Lista secundaria (niños) del catálogo SCiAN, dependiente de la selección principal.
   */
  public scianNinoLista: Catalogo[] = [];

  /**
   * Indica si la selección de un SCiAN hijo (niño) es requerida.
   */
  public scianNinoRequerido = true;

  /**
   * Constructor del componente. Inicializa servicios e invoca la carga inicial de la lista SCiAN.
   * 
   * @param fb - Servicio para la creación de formularios reactivos.
   * @param ubicaccion - Servicio para manejar la navegación (ubicación actual).
   * @param datosSolicitudService - Servicio para obtener datos relacionados con la solicitud.
   */
  constructor(
    private fb: FormBuilder,
    private ubicaccion: Location,
    public datosSolicitudService: DatosSolicitudService
  ) {
    // Carga la lista de SCiAN desde un archivo JSON a través del servicio.
    this.datosSolicitudService.obtenerRespuestaPorUrl(this, 'scianLista', '/cofepris/scianTabla.json');
  }

  /**
   * Método de inicialización del componente.
   * Configura el formulario reactivo y determina si el SCiAN niño es requerido
   * con base en el tipo de procedimiento.
   */
  ngOnInit(): void {
    this.scianForm = this.fb.group({
      clave: ['', Validators.required],
      scianNino: ['', Validators.required],
    });

    this.scianNinoRequerido =
    PROCEDIMIENTOS_NO_PARA_ELEMENTO_DESCRIPCION_REQUERIDO.includes(this.idProcedimiento)
        ? false
        : true;
  }

  /**
   * Maneja el evento cuando se selecciona un elemento del catálogo.
   * Filtra la lista de elementos SCIAN para encontrar el elemento correspondiente
   * basado en el ID del evento y actualiza el formulario con la descripción del elemento seleccionado.
   *
   * @param event - Objeto del tipo `Catalogo` que contiene los datos del elemento seleccionado.
   */
  claveSelecionada(event: Catalogo): void {
    this.scianNinoLista = this.scianLista.filter((ele) => ele.id === event.id);
    this.scianForm.patchValue({
      scianNino: this.scianNinoLista[0].id
    })
  }

  /**
   * Agrega un nuevo elemento SCIAN a la lista seleccionada y emite el evento correspondiente.
   * 
   * Este método crea un objeto de configuración `TablaScianConfig` utilizando los valores
   * proporcionados en el formulario y la lista `scianNinoLista`. Luego, emite el objeto
   * creado a través del evento `scianSeleccionado` y navega hacia atrás en la ubicación actual.
   * 
   * @returns {void} No retorna ningún valor.
   */
  agregarScian(): void {
    const SCIAN_IDX: TablaScianConfig = {
      clave: this.scianNinoLista[0].descripcion,
      descripcion: this.scianForm.get('scianNino')?.value
    }
    this.scianSeleccionado.emit(SCIAN_IDX);
    this.ubicaccion.back();
  }

  /**
   * Restablece el formulario SCIAN a su estado inicial.
   * Este método reinicia todos los campos del formulario SCIAN,
   * eliminando cualquier dato ingresado previamente.
   */
  limpiarScian(): void {
    this.scianForm.reset();
  }

  /**
   * Navega a la ubicación anterior en el historial de navegación.
   * Utiliza el servicio de ubicación para retroceder una página.
   */
  cancelar(): void {
    this.ubicaccion.back();
  }

}

