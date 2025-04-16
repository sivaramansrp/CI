import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LugarDeDestinoComponent } from './lugar-de-destino.component';

describe('LugarDeDestinoComponent', () => {
  let component: LugarDeDestinoComponent;
  let fixture: ComponentFixture<LugarDeDestinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LugarDeDestinoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LugarDeDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
