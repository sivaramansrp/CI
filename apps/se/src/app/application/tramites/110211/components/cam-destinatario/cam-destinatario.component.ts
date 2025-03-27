import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cam-destinatario',
  templateUrl: './cam-destinatario.component.html',
  styleUrl: './cam-destinatario.component.css',
})
export class CamDestinatarioComponent {
  exportadorForm!: FormGroup

  constructor(
    private readonly fb: FormBuilder, 
  ){

  }

  ngOnInit(): void {
    this.initActionFormBuild();
  }
  initActionFormBuild(): void {
    this.exportadorForm = this.fb.group({
      lugar:['', Validators.required],
      exportador: ['',Validators.required],
      empresa: ['',Validators.required],
      cargo: ['',Validators.required],
      lada: [''],
      telfono: ['',Validators.required],
      fax: ['',Validators.required],
      correo: ['',Validators.required]
    })

  }
}
