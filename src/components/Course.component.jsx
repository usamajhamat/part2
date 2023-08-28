import Header from "./Header.component"
import Content from "./Content.component"


const Course = ({course})=>{
    return(
        <div>
            <Header courseName={course.name}/>
            <Content parts={course.parts}/>
        </div>
    )
}
export default Course