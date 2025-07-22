import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, InputRadioComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CARACTER_CATALOGO, EMPRESA_TABLA, NACIONALIDAD_CATALOGO, RADIO_08 } from '../../constantes/adace32606.enum';
import { EconomicoService } from '../../services/economico.service';
import { Tramite32606Query } from '../../state/Tramite32606.query';
import { Tramite32606Store } from '../../state/Tramite32606.store';
import { Modal } from 'bootstrap';
import { ReplaySubject, takeUntil } from 'rxjs';

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

  constructor(private economico: EconomicoService,
    public query: Tramite32606Query,
    public store: Tramite32606Store,
    private fb: FormBuilder) { }



  ngOnInit(): void {
    this.donanteDomicilio();
    this.obtenerCaracter();
    this.obtenerNacionalidad();
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
  donanteDomicilio(): void {
    this.miembroForm = this.fb.group({
      tipoRadio14: [''],
      tipoRadio15: [''],
      tipoRadio16: [''],
      tipoRadio17: [''],
      tipoRadio34: [''],
      caracter: [''],
      nacionalidad: [''],

    });
  }

  ngOnDestroy(): void {
  }

}
