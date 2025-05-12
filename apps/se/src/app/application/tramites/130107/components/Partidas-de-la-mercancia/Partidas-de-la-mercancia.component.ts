import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { FormGroup , ReactiveFormsModule, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { PARTIDAS } from '../../constantes/datos-de-la-solicitud.enum';
import { PARTIDAS_DE_LA_MERCANCIA } from '../../constantes/datos-de-la-solicitud.enum';
import { PARTIDAS_TABLA } from '../../constantes/importaciones-agropecuarias.enum';
import { Partidas } from '../../models/partidas.model';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-partidas-de-la-mercancia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormasDinamicasComponent, TablaDinamicaComponent],
  templateUrl: './Partidas-de-la-mercancia.component.html',
  styleUrl: './Partidas-de-la-mercancia.component.scss',
})
export class PartidasDeLaMercanciaComponent implements OnInit, OnDestroy{
/**
     * Sujeto utilizado para destruir las suscripciones y evitar fugas de memoria.
     */
     private destroy$ = new Subject<void>();
    /**
     * Formulario principal del componente.
     * Incluye un grupo de formularios para manejar los datos de los insumos.
     */
    public forma: FormGroup = new FormGroup({
      ninoFormGroup: new FormGroup({}),
    });
  
    /**
     * Getter para acceder al grupo de formularios de insumos.
     * Retorna el grupo de formularios correspondiente.
     */
    get ninoFormGroup(): FormGroup {
      return this.forma.get('ninoFormGroup') as FormGroup;
    }
  
    public PartidasDeLaMercancia = PARTIDAS_DE_LA_MERCANCIA;
    public PartidasDeLa = PARTIDAS;
    
     public partidasTabla: ConfiguracionColumna<Partidas>[] = PARTIDAS_TABLA;
     public TablaSeleccion = TablaSeleccion;
     public datospartidas: Partidas[] = [];

    constructor
    () {
      // Lógica de inicialización si es necesario
    }
    ngOnInit(): void {
      // Lógica de inicialización si es necesario
    }

    agregarPartida(): void {
       if (this.ninoFormGroup.valid) {
      const PRODUCTOS = {
        cantidad: this.ninoFormGroup.get('cantidad')?.value,
        unidad_de_medida: 'Kilogramo',
        fraccion_arancelaria_tigie: '9099',
        descripcion: this.ninoFormGroup.get('descripcion')?.value,
        precio_unitario: '1.000',
        total_usd: this.ninoFormGroup.get('valorPartidaUsd')?.value
      };
      // this.ninoFormGroup.setValue({
      //   cantidadTotal:'100'
      // });
      this.datospartidas?.push(PRODUCTOS);
     // this.tramite130103Store.setDynamicFieldValue('producto', PRODUCTOS);
      this.ninoFormGroup.reset();
    }
    }
    /**
     * Método que destruye las suscripciones para evitar fugas de memoria.
     */
      ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
      }
}
