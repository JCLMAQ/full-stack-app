import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'my-app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss'],
    standalone: true,
    imports: [MatButtonModule],
})
export class PageNotFoundComponent {}
