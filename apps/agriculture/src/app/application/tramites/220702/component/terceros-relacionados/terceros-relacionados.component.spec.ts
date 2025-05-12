// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { FitosanitarioService } from '../../service/fitosanitario.service';
import { Component } from '@angular/core';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';

@Injectable()
class MockFitosanitarioService { }
describe('TercerosRelacionadosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, TercerosRelacionadosComponent],
      declarations: [
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: FitosanitarioService, useClass: MockFitosanitarioService },

      ]
    }).overrideComponent(TercerosRelacionadosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
     component.getDatos = jest.fn();
    component.getDatosDestinatario = jest.fn();
    component.ngOnInit();
     expect(component.getDatos).toHaveBeenCalled();
     expect(component.getDatosDestinatario).toHaveBeenCalled();

   
  });


});