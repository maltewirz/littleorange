import React, { useEffect, useState } from 'react';
// import axios from "./axios";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Bogen } from './bogen';
import Question from './components/question';
import questionData from './api/questiondata';

export function App() {

    const [counter, setCounter] = useState(1);
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
                    <Question
                        content="Sample Question"
                    />

                    <Route path="/bogen" component={Bogen} />
                </div>
            </div>
        </BrowserRouter>
    );
}
