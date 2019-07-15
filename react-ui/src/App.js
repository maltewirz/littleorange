import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route,  Link } from 'react-router-dom';
import Quiz from './components/quiz';
import Result from './components/result';
import axios from './axios';
import questionData from './api/questiondata';
import handlungsempfehlungen from './api/handlungsempfehlungen';
import logo from './img/logo_hintergrund.png';
import bogen from './img/bogen_symbol_grau.png';
import doku from './img/doku_symbol_grau.png';
import tipps from './img/tipps_symbol_grau.png';
const resultCache = {};
let reachedResult = false;

export function App() {
    const [question, setQuestion] = useState("");
    const [counter, setCounter] = useState(0);
    const [questionId, setQuestionId] = useState(1);
    const [boxStateValue, setBoxStateValue] = useState(false);
    const [finalResultPoints, setFinalResultPoints] = useState(0);
    const [finalResultTopics, setFinalResultTopics] = useState(0);
    const [level, setLevel] = useState("");
    const [advice, setAdvice] = useState("");

    useEffect(() => {
        (async () => {
          try {
            setQuestion(questionData[0].question)
            let { data } = await axios.get('/api/results');
            console.log("response for get?", data);
            if (data !== "") {
              reachedResult = true;
              setFinalResultPoints(data.final_result_points);
              console.log(data.final_result_topics.substring(1, data.final_result_topics.length-1));
              console.log(typeof data.final_result_topics);
              // for (let e in )
              // setFinalResultTopics(data.final_result_topics); // format as object but expected is ["Unangemessene", "Relevante"]
            }
          } catch (err) {
            console.log("err in post result", err);
          }
        })();

    },[]);

    function onBoxSelected(event) {
        if (event.target.checked === true) {
            setBoxStateValue(true);
        } else {
            setBoxStateValue(false);
        }
    }

    function getFinalResults() {
        const resultTopics = Object.keys(resultCache);
        const resultPoints = Object.values(resultCache);
        let points = 0;
        for (let e in resultPoints) {
            points += resultPoints[e];
        }
        if (points <= 1) {
            setLevel(handlungsempfehlungen[0].level)
            setAdvice(handlungsempfehlungen[0].advice)
        } else if (points <= 2) {
            setLevel(handlungsempfehlungen[1].level)
            setAdvice(handlungsempfehlungen[1].advice)
        } else if (points <= 4) {
            setLevel(handlungsempfehlungen[2].level)
            setAdvice(handlungsempfehlungen[2].advice)
        } else if (points > 4) {
            setLevel(handlungsempfehlungen[3].level)
            setAdvice(handlungsempfehlungen[3].advice)
        }

        setFinalResultPoints(points);
        setFinalResultTopics(resultTopics);
        reachedResult = true;
        (async () => {
          try {
            let { data } = await axios.post('/api/results',
              {"finalResultPoints": points,
              "finalResultTopics": resultTopics
              }
            );
            console.log("success?", data.success);
          } catch (err) {
            console.log("err in post result", err);
          }
        })();
    }

    function setNextQuestion() {
        if (boxStateValue === true) {
            resultCache[question] = questionData[counter].points;
        }

        if (questionId === questionData.length) {
            getFinalResults();
        } else {
            setQuestionId(questionId + 1);
            setQuestion(questionData[counter + 1].question);
            setCounter(counter + 1);
            setBoxStateValue(false);
        }
    }

    function renderQuiz() {
        return(
            <Quiz
                counter={questionId}
                question={question}
                questionTotal={questionData.length}
                stateBox={boxStateValue}
                boxChecked={onBoxSelected}
                nextQuestion={setNextQuestion}
            />
        );
    }

    function renderResult() {
        return (
            <Result
                quizResultPoints={finalResultPoints}
                quizResultTopics={finalResultTopics}
                quizResultLevel={level}
                quizResultAdvice={advice}
            />
        );
    }
    return (
        <BrowserRouter>
            <div className="App">

                <div className="header">
                    <Link to="/" className="menuItem"> <img src={logo} alt="Logo"/> Start </Link>
                    <Link to="/question"className="menuItem"><img src={bogen} alt="Bogen"/> Bogen </Link>
                    <Link to="/doku"className="menuItem"><img src={doku} alt="Doku"/> Doku </Link>
                    <Link to="/tipps"className="menuItem"><img src={tipps} alt="Tipps"/> Tipps </Link>
                    <a href="/logout"className="menuItem"><img src={logo} alt="Logo"/> Logout </a>
                </div>

                <div className="content">

                    <Route path="/question" render={() => (
                        reachedResult ? renderResult() : renderQuiz()
                    )} />
                </div>
            </div>
        </BrowserRouter>
    );
}
