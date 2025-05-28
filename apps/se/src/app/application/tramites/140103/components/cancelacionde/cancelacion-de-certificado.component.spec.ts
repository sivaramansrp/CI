
jest.mock('@libs/shared/theme/assets/json/140103/cancelcatalog.json', () => ({
  __esModule: true,
  default: {
    regimen: [{ id: 1, name: 'reg1' }],
    mecanismo: [{ id: 2, name: 'mec1' }],
    tratado: [{ id: 3, name: 'tra1' }],
    producto: [{ id: 4, name: 'prod1' }],
    subproducto: [{ id: 6, name: 'subprod1' }],
    representacion: [{ id: 5, name: 'rep1' }]
  }
}));

jest.mock('@libs/shared/theme/assets/json/140103/cancelacion.json', () => ({
  __esModule: true,
  default: [
    { id: 1, description: 'desc1' }
  ]
}));

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CancelacionDeCertificateComponent } from './cancelacion-de-certificado.component';
import { CatalogoSelectComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common'; 
import { OficioComponent } from '../oficio/oficio.component';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TituloComponent } from '@ng-mf/data-access-user'; 
import cancelacions from '@libs/shared/theme/assets/json/140103/cancelacion.json';
import cancelcatalog from '@libs/shared/theme/assets/json/140103/cancelcatalog.json';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import {of, Subject} from 'rxjs';
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
    expect(component.Cancelacion).toEqual(cancelacions);
    expect(component.Cancelacion.length).toBeGreaterThan(0);
  });

  it('should initialize the regime property with data from cancelcatalog.regime', () => {
    expect(component.regimen).toEqual(cancelcatalog.regimen);
    expect(component.regimen.length).toBeGreaterThan(0);
  });

  it('should initialize the mecanismo property with data from cancelcatalog.mecanismo', () => {
    expect(component.mecanismo).toEqual(cancelcatalog.mecanismo);
    expect(component.mecanismo.length).toBeGreaterThan(0);
  });

  it('should initialize the tratado property with data from cancelcatalog.tratado', () => {
    expect(component.tratado).toEqual(cancelcatalog.tratado);
    expect(component.tratado.length).toBeGreaterThan(0);
  });

  it('should initialize the nombrede property with data from cancelcatalog.producto', () => {
    expect(component.producto).toEqual(cancelcatalog.producto);
    expect(component.producto.length).toBeGreaterThan(0);
  });

  it('should initialize the nombredel property with data from cancelcatalog.subproducto', () => {
    expect(component.subproducto).toEqual(cancelcatalog.subproducto);
    expect(component.subproducto.length).toBeGreaterThan(0);
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

      it('should disable form in readonly mode (guardarDatosFormulario)', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.CancelacionForm.disabled).toBe(true);
  });

  it('should enable form in editable mode (guardarDatosFormulario)', () => {
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.CancelacionForm.enabled).toBe(true);
  });

  it('should clean up observables on destroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
