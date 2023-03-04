import {useEffect, useState} from 'react'

const AnswerBlock = ({answerOptions, chosenAnswers}) => {
    const [result, setResult] = useState(null)

    useEffect(() => {
        answerOptions.forEach(answer => {
            if (chosenAnswers.includes(answer.combination[0]) &&
                chosenAnswers.includes(answer.combination[1]) &&
                chosenAnswers.includes(answer.combination[2]) 
                ){
                    setResult(answer)
                } 
        }) 
    }, [])

    console.log(result)

    return (
        <div id="answer-block" className="answer-block">
            <h2>{result?.text}</h2>
            <img src={result?.image} alt={result?.text}></img>
        </div>
    )
}

export default AnswerBlock