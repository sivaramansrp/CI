/**
 * @component ImportadorEnDestinoComponent
 * @description Este componente es responsable de manejar el formulario del importador en destino.
 * Incluye un formulario para capturar los datos del importador y funcionalidades adicionales.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormGroup } from '@angular/forms';
 */


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject,delay, map, takeUntil, tap } from 'rxjs';
import { Catalogo, 
  
  SeccionLibQuery, 
  
  SeccionLibState, 
  
  SeccionLibStore } from '@ng-mf/data-access-user';
import { ElegibilidadDeTextilesStore, TextilesState, createInitialState } from '../../estados/elegibilidad-de-textiles.store';
import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-importador-en-destino',
  templateUrl: './importador-en-destino.component.html',
  styleUrl: './importador-en-destino.component.scss'
})
export class ImportadorEnDestinoComponent implements OnInit{
  /**
   * @property {FormGroup} forma - El grupo de formularios para capturar los datos del importador.
   */
  importadorForm!: FormGroup;

  /**
   * @property {FormGroup} importadorEnDestino - El grupo de formularios para los datos del certificado de registro.
   */
  importadorEnDestino!: FormGroup;

  tipo: Catalogo[] = [];

  private destroyNotifier$: Subject<void> = new Subject();

  private importadorState: TextilesState = createInitialState();

  private seccionState!: SeccionLibState

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {HttpClient} httpServicios - Cliente HTTP para realizar solicitudes.--220201
   */
  constructor(private ElegibilidadTextilesService: ElegibilidadTextilesService, private readonly fb: FormBuilder, private readonly httpServicios: HttpClient,
    private ElegibilidadDeTextilesStore: ElegibilidadDeTextilesStore,
    private ElegibilidadDeTextilesQuery: ElegibilidadDeTextilesQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery
  ) {
    // Constructor logic can be added here if needed
  }


  /**
   * Inicializa el componente.
   * @method ngOnInit
   */
  ngOnInit(): void {
    
    this.initActionFormBuild();
    this.seccionQuery.selectSeccionState$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.seccionState = seccionState;
          })
        )
        .subscribe();
    this.ElegibilidadDeTextilesQuery.selectTextile$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.importadorState = state as TextilesState;
        })
      )
      .subscribe();
      this.importadorForm.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_value) => {
          if (this.importadorForm.valid) {
            this.ElegibilidadDeTextilesStore.setFormaValida([
              ...this.importadorState.formaValida,
              { id: 4, descripcion: "AllValida" }])
          }
        })
      )
      .subscribe();
    
    this.obtenerListasDesplegables();
    this.seccionStore.establecerFormaValida([false])
    if(this.importadorState.formaValida && this.importadorState.formaValida[0] && this.importadorState.formaValida[0].descripcion === 'AllValida'){
      this.seccionStore.establecerSeccion([true]);
      this.seccionStore.establecerFormaValida([true])
    }
    else{
      this.seccionStore.establecerFormaValida([false]);
    }
  }

  /**
   * Inicializa el grupo de formularios anidado para los datos de la solicitud.
   * @method initActionFormBuild
   */
  initActionFormBuild() {
    this.importadorForm = this.fb.group({
      tipo: [this.importadorState.tipo, Validators.required],
      cantidadTotalImportador: [this.importadorState.cantidadTotalImportador, [Validators.required, Validators.pattern('^[0-9]+$')]],
      razonSocialImportador: [this.importadorState.razonSocialImportador, Validators.required],
      domicilio: [this.importadorState.domicilio, Validators.required],
      ciudadImportador: [this.importadorState.ciudadImportador, Validators.required],
      cpImportador: [this.importadorState.cpImportador, [Validators.required, Validators.pattern('^[0-9]{5}$')]], // Assuming CP is a 5-digit code
      PaisImportador: [this.importadorState.PaisImportador, Validators.required]
    });

  }

  /**
   * Obtiene las listas desplegables.
   * @method obtenerListasDesplegables
   */
  obtenerListasDesplegables() {
    this.obtenerIngresoSelectList();
  }

  /**
   * Obtiene la lista para el select de aduana de ingreso.
   * @method obtenerIngresoSelectList
   */
  obtenerIngresoSelectList() {
    this.ElegibilidadTextilesService.obtenerMenuDesplegable('tipo.json').subscribe(data => {
      this.tipo = data as Catalogo[];
    })
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof ElegibilidadDeTextilesStore
  ): void {
    const VALOR = form.get(campo)?.value;
    console.log(VALOR);
    (this.ElegibilidadDeTextilesStore[metodoNombre] as (value: string) => void)(
      VALOR
    );
  }

}