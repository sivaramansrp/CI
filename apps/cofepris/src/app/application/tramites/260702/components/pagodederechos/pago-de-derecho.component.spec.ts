import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagodederechoComponent } from './pago-de-derecho.component';

describe('PagodederechoComponent', () => {
  let component: PagodederechoComponent;
  let fixture: ComponentFixture<PagodederechoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagodederechoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PagodederechoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
