import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite110204Query } from '../../estados/tramite110204.query';
import { CertificadosOrigenGridService } from '../../services/certificadosOrigenGrid.service';
import { ToastrService } from 'ngx-toastr';
import { Tramite110204Store } from '../../estados/tramite110204.store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datos-certificado',
  imports: [TituloComponent, ReactiveFormsModule, CatalogoSelectComponent,CommonModule],
  templateUrl: './datos-certificado.component.html',
  styleUrl: './datos-certificado.component.scss',
  standalone: true
})
export class DatosCertificadoComponent implements OnInit {
  solicitudForm!: FormGroup;
  destroyNotifier$: Subject<void> = new Subject();


  idioma$!: Observable<Catalogo[]>;
  entidadFederativas$!: Observable<Catalogo[]>;
  representaconFederal$!: Observable<Catalogo[]>;


  constructor(
    private fb: FormBuilder, private store: Tramite110204Store,
    public tramiteQuery: Tramite110204Query,
    public certificadoService: CertificadosOrigenGridService,
    private toastr: ToastrService) {
    this.solicitudForm = this.fb.group({

    });
    this.idioma$ = this.tramiteQuery.selectIdioma$;
    this.entidadFederativas$ = this.tramiteQuery.selectEntidadFederativa$;
    this.representaconFederal$ = this.tramiteQuery.selectrepresentaconFederal$;
  }

  ngOnInit(): void {
    this.cargarIdioma();
    this.cargarEntidadFederativa();
    this.cargarRepresentacionFederal();
  }

  idiomaSeleccion(estado: Catalogo): void {
    this.store.setEstado(estado);
  }
  entidadFederativaSeleccion(estado: Catalogo): void {
    this.store.setBloque([estado]);
  }
  representacionFederalSeleccion(estado: Catalogo): void {
    this.store.setEstado(estado);
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