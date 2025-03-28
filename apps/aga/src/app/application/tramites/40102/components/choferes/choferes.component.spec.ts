import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { ChoferesComponent } from './choferes.component';

describe('ChoferesComponent', () => {
  let component: ChoferesComponent;
  let fixture: ComponentFixture<ChoferesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        ToastrModule.forRoot(), 
        ChoferesComponent 
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChoferesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});