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
            dots={false}
            slideBackgroundColor="transparent"
            slideImageFit="cover"
            thumbnails={false}
    />
)
}

export default CarouselHero;