import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { ModalRegistroSociedadesSccService } from './modalRegistroSociedadesScc.service';

@Component({
  selector: 'app-agregar-agente',
  templateUrl: './agregar-agente.component.html',
   styleUrl: './agregar-agente.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AgregarAgenteComponent implements OnInit {
  datosTramite!: FormGroup;
  mostrarAgente: boolean = false;
  mostrarAgencia: boolean = false;

  actionBean = {
    agenteAduanalId: '',
    agenteAduanalDescripcion: '',
    apoderadoAduanalId: '',
    apoderadoAduanalDescripcion: '',
    agenciaAduanalId: '',
    agenciaAduanaDescripcion: ''
  };

  constructor(
    private fb: FormBuilder,
    // private modalRegistroSociedadesSccService: ModalRegistroSociedadesSccService
  ) {}

  ngOnInit(): void {
      this.datosTramite = this.fb.group({
        tipoFigura: ['', Validators.required],
          patenteModificada: ['', Validators.required],
      numPatenteModal: ['', [Validators.required, Validators.maxLength(4)]],
      rfcModal: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(13)]],
      ObligFisc: [false, Validators.requiredTrue],
      AutPantente: [false, Validators.requiredTrue],
          nombre: [{ value: '', disabled: true }, Validators.required],
          apellidoPaterno: [{ value: '', disabled: true }, Validators.required],
          apellidoMaterno: [{ value: '', disabled: true }, Validators.required],
          razonSocial: ['', Validators.required],
      patente2: ['', [Validators.required, Validators.maxLength(15)]],
      razonAgencia: ['', Validators.required]
    });

    // Initialize actionBean with default values or fetch from a service
    // this.modalRegistroSociedadesSccService.getActionBean().subscribe(data => {
    //   this.actionBean = data;
    // });
  }

  onSelectFigura(event: any): void {
    const selectedValue = event.target.value;
    if (selectedValue === '1' || selectedValue === '2') {
      this.mostrarAgencia = false;
      this.mostrarAgente = true;
    } else {
      this.mostrarAgencia = true;
      this.mostrarAgente = false;
    }
  }

  cargarDatosPatente(): void {
    // this.modalRegistroSociedadesSccService.cargarDatosPatente(this.form.value).subscribe(response => {
    //   // Handle the response data
    // });
    console.log('cargarDatosPatente called');
  }

  guardarDatosSociedadScc(): void {
    // this.modalRegistroSociedadesSccService.guardarDatosSociedadScc(this.form.value).subscribe(response => {
    //   // Handle the response data
    // });
    console.log('guardarDatosSociedadScc called');
  }

  limpiarSociedadesScc(): void {
    this.datosTramite.reset();
    this.mostrarAgencia = false;
    this.mostrarAgente = false;
  }

  cerrarDialogoSociedadesScc(): void {
    // Implement dialog close functionality, possibly using a dialog service
    console.log('cerrarDialogoSociedadesScc called');
  }
}