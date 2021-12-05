import './randomCharacter.scss'
import '../../styles/button.scss'
import img from '../../resources/img/thor.jpeg'

const randomCharacter = props => {
    return(
        <section className="randomchar">
            <div className="randomchar__character">
                <div className="randomchar__content">
                    <div className="randomchar__img">
                        <img src={img} alt="superhero" />
                    </div>
                    <div>
                        <h3 className="randomchar__title">Thor</h3>
                        <p className="randomchar__descr">As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...</p>
                        <div className="randomchar__buttons">
                            <a href='#somewhere' className='button'>HOMEPAGE</a>
                            <a href='#somewhere' className='button button__primary'>WIKI</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="randomchar__random">
                <h4 className="randomchar__title">
                Random character for today!<br />
                Do you want to get to know him better?
                </h4>
                <h5 className="randomchar__subtitle">
                    Or choose another one
                </h5>
                <a href='#somewhere' className='button dark randomchar__random-btn'>HOMEPAGE</a>
            </div>
        </section>
    )
}

export default randomCharacter