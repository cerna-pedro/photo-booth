import React, { useState, useEffect,useRef} from "react"

const Home = () => {
  const [stream, setStream] = useState()
  const ref=useRef()
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(mediaStream => {
      console.log("stream", stream)
      setStream(mediaStream)
      console.log(ref.current.play());
    })
  }, [stream])
  return (
    <>
      <h1>Photo Booth</h1>
      <div className="media">
        {stream ? (
          <>
            <h2>Your Video</h2>
            <video ref={ref} width="300" autoPlay muted plays src={stream}></video>
            </>

        ) : null}
      </div>
    </>
  )
}

export default Home
