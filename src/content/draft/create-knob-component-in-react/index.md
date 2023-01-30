---
title: 'React: Create a turnable knob component'
date: '2023-01-30T11:15:00.000Z'
description: 'I try to create a modular synth for the web. To do this I needed some turnable knobs and I like to share how I did it.'
devTo: 'https://dev.to/syeo66/'
---

Because I want to learn more about the Web Audio API I started creating a modular synth using React.
One of the main components I knew I'd need was turnable knob. Let me go through the steps to create one.

If you like to see it in action go to <https://synth.raven.ch>.

## Drawing the knob as an SVG

I used Affinity Designer to draw the Knob. The most important part is to split it into into two groups: the turnable knob and the markings.

After creating the SVG I took the code and turned it into a React component and added position prop which allows a value between 0 and 1 to set the position of the knob.

```typescript
interface KnobMainProps {
  position: number
}
const KnobMain: React.FC<KnobMainProps> = ({ position }) => {
  const angle = Math.min(Math.max(0, position * 270), 270)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={{
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit: 1.5,
      }}
      viewBox="0 0 1024 1024"
    >
      <g>
        <path
          fill="none"
          d="M202.085 686.883C135.815 633.107 94.786 558.75 94.786 476.659c0-163.901 163.552-296.967 365.003-296.967 201.45 0 365.002 133.066 365.002 296.967 0 81.743-40.682 155.817-106.457 209.539"
          style={{
            fill: '#ebebeb',
            fillOpacity: 0,
            stroke: 'currentColor',
            strokeWidth: '13.2px',
          }}
          transform="matrix(1.35193 0 0 1.66166 -109.602 -280.045)"
        />
        <path
          d="m960 960-97.415-97.415"
          style={{
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 20,
          }}
        />
        <path
          d="M164.09 859.91 64 960"
          style={{
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 20,
          }}
          transform="matrix(.98664 .01336 .01336 .98664 -11.974 11.974)"
        />
      </g>
      <g style={{ cursor: 'pointer', rotate: `${angle}deg`, transformOrigin: '50%', transition: 'rotate 100ms' }}>
        <ellipse
          cx={459.789}
          cy={476.659}
          fill="none"
          rx={365.003}
          ry={296.967}
          style={{
            fill: '#ebebeb',
            fillOpacity: 0,
            stroke: 'currentColor',
            strokeWidth: '15.88px',
          }}
          transform="matrix(1.12427 0 0 1.38185 -4.929 -146.67)"
        />
        <path
          d="M512 512 223.86 800.14"
          style={{
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 20,
          }}
        />
      </g>
    </svg>
  )
}
```

## Creating the main component and add mouse wheel interaction

I wanted to be able to set the value using the mouse wheel. But first I needed to setup the component like this:

```typescript
interface KnobProps {
  label?: string
  max: number
  min: number
  onChange?: (value: number) => void
  step: number
  value: number
}
const Knob: React.FC<KnobProps> = ({ label, onChange, value, step, min, max }) => {
  const [displayValue, setDisplayValue] = useState<number | null>(null)

  return (
    <KnobWrapper>
      {displayValue !== null && <KnobValue>{displayValue}</KnobValue>}
      <KnobMain position={position} />
      <KnobLabel>{label}</KnobLabel>
    </KnobWrapper>
  )
}

// I like styled-components
const KnobWrapper = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 0.8rem;
  position: relative;
  touch-action: none;
`

const KnobValue = styled.div`
  position: absolute;
  left: 2.2rem;
  min-width: 2rem;
  top: 1.5rem;
  background: var(--background-color);
  text-align: center;
  margin: 0;
  padding: 0.1rem;
  border: 1px solid var(--border-color);
  font-size: 0.7rem;
  line-height: 0.7rem;
`

const KnobLabel = styled.div`
  text-align: center;
  margin: 0;
  margin-top: -0.5rem;
  font-size: 0.8rem;
  line-height: 1rem;
`
```
