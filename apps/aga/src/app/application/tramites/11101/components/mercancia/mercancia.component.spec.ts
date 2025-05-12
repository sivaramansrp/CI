import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MercanciaComponent } from './mercancia.component';

describe('MercanciaComponent', () => {
    let component: MercanciaComponent;
    let fixture: ComponentFixture<MercanciaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule,MercanciaComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MercanciaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form with default values', () => {
        const formValues = component.mercanciaForm.value;
        expect(formValues).toEqual({
            estado: 'Nuevo',
            cantidad: 1,
            formapartadepatrimonia: 'SI',
            descripcion: 'asd',
            valor: 1,
            unidadmedida: 'Amperiso',
            fraccionarancelaria: 123456,
            nico: 0,
            marca: 'adsfsdg',
            modelo: 'rewte',
            numerodeserie: 134,
            moneda: 'fronca de africa ',
            fin: 'seleccion van valor',
            especifique: 'textarea',
        });
    });

    it('should set form values correctly in setFormValues', () => {
        component.setFormValues();
        expect(component.mercanciaForm.get('estado')?.value).toBe('Nuevo');
        expect(component.mercanciaForm.get('cantidad')?.value).toBe(1);
        expect(component.mercanciaForm.get('formapartadepatrimonia')?.value).toBe('SI');
        expect(component.mercanciaForm.get('descripcion')?.value).toBe('asd');
        expect(component.mercanciaForm.get('valor')?.value).toBe(1);
        expect(component.mercanciaForm.get('unidadmedida')?.value).toBe('Amperiso');
        expect(component.mercanciaForm.get('fraccionarancelaria')?.value).toBe(123456);
        expect(component.mercanciaForm.get('nico')?.value).toBe(0);
        expect(component.mercanciaForm.get('marca')?.value).toBe('adsfsdg');
        expect(component.mercanciaForm.get('modelo')?.value).toBe('rewte');
        expect(component.mercanciaForm.get('numerodeserie')?.value).toBe(134);
        expect(component.mercanciaForm.get('moneda')?.value).toBe('fronca de africa ');
        expect(component.mercanciaForm.get('fin')?.value).toBe('seleccion van valor');
        expect(component.mercanciaForm.get('especifique')?.value).toBe('textarea');
    });

    it('should reset the form values', () => {
        component.mercanciaForm.setValue({
            estado: 'Test',
            cantidad: 10,
            formapartadepatrimonia: 'NO',
            descripcion: 'Test description',
            valor: 100,
            unidadmedida: 'Test unit',
            fraccionarancelaria: 654321,
            nico: 1,
            marca: 'Test brand',
            modelo: 'Test model',
            numerodeserie: 999,
            moneda: 'Test currency',
            fin: 'Test fin',
            especifique: 'Test textarea',
        });

        component.mercanciaForm.reset();
        const formValues = component.mercanciaForm.value;
        expect(formValues).toEqual({
            estado: null,
            cantidad: null,
            formapartadepatrimonia: null,
            descripcion: null,
            valor: null,
            unidadmedida: null,
            fraccionarancelaria: null,
            nico: null,
            marca: null,
            modelo: null,
            numerodeserie: null,
            moneda: null,
            fin: null,
            especifique: null,
        });
    });
});