import { ComponentFixture } from '@angular/core/testing';
import { ModificarMercanciasComponent } from './modificar-mercancias.component';
import { TestBed } from '@angular/core/testing';


describe('ModificarMercanciasComponent', () => {
  let component: ModificarMercanciasComponent;
  let fixture: ComponentFixture<ModificarMercanciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarMercanciasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarMercanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
