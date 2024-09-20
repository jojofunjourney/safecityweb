import React from "react";
import styles from "@/styles/LoadingOverlay.module.css";

interface LoadingOverlayProps {
  content: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ content }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className={styles.runningHumanContainer}>
          <div className={styles.runningHuman}></div>
          <div className={styles.road}></div>
        </div>
        <p className="mt-4 text-lg font-semibold text-gray-700">{content}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
