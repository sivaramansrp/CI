import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, ConsultaioQuery, ConsultaioState, InputRadioComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CARACTER_CATALOGO, EMPRESA_TABLA, NACIONALIDAD_CATALOGO, RADIO_08 } from '../../constantes/adace32606.enum';
import { EconomicoService } from '../../services/economico.service';
import { Tramite32606Query } from '../../state/Tramite32606.query';
import { Solicitud32606State, Tramite32606Store } from '../../state/Tramite32606.store';
import { Modal } from 'bootstrap';
import { map, ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-miembro',
  standalone: true,
  imports: [CommonModule, TituloComponent, TablaDinamicaComponent, ReactiveFormsModule, InputRadioComponent,
    CatalogoSelectComponent
  ],
  templateUrl: './miembro.component.html',
  styleUrl: './miembro.component.css',
})
export class MiembroComponent implements OnInit, OnDestroy {
  public miembroForm !: FormGroup;
  radioOpcions08 = RADIO_08;
  TablaSeleccion = TablaSeleccion;
  public empresaTabla = EMPRESA_TABLA;
  @ViewChild('modalAgregar') modalElement!: ElementRef;
  @ViewChild('closeModal') closeModalButton!: ElementRef;
  public caracterCatalogo = CARACTER_CATALOGO;
  public nacionalidadCatalogo = NACIONALIDAD_CATALOGO;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  soloLectura: boolean = false;
  public solicitudState!: Solicitud32606State;
  consultaDatos!: ConsultaioState;


  constructor(private economico: EconomicoService,
    public query: Tramite32606Query,
    public store: Tramite32606Store,
    private fb: FormBuilder,
    private consultaioQuery: ConsultaioQuery) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }



  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();
    this.inicializarEstadoFormulario();
    this.obtenerCaracter();
    this.obtenerNacionalidad();
  }

  /**
   * Determina el estado inicial del formulario según el modo de solo lectura.
   * 
   * Si el formulario está en modo solo lectura, llama a `guardarDatosDelFormulario()` para deshabilitar los campos.
   * Si no está en modo solo lectura, llama a `datosDeAvisoForm()` para aplicar la configuración correspondiente.
   */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.donanteDomicilio();
    }
  }

  /**
 * Habilita o deshabilita el formulario de acuerdo al modo de solo lectura.
 * 
 * Si el formulario está en modo solo lectura (`esFormularioSoloLectura` es `true`), 
 * deshabilita todos los campos del formulario para evitar modificaciones.
 * En caso contrario, habilita los campos para permitir la edición.
 */
  guardarDatosFormulario(): void {
    this.donanteDomicilio();
    if (this.soloLectura) {
      this.miembroForm.disable();
    } else {
      this.miembroForm.enable();
    }
  }

  agregarMiembro(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  obtenerCaracter(): void {
    this.economico
      .obtenerCaracter()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.caracterCatalogo.catalogos = resp as Catalogo[];
      });
  }

  obtenerNacionalidad(): void {
    this.economico
      .obtenerNacionalidad()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.nacionalidadCatalogo.catalogos = resp as Catalogo[];
      });
  }

  /**
    * Marca todos los campos del formulario como tocados si es inválido.
    */
  validarDestinatarioFormulario(): void {
    if (this.miembroForm.invalid) {
      this.miembroForm.markAllAsTouched();
    }
  }

  /**
   * Actualiza un valor en el estado global utilizando el almacén.
   *
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Nombre del método en el almacén para actualizar el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32606Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  donanteDomicilio(): void {
    this.miembroForm = this.fb.group({
      tipoRadio14: [{ value: this.solicitudState?.tipoRadio14, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio15: [{ value: this.solicitudState?.tipoRadio15, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio16: [{ value: this.solicitudState?.tipoRadio16, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio17: [{ value: this.solicitudState?.tipoRadio17, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio34: [{ value: this.solicitudState?.tipoRadio34, disabled: this.soloLectura }, [Validators.required]],
      caracter: [{ value: this.solicitudState?.caracter, disabled: this.soloLectura }, [Validators.required]],
      nacionalidad: [{ value: this.solicitudState?.nacionalidad, disabled: this.soloLectura }, [Validators.required]],

    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
