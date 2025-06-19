import { AgregarComplimentosComponent } from './agregar-complimentos.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AgregarComplimentosComponent', () => {
  let component: AgregarComplimentosComponent;
  let fixture: ComponentFixture<AgregarComplimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarComplimentosComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarComplimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
