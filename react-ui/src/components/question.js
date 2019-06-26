import React from 'react';
import PropTypes from 'prop-types';

function Question(props) {
    return (
        <p className="question"> {props.question}
                <input
                    type="checkbox"
                    onChange={props.boxChecked}
                />
                <button
                    onClick={props.nextQuestion}
                > Next </button>
        </p>
    );
}

Question.propTypes = {
    question: PropTypes.string.isRequired,
    boxChecked: PropTypes.func.isRequired,
    nextQuestion: PropTypes.func.isRequired
}

export default Question;
