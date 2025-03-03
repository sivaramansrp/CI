import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AgregarMercanciaComponent } from './agregar-mercancia.component';

describe('AgregarMercanciaComponent', () => {
  let component: AgregarMercanciaComponent;
  let fixture: ComponentFixture<AgregarMercanciaComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarMercanciaComponent],
      imports: [ReactiveFormsModule, ToastrModule.forRoot()],
      providers: [FormBuilder]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AgregarMercanciaComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.agregarMercanciaForm = formBuilder.group({
      agregarMercancia: formBuilder.group({
        fraccionArancelaria: [''],
        descripcionFraccion: [''],
        nico: [''],
        descripcion: [''],
        unidaddeMedidaDeUMT: [''],
        cantidadTotalUMT: [''],
        saldoPendiente: [''],
        saldoACapturar: ['']
      })
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form on initialization', () => {
    expect(component.agregarMercanciaForm).toBeDefined();
    expect(component.agregarMercanciaForm.get('agregarMercancia')).toBeDefined();
  });

  it('should patch form value when mercanciasDatos changes', () => {
    const MERCANCIASDATOS = {
      agregarMercancia: {
        fraccionArancelaria: '01039201',
        descripcionFraccion: 'Con pedigree o certificado de alto registro.',
        nico: '00',
        descripcion: 'Con pedigree o certificado de alto registro.',
        unidaddeMedidaDeUMT: 'Cabeza',
        cantidadTotalUMT: '1000000',
        saldoPendiente: '1000000',
        saldoACapturar: ''
      }
    };
    component.mercanciasDatos = MERCANCIASDATOS;
    component.ngOnChanges({
      mercanciasDatos: {
        currentValue: MERCANCIASDATOS,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true
      }
    });
    const EXPECTEDFORMVALUE = {
      agregarMercancia: {
        fraccionArancelaria: '01039201',
        descripcionFraccion: 'Con pedigree o certificado de alto registro.',
        nico: '00',
        descripcion: 'Con pedigree o certificado de alto registro.',
        unidaddeMedidaDeUMT: 'Cabeza',
        cantidadTotalUMT: '1000000',
        saldoPendiente: '1000000',
        saldoACapturar: ''
      }
    };
    expect(component.agregarMercanciaForm.value).toEqual(EXPECTEDFORMVALUE);
  });

  it('should emit cancelarEvento when cerrarModal is called with true', () => {
    spyOn(component.cancelarEvento, 'emit');
    component.cerrarModal(true);
    expect(component.cancelarEvento.emit).toHaveBeenCalledWith(false);
  });

  it('should not emit cancelarEvento when cerrarModal is called with false', () => {
    spyOn(component.cancelarEvento, 'emit');
    component.cerrarModal(false);
    expect(component.cancelarEvento.emit).not.toHaveBeenCalled();
  });
});
