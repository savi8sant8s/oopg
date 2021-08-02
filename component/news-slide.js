import { Component } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default class NewsSlide extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="news-slide">
            <Carousel showThumbs={false}>
                <div>
                    <img src="https://i.imgur.com/DzYwzgT.jpeg"/>
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="https://i.imgur.com/DzYwzgT.jpeg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="https://i.imgur.com/DzYwzgT.jpeg" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="https://i.imgur.com/DzYwzgT.jpeg" />
                    <p className="legend">Legend 4</p>
                </div>
                <div>
                    <img src="https://i.imgur.com/DzYwzgT.jpeg" />
                    <p className="legend">Legend 5</p>
                </div>
                <div>
                    <img src="https://i.imgur.com/DzYwzgT.jpeg" />
                    <p className="legend">Legend 6</p>
                </div>
            </Carousel>
            </div>
        );
    }
}