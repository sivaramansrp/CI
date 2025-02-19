import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnexarEquisitosComponent } from './anexar-equisitos.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';

fdescribe('AnexarEquisitosComponent', () => {
  let component: AnexarEquisitosComponent;
  let fixture: ComponentFixture<AnexarEquisitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule,AnexarEquisitosComponent,CatalogoSelectComponent],
      providers: [FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnexarEquisitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    expect(component.anexarForm).toBeDefined();
    expect(component.anexarForm.get('valorSeleccionado')).toBeDefined();
  });

  it('should update form value on cambioDeArchivo', () => {
    const mockEvent = { target: { value: 'testValue' } };
    component.cambioDeArchivo(mockEvent);
    expect(component.anexarForm.get('valorSeleccionado')?.value).toBe('testValue');
  });
});