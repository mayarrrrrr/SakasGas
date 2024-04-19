import './clientHome.css'
import {HiLocationMarker} from 'react-icons/hi'
import {MdCall} from 'react-icons/md'
import {BsFillChatDotsFill} from 'react-icons/bs'
import {HiChatBubbleBottomCenter} from 'react-icons/hi2'
import CountUp from 'react-countup'
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react'
import 'swiper/css';
import data from '../../slider.json'
import { sliderSettings } from './Common';
import { NavLink } from 'react-router-dom'
import {motion } from 'framer-motion'

function ClientHome(){
    return(
         <section className='hero-wrapper'>
            <div className="paddings innerWidth flexCenter hero-container ">
                <div className="flexColStart hero-left">
                    <div className="hero-title">
                        <div className="orange-circle"/>
                        <motion.h1 
                        initial={{y:"2rem", opacity:0}}
                        animate={{y:0, opacity: 1}}
                        transition={{duration:2, type:"spring"}}>
                            Elevate <br /> 
                            Your Digital <br />
                            Lifestyle 
                        </motion.h1>
                    </div>
                    <div className="flexColStart hero-des">
                        <span className='secondaryText'>From cutting-edge gadgets to must-have accessories</span>
                        <span className='secondaryText'>Explore a world of high-quality electronics at your fingertips. </span>
                    </div>
                    <div className="flexCenter search-bar">
                        <HiLocationMarker color="var(--blue)" size={25}/>
                        <input type="text" />
                        <button className='button'>Search</button>
                    </div>
                    <div className="flexCenter stats">
                        <div className="flexColCenter stat">
                            <span>
                                <CountUp start={4000} end={7000} duration={4}/>
                                <span>+</span> 
                            </span>
                            <span className='secondaryText'>Premium Products</span>
                        </div>
                        <div className="flexColCenter stat">
                            <span>
                                <CountUp start={1950} end={2000} duration={4}/>
                                <span>+</span>
                            </span>
                            <span className='secondaryText'>Happy Customers</span>
                        </div>
                        <div className="flexColCenter stat">
                            <span>
                                <CountUp end={40}/>
                                <span>+</span> 
                            </span>
                            <span className='secondaryText'>Award Winning</span>
                        </div>

                    </div>
                </div>
                <div className="flexCenter hero-right">
                    <motion.div 
                    initial={{x: "7rem", opacity:0}}
                    animate={{x:0, opacity:1}}
                    transition={{duration:2, type:"spring"}}
                    className="image-container">
                        <img src="./contactUs.jpeg" alt="" />

                    </motion.div>
                </div>
            </div>
            <div className="r-wrapper">
                <div className="paddings innerWidth r-container">
                    <div className="flexColStart r-head">
                        <span className='orangeText'>Best Choices</span>
                        <span className='primaryText'>Popular Categories</span>
                    </div>
                    <Swiper {...sliderSettings}>
                        <SliderButtons/>
                        {data.map((card, i) => {
                            return(
                                <SwiperSlide key={i}>
                                    <div className="flexColStart r-card">
                                        <img src={card.image} alt="category"/>
                                        <span className='primaryText'>{card.category}</span>
                                        <span className='secondaryText'>{card.description}</span>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
            <div className="c-wrapper">
                <div className="paddings innerWidth flexCenter c-container">
                    <div className="c-left">
                        <div className="c-image-container">
                            <img src="./hero.jpeg" alt="" />
                        </div>
                    </div>
                    {/*Right side */}
                    <div className="flexColStart c-right">
                        <span className='orangeText'>Contacts</span>
                        <span className='primaryText'>Want to reach out to us</span>
                        <span className='secondaryText'>We always ready to help by providing the best service</span>

                        <div className="flexColStart contactModes">
                            {/*first Row*/}
                            <div className="flexStart row">
                                <div className="flexColCenter mode">
                                    <div className="flexStart">
                                        <div className="flexCenter icon">
                                            <MdCall size={25}/>
                                        </div>
                                        <div className="flexColStart detail">
                                            <span className='primaryText'>Call</span>
                                            <span className='secondaryText'>0728192401</span>
                                        </div>
                                    </div>
                                    <div className="flexCenter c-button">Call Now</div>
                                </div>

                                {/*second mode*/}
                                <div className="flexColCenter mode">
                                    <div className="flexStart">
                                        <div className="flexCenter icon">
                                            <BsFillChatDotsFill size={25}/>
                                        </div>
                                        <div className="flexColStart detail">
                                            <span className='primaryText'>Message</span>
                                            <span className='secondaryText'>0728192401</span>
                                        </div>
                                    </div>
                                    <div className="flexCenter c-button">Message Us</div>
                                </div>
                            </div>

                            {/*second row*/}
                            <div className="flexStart row">
                                <div className="flexColCenter mode">
                                    <div className="flexStart">
                                        <div className="flexCenter icon">
                                            <HiChatBubbleBottomCenter size={25}/>
                                        </div>
                                        <div className="flexColStart detail">
                                            <span className='primaryText'>Email</span>
                                            <span className='secondaryText'>Ehub@gmail.com</span>
                                        </div>
                                    </div>
                                    <div className="flexCenter c-button">Email Us</div>
                                </div>

                                {/*fourth mode*/}
                                <div className="flexColCenter mode">
                                    <div className="flexStart">
                                        <div className="flexCenter icon">
                                            <HiLocationMarker size={25}/>
                                        </div>
                                        <div className="flexColStart detail">
                                            <span className='primaryText'>Find Us</span>
                                            <span className='secondaryText'>15 Bowery St</span>
                                        </div>
                                    </div>
                                    <div className="flexCenter c-button">Location</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="g-wrapper">
                <div className="paddings innerWidth g-container">
                    <div className="flexColCenter g-inner-container">
                        <span className='primaryText'>Get Started with E-Hub</span>
                        <span className='secondaryText'>Discover unbeatable discounts on a wide range of products</span>
                        <span>Explore our extensive collection</span>
                        <button className='button'>
                            <NavLink to='/register'>Get Started</NavLink>
                        </button>
                    </div>
                </div>
            </div>
            <div className="f-wrapper">
                <div className="paddings innerWidth flexCenter f-contain">
                    {/*left side*/}
                    <div className="flexColStart f-left">
                        <img src="./e-hub logo.png" alt="" width={50} />
                        <span className="secondaryText">Our vision is to redefine your shopping experience,<br/> offering unbeatable convenience and value to you.</span>
                    </div>
                    <div className="flexColStart f-right">
                        <span className='primaryText'>Information</span>
                        <span className='secondaryText'>15 Bowery St, Kitt Lane</span>
                        <div className="flexCenter f-menu">
                            <span>Home</span>
                            <span>Products</span>
                            <span>Cart</span>

                        </div>
                    </div>

                </div>
            </div>

            
        </section>
    )
}

export default ClientHome

const SliderButtons = () => {
    const swiper = useSwiper()
    return(
        <div className=" r-buttons">
            <button onClick={() => swiper.slidePrev()}>&lt;</button>
            <button onClick={() => swiper.slideNext()}>&gt;</button>
        </div>
    )
}