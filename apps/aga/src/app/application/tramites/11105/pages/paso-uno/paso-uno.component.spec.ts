import { TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { DatosGeneralesDeLaSolicitudComponent } from '../../components/datos-generales-de-la-solicitud/datos-generales-de-la-solicitud.component';
import { DesistimientoComponent } from '../../components/desistimiento/desistimiento.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule, 
        DatosGeneralesDeLaSolicitudComponent,
        DesistimientoComponent,
        SolicitanteComponent,
        PasoUnoComponent
      ],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.indice).toBe(1);
    expect(component.tipoPersona).toBeUndefined();
    expect(component.persona).toEqual([]);
    expect(component.domicilioFiscal).toEqual([]);
  });

  it('should update the selected tab index when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should have a reference to the SolicitanteComponent', () => {
    expect(component.solicitante).toBeUndefined(); 
  });
});