import React from 'react';
import ReactDOM from 'react-dom';
import GaugeComponent from 'react-gauge-component';

class CustomGaugeCard extends HTMLElement {
  set hass(hass) {
    const config = this.config || {};
    const valueRaw = hass.states[config.entity]?.state || 0;
    const name = config.name || "Humidity";
    const minValue = config.minValue || 0;
    const maxValue = config.maxValue || 100;

    // Validate and adjust segments to match minValue and maxValue
    const segments = (config.segments || [
      { limit: 55, color: '#FFD700' },
      { limit: 65, color: '#32CD32' },
      { limit: 100, color: '#FF4500' },
    ])
      .map(segment => ({
        limit: Math.max(minValue, Math.min(segment.limit, maxValue)), // Clamp limit to minValue and maxValue
        color: segment.color,
      }))
      .filter(segment => segment.limit >= minValue && segment.limit <= maxValue); // Remove invalid segments

    const style = {
      bgColor: config.style?.bgColor || '#323335',
      textColor: config.style?.textColor || '#ffffff',
      dimmColor: config.style?.dimmColor || '#2c2c2e',
    };

    const value = parseFloat(valueRaw);

    ReactDOM.render(
      <div
        style={{
          backgroundColor: style.bgColor,
          borderRadius: '12px',
          padding: '0',
          textAlign: 'center',
          boxSizing: 'border-box',
          position: 'relative',
          height: '140px',
          margin: '0',
        }}
      >
        {/* Central Circle for Color */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '40%', // Adjust size as needed
            height: '40%', // Adjust size as needed
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1, // Below the text but above the background
          }}
        ></div>

        {/* Inner Display for Title, Value, and Unit */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: style.textColor,
            zIndex: 2, // Ensure the text is above the gauge and central circle
          }}
        >
          <div style={{ fontSize: '1rem', marginTop: '35px' }}>{name}</div>
          <div style={{ fontSize: '1.8rem', marginTop: '10px' }}>{value.toFixed(1)}</div>
          <div style={{ fontSize: '1rem', marginTop: '5px' }}>%</div>
        </div>

        {/* Gauge Component */}
        <div
          style={{
            width: '100%',
            height: '100%',
            margin: '0',
          }}
        >
          <GaugeComponent
            type="grafana"
            arc={{
              subArcs: segments,
              width: 0.2,
              padding: 0.02,
              emptyColor: style.dimmColor,
            }}
            value={value}
            minValue={minValue}
            maxValue={maxValue}
            labels={{
              valueLabel: {
                hide: true,
              },
              tickLabels: {
                hideMinMax: true,
              },
            }}
            centralCircle={{
              size: 0.8,
              color: 'transparent', // Set to transparent since we're using inline styling
            }}
          />
        </div>
      </div>,
      this
    );
  }

  setConfig(config) {
    this.config = config;
  }

  getCardSize() {
    return 3;
  }
}

customElements.define('custom-gauge-card', CustomGaugeCard);