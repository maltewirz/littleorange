import React from 'react';
import PropTypes from 'prop-types';


function Question(props) {
    return (
        <>
            <p className="question"> {props.question}
            </p>
            <p>
            Zutreffend?    <input
                    type="checkbox"
                    checked={props.stateBox}
                    onChange={props.boxChecked}
                />
            </p>
        </>
    );
}

Question.propTypes = {
    question: PropTypes.string.isRequired,
    stateBox: PropTypes.bool.isRequired,
    boxChecked: PropTypes.func.isRequired,
}

export default Question;
