import React from "react";

// Deterministic gold-family gradient per name, so the same person always
// gets the same look without needing an uploaded photo.
const GRADIENTS = [
  ["#FED500", "#ff8a00"],
  ["#ffdd55", "#e5c000"],
  ["#ffb703", "#fb5607"],
  ["#f4d35e", "#ee964b"],
];

const hashName = (name = "") =>
  name.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const Avatar = ({ name, size = 56 }) => {
  const [from, to] = GRADIENTS[hashName(name) % GRADIENTS.length];
  const gradId = `avatarGrad-${hashName(name)}`;

  return (
    <svg width={size} height={size} viewBox="0 0 56 56" className="avatar-ring rounded-full">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <circle cx="28" cy="28" r="27" fill="#1a1a1a" stroke={`url(#${gradId})`} strokeWidth="2" />
      <text
        x="28"
        y="34"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontWeight="700"
        fontSize="18"
        fill={`url(#${gradId})`}
      >
        {initials(name)}
      </text>
    </svg>
  );
};

export default Avatar;
