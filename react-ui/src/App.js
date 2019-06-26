import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Bogen } from './bogen';
import Quiz from './components/quiz';
import Result from './components/result';
import questionData from './api/questiondata';

export function App() {

    const [questionId, setQuestionId] = useState(0);
    const [counter, setCounter] = useState(1);
    const [question, setQuestion] = useState("");
    const [boxStateValue, setBoxStateValue] = useState(false);
    const [resultCache, setResultCache] = useState({});
    const [finalResultPoints, setFinalResultPoints] = useState(0);
    // const [advice, setAdvice] = useState("");
    const [finalResultTopics, setFinalResultTopics] = useState(0);

    useEffect(()=> {
        setQuestion(questionData[0].question);
    },[]);
    // console.log("resultCache",resultCache);

    useEffect(() => {
        // console.log("running new useffect");
        // console.log("questionId",questionId);
        // console.log("questionData.length", questionData.length);
        if (counter  === questionData.length + 1) {
            console.log("resultCache Label 2", resultCache);
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
            console.log("keine");
        } else if (points <= 2) {
            console.log("geringe");
        } else if (points <= 4) {
            console.log("mittlere");
        } else if (points > 4) {
            console.log("hohe");
        }

        setFinalResultPoints(points);
        setFinalResultTopics(resultTopics);
    }

    // console.log("questionId", questionId);
    // console.log("counter", counter);
    // console.log("resultCache Label 1",resultCache);
    function setNextQuestion() {
        //it isnt added yet or it has not been added
        console.log("questionId + counter", questionId, counter);
        if (boxStateValue === true) {
            // console.log("here points",questionData[questionId].points);
            // console.log("here questions",questionData[questionId].question);
            setResultCache({
                ...resultCache,
                [questionData[questionId].question]: questionData[questionId].points
                // console.log("resultCache heeeee", {
                //     ...resultCache,
                //     [questionData[questionId].question]: questionData[questionId].points
                // });


            });
        }

        if (questionId !== questionData.length -1 ) {
            // console.log("heeeeeeeeeeee");
            setQuestionId(questionId + 1);
            setCounter(counter + 1);
            setQuestion(questionData[questionId].question);
            setBoxStateValue(false);
        } else {
            console.log("string");
            setCounter(questionData.length + 1)
        }


        // console.log("questionId", questionId);
        // console.log("questionData.length", questionData.length);

    }

    // function setNextQuestion() {
    //     //it isnt added yet or it has not been added
    //     console.log("questionId beginning of setnextwquestion", questionId);
    //     console.log("questionData.length", questionData.length);
    //
    //     if (questionId === questionData.length) {
    //         console.log("resultCache", resultCache);
    //         getFinalResults();
    //     } else {
    //         if (boxStateValue === true) {
    //             setResultCache(() => {
    //                 return {
    //                     ...resultCache,
    //                     [question]: questionData[questionId].points
    //                 };
    //             });
    //         }
    //
    //         setQuestionId(questionId + 1);
    //         setQuestion(questionData[questionId].question);
    //         setBoxStateValue(false);
    //     }
    // }


    // function setNextQuestion() {
    //     function setttingResultCache() {
    //         if (boxStateValue === true) {
    //             console.log("cache here", questionData[questionId].question);
    //             setResultCache(() => {
    //                 return {
    //                     ...resultCache,
    //                     [question]: questionData[questionId].points
    //                 };
    //             });
    //             console.log("arriving here?");
    //         }
    //     }
    //
    //     if (questionId === questionData.length) {
    //         setttingResultCache()
    //         getFinalResults();
    //     } else {
    //         console.log("or there?");
    //         setttingResultCache()
    //         setQuestion(questionData[questionId].question);
    //         setQuestionId(questionId + 1);
    //         setBoxStateValue(false);
    //     }
    // }



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
            />
        );
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
                        finalResultPoints ? renderResult() : renderQuiz()
                    )} />
                    <Route path="/bogen" component={Bogen} />
                </div>
            </div>
        </BrowserRouter>
    );
}
