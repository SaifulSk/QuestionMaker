// src/components/ReferralProgram.js
import React, { useState } from "react";

const ReferralProgram = () => {
  const [referralCode] = useState("REF12345");

  return (
    <div>
      <h2>Referral Program</h2>
      <p>Share your referral code: {referralCode}</p>
    </div>
  );
};

export default ReferralProgram;
