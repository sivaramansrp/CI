import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvisoDeAdicionComponent } from './aviso-de-adicion.component';

describe('AvisoDeAdicionComponent', () => {
  let component: AvisoDeAdicionComponent;
  let fixture: ComponentFixture<AvisoDeAdicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisoDeAdicionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvisoDeAdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
