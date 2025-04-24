import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Catalogo } from '@libs/shared/data-access-user/src';

import { Subject, takeUntil } from 'rxjs';

import { OperacionService } from '../../services/operacion.service';

@Component({
  selector: 'app-operaciones-de-comercio-exterior',
  templateUrl: './operaciones-de-comercio-exterior.component.html',
  styleUrl: './operaciones-de-comercio-exterior.component.scss',
})
export class OperacionesDeComercioExteriorComponent implements OnInit,OnDestroy {
  miformulario!: FormGroup;
  optionsPaisList:Catalogo[]=[];
   private destroyNotifier$: Subject<void> = new Subject();
  constructor(private readonly fb: FormBuilder,private readonly operacionService: OperacionService) { 
    this.getOperacionList();
  }

  ngOnInit(): void {
  this.miformulario = this.fb.group({
  operacion:['',Validators.required],
  });
  }
  getOperacionList(): void {
    this.operacionService.obtenerSelectorList('optionsPais.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.optionsPaisList = data;
    })
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
