import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomPeriodPipe } from "./custom-period.pipe";
import { CopyToClipboardDirective } from "./copy-to-clipboard.directive";
import { ShadowContainerDirective } from './shadow-container.directive';

@NgModule({
  declarations: [
    CustomPeriodPipe,
    CopyToClipboardDirective,
    ShadowContainerDirective,
  ],
  imports: [CommonModule],
  exports: [
    CustomPeriodPipe,
    CopyToClipboardDirective,
    ShadowContainerDirective
  ],
})
export class SharedModule {}
