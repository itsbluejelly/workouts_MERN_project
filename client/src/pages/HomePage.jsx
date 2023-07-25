// IMPORTING THE NECESSARY MODULES AND COMPONENTS
import React from "react"
import Workout from '../components/Workout'
import WorkoutForm from "../components/WorkoutForm"
import workoutsContextHook from '../hooks/workoutsContextHook'

export default function HomePage() {
    // A VARIABLE TO SET THE FETCHED WORKOUTS DATA
    const {fetchedWorkouts, dispatch} = workoutsContextHook()
    // A VARIABLE TO SET THE POPUP ERROR MESSAGE BELOW
    const [error, setError] = React.useState('')
    // A VARIABLE TO SET THE POPUP SUCCESS MESSAGE BELOW
    const [success, setSuccess] = React.useState('')

    // A VARIABLE OBJECT TO SET INITIAL VALUES OF INPUT FIELDS
    const [formData, setFormData] = React.useState({
        title: "",
        load: 0,
        reps: 0
    })

    // A FUNCTION TO UPDATE CHANGE OF FORM DATA FIELDS
    function handleChange(e){
        setFormData(prevFormData => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }))
    }

    // AN ASYNC FUNCTION TO GET WORKOUTS FROM REST API SERVER
    async function getWorkouts(){
        setSuccess("Loading...")

        try{
            const response = await fetch('http://localhost:4000/workouts?sortByLatest=true')
            const data = await response.json()
            
            if(response.ok){
                dispatch({
                    type: "SET_WORKOUTS",
                    payload: data.success
                })
            }else{
                throw new Error(data.error)
            }

            setError('')
            setSuccess('Workouts fetched successfully')
        }catch(error){
            setSuccess('')
            setError(error.message)
        }
    }

    
    //AN ASYNC FUNCTION TO HANDLE FORM SUBMISSION
    async function handleSubmit(e){
        e.preventDefault()

        try{
            const response = await fetch('http://localhost:4000/workouts', {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': "application/json"
                }
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.error)
            }else{
                setFormData(prevFormData => ({
                    ...prevFormData,
                    title: "",
                    load: 0,
                    reps: 0
                }))
                
                dispatch({
                    type: "CREATE_WORKOUT",
                    payload: data.data
                })
            }
        }catch(error){
            setError(error.message)
        }
    } 

    // AN ASYNC FUNCTION TO DELETE ONE WORKOUT
    async function deleteOneWorkout(id){
        try{
            const response = await fetch(`http://localhost:4000/workouts/workout/${id}`,{ method: "DELETE" })
            const data = await response.json()

            dispatch({
                type: "DELETE_WORKOUT",
                payload: data.success
            })

            if(!response.ok){
                throw new Error(data.error)
            }else{
                setSuccess("Workout deleted successfully")
            }
        }catch(error){
            setError(error.message)
        }
    }

    // A USEEFFECT HOOK TO LOAD THE FETCHEDWORKOUTS DATA ONLY ON THE FIRST LOAD OF THE PAGE
    React.useEffect(() => getWorkouts, [])

    // A FUNCTION TO GENERATE A LIST OF COMPONENTS
    function generateListOfWorkoutComponents(){
        return(
            fetchedWorkouts.map(
                fetchedWorkout => (
                    <Workout
                        key={fetchedWorkout._id}
                        workout={fetchedWorkout}
                        handleClick={() => deleteOneWorkout(fetchedWorkout._id)}
                    />
                )
            )
        )
    }
    
    return (
        <div className="homePage">
            <div>
                {fetchedWorkouts && generateListOfWorkoutComponents()}
            </div>
            
            <WorkoutForm
                error={error}
                success={success}
                formData={formData}
                handleChange={(e) => handleChange(e)}
                handleSubmit={(e) => handleSubmit(e)}
            />
            
        </div>
    );
}