import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarsFacturadorComponent } from './agregars-facturador.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AgregarsFacturadorComponent', () => {
  let component: AgregarsFacturadorComponent;
  let fixture: ComponentFixture<AgregarsFacturadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarsFacturadorComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarsFacturadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
