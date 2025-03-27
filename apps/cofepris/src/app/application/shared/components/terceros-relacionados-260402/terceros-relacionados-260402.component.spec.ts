import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TercerosRelacionados260402Component } from './terceros-relacionados-260402.component';
 
describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionados260402Component;
  let fixture: ComponentFixture<TercerosRelacionados260402Component>;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,TercerosRelacionados260402Component],
      providers: [FormBuilder],
    }).compileComponents();
 
    fixture = TestBed.createComponent(TercerosRelacionados260402Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
});