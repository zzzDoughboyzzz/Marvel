import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false,
        charLoading: false,
        offset: 210,
        ended: false
    }

    marvelService = new MarvelService();

    componentDidMount = () => {
        this.getCharacter()
    }

    onCharactersLoaded = newChars => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }
        this.setState(({chars, loading, charLoading, offset}) => ({
            chars: [...chars, ...newChars], loading: false, charLoading: false, offset: offset + 9, ended: ended
        }))
    }

    onCharLoading = () => {
        this.setState({charLoading: true})
    }

    onError = () => {
        this.setState({error: true, loading: false})
    }

    getCharacter = (offset) => {
        this.onCharLoading();
        this.marvelService.getAllCharacters(this.state.offset)
        .then(this.onCharactersLoaded)
        .catch(this.onError)
    }

    render() {
        const {chars, loading, error, charLoading, offset, ended} = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        let items;
        if (chars) {
            items = chars.map(char => <Char comics={char.comics} thumbnail={char.thumbnail} charName={char.name} key={char.id} setCharId={() => this.props.setCharId(char.id)} />)
        }

        const content = !(error || spinner) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                <ul className="char__grid">
                {content}
                </ul>
                <button disabled={charLoading == true ? true: false} style={{filter: charLoading == true ? 'grayscale(.5)': 'unset', display: ended == true ? 'none': 'block'}} onClick={this.getCharacter} className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const Char = ({thumbnail, charName, setCharId}) => {
    const notFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    return (
        <li className="char__item" onClick={setCharId}>
        <img src={thumbnail} alt={charName} style={{objectFit: thumbnail == notFound ? 'fill': 'cover'}}/>
        <div className="char__name">{charName}</div>
    </li>
    )
}

export default CharList;