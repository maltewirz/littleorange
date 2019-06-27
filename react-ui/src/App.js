import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';
import { Bogen } from './bogen';
import Quiz from './components/quiz';
import Result from './components/result';
import questionData from './api/questiondata';
import { Nav, Navbar } from 'react-bootstrap';

export function App() {

    const [questionId, setQuestionId] = useState(0);
    const [counter, setCounter] = useState(1);
    const [boxStateValue, setBoxStateValue] = useState(false);
    const [resultCache, setResultCache] = useState({});
    const [finalResultPoints, setFinalResultPoints] = useState(0);
    const [advice, setAdvice] = useState("");
    const [finalResultTopics, setFinalResultTopics] = useState(0);

    useEffect(() => {
        if (counter  === questionData.length + 1) {
            getFinalResults();
        }
    },[counter])

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
            setAdvice("Keine")
        } else if (points <= 2) {
            setAdvice("geringe")
        } else if (points <= 4) {
            setAdvice("mittlere")
        } else if (points > 4) {
            setAdvice("hohe")
        }

        setFinalResultPoints(points);
        setFinalResultTopics(resultTopics);
    }

    function setNextQuestion() {
        if (boxStateValue === true) {
            setResultCache({
                ...resultCache,
                [questionData[questionId].question]: questionData[questionId].points
            });
        }

        if (questionId !== questionData.length -1 ) {
            setQuestionId(questionId + 1);
            setCounter(counter + 1);
            setBoxStateValue(false);
        } else {
            setCounter(questionData.length + 1)
        }
    }

    function renderQuiz() {
        return(
            <Quiz
                counter={counter}
                question={questionData[questionId].question}
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
                quizResultAdvice={advice}
            />
        );
    }

    return (
        <BrowserRouter>
            <div className="App">
                <div className="header">
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand  as={NavLink} to="/">Home</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link as={NavLink} to="/question">Question</Nav.Link>
                            <Nav.Link as={NavLink} to="/bogen">Test</Nav.Link>
                            <Nav.Link href="/logout">Logout</Nav.Link>
                        </Nav>
                    </Navbar>
                </div>

                <div className="content">
                    <Route path="/question" render={() => (
                        finalResultPoints ? renderResult() : renderQuiz()
                    )} />
                    <Route path="/bogen" component={Bogen} />
                </div>
            </div>
        </BrowserRouter>
    );
}
