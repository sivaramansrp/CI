import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CAMPO_DE_DETALLES, CAMPO_DE_TRANSPORTE } from '../../constantes/modificacion.enum';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-detalles-del-transporte',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent],
  templateUrl: './DetallesDelTransporte.component.html',
  styleUrl: './DetallesDelTransporte.component.css',
})
export class DetallesDelTransporteComponent implements OnInit, OnDestroy, OnChanges {

  formTransporte!: FormGroup;
  campoDestinatario = false;
  campoDetalles = false;

  @Input() idProcedimiento!: number;
  @Input() datosForm!: { [key: string]: unknown };
  @Output() medioDeTransporteSeleccionEvent: EventEmitter<Catalogo> = new EventEmitter<Catalogo>();
  @Output() formTransporteEvent: EventEmitter<{ formGroupName: string; campo: string; valor: undefined; storeStateName: string }> = new EventEmitter<{ formGroupName: string; campo: string; valor: undefined; storeStateName: string }>();
  @Output() formaValida: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  medioDeTransporte!: Catalogo[];
  destroyNotifier$: Subject<void> = new Subject();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.campoDestinatario = CAMPO_DE_TRANSPORTE.includes(this.idProcedimiento);
    this.campoDetalles = CAMPO_DE_DETALLES.includes(this.idProcedimiento);
  }

  medioDeTransporteSeleccion(estado: Catalogo): void {
    this.medioDeTransporteSeleccionEvent.emit(estado)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datosForm'] && this.datosForm) {
      if (this.formTransporte) {
        this.formTransporte.patchValue(this.datosForm);
      } else {
        this.createForm();
      }
    }
  }

  setValoresStore(formGroupName: string, campo: string, storeStateName: string): void {
    const VALOR = this.formTransporte.get(campo)?.value;
    this.formaValida.emit(this.formTransporte.valid);
    this.formTransporteEvent.emit({ formGroupName, campo, valor: VALOR, storeStateName });
  }
  
  createForm(): void {
    this.formTransporte = this.fb.group({
      medioDeTransporte: [''],
      rutaCompleta: [''],
      puertoEmbarque: [''],
      puertoDesembarque: [''],
      puertoTransito: [''],
      nombreEmbarcacion: [''],
      numeroVuelo: [''],
    });
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
