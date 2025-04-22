import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ManifiestosComponent } from './manifiestos.component';
import { By } from '@angular/platform-browser';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';

describe('ManifiestosComponent', () => {
  let component: ManifiestosComponent;
  let fixture: ComponentFixture<ManifiestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,ManifiestosComponent, InputRadioComponent],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {  
    fixture = TestBed.createComponent(ManifiestosComponent);
    component = fixture.componentInstance;
    component.manifestoDeVeracidad = 'Test Manifesto';
    component.radioOptions = [
      { label: 'Option 1', value: 'Option 1' },
      { label: 'Option 2', value: 'Option 2' },
    ];
    component.declaracionEstaMarcado = true;
    component.Aduana = new FormBuilder().group({
      aduanas: [false],
      informacionConfidencial: [''],
    });

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render manifestoDeVeracidad text', () => {
    const label = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(label.textContent.trim()).toContain('Test Manifesto');
  });

  it('should bind the checkbox to the form control', () => {
    const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]')).nativeElement;
    expect(checkbox.checked).toBe(true);
    checkbox.click();
    fixture.detectChanges();
    expect(component.Aduana.get('aduanas')?.value).toBe(false);
  });

  it('should bind the radio options to the form control', () => {
    const radioComponent = fixture.debugElement.query(By.directive(InputRadioComponent)).componentInstance;
    expect(radioComponent.radioOptions).toEqual(['Option 1', 'Option 2']);
    expect(radioComponent.layout).toBe('horizontal');
  });

  it('should call setValoresStore on radio change', () => {
    const spy = jest.spyOn(component, 'setValoresStore');
    const radioComponent = fixture.debugElement.query(By.directive(InputRadioComponent)).componentInstance;
    radioComponent.change.emit('Option 1');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(component.Aduana, 'informacionConfidencial');
  });
});