import React from 'react';
import PropTypes from 'prop-types';

function Result(props) {
    return (
        <div className="result">
            <p>Einstufung der Gefährdung mit {props.quizResultPoints} Punkten.</p>

            <p>{props.quizResultAdvice}</p>

            <p>Die folgenden Anhaltspunkte sind festgestellt: {props.quizResultTopics && props.quizResultTopics.map(result => {
                return (
                    <li key={ result }> {result} </li>
                );
            })}</p>

        </div>
    );
}

Result.propTypes = {
    quizResultPoints: PropTypes.number.isRequired,
    quizResultTopics: PropTypes.array.isRequired,
    quizResultAdvice: PropTypes.string.isRequired

};

export default Result;
