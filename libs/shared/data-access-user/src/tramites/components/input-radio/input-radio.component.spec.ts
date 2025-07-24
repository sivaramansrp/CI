import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRadioComponent } from './input-radio.component';

describe('InputRadioComponent', () => {
  let component: InputRadioComponent;
  let fixture: ComponentFixture<InputRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputRadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('allowDeselection functionality', () => {
    beforeEach(() => {
      component.radioOptions = [
        { label: 'Option A', value: 'a' },
        { label: 'Option B', value: 'b' },
        { label: 'Option C', value: 'c' }
      ];
      component.allowDeselection = true;
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should allow selection of an option', () => {
      component.onSelectionChange('a');
      expect(component.selectedValue).toBe('a');
    });

    it('should allow deselection when same option is clicked again', () => {
      component.selectedValue = 'a';
      component.onSelectionChange('a');
      expect(component.selectedValue).toBeNull();
    });

    it('should disable other options when one is selected', () => {
      component.selectedValue = 'a';
      expect(component.isOptionDisabled('b')).toBe(true);
      expect(component.isOptionDisabled('c')).toBe(true);
      expect(component.isOptionDisabled('a')).toBe(false);
    });

    it('should enable all options when none is selected', () => {
      component.selectedValue = null;
      expect(component.isOptionDisabled('a')).toBe(false);
      expect(component.isOptionDisabled('b')).toBe(false);
      expect(component.isOptionDisabled('c')).toBe(false);
    });

    it('should correctly identify selected option', () => {
      component.selectedValue = 'b';
      expect(component.isOptionSelected('a')).toBe(false);
      expect(component.isOptionSelected('b')).toBe(true);
      expect(component.isOptionSelected('c')).toBe(false);
    });
  });
});
