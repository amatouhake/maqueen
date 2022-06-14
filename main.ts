bluetooth.startUartService();

bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), () => {
    let command = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine)).split(" ").map(arg => parseInt(arg, 10));
    
    // Motor
    if (0 < command[0]) maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CW, command[0]);
    else maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CCW, -command[0]);
    if (0 < command[1]) maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CW, command[1]);
    else maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CCW, -command[1]);

    // LED
    maqueen.writeLED(maqueen.LED.LEDLeft, command[2] ? maqueen.LEDswitch.turnOn : maqueen.LEDswitch.turnOff);
    maqueen.writeLED(maqueen.LED.LEDRight, command[3] ? maqueen.LEDswitch.turnOn : maqueen.LEDswitch.turnOff);
});

bluetooth.onBluetoothDisconnected(() => {
    maqueen.motorStopAll();
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff);
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff);
});
