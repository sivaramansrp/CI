import { Component } from '@angular/core';
import pkg from '@package-json';
@Component({
  selector: 'c-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
version = pkg.version;
}
