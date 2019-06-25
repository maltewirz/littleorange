import React, { useEffect, useState } from 'react';
import axios from "./axios";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {Bogen} from './bogen';
import Question from './components/question';
import Quiz from './components/quiz';
import quizQuestions from './api/quizquestions';

export function App() {

    const [counter, setCounter] = useState(0);
    const [questionId, setQuestionId] = useState(1);
    const [question, setQuestion] = useState("");
    const [answerOptions, setAnswerOptions] = useState([]);
    const [answer, setAnswer] = useState("");
    const [answersCount, setAnswersCount] = useState({});
    const [results, setStateResults] = useState("");

    useEffect(()=> {
        // console.log("here", quizQuestions);
        // console.log("answer",quizQuestions[0].answers);
        setQuestion(quizQuestions[0].question);
        setAnswerOptions(quizQuestions[0].answers);
    },[]);

    function handleAnswerSelected(event) {
        setUserAnswer(event.currentTarget.value);
        if (questionId < quizQuestions.length) {
            setTimeout(() => setNextQuestion(), 300);
        } else {
            setTimeout(() => setResults(getResults()), 300);
        }
    }

    function setResults(result) {
        if (result.length === 1) {
            setStateResults(result[0]);
        } else {
            setStateResults("Undetermined");
        }
    }

    function getResults() {
        // console.log("answer count",answersCount);
        // console.log("anser", answer);
        // console.log("keys",Object.keys(answer));
        const answersCountKeys = Object.keys(answersCount);
        const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
        const maxAnswerCount = Math.max.apply(null, answersCountValues);
        return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
    }

    function setUserAnswer(answer) {
        setAnswersCount(() => {
            return {
                ...answersCount,
                [answer]: (answersCount[answer] || 0) + 1
            };
        });
        setAnswer(answer);
    }

    function setNextQuestion() {
        setCounter(counter + 1);
        setQuestionId(questionId + 1);
        setQuestion(quizQuestions[counter].question);
        setAnswerOptions(quizQuestions[counter].answers);
        setAnswer("");
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
                    <Route path="/question" render={() => (
                        <Question content="Fav food" />
                    )} />
                    <Quiz
                        answer={answer}
                        answerOptions={answerOptions}
                        questionId={questionId}
                        question={question}
                        questionTotal={quizQuestions.length}
                        onAnswerSelected={handleAnswerSelected}
                    />
                    <Route path="/bogen" component={Bogen} />
                </div>
            </div>
        </BrowserRouter>
    );
}
