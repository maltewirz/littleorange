import React from 'react';
import PropTypes from 'prop-types';
import Question from '../components/question';
import QuestionCount from '../components/questioncount';

function Quiz(props) {
    console.log("porps in quiz", props);

    return (
        <div className="quiz">
            <QuestionCount
                counter={props.questionId}
                total={props.questionTotal}
            />
            <Question
                question={props.question}
                checked={props.checked}
            />
        </div>
    );
}

Quiz.propTypes = {
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  checked: PropTypes.func.isRequired
};

export default Quiz;
