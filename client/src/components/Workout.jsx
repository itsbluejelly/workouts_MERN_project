import format from 'date-fns/formatDistanceToNow'

export default function Workout(props){
    return(
        <div className="workout-details">
            <h4>{props.workout.title}</h4>
            <p><strong>Load (kg): </strong>{props.workout.load}</p>
            <p><strong>Reps (kg): </strong>{props.workout.reps}</p>
            <p>{format(new Date(props.workout.updatedAt), {addSuffix: true})}</p>
            <span onClick={props.handleClick}>&#128465;</span>
        </div>
    )
}