import { Component, OnInit, DoCheck, KeyValueDiffers, KeyValueDiffer } from '@angular/core';
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
import {DEFAULT_QUIZ} from '../../../mocks/quiz-list.mock';


@Component({
  selector: 'app-quiz-result-display',
  templateUrl: './quiz-result-display.component.html',
  styleUrls: ['./quiz-result-display.component.scss']
})
export class QuizResultDisplayComponent implements OnInit, DoCheck {
  constructor(private datePipe: DatePipe, private route: ActivatedRoute , private evolutionService: EvolutionService, private quizService: QuizService, private location: Location,
              private differs: KeyValueDiffers) {
    this.differ = this.differs.find(this.searchedQuiz).create();
  }
  // private test: CanvasJS.Chart;
  private chart: Chart;

  idPatient: number;
  evolTab: Evolution[] = [];
  quizEvolutionGrouped = [{id: 0, quizNom: '', suit: []}];
  title = 'Résultat de tous les quizs';
  differ: KeyValueDiffer<string, any>;

  quiz: Quiz;
  chartType = 'line';
  searchedQuiz: Quiz = DEFAULT_QUIZ;


  ngDoCheck() {
    const change = this.differ.diff(this.searchedQuiz);
    if (change) {
      const searchedResult = [];
      console.log(this.searchedQuiz.label);
      console.log(this.searchedQuiz.label.length);
      if (this.searchedQuiz.label.length > 0) {
        this.quizEvolutionGrouped.forEach(_ => {
          if (_.quizNom.includes(this.searchedQuiz.label)) {searchedResult.push(_); }
        });
        this.buildChart(searchedResult);
      } else {
        this.buildChart(this.quizEvolutionGrouped);
      }
      /*change.forEachChangedItem(item => {
        console.log('item changed', item);
      });*/
    }
  }

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
      this.evolTab = res;
      // this.reverseArr(this.evolTab);
      this.groupByQuizEvolution();
      this.buildChart(this.quizEvolutionGrouped);
    } );
  }
  buildChart(quizEvolutionGrouped) {
    const dataSet = [];
    const labels = [];
    for (let i = 1; i < quizEvolutionGrouped.length; i++) {
      const data = [];
      const label = quizEvolutionGrouped[i].quizNom + '(' + quizEvolutionGrouped[i].suit.length + ')';
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < quizEvolutionGrouped[i].suit.length; j++) {
        data.push({
          x: new Date(quizEvolutionGrouped[i].suit[j].dateCreation),
          y: quizEvolutionGrouped[i].suit[j].succesRate
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

    this.chart = new Chart('lineChart', {
      data: dataSet,
      animationEnabled: true,
      title: {
        text: 'Nombre de jeu de quiz total éffectué: ' + this.evolTab.length
      },
      axisX: {
        valueFormatString: 'DD MMM,YY '
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

}
