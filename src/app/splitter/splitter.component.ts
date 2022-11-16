import { Component, OnInit } from "@angular/core";
import { Participant } from "../classes/participant";

@Component({
  selector: "app-splitter",
  templateUrl: `splitter.component.html`,
  styleUrls: [
    '../shared/message-head.component.css'
  ]
})
export class SplitterComponent implements OnInit {
  
  importDatas!: string;
  importDate!: string;

  participantsList!: Array<Participant>;
  winnersList: Array<Participant> = [];
  dispatcher!: Participant;

  repartitionsList!: Array<Participant>[];

  totalJackpot: number = 0;
  jackpotList: Array<number> = [0, 0, 0];

  
  constructor() {}

  ngOnInit(): void {
    this.importDate = new Date(Date.now()).toISOString().split('T')[0];
    console.log(Date.now());
    console.log(this.importDate);
  }

  
  onSubmitImportForm() {
  
    const finalRepartition = [0.5, 0.3, 0.2];
    const regex = new RegExp(
      "^(.+)\\s+:?([0-9]+)(\\s*\\(\\s?auto\\s?\\){1})?$"
    );

    let elements = this.importDatas.trim().split("\n");
    this.participantsList = [];
    
    // import datas into participantsList
    for (let element of elements) {
      let line = regex.exec(element.trim());
      if (
        line &&
        line[1] &&
        line[2] &&
        line[1].trim().toLowerCase() !== "total"
      ) {
        this.participantsList.push(
          new Participant(
            line[1].trim(),
            parseInt(line[2]),
            line[3] !== undefined
          )
        );
      } else {
        console.log("Ligne non extraite : " + element);
      }
    }

    // alphabetic sort
    this.participantsList.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });

    // jackpot repartition
    this.totalJackpot = this.participantsList
      .map((item) => item.donation)
      .reduce((prev, curr) => prev + curr, 0);
    this.jackpotList = finalRepartition.map((x) =>
      Math.round(x * this.totalJackpot)
    );
    //adjust last value to repair round problems
    this.jackpotList[2] =
      this.totalJackpot - this.jackpotList[0] - this.jackpotList[1];

  }

  onSubmitConfigForm(data: any) {

    let emptyParticipant = new Participant("Empty", 0, false);
    let participantsListCopy = [...this.participantsList];

    let workList = new Map(
      this.participantsList
        .sort((a, b) => b.donation - a.donation)
        .map((key) => [key.name, key])
    );
  
    this.winnersList = [
      workList.get(data.winnerGold) ?? emptyParticipant,
      workList.get(data.winnerSilver) ?? emptyParticipant,
      workList.get(data.winnerBronze) ?? emptyParticipant,
    ];
    this.repartitionsList = [
      [workList.get(data.winnerSilver) ?? emptyParticipant],
      [workList.get(data.winnerBronze) ?? emptyParticipant],
      [workList.get(data.winnerGold) ?? emptyParticipant],
    ];
    this.dispatcher = workList.get(data.dispatcher) ?? emptyParticipant;

    workList.delete(data.winnerGold);
    workList.delete(data.winnerSilver);
    workList.delete(data.winnerBronze);
    workList.delete(data.dispatcher);

     //repartition
    let sum = 0;
    for (let n = 0; n <= 2; n++) {
      sum = this.repartitionsList[n][0].donation;

      for (let [cle, val] of workList) {
        if (sum + val.donation <= this.jackpotList[n]) {
          sum += val.donation;
          this.repartitionsList[n].push(val);
          workList.delete(cle);
        }
      }
      
      //add dispatcher
      this.repartitionsList[n].push(
        new Participant(
          this.dispatcher.name,
          this.jackpotList[n] - sum,
          this.dispatcher.isAuto
        )
      );
     
    }
    this.participantsList = [...participantsListCopy];
  }

  onSubmitTestImportForm(){
    this.importDatas = "Promesses de dons (Nom suivi de pf, suivi de '(auto)' si vous voulez un report automatique):\n\nMagicHannibal 40 (auto)\nBelli 1er le croquant 40\nbullitt666 30 (auto)\nSamneveu 250\nFred le Pillard 200\njaydeeya 100 (auto)\nWaidmann 100 (auto)\nLepilou 100\nChuck 200\nRumsteck 100 (auto)\nAstellan 50 (auto)\nClément le Destructeur 100 (auto)\nKarel Alchimiste 60 (auto)\nHonorius 666 le Chasseur 85 (auto)";
    this.onSubmitImportForm();
  }
}
