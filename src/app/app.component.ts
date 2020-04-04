import { Component } from '@angular/core';
import * as region_data from 'src/assets/region_cas.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  private region_data: any=(region_data as any).default;

}
