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

  
  claveSelecionada(event: Catalogo): void {
    this.scianNinoLista = this.scianLista.filter((ele) => ele.id === event.id);
  }

  agregarScian(): void {
    this.scianSeleccionado.emit(this.scianForm.value);
    this.ubicaccion.back();
  }

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

