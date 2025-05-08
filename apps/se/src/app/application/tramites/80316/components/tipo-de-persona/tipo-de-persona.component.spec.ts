import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoDePersonaComponent } from './tipo-de-persona.component';

describe('TipoDePersonaComponent', () => {
  let component: TipoDePersonaComponent;
  let fixture: ComponentFixture<TipoDePersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoDePersonaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TipoDePersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
