// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolicitanteComponent } from './solicitante.component';
import { FormBuilder } from '@angular/forms';

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

describe('SolicitanteComponent', () => {
  let fixture: ComponentFixture<SolicitanteComponent>;
  let component: SolicitanteComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, SolicitanteComponent],
      declarations: [TranslatePipe, PhoneNumberPipe, SafeHtmlPipe, MyCustomDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [FormBuilder]
    }).compileComponents();
  
    fixture = TestBed.createComponent(SolicitanteComponent);
    component = fixture.componentInstance;
      component.solicitudForm = new FormBuilder().group({
      someField: [''] 
    });
  
    fixture.detectChanges(); 
  }));
  
  
  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should run #ngOnInit()', async(() => {
    component.fb = component.fb || {};
    spyOn(component.fb, 'group').and.callThrough();
    spyOn(component, 'setFormValues').and.callThrough();
    component.ngOnInit();
    expect(component.fb.group).toHaveBeenCalled();
    expect(component.setFormValues).toHaveBeenCalled();
  }));

  it('should run #setFormValues()', async(() => {
    component.solicitudForm = component.solicitudForm || {};
    spyOn(component.solicitudForm, 'get').and.returnValue({
      setValue: function() {}
    });
    component.setFormValues();
    expect(component.solicitudForm.get).toHaveBeenCalled();
  }));
});