import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';

@Component({
    selector: 'my-app-simpledialog',
    templateUrl: './simpledialog.component.html',
    styleUrls: ['./simpledialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatButtonModule,
        MatDialogClose,
    ],
})
export class SimpledialogComponent {}
