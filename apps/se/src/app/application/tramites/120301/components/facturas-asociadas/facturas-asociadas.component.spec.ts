import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from 'libs/shared/data-access-user/src/tramites/components/table/table.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { FormularioAsociacionFacturaComponent } from './facturas-asociadas.component';
import { of, throwError } from 'rxjs';

describe('formularioAsociacionFactura', () => {
  let component: FormularioAsociacionFacturaComponent;
  let fixture: ComponentFixture<FormularioAsociacionFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        TableComponent,
        TituloComponent,
        FormularioAsociacionFacturaComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioAsociacionFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    component.ngOnInit();
    expect(component.formularioAsociacionFactura.value).toEqual({ cantidadFacturas: '' });
  });

  it('should have a valid form when cantidadFacturas is provided', () => {
    component.ngOnInit();
    component.formularioAsociacionFactura.controls['cantidadFacturas'].setValue('10');
    expect(component.formularioAsociacionFactura.valid).toBeTruthy();
  });

  it('should have an invalid form when cantidadFacturas is empty', () => {
    component.ngOnInit();
    component.formularioAsociacionFactura.controls['cantidadFacturas'].setValue('');
    expect(component.formularioAsociacionFactura.invalid).toBeTruthy();
  });
});