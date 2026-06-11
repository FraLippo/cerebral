
import React, { Component } from 'react';
import { verifierStatus } from '../commun/utilitaire';
import { Button } from 'antd';
import CompteRebours from '../commun/CompteRebours';
import './culture.css'

export default class JeuCulture extends Component {

    constructor() {
        super();
        this.qcm = [];
        this.lesQuestions = [];

        this.state =
        {
            question: '',
            reponses: [],
            isImg: false,
            isDisplayedExplication: false,
            explication: '',
            afficheCompteRebours: false,
            tempsQuestion: 0
        }
        this.fin = false;
        this.noQuestion = 0;
    }


    async componentDidMount() {
        let url = new URL(process.env.REACT_APP_URL_QUESTIONQCM);
        const reponse = await fetch(url);
        if (!verifierStatus(reponse.status)) {
            return;
        }
        if (reponse.ok) {
            const reponseJSON = await reponse.json();
            this.lesQuestions = reponseJSON.questions.lesQuestions;
            this.nouvelleQuestion();
        }
        else {
            alert("Désolé, il y a un problème.")
            window.location.href = "/"
        }
    }

    nouvelleQuestion = () => {

        this.fin = false;
        console.log(this.lesQuestions)
        if (this.noQuestion >= this.lesQuestions.length) {
            //console.log(this.noQuestion);
            //if (this.noQuestion >= 2) {
            console.log('fin');
        }
        else {

            let explication = this.lesQuestions[this.noQuestion].explication || '';
            let reponses = [];
            let question = this.lesQuestions[this.noQuestion].enonce;
            let temps = 3 + Math.ceil(question.length / 10);

            let isImg = this.lesQuestions[this.noQuestion].isImg;


            for (var i = 0; i < this.lesQuestions[this.noQuestion].lesReponses.length; i++) {
                var item = this.lesQuestions[this.noQuestion].lesReponses[i];

                reponses.push(item);

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            this.setState({
                noQuestion: this.noQuestion,
                question,
                reponses,
                explication,
                isImg,
                isDisplayedExplication: false,
                afficheCompteRebours: true,
                tempsQuestion : temps

            });
            this.noQuestion++;
        }
    }

    selectionnerReponse(index) {
        if (this.fin) return;
        let nouveauReponses = [...this.state.reponses];

        if (index !== -1 && nouveauReponses[index].valide) {
            nouveauReponses[index].classe = 'correct pouce';
            this.score++;

        }
        else {
            if (index !== -1) {
                nouveauReponses[index].classe = 'incorrect';
            }
            let indexBonneReponse = this.state.reponses.findIndex(x => x.valide);
            if (indexBonneReponse != -1) {
                nouveauReponses[indexBonneReponse].classe = 'correct';
            }
        }
        this.setState({
            reponses: nouveauReponses,
            afficheCompteRebours: false
        })
        if (this.state.explication == null || this.state.explication === '') {
            this.fin = true;
            setTimeout(this.nouvelleQuestion, 2300);
        }
        else {
            this.fin = true;
            setTimeout(() => {
                this.setState({
                    isDisplayedExplication: true

                });

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });

            }, 1000);

        }



    }
    questionSuivante = () => {

        this.nouvelleQuestion();

    }

    finTimer = () => {
        this.selectionnerReponse(-1);
    }




    render() {
        return <React.Fragment>
            <div className='quiz-plateau'>
                <div className="quiz-container">
                    {this.state.isDisplayedExplication &&
                        <div className="quiz-explanation">
                            <p className="centre">Commentaire</p>
                            <div>
                                <p style={{ whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{ __html: this.state.explication }}></p>
                                <div className="centre"> <Button type="primary" onClick={this.questionSuivante}>Question suivante</Button></div>
                            </div>
                        </div>}

                    <div className="quiz-header ">

                        <div dangerouslySetInnerHTML={{ __html: this.state.question }}></div>


                    </div>
                </div>
                <div className="quiz-body">
                    <div className={this.state.isImg ? 'quiz-repimages' : 'quiz-reponses'}>
                        {this.state.reponses.map((element, index) =>
                            <div key={index} className={`quiz-reponse ${element.classe ?? ''} ${this.state.isImg ? 'repimage' : ''}`} onClick={() => this.selectionnerReponse(index)}  dangerouslySetInnerHTML={{ __html:element.enonce }}></div>
                        )}
                    </div>

                    {/* <div v-for="(reponse, index) in reponses"
                                 :key="index"
                                     :className="['quiz-reponse', reponse.classNamee,  { 'text-center': istruefalse, 'repimage' : isImg } ]"
                                 @@click="selectionnerReponse(index)"
                                     v-html="reponse.enonce">
                          
                            </div> */}

                </div>
                <div className='centre'>{this.state.afficheCompteRebours && <CompteRebours finTimer={this.finTimer} temps={this.state.tempsQuestion}></CompteRebours>}</div>
                <div>Question : {this.state.noQuestion + 1} / 10 </div>
            </div>


        </React.Fragment>
    }
}