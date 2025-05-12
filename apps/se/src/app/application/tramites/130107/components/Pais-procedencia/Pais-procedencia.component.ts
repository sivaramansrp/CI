import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { Subject } from 'rxjs';
import { CROSLISTA_DE_PAISES, PAIS_PROCEDENCIA, PAIS_PROCEDENCIA_TODOS } from '../../constantes/datos-de-la-solicitud.enum';
import { CrossListLable, CrosslistComponent } from '@libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';


@Component({
  selector: 'app-pais-procedencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormasDinamicasComponent],
  templateUrl: './Pais-procedencia.component.html',
  styleUrl: './Pais-procedencia.component.scss',
})
export class PaisProcedenciaComponent implements OnInit,OnDestroy {
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

  public paisProcedencia = PAIS_PROCEDENCIA;
  public paisProcedenciaTodos= PAIS_PROCEDENCIA_TODOS;

  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;
  

  public crosListaDePaises = CROSLISTA_DE_PAISES;

  seleccionarOrigenDelPais: string[] = this.crosListaDePaises;

  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de procedencia',
    derecha: 'País(es) seleccionados',
  };

   readonly paisDeProcedenciaBotones = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[0].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[0].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[0].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[0].quitar('t'),
    },
  ];

  constructor
  () {
    // Lógica de inicialización si es necesario
  }
  ngOnInit(): void {
    // Lógica de inicialización si es necesario
  }
    /**
   * Método que destruye las suscripciones para evitar fugas de memoria.
   */
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}
