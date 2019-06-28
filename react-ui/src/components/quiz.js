import React from 'react';
import PropTypes from 'prop-types';
import Question from '../components/question';
import QuestionCount from '../components/questioncount';
import { Button} from 'react-bootstrap';

function Quiz(props) {
    // console.log("props in quiz", props);

    return (
        <div className="quiz">
            <h5><QuestionCount
                counter={props.counter}
                total={props.questionTotal}
            /></h5>
            <Question
                question={props.question}
                stateBox={props.stateBox}
                boxChecked={props.boxChecked}
                nextQuestion={props.nextQuestion}
            />
            <p>
            <Button variant="warning"
                onClick={props.nextQuestion}
            > Next </Button>
            </p>
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
