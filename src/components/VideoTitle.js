
const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[15%] px-20 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-6xl font-bold mx-2'>{title}</h1>
      <p className='p-2 px-6 mx-2 text-lg w-1/2'>{overview}</p>
      <div>
        <button className='bg-white text-black text-base p-6 px-10 w-22 mx-5 rounded-3xl hover:bg-opacity-80'>▶ Play</button>
        <button className='bg-gray-500 text-white text-base p-6 px-10 w-42 bg-opacity-50 rounded-3xl'>ℹ More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle;
 