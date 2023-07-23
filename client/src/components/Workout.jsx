export default function Workout(props){
    return(
        <div className="workout-details">
            <h4>{props.workout.title}</h4>
            <p><strong>Load (kg): </strong>{props.workout.load}</p>
            <p><strong>Reps (kg): </strong>{props.workout.reps}</p>
            <p>{props.workout.createdAt}</p>
        </div>
    )
}