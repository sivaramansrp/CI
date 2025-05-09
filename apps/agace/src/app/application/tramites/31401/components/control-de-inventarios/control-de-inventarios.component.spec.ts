import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlDeInventariosComponent } from './control-de-inventarios.component';

describe('ControlDeInventariosComponent', () => {
  let component: ControlDeInventariosComponent;
  let fixture: ComponentFixture<ControlDeInventariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlDeInventariosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ControlDeInventariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
