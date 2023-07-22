import {Link, Outlet} from 'react-router-dom'

export default function RootLayout(){
    return(
        <div>
            <header>
                <nav className='container'>
                    <Link to='/'>
                        <h1>Workout Buddy</h1>
                    </Link>
                </nav>
            </header>

            <main>
                <Outlet/>
            </main>
        </div>
    )
}