import React from "react";
import ReactDOM from "react-dom";
import GaugeComponent from "react-gauge-component";

class NicerGaugeCard extends HTMLElement {
  set hass(hass) {
    const config = this.config || {};
    const entity = config.entity || "sensor.humidity";
    const valueRaw = hass.states[config.entity]?.state || 0;
    const name = config.name || "Humidity";
    const unit = config.unit || "%";
    const minValue = config.minValue || 0;
    const maxValue = config.maxValue || 100;
    const height = config.height || "100%";

    // Validate and adjust segments to match minValue and maxValue
    const segments = (
      config.segments || [
        { limit: 55, color: "#FFD700" },
        { limit: 65, color: "#32CD32" },
        { limit: 100, color: "#FF4500" },
      ]
    )
      .map((segment) => ({
        limit: Math.max(minValue, Math.min(segment.limit, maxValue)), // Clamp limit to minValue and maxValue
        color: segment.color,
      }))
      .filter(
        (segment) => segment.limit >= minValue && segment.limit <= maxValue
      ); // Remove invalid segments

    const style = {
      bgColor: config.style?.bgColor || "#323335",
      textColor: config.style?.textColor || "#ffffff",
      dimmColor: config.style?.dimmColor || "#2c2c2e",
    };

    const value = parseFloat(valueRaw);

    ReactDOM.render(
      <div
        style={{
          backgroundColor: style.bgColor,
          borderRadius: "12px",
          display: "flex", // Flexbox for centering
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          textAlign: "center",
          boxSizing: "border-box",
          position: "relative",
          height: height,
          width: "100%",
          margin: "0",
        }}
      >
        {/* Combined Gauge and Text */}
        <div
          style={{
            display: "flex", // Ensure the gauge and text are together
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "95%", // Make gauge larger (increase width)
            height: "95%", // Make gauge larger (increase height)
          }}
        >
          {/* Gauge Component */}
          <GaugeComponent
            type="grafana"
            arc={{
              subArcs: segments,
              width: 0.3, // Thicker arcs for better visibility
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
              size: 0.7,
              color: "transparent",
            }}
            style={{
              width: "100%", // Ensure the gauge fills the allocated space
              height: "100%", // Ensure the gauge fills the allocated space
            }}
          />

          {/* Inner Display for Title, Value, and Unit */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: style.textColor,
              zIndex: 2, // Ensure the text is above the gauge and central circle
            }}
          >
            <div style={{ fontSize: "1rem", marginTop: "30px" }}>{name}</div>
            <div
              style={{
                fontSize: "1.6rem",
                marginTop: "5px",
                cursor: "pointer", // Indicate that this is clickable
                textDecoration: "none", // Optional: Make it look like a link
              }}
              onClick={() => {
                const event = new Event("hass-more-info", {
                  bubbles: true,
                  composed: true,
                });
                event.detail = { entityId: config.entity };
                this.dispatchEvent(event);
              }}
            >
              {value.toFixed(1)}
            </div>
            <div style={{ fontSize: "1rem", marginTop: "5px" }}>{unit}</div>
          </div>
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

customElements.define("nicer-gauge-card", NicerGaugeCard);
nicerGaugeCardnicerGaugeCard;
