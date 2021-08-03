import { Component } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import style from '../styles/style1.module.css';

export default class NewsSlide extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="news-slide">
                <div>
                    <h4 className={style.bg2 + " text-center text-white"}>Notícias</h4>
                </div>
                <Carousel showThumbs={false} dynamicHeight={true}>
                    <div>
                        <img src="/news.png" />
                        <p className="legend">Legend 1</p>
                    </div>
                    <div>
                        <img src="/news.png" />
                        <p className="legend">Legend 2</p>
                    </div>
                    <div>
                        <img src="/news.png" />
                        <p className="legend">Legend 3</p>
                    </div>
                    <div>
                        <img src="/news.png" />
                        <p className="legend">Legend 4</p>
                    </div>
                    <div>
                        <img src="/news.png" />
                        <p className="legend">Legend 5</p>
                    </div>
                    <div>
                        <img src="/news.png" />
                        <p className="legend">Legend 6</p>
                    </div>
                </Carousel>
            </div>
        );
    }
}