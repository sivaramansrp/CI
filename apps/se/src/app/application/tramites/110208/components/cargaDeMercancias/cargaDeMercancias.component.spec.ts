import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CargaDeMercanciasComponent } from './cargaDeMercancias.component';

describe('CargaDeMercanciasComponent', () => {
  let component: CargaDeMercanciasComponent;
  let fixture: ComponentFixture<CargaDeMercanciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargaDeMercanciasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CargaDeMercanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
