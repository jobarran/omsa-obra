'use client'


import { useEffect, useRef, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";


// Styles
import "./QrStyles.css";

// Qr Scanner
import QrScanner from "qr-scanner";
import { useMaterialStore, useQrStore } from "@/store";
import { qrScannerToObject } from "@/utils";

const QrReader = () => {
  // QR States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const [showGuide, setShowGuide] = useState<boolean>(false); // Control the visibility of the guide

  const closeQrScanner = useQrStore(state => state.closeQrScanner)
  const setScannedQr = useQrStore(state => state.setScannedQr)
  const scannedQr = useQrStore(state => state.scannedQr)
  const setScannedQrRepeated = useQrStore(state => state.setScannedQrRepeated)
  const isQrScannerOpen = useQrStore(state => state.isQrScannerOpen)

  const storeMaterial = useMaterialStore(state => state.storeMaterial)
  const setStoreMaterial = useMaterialStore(state => state.setStoreMaterial)


  const isLargeScreen = window.innerWidth >= 1024;

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
        .then(() => {
          setQrOn(true);
          // Delay showing the guide for 2 seconds (adjust as needed)
          setTimeout(() => setShowGuide(true), 100);
        })
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
    if (result?.data) {
      // Create data object from scanned QR
      const data = qrScannerToObject(result.data);

      // Check if data already exists in storeMaterial array
      const isDataRepeated = storeMaterial?.some((material) => {
        // Implement your comparison logic here
        // For example, comparing material.code or other unique identifier
        return material.code === data.code && material.name === data.name;
      });

      if (isDataRepeated) {
        // If data already exists in storeMaterial array
        setScannedQrRepeated();
        closeQrScanner();
        scanner.current?.stop();
        console.log('QR code already exists in storeMaterial');
      } else {
        // If data is not in storeMaterial array, add it
        setStoreMaterial(data);
        closeQrScanner();
        scanner.current?.stop();
        console.log('QR code added to storeMaterial');
      }
    }
    console.log(storeMaterial);
  };

  // Fail
  const onScanFail = (err: string | Error) => {
    // 🖨 Print the "err" to browser console.
    console.log(err);
  };

  const handleCloseScanner = () => {
    closeQrScanner()
    scanner.current?.stop();
  }

  // ❌ If "camera" is not allowed in browser permissions, show an alert.


  return (

    <div className={`qr-reader`} style={{ zIndex: '2' }}>

      {/* Close button */}
      {showGuide &&
      <button className="close-button text-white text-3xl" onClick={handleCloseScanner}>
        <FaWindowClose />
      </button>
      }
      {/* QR */}
      <video ref={videoEl} style={{ borderRadius: isLargeScreen ? '1rem' : '0' }} className="w-full h-full"></video>
      {/* Dotted line square */}
      {showGuide && <div className="qr-guide"></div>}

    </div>
  );
};

export default QrReader;