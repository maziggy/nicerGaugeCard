import React from 'react';
import ReactDOM from 'react-dom';
import GaugeComponent from 'react-gauge-component';

class NicerGaugeCard extends HTMLElement {
  // Called whenever the card receives updated Home Assistant data
  set hass(hass) {
    const config = this.config || {};
    const valueRaw = hass.states[config.entity]?.state || 0; // Fetch sensor value
    const name = config.name || "Gauge";
    const minValue = config.minValue || 0;
    const maxValue = config.maxValue || 100;

    // Validate and adjust segments to match minValue and maxValue
    const segments = (config.segments || [
      { limit: 55, color: '#FFD700' },
      { limit: 65, color: '#32CD32' },
      { limit: 100, color: '#FF4500' },
    ])
      .map(segment => ({
        limit: Math.max(minValue, Math.min(segment.limit, maxValue)), // Clamp to min/max values
        color: segment.color,
      }))
      .filter(segment => segment.limit >= minValue && segment.limit <= maxValue); // Remove invalid segments

    const style = {
      bgColor: config.style?.bgColor || '#323335',
      textColor: config.style?.textColor || '#ffffff',
      dimmColor: config.style?.dimmColor || '#2c2c2e',
    };

    // Parse the sensor value
    const value = parseFloat(valueRaw);

    // Get dynamic height of the parent container (or default to 200px)
    const parentHeight = this.parentElement?.offsetHeight || 200;

    // Render the React gauge component into the card
    ReactDOM.render(
      <div
        style={{
          backgroundColor: style.bgColor,
          borderRadius: '12px',
          padding: '0',
          textAlign: 'center',
          boxSizing: 'border-box',
          position: 'relative',
          height: `${parentHeight}px`, // Dynamically set height
          margin: '0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Inner display for name and value */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: style.textColor,
            zIndex: 2, // Ensure the text is above the gauge and background
          }}
        >
          <div style={{ fontSize: '1rem', marginTop: '35px' }}>{name}</div>
          <div style={{ fontSize: '1.8rem', marginTop: '10px' }}>{value.toFixed(1)}</div>
          <div style={{ fontSize: '1rem', marginTop: '5px' }}>%</div>
        </div>

        {/* Gauge Component */}
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
            valueLabel: { hide: true },
            tickLabels: { hideMinMax: true },
          }}
          centralCircle={{
            size: 0.8,
            color: 'transparent', // Set to transparent since we're using inline styling
          }}
        />
      </div>,
      this
    );
  }

  // Save the card configuration
  setConfig(config) {
    this.config = config;
  }

  // Dynamically calculate card size (rows in the Lovelace grid)
  getCardSize() {
    const parentHeight = this.parentElement?.offsetHeight || 200; // Default to 200px if unavailable
    return Math.ceil(parentHeight / 48); // Estimate rows based on default 48px per row
  }
}

// Define the custom element
customElements.define('nicer-gauge-card', NicerGaugeCard);