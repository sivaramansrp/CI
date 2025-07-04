import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, Input, OnInit, Output } from '@angular/core';
import { Catalogo, CatalogoSelectComponent, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CertificadoZoosanitarioServiceService } from '../../services/220201/certificado-zoosanitario.service';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { OPCION_DE_BOTON_DE_RADIO } from '../../../../shared/constantes/tercerosrelacionados.enum';
import { RadioOpcion } from '../../models/220201/certificado-zoosanitario.model';
import { TercerosrelacionadosService } from '../../../../shared/components/services/tercerosrelacionados/tercerosrelacionados.service';
import { TercerosrelacionadosdestinoTable } from '../../../../shared/models/tercerosrelacionados.model';
import { ZoosanitarioQuery } from '../../queries/220201/zoosanitario.query';


@Component({
  selector: 'app-agregardestinatario',
  standalone: true,
  imports: [CommonModule, TituloComponent,
    InputRadioComponent,CatalogoSelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './agregardestinatario.component.html',
  styleUrl: './agregardestinatario.component.scss',
})
export class AgregardestinatarioComponent implements OnInit,AfterViewInit {
      /**
         * Indica si el formulario debe mostrarse en modo solo lectura.
         *
         * @type {boolean}
         * @default false
         * @see https://compodoc.app/
         *
         * @description
         * Cuando es verdadero, el formulario se presenta únicamente para visualización,
         * deshabilitando la edición de los campos.
         */
        @Input() esFormularioSoloLectura:boolean = false;
        @Output() guardarDestinatario = new EventEmitter<TercerosrelacionadosdestinoTable>();
/**
   * Opciones para el botón de radio.
   * @property {RadioOpcion[]} opcionDeBotonDeRadio
   */
  opcionDeBotonDeRadio: RadioOpcion[] = OPCION_DE_BOTON_DE_RADIO;
  /**
   * Configuración para el select de veterinario.--220201
   * @property {Catalogo[]} veterinario
   */
  pairsCatalog: Catalogo[] = [];
  estadoCatalog: Catalogo[] = [];
  municipioCatalog: Catalogo[] = [];
  coloniaCatalog:Catalogo[]=[];
  /**
   * Sujeto para manejar la destrucción de observables y evitar fugas de memoria.
   */
  private destroyNotifier$ = new Subject<void>();
  destinatarioForm!: FormGroup;
  constructor(public fb: FormBuilder,public tercerosrelacionadosService: TercerosrelacionadosService,private router:Router,
  private readonly certificadoZoosanitarioServices: CertificadoZoosanitarioServiceService,
  private readonly certificadoZoosanitarioQuery: ZoosanitarioQuery,
  private route: ActivatedRoute
  ){}
  ngOnInit(): void {
     this.destinatarioForm = this.fb.group({
      tipoMercancia: ['yes', Validators.required],
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      razonSocial: ['', Validators.required],
      pais: ['1', Validators.required],
      codigoPostal: ['', Validators.required],
      estado: ['', Validators.required],
      municipio: [''],
      colonia: [''],
      calle: ['', Validators.required],
      numeroExterior: ['', Validators.required],
      numeroInterior: [''],
      lada: [''],
      telefono: [''],
      correo: ['']
    });
      const ID = this.route.snapshot.paramMap.get('id');
      if(ID){
         this.certificadoZoosanitarioQuery.seleccionarTercerosRelacionados$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: TercerosrelacionadosdestinoTable[]) => {
        const DESTINATARIO = data[0];
        if (DESTINATARIO) {
          this.destinatarioForm.patchValue({
            tipoMercancia: DESTINATARIO.tipoMercancia || 'yes',
            nombre: DESTINATARIO.nombre || '',
            primerApellido: DESTINATARIO.primerApellido || '',
            segundoApellido: DESTINATARIO.segundoApellido || '',
            razonSocial: DESTINATARIO.razonSocial || '',
            pais: DESTINATARIO.pais || '1',
            codigoPostal: DESTINATARIO.codigoPostal || '',
            estado: DESTINATARIO.estado || '',
            municipio: DESTINATARIO.municipio || '',
            colonia: DESTINATARIO.colonia || '',
            calle: DESTINATARIO.calle || '',
            numeroExterior: DESTINATARIO.numeroExterior || '',
            numeroInterior: DESTINATARIO.numeroInterior || '',
            lada: DESTINATARIO.lada || '',
            telefono: DESTINATARIO.telefono || '',
            correo: DESTINATARIO.correo || ''
          });
        }
      });
  }
      
  }
  ngAfterViewInit(): void {
    this.pairsCatalogChange();
    this.estadoCatalogChange();
    this.municipioCatalogChange();  
    this.coloniaCatalogChange();
  }
  pairsCatalogChange():void {
       this.tercerosrelacionadosService.obtenerSelectorList('paisprocedencia.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
          this.pairsCatalog = data;
        })
  }
  estadoCatalogChange():void {
    this.tercerosrelacionadosService.obtenerSelectorList('estados.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.estadoCatalog = data;
    })
  }
  municipioCatalogChange():void {
    this.tercerosrelacionadosService.obtenerSelectorList('municipios.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.municipioCatalog = data;
    })
  }
  coloniaCatalogChange():void {
    this.tercerosrelacionadosService.obtenerSelectorList('colonias.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.coloniaCatalog = data;
    })
  }
  onGuardarDestinatario():void{
    if (this.destinatarioForm.valid) {
      const LISTA_DINAMICA: TercerosrelacionadosdestinoTable[] = [];
      LISTA_DINAMICA.push(this.destinatarioForm.value as TercerosrelacionadosdestinoTable);
      this.certificadoZoosanitarioServices.updateTercerosRelacionado(LISTA_DINAMICA as TercerosrelacionadosdestinoTable[]);
         this.router.navigate(['/pago/certificado-zoosanitario/zoosanitario']);
    }
    else {
    this.destinatarioForm.markAllAsTouched(); 
    }
  }
}
