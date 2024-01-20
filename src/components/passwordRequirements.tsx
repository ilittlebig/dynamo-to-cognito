import { useState, useEffect } from "react";

interface PasswordRequirementsProps {
  password: string;
}

const PasswordRequirements = ({ password }: PasswordRequirementsProps) => {
  const [requirements, setRequirements] = useState({
    minLength: false,
    number: false,
    specialChar: false,
    uppercase: false,
    lowercase: false
  });

  useEffect(() => {
    setRequirements({
      minLength: password.length >= 8,
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password)
    });
  }, [password]);

  return (
    <ul>
      <li className={requirements.minLength ? "text-green" : "text-red"}>
        Minimum Length: 8
      </li>
      <li className={requirements.number ? "text-green" : "text-red"}>
        Contains at least 1 number
      </li>
      <li className={requirements.specialChar ? "text-green" : "text-red"}>
        Contains at least 1 special character
      </li>
      <li className={requirements.uppercase ? "text-green" : "text-red"}>
        Contains at least 1 uppercase letter
      </li>
      <li className={requirements.lowercase ? "text-green" : "text-red"}>
        Contains at least 1 lowercase letter
      </li>
    </ul>
  )
}

export default PasswordRequirements;
