import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { HttpClientModule } from '@angular/common/http';

const documentList = {
  documentosSeleccionados: [{
            "id": 1,
            "name": "Escrito libre a la aduana",
            "checked": false
        },
        {
            "id": 2,
            "name": "Manifesto",
            "checked": true
        },
        {
            "id": 3,
            "name": "ID Official",
            "checked": false
        }],
};
describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      imports: [HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
