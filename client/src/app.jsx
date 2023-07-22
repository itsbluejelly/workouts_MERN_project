import HomePage from "./pages/HomePage"
import RootLayout from "./layouts/RootLayout"

import {
    RouterProvider, 
    Route, 
    createBrowserRouter, 
    createRoutesFromElements,
} from 'react-router-dom'

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

export default function App(){
    return(
        <div className="app">
            <RouterProvider router={router}/>
        </div>
    )
}