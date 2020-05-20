import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Evolution} from '../../../models/evolution.model';
import {EvolutionService} from '../../../services/evolution.service';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {DatePipe, Location} from '@angular/common';
import {Chart} from 'chart.js';
import {QuestionPlayed} from '../../../models/questionPlayed.model';
// import * as CanvasJS from 'canvasjs';

@Component({
  selector: 'app-quiz-result-display',
  templateUrl: './quiz-result-display.component.html',
  styleUrls: ['./quiz-result-display.component.scss']
})
export class QuizResultDisplayComponent implements OnInit {
  // private test: CanvasJS.Chart;
  constructor(private datePipe: DatePipe, private route: ActivatedRoute , private evolutionService: EvolutionService, private quizService: QuizService, private location: Location) { }

  LineChart: Chart;
  idPatient: number;
  evolTab: Evolution[] = [];
  quizEvolutionGrouped = [{id: 0, quizNom: '', suit: []}];
  title = 'Résultat de tous les quizs';
  public quiz: Quiz;
  public  nbEssai = 0;

  public chartType = 'line';

  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  ];

  public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  ngOnInit() {
    this.idPatient = +this.route.snapshot.params.id;
    console.log(this.idPatient);
    this.evolutionService.getEvolutionByPatientId(this.idPatient).subscribe((res) => {
      console.log(res);
      this.evolTab = res;
      // this.reverseArr(this.evolTab);
      this.groupByQuizEvolution();
      this.buildChart();
    } );
  }
  toggleDataSeries(e) {
    if (typeof(e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    // this.test.render();
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
          y: this.quizEvolutionGrouped[i].suit[j].succesRate});
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
    /*this.test = new CanvasJS.Chart('lineChart', {
      data: dataSet,
      animationEnabled: true,
      title: {
        text: 'Statistiques'
      },
      axisX: {
        valueFormatString: 'DD MMM,YY'
      },
      axisY: {
        title: 'Nomnres de contenaire',
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
*/
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels,
        datasets: dataSet
      },
      options: {
        title: {
          text: 'Line Chart',
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

  }
  public back() {
    this.location.back();
  }

  reverseArr(input) {
    const reverseEvolTab: Evolution[] = [];

    for (let i = input.length - 1; i >= 0; i--) {
      reverseEvolTab.push(input[i]);
    }
    this.evolTab = reverseEvolTab;
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
