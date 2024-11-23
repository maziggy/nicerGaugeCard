# nicerGaugeCard
A custom gauge card for Home Assistant, that looks nicer ;)

Any comments, suggestions or contribution is appreciated.

## Screenshot

![Screenshot](https://raw.githubusercontent.com/maziggy/nicerGaugeCard/refs/heads/main/screenshots/nicerGaugeCard.png)

## Installation

### Via HACS

1. Ensure you have [HACS](https://hacs.xyz/) installed.
2. In Home Assistant, go to **HACS** > **Frontend**.
3. Click the **"+"** button to add a new repository.
4. Enter the repository URL: `https://github.com/maziggy/nicerGaugeCard.git`.
5. Select **Dashboard** as the category and **Save**.
6. Once installed, add the card to your Lovelace dashboard.

or simply

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=maziggy&repository=nicerGaugeCard&category=Dashboard)

## Configuration

```yaml
type: custom:nicer-gauge-card
entity: sensor.temperature
name: Temp
unit: °C
minValue: 10
maxValue: 40
segments:
  - limit: 23
    color: "#ffa800"
  - limit: 28
    color: green
  - limit: 100
    color: "#b30000"
style:
  bgColor: "#323335"
  textColor: "#FFFFFF"
  dimmColor: "#2c2c2e"
