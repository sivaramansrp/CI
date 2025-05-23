
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Directive, Injectable, Input, NO_ERRORS_SCHEMA, Output, Pipe, PipeTransform } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { PasoTresComponent } from './paso-tres.component';
import { Router } from '@angular/router';

@Injectable()
class MockRouter {
  navigate() {};
}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom: any;
}

@Pipe({name: 'translate'})
class TranslatePipe implements PipeTransform {
  transform(value: any) { return value; }
}

@Pipe({name: 'phoneNumber'})
class PhoneNumberPipe implements PipeTransform {
  transform(value: any) { return value; }
}

@Pipe({name: 'safeHtml'})
class SafeHtmlPipe implements PipeTransform {
  transform(value: any) { return value; }
}

describe('PasoTresComponent', () => {
  let fixture: ComponentFixture<PasoTresComponent>;
  let component: { ngOnDestroy: () => void; router: { navigate?: any; }; obtieneFirma: (arg0: {}) => void; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        PasoTresComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Router, useClass: MockRouter }
      ]
    }).overrideComponent(PasoTresComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #obtieneFirma()', async () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.obtieneFirma({});
    expect(component.router.navigate).toHaveBeenCalled();
  });

});