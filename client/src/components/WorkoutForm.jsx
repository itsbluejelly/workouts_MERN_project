export default function WorkoutForm(props){
    return(
        <form
            className="create"
            onSubmit={props.handleSubmit}
        >
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input
                type="text"
                name="title"
                value={props.formData.title}
                onChange={props.handleChange}
            />

            <label>Load (in kg):</label>
            <input
                type="number"
                name="load"
                value={props.formData.load}
                onChange={props.handleChange}
            />

            <label>Reps:</label>
            <input
                type="number"
                name="reps"
                value={props.formData.reps}
                onChange={props.handleChange}
            />

            <button>Add Workout</button>
            {props.error && <div className="error">{props.error}</div>}
        </form>
    )
}