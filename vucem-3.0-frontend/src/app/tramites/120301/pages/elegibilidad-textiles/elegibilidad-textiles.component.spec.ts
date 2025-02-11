import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegibilidadTextilesComponent } from './elegibilidad-textiles.component';

describe('ElegibilidadTextilesComponent', () => {
  let component: ElegibilidadTextilesComponent;
  let fixture: ComponentFixture<ElegibilidadTextilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElegibilidadTextilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElegibilidadTextilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should have a default title', () => {
    expect(component.title).toBe('Elegibilidad Textiles');
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Elegibilidad Textiles');
  });

  // Add more test cases as needed
});
