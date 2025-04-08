// import { LayoutDirectorGeneralService } from '../../services/layout-director-general.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-layout-director-general',
  templateUrl: './layoutDirectorGeneral.component.html',
  styleUrls: ['./layoutDirectorGeneral.component.scss']
})
export class LayoutDirectorGeneralComponent implements OnInit {
  solicitud!: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private layoutDirectorGeneralService: LayoutDirectorGeneralService
  ) { }

  ngOnInit(): void {
    this.solicitud = this.fb.group({
        nombre: this.fb.control<string>('', [Validators.required, Validators.maxLength(200)]),
        apellidoPaterno: this.fb.control<string>('', [Validators.required, Validators.maxLength(200)]),
        apellidoMaterno: this.fb.control<string | null>(null, [Validators.maxLength(200)])
    });
  }

}