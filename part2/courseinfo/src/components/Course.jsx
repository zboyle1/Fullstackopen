const Header = ({ course }) => <><h1>{course}</h1></>

const Part = ({ part }) => <><p>{part.name} {part.exercises}</p></>

const Content = ({ parts }) =>
    <div>
        {parts.map(part =>
            <Part key={part.id} part={part} />
        )}
    </div>

const Total = ({ parts }) => {
    const sum =
        parts.reduce((a, b) => ({ exercises: a.exercises + b.exercises }))
    return (
        <div>
            <b>total of {sum.exercises} exercises</b>
        </div>
    )
}

const Course = ({ course }) =>
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>

export default Course
