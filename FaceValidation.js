// FaceValidation.js
import React, { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const FaceValidation = ({ onValidationSuccess }) => {
  const webcamRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    };

    loadModels();
  }, []);

  const validateFacePosition = async () => {
    if (webcamRef.current) {
      const videoEl = webcamRef.current.video;
      const detection = await faceapi.detectSingleFace(videoEl, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection) {
        // You can add more checks here based on the position and visibility of facial traits
        onValidationSuccess();
      }
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Webcam
        ref={webcamRef}
        width={640}
        height={480}
        screenshotFormat="image/jpeg"
        style={{ borderRadius: '8px', marginBottom: '16px' }}
      />
      <button style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '5px', cursor: 'pointer' }} onClick={validateFacePosition}>Validate Position</button>
    </div>
  );
};

export default FaceValidation;
