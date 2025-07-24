import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerarDictamenComponent } from './generar-dictamen.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { ValidacionesFormularioService } from '../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';

describe('GenerarDictamenComponent', () => {
    let component: GenerarDictamenComponent;
    let fixture: ComponentFixture<GenerarDictamenComponent>;
    let validacionesServiceMock: any;

    beforeEach(async () => {
        validacionesServiceMock = {
            isValid: jest.fn().mockReturnValue(true)
        };

        await TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule, ReactiveFormsModule, GenerarDictamenComponent],
            declarations: [],
            providers: [
                { provide: ValidacionesFormularioService, useValue: validacionesServiceMock }
            ]
        })
            .overrideComponent(GenerarDictamenComponent, {
                set: {
                    providers: [
                        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock }
                    ]
                }
            })
            .compileComponents();

        fixture = TestBed.createComponent(GenerarDictamenComponent);
        component = fixture.componentInstance;
        component.botonDeCancelar = 'Cancelar';
        component.botonGuardar = 'Guardar';
        fixture.detectChanges();
    });

    it('debe crear el componente', () => {
        expect(component).toBeTruthy();
    });

    it('debe inicializar el formulario correctamente en ngOnInit', () => {
        component.ngOnInit();
        expect(component.dictamenForm).toBeDefined();
        expect(component.dictamenForm.get('cumplimiento')?.value).toBe('1');
        expect(component.dictamenForm.get('mensajeDictamen')?.value).toBe('');
        expect(component.dictamenForm.get('fechaInicioVigenciaAutorizada')).toBeDefined();
        expect(component.dictamenForm.get('fechaFinVigenciaAutorizada')).toBeDefined();
    });

    it('debe mostrar campos de fecha cuando el dictamen es aceptado', () => {
        component.ngOnInit();
        expect(component.mostrarCamposFecha).toBe(true);
        
        const fechaInicioControl = component.dictamenForm.get('fechaInicioVigenciaAutorizada');
        const fechaFinControl = component.dictamenForm.get('fechaFinVigenciaAutorizada');
        expect(fechaInicioControl?.hasError('required')).toBe(true);
        expect(fechaFinControl?.hasError('required')).toBe(true);
    });

    it('debe ocultar campos de fecha cuando el dictamen es rechazado', () => {
        component.ngOnInit();
        
        // Cambiar a rechazado
        component.dictamenForm.get('cumplimiento')?.setValue('2');
        fixture.detectChanges();
        
        expect(component.mostrarCamposFecha).toBe(false);
        
        const fechaInicioControl = component.dictamenForm.get('fechaInicioVigenciaAutorizada');
        const fechaFinControl = component.dictamenForm.get('fechaFinVigenciaAutorizada');
        expect(fechaInicioControl?.hasError('required')).toBe(false);
        expect(fechaFinControl?.hasError('required')).toBe(false);
        expect(fechaInicioControl?.value).toBe('');
        expect(fechaFinControl?.value).toBe('');
    });

    it('debe cambiar la visibilidad de los campos al cambiar el sentido del dictamen', () => {
        component.ngOnInit();
        
        // Inicialmente debe mostrar los campos (valor por defecto es '1')
        expect(component.mostrarCamposFecha).toBe(true);
        
        // Cambiar a rechazado
        component.dictamenForm.get('cumplimiento')?.setValue('2');
        expect(component.mostrarCamposFecha).toBe(false);
        
        // Cambiar de vuelta a aceptado
        component.dictamenForm.get('cumplimiento')?.setValue('1');
        expect(component.mostrarCamposFecha).toBe(true);
    });

    it('debe emitir el evento de guardar cuando el formulario es válido', () => {
        const spy = jest.spyOn(component.enviarEvento, 'emit');
        component.ngOnInit();
        component.dictamenForm.get('mensajeDictamen')?.setValue('Justificación válida');
        component.dictamenForm.get('cumplimiento')?.setValue('2');
        component.guardarFirmar();
        expect(spy).toHaveBeenCalledWith({
            datos: {
                cumplimiento: '2',
                mensajeDictamen: 'Justificación válida'
            },
            events: 'guardar'
        });
    });

    it('no debe emitir el evento de guardar si el formulario es inválido', () => {
        const spy = jest.spyOn(component.enviarEvento, 'emit');
        component.ngOnInit();
        component.dictamenForm.get('mensajeDictamen')?.setValue('');
        component.guardarFirmar();
        expect(spy).not.toHaveBeenCalled();
    });

    it('debe emitir el evento de cancelar al hacer click en cancelar', () => {
        const spy = jest.spyOn(component.enviarEvento, 'emit');
        component.cancelar();
        expect(spy).toHaveBeenCalledWith({ events: 'cancelar', datos: null });
    });

    it('debe mostrar los botones con el texto correcto', () => {
        fixture.detectChanges();
        const btnCancelar = fixture.debugElement.query(By.css('.btn-default')).nativeElement;
        const btnGuardar = fixture.debugElement.query(By.css('.btn-primary')).nativeElement;
        expect(btnCancelar.textContent).toContain('Cancelar');
        expect(btnGuardar.textContent).toContain('Guardar');
    });

    it('debe marcar todos los campos como tocados al guardarFirmar', () => {
        component.ngOnInit();
        const spy = jest.spyOn(component.dictamenForm, 'markAllAsTouched');
        component.guardarFirmar();
        expect(spy).toHaveBeenCalled();
    });

    it('isValid debe delegar en el servicio de validaciones', () => {
        component.ngOnInit();
        component.isValid('mensajeDictamen');
        expect(validacionesServiceMock.isValid).toHaveBeenCalledWith(component.dictamenForm, 'mensajeDictamen');
    });
});