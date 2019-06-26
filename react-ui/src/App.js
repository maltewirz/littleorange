import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Bogen } from './bogen';
import Quiz from './components/quiz';
import questionData from './api/questiondata';

export function App() {

    const [questionId, setQuestionId] = useState(1);
    const [question, setQuestion] = useState("");
    // const [answerOptions, setAnswerOptions] = useState([]);
    // const [answer, setAnswer] = useState("");
    // const [answersCount, setAnswersCount] = useState({});
    const [boxStateValue, setBoxStateValue] = useState(false);
    const [results, setResults] = useState({});

    useEffect(()=> {
        setQuestion(questionData[0].question);
    },[]);

    function onBoxSelected(event) {
        if (event.target.checked === true) {
            setBoxStateValue(true);
        } else {
            setBoxStateValue(false);
        }
    }

    function setNextQuestion() {
        if (boxStateValue === true) {
            setResults(() => {
                return {
                    ...results,
                    [question]: "test"
                };
            });
        }
        setQuestionId(questionId + 1);
        setQuestion(questionData[questionId].question);
        setBoxStateValue(false);
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
                        stateBox={boxStateValue}
                        boxChecked={onBoxSelected}
                        nextQuestion={setNextQuestion}
                    />
                    <Route path="/bogen" component={Bogen} />
                </div>
            </div>
        </BrowserRouter>
    );
}
