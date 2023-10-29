import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sign from '../Pages/Sign'
import Home from '../Pages/Home'
import ErrorPage from '../Pages/ErrorPage'

const RouterPage = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Sign />} />
                <Route path='/home' element={<Home />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterPage