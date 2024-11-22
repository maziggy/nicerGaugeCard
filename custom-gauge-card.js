import React from 'react';
import ReactDOM from 'react-dom';
import GaugeChart from './GaugeChart';

class GaugeChartCard extends HTMLElement {
  set hass(hass) {
    const config = this.config || {};
    const value = hass.states[config.entity].state;
    ReactDOM.render(<GaugeChart value={value} />, this);
  }

  setConfig(config) {
    this.config = config;
  }

  getCardSize() {
    return 2; // Adjust as needed
  }
}

customElements.define('custom-gauge--card', GaugeChartCard);
