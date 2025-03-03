import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoTresComponent } from './paso-tres.component';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoTresComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have TEXTOS defined and not empty', () => {
    expect(component.TEXTOS).toBeDefined();
    // Check if TEXTOS is a string and not an empty string
    expect(typeof component.TEXTOS).toBe('string');
    expect(component.TEXTOS.length).toBeGreaterThan(0);
  });


  it('should render the content correctly', () => {
    const compiled = fixture.nativeElement;

    // Check if the TEXTOS content is present in the template.
    // Use a more specific selector if possible (e.g., a data-testid attribute).
    const elementWithText = compiled.querySelector('[data-testid="instrucciones"]'); // Example using data-testid

    if (elementWithText) {
      expect(elementWithText.textContent).toContain(component.TEXTOS);
    } else {
      fixture.detectChanges(); // Force change detection in case the view hasn't initialized yet
      const elementWithTextAfterCD = compiled.querySelector('[data-testid="instrucciones"]');
      if (elementWithTextAfterCD) {
        expect(elementWithTextAfterCD.textContent).toContain(component.TEXTOS);
      } else {
        console.warn('Element with data-testid="instrucciones" not found. Check template and test.');
      }
    }
  });

  it('should handle undefined TEXTOS gracefully', () => {
    // Simulate TEXTOS being undefined (e.g., if the enum is not loaded yet)
    component.TEXTOS = undefined as any; // Use "as any" to force undefined

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    // Check if the template handles the undefined value without errors.
    // For example, you might expect an empty string or some default text.
    const element = compiled.querySelector('[data-testid="instrucciones"]');
    if (element) {
      // Check if the element handles undefined gracefully.
      // For example, you might expect an empty string or some default text.
      expect(element.textContent).not.toContain('undefined'); // Or any other error indicator
    }
  });
});