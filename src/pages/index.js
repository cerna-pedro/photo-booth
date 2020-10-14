import React, { useState, useEffect, useRef } from "react"
import { navigate } from "gatsby"
import "../components/styles.css"

const Home = () => {
  const videoRef = useRef()
  const canvasRef = useRef()
  const [isStreaming, setIsStreaming] = useState(true)
  const [error, setError] = useState()
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: { ideal: 4096 }, height: { ideal: 2160 } },
      })
      .then(mediaStream => {
        setIsStreaming(true)
        if (videoRef) {
          videoRef.current.srcObject = mediaStream
        }
      })
      .catch(e => {
        setIsStreaming(false)
        setError(e)
      })
  }, [])
  const snapPic = () => {
    if (canvasRef) {
      setIsStreaming(false)
      const video = videoRef.current
      const height = video.clientHeight
      const width = video.clientWidth
      const ctx = canvasRef.current.getContext("2d")
      ctx.canvas.height = height
      ctx.canvas.width = width
      ctx.drawImage(videoRef.current, 0, 0, width, height)
    }
  }
  const tryAgain = () => {
    setIsStreaming(true)
  }
  const download = () => {
    const image = canvasRef.current.toDataURL("beautiful/png")
    var link = document.createElement("a")
    link.download = "gorgeous.png"
    link.href = canvasRef.current.toDataURL()
    link.click()
    link.remove()
  }
  return (
    <>
      <h1>Photo Booth</h1>
      {error ? (
        <>
          <h2>Looks like something went wrong 🤔...</h2>
          <p>
            You have to enable your front-facing camera for this web app to
            work. The sadness 😭...
          </p>
        </>
      ) : (
        <>
          <h2>Your Video</h2>
          <div className="media">
            <video
              style={
                isStreaming ? {} : { display: "none", pointerEvents: "none" }
              }
              ref={videoRef}
              autoPlay
            >
              Sorry, this app doesn't work with your device 😭 ...
            </video>
            <canvas
              style={
                isStreaming ? { display: "none", pointerEvents: "none" } : {}
              }
              width="4096"
              height="2160"
              ref={canvasRef}
            ></canvas>
          </div>

          <button type="button" onClick={isStreaming ? snapPic : tryAgain}>
            {isStreaming ? `Take Pic 📸` : `Try Again 😤`}
          </button>
          {!isStreaming && (
            <button type="button" onClick={download}>
              Download 📩
            </button>
          )}
        </>
      )}
    </>
  )
}

export default Home
