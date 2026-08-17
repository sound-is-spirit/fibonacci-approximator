# Chrome Web Store Listing — Fibonacci Approximator

> Last Updated: 2026-08-17

## Store Listing

**Extension Name** [REQUIRED]
Fibonacci Approximator

**Short Description** [REQUIRED]
Enter a number and get its adjacent (or nearest bounding) Fibonacci values.

**Detailed Description** [REQUIRED]
Calculates and displays adjacent Fibonacci values for any given integer.

Need to quickly find where a number sits within the Fibonacci sequence? This lightweight extension helps you determine the adjacent or nearest bounding Fibonacci values for any non-negative integer you input. 

Simply click the extension icon, enter a number, and instantly see the closest values in the Fibonacci sequence. It is designed to be fast and intuitive without leaving your current tab.

No data is collected or sent off-device. Your privacy is fully respected.

Feedback and support are handled via our GitHub repository.

**Category** [REQUIRED]
Developer Tools

**Single Purpose** [REQUIRED]
Calculates and displays adjacent or nearest bounding Fibonacci sequence values for any given integer.

**Primary Language** [REQUIRED]
English

## Graphics & Assets

| Asset | Dimensions | Status | Filename |
|-------|-----------|--------|----------|
| Store Icon [REQUIRED] | 128×128 PNG | ✅ Ready | `icons/icon-128.png` |
| Screenshot 1 [REQUIRED] | 1280×800 or 640×400 | ✅ Ready | `screenshot-1.jpg` |
| Screenshot 2 [RECOMMENDED] | 1280×800 or 640×400 | ⬜ Not created | |
| Screenshot 3 [RECOMMENDED] | 1280×800 or 640×400 | ⬜ Not created | |
| Screenshot 4 | 1280×800 or 640×400 | ⬜ Not created | |
| Screenshot 5 | 1280×800 or 640×400 | ⬜ Not created | |
| Small Promo Tile [RECOMMENDED] | 440×280 | ⬜ Not created | |
| Marquee Promo Tile | 1400×560 | ⬜ Not created | |

### Screenshot Notes
- Screenshot 1: Show the popup opened with a number entered and the Fibonacci values displayed.

## Permissions Justification

| Permission | Type | Justification |
|------------|------|---------------|
| activeTab | Core | Required to determine the URL of the current tab when the extension icon is clicked, ensuring we do not attempt to inject the UI into restricted `chrome://` pages. |
| scripting | Core | Required to dynamically inject the extension's user interface (`content.js` overlay) into the active web page when triggered by the user. |

## Privacy & Data Use

### Data Collection

**Does the extension collect user data?** No

### Data Use Certification
- [x] Data is NOT sold to third parties
- [x] Data is NOT used for purposes unrelated to the extension's core functionality
- [x] Data is NOT used for creditworthiness or lending purposes

## Privacy Policy

**Privacy Policy URL** [RECOMMENDED]
https://github.com/sound-is-spirit/fibonacci-approximator/blob/main/PRIVACY.md

## Distribution

**Visibility**: Public
**Regions**: All regions
**Pricing**: Free

## Developer Info

**Publisher Name** [REQUIRED]
Vesa Metsä-Ketelä

**Contact Email** [REQUIRED]
vesa.metsa-ketela@example.com

**Support URL / Email** [RECOMMENDED]
https://github.com/sound-is-spirit/fibonacci-approximator

**Homepage URL** [RECOMMENDED]
https://github.com/sound-is-spirit/fibonacci-approximator

## Version History

| Version | Date | Changes | Status |
|---------|------|---------|--------|
| 1.0.0 | 2026-08-17 | Initial release | Draft |

## Review Notes

### Known Issues / Limitations
None.

### Rejection History
None.
