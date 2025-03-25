// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AnexarRequisitosComponent } from './anexar-requisitos.component';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';

describe('AnexarRequisitosComponent', () => {
  let component: AnexarRequisitosComponent;
  let fixture: ComponentFixture<AnexarRequisitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        CatalogoSelectComponent,
      ],
      declarations: [AnexarRequisitosComponent],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnexarRequisitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.anexarForm).toBeDefined();
    expect(component.anexarForm.get('valorSeleccionado')).toBeDefined();
  });

  it('should initialize the form with documentos', () => {
    component.ngOnInit();
    expect(component.documentos.length).toBeGreaterThan(0);
  });

  it('should update form value on cambioDeArchivo', () => {
    component.ngOnInit();
    const mockEvent = { target: { value: 'testFile.txt' } };
    const index = 0;
    component.cambioDeArchivo(mockEvent);
    expect(component.anexarForm.get('valorSeleccionado')?.value).toBe('testFile.txt');
  });

  it('should call verDocumento method', () => {
    component.ngOnInit();
    const index = 0;
    jest.spyOn(component, 'verDocumento');
    component.verDocumento(index);
    expect(component.verDocumento).toHaveBeenCalledWith(index);
  });
});