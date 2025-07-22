import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputRadioComponent, TituloComponent, InputCheckComponent, TablaDinamicaComponent, TablaSeleccion, Pedimento, Notificacion, NotificacionesComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QUERELLA_TABLA, RADIO_08 } from '../../constantes/adace32606.enum';
import { EconomicoService } from '../../services/economico.service';
import { Solicitud32606State, Tramite32606Store } from '../../state/Tramite32606.store';
import { Tramite32606Query } from '../../state/Tramite32606.query';
import { Modal } from 'bootstrap';
import { Querella } from '../../models/adace.model';
import { map, ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-querella',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, InputRadioComponent, InputCheckComponent,
    TablaDinamicaComponent, NotificacionesComponent
  ],
  templateUrl: './querella.component.html',
  styleUrl: './querella.component.css',
})
export class QuerellaComponent implements OnInit, OnDestroy {
  public querellaForm!: FormGroup;
  radioOpcions08 = RADIO_08;
  TablaSeleccion = TablaSeleccion;
  public querellaTabla = QUERELLA_TABLA;
  @ViewChild('modalAlerta') modalElement!: ElementRef;
  public pedimentos: Array<Pedimento> = [];
  public elementoParaEliminar!: number;
  public nuevaNotificacion!: Notificacion;
  public querellaDatos: Querella[] = [];
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  soloLectura: boolean = false;
  public solicitudState!: Solicitud32606State;

  constructor(private economico: EconomicoService,
    public query: Tramite32606Query,
    public store: Tramite32606Store,
    private fb: FormBuilder) { }



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
    this.obtenerTablaQuerella();
  }

  public seleccionarAgregar(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
    this.abrirModal();
  }

  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  // Abre el modal y configura la notificación para eliminar un pedimento.
  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Datos guardados correctamente.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    }
    this.elementoParaEliminar = i;
  }

  public obtenerTablaQuerella(): void {
    this.economico
      .obtenerTablaQuerella()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.querellaDatos = data;
      });
  }

   /**
     * Marca todos los campos del formulario como tocados si es inválido.
     */
    validarDestinatarioFormulario(): void {
      if (this.querellaForm.invalid) {
        this.querellaForm.markAllAsTouched();
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
    this.querellaForm = this.fb.group({
      tipoRadio18: [{ value: this.solicitudState?.tipoRadio18, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio19: [{ value: this.solicitudState?.tipoRadio19, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio20: [{ value: this.solicitudState?.tipoRadio20, disabled: this.soloLectura }, [Validators.required]],
      sistemaIdentificacion: [{ value: this.solicitudState?.sistemaIdentificacion, disabled: this.soloLectura }, [Validators.required]],
      lugarRadicacion: [{ value: this.solicitudState?.lugarRadicacion, disabled: this.soloLectura }, [Validators.required]],
      sistemaControlInventarios: [{ value: this.solicitudState?.sistemaControlInventarios, disabled: this.soloLectura }, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
  }
}
