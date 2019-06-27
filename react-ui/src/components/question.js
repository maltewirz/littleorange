import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';


function Question(props) {
    return (
        <p className="question"> {props.question}
                <input
                    type="checkbox"
                    checked={props.stateBox}
                    onChange={props.boxChecked}
                />
                <Button variant="primary"
                    onClick={props.nextQuestion}
                > Next </Button>
        </p>
    );
}

Question.propTypes = {
    question: PropTypes.string.isRequired,
    stateBox: PropTypes.bool.isRequired,
    boxChecked: PropTypes.func.isRequired,
    nextQuestion: PropTypes.func.isRequired
}

export default Question;
