const Person = ({persons})=>{
    return(
        <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name} - {person.number}</li>
        ))}
       
      </ul>
      
    )
}
export default Person