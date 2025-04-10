import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosMercanciaComponent } from './datos-mercancia.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';

describe('DatosMercanciaComponent', () => {
  let component: DatosMercanciaComponent;
  let fixture: ComponentFixture<DatosMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DatosMercanciaComponent,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [Location, DatosSolicitudService],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.datosMercancia.value).toEqual({
      descripcion: 'QAS',
      fraccionArancelaria: '25030002',
      cantidadUMT: null,
      valorComercial: null,
      umc: null,
      tipoMoneda: null,
      paisDeOriginDatos: null,
    });
  });

  it('should update `seleccionadasPaisDeOriginDatos` when `paisDeOriginSeleccionadasChange` is called', () => {
    const mockPaises = ['México', 'Canadá'];
    component.paisDeOriginSeleccionadasChange(mockPaises);
    expect(component.seleccionadasPaisDeOriginDatos).toEqual(mockPaises);
    expect(component.datosMercancia.get('paisDeOriginDatos')?.value).toEqual(
      mockPaises
    );
  });

  it('should reset the form when `limpiarFormulario` is called', () => {
    component.datosMercancia.patchValue({
      descripcion: 'Test',
      cantidadUMT: 10,
    });
    component.limpiarFormulario();
    expect(component.datosMercancia.value).toEqual({
      descripcion: null,
      fraccionArancelaria: null,

      cantidadUMT: null,

      valorComercial: null,
      umc: null,
      tipoMoneda: null,
      paisDeOriginDatos: null,
    });
  });
});
