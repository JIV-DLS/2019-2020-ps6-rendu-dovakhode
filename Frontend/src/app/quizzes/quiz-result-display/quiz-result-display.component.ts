import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Evolution} from '../../../models/evolution.model';
import {EvolutionService} from '../../../services/evolution.service';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {DatePipe, Location} from '@angular/common';
import * as CanvasJS from '../../canvasjs/canvasjs.min';
// import * as CanvasJS from './canvasjs.min';
// import {Chart} from 'canvasjs';
// import {Chart} from 'chart.js';
import {Chart} from '../../canvasjs/canvasjs.min';
import {QuestionPlayed} from '../../../models/questionPlayed.model';


@Component({
  selector: 'app-quiz-result-display',
  templateUrl: './quiz-result-display.component.html',
  styleUrls: ['./quiz-result-display.component.scss']
})
export class QuizResultDisplayComponent implements OnInit {
  constructor(private datePipe: DatePipe, private route: ActivatedRoute , private evolutionService: EvolutionService, private quizService: QuizService, private location: Location) { }
  // private test: CanvasJS.Chart;
  private chart: Chart;

  idPatient: number;
  evolTab: Evolution[] = [];
  quizEvolutionGrouped = [{id: 0, quizNom: '', suit: []}];
  title = 'Résultat de tous les quizs';
  public quiz: Quiz;

  public chartType = 'line';
  private toggleDataSeries =  (e) => {
    if (typeof(e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }

  ngOnInit() {
    this.idPatient = +this.route.snapshot.params.id;
    // console.log(this.idPatient);
    this.evolutionService.getEvolutionByPatientId(this.idPatient).subscribe((res) => {
      console.log(res);
      this.evolTab = res;
      // this.reverseArr(this.evolTab);
      this.groupByQuizEvolution();
      this.buildChart();
    } );
  }
  buildChart() {
    const dataSet = [];
    const labels = [];
    for (let i = 1; i < this.quizEvolutionGrouped.length; i++) {
      const data = [];
      const label = this.quizEvolutionGrouped[i].quizNom;
      const borderColor = this.randomRGBA(this.quizEvolutionGrouped[i].id);
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < this.quizEvolutionGrouped[i].suit.length; j++) {
        data.push({
          x: new Date(this.quizEvolutionGrouped[i].suit[j].dateCreation),
          y: this.quizEvolutionGrouped[i].suit[j].succesRate
        });
        // labels.push(this.datePipe.transform(this.quizEvolutionGrouped[i].suit[j].dateCreation,'yyyy-MM-dd') );
      }
      dataSet.push({
        name: label,
        dataPoints: data,
        type: 'spline',
        yValueFormatString: '#0.## ',
        showInLegend: true
      });
    }

    console.log(this.quizEvolutionGrouped);
    console.log(dataSet);
    this.chart = new Chart('lineChart', {
      data: dataSet,
      animationEnabled: true,
      title: {
        text: 'Nombre de jeu de quiz total éffectué: ' + this.evolTab.length
      },
      axisX: {
        valueFormatString: 'DD MMM,YY HH-MM'
      },
      axisY: {
        title: 'Pourcentage de réussite des quizs',
        includeZero: false,
        suffix: ' '
      },
      legend: {
        cursor: 'pointer',
        fontSize: 16,
        itemclick: this.toggleDataSeries
      },
      toolTip: {
        shared: true
      }
    });
    this.chart.render();
  }
  public back() {
    this.location.back();
  }

  FirstTrialSucceed(evol: Evolution) {
    let nb = 0;
    // tslint:disable-next-line:prefer-const
    let arrayQues: number[] = [];
    for (const el of evol.questionPlayed) {
      if (el.trials <= 1 && arrayQues.includes(el.idQuestion) === false ) {
        nb = nb + 1;
        arrayQues.push(el.idQuestion);
      }
      arrayQues.push(el.idQuestion);
    }
    return nb;
  }
  groupByQuizEvolution() {
    console.log(this.evolTab);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.evolTab.length; i++) {
      let finded = false;
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < this.quizEvolutionGrouped.length; j++) {
        if (this.quizEvolutionGrouped[j].id === this.evolTab[i].quizId) {
          this.quizEvolutionGrouped[j].suit.push(this.evolTab[i]);
          finded = true;
          break;
        }
      }
      if (!finded) {
        this.quizEvolutionGrouped.push({id: this.evolTab[i].quizId, suit: [], quizNom: this.evolTab[i].quizNom});
        this.quizEvolutionGrouped[this.quizEvolutionGrouped.length - 1].suit.push(this.evolTab[i]);
      }
    }
  }
  randomInt() {
    return Math.round(100);
  }
  randomRGBA(id) {
    // tslint:disable-next-line:one-variable-per-declaration
    const o = Math.round, r = Math.random, s = 255 ;
    id = (id / o(r())) % 200;
    const plus = id % 255;
    const red = ((o(o(r() * s)) - plus) % 100) ;
    const green = ((o(o(r() * s)) + plus) % 155);
    const blue = (o(r() * s) + plus);
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
  }

}
/* private toggleDataSeries: (e) => {
    // tslint:disable-next-line:align
    if(typeof(e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
    e.dataSeries.visible = false;
  } else {
   e.dataSeries.visible = true;
  }
      this.test.render();
  }*/
