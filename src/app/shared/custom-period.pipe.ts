import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPeriod'
})
export class CustomPeriodPipe implements PipeTransform {

 
  transform(importDate: string, mult: number, short: boolean): string {
   
   let startOfPeriod = new Date(importDate);
   let endPeriod = new Date(importDate);
  
   startOfPeriod.setDate(startOfPeriod.getDate() + 14 * mult);
   endPeriod.setDate(endPeriod.getDate() + 14 * mult + 14);
   
   if (short) {
    return startOfPeriod.toLocaleDateString() + " au " + endPeriod.toLocaleDateString();
   }
   else{
    return startOfPeriod.toLocaleDateString() + " 20h00 au " + endPeriod.toLocaleDateString() + " 20h00";
   }
  }

}
