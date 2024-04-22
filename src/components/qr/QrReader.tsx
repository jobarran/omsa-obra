'use client'


import { useEffect, useRef, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";


// Styles
import "./QrStyles.css";

// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "../../assets/qr-frame.svg";
import { useQrStore } from "@/store";

const QrReader = () => {
  // QR States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);

  const closeQrScanner = useQrStore(state => state.closeQrScanner)
  const setScannedQr = useQrStore(state => state.setScannedQr)
  const scannedQr = useQrStore(state => state.scannedQr)
  const isScannedQrRepeated = useQrStore(state => state.isScannedQrRepeated)
  const setScannedQrRepeated = useQrStore(state => state.setScannedQrRepeated)


  const isLargeScreen = window.innerWidth >= 1024;


  // Result
  const [scannedResult, setScannedResult] = useState<string | undefined>("");

  useEffect(() => {
    const videoElement = videoEl.current;
    if (videoElement && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: false,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: false,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl?.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoElement) {
        scanner.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  // Success
  const onScanSuccess = (result: QrScanner.ScanResult) => {
    // Check if result.data exists in scannedQr array before setting it
    if (result?.data) {
      if (scannedQr?.includes(result.data)) {
        // If result.data already exists in scannedQr array
        setScannedResult(result.data);
        setScannedQrRepeated(); // Call setScannedQrRepeated
        closeQrScanner(); // Call the closeQrScanner function
      } else {
        // If result.data is not in scannedQr array
        setScannedResult(result.data);
        setScannedQr(result.data);
        closeQrScanner(); // Call the closeQrScanner function
      }
    }
  };

  // Fail
  const onScanFail = (err: string | Error) => {
    // 🖨 Print the "err" to browser console.
    console.log(err);
  };

  // ❌ If "camera" is not allowed in browser permissions, show an alert.


  return (

    <div className={`qr-reader`} style={{ zIndex: '2' }}>

      {/* Close button */}
      <button className="close-button text-white text-3xl" onClick={closeQrScanner}>
        <FaWindowClose />
      </button>

      {/* QR */}
      <video ref={videoEl} style={{ borderRadius: isLargeScreen ? '1rem' : '0' }} className="w-full h-full"></video>
      {/* Dotted line square */}
      <div className="qr-guide"></div>

      {/* Show Data Result if scan is success */}
      {scannedResult && (
        <p
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 99999,
            color: "white",
          }}
        >
          Scanned Result: {scannedResult}
        </p>
      )}
    </div>
  );
};

export default QrReader;