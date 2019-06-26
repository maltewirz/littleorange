import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Bogen } from './bogen';
import Quiz from './components/quiz';
import questionData from './api/questiondata';

export function App() {

    const [counter, setCounter] = useState(0);
    const [questionId, setQuestionId] = useState(1);
    const [question, setQuestion] = useState("");
    const [answerOptions, setAnswerOptions] = useState([]);
    const [answer, setAnswer] = useState("");
    const [answersCount, setAnswersCount] = useState({});
    const [results, setStateResults] = useState("");

    useEffect(()=> {
        setQuestion(questionData[0].question);
        setAnswerOptions(questionData[0].answers);
    },[]);

    function onBoxSelected(event) {
        if (event.target.checked === true) {
            console.log("checked true");
        }
    }

    function setNextQuestion() {
        console.log("here");
    }


    return (
        <BrowserRouter>
            <div className="App">
                <div className="header">
                    <Link to="/"> Start </Link>
                    <Link to="/question"> Question </Link>
                    <Link to="/bogen"> bogen </Link>
                    <a href="/logout"> Logout </a>
                </div>

                <div className="content">
                    <Quiz
                        questionId={questionId}
                        question={question}
                        questionTotal={questionData.length}
                        boxChecked={onBoxSelected}
                        nextQuestion={setNextQuestion}
                    />

                    <Route path="/bogen" component={Bogen} />
                </div>
            </div>
        </BrowserRouter>
    );
}
