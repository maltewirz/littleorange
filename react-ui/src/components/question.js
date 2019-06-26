import React from 'react';
import PropTypes from 'prop-types';

function Question(props) {
    return (
        <p className="question"> {props.question}
                <input
                    type="checkbox"
                    onChange={props.checked}
                />
        </p>
    );
}

Question.propTypes = {
    question: PropTypes.string.isRequired,
    checked: PropTypes.func.isRequired
}

export default Question;
