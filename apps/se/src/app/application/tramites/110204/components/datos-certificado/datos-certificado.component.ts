import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CertificadosOrigenGridService } from '../../services/certificadosOrigenGrid.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Tramite110204Query } from '../../estados/tramite110204.query';
import { Tramite110204Store } from '../../estados/tramite110204.store';

@Component({
  selector: 'app-datos-certificado',
  imports: [TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, CommonModule],
  templateUrl: './datos-certificado.component.html',
  styleUrl: './datos-certificado.component.scss',
  standalone: true
})
export class DatosCertificadoComponent implements OnInit, OnDestroy {
  formDatesCerticado!: FormGroup;
  destroyNotifier$: Subject<void> = new Subject();


  idioma$!: Observable<Catalogo[]>;
  entidadFederativas$!: Observable<Catalogo[]>;
  representaconFederal$!: Observable<Catalogo[]>;


  constructor(
    private fb: FormBuilder, public store: Tramite110204Store,
    public tramiteQuery: Tramite110204Query,
    public certificadoService: CertificadosOrigenGridService,
    private toastr: ToastrService) {
    this.formDatesCerticado = this.fb.group({
      observacionesDates: ['', [Validators.required]],
      idiomaDates: ['', [Validators.required, Validators.min(0)]],
      EntidadFederativaDates: ['', [Validators.required, Validators.min(0)]],
      representacionFederalDates: ['', [Validators.required, Validators.min(0)]],
    });

    this.tramiteQuery.formDatesCerticado$.pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe(estado => {
      if (estado) {
        this.formDatesCerticado.patchValue(estado);

      }
    });
    this.idioma$ = this.tramiteQuery.selectIdioma$;
    this.entidadFederativas$ = this.tramiteQuery.selectEntidadFederativa$;
    this.representaconFederal$ = this.tramiteQuery.selectrepresentaconFederal$;
  }
  get formularioControl(): FormControl {
    return this.formDatesCerticado.get('') as FormControl;
  }

  ngOnInit(): void {
    this.cargarIdioma();
    this.cargarEntidadFederativa();
    this.formDatesCerticado.valueChanges.subscribe(value => {
      this.store.setFormDatesCerticado(value);
    });
    this.cargarRepresentacionFederal();
  }

  idiomaSeleccion(estado: Catalogo): void {
    this.store.setIdiomaDatos([estado]);
  }
  entidadFederativaSeleccion(estado: Catalogo): void {
    this.store.setEntidadFederativaDatos([estado]);
  }
  representacionFederalSeleccion(estado: Catalogo): void {
    this.store.setRepresentacionFederalDatos([estado]);
  }



  cargarIdioma(): void {
    this.certificadoService
      .obtenerIdioma()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.store.setIdiomaDatos(data);
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }

  cargarRepresentacionFederal(): void {
    this.certificadoService
      .obtenerRepresentacionFederal()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.store.setRepresentacionFederalDatos(data);
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }

  cargarEntidadFederativa(): void {
    this.certificadoService
      .obtenerEntidadFederativa()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.store.setEntidadFederativaDatos(data);
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}