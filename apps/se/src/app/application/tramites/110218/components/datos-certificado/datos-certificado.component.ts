/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import { FormBuilder} from '@angular/forms';
import { FormGroup} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';

import { CERTIFICADO_TABLA } from '@libs/shared/data-access-user/src/tramites/constantes/110218/certificado-tecnico-japon.enum';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';

import { Tramite110218Query } from '../../estados/queries/tramite110218.query';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-certificado',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, TablaDinamicaComponent,CatalogoSelectComponent],
  templateUrl: './datos-certificado.component.html',
  styleUrl: './datos-certificado.component.scss',
})
export class DatosCertificadoComponent implements OnInit {
  datosdelcertificado: FormGroup;
  configTableArray = CERTIFICADO_TABLA;
  tableradio = TablaSeleccion.RADIO
  datos: any;
  selectedRow: any;
  selectedRows: any[] = [];
  lugar$: Observable<string | null> = this.tramite110218Query.lugar$;
  observaciones$: Observable<string | null> = this.tramite110218Query.observaciones$;
  tipodeFactura: Catalogo[] =[];
  unidaddeMedidadeComercializacion: Catalogo[] = [];

  private destroyed$ = new Subject<void>();
  constructor(private fb: FormBuilder, private service: CertificadoTecnicoJaponService, private tramite110218Store: Tramite110218Store,
    private tramite110218Query: Tramite110218Query,private router: Router) {
    this.datosdelcertificado = this.fb.group({
      lugar: [""],
      observaciones: [""],

    })
    
  }
  ngOnInit(): void {
    this.getTabledatas();
    this.subscribeToStoreChanges();
  }

  getTabledatas(): void {
    this.service.getDatosCertificado().subscribe(
      (data: any) => {
        this.datos = data;
        console.log(this.datos)
      }

    )
  }

  handleFilaSeleccionada(fila: any): void {
    this.selectedRow = fila;
  }

  handleListaDeFilaSeleccionada(filasSeleccionadas: any[]): void {
    this.selectedRows = filasSeleccionadas;
  }

  onModifyForm(): void {
    this.router.navigate(['se/certificado-tecnico-japon/mercancias-seleccionadas-form']);
  }
 
  subscribeToStoreChanges(): void {
    const OBSERVABLES = {
      lugar: this.lugar$,
      observaciones: this.observaciones$,

    };

    Object.entries(OBSERVABLES).forEach(([controlName, OBSERVABLES$]) => {
      OBSERVABLES$.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
        if (value) {
          this.datosdelcertificado.get(controlName)?.setValue(value);
        }
      });
    });
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onDatosdelcertificadoChange(controlName: string): void {
    const VALUE = this.datosdelcertificado.get(controlName)?.value;

    switch (controlName) {
      case 'lugar':
        this.tramite110218Store.setlugar(VALUE);
        break;
      case 'observaciones':
        this.tramite110218Store.setobservaciones(VALUE);
        break;

      default:
        console.warn(`Unhandled control name: ${controlName}`);
        break;
    }
  }

}
