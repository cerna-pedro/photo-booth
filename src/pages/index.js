import React, { useState, useEffect, useRef } from "react";
import StyleButtons from "../components/StyleButtons";
import SEO from "../components/SEO";

/* eslint-disable jsx-a11y/media-has-caption */

const Home = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [isStreaming, setIsStreaming] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: { ideal: 4096 }, height: { ideal: 2160 } },
      })
      .then(mediaStream => {
        setIsStreaming(true);
        if (videoRef) {
          videoRef.current.srcObject = mediaStream;
        }
      })
      .catch(e => {
        setIsStreaming(false);
        setError(e);
      });
  }, []);
  const snapPic = () => {
    if (canvasRef) {
      setIsStreaming(false);
      const video = videoRef.current;
      const height = video.clientHeight;
      const width = video.clientWidth;
      const ctx = canvasRef.current.getContext("2d");
      ctx.canvas.height = height;
      ctx.canvas.width = width;
      const filter = getComputedStyle(video).filter;
      ctx.filter = filter;
      ctx.drawImage(video, 0, 0, width, height);
    }
  };
  const tryAgain = () => {
    setIsStreaming(true);
    videoRef.current.classList = "reset";
  };

  const download = () => {
    var link = document.createElement("a");
    link.download = "gorgeous.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
    link.remove();
  };
  return (
    <>
      <SEO />
      <h1>
        Photo Shoot{" "}
        <span role="img" aria-label="Camera">
          📷
        </span>
      </h1>
      {error ? (
        <>
          <h2>
            Looks like something went wrong{" "}
            <span role="img" aria-label="Thinking Face">
              🤔
            </span>
            ...
          </h2>
          <p>
            You have to enable your front-facing camera for this web app to
            work. The sadness{" "}
            <span role="img" aria-label="Loudly Crying Face">
              😭
            </span>
            ...
          </p>
        </>
      ) : (
        <>
          <video
            style={
              isStreaming ? {} : { display: "none", pointerEvents: "none" }
            }
            ref={videoRef}
            autoPlay
            playsInline
          >
            Sorry, this app doesn't work with your device{" "}
            <span role="img" aria-label="Loudly Crying Face">
              😭
            </span>{" "}
            ...
          </video>
          <canvas
            style={
              isStreaming ? { display: "none", pointerEvents: "none" } : {}
            }
            width="4096"
            height="2160"
            ref={canvasRef}
          ></canvas>

          {isStreaming && <StyleButtons video={videoRef} />}
          <button type="button" onClick={isStreaming ? snapPic : tryAgain}>
            {isStreaming ? (
              <>
                Take Pic{" "}
                <span role="img" aria-label="Camera With Flash">
                  📸
                </span>
              </>
            ) : (
              <>
                Try Again{" "}
                <span role="img" aria-label="Face With Steam From Nose">
                  😤
                </span>
              </>
            )}
          </button>
          {!isStreaming && (
            <button type="button" onClick={download}>
              Download{" "}
              <span role="img" aria-label="Envelope With Arrow">
                📩
              </span>
            </button>
          )}
        </>
      )}
    </>
  );
};

export default Home;
