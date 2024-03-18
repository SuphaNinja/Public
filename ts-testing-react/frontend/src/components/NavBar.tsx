import { Link } from 'react-router-dom';


export default function NavBar() {

    return (
        <div className='flex bg-black px-14 py-8 gap-8'>
            <Link className='text-4xl hover:underline text-white' to="/">Home</Link>
            <Link className='text-4xl hover:underline text-white' to="/">user</Link>  
        </div>
    )
};