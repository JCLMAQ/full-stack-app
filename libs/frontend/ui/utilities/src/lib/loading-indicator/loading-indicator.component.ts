import { Component, inject, Signal } from "@angular/core";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { LoadingService } from "./loading-indicator.service";

@Component({
  selector: "loading",
  templateUrl: "./loading-indicator.component.html",
  styleUrls: ["./loading-indicator.component.scss"],
  imports: [MatProgressSpinner],
  standalone: true,
})
export class LoadingIndicatorComponent {

  loading: Signal<boolean>;

  loadingService = inject(LoadingService);

  constructor() {
    this.loading = this.loadingService.loading;
  }

}
