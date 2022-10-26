export class Participant {
    name: string;
    donation: number;
    isAuto: boolean;

    constructor(name: string, donation: number, isAuto: boolean) {
        this.name = name;
        this.donation = donation;
        this.isAuto = isAuto;
    }
}
