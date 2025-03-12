import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { CatalogosSelect } from '@ng-mf/data-access-user';
import { Catalogo, TituloComponent } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { SanitarioService } from '../../services/sanitario.service';
import { Subject, takeUntil } from 'rxjs';



@Component({
  selector: 'app-derechos',
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule,CatalogoSelectComponent],
  templateUrl: './derechos.component.html',
  styleUrl: './derechos.component.css',
})
export class DerechosComponent implements OnInit, OnDestroy {
  // aduanas: Catalogo[];
  derechosForm!:FormGroup;
  private destroyed$ = new Subject<void>();
  public derechosList!: Catalogo[];

  constructor(private fb: FormBuilder,private service:SanitarioService){}

  ngOnInit(): void {

    this.derechosForm = this.fb.group({ 
      referencia:[''],
      Chandenadependencia:[''],
      Llave:[''],
      benco:[''],
      deFetch:[''],
      importe:[''],

});
this.loadComboUnidadMedida;
  }

  loadComboUnidadMedida(): void {
    this.service.getDatos().pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data): void => {
      this.derechosList = data as Catalogo[];
    });
  }
  validarTransporteFormulario(){

  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}

