import { Component } from "react";
import { Carousel } from 'react-responsive-carousel';
export default class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div class="card text-center">
                    <div class="card-header">
                        Dados de 2019/2020
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-around">
                            <div class="card card-box m-2">
                                <libel class="center">Total de obras</libel>
                            </div>
                            <div class="card card-box m-2">
                                <libel class="center">Total Gasto/investido</libel>
                            </div>
                        </div>
                        <div class="dashboard-slide">
                            <Carousel showThumbs={false}>
                                <div>
                                    <img src="https://i.imgur.com/DzYwzgT.jpeg" />
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
                    </div>
                </div>
            </div>
        )
    }
}