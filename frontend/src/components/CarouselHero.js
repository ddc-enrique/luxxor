import { Carousel } from 'react-carousel-minimal'

const CarouselHero=()=> {
const data = [
    {
        image: "https://i.postimg.cc/sg5jwZQH/Nombre-5.png",
    },
    {
        image: "https://i.postimg.cc/jj5RTrz0/Nombre-7.png",
    },
    {image: "https://i.postimg.cc/Sx90xZJR/Nombre-10.png"}
]

return (
    <Carousel
            data={data}
            time={4000}
            width="25rem"
            height="25rem"
            automatic={true}
            dots={true}
            slideBackgroundColor="transparent"
            slideImageFit="cover"
            thumbnails={true}
    />
)
}

export default CarouselHero;