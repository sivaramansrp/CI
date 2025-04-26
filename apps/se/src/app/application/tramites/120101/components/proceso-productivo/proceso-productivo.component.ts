import { Catalogo, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { RADIO_INDICAR } from '../../constantes/solicitud-de-registro-tpl.enum';
import { ServicioDeFormularioService } from '../../services/forma-servicio/servicio-de-formulario.service';


@Component({
  selector: 'app-proceso-productivo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent, InputRadioComponent],
  templateUrl: './proceso-productivo.component.html',
  styleUrl: './proceso-productivo.component.scss',
})
export class ProcesoProductivoComponent implements OnInit , OnDestroy{

    procesoProductivoForm!: FormGroup; 
    private destroy$ = new Subject<void>();
    paisDeOrigen: Catalogo[] = [];
    opcionesDeRadioIndicar = RADIO_INDICAR;
  constructor(private fb: FormBuilder,
    private servicioDeFormularioService: ServicioDeFormularioService,
  ) {
    // Reservado para futuras inyecciones de dependencias o inicializaciones.
  }

  ngOnInit(): void {
    // Lógica de inicialización del componente.
    this.procesoProductivoForm = this.fb.group({
      indicar: [this.opcionesDeRadioIndicar[0]?.value || '', Validators.required], // Set default value for radio button
      paisDeOrigenDeLaFibra: ['', Validators.required],
      paisEnQueSeRealizoElHilado: ['', Validators.required],
      paisEnQueSeRealizoElTejido : ['', Validators.required],
      paisEnQueSeRealizoElTejidoAForma: ['', Validators.required],
      paisEnQueSeRealizoElCorte: ['', Validators.required],
      paisEnQueSeRealizoElEnsamble: ['', Validators.required],
    });
    this.obtenerDatosEstados();

  }

    obtenerDatosEstados(): void {
        this.servicioDeFormularioService
          .obtenerDatosEstados()
          .pipe(takeUntil(this.destroy$))
          .subscribe((resp: Catalogo[]) => { 
            this.paisDeOrigen = resp;
          });
      }
    
  /**
   * Destruye las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
