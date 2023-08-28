import Part from "./Part.component"

const Content = ({parts})=>{
    const totalExercises = parts.reduce((sum,part)=> sum + part.exercises, 0)
    return(
        <div>
            {parts.map((part)=>(
                <Part key={part.id} partName={part.name} exercises={part.exercises}/>
            ))}
            <p>
            <strong>Total of {totalExercises} Exercises</strong>
            </p>
           
        </div>
    )
}
export default Content