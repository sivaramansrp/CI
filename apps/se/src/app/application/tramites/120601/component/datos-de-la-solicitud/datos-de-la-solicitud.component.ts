import { Catalogo, CatalogoSelectComponent, ConsultaioQuery, TituloComponent } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { Tramite120601Query } from '../../estados/tramite-120601.query';
import { Tramite120601Store } from '../../estados/tramite-120601.store';

/**
 * Componente que representa los datos de la solicitud en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,    
    CatalogoSelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrls: ['./datos-de-la-solicitud.component.css'],
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {

  /**
   * El formulario para los datos de la solicitud.
   */
  public solicitudForm!: FormGroup;

  /**
   * La lista de tipos de empresa.
   */
  public tipoDeEmpresa!: Catalogo[];

  /**
   * Subject para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Indica si el formulario es de solo lectura.
   *
   * @type {boolean}
   * @memberof RegistroParaLaComponent
   */
  esFormularioSoloLectura: boolean = false; 


  /**
   * Constructor de DatosDeLaSolicitudComponent.
   * @param fb El servicio FormBuilder.
   */
  constructor(private fb: FormBuilder, private store: Tramite120601Store, private query: Tramite120601Query, private service: DatosEmpresaService, private consultaioQuery: ConsultaioQuery,) {
    // Initialization logic can be added here if needed
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyed$),
      map((seccionState) => {
       this.esFormularioSoloLectura = seccionState.readonly;
      })
    )
    .subscribe()
  }

  /**
   * Inicializa el componente.
   */
  ngOnInit(): void {

    this.crearFormulario();
    this.getTipoDeEmpresa();

    this.query.selectTipoDeEmpresa$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data)=>{
      this.solicitudForm.patchValue({
        tipoDeEmpresa: data
      })
    });

    this.query.selectActividadEconomicaClave$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data)=>{
      this.solicitudForm.patchValue({
        actividadEconomicaClave: data
      });
    });


    if(this.esFormularioSoloLectura) {
      this.solicitudForm.get('tipoDeEmpresa')?.disable();
        this.solicitudForm.get('actividadEconomicaClave')?.disable();
    }else{
      this.solicitudForm.get('tipoDeEmpresa')?.enable();
        this.solicitudForm.get('actividadEconomicaClave')?.enable();
    }
  }

  /**
   * @description Verifica si un control del formulario es inválido.
   * @param nombreControl El nombre del control a verificar.
   * @returns Verdadero si el control es inválido y está tocado o modificado, de lo contrario, falso.
   */
  esInvalido(nombreControl: string): boolean {
    const CONTROL = this.solicitudForm.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * Crea el formulario para los datos de la solicitud.
   */
  crearFormulario(): void {
    this.solicitudForm = this.fb.group({
      tipoDeEmpresa: ['', Validators.required],
      denominacionExposicion: [{ value: '', disabled: true }, Validators.maxLength(120)],
      actividadEconomicaClave: ['', Validators.required],
      actividadEconomicaDescripcion: [{ value: '', disabled: true }]
    });
  }

  /**
   * Obtiene la lista de tipos de empresa.
   */
  public getTipoDeEmpresa(): void {
    this.service.obtenerEstado().subscribe((data)=>{
      this.tipoDeEmpresa = data;
    })
  }

  /**
   * Maneja la selección de un documento.
   * @param _e El objeto del evento.
   */
  
  public docSeleccionado(_e: Event): void {
    // Esta es una función dinámica; una vez que tengamos la API, la implementaremos.
    this.store.setTipoDeEmpresa(this.solicitudForm.get('tipoDeEmpresa')?.value);
  }
/**
   * @method crearFormCombinacion
   * @description Método para crear el formulario formCombinacion.
   */ 
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
