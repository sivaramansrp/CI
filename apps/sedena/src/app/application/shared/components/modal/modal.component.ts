import { CommonModule } from '@angular/common';
import {
  Component,
  ComponentRef,
  OnDestroy,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ModalModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnDestroy {
  @ViewChild('modal', { static: false }) modal?: ModalDirective;
  @ViewChild('dynamicComponentContainer', {
    read: ViewContainerRef,
    static: true,
  })
  container!: ViewContainerRef;

  /**
   * se encarga de mostrar el modal
   */
  public mostrarModal: boolean = false;
  private componentRef?: ComponentRef<any>;

  loadComponent(component: Type<any>, data?: any): void {
    this.container.clear();
    this.componentRef = this.container.createComponent(component);

    if (data && this.componentRef.instance) {
      Object.assign(this.componentRef.instance, data);
    }
  }
  abrir(component: Type<any>, inputs?: Record<string, any>): void {
    this.container.clear();
    this.componentRef = this.container.createComponent(component);

    if (inputs) {
      Object.assign(this.componentRef.instance, inputs);
    }

    if ((this.componentRef.instance as any).cerrar?.subscribe) {
      (this.componentRef.instance as any).cerrar.subscribe(() => this.cerrar());
    }

    this.modal?.show();
  }

  cerrar(): void {
    this.modal?.hide();
    this.container.clear();
    this.componentRef?.destroy();
  }
  ngOnDestroy(): void {
    this.componentRef?.destroy();
  }
}
