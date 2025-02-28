import { ComponentFixture, TestBed } from '@angular/core/testing';
 // Import your standalone component
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // CommonModule for standalone components
import { TituloComponent } from '@ng-mf/data-access-user'; // Any other imported components
import { OficioComponent } from '../oficio/oficio.component';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import cancelations from 'libs/shared/theme/assets/json/140103/cancelacion.json';
import { CancelacionDeCertificateComponent } from './cancelacion-de-certificate.component';
import cancelcatalog from 'libs/shared/theme/assets/json/140103/cancelcatalog.json';

describe('CancelacionDeCertificateComponent', () => {
  let component: CancelacionDeCertificateComponent;
  let fixture: ComponentFixture<CancelacionDeCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,  // Import CommonModule for standalone components
        FormsModule,  // Import FormsModule if you're using template-driven forms
        ReactiveFormsModule,  // Import ReactiveFormsModule if you're using reactive forms
        TituloComponent, // Import any other required components
        OficioComponent,
        TablaDinamicaComponent,
        CatalogoSelectComponent,
        CancelacionDeCertificateComponent // Import the standalone component directly here
      ],
      declarations: []  // No need to declare standalone components here
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelacionDeCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the cancelation property with data from cancelations.json', () => {
    expect(component.cancelation).toEqual(cancelations);
    expect(component.cancelation.length).toBeGreaterThan(0);
  });

  it('should initialize the regime property with data from cancelcatalog.regime', () => {
    expect(component.regime).toEqual(cancelcatalog.regime);
    expect(component.regime.length).toBeGreaterThan(0);
  });

  it('should initialize the mecanismo property with data from cancelcatalog.mecanismo', () => {
    expect(component.mecanismo).toEqual(cancelcatalog.mecanismo);
    expect(component.mecanismo.length).toBeGreaterThan(0);
  });

  it('should initialize the tratado property with data from cancelcatalog.tratado', () => {
    expect(component.tratado).toEqual(cancelcatalog.tratado);
    expect(component.tratado.length).toBeGreaterThan(0);
  });

  it('should initialize the nombrede property with data from cancelcatalog.nombrede', () => {
    expect(component.nombrede).toEqual(cancelcatalog.nombrede);
    expect(component.nombrede.length).toBeGreaterThan(0);
  });

  it('should initialize the nombredel property with data from cancelcatalog.nombredel', () => {
    expect(component.nombredel).toEqual(cancelcatalog.nombredel);
    expect(component.nombredel.length).toBeGreaterThan(0);
  });

  it('should initialize the representacion property with data from cancelcatalog.representacion', () => {
    expect(component.representacion).toEqual(cancelcatalog.representacion);
    expect(component.representacion.length).toBeGreaterThan(0);
  });

  it('should initialize the configuracionTabla with correct table configuration', () => {
    const expectedConfiguracion: any[] = [
      { encabezado: 'Cupo', clave: (item: any) => item.cupo, orden: 1 },
      { encabezado: 'Nombre de Producto', clave: (item: any) => item.nombreProducto, orden: 2 },
      { encabezado: 'Nombre del Subproducto', clave: (item: any) => item.nombreSubproducto, orden: 3 },
      { encabezado: 'Mecanismo de Asignación', clave: (item: any) => item.mecanismoAsignacion, orden: 4 },
      { encabezado: 'Tipo Cupo', clave: (item: any) => item.tipoCupo, orden: 5 }
    ];

    expect(component.configuracionTabla).toEqual(expectedConfiguracion);
    expect(component.configuracionTabla.length).toBe(5); 
  });
});
