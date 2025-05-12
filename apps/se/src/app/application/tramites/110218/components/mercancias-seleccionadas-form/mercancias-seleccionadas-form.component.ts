import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';
import { REGEX_NUMEROS_DECIMALES } from '@libs/shared/data-access-user/src';
import { REG_X } from '@libs/shared/data-access-user/src';


import { Tramite110218Query } from '../../estados/queries/tramite110218.query';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';

import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente para el formulario de mercancías seleccionadas.
 *
 * Este componente permite a los usuarios ingresar y modificar los detalles de las mercancías seleccionadas,
 * incluyendo información como nombres, marcas, valores, cantidades y detalles de la factura.
 *
 */
@Component({
  selector: 'app-mercancias-seleccionadas-form',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, ReactiveFormsModule],
  templateUrl: './mercancias-seleccionadas-form.component.html',
  styleUrl: './mercancias-seleccionadas-form.component.scss',
})
export class MercanciasSeleccionadasFormComponent implements OnInit, OnDestroy {
  /**
   * Opciones para la unidad de medida de comercialización.
   * MercanciasSeleccionadasFormComponent
   */
  unidaddeMedidadeComercializacionOptions: Catalogo[] = [];

  /**
   * Opciones para el tipo de factura.
   * MercanciasSeleccionadasFormComponent
   */
  tipodeFacturaOptions: Catalogo[] = [];

  /**
   * Formulario para modificar los datos del certificado.
   * MercanciasSeleccionadasFormComponent
   */
  modifydatosdelcertificado: FormGroup;

  /**
   * Subject para la destrucción del componente.
   * MercanciasSeleccionadasFormComponent
   */
  private destroyed$ = new Subject<void>();

  /**
   * Datos recibidos para la tabla.
   * MercanciasSeleccionadasFormComponent
   */
  receivedData: { nombreComercial: string; nombreIngles: string; }[] | null = null;

  /**
   * Observable para la unidad de medida de comercialización.
   */
  /**
 * Observable que proporciona las opciones para la unidad de medida de comercialización.
 * Este observable se suscribe a los datos provenientes de la consulta `tramite110218Query`.
 */
  unidaddeMedidadeComercializacion$: Observable<Catalogo | null> = this.tramite110218Query.unidaddeMedidadeComercializacion$;

  /**
   * Observable que proporciona las opciones para el tipo de factura.
   * Este observable se suscribe a los datos provenientes de la consulta `tramite110218Query`.
   */
  tipodeFactura$: Observable<Catalogo | null> = this.tramite110218Query.tipodeFactura$;

  /**
   * Observable que proporciona el complemento de la descripción.
   * Este observable se suscribe a los datos provenientes de la consulta `tramite110218Query`.
   */
  complementoDelaDescripcion$: Observable<string | null> = this.tramite110218Query.complementoDelaDescripcion$;

  /**
   * Observable que proporciona la marca de la mercancía.
   * Este observable se suscribe a los datos provenientes de la consulta `tramite110218Query`.
   */
  marca$: Observable<string | null> = this.tramite110218Query.marca$;

  /**
   * Observable que proporciona el valor de la mercancía.
   * Este observable se suscribe a los datos provenientes de la consulta `tramite110218Query`.
   */
  valorMercancia$: Observable<string | null> = this.tramite110218Query.valorMercancia$;

  /**
   * Observable que proporciona el número de la factura.
   * Este observable se suscribe a los datos provenientes de la consulta `tramite110218Query`.
   */
  numerodeFactura: Observable<string | null> = this.tramite110218Query.numerodeFactura$;

  /**
   * Evento que se emite cuando la modificación se realiza con éxito.
   */
  @Output() modificarÉxitoBtn = new EventEmitter<boolean>();
  /**
   * Constructor del componente.
   *
   * Constructor de formularios.
   * Servicio para obtener datos del certificado técnico de Japón.
   * Query para el trámite 110218.
   */
  constructor(
    private fb: FormBuilder,
    private service: CertificadoTecnicoJaponService,
    private tramite110218Query: Tramite110218Query,
    private tramite110218Store: Tramite110218Store,
    private router: Router
  ) {
    this.modifydatosdelcertificado = this.crearFormularioModificarDatosDelCertificado();
  }

