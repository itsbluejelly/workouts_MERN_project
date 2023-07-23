// IMPORTING NECESSARY COMPONENTS AND MODULES
import HomePage from "./pages/HomePage"
import RootLayout from "./layouts/RootLayout"
import {
    RouterProvider, 
    Route, 
    createBrowserRouter, 
    createRoutesFromElements,
} from 'react-router-dom'

// A VARIABLE DEFINING ALL THE DIFFERENT ROUTES AND THEIR RESPECTIVE PAGES
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path='/'
            element={<RootLayout/>}
        >
            <Route
                index
                element={<HomePage/>}
            ></Route> 
        </Route>
    )
)

// RETURNING A COMPONENT WITH ROUTED PAGES
export default function App(){
    return(
        <div className="app">
            <RouterProvider router={router}/>
        </div>
    )
}