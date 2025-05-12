import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CancelacionDeCertificateComponent } from './cancelacion-de-certificate.component';
import { CatalogoSelectComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common'; 
import { OficioComponent } from '../oficio/oficio.component';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TituloComponent } from '@ng-mf/data-access-user'; 
import cancelations from 'libs/shared/theme/assets/json/140103/cancelacion.json';
import cancelcatalog from 'libs/shared/theme/assets/json/140103/cancelcatalog.json';
 interface Cupos {
  cupo: number;
  nombreProducto: string;
  nombreSubproducto: string;
  mecanismoAsignacion: string;
  tipoCupo: string;
}
describe('CancelacionDeCertificateComponent', () => {
  let component: CancelacionDeCertificateComponent;
  let fixture: ComponentFixture<CancelacionDeCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule, 
        TituloComponent, 
        OficioComponent,
        TablaDinamicaComponent,
        CatalogoSelectComponent,
        CancelacionDeCertificateComponent 
      ],
      declarations: [] 
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
    const EXPECTEDCONFIGURATION: unknown = [
      { encabezado: 'Cupo', clave: (item: Cupos) => item.cupo, orden: 1 },
      { encabezado: 'Nombre de Producto', clave: (item: Cupos) => item.nombreProducto, orden: 2 },
      { encabezado: 'Nombre del Subproducto', clave: (item: Cupos) => item.nombreSubproducto, orden: 3 },
      { encabezado: 'Mecanismo de Asignación', clave: (item: Cupos) => item.mecanismoAsignacion, orden: 4 },
      { encabezado: 'Tipo Cupo', clave: (item: Cupos) => item.tipoCupo, orden: 5 }
    ];

    expect(component.configuracionTabla).toEqual(EXPECTEDCONFIGURATION);
    expect(component.configuracionTabla.length).toBe(5); 
  });
});