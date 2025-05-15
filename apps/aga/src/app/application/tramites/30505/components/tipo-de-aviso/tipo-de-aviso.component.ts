import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AVISO_MOD } from '../../enums/aviso-de-modificacion.enum';
import { AlertComponent, InputCheckComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Solicitud30505Store,Solicitud30505State } from '../../estados/tramites30505.store';
import { Solicitud30505Query } from '../../estados/tramites30505.query';
import { map, Subject, takeUntil } from 'rxjs';

/**
 * Componente que representa el primer paso de un trámite.
 */
@Component({
  selector: 'app-tipo-de-aviso',
  templateUrl: './tipo-de-aviso.component.html',
  styleUrl: './tipo-de-aviso.component.scss',
  standalone: true,
  imports: [CommonModule, AlertComponent, InputCheckComponent, ReactiveFormsModule]
})
/**
 * Componente que representa el primer paso de un trámite.
 */
export class TipoDeAvisoComponent implements OnDestroy,OnInit {
  /**
   * Índice utilizado para identificar la posición actual en un proceso o lista.
   * @type {number}
   */
  indice: number = 0;

  @Output() checkboxChange = new EventEmitter<string[]>();

  avisoForm!: FormGroup;

  TEXTO: string = AVISO_MOD;

  public destroyNotifier$: Subject<void> = new Subject();

    public AvisoState!: Solicitud30505State;

  selectedCheckboxes: string[] = []; // Array to store selected checkbox values

  constructor(
  public fb: FormBuilder,public tramiteStore:Solicitud30505Store,public tramiteQuery:Solicitud30505Query
  ) {
    // Si es necesario, se puede agregar aquí la lógica de inicialización
  }

  ngOnInit(): void {

   this.inicializarFormulario();
  }

  inicializarFormulario():void{

      this.tramiteQuery.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.AvisoState = seccionState;
          })
        )
        .subscribe()

  
  
    this.avisoForm = this.fb.group({
      numeroDeOficio: [
        { value: this.AvisoState?.numeroDeOficio, disabled: true },
      ],
      fechaFinVigencia: [
        { value: this.AvisoState?.fechaFinVigencia, disabled: true },
      ],
      avisoDeMod: [this.AvisoState?.avisoDeMod],
      avisoDeFusion: [this.AvisoState?.avisoDeFusion],
      avisoDeCal: [this.AvisoState?.avisoDeCal],
      avisoDenom: [this.AvisoState?.avisoDenom]
    });
    
    this.selectedCheckboxes = this.AvisoState?.selectedCheckbox;
  }

  /**
   * Selecciona una pestaña específica.
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Maneja los datos recibidos del componente hijo.
   * @param data - Los datos recibidos del componente hijo.
   */
  onCambiarAviso(event: Event, controlName: string): void {
    console.log('Checkbox value:', controlName);
    console.log('Checkbox event:', event);

    const CHECKED = (event.target as HTMLInputElement).checked;
    this.tramiteStore.setAviso(CHECKED, controlName); // Set the aviso in the store

    if (CHECKED) {
      this.selectedCheckboxes = [...this.selectedCheckboxes, controlName]; // Create a new array instead of modifying the original
    } else {
      this.selectedCheckboxes = this.selectedCheckboxes.filter(item => item !== controlName); // Remove value if unchecked
    }

    console.log('Checkbox:', this.selectedCheckboxes);
    this.checkboxChange.emit(this.selectedCheckboxes); // Emit the updated array
    this.tramiteStore.setCheckboxDatos(this.selectedCheckboxes);
  }

   ngOnDestroy(): void {
     this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
