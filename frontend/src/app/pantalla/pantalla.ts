import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pantalla',
  template: `
    <section>
      <h1>{{ titulo }}</h1>
      <p>{{ descripcion }}</p>
    </section>
  `,
})
export class Pantalla {
  private readonly route = inject(ActivatedRoute);
  protected readonly titulo = this.route.snapshot.data['titulo'] as string;
  protected readonly descripcion = this.route.snapshot.data['descripcion'] as string;
}
