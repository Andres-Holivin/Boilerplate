import { Component, ViewEncapsulation } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LoadingComponent {

}
