import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoDeAvisoComponent } from './tipo-de-aviso.component';

describe('TipoDeAvisoComponent', () => {
  let component: TipoDeAvisoComponent;
  let fixture: ComponentFixture<TipoDeAvisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoDeAvisoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TipoDeAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
