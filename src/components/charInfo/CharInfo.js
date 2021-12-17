import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.charId !== this.props.charId) {
            this.updateChar();
        }
    }

    onCharLoaded = char => {
        this.setState({char, loading: false})
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    updateChar = () => {
        const id = this.props.charId;
        if (id !== null) {
            this.setState({loading: true})
            this.marvelService
                .getCharacter(id)
                .then(this.onCharLoaded)
                .catch(err => this.onError())
        }
    }


    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const skeleteon = !(error || spinner || char !== null) ? <Skeleton />: null;
        const content = !(error || spinner || skeleteon) ? <View char={char} /> : null;

        return (
            <div className="char__info">
                {errorMessage}
                {spinner}
                {skeleteon}
                {content}
            </div>
        )
    }
}

const View = ({ char }) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const notFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    return (
        <>
            <div className="char__basics">
                    <img src={thumbnail} style={{objectFit: thumbnail == notFound ? 'contain': 'cover'}} alt="abyss"/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki}className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length == 0 ? 'There is no comicses for this character': null }
                    {
                        comics.map((item, index) => {
                            return (
                                <li key={index} className="char__comics-item">
                                    {item.name}
                                </li>
                            )

                        }).slice(1, 11)
                    }
                </ul>
        </>
    )
}

export default CharInfo;