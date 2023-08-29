import { useState, useEffect } from 'react'
import Title from './components/Title'
import QuestionsBlock from './components/QuestionsBlock'
import AnswerBlock from './components/AnswerBlock'
import myData from './db.json'

const App = () => {
  const [quiz, setQuiz] = useState(null)
  const [chosenAnswerItems, setChosenAnswerItems] = useState([])
  const [unansweredQuestionIds, setUnansweredQuestionIds] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    setQuiz(myData.quiz)
  }, [])

  useEffect(() => {
    const unansweredIds = quiz?.content?.map(({ id }) => id)
    setUnansweredQuestionIds(unansweredIds)
  }, [quiz])

  useEffect(() => {
    if (unansweredQuestionIds) {
      if (unansweredQuestionIds.length <= 0 && chosenAnswerItems.length >= 1) {
        // scroll to answer block
        setShowAnswer(true)
        const answerBlock = document.getElementById('answer-block')
        answerBlock?.scrollIntoView({ behavior: 'smooth' })
      }
      // scroll to highest unansweredQuestionId
      const highestId = Math.min(...unansweredQuestionIds)
      const highestElement = document.getElementById(highestId)
      highestElement?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [unansweredQuestionIds, showAnswer, chosenAnswerItems])

  return (
    <div className="app">
      <Title title={quiz?.title} subtitle={quiz?.subtitle} />
      {quiz?.content?.map((contentItem) => (
        <QuestionsBlock
          key={contentItem.id}
          quizItem={contentItem}
          setChosenAnswerItems={setChosenAnswerItems}
          chosenAnswerItems={chosenAnswerItems}
          setUnansweredQuestionIds={setUnansweredQuestionIds}
          unansweredQuestionIds={unansweredQuestionIds}
        />
      ))}
      {showAnswer && (
        <AnswerBlock
          answerOptions={quiz?.answers}
          chosenAnswers={chosenAnswerItems}
        />
      )}
    </div>
  )
}

export default App
