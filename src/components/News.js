import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.props.category} - NewsApp`
    }

    componentDidMount() {
       fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=ce872e997f7645eb8e20935ccf4708b3&pageSize=${this.props.pageSize}`)
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                articles: json.articles,
                loading: false
            })
        })
    }

    handlePrevClick = () => {
        fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=ce872e997f7645eb8e20935ccf4708b3&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`)
        .then((res) => res.json(),
            this.setState({loading: true})
        )
        .then((json) => {
            this.setState({
                articles: json.articles,
                page: this.state.page - 1,
                loading: false
            })
        })
    }

    handleNextClick = () => {
        fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=ce872e997f7645eb8e20935ccf4708b3&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`)
        .then((res) => res.json(),
            this.setState({loading: true})
        )
        .then((json) => {
            this.setState({
                articles: json.articles,
                page: this.state.page + 1,
                loading: false
            })
        })
    }

    render() {
        return (
        <div className="container my-3">
            {this.state.loading && <Spinner/>}
            <h4 className="text-center">NewsApp - Top {this.props.category} Headlines</h4>
            <div className="row">
                {!this.state.loading && this.state.articles && this.state.articles.map((element) => {
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem key={element.url} title={element.title.slice(0,40)} description={element.description} imageUrl={element.urlToImage} 
                        newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/> 
                    </div>
                })}
            </div>
            <div className="container d-flex justify-content-between">
                <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
        </div>
        )
    }
}

export default News