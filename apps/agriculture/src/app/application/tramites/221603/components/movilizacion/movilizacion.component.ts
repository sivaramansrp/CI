
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solicitud221603State, Tramite221603Store } from '../../estados/tramite221603.store';
import { Subject, takeUntil } from 'rxjs';
import { FormularioDatos } from '../../enum/sanidad.enum';
import { SanidadService } from '../../service/sanidad.service';
import { Tramite221603Query } from '../../estados/tramite221603.query';

@Component({
  selector: 'app-movilizacion',
  templateUrl: './movilizacion.component.html',
  styleUrls: ['./movilizacion.component.scss']
})
export class MovilizacionComponent implements OnInit, OnDestroy {
 
  /**
   * Estado de la solicitud 221603, que contiene los valores actuales de la solicitud.
   */
  public solicitudState!: Solicitud221603State;

  /**
   * Formulario reactivo que gestiona los datos de la movilización.
   */
  medioForm!: FormGroup;

  formularioDatos!:FormularioDatos;

  /**
   * Subject utilizado para gestionar la destrucción del componente y evitar memory leaks.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private tramite221603Store: Tramite221603Store,
    private Tramite221603Query: Tramite221603Query,
    public sanidadService: SanidadService
  ) { 
    // Constructor que inyecta las dependencias necesarias
  }

  /**
   * Método que se ejecuta cuando el componente es inicializado.
   * 
   * Inicializa el formulario reactivo con los valores actuales de la solicitud.
   */
  ngOnInit(): void {
    this.Tramite221603Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$))
      .subscribe((state: Solicitud221603State)=>{
        this.solicitudState = state;
      });

    this.sanidadService.inicializaMovilizacionDatosCatalogos();
    this.inicializarFormulario();
    
    this.sanidadService.getFormularioDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((formularioDatos: FormularioDatos) => {
        this.formularioDatos = formularioDatos;
        this.inicializarFormulario();
      });
  }

  /**
   * Inicializa el formulario reactivo con los valores actuales de la solicitud.
   * 
   * Configura el formulario para gestionar los campos relacionados con la movilización, como medio, transporte,
   * verificación y empresa. También asigna valores predeterminados a algunos campos.
   */
  private inicializarFormulario(): void {
      this.medioForm = this.fb.group({
        medio: [this.solicitudState?.medio ? this.solicitudState?.medio : 1, Validators.required],
        transporte: [this.solicitudState?.transporte, Validators.required],
        verificacion: [this.solicitudState?.verificacion ? this.solicitudState?.verificacion : 14, Validators.required],
        empresa: [this.solicitudState?.empresa, Validators.required]
      });
      this.medioForm.get('empresa')?.setValue(this.formularioDatos?.empresa);
      this.medioForm.get('transporte')?.setValue(this.formularioDatos?.transporte);
  }


  setValoresStore(campo: string, metodoNombre: keyof Tramite221603Store): void {
    const VALOR = this.medioForm.get(campo)?.value;
    (this.tramite221603Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
   /**
   * Método que se ejecuta cuando el componente es destruido. Limpia los recursos y previene memory leaks.
   */
   ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
