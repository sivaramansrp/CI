import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { CargarArchivosComponent } from '../cargar-archivos/cargar-archivos.component';
import { DatosDeLaSolicitudComponent } from '../datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosEmpresaComponent } from './datos-empresa.component';
import { DatosGeneralesSociosComponent } from '../datos-generales-socios/datos-generales-socios.component';
import { DomicilioComponent } from '../domicilio/domicilio.component';
import { RepresentacionFederalComponent } from '../representacion-federal/representacion-federal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosEmpresaComponent', () => {
  let component: DatosEmpresaComponent;
  let fixture: ComponentFixture<DatosEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RepresentacionFederalComponent,
        DatosDeLaSolicitudComponent,
        DomicilioComponent,
        DatosGeneralesSociosComponent,
        CargarArchivosComponent,
        DatosEmpresaComponent,
        HttpClientTestingModule
      ],
      declarations: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render child components', () => {
    const COMPILED = fixture.nativeElement;
    expect(COMPILED.querySelector('app-representacion-federal')).toBeTruthy();
    expect(COMPILED.querySelector('app-datos-de-la-solicitud')).toBeTruthy();
    expect(COMPILED.querySelector('app-domicilio')).toBeTruthy();
    expect(COMPILED.querySelector('app-datos-generales-socios')).toBeTruthy();
    expect(COMPILED.querySelector('app-cargar-archivos')).toBeTruthy();
  });
});
