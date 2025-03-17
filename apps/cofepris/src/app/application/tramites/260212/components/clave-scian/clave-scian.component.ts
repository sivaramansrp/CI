import { Component, EventEmitter, Output, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';




@Component({
  selector: 'app-clave-scian',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent, TituloComponent, CatalogoSelectComponent],
  templateUrl: './clave-scian.component.html',
  styleUrl: './clave-scian.component.scss',
})
export class ClaveScianComponent implements OnInit {
  @Output() cancel = new EventEmitter<void>();

  cancelar() {
    this.cancel.emit(); // Emit event to parent
  }

  clave:Catalogo[]=[];
  claveForm!:FormGroup

  constructor(private fb: FormBuilder,private solicitudService: SolicitudService) { }
  
  ngOnInit(): void {

    this.claveScianForm()

    this.solicitudService.getclave().subscribe((data) => {
      this.clave = data;
    }
    );

  }

  claveScianForm(){
     this.claveForm = this.fb.group({
          clave: ['', Validators.required],
          Descripcion:['']
     })
  
  }
}
