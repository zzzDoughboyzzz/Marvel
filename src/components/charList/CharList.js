import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {

    state = {
        chars: null,
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount = () => {
        this.getCharacter()
    }

    onCharactersLoaded = chars => {
        this.setState({chars, loading: false})
    }

    onError = () => {
        this.setState({error: true})
    }

    getCharacter = () => {
        this.marvelService.getAllCharacters()
        .then(this.onCharactersLoaded)
        .catch(this.onError)
    }

    render() {
        const {chars, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        let items;
        if (chars) {
            items = chars.map(char => <Char thumbnail={char.thumbnail} charName={char.name}  key={char.name} />)
        }

        const content = !(error || spinner) ? items : null;

        return (
            <div className="char__list">
                <ul className="char__grid">
                {errorMessage}
                {spinner}
                {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const Char = ({thumbnail, charName}) => {
    const notFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    return (
        <li className="char__item">
        <img src={thumbnail} alt={charName} style={{objectFit: thumbnail == notFound ? 'fill': 'cover'}}/>
        <div className="char__name">{charName}</div>
    </li>
    )
}

export default CharList;