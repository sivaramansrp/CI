import { Catalogo, ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit, } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { InsumosTabla } from '../../models/insumos.model';
import { ServicioDeFormularioService } from '../../services/forma-servicio/servicio-de-formulario.service';
import { SolicitudDeRegistroTplService } from '../../services/solicitud-de-registro-tpl.service';

@Component({
  selector: 'app-insumos',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent,ReactiveFormsModule,CatalogoSelectComponent],
  templateUrl: './insumos.component.html',
  styleUrl: './insumos.component.scss',
})
export class InsumosComponent implements OnInit , OnDestroy{
  private destroy$ = new Subject<void>();
  tablaInsumos: InsumosTabla[] = [];
  insumoForm!: FormGroup;
  fraccionArancelaria : Catalogo[] = [];
  paisDeOrigen : Catalogo[] = [];
  /**
   * La propiedad pública 'tipoSeleccionTabla' es de tipo 'TablaSeleccion'.
   * Se inicializa con el valor 'TablaSeleccion.CHECKBOX'.
   */

  public tipoSeleccionTabla: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de columnas para la tabla de extranjeros.
   */

  public tableHeaderExtranjeros: ConfiguracionColumna<InsumosTabla>[] = [
    { encabezado: 'Descripción del insumo', clave: (item) => item.descripcionFraccionArancelaria, orden: 1 },
    { encabezado: 'Fracción arancelaria', clave: (item) => item.fraccionArancelaria, orden: 2 },
    { encabezado: 'País de origen', clave: (item) => item.paisDeOrigen, orden: 3 },
  ];

constructor(
  private solicitudDeRegistroTplService: SolicitudDeRegistroTplService,
  private fb: FormBuilder,
  private servicioDeFormularioService: ServicioDeFormularioService
  
) {
  //Reservado para futuras inyecciones de dependencias o inicializaciones.

}
  ngOnInit(): void {
    // Lógica de inicialización del componente.
  this.obtenerDatosTablaInsumos();
  this.obtenerDatosFraccionArancelaria();
  this.obtenerDatosEstados();

  this.insumoForm = this.fb.group({
    descripcionDelInsumo: ['', Validators.required],
    fraccionArancelaria: ['', Validators.required],
    descripcionFraccionArancelaria: ['', Validators.required],
    paisDeOrigen: ['', Validators.required],

  })

  this.servicioDeFormularioService.registerForm(
    'insumosForm',
    this.insumoForm
  );
  }
   /**
     * Obtiene los datos de cancelación de autorizaciones del servicio.
     */
    obtenerDatosTablaInsumos(): void {
      this.solicitudDeRegistroTplService
        .obtenerDatosTablaInsumos()
        .pipe(takeUntil(this.destroy$))
        .subscribe((resp: InsumosTabla[]) => { 
          this.tablaInsumos = resp;
        });
    }
    obtenerDatosFraccionArancelaria(): void {
      this.solicitudDeRegistroTplService
        .obtenerDatosFraccionArancelaria()
        .pipe(takeUntil(this.destroy$))
        .subscribe((resp: Catalogo[]) => { 
          this.fraccionArancelaria = resp;
        });
    }
    
    obtenerDatosEstados(): void {
      this.solicitudDeRegistroTplService
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
