/* eslint-disable @nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import RadioOptionsData from 'libs/shared/theme/assets/json/130106/radioButton.json';
import { Solicitud130106State } from '../../../../estados/tramites/tramite130106.store';
import SolicitudeDropdown from 'libs/shared/theme/assets/json/130106/datos-de-la-solicitud.json';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite130106Query } from '../../../../estados/queries/tramite130106.query';
import { Tramite130106Store } from '../../../../estados/tramites/tramite130106.store';
@Component({
  selector: 'app-datos-de-la-solicitude',
  standalone: true,
  imports: [TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, InputRadioComponent],
  templateUrl: './datos-de-la-solicitude.component.html',
  styleUrl: './datos-de-la-solicitude.component.scss'
})
export class DatosDeLaSolicitudeComponent implements OnInit,OnDestroy{

  /**
   * Representa el formulario del componente.
   * Se espera que esta propiedad sea del tipo 'FormGroup'.
   *
   * @property {FormGroup} formulario - El formulario del componente.
   */
  public formulario!: FormGroup;

  /**
    * Subject para manejar la destrucción de observables y evitar fugas de memoria.
    */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado de la solicitud 130106.
   */
  public solicitudState!: Solicitud130106State;


  radioOptions = RadioOptionsData; // Use imported JSON data

  selectedValue: string | number = 'option1'; // Update the type to string | number
  defaultSelect: string | number = 'oficina central';


  // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder,
    private tramite130106Store: Tramite130106Store,
    private tramite130106Query: Tramite130106Query
    // eslint-disable-next-line no-empty-function
  ) { }


  ngOnInit(): void {
    this.inicializarFormularioSolicitud();
  }



  inicializarFormularioSolicitud(): void {

    this.tramite130106Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$), // Se asegura de limpiar los observables al destruir el componente
        map((seccionState) => {
          this.solicitudState = seccionState as Solicitud130106State; // Asigna el estado de la solicitud
        })
      )
      .subscribe(); // Realiza la suscripción para actualizar el estado

    this.formulario = this.fb.group({
      Solicitud: ['', Validators.required],
      Régimen: [this.solicitudState.régimen, Validators.required],
      Clasificación: [this.solicitudState.clasificación, Validators.required],
      SolitudDescripcion: [this.solicitudState.solitudDescripcion, Validators.required],
      SolitudFraccion: [this.solicitudState.solitudFraccion, Validators.required],
      SolitudCantidad: [this.solicitudState.solitudCantidad, Validators.required],
      Valor: ['', Validators.required],
      Umt: ['', Validators.required]
    });
  }

  onValueChange(newValue: string | number): void {
    this.selectedValue = newValue;
  }

  configuracionesDropdown = [
    { catalogos: SolicitudeDropdown.tramite },
    { catalogos: SolicitudeDropdown.regimen },
    { catalogos: SolicitudeDropdown.arancelaria },
    { catalogos: SolicitudeDropdown.umt }
  ];

  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite130106Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite130106Store[metodoNombre] as (value: unknown) => void)(VALOR); // Llama al método correspondiente en el store
  }

    /**
   * Se ejecuta cuando el componente es destruido. Limpia recursos y observables.
   */
    ngOnDestroy(): void {
      this.destroyNotifier$.next(); // Notifica que el componente ha sido destruido
      this.destroyNotifier$.complete(); // Completa el observable
    }

}
