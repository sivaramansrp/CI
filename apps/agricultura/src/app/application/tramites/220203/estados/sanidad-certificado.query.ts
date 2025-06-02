import { Acuicultura } from "../models/220203/importacion-de-acuicultura.module";
import { AcuiculturaStore } from "./220203/sanidad-certificado.store";
import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";

@Injectable({ providedIn: 'root' })
export class AcuiculturaQuery extends Query<Acuicultura> {

  constructor(protected override store: AcuiculturaStore) {
    super(store);
  }


  seleccionarTodo$ = this.select();

  seleccionarTercerosRelacionados$ = this.select(estado => estado.tercerosRelacionados);

}
