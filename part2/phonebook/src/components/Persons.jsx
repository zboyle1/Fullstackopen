const Persons = ({personsToShow, confirmDel}) =>
    <ul>
        {personsToShow.map(person =>
            <li key={person.id}>{person.name} {person.number} <button onClick = {confirmDel(person.id)}>Delete</button></li>
        )}
    </ul>

export default Persons