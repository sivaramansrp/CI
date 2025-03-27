// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { Subject } from 'rxjs'; 
import { Component } from '@angular/core';
import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({name: 'translate'})
class TranslatePipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'phoneNumber'})
class PhoneNumberPipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'safeHtml'})
class SafeHtmlPipe implements PipeTransform {
  transform(value) { return value; }
}

describe('PasoDosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,HttpClientModule ],
      declarations: [
        PasoDosComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        CatalogosService
      ]
    }).overrideComponent(PasoDosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    if (component) {
      component.ngOnDestroy = function () {}; // Safely set ngOnDestroy if component exists
    }
    if (fixture) {
      fixture.destroy(); // Destroy the fixture if it exists
    }
  });
  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.getTiposDocumentos = jest.fn();
    component.ngOnInit();
    // expect(component.getTiposDocumentos).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyed$ = new Subject<void>(); // Properly initialize destroyed$
    jest.spyOn(component.destroyed$, 'next');
    jest.spyOn(component.destroyed$, 'complete');
  
    component.ngOnDestroy();
  
    expect(component.destroyed$.next).toHaveBeenCalled(); // Verify that next() was called
    expect(component.destroyed$.complete).toHaveBeenCalled(); // Verify that complete() was called
  });

  it('should run #getTiposDocumentos()', async () => {
    component.catalogosServices = TestBed.inject(CatalogosService); // Use the injected service
    jest.spyOn(component.catalogosServices, 'getCatalogo').mockReturnValue(observableOf({}));
  
    component.getTiposDocumentos();
  
    expect(component.catalogosServices.getCatalogo).toHaveBeenCalled(); // Verify the method was called
  });
});