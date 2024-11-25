import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import "./Otp.css";
import logo from "../../assets/logo.png";

export const Route = createFileRoute("/auth/otp")({
  component: Otp,
});

function Otp() {
  const [otp, setOtp] = React.useState("");
  const [timer, setTimer] = React.useState(60);
  const [isTimerRunning, setIsTimerRunning] = React.useState(true);

  React.useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
  }, [timer, isTimerRunning]);

  const handleResend = () => {
    setTimer(60);
    setIsTimerRunning(true);
  };

  return (
    <div className="container">
      <nav className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </nav>
      <div className="otp-container">
        <div className="back-button">
          <span>&larr;</span>
        </div>
        <h1>
          <b>Masukkan OTP</b>
        </h1>
        <p>Ketik 6 digit kode yang dikirimkan</p>

        {/* input otp  */}
        <div className="otp-input-container">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={4} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="resend-message">
          {isTimerRunning ? (
            <>Kirim Ulang OTP dalam {timer} detik</>
          ) : (
            <button onClick={handleResend} className="resend-button">
              Kirim Ulang
            </button>
          )}
        </div>
        <div className="button-container">
          <Button className="btn-primary">Simpan</Button>
        </div>
      </div>
    </div>
  );
}
