import './clientHome.css'
function ClientHome(){
    return(
        <section className='hero-wrapper'>
            <div className="paddings innerWidth flexCenter hero-container ">
                <div className="hero-left">
                    Left Section
                </div>
                <div className="flexCenter hero-right">
                    <div className="image-container">
                        <img src="./hero.jpeg" alt="" />

                    </div>
                </div>

            </div>
            </section>
    )
}

export default ClientHome