import { Masonry } from "masonic"

interface MasonryCardProps {
  data: {
    id: number;
    src: string;
    artist: string
  }
}

const Gallery: React.FC = () => {
  // Fetchear las imagenes
  return (
    <Masonry items={} render={MasonryCard} columnGutter={16} columnWidth={172} overscanBy={5} maxColumnCount={4}/>
  )
}



function MasonryCard({data: {id, src, artist }}: MasonryCardProps) {
  <div className="relative">
    <img src="" alt="" />
  </div>
}

export default Gallery