  private crearFormularioModificarDatosDelCertificado(): FormGroup {
    return this.fb.group({
      nombreComercial: [{ value: '', disabled: true }], // Campo de solo lectura
      nombreIngles: [{ value: '', disabled: true }], // Campo de solo lectura
      complementoDelaDescripcion: ['', [Validators.required]], // Campo obligatorio
      marca: ['', [Validators.required]], // Campo obligatorio
      valorMercancia: ['', [Validators.required, Validators.pattern(REGEX_NUMEROS_DECIMALES)]], // Campo obligatorio, solo números con hasta 4 decimales
      cantidad: [{ value: '', disabled: true }], // Campo de solo lectura
      unidaddeMedidadeComercializacion: ['', Validators.required], // Campo obligatorio, selección de lista desplegable
      numerodeFactura: ['', [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)]], // Campo obligatorio, solo alfanumérico
      tipodeFactura: ['', Validators.required], // Campo obligatorio, selección de lista desplegable
      fechadelaFactura: [{ value: '', disabled: true }] // Campo de solo lectura
    });
  }

  /**
   * Método de inicialización del componente.
   * MercanciasSeleccionadasFormComponent
   */
  ngOnInit(): void {
    this.unidadMedidaData();
    this.tipoDeFactura();

    this.tramite110218Query.tableDataDatos$.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      this.receivedData = data;
    });

    this.tableDataValues();

    this.unidaddeMedidadeComercializacion$.pipe(takeUntil(this.destroyed$)).subscribe((unidaddeMedidadeComercializacion) => {
      if (unidaddeMedidadeComercializacion) {
        this.modifydatosdelcertificado.get('unidaddeMedidadeComercializacion')?.setValue(unidaddeMedidadeComercializacion);
      }
    });

    this.tipodeFactura$.pipe(takeUntil(this.destroyed$)).subscribe((tipodeFactura) => {
      if (tipodeFactura) {
        this.modifydatosdelcertificado.get('tipodeFactura')?.setValue(tipodeFactura);
      }
    });

    this.complementoDelaDescripcion$.pipe(takeUntil(this.destroyed$)).subscribe((complementoDelaDescripcion) => {
      if (complementoDelaDescripcion) {
        this.modifydatosdelcertificado.get('complementoDelaDescripcion')?.setValue(complementoDelaDescripcion);
      }
    });

    this.marca$.pipe(takeUntil(this.destroyed$)).subscribe((marca) => {
      if (marca) {
        this.modifydatosdelcertificado.get('marca')?.setValue(marca);
      }
    });

    this.valorMercancia$.pipe(takeUntil(this.destroyed$)).subscribe((valorMercancia) => {
      if (valorMercancia) {
        this.modifydatosdelcertificado.get('valorMercancia')?.setValue(valorMercancia);
      }
    });

    this.numerodeFactura.pipe(takeUntil(this.destroyed$)).subscribe((numerodeFactura) => {
      if (numerodeFactura) {
        this.modifydatosdelcertificado.get('numerodeFactura')?.setValue(numerodeFactura);
      }
    });
  }

  /**
   * Obtiene los datos de la unidad de medida desde el servicio.
   * MercanciasSeleccionadasFormComponent
   */
  unidadMedidaData(): void {
    this.service.getUnidadMedida().pipe(takeUntil(this.destroyed$)).subscribe((data: Catalogo[]) => {
      this.unidaddeMedidadeComercializacionOptions = data;
    });
  }

  /**
   * Obtiene los datos del tipo de factura desde el servicio.
   * MercanciasSeleccionadasFormComponent
   */
  tipoDeFactura(): void {
    this.service.getTipodeFctura()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        this.tipodeFacturaOptions = data;
      });
  }

  /**
   * Establece los valores de los datos de la tabla en el formulario.
   * MercanciasSeleccionadasFormComponent
   */
  tableDataValues(): void {
    if (this.receivedData) {
      this.modifydatosdelcertificado.patchValue({
        nombreComercial: this.receivedData[0].nombreComercial,
        nombreIngles: this.receivedData[0].nombreIngles,
        cantidad: '100',
        fechadelaFactura: '2024-11-13',
      });
    }
  }

  /**
   * Método de destrucción del componente.
   * MercanciasSeleccionadasFormComponent
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Redirige al usuario a la pantalla de validación del certificado técnico de Japón.
   * 
   * Este método se ejecuta cuando la modificación del formulario se completa exitosamente.
   * Utiliza el servicio de enrutamiento (`Router`) para navegar a la página correspondiente.
   */

  modificarSuccess(): void {
    this.modificarÉxitoBtn.emit(true);

  }

  /**
   * Maneja el cambio en la unidad de medida y actualiza el store.
   */
  enCambioDeUnidadDeMedida(): void {
    const UNIDADDE_MEDIDA = this.modifydatosdelcertificado.get('unidaddeMedidadeComercializacion')?.value;
    this.tramite110218Store.establecerUnidadeMedida(UNIDADDE_MEDIDA);
  }

  /**
   * Maneja cambios en el tipo de factura y actualiza el estado en el store.
   */
  enCambioDeTipoDeFactura(): void {
    const TIPODE_FACTURA = this.modifydatosdelcertificado.get('tipodeFactura')?.value;
    this.tramite110218Store.establecerTipodeFactura(TIPODE_FACTURA);
  }

  /**
 * Maneja cambios en los valores de ciertos campos del formulario y los actualiza en el store.
 * Nombre del campo que ha cambiado.
 */
  onMercanciaSeleccionadasChange(controlName: string): void {
    const VALUE = this.modifydatosdelcertificado.get(controlName)?.value;
    switch (controlName) {
      case 'complementoDelaDescripcion':
        this.tramite110218Store.establecerComplementoDelaDescripcion(VALUE);
        break;
      case 'marca':
        this.tramite110218Store.establecerMarca(VALUE);
        break;
      case 'valorMercancia':
        this.tramite110218Store.establecerValorMercancia(VALUE);
        break;
      case 'numerodeFactura':
        this.tramite110218Store.establecerNumerodeFactura(VALUE);
        break;
      default:
        break;
    }
  }
}
