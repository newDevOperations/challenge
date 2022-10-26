import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomPeriodPipe } from "./custom-period.pipe";

@NgModule({
  declarations: [CustomPeriodPipe],
  imports: [CommonModule],
  exports: [CustomPeriodPipe],
})
export class SharedModule {}
