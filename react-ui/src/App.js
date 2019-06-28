import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { Bogen } from './bogen';
import Quiz from './components/quiz';
import Result from './components/result';
import questionData from './api/questiondata';
import handlungsempfehlungen from './api/handlungsempfehlungen';
import { Nav, Navbar } from 'react-bootstrap';

export function App() {

    const [questionId, setQuestionId] = useState(0);
    const [counter, setCounter] = useState(1);
    const [boxStateValue, setBoxStateValue] = useState(false);
    const [resultCache, setResultCache] = useState({});
    const [finalResultPoints, setFinalResultPoints] = useState(0);
    const [level, setLevel] = useState("");
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
                quizResultLevel={level}
                quizResultAdvice={advice}
            />
        );
    }

    return (
        <BrowserRouter>
            <div className="App">
                <div className="header">
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                      <Navbar.Brand  as={NavLink} to="/">Home</Navbar.Brand>
                      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                      <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={NavLink} to="/question">Question</Nav.Link>
                            <Nav.Link as={NavLink} to="/bogen">Test</Nav.Link>
                            <Nav.Link href="/logout">Logout</Nav.Link>
                        </Nav>
                      </Navbar.Collapse>
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
