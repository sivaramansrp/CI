import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarsFabricanteComponent } from './agregars-fabricante.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AgregarsFabricanteComponent', () => {
  let component: AgregarsFabricanteComponent;
  let fixture: ComponentFixture<AgregarsFabricanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarsFabricanteComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarsFabricanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
