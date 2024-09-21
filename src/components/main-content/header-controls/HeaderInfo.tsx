
interface HeaderInfoProps {
  countPhotos: number
}


function HeaderInfo({countPhotos}: HeaderInfoProps ) {
  return (
    <span className="text-[--color-gray-tertiary] text-sm">
      {countPhotos} photos, 0 videos
    </span>
  );
}

export default HeaderInfo