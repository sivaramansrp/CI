/* eslint-disable @typescript-eslint/naming-convention */
import { AnexarRequisitosComponent } from './anexar-requisitos.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

fdescribe('AnexarEquisitosComponent', () => {
  let component: AnexarRequisitosComponent;
  let fixture: ComponentFixture<AnexarRequisitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        AnexarRequisitosComponent,
        CatalogoSelectComponent,
      ],
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
    expect(component.anexarForm).toBeDefined();
    expect(component.anexarForm.get('valorSeleccionado')).toBeDefined();
  });

  it('should update form value on cambioDeArchivo', () => {
    const mockEvent = { target: { files: [new File([''], 'testFile.txt')] } };
    const index = 0;
    component.cambioDeArchivo(mockEvent, index);
    expect(component.anexarForm.get('valorSeleccionado')?.value).toBe(
      'testValue'
    );
  });
});
