import './cards.css'
import {CardsData} from '../../cardsData'
import Card from './Card'

function Cards(){
    return (
        <div className="cards">
            {CardsData.map((card, id) => {
                return(
                    <div className="parent-container">
                        <Card 
                        title={card.title}
                        color={card.color}
                        barValue = {card.barValue}
                        value={card.value}
                        png={card.png}
                        series={card.series}/>
                    </div>
                )
            })}

        </div>
    )
}

export default Cards