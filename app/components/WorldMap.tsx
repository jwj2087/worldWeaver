import React from 'react'

function WorldMap() {
    return (
      <svg
        className="absolute inset-0 h-full w-full"
        role="img"
        viewBox="0 0 520 480"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>세계관 캐릭터 이동 경로 지도</title>
        <defs>
          <pattern height="32" id="grid" patternUnits="userSpaceOnUse" width="32">
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              opacity="0.5"
              stroke="#C8C6BE"
              strokeWidth="0.4"
            />
          </pattern>
        </defs>
        <rect fill="url(#grid)" height="480" width="520" />
  
        <ellipse cx="160" cy="180" fill="#D3D1C7" opacity="0.5" rx="110" ry="80" />
        <ellipse cx="340" cy="150" fill="#B4B2A9" opacity="0.4" rx="90" ry="65" />
        <ellipse cx="260" cy="330" fill="#D3D1C7" opacity="0.45" rx="130" ry="75" />
  
        <text fill="#444441" fontSize="12" fontWeight="500" textAnchor="middle" x="140" y="175">
          북부 왕국
        </text>
        <text fill="#444441" fontSize="12" fontWeight="500" textAnchor="middle" x="340" y="145">
          동쪽 제국
        </text>
        <text fill="#444441" fontSize="12" fontWeight="500" textAnchor="middle" x="260" y="328">
          남쪽 황야
        </text>
  
        <polyline
          fill="none"
          opacity="0.85"
          points="80,240 160,180 260,200 340,150 420,120"
          stroke="#7F77DD"
          strokeDasharray="6,3"
          strokeWidth="2"
        />
        <polyline
          fill="none"
          opacity="0.75"
          points="80,380 160,320 260,270 340,250"
          stroke="#1D9E75"
          strokeDasharray="5,4"
          strokeWidth="2"
        />
        <polyline
          fill="none"
          opacity="0.7"
          points="460,380 380,300 260,320 160,280"
          stroke="#D85A30"
          strokeWidth="2"
        />
  
        {[
          [80, 240, 8, "#7F77DD"],
          [160, 180, 7, "#7F77DD"],
          [260, 200, 7, "#7F77DD"],
          [340, 150, 7, "#7F77DD"],
          [420, 120, 9, "#534AB7"],
        ].map(([cx, cy, r, fill]) => (
          <circle cx={cx} cy={cy} fill={fill as string} key={`${cx}-${cy}`} r={r} stroke="#EEEDFE" strokeWidth="2" />
        ))}
  
        <text fill="#534AB7" fontSize="10" textAnchor="middle" x="80" y="229">
          출발
        </text>
        <text fill="#534AB7" fontSize="10" textAnchor="middle" x="160" y="168">
          성채
        </text>
        <text fill="#534AB7" fontSize="10" textAnchor="middle" x="260" y="189">
          교차로
        </text>
        <text fill="#534AB7" fontSize="10" textAnchor="middle" x="420" y="109">
          목적지
        </text>
  
        {[
          [80, 380, 7, "#1D9E75"],
          [160, 320, 6, "#1D9E75"],
          [260, 270, 6, "#1D9E75"],
          [340, 250, 7, "#085041"],
        ].map(([cx, cy, r, fill]) => (
          <circle cx={cx} cy={cy} fill={fill as string} key={`${cx}-${cy}`} r={r} stroke="#E1F5EE" strokeWidth="2" />
        ))}
  
        {[
          [460, 380, 8, "#D85A30"],
          [380, 300, 6, "#D85A30"],
          [260, 320, 7, "#993C1D"],
        ].map(([cx, cy, r, fill]) => (
          <circle cx={cx} cy={cy} fill={fill as string} key={`${cx}-${cy}`} r={r} stroke="#FAECE7" strokeWidth="2" />
        ))}
        <text fill="#993C1D" fontSize="10" textAnchor="middle" x="260" y="342">
          충돌 예상
        </text>
  
        <rect fill="#EEEDFE" height="16" rx="8" width="48" x="192" y="182" />
        <text fill="#534AB7" fontSize="10" textAnchor="middle" x="216" y="193">
          3일
        </text>
        <rect fill="#EEEDFE" height="16" rx="8" width="48" x="286" y="162" />
        <text fill="#534AB7" fontSize="10" textAnchor="middle" x="310" y="173">
          5일
        </text>
  
        <rect fill="#F1EFE8" height="72" opacity="0.92" rx="6" width="140" x="16" y="16" />
        <line stroke="#7F77DD" strokeDasharray="5,2" strokeWidth="2" x1="28" x2="48" y1="32" y2="32" />
        <text fill="#444441" fontSize="11" x="54" y="36">
          주인공 경로
        </text>
        <line stroke="#1D9E75" strokeDasharray="4,3" strokeWidth="2" x1="28" x2="48" y1="50" y2="50" />
        <text fill="#444441" fontSize="11" x="54" y="54">
          동료 경로
        </text>
        <line stroke="#D85A30" strokeWidth="2" x1="28" x2="48" y1="68" y2="68" />
        <text fill="#444441" fontSize="11" x="54" y="72">
          적 경로
        </text>
      </svg>
    );
  }

export default WorldMap;