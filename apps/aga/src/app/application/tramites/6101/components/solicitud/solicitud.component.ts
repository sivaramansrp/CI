import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { DivideFraccion } from '../../models/solicitud.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { REGEX_NUMEROS } from '@libs/shared/data-access-user/src';
import { Solicitud6101Query } from '../../estados/solicitud6101.query';
import { Solicitud6101State } from '../../estados/solicitud6101.store';
import { Solicitud6101Store } from '../../estados/solicitud6101.store';
import { SolicitudCatologo } from '../../models/solicitud.model';
import { SolicitudService } from '../../services/solicitud/solicitud.service';
import { Subject } from 'rxjs';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit, OnDestroy {
  solicitudForm!: FormGroup;
  opcionAduanaAux: CatalogosSelect = {} as CatalogosSelect;
  opcionJuntaTecnicaDerivada: CatalogosSelect = {} as CatalogosSelect;
  private destroyNotifier$: Subject<void> = new Subject();
  actionBean = {
    sello: false,
  };
  solicitud6101State : Solicitud6101State = {} as Solicitud6101State;
  constructor(
    private fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud6101Store: Solicitud6101Store,
    public solicitud6101Query: Solicitud6101Query,
  ) {
    this.conseguirSolicitudCatologo();
  }

  ngOnInit(): void {
    this.solicitudForm = this.fb.group({
      aduanaAux: [this.solicitud6101State.aduanaAux, [Validators.required]],
      juntaTecnicaDerivada: [this.solicitud6101State.juntaTecnicaDerivada, [Validators.required]],
      numeroPedimento: [this.solicitud6101State.numeroPedimento],
      nombreComercialMercancia: [this.solicitud6101State.nombreComercialMercancia, [Validators.required]],
      descDetalladaMercancia: [this.solicitud6101State.descDetalladaMercancia, [Validators.required]],
      fraccionI: [this.solicitud6101State.fraccionI, [Validators.required, Validators.maxLength(10)]],
      capitulo: [{ value: this.solicitud6101State.capitulo, disabled: true }],
      partida: [{ value: this.solicitud6101State.partida, disabled: true }],
      subpartida: [{ value: this.solicitud6101State.subpartida, disabled: true }],
      subdivision: [{ value: this.solicitud6101State.subdivision, disabled: true }],
      fraccionII: [this.solicitud6101State.fraccionII, [Validators.required, Validators.maxLength(10)]],
      capituloII: [{ value: this.solicitud6101State.capituloII, disabled: true }],
      partidaII: [{ value: this.solicitud6101State.partidaII, disabled: true }],
      subpartidaII: [{ value: this.solicitud6101State.subpartidaII, disabled: true }],
      subdivisionII: [{ value: this.solicitud6101State.subdivisionII, disabled: true }],
      fraccionIII: [this.solicitud6101State.fraccionIII, [Validators.maxLength(10)]],
      capituloIII: [{ value: this.solicitud6101State.capituloIII, disabled: true }],
      partidaIII: [{ value: this.solicitud6101State.partidaIII, disabled: true }],
      subpartidaIII: [{ value: this.solicitud6101State.subpartidaIII, disabled: true }],
      subdivisionIII: [{ value: this.solicitud6101State.subdivisionIII, disabled: true }],
      manifiestosSeleccionados: [false, [Validators.required]],
    });
    
    this.solicitud6101Query.seleccionarSolicitud$.pipe(
      takeUntil(this.destroyNotifier$),
      map((respuesta: Solicitud6101State) => {
        this.solicitud6101State = respuesta;
        this.solicitudForm.patchValue(respuesta);
    })
    ).subscribe();
  }

  conseguirSolicitudCatologo(): void {
    this.solicitudService
      .conseguirSolicitudCatologo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: SolicitudCatologo): void => {
          this.opcionAduanaAux = respuesta.aduana;
          this.opcionJuntaTecnicaDerivada = respuesta.juntaTecnicaDerivada;
        },
      });
  }

  seleccionarAduana(evento: Catalogo): void {
    this.solicitud6101Store.actualizarAduanaAux(evento.id);
  }

  seleccionarJuntaTecnicaDerivada(evento: Catalogo): void {
    this.solicitud6101Store.actualizarJuntaTecnicaDerivada(evento.id);
  }

  onNumeroPedimento(evento: Event): void {
    const ELEMENTO_DE_ENTRADA = evento.target as HTMLInputElement;
    const VALOR_DESINFECTADO = ELEMENTO_DE_ENTRADA.value.replace(REGEX_NUMEROS, '');
    this.solicitud6101Store.actualizarNumeroPedimento(VALOR_DESINFECTADO);
  }

  onNombreComercialMercancia(evento: Event): void {
    const ELEMENTO_DE_ENTRADA = evento.target as HTMLInputElement;
    this.solicitud6101Store.actualizarNombreComercialMercancia(ELEMENTO_DE_ENTRADA.value);
  }

  onDescDetalladaMercancia(evento: Event): void {
    const ELEMENTO_DE_ENTRADA = evento.target as HTMLInputElement;
    this.solicitud6101Store.actualizarDescDetalladaMercancia(ELEMENTO_DE_ENTRADA.value);
  }

  onFraccionI(evento: Event): void {
    const ELEMENTO_DE_ENTRADA = evento.target as HTMLInputElement;
    this.solicitud6101Store.actualizarFraccionI(ELEMENTO_DE_ENTRADA.value);
    const FRACCION = this.divideFraccion(ELEMENTO_DE_ENTRADA.value);
    this.solicitud6101Store.actualizarCapitulo(FRACCION.capitulo);
    this.solicitud6101Store.actualizarPartida(FRACCION.partida);
    this.solicitud6101Store.actualizarSubpartida(FRACCION.subpartida);
    this.solicitud6101Store.actualizarSubdivision(FRACCION.subdivision);
  }

  onFraccionII(evento: Event): void {
    const ELEMENTO_DE_ENTRADA = evento.target as HTMLInputElement;
    this.solicitud6101Store.actualizarFraccionII(ELEMENTO_DE_ENTRADA.value);
    const FRACCION = this.divideFraccion(ELEMENTO_DE_ENTRADA.value);
    this.solicitud6101Store.actualizarCapituloII(FRACCION.capitulo);
    this.solicitud6101Store.actualizarPartidaII(FRACCION.partida);
    this.solicitud6101Store.actualizarSubpartidaII(FRACCION.subpartida);
    this.solicitud6101Store.actualizarSubdivisionII(FRACCION.subdivision);
  }

  onFraccionIII(evento : Event): void {
    const ELEMENTO_DE_ENTRADA = evento.target as HTMLInputElement;
    this.solicitud6101Store.actualizarFraccionIII(ELEMENTO_DE_ENTRADA.value);
    const FRACCION = this.divideFraccion(ELEMENTO_DE_ENTRADA.value);
    this.solicitud6101Store.actualizarCapituloIII(FRACCION.capitulo);
    this.solicitud6101Store.actualizarPartidaIII(FRACCION.partida);
    this.solicitud6101Store.actualizarSubpartidaIII(FRACCION.subpartida);
    this.solicitud6101Store.actualizarSubdivisionIII(FRACCION.subdivision);
  }    

  onManifiesto(evento: Event): void {
    const ELEMENTO_DE_ENTRADA = evento.target as HTMLInputElement;
    this.solicitud6101Store.actualizarManifiestosSeleccionados(ELEMENTO_DE_ENTRADA.checked);
  }

  // eslint-disable-next-line class-methods-use-this
  divideFraccion(str: string): DivideFraccion {
    const LONGITUDVALUE = str.length;
    let capitulo = '';
    let partida = '';
    let subpartida = '';
    let subdivision = '';

    if (LONGITUDVALUE === 10 || LONGITUDVALUE === 8) {
      capitulo = str.substr(0, 2);
      partida = str.substr(0, 4);
      subpartida = str.substr(0, 6);
      subdivision = LONGITUDVALUE === 10 ? str.substr(8, 2) : '00';
    }

    return {
      capitulo,
      partida,
      subpartida,
      subdivision
    };
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
