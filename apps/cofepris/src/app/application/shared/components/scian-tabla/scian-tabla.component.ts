import { Catalogo, TablaScianConfig } from '../../models/datos-solicitud.model';
import { CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';

@Component({
  selector: 'app-scian-tabla',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent],
  templateUrl: './scian-tabla.component.html',
  styleUrl: './scian-tabla.component.scss',
  providers: [DatosSolicitudService],
})
export class ScianTablaComponent implements OnInit{
  
  @Output() scianSeleccionado: EventEmitter<TablaScianConfig> = new EventEmitter<TablaScianConfig>();
  public scianForm!: FormGroup;
  public scianLista: Catalogo[] = [];
  public scianNinoLista: Catalogo[] = [];


  constructor(private fb: FormBuilder, private ubicaccion: Location,
    public datosSolicitudService: DatosSolicitudService
  ) {
    this.datosSolicitudService.obtenerRespuestaPorUrl(this, 'scianLista', '/260204/scianTabla.json');
   }

  ngOnInit(): void {
    this.scianForm = this.fb.group({
      clave: ['', Validators.required],
      scianNino: ['', Validators.required],
    });
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
      scianNino: `${this.scianNinoLista[0].descripcion} Descripción for Test`
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
      clave:  this.scianNinoLista[0].descripcion,
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

