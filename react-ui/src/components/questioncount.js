import React from 'react';
import PropTypes from 'prop-types';

function QuestionCount(props) {
    console.log("questionscount counter", props.counter);
    return (
        <div className="questionCount">
            Question <span>{props.counter}</span> of <span>{props.total}</span>
        </div>
    );
}

QuestionCount.propTpes = {
    counter: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};

export default QuestionCount;