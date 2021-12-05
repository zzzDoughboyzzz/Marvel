import './appHeader.scss'

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <span>Marvel</span> information portal
            </h1>
            <nav className="app__menu">
                <ul>
                    <li className='active'><a href='#rtewt'>Characters</a></li>/<li><a href='#rer'>Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader