import { Catalogo, CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Solicitud30505AgregarAgenteState, Tramite30505AgregarAgenteStore } from '../../../../core/estados/tramites/tramite30505-agregar-agente.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule,Location } from '@angular/common';
import { Tramite30505AgregarAgenteQuery } from '../../../../core/queries/tramite30505-agregar-agente.query';
import productivo from '@libs/shared/theme/assets/json/30505/productivo.json';

@Component({
  selector: 'app-agregar-agente',
  templateUrl: './agregar-agente.component.html',
   styleUrl: './agregar-agente.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,CatalogoSelectComponent]
})
export class AgregarAgenteComponent implements OnInit,OnDestroy {
  datosTramite!: FormGroup;
  mostrarAgente: boolean = false;
  mostrarAgencia: boolean = false;
  public sectorProductivoAgace: Catalogo[] = productivo;

  public solicitudState!: Solicitud30505AgregarAgenteState;
  public destroyNotifier$: Subject<void> = new Subject();
  

  constructor(
    private fb: FormBuilder,
    private tramite30505Store: Tramite30505AgregarAgenteStore,
    private tramite30505Query: Tramite30505AgregarAgenteQuery,
    private ubicaccion : Location
  ) {}

  ngOnInit(): void {
    this.tramite30505Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.crearFormulario()
  }

  public crearFormulario():void{
    this.datosTramite = this.fb.group({
      tipoFigura: [this.solicitudState?.tipoFigura, Validators.required],
      patenteModificada: ['', Validators.required],
      numPatenteModal: [this.solicitudState?.numPatenteModal, [Validators.required, Validators.maxLength(4)]],
      rfcModal: [{ value: ''}, [Validators.required, Validators.maxLength(13)]],
      obligFisc: [this.solicitudState?.obligFisc, Validators.requiredTrue],
      autPantente: [this.solicitudState?.autPantente, Validators.requiredTrue],
      nombre: [{ value: '', disabled: true }, Validators.required],
      apellidoPaterno: [{ value: '', disabled: true }, Validators.required],
      apellidoMaterno: [{ value: '', disabled: true }, Validators.required],
      razonSocial: ['', Validators.required],
      patente2: [this.solicitudState?.patente2, [Validators.required, Validators.maxLength(15)]],
      razonAgencia: ['', Validators.required]
    });
  }

  public onSelectFigura(event: any): void {
    const selectedValue = event.target.value;
    if (selectedValue === '1' || selectedValue === '2') {
      this.mostrarAgencia = false;
      this.mostrarAgente = true;
    } else {
      this.mostrarAgencia = true;
      this.mostrarAgente = false;
    }
  }

  public cargarDatosPatente(): void {
  }

  public guardarDatosSociedadScc(): void {
  }

  public limpiarSociedadesScc(): void {
    this.datosTramite.reset();
    this.mostrarAgencia = false;
    this.mostrarAgente = false;
  }

  public cerrarDialogoSociedadesScc(): void {
   this.datosTramite.reset();
    this.ubicaccion.back();
  }

  public setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite30505AgregarAgenteStore,
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite30505Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}