import {HomePage} from '../../pages';
import {Routes, Route} from 'react-router-dom';


export const HomeRoute: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>} />
        </Routes>
    )
}