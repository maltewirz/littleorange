import React from 'react';
import PropTypes from 'prop-types';

function Result(props) {
    return (
        <div className="result">
            <h5>Einstufung der Gefährdung mit {props.quizResultPoints} Punkten.</h5>

            <p>{props.quizResultLevel}</p>

            <h5>Die folgenden Anhaltspunkte sind festgestellt:</h5> {props.quizResultTopics && props.quizResultTopics.map(result => {
                return (
                    <li key={ result }> {result} </li>
                );
            })}

            <h5> Handlungsempfehlungen: </h5>
            {props.quizResultAdvice}

        </div>
    );
}

Result.propTypes = {
    quizResultPoints: PropTypes.number.isRequired,
    quizResultTopics: PropTypes.array.isRequired,
    quizResultLevel: PropTypes.string.isRequired,
    quizResultAdvice: PropTypes.string.isRequired

};

export default Result;
