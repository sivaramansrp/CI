import { Component, OnInit } from '@angular/core';
import {
  ConfiguracionColumna,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solicitud230901State, Tramite230901Store } from '../../estados/tramite230901.store';
import { Subject, takeUntil } from 'rxjs';
import { AutorizacionesDeVidaSilvestreService } from '../../services/autorizaciones-de-vida-silvestre.service';
import { TERCEROS_CONFIGURACION_TABLA } from '../../enum/autorizaciones-constants';
import { Tramite230901Query } from '../../estados/tramite230901.query';

export interface ConfiguracionItem {
  pais: string;
  ciudad: string;
  entidadFederativa: string;
  domicilio: string;
  codigoPostal: number;
}

@Component({
  selector: 'app-terceros',
  templateUrl: './terceros.component.html',
  styleUrl: './terceros.component.css',
})
export class TercerosComponent implements OnInit {
  destinatarioForm!: FormGroup;
  solicitud230901State!: Solicitud230901State;

  destroyNotifier$ = new Subject<void>();

  configuracionTabla: ConfiguracionColumna<ConfiguracionItem>[] =
    TERCEROS_CONFIGURACION_TABLA;
  TablaSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;
  tablaDatos: ConfiguracionItem[] = [];

  constructor(
    public autorizacionesDeVidaSilvestreService: AutorizacionesDeVidaSilvestreService,
    private formBuilder: FormBuilder,
    private tramite230901Store: Tramite230901Store,
    private tramite230901Query: Tramite230901Query
  ) {
    //do nothing
  }

  ngOnInit(): void {
    this.autorizacionesDeVidaSilvestreService.inicializaPasoUnoDatosCatalogos();
    this.tramite230901Query.selectSolicitud$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state) => {
        this.solicitud230901State = state;
      });

    this.createDestinatarioForm();
    this.onEntidadFederativaChange();
  }

  createDestinatarioForm(): void {
    this.destinatarioForm = this.formBuilder.group({
      entidadFederativa: [
        this.solicitud230901State.entidadFederativa,
        Validators.required,
      ],
    });
  }

  onEntidadFederativaChange(): void {
    if (this.destinatarioForm.get('entidadFederativa')?.value) {
      this.tablaDatos.push({
        pais: 'MEXICO (ESTADOS UNIDOS MEXICANOS)',
        ciudad: '---',
        entidadFederativa: 'MORELOS',
        domicilio: 'prueba',
        codigoPostal: 96533,
      });
    }
  }
}
