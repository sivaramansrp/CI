import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, merge, Subject, takeUntil } from 'rxjs';
import { Solicitud230202State, Tramite230202Store } from '../../estados/tramite230202.store';
import { Tramite230202Query } from '../../estados/tramite230202.query';
import { PhytosanitaryReexportacionService } from '../../services/phytosanitary-reexportacion.service';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule, TituloComponent, FormsModule, ReactiveFormsModule, CatalogoSelectComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent {
  /**
   * Formulario principal del trámite.
   */
  solicitudForm!: FormGroup;

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud230202State;

  /**
   * Sujeto para manejar la destrucción de observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Lista de numeroDeCertificado disponibles.
   * @type {Catalogo[]}
   */
  numeroDeCertificado!: Catalogo[];


  constructor(
    private phytosanitaryReexportacionService: PhytosanitaryReexportacionService,
    private store: Tramite230202Store,
    private query: Tramite230202Query,
    public fb: FormBuilder
  ) {}

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.inicializaCatalogos();
    this.inicializarFormulario();

    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {

          this.solicitudState = seccionState;
        })
      )
      .subscribe();
  }

  /**
   * Obtiene el grupo de formulario de exención de impuestos.
   */
  get reexportacionForm(): FormGroup {
    return this.solicitudForm.get('reexportacionForm') as FormGroup;
  }

  inicializarFormulario(): void {
    this.solicitudForm = this.fb.group({
      reexportacionForm: this.fb.group({
        numeroDeCertificado: [this.solicitudState?.numeroDeCertificado, [Validators.required]],
      }),
      // Otros grupos de formulario pueden ir aquí
    });
  }

  /**
   * Inicializa los catálogos necesarios para el componente.
   */
  inicializaCatalogos(): void {
    const NUMERODECERTIFICADO$ = this.phytosanitaryReexportacionService.getNumeroDeCertificado().pipe(
      map((resp) => {
        this.numeroDeCertificado = resp.data;
      })
    );

    merge(
      NUMERODECERTIFICADO$
    )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe();
  }

  /**
   * Maneja la selección de aduana.
   */
  numeroDeCertificadoSeleccion(): void {
    const NUMERODECERTIFICADO = this.solicitudForm.get('reexportacionForm.numeroDeCertificado')?.value;
    this.store.setNumeroDeCertificado(NUMERODECERTIFICADO);
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Se utiliza para limpiar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  
}
