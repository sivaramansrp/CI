import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionDelCupoComponent } from './descripcion-del-cupo.component';
 
describe('DescripcionDelCupoComponent', () => {

  let component: DescripcionDelCupoComponent;

  let fixture: ComponentFixture<DescripcionDelCupoComponent>;
 
  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [DescripcionDelCupoComponent],

    }).compileComponents();
 
    fixture = TestBed.createComponent(DescripcionDelCupoComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();

  });
 
  it('should create', () => {

    expect(component).toBeTruthy();

  });
 
  it('should have a defined title', () => {

    expect(component.title).toBeDefined();

  });
 
  it('should render title in a h1 tag', () => {

    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('h1').textContent).toContain(component.title);

  });
 
  it('should call a specific method on button click', () => {

    spyOn(component, 'onButtonClick');

    const button = fixture.debugElement.nativeElement.querySelector('button');

    button.click();

    expect(component.onButtonClick).toHaveBeenCalled();

  });
 
  it('should update the view when data changes', () => {

    component.data = 'New Data';

    fixture.detectChanges();

    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('.data-container').textContent).toContain('New Data');

  });

});
 