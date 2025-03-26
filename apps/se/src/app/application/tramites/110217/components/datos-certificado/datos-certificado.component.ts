import { CommonModule } from "@angular/common";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TituloComponent, CatalogoSelectComponent, Catalogo } from "@libs/shared/data-access-user/src";
import { CertificadosOrigenService } from "../../services/certificadosOrigen.service";
import { map, Subject, takeUntil } from "rxjs";
import { Tramite110217State, Tramite110217Store } from "../../../../estados/tramites/tramite110217.store";
import { Tramite110217Query } from "../../../../estados/queries/tramite110217.query";


@Component({
  selector: 'app-datos-certificado',
  imports: [TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, CommonModule],
  templateUrl: './datos-certificado.component.html',
  styleUrl: './datos-certificado.component.scss',
  standalone: true
})
export class DatosCertificadoComponent implements OnInit, OnDestroy {

  formDatosCertificado!: FormGroup;
  idiomas: Catalogo[] = [];
  entidadFederativas: Catalogo[] = [];
  representacionFederal: Catalogo[] = [];
  destroyNotifier$: Subject<void> = new Subject();
  public tramiteState!: Tramite110217State;

  constructor(
    private fb: FormBuilder,
    private certificadosOrigenService: CertificadosOrigenService,
    public store: Tramite110217Store,
    public tramiteQuery: Tramite110217Query,
    // eslint-disable-next-line no-empty-function
  ) { }
  ngOnInit(): void {
    this.cargarIdioma();
    this.cargarEntidadFederativa();
    this.cargarRepresentacionFederal();
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
          console.log(seccionState);
        })
      )
      .subscribe();
    this.inicializarFormulario();
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  inicializarFormulario(): void {
    this.formDatosCertificado = this.fb.group({
      observaciones: [this.tramiteState?.observaciones],
      idioma: [this.tramiteState?.idioma, [Validators.required, Validators.min(0)]],
      entidadFederativa: [this.tramiteState?.entidadFederativa, [Validators.required, Validators.min(0)]],
      representacionFederal: [this.tramiteState?.representacionFederal, [Validators.required, Validators.min(0)]],
    });
  }

  cargarIdioma(): void {
    this.certificadosOrigenService
      .obtenerIdioma()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: Catalogo[]) => {
          this.idiomas = datos;
        }
      );
  }

  idiomaSeleccion(): void {
    this.setValoresStore(this.formDatosCertificado, 'idioma', 'setIdioma');
  }

  cargarEntidadFederativa(): void {
    this.certificadosOrigenService
      .obtenerEntidadFederativa()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: Catalogo[]) => {
          this.entidadFederativas = datos;
        }
      );
  }

  entidadFederativaSeleccion(): void {
    this.setValoresStore(this.formDatosCertificado, 'entidadFederativa', 'setEntidadFederativa');
  }

  cargarRepresentacionFederal(): void {
    this.certificadosOrigenService
      .obtenerRepresentacionFederal()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: Catalogo[]) => {
          this.representacionFederal = datos;
        }
      );
  }

  representacionFederalSeleccion(): void {
    this.setValoresStore(this.formDatosCertificado, 'representacionFederal', 'setRepresentacionFederal');
  }

  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110217Store): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

}
