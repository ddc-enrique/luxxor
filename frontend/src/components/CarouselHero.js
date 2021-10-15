import { Carousel } from 'react-carousel-minimal'

const CarouselHero=(props)=> {
return (
    <Carousel
        data={props.data}
        time={7000}
        width="25rem"
        height="25rem"
        automatic={true}
        dots={false}
        slideBackgroundColor="transparent"
        slideImageFit="cover"
        // thumbnails={false}
        // showNavBtn={false}
    />
)
}

export default CarouselHero;