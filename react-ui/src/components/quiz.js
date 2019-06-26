import React from 'react';
import PropTypes from 'prop-types';
import Question from '../components/question';
import QuestionCount from '../components/questioncount';

function Quiz(props) {
    // console.log("props in quiz", props);

    return (
        <div className="quiz">
            <QuestionCount
                counter={props.counter}
                total={props.questionTotal}
            />
            <Question
                question={props.question}
                stateBox={props.stateBox}
                boxChecked={props.boxChecked}
                nextQuestion={props.nextQuestion}
            />
        </div>
    );
}

Quiz.propTypes = {
    counter: PropTypes.number.isRequired,
    questionTotal: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    stateBox: PropTypes.bool.isRequired,
    boxChecked: PropTypes.func.isRequired,
    nextQuestion: PropTypes.func.isRequired
};

export default Quiz;
